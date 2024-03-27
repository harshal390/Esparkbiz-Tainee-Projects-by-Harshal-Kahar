let grid_parent = document.getElementById("grid_parent");
let row = 2;// & column is also same
let score = 0;
let counter = 45;
let is_pause = false;
let pauseButton = document.getElementById("pause");

const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const click_that_box = () => {
    if (!is_pause) {
        {
            console.log("click that box");
            document.getElementById("score").innerHTML = ++score;
            display_grid(++row);
            console.log(getRandomColor())
        }
    }
}

const wrong_that_box = () => {
    if (!is_pause) {
        document.getElementById("score").innerHTML = --score;
        alert("you have clicked wrong box");
    }
}

pauseButton.addEventListener("click", () => {
    is_pause = !is_pause;
    pauseButton.innerHTML = is_pause ? "Resume" : "Pause"
    console.log(is_pause);
})

let refreshInterval = setInterval(() => {
    if (!is_pause) {
        document.getElementById("counter").innerHTML = --counter;
        // console.log(counter);
        if (counter === 0) {
            clearInterval(refreshInterval);
            alert(`Your game is over,& final score is ${score}`);
            location.reload();
        }
    }
}, 750);

const display_grid = (row_num) => {
    let box = ``;
    let random_num = randomIntFromInterval(1, row_num * row_num);
    let random_color = getRandomColor()
    console.log(random_num);
    document.getElementById("grid_box").remove();
    grid_parent.innerHTML = `<div class="grid grid-cols-${row_num} gap-1 h-[50rem] w-[50rem] border p-1 bg-white rounded-lg" id="grid_box">
        ${(function fun() {
            // Do your loop here
            let square = row_num * row_num;
            console.log(square);
            for (let i = 1; i <= square; i++) {
                if (i !== random_num) box += `<div class="w-auto h-auto border rounded-xl bg-[${random_color}]" onclick="wrong_that_box()"></div>`
                else box += `<div class="w-auto h-auto border rounded-xl bg-[${random_color}]/70 cursor-pointer" id="selected_box" onclick="click_that_box()"></div>`
            }
            return box;
        })()}
    </div>`;
    let grid_box = document.getElementById("grid_box");
    console.log(grid_box.childElementCount);
    return;
}






