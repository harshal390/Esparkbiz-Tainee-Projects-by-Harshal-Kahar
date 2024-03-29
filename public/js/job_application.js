const node_by_id = (id) => {
    return document.getElementById(id);
}

const nodes_by_query = (query) => {
    return document.querySelectorAll(query);
}

const form_1 = node_by_id("1");
const form_2 = node_by_id("2");
const form_3 = node_by_id("3");
const form_4 = node_by_id("4");
const form_5 = node_by_id("5");
const form_6 = node_by_id("6");
const prev = node_by_id("prev");
const next = node_by_id("next");
const submit = node_by_id("submit");
const form = document.querySelector("form");
const check_boxes = document.getElementsByClassName("checkbox");
const first_name = node_by_id("first_name");
const last_name = node_by_id("last_name");
const designation = node_by_id("designation");
const address_1 = node_by_id("address_1");
const address_2 = node_by_id("address_2");
const email = node_by_id("email");
const phone_number = node_by_id("phone_number");
const city = node_by_id("city");
const zipcode = node_by_id("zipcode");
const date_of_birth = node_by_id("date_of_birth");
const state = node_by_id("state");
const relationship_status = node_by_id("relationship_status");
const gender_selected = document.querySelector('input[name="gender"]:checked');
const ssc_results_inputs = nodes_by_query("#ssc_results_box input");
const hsc_diploma_results_inputs = nodes_by_query("#hsc_diploma_results_box input");
const bachlore_degree_results_inputs = nodes_by_query("#bachlore_degree_box input");
const master_degree_results_inputs = nodes_by_query("#master_degree_box input");
const work_exp_box_1_inputs = nodes_by_query("#work_exp_box_1 input");
const work_exp_box_2_inputs = nodes_by_query("#work_exp_box_2 input");
const work_exp_box_3_inputs = nodes_by_query("#work_exp_box_3 input");
const reference_box_1_inputs = nodes_by_query("#reference_box_1 input");
const reference_box_2_inputs = nodes_by_query("#reference_box_2 input");
const preferances_inputs = nodes_by_query("#preferances input,#preferances select");
const hindi_checks = nodes_by_query(".hindi_checkbox");
const hindi = node_by_id("hindi");
const gujarati_checks = nodes_by_query(".gujarati_checkbox");
const gujarati = node_by_id("gujarati");
const english_checks = nodes_by_query(".english_checkbox");
const english = node_by_id("english");
const php_check = node_by_id("php");
const mysql_check = node_by_id("mysql");
const larave_check = node_by_id("larave");
const oracle_check = node_by_id("oracle");
const php_selected = document.querySelector('input[name="php_level"]:checked');
const mysql_selected = document.querySelector('input[name="mysql_level"]:checked');
const larave_selected = document.querySelector('input[name="larave_level"]:checked');
const oracle_selected = document.querySelector('input[name="oracle_level"]:checked');
const php_radios = document.querySelectorAll('input[name="php_level"]');
const mysql_radios = document.querySelectorAll('input[name="mysql_level"]');
const larave_radios = document.querySelectorAll('input[name="larave_level"]');
const oracle_radios = document.querySelectorAll('input[name="oracle_level"]');
const success_msg = node_by_id("success_msg");
const success_update_msg = node_by_id("success_update_msg");
let count = 1;
const employee_id = + window.location.pathname.split("/")[3];

const obj = [{ id: 1, form: form_1 }, { id: 2, form: form_2 }, { id: 3, form: form_3 }, { id: 4, form: form_4 }, { id: 5, form: form_5 }, { id: 6, form: form_6 },];

Array.from(check_boxes).map((ele) => {
    if (!ele.checked) {
        ele.value = 0;
    } else {
        ele.value = 1;
    }
})

check_condition = (count_value) => {
    // console.log(count_value);
    obj.map((ele) => {
        if (count_value === ele.id) {
            ele.form.classList.remove("hidden");
            ele.form.classList.add("flex");
        }
        else {
            ele.form.classList.add("hidden");
            ele.form.classList.remove("flex");
        }
    })
}

check_condition_for_button = (count_value) => {
    prev.classList.remove("opacity-40");
    prev.classList.add("cursor-pointer");
    submit.classList.add("hidden");
    next.classList.remove("hidden");
    if (count_value === 1) {
        prev.classList.add("opacity-40");
        prev.classList.remove("cursor-pointer");
    }
    if (count_value === obj.length) {
        submit.classList.remove("hidden");
        next.classList.add("hidden");
    }

}
const radio_vaildation = (selected_radio) => {
    console.log("selected_radio", selected_radio);
    if (selected_radio) {
        // console.log("radio button selected");
        return true;
    } else {
        // console.log("radio button does not selected");
        return false;
    }
};


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


const Regex_validation = (id, regex) => {
    if (regex.test(id.value.toLowerCase()) && id.value.trim() !== "") {
        id.classList.remove("border", "border-red-500");
        id.classList.add("border", "border-green-500");
        return true;
    } else {
        id.classList.remove("border", "border-green-500");
        id.classList.add("border", "border-red-500");
        return false;
    }
};

const check_every_true_in_object = (obj) => {
    return Object.keys(obj).every((ele) => obj[ele]);
};

const check_any_true_in_object = (obj) => {
    return Object.keys(obj).some((ele) => obj[ele]);
}



const basic_details_validation = () => {
    let val_1 = empty_string_validation(first_name);
    let val_2 = empty_string_validation(last_name);
    let val_3 = empty_string_validation(designation);
    let val_4 = empty_string_validation(address_1);
    let val_5 = empty_string_validation(address_2);
    let val_6 = Regex_validation(email, new RegExp(/^[a-z0-9]+@[a-z]+.[a-z]{2,3}$/));
    let val_7 = Regex_validation(phone_number, new RegExp(/^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/));
    let val_8 = empty_string_validation(city);
    let val_9 = Regex_validation(zipcode, new RegExp(/^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/));
    let val_10 = empty_string_validation(date_of_birth);
    let val_11 = empty_string_validation(state);
    let val_12 = empty_string_validation(relationship_status);
    let val_13 = radio_vaildation(gender_selected);
    // console.log(val_1, val_2, val_3, val_4, val_5, val_6, val_7, val_8, val_9, val_10, val_11, val_12, val_13);
    let any_false = val_1 && val_2 && val_3 && val_4 && val_5 && val_6 && val_7 && val_8 && val_9 && val_10 && val_11 && val_12 && val_13;
    return any_false;
}

const education_details_form_validation = () => {
    let obj_ssc = {};
    let obj_hsc = {};
    let obj_bach = {};
    let obj_master = {};
    for (let i = 0; i < ssc_results_inputs.length; i++) {
        obj_ssc[ssc_results_inputs[i].id] = empty_string_validation(
            ssc_results_inputs[i]
        );
        // console.log(empty_string_validation(ssc_results_inputs[i]));
    }
    for (let i = 0; i < hsc_diploma_results_inputs.length; i++) {
        obj_hsc[hsc_diploma_results_inputs[i].id] = empty_string_validation(
            hsc_diploma_results_inputs[i]
        );
    }
    for (let i = 0; i < bachlore_degree_results_inputs.length; i++) {
        obj_bach[bachlore_degree_results_inputs[i].id] = empty_string_validation(
            bachlore_degree_results_inputs[i]
        );
    }
    for (let i = 0; i < master_degree_results_inputs.length; i++) {
        obj_master[master_degree_results_inputs[i].id] = empty_string_validation(
            master_degree_results_inputs[i]
        );
    }
    let obj_valid = { obj_ssc, obj_hsc, obj_bach, obj_master };
    // console.log(obj_valid);


    const ssc_validation = () => {
        return check_every_true_in_object(obj_ssc) && !check_any_true_in_object(obj_hsc) && !check_any_true_in_object(obj_bach) && !check_any_true_in_object(obj_master);
    };
    const hsc_validation = () => {
        return check_every_true_in_object(obj_ssc) && check_every_true_in_object(obj_hsc) && !check_any_true_in_object(obj_bach) && !check_any_true_in_object(obj_master);
    };
    const bach_validation = () => {
        return check_every_true_in_object(obj_ssc) && check_every_true_in_object(obj_hsc) && check_every_true_in_object(obj_bach) && !check_any_true_in_object(obj_master);
    };
    const master_validation = () => {
        return check_every_true_in_object(obj_ssc) && check_every_true_in_object(obj_hsc) && check_every_true_in_object(obj_bach) && check_every_true_in_object(obj_master);
    };
    // console.log(ssc_validation(),hsc_validation(),bach_validation(),master_validation())
    if (ssc_validation() || hsc_validation() || bach_validation() || master_validation()) {
        return true;
    } else {
        return false;
    }
};

const work_exp_validation = () => {
    let obj_work_1 = {};
    let obj_work_2 = {};
    let obj_work_3 = {};
    // console.log(work_exp_box_1_inputs, work_exp_box_2_inputs, work_exp_box_3_inputs)
    Array.from(work_exp_box_1_inputs).map((ele) => {
        obj_work_1[ele.id] = empty_string_validation(ele);
    });
    Array.from(work_exp_box_2_inputs).map((ele) => {
        obj_work_2[ele.id] = empty_string_validation(ele);
    })
    Array.from(work_exp_box_3_inputs).map((ele) => {
        obj_work_3[ele.id] = empty_string_validation(ele);
    })
    // console.log(obj_work_1, obj_work_2, obj_work_3);

    const work_1_validation = () => {
        return check_every_true_in_object(obj_work_1) && !check_any_true_in_object(obj_work_2) && !check_any_true_in_object(obj_work_3);
    }
    const work_2_validation = () => {
        return check_every_true_in_object(obj_work_1) && check_every_true_in_object(obj_work_2) && !check_any_true_in_object(obj_work_3);
    }
    const work_3_validation = () => {
        return check_every_true_in_object(obj_work_1) && check_every_true_in_object(obj_work_2) && check_every_true_in_object(obj_work_3);
    }

    if (work_1_validation() || work_2_validation() || work_3_validation()) {
        return true;
    } else {
        return false;
    }
}

const language_technology_validation = () => {
    let obj_hindi = {};
    let obj_gujarati = {};
    let obj_eng = {};
    // console.log(hindi_checks, hindi, gujarati_checks, gujarati, english_checks, english);
    Array.from(hindi_checks).map((ele) => {
        obj_hindi[ele.id] = ele.value;
    })
    Array.from(gujarati_checks).map((ele) => {
        obj_gujarati[ele.id] = ele.value;
    })
    Array.from(english_checks).map((ele) => {
        obj_eng[ele.id] = ele.value;
    })

    // console.log(hindi.checked , Object.keys(obj_hindi).some((ele) => obj_hindi[ele] === "1") , english.checked , Object.keys(obj_eng).some((ele) => obj_eng[ele] === "1") , gujarati.checked
    // , Object.keys(obj_gujarati).some((ele) => obj_gujarati[ele] === "1") , php_check.checked , mysql_check.checked , larave_check.checked , oracle_check.checked , radio_vaildation(php_selected) , radio_vaildation(mysql_selected) , radio_vaildation(larave_selected) , radio_vaildation(oracle_selected));
    if (hindi.checked && Object.keys(obj_hindi).some((ele) => obj_hindi[ele] === "1") && english.checked && Object.keys(obj_eng).some((ele) => obj_eng[ele] === "1") && gujarati.checked
        && Object.keys(obj_gujarati).some((ele) => obj_gujarati[ele] === "1") && php_check.checked && mysql_check.checked && larave_check.checked && oracle_check.checked && radio_vaildation(php_selected) && radio_vaildation(mysql_selected) && radio_vaildation(larave_selected) && radio_vaildation(oracle_selected)) {
        return true;
    } else {
        return false;
    }

}
const reference_contact_validation = () => {
    let obj_ref_1 = {};
    let obj_ref_2 = {};

    Array.from(reference_box_1_inputs).map((ele) => {
        obj_ref_1[ele.id] = empty_string_validation(ele);
    })
    Array.from(reference_box_2_inputs).map((ele) => {
        obj_ref_2[ele.id] = empty_string_validation(ele);
    })
    const ref_1_validation = () => {
        return check_every_true_in_object(obj_ref_1) && !check_any_true_in_object(obj_ref_2);
    }
    const ref_2_validation = () => {
        return check_every_true_in_object(obj_ref_1) && check_every_true_in_object(obj_ref_2);
    }
    if (ref_1_validation() || ref_2_validation()) {
        return true;
    } else {
        return false;
    }
}

const preferances_validation = () => {
    let obj_pref = {};
    console.log(preferances_inputs);
    Array.from(preferances_inputs).map((ele) => {
        obj_pref[ele.id] = empty_string_validation(ele);
    })
    // console.log(obj_pref);
    return check_every_true_in_object(obj_pref);
}

const validation = (form_id) => {
    if (form_id === 1) {
        return basic_details_validation();
    }
    else if (form_id === 2) {
        return education_details_form_validation();
    } else if (form_id === 3) {
        return work_exp_validation();


    } else if (form_id === 4) {
        return language_technology_validation();

    } else if (form_id === 5) {
        return reference_contact_validation();

    } else if (form_id === 6) {
        return preferances_validation();
    } else {
        console.log("No form")
        return false;
    }
};

const prev_page = () => {
    if (count > 1 && count <= obj.length) {
        // console.log("prev");
        check_condition(--count);
        check_condition_for_button(count);

    }
}
const next_page = () => {
    if (count < obj.length && validation(count)) {
        // console.log("next");
        check_condition(++count);
        check_condition_for_button(count);
    }

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
const updateFormDataAsJson = async (url, formData) => {
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJsonString = JSON.stringify(plainFormData);

    const fetchOptions = {
        method: "PUT",
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
    console.log(await response.json());
    return response;
}


const fetchData = async () => {
    if (validation(count)) {
        console.log("fetch data calling");

        const form_data = new FormData(form);
        // console.log(form_data);
        let edu_type = [];
        let name_of_board = [];
        let passing_year = [];
        let percentage = [];
        let company_name = [];
        let work_designation = [];
        let start = [];
        let end = [];
        let language_name = [];
        let is_read = [];
        let is_write = [];
        let is_speak = [];
        let technology_name = [];
        let levels = [];
        let r_name = [];
        let r_contact = [];
        let r_relation = [];

        Array.from(document.querySelectorAll('input[name="edu_type[]"]')).map((ele) => {
            edu_type.push(ele.value);
        })
        Array.from(document.querySelectorAll('input[name="name_of_board[]"]')).map((ele) => {
            name_of_board.push(ele.value);
        })
        Array.from(document.querySelectorAll('input[name="passing_year[]"]')).map((ele) => {
            passing_year.push(ele.value);
        })
        Array.from(document.querySelectorAll('input[name="percentage[]"]')).map((ele) => {
            percentage.push(ele.value);
        })
        Array.from(document.querySelectorAll('input[name="company_name[]"]')).map((ele) => {
            company_name.push(ele.value);
        })
        Array.from(document.querySelectorAll('input[name="work_designation[]"]')).map((ele) => {
            work_designation.push(ele.value);
        })
        Array.from(document.querySelectorAll('input[name="start[]"]')).map((ele) => {
            start.push(ele.value);
        })
        Array.from(document.querySelectorAll('input[name="end[]"]')).map((ele) => {
            end.push(ele.value);
        })
        Array.from(document.querySelectorAll('input[name="language_name[]"]')).map((ele) => {
            language_name.push(ele.value);
        })
        Array.from(document.querySelectorAll('input[name="is_read[]"]')).map((ele) => {
            is_read.push(ele.value);
        })
        Array.from(document.querySelectorAll('input[name="is_write[]"]')).map((ele) => {
            is_write.push(ele.value);
        })
        Array.from(document.querySelectorAll('input[name="is_speak[]"]')).map((ele) => {
            is_speak.push(ele.value);
        })
        Array.from(document.querySelectorAll('input[name="technology_name[]"]')).map((ele) => {
            technology_name.push(ele.value);
        })
        Array.from(document.querySelectorAll('input[name="php_level"]:checked,input[name="mysql_level"]:checked,input[name="larave_level"]:checked,input[name="oracle_level"]:checked')).map((ele) => {
            levels.push(ele.value);
        })
        Array.from(document.querySelectorAll('input[name="r_name[]"]')).map((ele) => {
            r_name.push(ele.value);
        })
        Array.from(document.querySelectorAll('input[name="r_contact[]"]')).map((ele) => {
            r_contact.push(ele.value);
        })
        Array.from(document.querySelectorAll('input[name="r_relation[]"]')).map((ele) => {
            r_relation.push(ele.value);
        })

        form_data.append('edu_type', edu_type);
        form_data.append('name_of_board', name_of_board);
        form_data.append('passing_year', passing_year);
        form_data.append('percentage', percentage);
        form_data.append('company_name', company_name);
        form_data.append('work_designation', work_designation);
        form_data.append('start', start);
        form_data.append('end', end);
        form_data.append('language_name', language_name);
        form_data.append('is_read', is_read);
        form_data.append('is_write', is_write);
        form_data.append('is_speak', is_speak);
        form_data.append('technology_name', technology_name);
        form_data.append('levels', levels);
        form_data.append('r_name', r_name);
        form_data.append('r_contact', r_contact);
        form_data.append('r_relation', r_relation);
        form_data.delete('edu_type[]');
        form_data.delete('name_of_board[]');
        form_data.delete('passing_year[]');
        form_data.delete('percentage[]');
        form_data.delete('company_name[]');
        form_data.delete('work_designation[]');
        form_data.delete('start[]');
        form_data.delete('end[]');
        form_data.delete('language_name[]');
        form_data.delete('is_read[]');
        form_data.delete('is_write[]');
        form_data.delete('is_speak[]');
        form_data.delete('technology_name[]');
        form_data.delete('php_level');
        form_data.delete('mysql_level');
        form_data.delete('larave_level');
        form_data.delete('oracle_level');
        form_data.delete('r_name[]');
        form_data.delete('r_contact[]');
        form_data.delete('r_relation[]');

        if (!employee_id) {
            try {
                const response = await postFormDataAsJson('http://localhost:3000/job_application/send', form_data);
                success_msg.classList.remove("hidden");
                setTimeout(() => {
                    success_msg.classList.add("hidden");
                }, 1200)
            } catch (error) {
                return error;
            }
        } else {
            try {
                const response = await updateFormDataAsJson(`http://localhost:3000/job_application/update/${employee_id}`, form_data);
                success_update_msg.classList.remove("hidden");
                setTimeout(() => {
                    success_update_msg.classList.add("hidden");
                }, 1200)

            } catch (error) {
                return error;
            }
        }

    }
    else {
        console.log("Not validation yet");
    }
}

const edit_basic_details = (obj) => {
    first_name.value = obj.first_name;
    last_name.value = obj.last_name;
    designation.value = obj.designation;
    address_1.value = obj.address_1;
    address_2.value = obj.address_2;
    email.value = obj.email;
    phone_number.value = obj.phone_number;
    city.value = obj.city;
    zipcode.value = obj.zipcode;
    const date = obj.date_of_birth.split("-");
    javascript_date = `${date[2].substr(0, 2)}/${date[1]}/${date[0]}`;
    date_of_birth.value = javascript_date;
    state.value = obj.state;
    node_by_id(obj.gender).checked = true;
    relationship_status.value = obj.relationship_status;
}

const edit_education = (arr) => {
    const html_roots = [ssc_results_inputs, hsc_diploma_results_inputs, bachlore_degree_results_inputs, master_degree_results_inputs];
    return html_roots.map((ele, index1) => {
        Array.from(ele).map((ele, index) => {
            // console.log(ele, arr[index1][Object.keys(arr[index1])[index+3]]);
            if (arr[index1]) {
                ele.value = arr[index1][Object.keys(arr[index1])[index + 3]];
            }
        })
    })
}

const edit_work_exp = (arr) => {
    const html_roots = [work_exp_box_1_inputs, work_exp_box_2_inputs, work_exp_box_3_inputs];
    return html_roots.map((ele, index1) => {
        Array.from(ele).map((ele, index) => {
            // console.log(ele, arr[index1],arr[index1][Object.keys(arr[index1])[index + 2]]);
            if (arr[index1]) {
                ele.value = arr[index1][Object.keys(arr[index1])[index + 2]];
                //if total index 4 & 5 then take as a date
                if (index === 2 || index === 3) {
                    const date = arr[index1][Object.keys(arr[index1])[index + 2]].split("-");
                    javascript_date = `${date[2].substr(0, 2)}/${date[1]}/${date[0]}`;
                    ele.value = javascript_date;
                }
            }
        })
    })
};

const edit_ref_contact = (arr) => {
    const html_roots = [reference_box_1_inputs, reference_box_2_inputs]
    return html_roots.map((ele, index1) => {
        if (arr[index1]) {
            Array.from(ele).map((ele, index) => {
                ele.value = arr[index1][Object.keys(arr[index1])[index + 2]]
            })
        }
    })
};

const edit_pref = (obj) => {
    return Array.from(preferances_inputs).map((ele, index) => {
        // console.log(ele, obj[Object.keys(obj)[index + 2]]);
        if (obj[Object.keys(obj)[index + 2]]) {
            ele.value = obj[Object.keys(obj)[index + 2]];
        }
    })
}

const edit_language = (arr) => {
    const html_root = [
        { id: 0, lan_root: hindi, lan_op: hindi_checks },
        { id: 1, lan_root: english, lan_op: english_checks },
        { id: 2, lan_root: gujarati, lan_op: gujarati_checks }
    ]
    return Array.from(html_root).map((ele, index1) => {
        // console.log(ele.lan_root, arr[index1]["language_name"]);
        if (arr[index1]["language_name"]) {
            ele.lan_root.value = arr[index1]["language_name"];
            ele.lan_root.checked = true;
        }
        Array.from(ele.lan_op).map((ele, index) => {
            // console.log(ele, arr[index1][Object.keys(arr[index1])[index + 3]])
            if (arr[index1][Object.keys(arr[index1])[index + 3]] === 1) {
                ele.value = 1;
                ele.checked = true;
            } else {
                ele.value = 0;
                ele.checked = false;
            }
            // console.log(ele, arr[index1][Object.keys(arr[index1])[index + 3]])
        })
    })
}

const edit_technology = (arr) => {
    const html_root = [
        { id: 0, tech_ch: php_check, tech_rd: php_radios },
        { id: 1, tech_ch: mysql_check, tech_rd: mysql_radios },
        { id: 2, tech_ch: larave_check, tech_rd: larave_radios },
        { id: 3, tech_ch: oracle_check, tech_rd: oracle_radios }
    ]
    return Array.from(html_root).map((ele, index1) => {
        // console.log(ele, arr[index1]);
        ele[Object.keys(ele)[1]].value = arr[index1][Object.keys(arr[index1])[2]];
        ele[Object.keys(ele)[1]].checked = true;
        // ele[Object.keys(ele)[2]] = true;
        Array.from(ele[Object.keys(ele)[2]]).map((ele) => {
            // console.log(ele, `${arr[index1][Object.keys(arr[index1])[2]]}_${arr[index1][Object.keys(arr[index1])[3]]}`);
            let id = `${arr[index1][Object.keys(arr[index1])[2]]}_${arr[index1][Object.keys(arr[index1])[3]]}`;
            // console.log(id);
            node_by_id(id).checked = true;
            node_by_id(id).value = arr[index1][Object.keys(arr[index1])[3]];

        })
    })
}

//ifee function
(async () => {
    //for updating process
    if (employee_id) {
        console.log("edit mode");
        try {
            let data = await fetch(`http://localhost:3000/fetch/${employee_id}`)
            let json_data = await data.json();
            const { basic_details, educations, languages, preferances, reference_contacts, technology_details, work_experiences } = { ...json_data }
            // console.log(basic_details, educations, languages, preferances, reference_contacts, technology_details, work_experiences);
            edit_basic_details(basic_details);
            edit_education(educations);
            edit_work_exp(work_experiences);
            edit_language(languages);
            edit_technology(technology_details);
            edit_ref_contact(reference_contacts);
            edit_pref(preferances);
        } catch (error) {
            console.log(error);
            return error;
        }

    } else {
        console.log("No edit mode")
    }
})();



prev.addEventListener("click", () => { prev_page() });
next.addEventListener("click", () => { next_page() });
submit.addEventListener("click", () => { fetchData() })
Array.from(check_boxes).map((ele) => {
    ele.addEventListener("click", () => {
        if (!ele.checked) {
            ele.value = 0;
        } else {
            ele.value = 1;
        }
    })

})


