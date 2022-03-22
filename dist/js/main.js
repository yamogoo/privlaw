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


// Gallery
$(document).ready(function () {

    $('[data-fancybox="images"]').fancybox({
        loop: false,
        closeExisting: false,
        preventCaptionOverlap: true,
        arrows: true,
        infobar: true,
        smallBtn: "auto",
        toolbar: "auto",
        buttons: [
            // "zoom",
            //"share",
            "slideShow",
            //"fullScreen",
            //"download",
            "thumbs",
            "close"
          ],
        image: {
        // Wait for images to load before displaying
        //   true  - wait for image to load and then display;
        //   false - display thumbnail and load the full-sized image over top,
        //           requires predefined image dimensions (`data-width` and `data-height` attributes)
        preload: true
        },
        idleTime: 3,
        gutter: 50,
        toolbar  : true,
        // Transition effect between slides
        //
        // Possible values:
        //   false            - disable
        //   "fade'
        //   "slide'
        //   "circular'
        //   "tube'
        //   "zoom-in-out'
        //   "rotate'
        //
        transitionEffect: "tube",

        // Duration in ms for transition animation
        transitionDuration: 275,
        afterLoad : function(instance, current) {
            var pixelRatio = window.devicePixelRatio || 1;
    
            if ( pixelRatio > 1.5 ) {
                current.width  = current.width  / pixelRatio;
                current.height = current.height / pixelRatio;
            }
        }
    });

    // App Header
    function appHeaderChangeTheme() {
        let $app = $("#app");
        let $upButton = $('.up-button');
        let $appScrollView = $(".app-scroll-view");
        $($appScrollView).scroll(function () {
            var scrolled = $($appScrollView).scrollTop();
            let scrollDistance = 1200;
            // let $changedObject = $app;
            if (scrolled >= scrollDistance) {
                $upButton.addClass('active');
                // $app.removeClass("theme-header--light").addClass("theme-header--dark");
            } else {
                // $app.removeClass("theme-header--dark").addClass("theme-header--light");
                $upButton.removeClass('active');
            }
        });
    }

    appHeaderChangeTheme();

    // Up Button
    function upButtonScrolltoTop() {
        let $upButton = $('.up-button');
        let $appScrollView = $(".app-scroll-view");
        $upButton.on("click", function() {
            $appScrollView.animate(
                { scrollTop: "0px" });
        })
    };

    upButtonScrolltoTop();

    // Main slider
    $('.main-slider').owlCarousel({
        autoplay: true,
        autoplayTimeout: 5000,
        loop: true,
        smartSpeed: 450,
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
    });

    // Section slider
    $('#section-slider').owlCarousel({
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
                items: 1,
                margin: 0
            }
        }
    });
    
    // Filter
    function toggleFilter() {
        let $filter = $('.filter-dropdown'),
            $field = $filter.find('.filter-dropdown-container'),
            $list = $filter.find('.filter-dropdown-list'),
            $item = $('.filter-dropdown-list p'),
            $clear = $('.filter__wrapper-clear'),
            $eventClear = $('.events-filter .filter__wrapper-clear');

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
            $field.parent().removeClass('active');
            $(this).parent().toggleClass('active');
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

    //Up Button

    function upButton() {
        var $changedObject = $('up-button');
        var $appScrollView = $('app-scroll-view');
        $($appScrollView).scroll(function () {
            var scrolled = $($appScrollView).scrollTop();
            let scrollDistance = 300;
            if (scrolled > scrollDistance) {
                $changedObject.addClass('active')
            } else {
                $changedObject.removeClass("active")
            }
        });
    }

    upButton();

    //--------------------------------- Lottie Setup ---------------------------------//

    // Menu Toggle Buttton
    var $iconAppMenuToggleButton = bodymovin.loadAnimation({
        wrapper: document.getElementById('app-menu-toggle-button-icon'),
        animType: 'svg',
        loop: false,
        autoplay: false,
        path: 'https://assets6.lottiefiles.com/private_files/lf30_dwpb7ksx.json'
    });

    // Search filter icon
    var $iconFilterSearchButton = bodymovin.loadAnimation({
        wrapper: document.getElementById('anim-icon-filter-search'),
        animType: 'svg',
        loop: false,
        autoplay: false,
        path: 'https://assets9.lottiefiles.com/private_files/lf30_l9rr0rau.json'
    });

    // Expansion section group icon
    var $iconExpansionSectionGroup = bodymovin.loadAnimation({
        wrapper: document.getElementById('anim-icon-expansion-section-group'),
        animType: 'svg',
        loop: false,
        autoplay: false,
        path: 'https://assets5.lottiefiles.com/private_files/lf30_7wgtigoq.json'
    });

    //
    //
    //--------------------------------- Common Fucntions ---------------------------------//

    // Toggle a class of the first element and change the class of the second element (optional)
    // depands on class of the first element and play the lottie icon of the first element (optional)

    function changeClassByClickOnElement(el1, cl1, el2 = false, cl2 = false, elLottie1 = false) {
        st1 = false
        el1.on("click", function (e) {
            if (el1.hasClass(cl1)) {
                $(this).removeClass(cl1)
            } else {
                $(this).toggleClass(cl1)
            }
            e.preventDefault();
            st1 = !st1;
            if (el2 != false) {
                if (st1 === true) {
                    if (el2.hasClass(cl2)) {
                        el2.removeClass(cl2);
                    } else {
                        el2.addClass(cl2);
                    }
                    if (elLottie1 != false) {
                        elLottie1.setDirection(1);
                        elLottie1.play();
                    }
                } else if (st1 === false) {
                    if (el2.hasClass(cl2)) {
                        el2.removeClass(cl2);
                    } else {
                        el2.addClass(cl2);
                    }
                    if (elLottie1 != false) {
                        elLottie1.setDirection(-1);
                        elLottie1.play();
                    }
                }
            }
        });
    }

    // Toggle Class

    function toggleSelfClassByClick(el1, cl1) {
        el1.on("click", function (e) {
            $(this).toggleClass(cl1);
            e.preventDefault();
        });
    }

    // Focus

    // el2 - another element that receives focus (optional)

    function elOnFocus(el, el2 = false, cl) {
        el.on('focus', function () {
            if (el2 === false) {
                el.addClass('focus');
            } else {
                el2.addClass('focus');
            }
        });
        el.on('blur', function () {
            if (el2 === false) {
                el.removeClass('focus');
            } else {
                el2.removeClass('focus');
            }
        });
    }

    // Search Field

    // clType - class when the input contains some characters
    // clFocus - class when the input is in focus

    function filterSearch(el, clType, clFocus, elLottie = false) {
        $input = el.find('input')
        $button = el.find('button');

        function handleClear () {
            el.addClass(clType);
            elLottie.setDirection(1);
            elLottie.play();
        }
        function handleDefault () {
            el.removeClass(clType);
            elLottie.setDirection(-1);
            elLottie.play();
        }
        $input.bind('input', function() {
            value = $(this).val();
            length = value.length;
            if (length > 0 ) {
                handleClear();
            } else if (length === 0) {
                handleDefault();
            }
        });
        $button.on("click", function() {
            $input.val('');
            el.removeClass(clType);
            handleDefault();
        });
        elOnFocus($input, el, clFocus);
    }

    //
    //
    //--------------------------------- Elements ---------------------------------//

    let $appMenuToggleButton = $('#app-menu-toggle-button'),
        $appMenu = $('#app-menu'),
        $appSearchButton = $('#app-search-button'),
        $appSearchField = $('#app-search-field'),
        $appSearchButtonClose = $('#search-button-close'),
        $expansionSection = $(".expansion-section"),
        $filterSearch = $('#filter-search'),
        $sectionMenu = $('.section-menu'),
        $dropdownSelector = $('.dropdown-selector'),
        // Forms
        $formFeedback = $('#form-feedback'),
        $formLogin = $('#form-login'),
        $formProjects = $('#form-educational-projects'),
        $formModal = $('.form-modal'),
        $formModalSheetButtonClose = $formModal.find('.form-modal-sheet__button-close');
    
    //
    //
    //--------------------------------- Actions ---------------------------------//

    // Filter (Hideseek)
    
    $('#filter-search-input').hideseek();
    $('#filter-search-input').hideseek({
        highlight: true,
        nodata:        'Элемент не найден',
        min_chars: 1,
        navigation:     true,
      });

    // Expansion Section Group

    function expansionSectionGroup() {
        let container = $('.expansion-section'),
            group = container.find('.expansion-section-group'),
            groupHeader = group.find('.expansion-section-group-header'),
            groupBody = group.find('.expansion-section-group-body'),
            getHeight = groupBody.children().height();

        let elLottie = $iconExpansionSectionGroup;

        groupHeader.on('click', function () {
            $(this).closest('.expansion-section-group').toggleClass('hide');
        });
    };

    // Search

    function search() {
        $appSearchButton.on("click", function() {
            if (!$appSearchField.hasClass('active')) {
                $appSearchField.addClass('active');
            }
        });
        $appSearchButtonClose.on("click", function() {
            if ($appSearchField.hasClass('active')) {
                $appSearchField.removeClass('active');
            }
        });
    }

    // Menu

    function menu() {
        changeClassByClickOnElement($appMenuToggleButton, 'active', $appMenu, 'active', $iconAppMenuToggleButton);
    }

    function dropdownSelector(el, cl) {
        let dropdownSelector = el,
            button = dropdownSelector.find('.dropdown-selector-button');
            item = dropdownSelector.find('.dropdown-selector-list li');
        changeClassByClickOnElement(button, cl, dropdownSelector, cl);
        item.on("click", function() {
            dropdownSelector.removeClass(cl);
        });
        //Click Outside
        $(document).on("click", function (event) {
            if (!$(event.target).closest(dropdownSelector).length) {
                dropdownSelector.removeClass('active');
            }
        });
    }

    dropdownSelector($dropdownSelector, 'active');

    //--------------------------------- Forms ---------------------------------//

    // Forms Feedback Validation
    $formFeedback.validate({
        rulles: {
            name: "required",
            subject: "required",
            email: "required",
            message: "required"
        },
        messages: {
            name: "Поле не может оставаться пустым",
            subject: "Поле не может оставаться пустым",
            email: "Введите корректный email",
            message: "Поле не может оставаться пустым"
        }
    });

    // Close Form Modal
    changeClassByClickOnElement($formModalSheetButtonClose, 'active', $formModal, 'active');

    // Sending Form Data
    $formFeedback.submit(function (e) {
        e.preventDefault();
         var form_data = $(this).serialize();
         $.ajax({
             type: "POST",
             url: "", // Url ./file.php
             data: form_data,
             success: function () {
                 // Success actions
                //  $('.form-modal-sheet-content p').text('Форма успешно отправлена');
                 $(this).trigger('reset');
                 $('.form-modal').addClass('active'); // Modal Confirm
             }
         });
     });

     // Form Login Validation
    $formLogin.validate({
        rulles: {
            email: "required",
            password: "required"
        },
        messages: {
            email: "Введите корректный email",
            password: "Пароль должен не менее 5 символов"
        }
    });

    // Forms Family Law Club Validation
    $formProjects.validate({
        rulles: {
            name: "required",
            email: "required",
            phone: {
                required: true,
                phone: true
            },
            place: "required",
            work: "required",
            position: "required",
            city: "required",
            message: ""
        },
        messages: {
            name: "Поле не может оставаться пустым",
            email: "Введите корректный email",
            phone: "Введите корректный номер",
            place: "Поле не может оставаться пустым",
            work: "Поле не может оставаться пустым",
            position: "Поле не может оставаться пустым",
            city: "Поле не может оставаться пустым",
            message: ""
        }
    });

    menu();
    search();
    expansionSectionGroup();
    filterSearch($filterSearch, 'type', 'focus', $iconFilterSearchButton);

    // Section Menu

    document.querySelectorAll('a[href^="#section"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        });
    });

    function sectionMenu() {
        menu = $sectionMenu;
        menuItem = $sectionMenu.find('li');
        menuItem.on("click", function() {
            menuItem.removeClass("active");
            $(this).toggleClass("active");
        })
    };

    sectionMenu();

    function inputHighlight(el, cl1, cl2) {
        el.each(function (){
            var state;
            el.on("focus", function() {
                state = true;
                handleState($(this), state, cl1);
            });
            el.on("blur", function() {
                state = false;
                if (state == false) {
                    handleState($(this), state, cl1);
                }
            });
            el.bind('input', function() {
                if ( $(this).val().length != 0) {
                    state = true;
                    handleState($(this), state, cl2);
                } else {
                    state = false;
                    handleState($(this), state, cl2);
                }   
            });
            function handleState(el, state, cl) {
                if (state == true) {
                    el.parent().addClass(cl);
                } else {
                    el.parent().removeClass(cl);
                }
            }            
        });        
    }

    function formInput () {
        form = $(".form");
        input = form.find("input, textarea"); //[type=textarea], input[type=password], textarea
        label = form.find("label");
        inputHighlight(input, 'active', 'typed');
    };

    formInput();
});