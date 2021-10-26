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
                i > 1000 ? i += 50 : i += 2;
                header.forEach(item => item.style.strokeDasharray = `${i}px`);
            } else {
                header.forEach(item => {
                    item.style.strokeDasharray = `3000px`
                    item.animate([{fill: 'rgb(85,2,12)'},{fill: 'rgba(0,0,0, 0)'}],
                        {
                            duration: 2000,
                            easing: 'ease-in-out',
                            fill: 'forwards'
                        });
                });
                clearInterval(idInterval);
                backAnimateText()
            }
        }, 80)
    }

    function backAnimateText() {
        let i = 1600
        let idInterval = setInterval(() => {
            if (i > 1600) {
                i < 1000 ? i -= 25 : i -= 50;
                header.forEach(item => item.style.strokeDasharray = `${i}px`);
            } else {
                header.forEach(item => item.style.strokeDasharray = `1600px`);
                clearInterval(idInterval);
                startAnimateText();
            }
        }, 80);
    }
});