jQuery(document).ready(function () {
	jQuery('.menuToggle input').change(function () {
		jQuery('.menu').toggleClass('is-active');
	});

	jQuery('.menu').css({ 'height': jQuery(window).outerHeight() - 90 });
	toggleHeadlines();

	initAnimations();

	initCardFlipInteraction();
});

jQuery(window).resize(function () {
	jQuery('.menu').css({ 'height': jQuery(window).outerHeight() - 90 });

});

jQuery('#mc-embedded-subscribe-form').on('submit', function () {
	if (jQuery(this).find('input').hasClass('valid') && !jQuery(this).find('input').hasClass('mce_inline_error')) {
		jQuery(this).find('input, button').fadeOut();
	}
});

var headlineOptions = ['Build', 'Fund', 'Play', 'Ideate', 'Evolve', 'Launch', 'Ship'];

function toggleHeadlines() {
	var headlineTimeline = new TimelineMax({ repeat: -1, ease: Sine.easeIn });
	var currentHeadlineIndex = 0;
	var headline2 = jQuery('#headline-swap .swap-container-2');
	var headline1 = jQuery('#headline-swap .swap-container-1');
	var staticTextContainer = jQuery('.headline-static-text');

	currentHeadlineIndex = setHeadlineIndex(currentHeadlineIndex);
	headline2.html(headlineOptions[currentHeadlineIndex]);

	headlineTimeline.set('#headline-swap .swap-container-2', { css: { opacity: 0, y: 40 } });
	headlineTimeline.set('#headline-swap .swap-container-1', { css: { opacity: 100, y: 0 } });

	//animate headline 2 in, 1 out
	headlineTimeline.to('#headline-swap .swap-container-1', 0.5, {
		css: { opacity: 0, y: '-=40' }, ease: Power3.easeOut, delay: 5,
		onStart: function () {
			if (jQuery(window).width() > 576) {
				var containerLength = jQuery('.swap-container-2').outerWidth();
				TweenMax.to('.headline-static-text', 0.5, { x: containerLength + 10, ease: Power1.easeIn });
			} else {
				TweenMax.set('.headline-static-text', { x: 0 });
			}
		}
	})
		.to('#headline-swap .swap-container-2', 0.75, {
			css: { opacity: 100, y: 0 }, ease: Power3.easeIn,
			onComplete: function () {
				currentHeadlineIndex = setHeadlineIndex(currentHeadlineIndex);
				headline1.html(headlineOptions[currentHeadlineIndex]);
			}
		}, '-=0.375')
		.set('#headline-swap .swap-container-1', { css: { y: 40, opacity: 0 } });

	//animate headline 1 in, 2 out
	headlineTimeline.to('#headline-swap .swap-container-2', 0.5, {
		css: { opacity: 0, y: '-=40' }, ease: Power3.easeOut, delay: 5,
		onStart: function () {
			if (jQuery(window).width() > 576) {
				var containerLength = jQuery('.swap-container-1').outerWidth();
				TweenMax.to('.headline-static-text', 0.5, { x: containerLength + 10, ease: Power1.easeIn });
			} else {
				TweenMax.set('.headline-static-text', { x: 0 });
			}
		}
	})
		.to('#headline-swap .swap-container-1', 0.75, {
			css: { opacity: 100, y: 0 }, ease: Power3.easeIn,
			onComplete: function () {
				currentHeadlineIndex = setHeadlineIndex(currentHeadlineIndex);
				headline2.html(headlineOptions[currentHeadlineIndex]);
			}
		}, '-=0.375')
		.set('#headline-swap .swap-container-2', { css: { y: 40, opacity: 0 } });
}

function setHeadlineIndex(currentHeadlineIndex) {
	var newHeadlineIndex = Math.floor(Math.random() * headlineOptions.length);
	if (currentHeadlineIndex != newHeadlineIndex) {
		currentHeadlineIndex = newHeadlineIndex;
	} else {
		currentHeadlineIndex = newHeadlineIndex !== 0 ? newHeadlineIndex - 1 : headlineOptions.length - 1;
	}

	return currentHeadlineIndex;
}

function initCardFlipInteraction() {
	if (jQuery('.card--flip')) {
		jQuery('.card--flip').on('click', function() {
			jQuery(this).toggleClass('is-active');
		})
	}
}


//animations
function initAnimations() {
	//////// Main illustration/////////
	//hot air balloon
	TweenMax.to('.illustration__hot-air-balloon', 5, { x: 520, y: 100, repeat: -1, yoyo: true, ease: Power2.easeInOut });
	TweenMax.fromTo('.illustration__hot-air-balloon', 2, { rotation: -2 }, { rotation: 2, repeat: -1, yoyo: true, ease: Power2.easeInOut, delay: 1 });

	//ferris wheel
	TweenMax.to('.illustration__ferris-wheel-spinner', 10, { rotation: 360, repeat: -1, ease: Power0.easeNone });
	TweenMax.to('.illustration__ferris-wheel-cart > img', 10, { rotation: -360, repeat: -1, ease: Power0.easeNone });

	//Crane
	TweenMax.to('.illustration__crane-hook', 7, { y: 384, repeat: -1, ease: Power1.easeInOut, yoyo: true });
	TweenMax.to('.illustration__crane-strings', 7, { scaleY: 1.6, repeat: -1, ease: Power1.easeInOut, yoyo: true });
	TweenMax.fromTo('.illustration__crane-bucket', 3, { rotation: -10 }, { rotation: 10, repeat: -1, ease: Power1.easeInOut, yoyo: true });

	//Helicopter
	TweenMax.to('.illustration__helicopter-blades', .5, { rotationY: 180, repeat: -1, ease: Power0.easeNone });
	TweenMax.fromTo('.illustration__helicopter-ruby', 3, { rotation: -7 }, { rotation: 7, repeat: -1, ease: Power1.easeInOut, yoyo: true });
	TweenMax.fromTo('.illustration__helicopter', 3, { rotation: 5 }, { rotation: -5, repeat: -1, ease: Power1.easeInOut, yoyo: true });
	var helicopterTimeline = new TimelineMax({ repeat: -1, ease: Sine.easeIn });
	helicopterTimeline.fromTo('.illustration__helicopter', 4, { x: 165, y: 164 }, { x: 167, y: 211 })
		.to('.illustration__helicopter', 4, { x: 141, y: 216 })
		.to('.illustration__helicopter', 4, { x: 151, y: 170 })
		.to('.illustration__helicopter', 4, { x: 165, y: 164 });

	//Cars
	TweenMax.fromTo('.illustration__cars-car2[data-num="1"]', 12, { x: 3, y: -131 }, { x: 815, y: -131, repeat: -1, ease: Power0.easeNone });

	TweenMax.staggerFromTo(['.illustration__cars-car2[data-num="2"]', '.illustration__cars-car2[data-num="3"]'], 12, { x: 3, y: -216 }, { x: 815, y: -216, repeat: -1, ease: Power0.easeNone, delay: 1 }, 2);

	// var car2Timeline1 = new TimelineMax({ repeat: -1 });
	// car2Timeline1.fromTo('.illustration__cars-car2[data-num="4"]', 4, { x: 723, y: -302 }, { x: 923, y: -302, ease: Power0.easeNone });
	// car2Timeline1.fromTo('.illustration__cars-car2[data-num="4"]', 15, { x: 0, y: -302 }, { x: 723, y: -302, ease: Power0.easeNone });

	var car2Timeline2 = new TimelineMax({ repeat: -1 });
	car2Timeline2.fromTo('.illustration__cars-car2[data-num="5"]', 15, { x: 133, y: -352 }, { x: 923, y: -352, ease: Power0.easeNone });
	car2Timeline2.fromTo('.illustration__cars-car2[data-num="5"]', 3, { x: 0, y: -352 }, { x: 133, y: -352, ease: Power0.easeNone });

	var car2Timeline3 = new TimelineMax({ repeat: -1 });
	car2Timeline3.fromTo('.illustration__cars-car2[data-num="6"]', 9, { x: 163, y: -352 }, { x: 923, y: -352, ease: Power0.easeNone });
	car2Timeline3.fromTo('.illustration__cars-car2[data-num="6"]', 2, { x: 0, y: -352 }, { x: 163, y: -352, ease: Power0.easeNone });


	var car1Timeline = new TimelineMax({ repeat: -1 });
	car1Timeline.fromTo('.illustration__cars-car1[data-num="1"]', 6, { x: 391.5, y: -147 }, { x: 793, y: -147, ease: Power0.easeNone });
	car1Timeline.fromTo('.illustration__cars-car1[data-num="1"]', 6, { x: -10, y: -147 }, { x: 391.5, y: -147, ease: Power0.easeNone });

	var car1Timeline2 = new TimelineMax({ repeat: -1 });
	car1Timeline2.fromTo('.illustration__cars-car1[data-num="2"]', 3.5, { x: 521.5, y: -182 }, { x: 923, y: -182, ease: Power0.easeNone });
	car1Timeline2.fromTo('.illustration__cars-car1[data-num="2"]', 7, { x: -120, y: -182 }, { x: 521.5, y: -182, ease: Power0.easeNone });


	var car3Timeline = new TimelineMax({ repeat: -1 });
	car3Timeline.fromTo('.illustration__cars-car3[data-num="1"]', 12, { x: 223, y: -327 }, { x: 923, y: -327, ease: Power0.easeNone });
	car3Timeline.fromTo('.illustration__cars-car3[data-num="1"]', 4, { x: 0, y: -327 }, { x: 223, y: -327, ease: Power0.easeNone });


	//Tube Rupies
	TweenMax.set('.illustration__tubes-top-left img', {
		x: function (i) {
			return -(i * 28);
		}
	});
	TweenMax.staggerTo(['.illustration__tubes-top-left [data-num="1"]', '.illustration__tubes-top-left [data-num="2"]', '.illustration__tubes-top-left [data-num="3"]'], 1.5, { x: '+=56', ease: Power0.easeNone, repeat: -1 }, 0.75);


	TweenMax.set('.illustration__tubes-top-right img', {
		x: function (i) {
			return 108 - (i * 28);
		}
	});
	TweenMax.staggerTo(['.illustration__tubes-top-right [data-num="1"]', '.illustration__tubes-top-right [data-num="2"]', '.illustration__tubes-top-right [data-num="3"]', '.illustration__tubes-top-right [data-num="4"]', '.illustration__tubes-top-right [data-num="5"]'], 2, { x: '-=112', ease: Power0.easeNone, repeat: -1 }, 0.5);


	TweenMax.set('.illustration__tubes-bottom-right img', {
		x: function (i) {
			return 108 - (i * 28);
		}
	});
	TweenMax.staggerTo(['.illustration__tubes-bottom-right [data-num="1"]', '.illustration__tubes-bottom-right [data-num="2"]', '.illustration__tubes-bottom-right [data-num="3"]', '.illustration__tubes-bottom-right [data-num="4"]', '.illustration__tubes-bottom-right [data-num="5"]'], 3, { x: '-=112', ease: Power0.easeNone, repeat: -1 }, 0.75);


	TweenMax.set('.illustration__tubes-bottom-left img', {
		x: function (i) {
			return -(i * 28);
		}
	});
	TweenMax.staggerTo(['.illustration__tubes-bottom-left [data-num="1"]', '.illustration__tubes-bottom-left [data-num="2"]', '.illustration__tubes-bottom-left [data-num="3"]', '.illustration__tubes-bottom-left [data-num="4"]'], 3, { x: '+=112', ease: Power0.easeNone, repeat: -1 }, 0.75);


	TweenMax.set('.illustration__tubes-top-top img', {
		x: function (i) {
			return -(i * 28);
		}
	});
	TweenMax.staggerTo(['.illustration__tubes-top-top [data-num="1"]', '.illustration__tubes-top-top [data-num="2"]', '.illustration__tubes-top-top [data-num="3"]', '.illustration__tubes-top-top [data-num="4"]'], 1, { x: '+=62', ease: Power0.easeNone, repeat: -1 }, .5);

	//Gyrocopter
	TweenMax.to('.illustration__gyrocopter-blades', .5, { rotationY: 180, repeat: -1, ease: Power0.easeNone });
	TweenMax.to('.illustration__gyrocopter', 5, { y: '+=7', repeat: -1, ease: Power1.easeInOut, yoyo: true });
	TweenMax.to('.illustration__gyrocopter', 4, { x: '+=4', repeat: -1, ease: Power1.easeInOut, yoyo: true });


	TweenMax.to('.illustration__gyrocopter-pincher [data-num="1"]', 1, { rotation: '+=30', ease: Power0.easeNone, repeat: -1, yoyo: true });
	TweenMax.to('.illustration__gyrocopter-pincher [data-num="2"]', 1, { rotation: '-=20', ease: Power0.easeNone, repeat: -1, yoyo: true });


	//Game
	TweenMax.to('.illustration__game-satellite', 2, { rotation: '-=30', repeat: -1, yoyo: true, ease: Power1.easeInOut, repeatDelay: 3 });

	var shipTimeline = new TimelineMax({ repeat: -1, repeatDelay: 3 });
	shipTimeline
		.set('.illustration__game-lasers', {
			x: function (i) {
				return '-=' + (i * 9);
			}
		})
		.set('.illustration__game-ship', { rotate: 80 })
		.set('.illustration__game-meteor-sm[data-num="2"]', { x: 16, y: 60, rotation: 0 })
		.to('.illustration__game-ship', 2, { rotation: '-=80', ease: Power2.easeInOut })
		.to('.illustration__game-ship', 2, { rotation: '+=172', ease: Power2.easeInOut })
		.staggerTo(['.illustration__game-lasers[data-num="1"]', '.illustration__game-lasers[data-num="2"]', '.illustration__game-lasers[data-num="3"]'], 1.2, { x: 49, y: 3, ease: Power0.easeNone }, 0.25)
		.fromTo('.illustration__game-meteor-sm[data-num="2"]', 3, { x: 107, y: -50, rotation: 0 }, { x: 54, y: 3, rotation: -110, ease: Power0.easeNone }, '-=4.2')
		.staggerTo(['.illustration__game-lasers[data-num="1"]', '.illustration__game-lasers[data-num="2"]', '.illustration__game-lasers[data-num="3"]'], .2, { opacity: 0, ease: Power0.easeNone, delay: 0.5 }, 0.1, '-=1.35')
		// .fromTo('.illustration__game-meteor-sm[data-num="2"]', 3, {x: 11, y:-114, rotation: 0}, {x: 9, y:0, rotation: -110, ease:Power0.easeNone}, '-=5')
		.fromTo('.illustration__game-explosion', 0.3, { opacity: 0 }, { opacity: 100, ease: Power0.easeNone }, '-=1')
		.to('.illustration__game-meteor-sm[data-num="2"]', 0.01, { opacity: 0 }, '-=1')
		.set('.illustration__game-explosion', { opacity: 0 })
		.to('.illustration__game-ship', 2, { rotation: '-=92', ease: Power2.easeInOut });

	//meteors
	TweenMax.fromTo('.illustration__game-meteor-xl[data-num="1"]', 8, { x: 31, y: 107, rotation: 0 }, { x: -35, y: 5, rotation: 360, repeat: -1, ease: Power0.easeNone });
	TweenMax.fromTo('.illustration__game-meteor-xl[data-num="2"]', 8, { x: -18, y: 111, rotation: 0 }, { x: 112, y: 3, rotation: 360, repeat: -1, ease: Power0.easeNone, delay: 3 });
	TweenMax.fromTo('.illustration__game-meteor-l[data-num="1"]', 4, { x: -56, y: 110, rotation: 0 }, { x: 77, y: 37, rotation: 90, repeat: -1, ease: Power0.easeNone, repeatDelay: 1 });
	TweenMax.fromTo('.illustration__game-meteor-l[data-num="2"]', 6, { x: -67, y: -31, rotation: 0 }, { x: -93, y: 97, rotation: -130, repeat: -1, ease: Power0.easeNone, repeatDelay: 2 });
	TweenMax.fromTo('.illustration__game-meteor-md[data-num="3"]', 3, { x: -55, y: 49, rotation: 0 }, { x: 139, y: 37, rotation: 50, repeat: -1, ease: Power0.easeNone, repeatDelay: 1, delay: 1 });
	TweenMax.fromTo('.illustration__game-meteor-md[data-num="1"]', 4, { x: -47, y: -31, rotation: 0 }, { x: 27, y: 101, rotation: 50, repeat: -1, ease: Power0.easeNone, repeatDelay: 1, delay: 1 });
	TweenMax.fromTo('.illustration__game-meteor-md[data-num="2"]', 5.5, { x: 160, y: 29, rotation: 0 }, { x: 33, y: -66, rotation: 110, repeat: -1, ease: Power0.easeNone, repeatDelay: 2 });
	TweenMax.fromTo('.illustration__game-meteor-sm[data-num="1"]', 6, { x: -3, y: -59, rotation: 0 }, { x: 93, y: 58, rotation: -210, repeat: -1, ease: Power0.easeNone, repeatDelay: 2 });



	///////Hey, Listen///////
	//hot air balloon
	TweenMax.staggerTo(['.section__illustration__hot-air-balloon[data-num=1]', '.section__illustration__hot-air-balloon[data-num=2]', '.section__illustration__hot-air-balloon[data-num=3]'], 5, {y: '+=15', repeat: -1, yoyo: true, ease: Power2.easeInOut, repeatDelay: 0.4 }, 0.75);
	TweenMax.fromTo('.section__illustration__hot-air-balloon', 2, { rotation: -2 }, { rotation: 2, repeat: -1, yoyo: true, ease: Power2.easeInOut, delay: 1 });


	////////Bounty System/////////////
	//helicopter
	var helicopter2Timeline = new TimelineMax({ repeat: -1, ease: Sine.easeIn });
	helicopter2Timeline.fromTo('.section__illustration__helicopter', 4, { x: 165, y: 224 }, { x: 167, y: 241 })
		.to('.section__illustration__helicopter', 4, { x: 141, y: 296 })
		.to('.section__illustration__helicopter', 4, { x: 151, y: 240 })
		.to('.section__illustration__helicopter', 4, { x: 165, y: 224 });
}
