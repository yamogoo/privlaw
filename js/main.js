/* eslint-disable no-console */
/* eslint-disable no-undef */

$(document).ready(function () {
    // // rendering body
    // (function renderPage() {
    //     let render = $('.render');
    //     let tl = new TimelineLite();
    //     tl
    //         .fromTo(render, 0.5, { opacity: '1', zIndex: '99999' }, { opacity: '0', zIndex: '-1' })
    //         .delay(0.4)
    //         .call(hideRender);
    //     function hideRender() {
    //         $(render).remove();
    //     }

    // })();

    //Carousel
    $('.main-slider').owlCarousel({
        // autoplay: true,
        // autoplayTimeout: 5000,
        loop: true,
        margin: 50,
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

    //Filter
    function toggleFilter() {
        let field = $('.filter-dropdown-container');
        let filter = $('.filter-dropdown');
        let items = $('.filter-dropdown-list p');
        let clear = $('.filter__wrapper-clear');
        let eventClear = $('.events-filter .filter__wrapper-clear');

        //Filter Input
        field.on('click', function () {
            // $(this).next().slideToggle();
            $(this).parent().toggleClass('active');
            // button.not(this).parent().removeClass('active');
            // button.not(this).next().slideUp();
        });

        items.on('click', function () {
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
        //     items.removeClass('active');
        //     items.parent().slideUp();
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