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


    // rendering body
    // (function renderPage() {
    //     // let render = $('.render');
    //     let render = $('body');
    //     let tl = new TimelineLite();
    //     tl
    //         .fromTo(render, 0.5, { opacity: '1', zIndex: '99999' }, { opacity: '0', zIndex: '-1' })
    //         .delay(0.4)
    //         .call(hideRender);
    //     function hideRender() {
    //         $(render).remove();
    //     }

    // })();

    // $('.owl-carousel').owlCarousel({
    //     smartSpeed: 1000
    // });


    //Main Slider
    $('.main-slider').owlCarousel({
        // autoplay: true,
        // autoplayTimeout: 5000,
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

    //Section Slider
    $('.section-slider').owlCarousel({
        autoplay: true,
        autoplayTimeout: 5000,
        loop: true,
        smartSpeed: 150,
        // margin: 40,
        // nav: true,
        // dots: true,
        responsiveRefreshRate: 20,
        // responsiveClass: true,
        responsive: {
            0: {
                slideBy: 2,
                items: 2,
                margin: 20
            },
            544: {
                slideBy: 3,
                items: 3,
                margin: 30
            },
            768: {
                slideBy: 4,
                items: 4,
                margin: 40
            },
            992: {
                slideBy: 5,
                items: 5,
                margin: 50
            }
        }
    })

    //Filter
    function toggleFilter() {
        let filter = $('.filter-dropdown');
        let field = filter.find('.filter-dropdown-container');
        let list = filter.find('.filter-dropdown-list');
        let item = $('.filter-dropdown-list p');
        let clear = $('.filter__wrapper-clear');
        let eventClear = $('.events-filter .filter__wrapper-clear');

        // Height of List
        $(list).each((i, el) => {
            let count = $(el).children('*').length;
            let itemHeight = $(item).height();
            if (count > 3) {
                $(el).height(itemHeight * 3 + (count - 1));
            }
        });

        //Filter Input
        field.on('click', function () {
            // $(this).next().slideToggle();
            $(this).parent().toggleClass('active');
            // button.not(this).parent().removeClass('active');
            // button.not(this).next().slideUp();
        });

        // if (list.length > 2) {
        //     list.height(53 * 3);
        // } else {

        // }

        // console.log(list.length);

        item.on('click', function () {
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
            if (!$(event.target).closest(filter).length) {
                filter.removeClass('active');
            }
        });
    }
    toggleFilter();

});