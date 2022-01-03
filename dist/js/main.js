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

    // function upButton() {
    //     var $changedObject = $('up-button');
    //     var $appScrollView = $('app-scroll-view');
    //     $($appScrollView).scroll(function () {
    //         var scrolled = $($appScrollView).scrollTop();
    //         let scrollDistance = 300;
    //         if (scrolled > scrollDistance) {
    //             $changedObject.addClass('active')
    //         } else {
    //             $changedObject.removeClass("active")
    //         }
    //     });
    // }

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
        autoplay: false,
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

    // Lottie
    // Menu Toggle Buttton
    var $iconAppMenuToggleButton = bodymovin.loadAnimation({
        wrapper: document.getElementById('app-menu-toggle-button-icon'),
        animType: 'svg',
        loop: false,
        autoplay: false,
        path: 'https://assets6.lottiefiles.com/private_files/lf30_dwpb7ksx.json' //'assets/lottie/app-menu-toggle-button.json'
    });

    var $iconFilterSearchButton = bodymovin.loadAnimation({
        wrapper: document.getElementById('anim-icon-filter-search'),
        animType: 'svg',
        loop: false,
        autoplay: false,
        path: 'https://assets9.lottiefiles.com/private_files/lf30_l9rr0rau.json' //'assets/lottie/app-menu-toggle-button.json'
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

    // function toggleSelfClassByClick(el1, cl1) {
    //     st1 = false;
    //     el1.on("click", function (e) {
    //         st1 = !st1;
    //         if (st1 === false)
    //             $(this).removeClass(cl1);
    //         else {
    //             $(this).addClass(cl1);
    //         }
    //         e.preventDefault();
    //     });
    // }

    function toggleSelfClassByClick(el1, cl1) {
        el1.on("click", function (e) {
            $(this).toggleClass(cl1);
            e.preventDefault();
        });
    }

    // function toggleSelfClassByClick(el1, cl1) {
    //     count = 0;
    //     el1.on("click", function (e) {
    //         count ++
    //         if (count === 1) {
    //             count = 0;
    //             if (el1.hasClass(cl1))
    //                 $(this).removeClass(cl1);
    //             else {
    //                 $(this).addClass(cl1);
    //             }
    //             e.preventDefault();
    //         }
    //     });
    // }

    //
    //
    //------------- Elements -------------//

    let $appMenuToggleButton = $('#app-menu-toggle-button');
    let $appMenu = $('#app-menu');
    let $appSearchButton = $('#app-search-button');
    let $appSearchField = $('#app-search-field');
    let $appSearchButtonClose = $('#app-search-button-close');
    let $expansionSection = $(".expansion-section");
    
    //
    //
    // Actions

    // function search() {
    //     if (!$appSearchField('active')) {
    //         changeClassByClickOnElement($appSearchButton, 'active', $appSearchField, 'active');
    //     } else if ($appSearchField.hasClass('active')) {
    //         changeClassByClickOnElement($appSearchButtonClose, 'active', $appSearchField, 'active');
    //     }
    // };

    // Expansion Section Group

    function expansionSectionGroup() {
        var container = $('.expansion-section');
        var group = container.find('.expansion-section-group');
        var groupHeader = group.find('.expansion-section-group-header');
        var groupBody = group.find('.expansion-section-group-body');
        var getHeight = groupBody.children().height();
        // groupBody.css({"height" : getHeight});
        groupHeader.on('click', function () {
            $(this).closest('.expansion-section-group').toggleClass('hide');
        });
        
        // $('#your-resizing-div').bind('getheight', function() {
        //     $('#your-resizing-div').height();
        // });
        
        // function your_function_to_load_content() {
        //     /*whatever your thing does*/
        //     $('#your-resizing-div').trigger('getheight');
        // }
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

    // Filters
    // Filter Search

    // Task .focus();
    function filterSearch(el, elLottie = false) {
        $input = el.find('input');
        $button = el.find('button');
        state = false;

        function handleClear () {
            state = true;
            el.addClass('type');
            elLottie.setDirection(1);
            elLottie.play();
        }
        function handleDefault () {
            state = false;
            el.removeClass('type');
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
            el.removeClass('type');
            handleDefault();
        });
    }

    // function filterSearch() {
    //     $input = $filterSearch.find('input');
    //     $filteredItems = $('.persons__item');
    //     $filteredItemsName = $('h3');
    //     var value = $input.val();
        
    //     if ($filteredItemsName.text().indexOf(`${value}`) > -1) {
    //         $filteredItemsName.closest('.persons__item').show();
    //     } else {
    //         $filteredItemsName.closest('.persons__item').hide();
    //     }
    // }

    let $filterSearch = $('#filter-search');

    menu();
    search();
    expansionSectionGroup();
    filterSearch($filterSearch, $iconFilterSearchButton);

    // Section Menu

    // function sectionMenu() {
    //     let $appScrollView = $('.app-scroll-view');
    //     let sectionMenu = $('.section-menu');
    //     let $sectionMenuItem = $sectionMenu.find('a');
    //     $('a').click(function(){
    //         var topOffset = 100;
    //         $appScrollView.animate({
    //         scrollTop: $($(this).attr('href')).offset().top-topOffset
    //             }, 1500);
    //         });
    // }

    // function sectionMenu() {
    //     var lastId;
    //     let $appScrollView = $('.app-scroll-view');
    //     var $menu = $("#section-menu");
    //     var $menuHeight = $menu.outerHeight(); //цифра это расстояние от верхушки меню до нужной секции(можно менять)
    //     var $menuItems = $menu.find("a");
    //     // Anchors corresponding to menu items
    //     var $scrollItems = $menuItems.map(function(){
    //         var item = $($(this).attr("href"));
    //         if (item.length) { return item; }
    //         });
    //     // Bind click handler to menu items
    //     // so we can get a fancy scroll animation
    //     $menuItems.click(function(e){
    //         var href = $(this).attr("href"),
    //             offsetTop = href === "#" ? 0 : $(href).offset().top-$menuHeight+11;
    //             $appScrollView.stop().animate({ 
    //             scrollTop: offsetTop
    //         }, 300);
    //         e.preventDefault();
    //     });

    //     // Bind to scroll
    //     $($appScrollView).scroll(function(){
    //     // Get container scroll position
    //     var fromTop = $(this).scrollTop()+$menuHeight;
        
    //     // Get id of current scroll item
    //     var cur = $scrollItems.map(function(){
    //         if ($(this).offset().top < fromTop)
    //         return this;
    //     });
    //     // Get the id of the current element
    //     cur = cur[cur.length-1];
    //     var id = cur && cur.length ? cur[0].id : "";
        
    //     if (lastId !== id) {
    //         lastId = id;
    //         // Set/remove active class
    //         $menuItems
    //             .parent().removeClass("active")
    //             .end().filter(`[href=${id}]`).parent().addClass("active");
    //     }                   
    //     });
    // };



    // function sectionMenu() {
    //     var lastId;
    //     let $appScrollView = $('.app-scroll-view');
    //     var $menu = $("#section-menu");
    //     var $menuHeight = $menu.outerHeight();
    //     var $menuItems = $menu.find("a");
    //     var $sectionList = $('#section-list');
    //     var $sectionItems = $sectionList.find().attr('href');
    //     // Anchors corresponding to menu items
    //     var $scrollItems = $menuItems.map(function(){
    //         var item = $($(this).attr("href"));
    //         if (item.length) { return item; }
    //         });
    //     // Bind click handler to menu items
    //     // so we can get a fancy scroll animation
    //     $menuItems.click(function(e){
    //         var href = $(this).attr("href");
    //         var target = $sectionList.find().attr(href);

    //         var offsetTop = href === "#" ? 0 : $(target).offset().top;
    //             $appScrollView.stop().animate({ 
    //             scrollTop: offsetTop
    //         }, 300);
    //         e.preventDefault();
    //         console.log(href);
    //     });
    // };

    // function sectionMenu () {

    //     function scrollTosec(){
    //         $('a[href^="#section"]').click(function(e) {
    //             e.preventDefault();
    //             var target = $(this).attr('href');
    //             var stop = $(target).offset().top;
    //             var delay = 200;
    //             $('body').animate({scrollTop: stop + 'px'}, delay);
    //         });
    //    };

    //    scrollTosec();
    // }

    // function sectionMenu() {
    //     var lastId;
    //     let $appScrollView = $('.app-scroll-view');
    //     var $menu = $("#section-menu");
    //     var $menuHeight = $menu.outerHeight();
    //     var $menuItems = $menu.find("a");
    //     var $sectionList = $('#section-list');

    //     // $menuItems.click(function(e){
    //     //     var href = $(this).attr("href");
    //     //     // var target = $sectionList.find().attr(href);

    //     //     var offsetTop = $(href).offset().top;
    //     //         $appScrollView.stop().animate({ 
    //     //         scrollTop: offsetTop
    //     //     }, 300);
    //     //     e.preventDefault();
    //     //     console.log(href);
    //     // });

    //     $(function() {
    //         $menuItems.click(function(e) {
    //             var href = $(this).attr("href");
    //             // var $sectionItems = $sectionList.find('#');
    //             console.log(href);
    //             e.preventDefault();
    //             // var target = $(this).attr('href');
    //             var target = $sectionList.find(`${href}`);
    //             console.log(target);
    //             // var stop = $(target).offset().top;
    //             // var delay = 1000;
    //             // $appScrollView.animate({scrollTop: stop + 'px'}, delay);
    //         });
    //     });
    // }

    document.querySelectorAll('a[href^="#section"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });


    // Filter (Hideseek)
    
    $('#filter-search-input').hideseek();
    $('#filter-search-input').hideseek({
        highlight: true,
        nodata:        'Элемент не найден',
        // min_chars: 1,
        // hidden_mode:    false,
        // navigation:     false,
        // ignore_accents: false,
        // attribute: '',
      });


      


    // $(document).ready(function() {
    //     $("#search").keyup(function() {
    //       var filter = $(this).val();
    //       $(".persons__item").find(".persons__item-name").each(function() {
    //         !$(this).includes(filter) ? $(this).hide() : $(this).show();
    //         if (filter == "") {
    //           $(this).show();
    //         }
    //       });
    //     });
    //   });
    // $('a[href*="#section"]').on('click', (event) => {

    //     let $appScrollView = $('.app-scroll-view');
    //     const hash = event.currentTarget.hash;
    //     if (hash) {
    //       event.preventDefault();
    //       $($appScrollView).animate({scrollTop: $(hash).offset().top - 100}, 750);
    //     }
    //   });

    function ScrollTo () {
        // $('a').click(function(){
        //     $appScrollView.animate({
        //         scrollTop: $( $.attr(this, 'href') ).offset().top
        //     }, 500);
        //     return false;
        // });
    }
    // let $appScrollView = $('.app-scroll-view');
    // var $sectionList = $('#section-list');
    // // var $sectionItem = $sectionList.find($('id^="section-"'));
    // $('a[href^="#section-"]').click(function () {
    //     $appScrollView.animate({
    //         scrollTop: $( $.attr(this, 'href') ).offset().top
    //     }, 500);
    //     return false;
    // });
        

    // $($appScrollView).scroll(function () {
    //     var scrolled = $($appScrollView).scrollTop();
    //     let scrollDistance = 200;
    //     let $changedObject = $app;
    //     if (scrolled >= scrollDistance) {
    //         $changedObject.removeClass("theme-header--light").addClass("theme-header--dark")
    //     } else {
    //         $changedObject.removeClass("theme-header--dark").addClass("theme-header--light")
    //     }
    // });

    // Menu.on("click")
    // Show app-menu by click on app-menu-toggle-button
    // function showSearch() {
    //     changeClassByClickOnElement($appSearchButton, 'active', $appSearchField, 'active');
    //     changeClassByClickOnElement($appSearchButtonClose, 'active', $appSearchField, 'active');
    // };

    // function showMenu() {
    //     changeClassByClickOnElement($appMenuToggleButton, 'active', $appMenu, 'active', $iconAppMenuToggleButton);
    // };

    // showSearch();
    // showMenu();
});

// new ResizeSensor($('.persons'), function() {
//     console.log('myelement has been resized');
// });