

let add_col = document.getElementById("add_col");
let sub_col = document.getElementById("sub_col");
let add_row = document.getElementById("add_row");
let sub_row = document.getElementById("sub_row");
let t_body = document.getElementById("table_body");
let row = 2; col = 0;


//functions for actions
const addCol = () => {
    console.log("add col");
    let tr = document.getElementsByTagName("tr");
    // console.log(tr, typeof tr, typeof (Object.keys(tr)));
    Object.values(tr).map((ele) => {
        console.log(ele);

        return ele.insertAdjacentHTML("afterbegin", `<td class="border w-[10rem] h-[10rem]"></td>`);
    })
    col += 1;

}
const subCol = () => {
    console.log("sub col");
    // if (col > 2) {
    let tr = document.getElementsByTagName("tr");
    Object.values(tr).map((ele) => {
        // console.log(ele.lastChild);
        return ele.lastChild.remove();
    })
    col -= 1;
    // }
    // else {
    //     alert("You can't delete the column")
    // }
}
const addRow = () => {
    console.log("add row");
    // let row dynamically
    let row_ele = t_body.firstElementChild.innerHTML;
    // console.log(row_ele);
    t_body.insertAdjacentHTML("afterbegin", row_ele);
    row += 1;

}
const subRow = () => {
    console.log("sub row");
    if (row > 2) {
        let row_ele = t_body.firstElementChild;
        row_ele.remove();
        row -= 1;
    } else {
        alert("you can't delete the row");
    }
}

//event listener for actions
add_col.addEventListener("click", addCol)

sub_col.addEventListener("click", subCol)

add_row.addEventListener("click", addRow)

sub_row.addEventListener("click", subRow)
