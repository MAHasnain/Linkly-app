import { registerUser } from "./database.js";


const firstNameInp = document.querySelector("#user_name");
const ageInp = document.querySelector("#user_age");
const emailInp = document.querySelector("#user_email");
const passwordInp = document.querySelector("#user_password");
const registerBtn = document.querySelector("#register-btn");

registerBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    try {

        const registeredUser = await registerUser({
            email: emailInp.value,
            password: passwordInp.value,
            options: {
                data: {
                    first_name: firstNameInp.value,
                    age: ageInp.value,
                }
            }
        })

        console.log(registeredUser)

    } catch (error) {
        console.error(error)
    }

})