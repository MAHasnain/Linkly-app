import { getContactById } from "./database.js";

document.addEventListener("DOMContentLoaded", async () => {
    const searchParams = new URLSearchParams(window.location.search);
    const contactId = searchParams.get("id");
    console.log("id in query:", contactId, typeof contactId);


    const fetchedContact = await getContactById("id", contactId)
    console.log(fetchedContact)

})
