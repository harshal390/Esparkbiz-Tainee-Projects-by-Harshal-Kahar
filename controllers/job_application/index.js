const db = require('../../config/db');
const errorHandler = require("../../controllers/error/error_handler");

const insert_into_basic_details = async (forms_data) => {
    try {
        const sql = `INSERT INTO basic_details (first_name,last_name,designation,address_1,address_2,email,phone_number,city,state,gender,zipcode,relationship_status,date_of_birth) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?)`;
        const { first_name, last_name, designation, address_1, address_2, email, phone_number, city, state, gender, zipcode, relationship_status, date_of_birth,
        } = { ...forms_data };
        // console.log(forms_data);
        const result = await db.query(sql, [first_name, last_name, designation, address_1, address_2, email, phone_number, city, state, gender, zipcode, relationship_status, date_of_birth.split("/").reverse().join("-"),
        ]);
        console.log(`data inserted successfully :: basic_details at ${result[0].insertId}`)
        return result[0].insertId;

    } catch (error) {
        return error;
    }
};

const object_to_transpose_2d_array = (obj) => {
    let arr = Object.values(obj);
    let new_arr = arr.map(ele => ele.split(","));

    let big_arr = [];
    for (let i = 0; i < new_arr.length; i++) {
        let obj_1 = {};
        for (let j = 0; j < new_arr[0].length; j++) {
            obj_1[j] = new_arr[i][j];
        }
        big_arr.push(obj_1);
    }
    // console.log(big_arr);
    let keys = new Set(big_arr.flatMap(ele => Object.keys(ele)));
    const result = [];
    for (let key of keys) {
        const values = [];
        for (let ele of big_arr) {
            values.push(ele[key] || "");
        }
        result.push(values);
    }
    return result;
};

const insert_into_education_details = async (last_inserted_id, forms_data) => {
    forms_data.map(async (ele) => {
        if (!ele.includes('')) {
        let sql = `INSERT INTO educations (employee_id,edu_type,name_of_board,passing_year,percentage) VALUES (${last_inserted_id},"${ele[0]}","${ele[1]}","${ele[2]}","${ele[3]}");`;
        // console.log(sql)
        try {
            await db.query(sql);
            console.log(`data inserted successfully :: education_details at ${last_inserted_id}`);
        } catch (error) {
            console.log(error);
            return error;
        }
    }
    });
};

const insert_into_work_experiences = async (last_inserted_id, forms_data) => {
    forms_data.map(async (ele) => {
        // console.log(ele.includes(''));
        if (!ele.includes('')) {
            let sql = `INSERT INTO work_experiences (employee_id,company_name,designation,start_date,end_date) VALUES (${last_inserted_id},"${ele[0]}","${ele[1]}","${ele[2].split("/").reverse().join("-")}","${ele[3].split("/").reverse().join("-")}");`;
            console.log(sql)
            try {
                await db.query(sql);
                console.log(`data inserted successfully :: work_experiences at ${last_inserted_id}`);
            } catch (error) {
                console.log(error);
                return error;
            }
        }
    });
}

const insert_into_languages = async (last_inserted_id, forms_data) => {
    forms_data.map(async (ele) => {
        let sql = `INSERT INTO languages (employee_id,language_name,is_read,is_write,is_speak) VALUES (${last_inserted_id},"${ele[0]}","${ele[1]}","${ele[2]}","${ele[3]}");`;
        // console.log(sql)
        try {
            await db.query(sql);
            console.log(`data inserted successfully :: languages at ${last_inserted_id}`);
        } catch (error) {
            console.log(error);
            return error;
        }
    });
}

const insert_into_technology_details = async (last_inserted_id, forms_data) => {
    forms_data.map(async (ele) => {
        let sql = `INSERT INTO technology_details (employee_id,technology_name,technology_level) VALUES (${last_inserted_id},"${ele[0]}","${ele[1]}");`;
        // console.log(sql)
        try {
            await db.query(sql);
            console.log(`data inserted successfully :: technology_details at ${last_inserted_id}`);
        } catch (error) {
            console.log(error);
            return error;
        }

    });

}
const insert_into_reference_contacts = async (last_inserted_id, forms_data) => {
    forms_data.map(async (ele) => {
        if (!ele.includes('')) {
        let sql = `INSERT INTO reference_contacts (employee_id,name,contact,relation) VALUES (${last_inserted_id},"${ele[0]}","${ele[1]}","${ele[2]}");`;
        // console.log(sql)
        try {
            await db.query(sql);
            console.log(`data inserted successfully :: reference_contacts at ${last_inserted_id}`);
        } catch (error) {
            console.log(error);
            return error;
        }
    }
    });
}
const insert_into_preferances = async (last_inserted_id, forms_data) => {
    const { preference_location, notice_period, expected_ctc, current_ctc, department } = { ...forms_data };
    let sql = `INSERT INTO preferances (employee_id,preference_location,notice_period,expected_ctc,current_ctc,department) VALUES (${last_inserted_id},"${preference_location}","${notice_period}","${expected_ctc}","${current_ctc}","${department}");`;
    // console.log(sql)
    try {
        await db.query(sql);
        console.log(`data inserted successfully :: preferances at ${last_inserted_id}`);
    } catch (error) {
        console.log(error);
        return error;
    }
}

const fetch_data = async (sql_query) => {
    try {
        const [results, fields] = await db.query(sql_query);
        return results;
    } catch (error) {
        console.log(error);
        return error;
    }
};

const update_into_basic_details = async (forms_data, employee_id) => {
    const { first_name, last_name, designation, address_1, address_2, email, phone_number, city, state, gender, zipcode, relationship_status, date_of_birth } = { ...forms_data };

    const sql = `update basic_details set first_name='${first_name}',last_name ='${last_name}',designation ='${designation}',address_1 ='${address_1}',address_2 ='${address_2}',email ='${email}',phone_number ='${phone_number}',city ='${city}',state ='${state}' ,gender ='${gender}',zipcode ='${zipcode}',relationship_status ='${relationship_status}',date_of_birth ='${date_of_birth.split("/").reverse().join("-")}' where employee_id ='${employee_id}';`
    try {
        let res = await db.query(sql);
        console.log(`data updated successfully :: basic_details at ${employee_id}`);
    } catch (error) {
        return error;
    }
};

const update_into_education_details = async (forms_data, employee_id) => {
    forms_data.map(async (ele) => {
        let sql_1 = `delete from educations where employee_id ='${employee_id}';`;
        let sql_2 = `INSERT INTO educations (employee_id,edu_type,name_of_board,passing_year,percentage) VALUES ("${employee_id}","${ele[0]}","${ele[1]}","${ele[2]}","${ele[3]}");`;
        console.log(sql_1, sql_2);
        try {
            await db.query(sql_1);
            await db.query(sql_2);
            console.log(`data updated successfully :: education_details at ${employee_id}`);
        } catch (error) {
            console.log(error);
            return error;
        }
    });

}

const jobApplication = async (req, res) => {
    res.render("job_application/index.ejs");
}

const postJobApplication = async (req, res) => {
    // console.log(req.body);
    let form_data = req.body;
    console.log(form_data);
    const basic_details = {
        first_name: form_data.first_name,
        last_name: form_data.last_name,
        designation: form_data.designation,
        address_1: form_data.address_1,
        address_2: form_data.address_2,
        email: form_data.email,
        phone_number: form_data.phone_number,
        city: form_data.city,
        zipcode: form_data.zipcode,
        date_of_birth: form_data.date_of_birth,
        state: form_data.state,
        gender: form_data.gender,
        relationship_status: form_data.relationship_status,
    }
    const education_details = {
        edu_type: form_data.edu_type,
        name_of_board: form_data.name_of_board,
        passing_year: form_data.passing_year,
        percentage: form_data.percentage
    }

    const work_experiences = {
        company_name: form_data.company_name,
        designation: form_data.work_designation,
        start: form_data.start,
        end: form_data.end
    }

    const languages = {
        language_name: form_data.language_name,
        is_read: form_data.is_read,
        is_write: form_data.is_write,
        is_speak: form_data.is_speak
    }

    const technology_details = {
        technology_name: form_data.technology_name,
        levels: form_data.levels,
    }

    const reference_contact_details = {
        r_name: form_data.r_name,
        r_contact: form_data.r_contact,
        r_relation: form_data.r_relation
    }

    const preference = {
        preference_location: form_data.preference_location,
        notice_period: form_data.notice_period,
        expected_ctc: form_data.expected_ctc,
        current_ctc: form_data.current_ctc,
        department: form_data.department
    }
    // console.log(form_data, preference);
    let education_2d_arr = object_to_transpose_2d_array(education_details);
    let work_experiences_2d_arr = object_to_transpose_2d_array(work_experiences);
    let languages_2d_arr = object_to_transpose_2d_array(languages);
    let technology_details_2d_arr = object_to_transpose_2d_array(technology_details);
    let reference_contact_details_2d_arr = object_to_transpose_2d_array(reference_contact_details);

    try {
        let last_id = await insert_into_basic_details(basic_details);
        // console.log(last_id);
        await insert_into_education_details(last_id, education_2d_arr);
        await insert_into_work_experiences(last_id, work_experiences_2d_arr);
        await insert_into_languages(last_id, languages_2d_arr);
        await insert_into_technology_details(last_id, technology_details_2d_arr);
        await insert_into_reference_contacts(last_id, reference_contact_details_2d_arr);
        await insert_into_preferances(last_id, preference);
        res.send("data added successfully...");
    } catch (error) {
        res.send(JSON.stringify(error));
    }
}

const jobApplicationUpdationUi = async (req, res) => {
    res.render('job_application/index.ejs');
}

const updateJobApplication = async (req, res) => {
    let employee_id = req.params.id;
    console.log("put route", employee_id);
    let form_data = req.body;
    // console.log(form_data);
    const basic_details = {
        first_name: form_data.first_name,
        last_name: form_data.last_name,
        designation: form_data.designation,
        address_1: form_data.address_1,
        address_2: form_data.address_2,
        email: form_data.email,
        phone_number: form_data.phone_number,
        city: form_data.city,
        zipcode: form_data.zipcode,
        date_of_birth: form_data.date_of_birth,
        state: form_data.state,
        gender: form_data.gender,
        relationship_status: form_data.relationship_status,
    }
    const education_details = {
        edu_type: form_data.edu_type,
        name_of_board: form_data.name_of_board,
        passing_year: form_data.passing_year,
        percentage: form_data.percentage
    }

    const work_experiences = {
        company_name: form_data.company_name,
        designation: form_data.work_designation,
        start: form_data.start,
        end: form_data.end
    }

    const languages = {
        language_name: form_data.language_name,
        is_read: form_data.is_read,
        is_write: form_data.is_write,
        is_speak: form_data.is_speak
    }

    const technology_details = {
        technology_name: form_data.technology_name,
        levels: form_data.levels,
    }

    const reference_contact_details = {
        r_name: form_data.r_name,
        r_contact: form_data.r_contact,
        r_relation: form_data.r_relation
    }

    const preference = {
        preference_location: form_data.preference_location,
        notice_period: form_data.notice_period,
        expected_ctc: form_data.expected_ctc,
        current_ctc: form_data.current_ctc,
        department: form_data.department
    }
    let education_2d_arr = object_to_transpose_2d_array(education_details);
    let work_experiences_2d_arr = object_to_transpose_2d_array(work_experiences);
    let languages_2d_arr = object_to_transpose_2d_array(languages);
    let technology_details_2d_arr = object_to_transpose_2d_array(technology_details);
    let reference_contact_details_2d_arr = object_to_transpose_2d_array(reference_contact_details);

    try {
        await update_into_basic_details(basic_details, employee_id);
        await update_into_education_details(education_2d_arr, employee_id)
        // await insert_into_education_details(last_id, education_2d_arr);
        // await insert_into_work_experiences(last_id, work_experiences_2d_arr);
        // await insert_into_languages(last_id, languages_2d_arr);
        // await insert_into_technology_details(last_id, technology_details_2d_arr);
        // await insert_into_reference_contacts(last_id, reference_contact_details_2d_arr);
        // await insert_into_preferances(last_id, preference);
        res.send(JSON.stringify({ msg: "data updated successfully..." }));
    } catch (error) {
        console.log(error);
        res.send(JSON.stringify(error));
    }
}

const fetchJobApplicationData = async (req, res) => {
    let employee_id = req.params.id;
    let basic_details = await fetch_data(`select * from basic_details where employee_id='${employee_id}';`);
    let educations = await fetch_data(`select * from educations where employee_id='${employee_id}';`)
    let work_experiences = await fetch_data(`select * from work_experiences where employee_id='${employee_id}';`);
    let languages = await fetch_data(`select * from languages where employee_id='${employee_id}';`)
    let technology_details = await fetch_data(`select * from technology_details where employee_id='${employee_id}';`)
    let reference_contacts = await fetch_data(`select * from reference_contacts where employee_id='${employee_id}';`)
    let preferances = await fetch_data(`select * from preferances where employee_id='${employee_id}';`)
    let obj = { basic_details: basic_details[0], educations, work_experiences, languages, technology_details, reference_contacts, preferances: preferances[0] }
    console.log(obj);
    res.send(JSON.stringify(obj));
}

module.exports = { jobApplication, postJobApplication,jobApplicationUpdationUi,updateJobApplication,fetchJobApplicationData };