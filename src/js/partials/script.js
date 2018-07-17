$(function(){
	if($('#map').length > 0){
		google.maps.event.addDomListener(window, 'load', init);
	}

	initMainSlider();
	openPricesHeader();
	openFAQ();
	initProdSlider();
	openMenu();
	openForm();

	$('input[type="tel"]').each(function() {
		$(this).mask("+7 (999) 999-9999");
	});
});

function openPricesHeader() {
	$('.preheader__fuel-item').on('click', function() {
		$(this).closest('.preheader__fuel').find('.preheader__fuel-other').slideToggle();
		$(this).toggleClass('active');
	});
}

function openFAQ() {
	if($('.faq').length > 0) {
		$('.faq__item').on('click', function() {
			$(this).find('.faq__answer').slideToggle();
			$(this).toggleClass('faq__item--open');
		});
	}
}

function initMainSlider() {
	if(window.location.pathname == "/" && $(".main-slider").length > 0) {
		$('.main-slider').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			dots: true
		});
	}
}

function init(flag) { 
	var mapOptions = { 
		zoom: 17, 
		center: new google.maps.LatLng(55.759703, 37.688935),
		scrollwheel: false, 
		styles: [
			{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}
		] 
	}; 
	var mapElement = document.getElementById('map');
	var infowindow = new google.maps.InfoWindow(); 
	var map = new google.maps.Map(mapElement, mapOptions); 
	var markerImage = { 
		url: '/images/pointer.png', 
		size: new google.maps.Size(68, 97), 
		anchor: new google.maps.Point(34, 97) //half-width 
	}; 

	var locations = [{ 
		"name": "Москва ул. Красноказарменная д.2 стр. 6", 
		"lat": "55.759703", 
		"lng": "37.688935" 
	}]; 

	$.each(locations, function (i, point) { 
		var markerPosition = new google.maps.LatLng(point.lat, point.lng); 
		var marker = new google.maps.Marker({ 
			position: markerPosition, 
			icon: markerImage, 
			map: map, 
			title: point.name 
		}); 

		google.maps.event.addListener(marker, 'click', function () { 
			infowindow.setContent(this.title); 
			infowindow.open(map, this); 
		}); 
	});
}

function initProdSlider() {
	if($('.production').length > 0) {
		$('.production').slick({
			slidesToShow: 4,
			slidesToScroll: 1,
			dots: true,
			arrows: false,
			responsive: [
				{
					breakpoint: 1200,
					settings: {
						slidesToShow: 3
					}
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 2
					}
				},
				{
					breakpoint: 481,
					settings: {
						slidesToShow: 1
					}
				}
			]
		});

		$('.production--prev').on('click', function() {
			$('.production').slick('slickPrev');
		});

		$('.production--next').on('click', function() {
			$('.production').slick('slickNext');
		});

		$('.production').find('.slick-active').eq(1).find('.production__type').css('background-color', '#339933');
		$('.production').find('.slick-active').eq(1).find('.production__price').css('background-color', '#266635');
		$('.production').find('.slick-active').eq(2).find('.production__type').css('background-color', '#278227');
		$('.production').find('.slick-active').eq(2).find('.production__price').css('background-color', '#184f25');
		$('.production').find('.slick-active').eq(3).find('.production__type').css('background-color', '#1c6c1c');
		$('.production').find('.slick-active').eq(3).find('.production__price').css('background-color', '#174922');

		$('.production').on('afterChange', function(slider, direction) {
			$('.production').find('.slick-active').eq(0).find('.production__type').css('background-color', '#47af47');
			$('.production').find('.slick-active').eq(0).find('.production__price').css('background-color', '#387d48');
			$('.production').find('.slick-active').eq(1).find('.production__type').css('background-color', '#339933');
			$('.production').find('.slick-active').eq(1).find('.production__price').css('background-color', '#266635');
			$('.production').find('.slick-active').eq(2).find('.production__type').css('background-color', '#278227');
			$('.production').find('.slick-active').eq(2).find('.production__price').css('background-color', '#184f25');
			$('.production').find('.slick-active').eq(3).find('.production__type').css('background-color', '#1c6c1c');
			$('.production').find('.slick-active').eq(3).find('.production__price').css('background-color', '#174922');
		});
	}
}

function openMenu() {
	$('.burger, .menu__close').on('click', function() {
		$('body').toggleClass('opened');
		$(this).toggleClass('opened');
		$('.menu').toggleClass('menu--opened');
	});
}

function openForm() {
	$('.popup').on('click', function() {
		$.fancybox.open({
			src  : '#form',
			type : 'inline'
		});
	});
}