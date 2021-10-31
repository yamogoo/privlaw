// function ready() {

// }

// document.addEventListener("DOMContentLoaded", ready);


document.addEventListener("DOMContentLoaded", () => {

    // Main slider
    document.getElementsByClassName('main-slider') = owlCarousel({
        autoplay: true,
        autoplayTimeout: 5000,
        loop: true,
        smartSpeed: 200,
        margin: 0,
        nav: true,
        dots: true,
        responsiveRefreshRate: 20,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            }
        }
    });

    // Section slider
    document.getElementById('section-slider-persons') = owlCarousel({
        autoplay: true,
        autoplayTimeout: 2000,
        loop: true,
        smartSpeed: 250,
        slideBy: 1,
        nav: false,
        dots: false,
        responsiveRefreshRate: 20,
        responsive: {
            0: {
                items: 2,
                margin: 20
            },
            544: {
                items: 3,
                margin: 30
            },
            768: {
                items: 4,
                margin: 40
            },
            992: {
                items: 5,
                margin: 40
            }
        }
    });
    
    // Menu Toggle Buttton
    var iconAppMenuToggleButton = bodymovin.loadAnimation({
        wrapper: document.getElementById('app-menu-toggle-button-icon'),
        animType: 'svg',
        loop: false,
        autoplay: false,
        path: 'https://assets6.lottiefiles.com/private_files/lf30_dwpb7ksx.json' //'assets/lottie/app-menu-toggle-button.json'
    });

    // Toggle class of first element and change class of second element (optional)
    // depands on class of first element and play lottie of first element (optional)
    function changeClassByClickOnElement(el1, cl1, el2 = false, cl2 = false, elLottie1 = false) {
        var state = false;
        el1.onclick = function() {
            this.classList.toggle(cl1);
            state = !state;

            if (state === true && el2 != null) {
                el2.classList.add(cl2);
                if (elLottie1 != null) {
                    elLottie1.setDirection(1);
                    elLottie1.play();
                }
            } else if (state === false && el2 != null) {
                el2.classList.remove(cl2);
                if (elLottie1 != null) {
                    elLottie1.setDirection(-1);
                    elLottie1.play();
                }
            }
        };
    }

    //
    //
    // Elements
    let appMenuToggleButton =  document.getElementById('app-menu-toggle-button');
    let appMenu = document.getElementById('app-menu');

    //
    //
    // Actions
    changeClassByClickOnElement(appMenuToggleButton, 'active', appMenu, 'active', iconAppMenuToggleButton);

});