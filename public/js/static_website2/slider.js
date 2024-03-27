let right = document.getElementById('right');
let left = document.getElementById('left');
let slider = document.getElementById("slider");
let increment = 0;

const rightClick = () => {
    //my card width is 400 view point
    if (increment >= 0 && increment < 1200) {
        increment += 400;
        console.log("right side", increment);
        slider.scrollTo(increment, 0);
    }
}

const leftClick = () => {
    if (increment >= 400) {
        increment -= 400;
        console.log("left side", increment);
        slider.scrollTo(increment, 0);
    }
}

right.addEventListener("click", rightClick);
left.addEventListener("click", leftClick);