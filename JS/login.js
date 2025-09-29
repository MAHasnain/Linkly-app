import { signInUser } from "./database.js";

const loginBtn = document.querySelector("#login-btn");
const user_email = document.querySelector("#user_email");
const user_password = document.querySelector("#user_password");

loginBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    try {

        const loggedInUser = await signInUser({
            email: user_email.value,
            password: user_password.value
        })
        // console.log(loggedInUser);

    } catch (error) {
        console.error(error)
    }

})