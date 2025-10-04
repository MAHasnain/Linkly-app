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

            const deleteBtn = document.querySelector("#deleteBtn");
            deleteBtn.addEventListener("click", async (e) => {
                e.preventDefault();

                const deletedContact = await deleteContact(contactId);
                console.log(deletedContact);

                if (deletedContact.error == null) {
                    swal({
                        title: "Good job!",
                        text: "You clicked the button!",
                        icon: "success",
                        button: "Aww yiss!",
                    });
                    window.location.href = `../index.html`;
                }
            })

            document.querySelector("#editBtn").addEventListener("click", async (e) => {
                e.preventDefault();

                document.querySelector(".contact-text_dets").innerHTML = `
                <form action="" id="updateContactForm">
                    <div>
                        <input type="text" name="" value="${fetchedContact.first_name} ${fetchedContact.last_name}" id="updateContact-name">
                    </div>
                    <div>
                        <input type="tel" name="" value="${fetchedContact.phone_number}" id="updateContact-number">
                    </div>
                    <div>
                        <input type="email" name="" value="${fetchedContact.email}" id="updateContact-email">
                    </div>
                        <div class="saveContact"><button type="submit" id="saveContact">Save</button>
                    </div>
                </form>
                `;

                const updateContactName = document.querySelector("#updateContact-name")
                const updateContactNumber = document.querySelector("#updateContact-number")
                const updateContactEmail = document.querySelector("#updateContact-email")
                const updateContactForm = document.querySelector("#updateContactForm");

                updateContactForm.addEventListener("submit", async (e) => {
                    e.preventDefault();

                    const nameParts = updateContactName.value.split(" ");
                    const first_nameUpdated = nameParts[0];
                    const last_nameUpdated = nameParts.slice(1).join("");

                    const updatedContact = await updateContact(contactId, { first_name: first_nameUpdated, last_name: last_nameUpdated, phone_number: updateContactNumber.value, email: updateContactEmail.value });
                    console.log(updatedContact);

                    if (updatedContact.data) {
                        contact.innerHTML = `
                            <div class="contact_details">
                                <div class="contact-text_dets">
                                    <p class="name">${updatedContact.data[0].first_name} ${updatedContact.data[0].last_name}</p>
                                    <p class="number">${updatedContact.data[0].phone_number}</p>
                                    <p class="email">${updatedContact.data[0].email}</p>
                                </div>
                                <div class="actionButtons ">
                                    <button id="editBtn" ><i class="fa-solid fa-pen"></i></button>
                                    <button id="deleteBtn" ><i class="fa-solid fa-trash"></i></button>
                                </div>
                            </div>

                            <div class="contact-icons">
                                <span><a href="tel:${updatedContact.data[0].phone_number}"><i class="fa-solid fa-phone"></i></a></span>
                                <span><a href=""><i class="fa-solid fa-message"></i></a></span>
                                <span><a href="mailto:${updatedContact.data[0].email}"><i class="fa-solid fa-envelope"></i></a></span>
                            </div>`;
                    }
                })
            })



        }

    } catch (error) {
        console.error(error)
    }

})
