//Menu
function selectMenu(n) {
    let menus = document.querySelectorAll('nav ul li');
    for(i=0; i<menus.length; i++) {
        menus[i].classList.remove('selected');
    }
    menus[n].classList.add('selected');
};

function toggleMenu() {
    let nav = document.querySelector('nav');
    let menuImg = document.querySelector('.menu-opener');
    if(nav.classList.contains('show')) {
        nav.classList.remove('show');
        menuImg.style.backgroundImage = ('url(/images/menu.png)');
    } else {
        nav.classList.add('show');
        menuImg.style.backgroundImage = ('url(/images/close.png)');
    };
};

let sections = document.querySelectorAll('section');
let menuList = document.querySelectorAll('nav ul li');
const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                let id = entry.target.id;
                for(i=0; i<menuList.length; i++) {
                    menuList[i].classList.remove('selected');
                    if(menuList[i].classList.contains(id)) {
                        menuList[i].classList.add('selected')
                    }
                }
            }
        })
    },
    {
        threshold: 0.7,
    }
);

sections.forEach(element => {
    observer.observe(element);
});


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

