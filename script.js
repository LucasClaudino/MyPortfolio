// Slides

let totalSlides = document.querySelectorAll('.slide').length;
let currentSlide = 0;


document.querySelector('.slider-controls').style.height = `${document.querySelector('.slider').clientHeight}px`;

function goPrev() {
    currentSlide--;
    if(currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }
    updateMargin();
};
function goNext() {
    currentSlide++;
    if(currentSlide > (totalSlides - 1)) {
        currentSlide = 0;
    }
    updateMargin();
};
function updateMargin() {
    let newMargin = (currentSlide * document.querySelector('.slide').clientWidth);
    document.querySelector('.slider').style.marginLeft = `-${newMargin}px`;
};
