import { createContact } from "./database.js";

const firstNameInp = document.querySelector("#first_name_inp")
const lastNameInp = document.querySelector("#last_name_inp")
const phoneNumberInp = document.querySelector("#phone_number_inp")
const emailInp = document.querySelector("#email_inp")
const createBtn = document.querySelector("#createBtn")

createBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    try {

        const created = await createContact({ first_name: firstNameInp.value, last_name: lastNameInp.value, phone_number: phoneNumberInp.value, email: emailInp.value, })

        console.log(created)

    } catch (error) {
        console.error(error)
    }
})