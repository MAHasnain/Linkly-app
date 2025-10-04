import { createContact } from "./database.js";

const firstNameInp = document.querySelector("#first_name_inp")
const lastNameInp = document.querySelector("#last_name_inp")
const phoneNumberInp = document.querySelector("#phone_number_inp")
const emailInp = document.querySelector("#email_inp")
const createContactForm = document.querySelector("#createContactForm")
const errorMsg = document.querySelector(".error-msg");

createContactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {

        const created = await createContact({ first_name: firstNameInp.value, last_name: lastNameInp.value, phone_number: phoneNumberInp.value, email: emailInp.value });

        errorMsg.textContent = ``;

        if (!firstNameInp.value || !lastNameInp.value || !phoneNumberInp.value || !emailInp.value) {
            errorMsg.textContent = `Please fill out all required fields!`;
            return;
        }

        console.log("created", created);
        if (created.data == null) {

        }

        if (created.data) {
            swal("Done!", "Contact created successfully!", "success");
            createContactForm.reset();
        }

    } catch (error) {
        console.error(error)
        errorMsg.innerHTML = `Something went wrong!.`

    }
})