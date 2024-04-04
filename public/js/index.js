const port = 3000;
const project_root = document.getElementById("project_root");
const logout = document.getElementById("logout");

const projectData = [
    {
        id: 1,
        date: "1/2/2024",
        title: "Dynamic Table",
        url: `http://localhost:${port}/dynamic_table`
    },
    {
        id: 2,
        date: "2/2/2024",
        title: "Kuku Cube",
        url: `http://localhost:${port}/kuku_cube`
    },
    {
        id: 3,
        date: "5/2/2024",
        title: "Tic Tac Toe",
        url: `http://localhost:${port}/tic_tac_toe`
    },
    {
        id: 4,
        date: "9/2/2024",
        title: "Static Website 1",
        url: `http://localhost:${port}/static_websites/1`
    },
    {
        id: 5,
        date: "12/2/2024",
        title: "Static Website 2",
        url: `http://localhost:${port}/static_websites/2`
    },
    {
        id: 6,
        date: "14/2/2024",
        title: "Static Website 3",
        url: `http://localhost:${port}/static_websites/3`
    },
    {
        id: 7,
        date: "22/2/2024",
        title: "Crud operation using fs modules",
        url: `http://localhost:${port}/fs_crud/basicdetails`
    },
    {
        id: 8,
        date: "23/2/2024",
        title: "Insert into database from html form",
        url: `http://localhost:${port}/insert_to_db_fr_form/basicdetails`
    },
    {
        id: 9,
        date: "26/2/2024",
        title: "Pagination",
        url: `http://localhost:${port}/pagination`
    },
    {
        id: 10,
        date: "27/2/2024",
        title: "Attendence Master (filter with dropdown)",
        url: `http://localhost:${port}/attendence_master`
    },
    {
        id: 11,
        date: "28/2/2024",
        title: "Exam Master",
        url: `http://localhost:${port}/exam_master`
    },
    {
        id: 12,
        date: "29/2/2024",
        title: "searching by query in database",
        url: `http://localhost:${port}/searching_by_query`
    },
    {
        id: 13,
        date: "4/3/2024",
        title: "searching by multiple fields in database",
        url: `http://localhost:${port}/searching_by_multiple_field`
    },
    {
        id: 14,
        date: "5/3/2024",
        title: "Delimeter search",
        url: `http://localhost:${port}/delimeter_search`
    },
    {
        id: 15,
        date: "10/3/2024",
        title: "Sigle Page Application using ExpressJS",
        url: `http://localhost:${port}/spa`
    },
    {
        id: 16,
        date: "18/3/2024",
        title: "Job Application CRUD",
        url: `http://localhost:${port}/job_application`
    },
]

let html_str = `<span class="border p-5 py-2 flex items-center justify-center bg-gray-100">Project Name </span>
<span class="border p-5 py-2 flex items-center justify-center bg-gray-100">Date</span>`


projectData.map(ele => {
    let project_str = `
    <a href=${ele.url} class="border p-5 py-2 flex items-center justify-center text-purple-600 hover:text-purple-500">${ele.title}</a>
<span class="border p-5 py-2 flex items-center justify-center">${ele.date}</span>`
    html_str += project_str;
})

project_root.innerHTML = html_str;

const logoutUser = async () => {
    await fetch("http://localhost:3000/logout");
    window.location.pathname=`/login`;
}


logout.addEventListener("click", () => { logoutUser() })