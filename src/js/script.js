import '/src/sass/style.scss';

window.addEventListener('DOMContentLoaded', () => {


    const showMenu = () => {
        try {
            const gamburger = document.querySelector('.header__gamburger');
            const mobileNav = document.querySelector('.header__nav-mobile ');

            gamburger.addEventListener('click', () => {
                gamburger.classList.toggle('active')
                mobileNav.classList.toggle('active')
            })

            document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
        } catch (error) {
            console.error('Error initializing mobile menu:', error.message);
        }

    };

    showMenu()

});