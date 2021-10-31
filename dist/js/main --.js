/* eslint-disable no-console */
/* eslint-disable no-undef */

// Preloader
$(window).on('load', function () {
    var $preloader = $('#preloader'),
        $icon_animate = $preloader.find('.icon_animate');
    $icon_animate.fadeOut();
    $preloader.delay(100).fadeOut(50);
});

let breakepoints = {
    xs: 320,
    sm: 544,
    md: 768,
    lg: 992,
    xl: 1280
};

$(document).ready(function () {

    // App Header
    function appHeaderChangeTheme() {
        let $app = $("#app");
        let $appScrollView = $(".app-scroll-view");
        $($appScrollView).scroll(function () {
            var scrolled = $($appScrollView).scrollTop();
            let scrollDistance = 200;
            let $changedObject = $app;
            if (scrolled >= scrollDistance) {
                $changedObject.removeClass("theme-header--light").addClass("theme-header--dark")
            } else {
                $changedObject.removeClass("theme-header--dark").addClass("theme-header--light")
            }
        });
    }

    // Main slider
    $('.main-slider').owlCarousel({
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
    })

    // Section slider
    $('#section-slider-persons').owlCarousel({
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
    })

    // Detect Scroll Down/Top Direction
    // $(window).bind('mousewheel', function (event) {
    //     if (event.originalEvent.wheelDelta >= 0) {
    //         console.log('Scroll up');
    //     }
    //     else {
    //         console.log('Scroll down');
    //     }
    // });



    // Filter
    function toggleFilter() {
        let $filter = $('.filter-dropdown');
        let $field = $filter.find('.filter-dropdown-container');
        let $list = $filter.find('.filter-dropdown-list');
        let $item = $('.filter-dropdown-list p');
        let $clear = $('.filter__wrapper-clear');
        let $eventClear = $('.events-filter .filter__wrapper-clear');

        // Height of List
        $($list).each((i, el) => {
            let count = $(el).children('*').length;
            let itemHeight = $($item).height();
            if (count > 3) {
                $(el).height(itemHeight * 3 + (count - 1));
            }
        });

        //Filter Input
        $field.on('click', function () {
            // $(this).next().slideToggle();
            $(this).parent().toggleClass('active');
            // button.not(this).parent().removeClass('active');
            // button.not(this).next().slideUp();
        });

        $item.on('click', function () {
            // $(this).parent().slideUp();
            $(this).parent().parent().removeClass('active');
            $(this).parent().children().removeClass('active');
            $(this).parent().prev().removeClass('active');
            $(this).addClass('active');
            $(this).parent().prev().children('span').text($(this).text());
            $(this).parent().prev().children('input')[0].value = ($(this).text());
        });

        //Hide List
        // overlay.on('click', function () {
        //     button.parent().removeClass('active');
        // });
        // clear.on('click', function () {
        //     button.removeClass('active');
        //     item.removeClass('active');
        //     item.parent().slideUp();
        //     button.children('input')[0].value = '';
        //     $('#text-years').text('Р’СЃРµ РіРѕРґС‹');
        //     $('#text-tags').text('Р’СЃРµ РЅРѕРІРѕСЃС‚Рё');
        //     $('#calendar').datepicker('setDate', null);
        //     $('.filter__wrapper-input input')[0].value = '';
        // });
        // eventClear.on('click', function () {
        //     $('#text-tags').text('Р’СЃРµ РјРµСЂРѕРїСЂРёСЏС‚РёСЏ');
        //     $('#calendar').datepicker('setDate', null);
        // });

        //Click Outside
        $(document).on("click", function (event) {
            if (!$(event.target).closest($filter).length) {
                $filter.removeClass('active');
            }
        });
    }
    toggleFilter();

    //
    //
    // Lotties

    // Menu Toggle Buttton
    var $iconAppMenuToggleButton = bodymovin.loadAnimation({
        wrapper: document.getElementById('app-menu-toggle-button-icon'),
        animType: 'svg',
        loop: false,
        autoplay: false,
        path: 'https://assets6.lottiefiles.com/private_files/lf30_dwpb7ksx.json' //'assets/lottie/app-menu-toggle-button.json'
    });

    // var iconAppMenuToggleButton = LottieInteractivity.create({
    //     wrapper: document.getElementById('app-menu-toggle-button-icon'),
    //     mode:"cursor",
    //     player: "#seventhLottie",
    //     // animationData: 
    //     // path: 'assets/lottie/app-menu-toggle-button.json'//'https://assets6.lottiefiles.com/private_files/lf30_dwpb7ksx.json' //
    // });


    // iconAppMenuToggleButton.addEventListener('DOMLoaded',startAnimation);

    //
    //
    // Functions

    // Toggle a class of the first element and change the class of the second element (optional)
    // depands on class of the first element and play the lottie icon of the first element (optional)
    function changeClassByClickOnElement(el1, cl1, st1 = false, el2 = false, cl2 = false, st2 = false, elLottie1 = false) {
        // var state = false;
        el1.on("click", function (e) {
            if (el1.hasClass(cl1)) {
                $(this).removeClass(cl1)
            } else {
                $(this).toggleClass(cl1)
            }
            e.preventDefault();
            console.log("done");
            st1.state = !st1.state;
            if (el2 != false) {
                if (st1 === true) {
                    if (el2.hasClass(cl2)) {
                        el2.removeClass(cl2);
                        st2.state = !st2.state;
                        console.log("done");
                    } else {
                        el2.addClass(cl2);
                        st2.state = !st2.state;
                        console.log("done");
                    }
                    if (elLottie1 != false) {
                        elLottie1.setDirection(1);
                        elLottie1.play();
                    }
                } else if (st1 === false) {
                    if (el2.hasClass(cl2)) {
                        el2.removeClass(cl2);
                        st2.state = !st2.state;
                        console.log("done");
                    } else {
                        el2.addClass(cl2);
                        st2.state = !st2.state;
                        console.log("done");
                    }
                    if (elLottie1 != false) {
                        elLottie1.setDirection(-1);
                        elLottie1.play();
                    }
                }
            }
        });
    }

    function toggleSelfClassByClick(el1, cl1) {
        var state = false;
        el1.on("click", function (e) {
            if (el1.hasClass(cl1)) {
                $(this).removeClass(cl1)
            } else {
                $(this).toggleClass(cl1)
            }
            e.preventDefault();
        });
    }

    //
    //
    // Elements

    let $appMenuToggleButton = $('#app-menu-toggle-button');
    let $appMenu = $('#app-menu');
    let $appSearchButton = $('#app-search-button');
    let $appSearchField = $('#app-search-field');
    let $appSearchButtonClose = $('#app-search-button-close');
    //
    //
    // Actions

    //
    //
    // Classes

    class Menu {
        
    }

    // Show app-menu by click on app-menu-toggle-button
    function showSearch() {
        var stateOfSearchField = {
            state: false
        }
        if (stateOfSearchField === true) {
            changeClassByClickOnElement($appSearchButton, 'active', false, $appSearchField, 'active', stateOfSearchField);
            alert(done);
        } else {
            changeClassByClickOnElement($appSearchButtonClose, 'active', false, $appSearchField, 'active', stateOfSearchField);
        }
        
        // }
    };
    function showMenu() {
        changeClassByClickOnElement($appMenuToggleButton, 'active', false, $appMenu, 'active', false, $iconAppMenuToggleButton);
    };

    showSearch();
    showMenu();
});

  