class Box3D {
    constructor(obj) {
        this.varDebounce = 0; // ТаймАут срабатывания всей анимации
        this.сountdownAnim = 0; // ТаймАут срабатывания анимации завершения
        this.card = document.querySelector(obj.card); // Анимируемый блок
        this.card__container = document.querySelector(obj.card__container); // Блок контейнер
        this.tiltAngle = obj.tiltAngle || 10; // угол отклонения в градусах
        this.card__container.addEventListener('mousemove', this.mainAnimate.bind(this));
        this.circle__shadow = document.querySelector(obj.circle__shadow); // Внутренняя тень
    }

    clearTagStyle(el) {
        el.forEach(item => item.removeAttribute('style'));
    }

    mainAnimate(e) {
        clearTimeout(this.varDebounce);
        clearTimeout(this.сountdownAnim);
        this.varDebounce = setTimeout(() => {
            let rect = e.target.getBoundingClientRect();
            let offset_x = e.offsetX || e.layerX
            let offset_y = e.offsetY || e.layerY
            let x = 100 * offset_x / rect.width;
            let y = 100 * offset_y / rect.height;

            if (x < 50 && y < 50) { // Левый верхний угол
                this.elementDirectionalShift(this.tiltAngle, -this.tiltAngle);
            } else if (x > 50 && y < 50) { // Правый верхний угол
                this.elementDirectionalShift(this.tiltAngle, this.tiltAngle, '-', '');
            } else if (x < 50 && y > 50) { // Левый нижний угол
                this.elementDirectionalShift(-this.tiltAngle, -this.tiltAngle, '', '-');
            } else if (x > 50 && y > 50) { // Правый нижний угол
                this.elementDirectionalShift(-this.tiltAngle, this.tiltAngle, '-', '-');
            }
        }, 1);

        this.сountdownAnim = setTimeout(() => {
            this.clearTagStyle([this.card]);
            this.clearTagStyle([this.circle__shadow]);
        }, 3000)
    }

    elementDirectionalShift(x, y, signX = '', signY = '') {
        this.card.style.transform = `perspective(1200px) rotateX(${x}deg) rotateY(${y}deg) translateZ(0)`;
        this.circle__shadow.style.boxShadow = `${signX}7px ${signY}7px 20px 10px #0009, inset 0 0 1px 2px rgba(146, 82, 82, 0.56)`;
    }
}

window.addEventListener('load', () => {
    let obg_card = {
        card: '.loader', // Анимируемый блок
        card__container: '.container', // Блок контейнер
        tiltAngle: 35, // угол отклонения в градусах
        circle__shadow: '.circle__shadow',
    };
    new Box3D(obg_card);

    /* Anime.js*/
    let wrap_anime_div = document.querySelector('.wrap_anime_div');
    let wrap_anime_div1 = document.querySelector('.wrap_anime_div1');

    for (let i = 0; i <= 50; i++) {
        const div = document.createElement('div');
        div.classList.add('block');
        wrap_anime_div.appendChild(div);
    }

    for (let i = 0; i <= 50; i++) {
        const div = document.createElement('div');
        div.classList.add('block');
        wrap_anime_div1.appendChild(div);
    }

    function animateDiv() {
        anime({
            targets: '.block',
            translateX: function () {
                return anime.random(-1100, 1100);
            },
            translateY: function () {
                return anime.random(-500, 500);
            },
            scale: function () {
                return anime.random(1, 5);
            },
            easing: 'linear',
            duration: 5000,
            delay: anime.stagger(10),
            complete: animateDiv,
        })
    }

    animateDiv();

    /* Анимация заголовка */
    let header = document.querySelectorAll('.header__svg path');
    startAnimateText()
    function startAnimateText() {
        let i = 0
        let idInterval = setInterval(() => {
            if (i < 1600) {
                i > 1000 ? i += 10 : i += 3;
                header.forEach(item => item.style.strokeDasharray = `${i}px`);
            } else {
                header.forEach(item => {
                    item.style.strokeDasharray = `3000px`
                    item.animate([{fill: 'rgba(250,250,250, 1)'},{fill: 'rgba(0,0,0, 0)'}],
                        {
                            duration: 2000,
                            easing: 'ease-in-out',
                            fill: 'forwards'
                        });
                });
                clearInterval(idInterval);
                backAnimateText()
            }
        }, 50)
    }

    function backAnimateText() {
        let i = 1600
        let idInterval = setInterval(() => {
            if (i > 1600) {
                i < 1000 ? i -= 3 : i -= 10;
                header.forEach(item => item.style.strokeDasharray = `${i}px`);
            } else {
                header.forEach(item => item.style.strokeDasharray = `1600px`);
                clearInterval(idInterval);
                startAnimateText();
            }
        }, 50);
    }
});
