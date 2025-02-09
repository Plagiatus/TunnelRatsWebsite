export function enhanceLoading(): { loading: boolean, enhance: () => void } {
    const loading = $state({loading: false, enhance: () => {
        loading.loading = true;
        return async ({ update }: { update: () => Promise<void> }) => {
            await update();
            loading.loading = false;
        };
    }});
    return loading;
} 