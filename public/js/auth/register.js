const node_by_id = (id) => document.getElementById(id);
const nodes_by_query = (query) => document.querySelectorAll(query);
const register_form = node_by_id("register_form");
const register_btn = node_by_id("register_btn");
const full_name = node_by_id("full_name");
const user_name = node_by_id("user_name");
const mobile_number = node_by_id("mobile_number");
const email = node_by_id("email");
const gender_radious = nodes_by_query("input[name=gender]")
const password = node_by_id("password");
const confirm_password = node_by_id("confirm_password");
const success_msg = node_by_id("success_msg");
const fail_msg = node_by_id("fail_msg");
const valid_msg = node_by_id("valid_msg");
const login_btn = node_by_id("login_btn")
const password_inputs = nodes_by_query("input[type='password']");
const show_hide_pass = node_by_id("show_hide_pass");
const show_pass = node_by_id("show_pass");
const hide_pass = node_by_id("hide_pass");
let password_show = false;

const radio_vaildation = (selected_radio) => {
    // console.log(selected_radio[0].name);
    const new_id = node_by_id(selected_radio[0].name.concat("_valid"));
    console.log(new_id);
    let gender_obj = {};
    Array.from(selected_radio).map(ele => {
        gender_obj[ele.value] = ele.checked;
        // console.log(ele.checked);
    })
    if(Object.keys(gender_obj).some((ele) => gender_obj[ele])){
        new_id.classList.remove("hidden", "fill-red-500");
        new_id.classList.add("fill-green-500");
        return true;

    }else{
        new_id.classList.remove("hidden", "fill-green-500");
        new_id.classList.add("fill-red-500");
        return false;
    };
};

const empty_string_validation = (id) => {
    console.log("id", id);
    const new_id = node_by_id(id.id.concat("_valid"));
    console.log(new_id)
    if (id.value.trim() === "") {
        console.log("trim");
        new_id.classList.remove("hidden", "fill-green-500");
        new_id.classList.add("fill-red-500");
        return false;
    } else {
        // console.log("no trim");
        new_id.classList.remove("hidden", "fill-red-500");
        new_id.classList.add("fill-green-500");
        return true;
    }
};

const Regex_validation = (id, regex) => {
    console.log(regex.test(id.value));
    const new_id = node_by_id(id.id.concat("_valid"));
    if (regex.test(id.value) && id.value.trim() !== "") {
        new_id.classList.remove("hidden", "fill-red-500");
        new_id.classList.add("fill-green-500");
        return true;
    } else {
        new_id.classList.remove("hidden", "fill-green-500");
        new_id.classList.add("fill-red-500");
        return false;
    }
};
const Password_validation = (id) => {
    const new_id = node_by_id(id.id.concat("_valid"));
    const password = id.value;
    if (password.length < 8) {
        new_id.classList.remove("hidden", "fill-green-500");
        new_id.classList.add("fill-red-500");
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
        new_id.classList.remove("hidden", "fill-red-500");
        new_id.classList.add("fill-green-500");
        return true;
    }
    else {
        new_id.classList.remove("hidden", "fill-green-500");
        new_id.classList.add("fill-red-500");
        return false;
    };
};

const matchPassword = (x, y) => x === y;

const showhidepassword = () => {
    if (!password_show) {
        Array.from(password_inputs).map((ele) => {
            if (ele.type !== "hidden") ele.type = "text";
        });
        password_show = true;
        hide_pass.classList.remove("hidden");
        show_pass.classList.add("hidden");
    } else {
        Array.from(password_inputs).map((ele) => {
            if (ele.type !== "hidden") ele.type = "password";
        });
        password_show = false;
        hide_pass.classList.add("hidden");
        show_pass.classList.remove("hidden");
    }
}

const registration_validation = () => {
    const fullNameValid = empty_string_validation(full_name);
    const userNameValid = empty_string_validation(user_name);
    const mobileValid = Regex_validation(mobile_number, new RegExp(/^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/));
    const emailValid = Regex_validation(email, new RegExp(/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/));
    const genderValid = radio_vaildation(gender_radious);
    const passwordValid = Password_validation(password);
    const confirmPasswordValid = Password_validation(confirm_password);
    const matchPasswordValid = matchPassword(password.value, confirm_password.value);

    console.log(fullNameValid, userNameValid, mobileValid, emailValid, genderValid, passwordValid, confirmPasswordValid, matchPasswordValid);

    return fullNameValid && userNameValid && mobileValid && emailValid && genderValid && passwordValid && confirmPasswordValid && matchPasswordValid;
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

const RegisterUser = async () => {
    if (registration_validation()) {
        const form_data = new FormData(register_form);
        console.log(form_data);
        let response = await postFormDataAsJson("http://localhost:3000/registraton", form_data)
        response = await response.json();
        console.log(response);
        if (response.status) {
            success_msg.classList.remove("hidden");
            setTimeout(() => {
                success_msg.innerText = response.msg;
                success_msg.classList.add("hidden");
                window.location.pathname = `/login`;
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

show_hide_pass.addEventListener("click", () => showhidepassword());
register_btn.addEventListener("click", () => { RegisterUser() })
login_btn.addEventListener("click", () => window.location.pathname = "/login");