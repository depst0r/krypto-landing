import '/src/sass/style.scss';

window.addEventListener('DOMContentLoaded', () => {

    //! Header - navigation / gamburger

    const showMenu = () => {
        try {
            const gamburger = document.querySelector('.header__gamburger');
            const mobileNav = document.querySelector('.header__nav-mobile ');

            gamburger.addEventListener('click', () => {
                gamburger.classList.toggle('active')
                mobileNav.classList.toggle('active')
            })

            document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : 'auto';
        } catch (error) {
            console.error('Error initializing mobile menu:', error.message);
        }

    };

    //!Timer

    const deadLine = '2025-11-09';

    const getTimeRemaining = endTime => {
        let days, hours, minutes, seconds;

        const total = Date.parse(endTime) - Date.parse(new Date());

        if (total <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(total / (1000 * 60 * 60 * 24))
            hours = Math.floor((total / (1000 * 60 * 60)) % 24);
            minutes = Math.floor((total / 1000 / 60) % 60)
            seconds = Math.floor((total / 1000) % 60)
        }

        return {
            total,
            days,
            hours,
            minutes,
            seconds,
        };
    };

    const getZero = num => {
        if (num >= 0 && num < 10) {
            return `0${num}`
        } else {
            return num
        };
    };

    const setClock = (selector, endTime) => {
        const timer = document.querySelector(selector)
        const days = timer.querySelector('[data-days]')
        const hours = timer.querySelector('[data-hours]')
        const minutes = timer.querySelector('[data-minutes]')
        const seconds = timer.querySelector('[data-seconds]')
        const timeInterval = setInterval(updateClock, 1000)

        function updateClock() {
            const t = getTimeRemaining(endTime)

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval)
            }

        }

    }



    setClock('.timer', deadLine)
    showMenu();
});