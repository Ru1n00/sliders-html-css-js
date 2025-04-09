let next = document.getElementById('next');
let prev = document.getElementById('prev');

let carousel = document.querySelector('.carousel');

let items = document.querySelectorAll('.carousel .item');
let countItem = items.length;

let active = 1;
let other_1 = null;
let other_2 = null;

next.onclick = () => {
    carousel.classList.add('next');
    carousel.classList.remove('prev');
    active = active + 1 >= countItem ? 0 : active + 1;
    other_1 = active - 1 < 0 ? countItem - 1 : active - 1;
    other_2 = active + 1 >= countItem ? 0 : active + 1;
    changeSlider();
}

prev.onclick = () => {
    carousel.classList.add('prev');
    carousel.classList.remove('next');
    active = active - 1 < 0 ? countItem - 1 : active - 1;
    other_1 = active + 1 >= countItem ? 0 : active + 1;
    other_2 = other_1 + 1 >= countItem ? 0 : other_1 + 1;
    changeSlider();
}

const changeSlider = () => {
    let itemOldActive = document.querySelector('.carousel .item.active');
    if(itemOldActive) itemOldActive.classList.remove('active');

    let itemOldOther1 = document.querySelector('.carousel .item.other_1');
    if(itemOldOther1) itemOldOther1.classList.remove('other_1');

    let itemOldOther2 = document.querySelector('.carousel .item.other_2');
    if(itemOldOther2) itemOldOther2.classList.remove('other_2');

    items.forEach((item) => {
        item.querySelector('.image img').style.animation = 'none';
        item.querySelector('.image figcaption').style.animation = 'none';
        void item.offsetWidth; // trigger reflow
        item.querySelector('.image img').style.animation = '';
        item.querySelector('.image figcaption').style.animation = '';
    })

    items[active].classList.add('active');
    items[other_1].classList.add('other_1');
    items[other_2].classList.add('other_2');

    clearInterval(autoplay);
    autoplay = setInterval(() => {
        next.click();
    }, 5000);
}

let autoplay = setInterval(() => {
    next.click();
}, 5000);