const node_by_id = (id) => document.getElementById(id);
const nodes_by_query = (query) => document.querySelectorAll(query);
const login_btn = node_by_id("login_btn");
const login_form = node_by_id("login_form");
const user_name = node_by_id("user_name");
const password = node_by_id("password");
const valid_msg = node_by_id("valid_msg");
const success_msg = node_by_id("success_msg");
const fail_msg = node_by_id("fail_msg");
const register_btn = node_by_id("register_btn");

const empty_string_validation = (id) => {
    // console.log("id", id);
    if (id.value.trim() === "") {
        console.log("trim");
        id.classList.remove("border", "border-green-500");
        id.classList.add("border", "border-red-500");
        return false;
    } else {
        // console.log("no trim");
        id.classList.remove("border", "border-red-500");
        id.classList.add("border", "border-green-500");
        return true;
    }
};

const Password_validation = (id) => {
    const password = id.value;
    if (password.length < 8) {
        id.classList.remove("border", "border-green-500");
        id.classList.add("border", "border-red-500");
        return false;
    };
    let hasUpperCase = false;
    let hasLowerCase = false;
    let hasNumber = false;
    let hasSpecialCharacter = false;

    const specialCharacters = "!@#$%^&*()-_=+";
    for (let char of password) {
        if (char >= 'A' && char <= 'Z') {
            hasUpperCase = true;
        }
        else if (char >= 'a' && char <= 'z') {
            hasLowerCase = true;
        }
        else if (char >= '0' && char <= '9') {
            hasNumber = true;
        }
        else if (specialCharacters.includes(char)) {
            hasSpecialCharacter = true;
        }
    }
    if (hasUpperCase && hasLowerCase && hasNumber && hasSpecialCharacter) {
        id.classList.remove("border", "border-red-500");
        id.classList.add("border", "border-green-500");
        return true;
    }
    else {
        id.classList.remove("border", "border-green-500");
        id.classList.add("border", "border-red-500");
        return false;
    };
};

const login_validation = () => {
    const userNameValid = empty_string_validation(user_name);
    const passwordValid = Password_validation(password);
    return userNameValid && passwordValid;
}

const postFormDataAsJson = async (url, formData) => {
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJsonString = JSON.stringify(plainFormData);

    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: formDataJsonString,
    };

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }
    return response;
}

const LoginUser = async () => {
    if (login_validation()) {
        const form_data = new FormData(login_form);
        let response = await postFormDataAsJson("http://localhost:3000/login", form_data)
        response = await response.json();
        console.log(response);
        if (response.status) {
            success_msg.classList.remove("hidden");
            setTimeout(() => {
                success_msg.innerText = response.msg;
                success_msg.classList.add("hidden");
                window.location.pathname = `/`;
            }, 1200);
        } else {
            fail_msg.classList.remove("hidden");
            setTimeout(() => {
                fail_msg.innerText = response.msg;
                fail_msg.classList.add("hidden");
            }, 1200);
        }
    } else {
        valid_msg.classList.remove("hidden");
        setTimeout(() => {
            valid_msg.classList.add("hidden");
        }, 3000);
    }

}

login_btn.addEventListener("click", () => { LoginUser() })
register_btn.addEventListener("click", () => window.location.pathname = "/register")