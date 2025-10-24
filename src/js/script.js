import '/src/sass/style.scss';
import Swiper from 'swiper';
import {
    Navigation
} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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

    //!Slider
    try {
        const creyptosSlider = new Swiper('.slider', {
            modules: [Navigation],
            slidesPerView: 1,
            navigation: {
                nextEl: '.icon-right-open',
                prevEl: '.icon-left-open'
            },
            loop: true,
            spaceBetween: 10,
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: 25
                },
                1200: {
                    slidesPerView: 3,
                    spaceBetween: 15
                },
                1440: {
                    slidesPerView: 3,
                    spaceBetween: 35
                },
            },
        })
        console.log('✅ 7. Swiper успешно инициализирован!');
    } catch (error) {
        console.error('❌ 8. Ошибка при инициализации Swiper:', error);
    }

    async function getCryptoData() {
        try {
            const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,cardano,solana,polkadot,dogecoin&per_page=6');

            const data = await response.json();

            const simpleData = data.map(coin => {
                return {
                    name: coin.name,
                    price: coin.current_price,
                    image: coin.image
                };
            });

            console.log('Data-API:', simpleData);
            return simpleData;

        } catch (error) {
            console.error(error);
        }
    }

    async function addSlides() {
        const cryptoData = await getCryptoData()

        const slides = document.querySelector('.swiper-wrapper')

        slides.innerHTML = '';

            cryptoData.forEach(crypto => {
                const slide = document.createElement('div');
                slide.className = 'swiper-slide';
                slide.innerHTML = `
                <div class="swiper__columns">
                    <div class="swiper__column-img">
                        <img src="${crypto.image}" alt="${crypto.image}" class="slider-slide">
                    </div>
                    <div class="swiper__column-info">
                        <span class="swiper__title title-card">${crypto.name}</span>
                        <div class="swiper__price">
                            <span class="price">$${crypto.price.toFixed(2)}</span>
                            <button class="btn-slide" type="button">Trade now</button>
                        </div>
                    </div>
                </div>
        `;
                slides.appendChild(slide);
            });

    }


    addSlides()
    showMenu();
    setClock('.timer', deadLine)
});