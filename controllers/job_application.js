const db = require("../config/db");

const insert_into_basic_details = async (forms_data) => {
    try {
        const sql = `INSERT INTO basic_details (first_name,last_name,designation,address_1,address_2,email,phone_number,city,state,gender,zipcode,relationship_status,date_of_birth) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?)`;
        const {
            first_name,
            last_name,
            designation,
            address_1,
            address_2,
            email,
            phone_number,
            city,
            state,
            gender,
            zipcode,
            relationship_status,
            date_of_birth,
        } = { ...forms_data };
        // console.log(forms_data);
        const result = await db.query(sql, [
            first_name,
            last_name,
            designation,
            address_1,
            address_2,
            email,
            phone_number,
            city,
            state,
            gender,
            zipcode,
            relationship_status,
            date_of_birth.split("/").reverse().join("-"),
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
        let sql = `INSERT INTO educations (employee_id,edu_type,name_of_board,passing_year,percentage) VALUES (${last_inserted_id},"${ele[0]}","${ele[1]}","${ele[2]}","${ele[3]}");`;
        // console.log(sql)
        try {
            await db.query(sql);
            console.log(`data inserted successfully :: education_details at ${last_inserted_id}`);
        } catch (error) {
            console.log(error);
            return error;
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
        let sql = `INSERT INTO reference_contacts (employee_id,name,contact,relation) VALUES (${last_inserted_id},"${ele[0]}","${ele[1]}","${ele[0]}");`;
        // console.log(sql)
        try {
            await db.query(sql);
            console.log(`data inserted successfully :: reference_contacts at ${last_inserted_id}`);
        } catch (error) {
            console.log(error);
            return error;
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
        console.log(sql_1,sql_2);
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


module.exports = { insert_into_basic_details, insert_into_education_details, object_to_transpose_2d_array, insert_into_work_experiences, insert_into_languages, insert_into_technology_details, insert_into_reference_contacts, insert_into_preferances, fetch_data, update_into_basic_details, update_into_education_details };