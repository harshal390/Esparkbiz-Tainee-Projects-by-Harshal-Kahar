const express = require("express");
const route = express.Router();
const { insert_into_basic_details, object_to_transpose_2d_array, insert_into_education_details, insert_into_work_experiences, insert_into_languages, insert_into_technology_details, insert_into_reference_contacts, insert_into_preferances } = require("../../controllers/job_application");

route.get("/job_application", async (req, res) => {
    res.render("job_application/index.ejs");
});


route.post("/job_application/send", async (req, res) => {
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
});

module.exports = route;