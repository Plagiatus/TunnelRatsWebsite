export const load = ({ locals }) => {
    if (locals.user) {
        return { user: locals.user.username, userId: locals.user.id }
    }
}
