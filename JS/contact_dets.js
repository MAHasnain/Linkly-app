import { getContactById, deleteContact, updateContact } from "./database.js";

const contact = document.querySelector(".contact_container")

document.addEventListener("DOMContentLoaded", async () => {

    try {
        const searchParams = new URLSearchParams(window.location.search);
        const contactId = searchParams.get("id");
        // console.log("id in query:", contactId, typeof contactId);

        if (contactId) {
            const fetchedContact = await getContactById(contactId)
            console.log(fetchedContact)

            contact.innerHTML = `
                <div class="contact_details">
                    <div class="contact-text_dets">
                        <p class="name">${fetchedContact.first_name} ${fetchedContact.last_name}</p>
                        <p class="number">${fetchedContact.phone_number}</p>
                        <p class="email">${fetchedContact.email}</p>
                    </div>
                    <div class="actionButtons ">
                        <button id="editBtn" ><i class="fa-solid fa-pen"></i></button>
                        <button id="deleteBtn" ><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>

                <div class="contact-icons">
                    <span><a href="tel:${fetchedContact.phone_number}"><i class="fa-solid fa-phone"></i></a></span>
                    <span><a href=""><i class="fa-solid fa-message"></i></a></span>
                    <span><a href="mailto:${fetchedContact.email}"><i class="fa-solid fa-envelope"></i></a></span>
                </div>`;
        }

    } catch (error) {
        console.error(error)
    }

})
