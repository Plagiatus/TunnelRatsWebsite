interface RefillBucket {
    count: number;
    refilledAt: number;
}

export class RefillingTokenBucket<Key> {

    constructor(public max: number, public refillIntervalSeconds: number) { }

    private storage = new Map<Key, RefillBucket>();

    public check(key: Key, cost: number): boolean {
        const bucket = this.storage.get(key);
        if (!bucket) {
            return true;
        }
        this.refill(bucket);
        return bucket.count > cost;
    }

    public consume(key: Key, cost: number): boolean {
        
        if (!this.storage.has(key)) {
            this.storage.set(key, { count: this.max, refilledAt: Date.now() });
        }
        const bucket = this.storage.get(key)!;
        this.refill(bucket);
        if (bucket.count < cost) return false;
        bucket.count -= cost;
        return true;
    }

    private refill(bucket: RefillBucket) {
        const now = Date.now();
        const refill = Math.floor((now - bucket.refilledAt) / (this.refillIntervalSeconds * 1000));
        if (refill > 0) {
            bucket.count = Math.min(this.max, bucket.count + refill);
            bucket.refilledAt = now;
        }
    }
}