let arrayOfboxes = document.getElementsByClassName("box");
let click = 0;
let is_x = false;
let values = [];
let winner = document.getElementById("winner");
let is_won = false;

// console.log(arrayOfboxes);

Object.values(arrayOfboxes).forEach((ele, index) => {
    // console.log(ele)
    ele.addEventListener("click", () => {
        // console.log(arrayOfboxes[index], arrayOfboxes[index].textContent)
        if (is_x) {
            if (arrayOfboxes[index].textContent !== "O" && arrayOfboxes[index].textContent !== "X" && !is_won) {
                arrayOfboxes[index].textContent = "O";
                values[index] = arrayOfboxes[index].textContent;
                is_x = false;
            }
        }
        else {
            if (arrayOfboxes[index].textContent !== "O" && arrayOfboxes[index].textContent !== "X" && !is_won) {
                arrayOfboxes[index].textContent = "X";
                values[index] = arrayOfboxes[index].textContent;
                is_x = true;
            }
        }
        let filteredArray = values.filter(function (ele) {
            return ele != null || ele != undefined || ele != "";
        });
        // console.log(values.length, filteredArray.length);

        //final output who is winner
        let box1 = arrayOfboxes[0].textContent;
        let box2 = arrayOfboxes[1].textContent;
        let box3 = arrayOfboxes[2].textContent;
        let box4 = arrayOfboxes[3].textContent;
        let box5 = arrayOfboxes[4].textContent;
        let box6 = arrayOfboxes[5].textContent;
        let box7 = arrayOfboxes[6].textContent;
        let box8 = arrayOfboxes[7].textContent;
        let box9 = arrayOfboxes[8].textContent;

        //  condition 1 & 2 & 3 ((1,2,3) & (1,4,7) & (1,5,7))
        if ((box1 && box1 == box2 && box1 == box3) || (box1 && box1 == box4 && box1 == box7) || (box1 && box1 == box5 && box1 == box9)) {
            if (!is_won) {
                is_won = true;
                console.log(`${box1} is winner`);
                winner.innerHTML = `Congratulations..!! user ${box1} 🏆.`;
                setTimeout(() => {
                    location.reload();
                }, 1000);

            }
        }
        //condition 4 & 5 & 6 ((4,5,6) & (2,5,8) & (3,5,7))
        else if ((box5 && box5 == box4 && box5 == box6) || (box5 && box5 == box2 && box5 == box8) || (box5 && box5 == box3 && box5 == box7)) {
            if (!is_won) {
                is_won = true;
                console.log(`${box5} is winner`);
                winner.innerHTML = `Congratulations..!! user ${box5} 🥳.`;
                setTimeout(() => {
                    location.reload();
                }, 1000);
            }
        }
        //condition 7, 8 (7,8,9) & (3,6,9)
        else if ((box9 && box9 == box7 && box9 == box8) || (box9 && box9 == box3 && box9 == box6)) {
            if (!is_won) {
                is_won = true;
                console.log(`${box9} is winner`);
                winner.innerHTML = `Congratulations..!! user ${box9} 🤩.`;
                setTimeout(() => {
                    location.reload();
                }, 1000);
            }
        }
        else if (filteredArray.length === 9) {
            console.log("Match draw");
            winner.innerHTML = `Draw Match 😐`;
            setTimeout(() => {
                location.reload();
            }, 1000);
        }
    });


});





//compare three elements
// if (g == h && g == f && g !== null) {

// }

