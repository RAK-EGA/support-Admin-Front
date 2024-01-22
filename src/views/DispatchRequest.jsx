
// idk if this works or not well check when we do shit
export async function action({ request }) {
    const data = Object.fromEntries(await request.formData());

    // let announcements;

    console.log(data);
    // `/tickets/${data.id}`
    window.location.href = `/requests/${data.id}`
    return 1;
}