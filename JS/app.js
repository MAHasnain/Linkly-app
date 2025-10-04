import { fetchContact, retrieveSession } from "./database.js";

// insertData({ first_name: 'MA', last_name: "Hasnain", phone_number: 3121234567 , email: "email@email.com" })

// updateContact(1, { first_name: "Muhammad", last_name: 'Atta' });

document.addEventListener("DOMContentLoaded", async () => {
    const contacts_sec = document.querySelector(".all-contacts");

    try {
        const session = await retrieveSession()
        console.log(session);

        const contacts = await fetchContact();
        console.log(contacts)

        contacts_sec.innerHTML = "";
        contacts.map(contact => {
            contacts_sec.innerHTML += `
             <div class="contact" data-id="${contact.id}">
                    <div class="contact-info">
                        <div class="user-icon"><i class="fa-solid fa-circle-user"></i></div>
                        <div class="name-number">
                            <p class="name">${contact.first_name} ${contact.last_name}</p>
                            <p class="number">${contact.phone_number}</p>
                        </div>
                    </div>
                    <div class="contact-icons">
                        <span><a href="tel:${contact.phone_number}"><i class="fa-solid fa-phone"></i></a></span>
                        <span><a href=""><i class="fa-solid fa-message"></i></a></span>
                        <span><a href="mailto:${contact.email}"><i class="fa-solid fa-envelope"></i></a></span>
                    </div>
                </div>`
        })

        const allContacts = document.querySelectorAll(".contact");
        allContacts.forEach(contact => {
            console.log(contact)
            contact.addEventListener("click", () => {
                console.log("clicked")
                const contactId = contact.getAttribute("data-id");
                window.location.href = `/HTML/contactDetail.html?id=${contactId}`;
            })
        })

    } catch (error) {
        console.error(error);
    }
})

