/* eslint-disable no-console */
/* eslint-disable no-undef */

$(document).ready(function () {
    // rendering body
    (function renderPage() {
        let render = $('.render');
        let tl = new TimelineLite();
        tl
            .fromTo(render, 0.5, { opacity: '1', zIndex: '99999' }, { opacity: '0', zIndex: '-1' })
            .delay(0.4)
            .call(hideRender);
        function hideRender() {
            $(render).remove();
        }
    })();


    function toggleFilter() {
        let button = $('.filter-dropdown-container');
        let items = $('.filter-dropdown-list p');
        let clear = $('.filter__wrapper-clear');
        let eventClear = $('.events-filter .filter__wrapper-clear');
        button.on('click', function () {
            $(this).next().slideToggle();
            $(this).toggleClass('active');
            button.not(this).removeClass('active');
            button.not(this).next().slideUp();
        });
        items.on('click', function () {
            $(this).parent().slideUp();
            $(this).parent().children().removeClass('active');
            $(this).parent().prev().removeClass('active');
            $(this).addClass('active');
            $(this).parent().prev().children('span').text($(this).text());
            $(this).parent().prev().children('input')[0].value = ($(this).text());
        });
        clear.on('click', function () {
            button.removeClass('active');
            items.removeClass('active');
            items.parent().slideUp();
            button.children('input')[0].value = '';
            $('#text-years').text('Р’СЃРµ РіРѕРґС‹');
            $('#text-tags').text('Р’СЃРµ РЅРѕРІРѕСЃС‚Рё');
            $('#calendar').datepicker('setDate', null);
            $('.filter__wrapper-input input')[0].value = '';
        });
        eventClear.on('click', function () {
            $('#text-tags').text('Р’СЃРµ РјРµСЂРѕРїСЂРёСЏС‚РёСЏ');
            $('#calendar').datepicker('setDate', null);
        });
    }
    toggleFilter();



});