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
        menuImg.classList.remove('close');
    } else {
        nav.classList.add('show');
        menuImg.classList.add('close');
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


//Form

let form = document.querySelector('form');
let name = document.querySelector('.formName');
let email = document.querySelector('.email');
let assunto = document.querySelector('.assunto');
let text = document.querySelector('.textArea');
let inputs = form.querySelectorAll('.input');

let formValidator = {
    handleSubmit:(event)=>{
        event.preventDefault();
        let send = true;

        for(let i=0;i<inputs.length;i++) {
            let input = inputs[i];
            let check = formValidator.checkInput(input);
            input.addEventListener('focus', (event) => {
                event.target.style.borderColor = '';
                event.target.placeholder = '';
            });
            if(check !== true) {
                send = false;
                //exibir o erro
                formValidator.showError(input, check);
            }
        }
        
        if(send) {
            form.submit();
        }
    },
    checkInput:(input) => {
        let rules = input.getAttribute('data-rules');

        if(rules !== null) {
            rules = rules.split('|');
            for(let k in rules) {
                let rDetails = rules[k].split('=');
                switch(rDetails[0]) {
                    case 'required':
                        if(input.value == '') {
                            return 'Campo obrigatório';
                        }
                    break;
                    case 'min':
                        if(input.value.length < rDetails[1]) {
                            input.value = '';
                            return `Mínimo ${rDetails[1]} caracteres necessários`
                        }
                    break;
                    case 'email':
                        if(input.value != '') {
                            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            if(!regex.test(input.value.toLowerCase())) {
                                input.value = '';
                                return 'Insira um email válido';
                            }
                        }
                    break;
                }
            }
        }
        return true;
    },
    showError:(input, error) => {
        input.style.borderColor = 'red';
        input.placeholder = error;
    }
};

form.addEventListener('submit', formValidator.handleSubmit);