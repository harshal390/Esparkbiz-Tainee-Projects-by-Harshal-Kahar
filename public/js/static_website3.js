let carousel_1 = document.getElementById("carousel_1");
let carousel_2 = document.getElementById("carousel_2");
let carousel_3 = document.getElementById("carousel_3");
let left = document.getElementById("left");
let right = document.getElementById("right");
let index = 0;

const carousel = [carousel_1, carousel_2, carousel_3];

const leftSlide = () => {

    if (index > 0) {
        carousel[index].classList.add("hidden");
        carousel[--index].classList.remove("hidden");
        carousel[index].classList.remove("slide_in");
        carousel[index].classList.add("slide_up");
        right.classList.remove("opacity-fifty");
        if (!index) {
            left.classList.add("opacity-fifty");
        }
    }

};

const rightSlide = () => {

    if (index < carousel.length - 1) {
        console.log(index);
        carousel[index].classList.add("hidden");
        carousel[++index].classList.remove("hidden");
        carousel[index].classList.remove("slide_up");
        carousel[index].classList.add("slide_in");
        left.classList.remove("opacity-fifty");
        if (index === carousel.length - 1) {
            right.classList.add("opacity-fifty");
        }
    }

}

//addding event listners

left.addEventListener("click", leftSlide);

right.addEventListener("click", rightSlide);

