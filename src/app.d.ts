// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

import type { Session } from "$lib/server/db/repositories/SessionRepository";
import type { User } from "$lib/server/db/repositories/UserRepository";

declare global {
  namespace App {
    // interface Error {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
    interface Locals {
      user: User | undefined;
      session: Session | undefined;
    }
  }
}

export { };
