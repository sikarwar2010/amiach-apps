/**
 * Clerk is enabled only when a publishable key is present. Without keys the site
 * runs in "demo auth" mode (localStorage session, clearly labelled in the UI) so it
 * can be built, previewed and demoed before a Clerk application is connected.
 */
export const clerkEnabled = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
