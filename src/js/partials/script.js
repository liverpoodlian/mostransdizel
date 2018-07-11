$(function(){
	if($('#map').length > 0){
		google.maps.event.addDomListener(window, 'load', init);
	}

	initMainSlider();
	openPricesHeader();
	openFAQ();
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
	$('.main-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		dots: true
	});
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