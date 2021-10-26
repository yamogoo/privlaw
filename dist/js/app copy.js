/* eslint-disable no-console */
/* eslint-disable no-undef */

$(document).ready(function() {
	// rendering body
	(function renderPage() {
		let render = $('.render');
		let tl = new TimelineLite();
		tl
			.fromTo(render, 0.5, {opacity: '1', zIndex: '99999'}, {opacity: '0', zIndex: '-1'})
			.delay(0.4)
			.call(hideRender);
		function hideRender(){
			$(render).remove();
		}
	})();

	function video() {
		let container = $('.videoContainer');
		let playButton = $('.videoButton');
		if (playButton) {
			playButton.on('click', function() {
				document.querySelectorAll('video').forEach(vid => vid.pause());
				container.not(this).next().get(0).pause();
				container.not(this).fadeIn();
				$(this).parent().next().get(0).play();
				$(this).parent().fadeOut();
				$(this).parent().next().get(0).controls = true;
			});
		}
	};
	video();

	function toggleMobileMenu() {
		let button = $('.header__wrapper-right-top-burger');
		let menu = $('.mobMenu');
		let header = $('.header');
		let scrollableElement = document.querySelector('.mobMenu__wrapper');
		function hideMenu() {
			(function() {
				scrollLock.enablePageScroll();
			})();
			menu.removeClass('mobMenu__active');
			button.removeClass('header__wrapper-right-top-burger-active');
			if (window.pageYOffset == 0) {
				header.removeClass('header__active');
			}
		}
		button.on('click', function(e) {
			e.preventDefault();
			if ($(this).hasClass('header__wrapper-right-top-burger-active')) {
				hideMenu();
			} else {
				header.addClass('header__active');
				$(this).addClass('header__wrapper-right-top-burger-active');
				menu.addClass('mobMenu__active');
				scrollLock.disablePageScroll(scrollableElement);
			}
		});
	}
	toggleMobileMenu();

	function indexSlider() {
		$('.index__wrapper-slider').slick({
			dots: false,
			infinite: false,
			speed: 800,
			slidesToShow: 3,
			touchMove: false,
			slidesToScroll: 1,
			focusOnSelect: true,
			nextArrow: $('.index__nav-next'),
			prevArrow: $('.index__nav-prev'),
			asNavFor: $('.index__images, .index__wrapper-content'),
			responsive: [
				{
					breakpoint: 1280,
					settings: {
						slidesToShow: 2,
					}
				},
				{
					breakpoint: 767,
					settings: {
						slidesToShow: 1,
					}
				},
			]
		});
		$('.index__images').slick({
			dots: false,
			infinite: false,
			speed: 800,
			fade: true,
			touchMove: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			nextArrow: $('.index__nav-next'),
			prevArrow: $('.index__nav-prev'),
			asNavFor: $('.index__wrapper-slider, .index__wrapper-content'),
		});
		$('.index__wrapper-content').slick({
			dots: false,
			infinite: false,
			speed: 800,
			fade: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			nextArrow: $('.index__nav-next'),
			prevArrow: $('.index__nav-prev'),
			asNavFor: $('.index__wrapper-slider, .index__images'),
			responsive: [
				{
					breakpoint: 1280,
					settings: {
						adaptiveHeight: true,
					}
				},
			]
		});
		$('.index__wrapper-slider .slick-slide').addClass('slick-current');
		$('.index__wrapper-content').on('beforeChange', function(event, slick, currentSlide) {
			$('.index__bg').css('opacity', 0);
			$('.index__images').css('opacity', 1);
			$('.index__wrapper-left').css('opacity', 0);
			TweenMax.to($('.index__wrapper-left'), .3, {opacity: 0, onComplete: function() {
				TweenMax.to($('.index__wrapper-left'), 0, {display: 'none'});
			}});
			TweenMax.to($('.index__wrapper-right'), .3, {opacity: 0, onComplete: function() {
				TweenMax.to($('.index__wrapper-right'), 0, {display: 'none'});
				$('.index__wrapper-content').css('opacity', 1);
				$('.index__wrapper-content').css('position', 'relative');
			}});
		});
		$('.index__wrapper-slider .slick-slide').on('click', function() {
			$('.index__bg').css('opacity', 0);
			$('.index__images').css('opacity', 1);
			$('.index__wrapper-left').css('opacity', 0);
			TweenMax.to($('.index__wrapper-left'), .3, {opacity: 0, onComplete: function() {
				TweenMax.to($('.index__wrapper-left'), 0, {display: 'none'});
			}});
			TweenMax.to($('.index__wrapper-right'), .3, {opacity: 0, onComplete: function() {
				TweenMax.to($('.index__wrapper-right'), 0, {display: 'none'});
				$('.index__wrapper-content').css('opacity', 1);
				$('.index__wrapper-content').css('position', 'relative');
			}});
		});
	}
	indexSlider();

	function indexSliderProgress() {
		function setProgress(index) {
			const calc = ((index + 1) / ($slider.slick('getSlick').slideCount)) * 100;
			$progressBar
				.css('background-size', `${calc}% 100%`)
				.attr('aria-valuenow', calc);
		}
		const $slider = $('.index__wrapper-slider');
		const $progressBar = $('.progress');
		$slider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {   
			setProgress(nextSlide);
		});
		setProgress(0);
	}
	indexSliderProgress();

	let sendMail = function sendMail(selector) {
		return fetch('/mail.php', {
			method: 'POST',
			body: new FormData($(selector).get(0))
		});
	};

	function sendForm() {
		let form = $('.registration__wrapper-form form');
		if (form) {
			form.submit(function(e) {
				e.preventDefault();
				sendMail(form).then(function() {
					return successMessage(),
					form.get(0).reset();
				});
			});
		}
	}
	sendForm();

	function successMessage() {
		let container = $('.successPopup');
		let bg = $('.successPopup__bg');
		container.addClass('successPopup__active');
		bg.addClass('successPopup__bg__active');
		let close = $('.successPopup__close, .successPopup button');
		let successContainer = document.getElementById('successSvg1');
		let anim1 = lottie.loadAnimation({ container: successContainer, renderer: 'svg', loop: false, autoplay: false, path: '/js/success.json' });
		anim1.play();
		scrollLock.disablePageScroll();
		close.on('click', function() {
			container.removeClass('successPopup__active');
			bg.removeClass('successPopup__bg__active');
			scrollLock.enablePageScroll();
			anim1.destroy();
		});
		setTimeout(function() {
			container.removeClass('successPopup__active');
			bg.removeClass('successPopup__bg__active');
			scrollLock.enablePageScroll();
			anim1.destroy();
		}, 2000);
	}

	function smoothScroll() {
		let offset = 0;
		if ($(window).width() > 768) {
			offset = 150
		} else {
			offset = 100
		}
		new SmoothScroll('a[href*="#"]', {
			speed: 1500,
			after: function() {
				$('body').css('overflow', '');
			},
			offset: offset
		});
	}
	smoothScroll();

	function pastMeetPopup() {
		let button = $('.past-meetings__wrapper-item');
		let popup = $('.pastMeetPopup');
		let bg = $('.pastMeetPopup__bg');
		let close = $('.pastMeetPopup__close');
		let scrollableElement = document.querySelector('.pastMeetPopup__wrapper');
		button.on('click', function() {
			popup.addClass('pastMeetPopup__active');
			bg.addClass('pastMeetPopup__bg__active');
			scrollLock.disablePageScroll(scrollableElement);
		});
		close.on('click', function() {
			popup.removeClass('pastMeetPopup__active');
			bg.removeClass('pastMeetPopup__bg__active');
			scrollLock.enablePageScroll();
		});
	}
	pastMeetPopup();

	function inputMask() {
		let input =  $('input[type="tel"]');
		Array.from(input).forEach(function(element) {
			let mask = new Inputmask('+7 (999) 999-99-99');
			mask.mask(element);
		});
	}
	inputMask();

	// //close popup by "esc" button
	// function hideByClickEscButton() {
	// 	let selector = $('.selector'); // block selector
	// 	$(window).on('keydown', function(e) {
	// 		if ( e.keyCode == 27 ) {
	// 			selector.removeClass('active-class'); // remove active class
	// 			scrollLock.enablePageScroll();
	// 		}
	// 	});
	// }
	// hideByClickEscButton();

	//FOR BACKENDERS: remove this function
	function checkHeader() {
		let header = $('.header');
		let page = window.location.pathname;
		if (
				page == '/' ||
				page == '/klub-semeynogo-prava.html' ||
				page == '/dialogi-o-chastnom-prave.html' ||
				page == '/sovet-po-kodifikatsii.html' ||
				page == '/issledovatelskij-centr.html' ||
				page == '/school.html' ||
				page == '/applicants.html'
		) {
			header.removeClass('notWhitePage');
		} else {
			header.addClass('notWhitePage');
		}
	}
	checkHeader();

	function checkButtonUp() {
		let button = $('.button-up');
		let page = window.location.pathname;
		$(window).on('scroll', function() {
			if ((
					page == '/informatsiya-o-sovete.html' ||
					page == '/sostav-soveta-i-rabochiye-gruppy.html' ||
					page == '/about-center.html' ||
					page == '/history.html' ||
					page == '/alexeev.html' ||
					page == '/foreign-law.html' ||
					page == '/training.html' ||
					page == '/applicants.html' ||
					page == '/rscp-chair.html' ||
					page == '/rscp-chairs.html' ||
					page == '/rscp-history.html' ||
					page == '/rscp-intelligence.html' ||
					page == '/students-colloquium.html' ||
					page == '/students-council.html' ||
					page == '/students-library.html' ||
					page == '/applicants.html' ||
					page == '/current-recruitment.html') && window.pageYOffset >= 300
			) {
				button.fadeIn();
			} else {
				button.fadeOut();
			}
		});
	}
	checkButtonUp();
	

	function checkNavInit() {
		let header = $('.header');
		if (window.pageYOffset !== 0) {
			header.addClass('header__active');
		} else {
			header.removeClass('header__active');
		}
	}
	checkNavInit();

	function scrollCheckNav() {
		$(window).on('scroll', function() {
			checkNavInit();
		});
	}
	scrollCheckNav();

	// function scrollInit() {
	// 	let options = {
	// 		distance: '50%',
	// 		origin: 'bottom',
	// 		opacity: null,
	// 		mobile: false
	// 	};
	// 	ScrollReveal().reveal('.reveal', options);
	// }
	// scrollInit();

	function toggleDataBlocks() {
		let button = $('.data-button');
		for ( let i = 0; i < Array.from(button).length; i++ ) {
			$(button[i]).on('click', function() {
				$(this).parent().children().removeClass('active');
				$(this).addClass('active');
				let id = button[i].getAttribute('data-id');
				let block = $(this).parent().next().find('.data-item[data-id="' + id + '"]')
				TweenMax.to($(this).parent().next().children(), .3, {opacity: 0, onComplete: () => {
					TweenMax.to($(this).parent().next().children(), 0, {display: 'none'});
					TweenMax.to($(block).attr('data-id', $(this).attr('data-id')), 0, {display: 'block', onComplete: () => {
						TweenMax.to($(block).attr('data-id', $(this).attr('data-id')), .3, {opacity: 1});
					}});
				}});
			});
		}
	}
	toggleDataBlocks();

	function toggleFilter() {
		let button = $('.filter__wrapper-input-container');
		let items = $('.filter__wrapper-input-list p');
		let clear = $('.filter__wrapper-clear');
		let eventClear = $('.events-filter .filter__wrapper-clear');
		button.on('click', function() {
			$(this).next().slideToggle();
			$(this).toggleClass('active');
			button.not(this).removeClass('active');
			button.not(this).next().slideUp();
		});
		items.on('click', function() {
			$(this).parent().slideUp();
			$(this).parent().children().removeClass('active');
			$(this).parent().prev().removeClass('active');
			$(this).addClass('active');
			$(this).parent().prev().children('span').text($(this).text());
			$(this).parent().prev().children('input')[0].value = ($(this).text());
		});
		clear.on('click', function() {
			button.removeClass('active');
			items.removeClass('active');
			items.parent().slideUp();
			button.children('input')[0].value = '';
			$('#text-years').text('Р’СЃРµ РіРѕРґС‹');
			$('#text-tags').text('Р’СЃРµ РЅРѕРІРѕСЃС‚Рё');
			$('#calendar').datepicker('setDate', null);
			$('.filter__wrapper-input input')[0].value = '';
		});
		eventClear.on('click', function() {
			$('#text-tags').text('Р’СЃРµ РјРµСЂРѕРїСЂРёСЏС‚РёСЏ');
			$('#calendar').datepicker('setDate', null);
		});
	}
	toggleFilter();

	function toggleEditFWork() {
		let button = $('.profile__wrapper-container-item-work-text');
		let items = $('.profile__wrapper-container-item-list p');
		button.on('click', function() {
			$(this).next().slideToggle();
			$(this).toggleClass('active');
		});
		items.on('click', function() {
			$(this).parent().slideUp();
			$(this).parent().children().removeClass('active');
			$(this).parent().prev().removeClass('active');
			$(this).addClass('active');
			$('.profile__wrapper-container-item-work-text p').text($(this).text());
			$(this).parent().prev().prev()[0].value = ($(this).text());
		});
	}
	toggleEditFWork();

	function toggleSearch() {
		let button = $('.header__wrapper-right-top-search');
		let close = $('.search__wrapper-close ');
		let search = $('.search');
		button.on('click', function() {
			search.toggleClass('search__active');
		});
		close.on('click', function() {
			search.removeClass('search__active');
		});
	}
	toggleSearch();

	function privateLawDialoguesSlider() {
		function setProgress(index) {
			const calc = ((index + 1) / ($slider.slick('getSlick').slideCount)) * 100;
			$progressBar
				.css('background-size', `${calc}% 100%`)
				.attr('aria-valuenow', calc);
		}
		const $slider = $('.private-law-dialogues__slider');
		const $progressBar = $('.progress');
		$slider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {   
			setProgress(nextSlide);
		});
		$slider.slick({
			dots: false,
			infinite: false,
			speed: 800,
			fade: true,
			touchMove: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			nextArrow: $('.private-law-dialogues__nav-next'),
			prevArrow: $('.private-law-dialogues__nav-prev'),
			responsive: [
				{
					breakpoint: 1180,
					settings: {
						infinite: true,
						autoplay: true,
						autoplaySpeed: 2000,
					}
				},
			]
		});
		
		setProgress(0);
	}
	privateLawDialoguesSlider();

	function toggleProfileEdit() {
		let edit = $('.profile__wrapper-container-header-right button');
		let editContainer = $('.profile__wrapper-container-edit');
		let result = $('.profile__wrapper-container-edit button');
		let resultContainer = $('.profile__wrapper-container-result');
		edit.on('click', function() {
			editContainer.show();
			resultContainer.hide();
		});
		result.on('click', function() {
			resultContainer.show();
			editContainer.hide();
		});
	}
	toggleProfileEdit();

	function toggleProfileFilter() {
		let button = $('.filter-container');
		let items = $('.filter-list p');
		button.on('click', function() {
			$(this).next().slideToggle();
			$(this).toggleClass('active');
			button.not(this).removeClass('active');
			button.not(this).next().slideUp();
		});
		items.on('click', function() {
			$(this).parent().slideUp();
			$(this).parent().children().removeClass('active');
			$(this).parent().prev().removeClass('active');
			$(this).addClass('active');
			$(this).parent().prev().children('span').text($(this).text());
			$(this).parent().prev().children('input')[0].value = ($(this).text());
		});
	}
	toggleProfileFilter();

	function toggleProductsBlocks() {
		let button = $('.profile-videos__wrapper-container-body-filter-list p');
		let popup = $('.profile-videos__wrapper-container-body-inner');
		for ( let i = 0; i < Array.from(button).length; i++ ) {
			$(button[i]).on('click', function() {
				button.removeClass('active');
				$(this).addClass('active');
				let id = button[i].getAttribute('data-id');
				let popup_single = $('.profile-videos__wrapper-container-body-inner[data-id="' + id + '"]');
				TweenMax.to(popup, .3, {opacity: 0, onComplete: () => {
					TweenMax.to(popup, 0, {display: 'none'});
					TweenMax.to($(popup_single).attr('data-id', $(this).attr('data-id')), 0, {display: 'block', onComplete: () => {
						TweenMax.to($(popup_single).attr('data-id', $(this).attr('data-id')), .3, {opacity: 1});
					}});
				}});
				$('#issledovatelskij-centr__info').css('background-color', '#FFFFFF');
			});
		}
	}
	toggleProductsBlocks();

	function toggleInnerCenterBlocks() {
		let button = $('.aside-button');
		for ( let i = 0; i < Array.from(button).length; i++ ) {
			$(button[i]).on('click', function() {
				$(this).parent().children().removeClass('active');
				$(this).addClass('active');
				let id = button[i].getAttribute('data-id');
				let block = $(this).parent().next().find('.aside-item[data-id="' + id + '"]')
				TweenMax.to($(this).parent().next().children(), .3, {opacity: 0, onComplete: () => {
					TweenMax.to($(this).parent().next().children(), 0, {display: 'none'});
					TweenMax.to($(block).attr('data-id', $(this).attr('data-id')), 0, {display: 'block', onComplete: () => {
						TweenMax.to($(block).attr('data-id', $(this).attr('data-id')), .3, {opacity: 1});
					}});
				}});
				$('#issledovatelskij-centr__info').css('background-color', '#FFFFFF');
			});
		}
		$('#projectAlexeev').on('click', function() {
			$('#issledovatelskij-centr__info').css('background-color', '#FAFAFA');
		});
	}
	toggleInnerCenterBlocks();

	function toggleConclusionsBlocks() {
		let button = $('.conclusions-detail__wrapper-body-item-header');
		button.on('click', function() {
			$(this).parent().toggleClass('conclusions-detail__wrapper-body-item-header-active');
			$(this).next().slideToggle();
			button.not(this).parent().removeClass('conclusions-detail__wrapper-body-item-header-active');
			button.not(this).next().slideUp();
		});
	}
	toggleConclusionsBlocks();

	function conclusionsPopup() {
		let button = $('.conclusions-detail__wrapper-body-item-body p');
		let popup = $('.conclusionsPopup');
		let bg = $('.conclusionsPopup__bg');
		let close = $('.conclusionsPopup__close');
		let scrollableElement = document.querySelector('.conclusionsPopup__wrapper');
		button.on('click', function() {
			popup.addClass('conclusionsPopup__active');
			bg.addClass('conclusionsPopup__bg__active');
			scrollLock.disablePageScroll(scrollableElement);
		});
		close.on('click', function() {
			popup.removeClass('conclusionsPopup__active');
			bg.removeClass('conclusionsPopup__bg__active');
			scrollLock.enablePageScroll();
		});
	}
	conclusionsPopup();

	function theoryPopup() {
		let button = $('.callTheoryPopup');
		let popup = $('.theoryPopup');
		let bg = $('.theoryPopup__bg');
		let close = $('.theoryPopup__close');
		let scrollableElement = document.querySelector('.theoryPopup__wrapper');
		button.on('click', function() {
			popup.addClass('theoryPopup__active');
			bg.addClass('theoryPopup__bg__active');
			scrollLock.disablePageScroll(scrollableElement);
		});
		close.on('click', function() {
			popup.removeClass('theoryPopup__active');
			bg.removeClass('theoryPopup__bg__active');
			scrollLock.enablePageScroll();
		});
	}
	theoryPopup();

	function zasedaniyaPopup() {
		let button = $('.council-meetings__wrapper-items-item, .callZasedaniyaPopup');
		let popup = $('.zasedaniyaPopup');
		let bg = $('.zasedaniyaPopup__bg');
		let close = $('.zasedaniyaPopup__close');
		let scrollableElement = document.querySelector('.zasedaniyaPopup__wrapper');
		button.on('click', function() {
			popup.addClass('zasedaniyaPopup__active');
			bg.addClass('zasedaniyaPopup__bg__active');
			scrollLock.disablePageScroll(scrollableElement);
		});
		close.on('click', function() {
			popup.removeClass('zasedaniyaPopup__active');
			bg.removeClass('zasedaniyaPopup__bg__active');
			scrollLock.enablePageScroll();
		});
	}
	zasedaniyaPopup();

	// function toggleHistoryContent() {
	// 	let button = $('.history__inner-content-aside-block a, .alexeev__inner-content-aside-block a');
	// 	button.on('click', function() {
	// 		button.removeClass('active');
	// 		$(this).addClass('active');
	// 	});
	// }
	// toggleHistoryContent();

	function checkHash() {
		let link = $('.history__inner-content-aside-block a, .alexeev__inner-content-aside-block a, .videos-inner__wrapper-aside-block-link a, .rscp-intelligence__inner-content-aside-block a, .rscp-chair__inner-content-aside-block a, .applicants__inner-content-aside-block a, .school__council-wrapper-content-left-block a');
		let contentLink = $('.anchorLink');
		for ( let i = 0; i < Array.from(link).length; i++ ) {
			$(link[i]).on('click', function() {
				link.removeClass('active');
				if (window.location.hash == $(link[i]).attr('href')) {
					$(link[i]).attr('href', window.location.hash).addClass('active');
				}
			});
			$(contentLink[i]).on('click', function() {
				link.removeClass('active');
				if (window.location.hash == $(contentLink[i]).attr('href')) {
					$(link[i]).attr('href', window.location.hash).addClass('active');
				}
			});
		}
		for ( let i = 0; i < Array.from(link).length; i++ ) {
			if ($(link[i]).attr('href') == window.location.hash) {
				$(link[i]).attr('href', window.location.hash).addClass('active');
			}
		}
		$(document).on('scroll', function() {
			$('.anchor').each(function() {
				if ( $(this).offset().top - 200 < window.pageYOffset && $(this).offset().top + $(this).height() > window.pageYOffset) {
					for ( let i = 0; i < Array.from(link).length; i++ ) {
						if (link[i].getAttribute('href') == '#' + $(this).attr('id')) {
							link.removeClass('active');
							$(link[i]).attr('href', '#' + $(this).attr('id')).addClass('active');
						}
					}
				}
			});
		});
	}
	checkHash();

	function toggleStructureBlocks() {
		let button = $('.structure-header');
		button.on('click', function() {
			$(this).toggleClass('active');
			$(this).next().slideToggle();
			button.not(this).removeClass('active');
			button.not(this).next().slideUp();
		});
	}
	toggleStructureBlocks();

	function toggleScholarshipsBlocks() {
		let button = $('.school__students-wrapper-content-block-scholarships-block-header, .school__scholarships-wrapper-content-block-header');
		button.on('click', function() {
			$(this).toggleClass('active');
			$(this).next().slideToggle();
			button.not(this).removeClass('active');
			button.not(this).next().slideUp();
		});
	}
	toggleScholarshipsBlocks();

	function historySlider() {
		new Swiper('.swiper-container-history', {
			slidesPerView: 1,
			effect: 'fade',
			fadeEffect: {
				crossFade: true
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		});
	}
	historySlider();

	function toggleHistoryBlock() {
		let button = $('#anniversary');
		button.on('click', function() {
			$(this).toggleClass('active');
			$(this).next().slideToggle();
		});
	}
	toggleHistoryBlock();

	function foreignLawSlider() {
		new Swiper('.swiper-container-foreign-law', {
			slidesPerView: 1,
			effect: 'fade',
			fadeEffect: {
				crossFade: true
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		});
	}
	foreignLawSlider();

	function toggleMobileFilter() {
		let button = $('.filter__inner-header');
		button.on('click', function() {
			$(this).next().slideToggle();
			$(this).toggleClass('active');
		});
		function resizeHandler() {
			if ($(window).width() > 767) {
				$('.filter__wrapper').show();
			} else if ($(window).width() < 767) {
				button.removeClass('active');
				$('.filter__wrapper').hide();
			}
		}
		resizeHandler();
		$(window).resize(resizeHandler);
	}
	toggleMobileFilter();

	function calendar() {
		var holiDays =[
			[2021,05,31,'Р—Р°Р±СЂРѕРЅРёСЂРѕРІР°РЅРЅРѕ'], 
			[2021,06,03,'Р—Р°Р±СЂРѕРЅРёСЂРѕРІР°РЅРЅРѕ'], 
			[2021,06,04,'Р—Р°Р±СЂРѕРЅРёСЂРѕРІР°РЅРЅРѕ'],
			[2021,06,07,'Р—Р°Р±СЂРѕРЅРёСЂРѕРІР°РЅРЅРѕ'],
			[2021,06,10,'Р—Р°Р±СЂРѕРЅРёСЂРѕРІР°РЅРЅРѕ'],
			[2021,06,11,'Р—Р°Р±СЂРѕРЅРёСЂРѕРІР°РЅРЅРѕ'],
			[2021,06,14,'Р—Р°Р±СЂРѕРЅРёСЂРѕРІР°РЅРЅРѕ'],
			[2021,06,17,'Р—Р°Р±СЂРѕРЅРёСЂРѕРІР°РЅРЅРѕ'],
			[2021,06,18,'Р—Р°Р±СЂРѕРЅРёСЂРѕРІР°РЅРЅРѕ'],
			[2021,06,21,'Р—Р°Р±СЂРѕРЅРёСЂРѕРІР°РЅРЅРѕ'],
			[2021,06,24,'Р—Р°Р±СЂРѕРЅРёСЂРѕРІР°РЅРЅРѕ'],
			[2021,06,25,'Р—Р°Р±СЂРѕРЅРёСЂРѕРІР°РЅРЅРѕ'],
			[2021,06,28,'Р—Р°Р±СЂРѕРЅРёСЂРѕРІР°РЅРЅРѕ'],
			[2021,07,01,'Р—Р°Р±СЂРѕРЅРёСЂРѕРІР°РЅРЅРѕ'],
			[2021,07,02,'Р—Р°Р±СЂРѕРЅРёСЂРѕРІР°РЅРЅРѕ'],
			[2021,07,05,'Р—Р°Р±СЂРѕРЅРёСЂРѕРІР°РЅРЅРѕ'],
			[2021,07,08,'Р—Р°Р±СЂРѕРЅРёСЂРѕРІР°РЅРЅРѕ'],
			[2021,07,09,'Р—Р°Р±СЂРѕРЅРёСЂРѕРІР°РЅРЅРѕ'],
		];
		function setHoliDays(date) {
			for (i = 0; i < holiDays.length; i++) {
				if (date.getFullYear() == holiDays[i][0]
					&& date.getMonth() == holiDays[i][1] - 1
					&& date.getDate() == holiDays[i][2]) {
					return [true, 'booked', holiDays[i][3]];
				}
			}
			return [true, ''];
		}
		$.datepicker.regional['ru'] = {
			closeText: 'Р—Р°РєСЂС‹С‚СЊ',
			prevText: 'РџСЂРµРґС‹РґСѓС‰РёР№',
			nextText: 'РЎР»РµРґСѓСЋС‰РёР№',
			currentText: 'РЎРµРіРѕРґРЅСЏ',
			monthNames: ['РЇРЅРІР°СЂСЊ','Р¤РµРІСЂР°Р»СЊ','РњР°СЂС‚','РђРїСЂРµР»СЊ','РњР°Р№','РСЋРЅСЊ','РСЋР»СЊ','РђРІРіСѓСЃС‚','РЎРµРЅС‚СЏР±СЂСЊ','РћРєС‚СЏР±СЂСЊ','РќРѕСЏР±СЂСЊ','Р”РµРєР°Р±СЂСЊ'],
			monthNamesShort: ['РЇРЅРІ','Р¤РµРІ','РњР°СЂ','РђРїСЂ','РњР°Р№','РСЋРЅ','РСЋР»','РђРІРі','РЎРµРЅ','РћРєС‚','РќРѕСЏ','Р”РµРє'],
			dayNames: ['РІРѕСЃРєСЂРµСЃРµРЅСЊРµ','РїРѕРЅРµРґРµР»СЊРЅРёРє','РІС‚РѕСЂРЅРёРє','СЃСЂРµРґР°','С‡РµС‚РІРµСЂРі','РїСЏС‚РЅРёС†Р°','СЃСѓР±Р±РѕС‚Р°'],
			dayNamesShort: ['РІСЃРє','РїРЅРґ','РІС‚СЂ','СЃСЂРґ','С‡С‚РІ','РїС‚РЅ','СЃР±С‚'],
			dayNamesMin: ['Р’СЃ','РџРЅ','Р’С‚','РЎСЂ','Р§С‚','РџС‚','РЎР±'],
			weekHeader: 'РќРµ',
		};
		$.datepicker.setDefaults($.datepicker.regional['ru']);
		let flag = false;
		$('#calendar').datepicker({
			initialText: 'Р’С‹Р±РµСЂРёС‚Рµ РґР°С‚Сѓ',
			dateFormat: 'dd M yy',
			presetRanges: [],
			changeYear: true,
			linkedCalendars: false,
			firstDay: 1,
			showOtherMonths: true,
			beforeShowDay: setHoliDays,
			onClose: function() {
				flag = false;
			}
		});
		$('#birthday').datepicker({
			initialText: 'Р”Р°С‚Р° СЂРѕР¶РґРµРЅРёСЏ',
			dateFormat: 'dd M yy',
			presetRanges: [],
			changeYear: true,
			linkedCalendars: false,
			firstDay: 1,
			showOtherMonths: true,
			onClose: function() {
				flag = false;
			}
		});
		$('.filter__wrapper-input-calendar, .profile__wrapper-container-item-calendar').on('click', function() {
			if ($('#ui-datepicker-div').css('display', 'block') && flag == false) {
				let top = $('#ui-datepicker-div').css('top');
				$("#ui-datepicker-div").css('top', parseInt(top) + 5);
				flag = true;
			}
		});
	}
	calendar();

	function validate() {
		let input = $('.validated input');
		let name = $('.name.validated input');
		let mail = $('.mail.validated input');
		let phone = $('.phone.validated input');
		let location = $('.location.validated input');
		let work = $('.work.validated input');
		let position = $('.position.validated input');
		let subject = $('.subject.validated input');
		let textarea = $('.textarea.validated textarea');
		let submit = $('.registration__wrapper-form .submit');
		input.on('input', function() {
			if (this.value == '') {
				$(this).addClass('error');
			} else {
				$(this).removeClass('error');
			}
		});
		submit.on('click', function() {
			if (name[0].value == '') {
				name.addClass('error');
			} else {
				name.removeClass('error');
			}
			if (mail[0].value == '') {
				mail.addClass('error');
			} else {
				mail.removeClass('error');
			}
			if (phone[0].value == '') {
				phone.addClass('error');
			} else {
				phone.removeClass('error');
			}
			if (location[0].value == '') {
				location.addClass('error');
			} else {
				location.removeClass('error');
			}
			if (work[0].value == '') {
				work.addClass('error');
			} else {
				work.removeClass('error');
			}
			if (position[0].value == '') {
				position.addClass('error');
			} else {
				position.removeClass('error');
			}
			if (subject[0].value == '') {
				subject.addClass('error');
			} else {
				subject.removeClass('error');
			}
			if (textarea[0].value == '') {
				textarea.addClass('error');
			} else {
				textarea.removeClass('error');
			}
		});
	}
	validate();

	function toggleMobileProfileFilter() {
		let button = $('.callProfileMobileFilter');
		let items = $('.ProfileMobileFilterItem a');
		button.on('click', function() {
			$(this).next().slideToggle();
			$(this).toggleClass('active');
		});
		items.on('click', function() {
			$(this).parent().slideUp();
			$(this).parent().children().removeClass('active');
			$(this).parent().prev().removeClass('active');
			$(this).addClass('active');
			$(this).parent().prev().children('span').text($(this).text());
		});
	}
	toggleMobileProfileFilter();

	function toggleTrainingText() {
		let button = $('.training__wrapper-content-right button');
		button.on('click', function() {
			$(this).hide();
			$(this).prev().toggleClass('training__wrapper-content-right-text-active');
		});
	}
	toggleTrainingText();

	function toggleRecruitmentText() {
		let button = $('.current-recruitment__wrapper-content-right-toggle-header');
		let container = $('.current-recruitment__wrapper-content-right-table-container');
		button.on('click', function() {
			$(this).toggleClass('active');
			container.slideToggle();
		});
	}
	toggleRecruitmentText();

	function photoPopup() {
		let button = $('.callPhotoPopup');
		let popup = $('.photoPopup');
		let bg = $('.photoPopup__bg');
		let close = $('.photoPopup__close');
		let scrollableElement = document.querySelector('.photoPopup__wrapper');
		button.on('click', function() {
			popup.addClass('photoPopup__active');
			bg.addClass('photoPopup__bg__active');
			scrollLock.disablePageScroll(scrollableElement);
		});
		close.on('click', function() {
			popup.removeClass('photoPopup__active');
			bg.removeClass('photoPopup__bg__active');
			scrollLock.enablePageScroll();
		});
	}
	photoPopup();

	function reviewsPopup() {
		let button = $('.callReviewsPopup');
		let popup = $('.reviewsPopup');
		let bg = $('.reviewsPopup__bg');
		let close = $('.reviewsPopup__close');
		let scrollableElement = document.querySelector('.reviewsPopup__wrapper');
		button.on('click', function() {
			popup.addClass('reviewsPopup__active');
			bg.addClass('reviewsPopup__bg__active');
			scrollLock.disablePageScroll(scrollableElement);
		});
		close.on('click', function() {
			popup.removeClass('reviewsPopup__active');
			bg.removeClass('reviewsPopup__bg__active');
			scrollLock.enablePageScroll();
		});
	}
	reviewsPopup();

	function clearNotFoundForm() {
		let input = $('.notFoundPage__wrapper-form input, searchPage__wrapper-form input');
		let button = $('.notFoundPage__wrapper-form button, searchPage__wrapper-form button');
		button.on('click', function() {
			input[0].value = '';
		});
	}
	clearNotFoundForm();

	function toggleAsideVideoLink() {
		let button = $('.videos-inner__wrapper-aside-block-link');
		button.on('click', function() {
			button.removeClass('active');
			$(this).addClass('active');
		});
	}
	toggleAsideVideoLink();

	function toggleMobileColloquium() {
		let button = $('.school__students-wrapper-content-block-colloquium-right-header, .school__colloquium-wrapper-content-colloquium-right-header');
		button.on('click', function() {
			$(this).toggleClass('active');
			$(this).next().slideToggle();
		});
	}
	toggleMobileColloquium();

	function toggleIntelligence() {
		let button = $('.rscp-intelligence__inner-content-container-block-toggle-header, .school__colloquium-wrapper-content-colloquium-left-block-toggle-header');
		button.on('click', function() {
			$(this).toggleClass('active');
			$(this).next().slideToggle();
			button.not(this).removeClass('active');
			button.not(this).next().slideUp();
		});
	}
	toggleIntelligence();

	function toggleRscpChair() {
		let button = $('.rscp-chair__inner-content-container-block button');
		button.on('click', function() {
			$(this).prev().addClass('active');
			$(this).hide();
			$(this).parent().css('padding-bottom', 0);
		});
	}
	toggleRscpChair();

	function toggleApplicants() {
		let button = $('.applicants__inner-content-container-block-toggle-header');
		button.on('click', function() {
			$(this).toggleClass('active');
			$(this).next().slideToggle();
			button.not(this).removeClass('active');
			button.not(this).next().slideUp();
		});
	}
	toggleApplicants();

	function galleryProduct() {
		$('#lightgallery').lightGallery();
	}
	galleryProduct();

});