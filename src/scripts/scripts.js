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

	if (jQuery('.card--expand')) {
		jQuery('.card--expand').on('click', function(e) {
			if (jQuery(this).hasClass('is-active')) {

				jQuery(this).removeClass('is-active');
			} else {
				jQuery('.card--expand').removeClass('is-active');
				jQuery(this).addClass('is-active');
			}

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



	///////Hey, Listen  -- section 2///////
	//hot air balloon
	TweenMax.staggerTo('.section__illustration__hot-air-balloon', 5, {y: '+=15', repeat: -1, yoyo: true, ease: Power2.easeInOut, repeatDelay: 0.4 }, 0.75);

	//spacehship
	TweenMax.to('.section__illustration__spaceship-nav', 5, {y: '+=15', repeat: -1, yoyo: true, ease: Power2.easeInOut, repeatDelay: 0.4 }, 0.75);
	TweenMax.to('.section__illustration__spaceship-blades', .5, { rotationY: 180, repeat: -1, ease: Power0.easeNone });

	//spaceships with block
	TweenMax.to('.section__illustration__spaceship-block', 7, {x: '+=30', repeat: -1, yoyo: true, ease: Power2.easeInOut, repeatDelay: 4 });

	//crane
	TweenMax.to('.section__illustration__crane', 4, {y: '+=50', repeat: -1, yoyo: true, ease: Power2.easeInOut, repeatDelay: 1 });
	TweenMax.to('.section__illustration__crane-rope', 4, {scaleY: '1.8', y: '-=50', repeat: -1, yoyo: true, ease: Power2.easeInOut, repeatDelay: 1 });

	//car
	TweenMax.fromTo('.section__illustration__tower-car', 8, {x: -125}, {x: 700, repeat: -1, ease: Power0.easeNone});


	////////Why is this needed -- section 3 //////////
	//Helicopter
	var helicopter3Timeline = new TimelineMax({ repeat: -1, ease: Sine.easeIn });
	helicopter3Timeline.fromTo('.section__illustration__helicopter[data-num="2"]', 6, { x: 316, y: -40 }, { x: 361, y: -19 })
		.to('.section__illustration__helicopter[data-num="2"]', 6, { x: 331, y: -2 })
		.to('.section__illustration__helicopter[data-num="2"]', 6, { x: 285, y: -6 })
		.to('.section__illustration__helicopter[data-num="2"]', 6, { x: 316, y: -40 });

	TweenMax.to('.section__illustration__helicopter-blades', .75, { rotationY: 180, repeat: -1, ease: Power0.easeNone });

	//heart mask
	TweenMax.fromTo('#heart-clip', 8, {y: 27}, {y: '+=50', repeat: -1, yoyo: true, ease: Power2.easeInOut, repeatDelay: 1 });

	//speaker lines
	TweenMax.staggerFromTo(['.section__illustration__speaker-lines-1', '.section__illustration__speaker-lines-2'], 1, {alpha: 1}, {alpha: 0, repeat: -1, yoyo: true, ease: Power2.easeInOut }, 1);



	////////Introducing: Community Game Incubation -- section 4 //////////
	//fund
	TweenMax.staggerTo(['.section__illustration__fund-coin[data-num="1"]', '.section__illustration__fund-coin[data-num="3"]', '.section__illustration__fund-coin[data-num="4"]', '.section__illustration__fund-coin[data-num="2"]'], 4, { rotationY: -360, repeat: -1, ease: Power0.easeNone, repeatDelay: 1 }, 1.25);

	//build
	TweenMax.to('.section__illustration__build-crane[data-num="1"]', 5, {y: '+=40', repeat: -1, yoyo: true, ease: Power2.easeInOut, repeatDelay: 1 });
	TweenMax.to('.section__illustration__build-crane[data-num="1"] .section__illustration__build-crane-rope', 5, {scaleY: '1.92', y: '-=40', repeat: -1, yoyo: true, ease: Power2.easeInOut, repeatDelay: 1 });

	TweenMax.to('.section__illustration__build-crane[data-num="2"]', 4, {y: '+=20', repeat: -1, yoyo: true, ease: Power2.easeInOut, repeatDelay: 1, delay: 0.75 });
	TweenMax.to('.section__illustration__build-crane[data-num="2"] .section__illustration__build-crane-rope', 4, {scaleY: '1.2', y: '-=20', repeat: -1, yoyo: true, ease: Power2.easeInOut, repeatDelay: 1, delay: 0.75 });

	//connect
	var connectCheckBoxesTimeline = new TimelineMax({ repeat: -1, yoyo: true, ease: Sine.easeIn, repeatDelay: 3});
	// connectCheckBoxesTimeline.staggerFromTo(['.section__illustration__connect-unchecked[data-num="1"]', '.section__illustration__connect-unchecked[data-num="2"]', '.section__illustration__connect-unchecked[data-num="3"]', '.section__illustration__connect-unchecked[data-num="4"]', '.section__illustration__connect-unchecked[data-num="5"]',
	// '.section__illustration__connect-unchecked[data-num="6"]'], 2, {y:-6},  {y: 10}, 1);
	connectCheckBoxesTimeline.staggerTo(['.section__illustration__connect-checked[data-num="1"]', '.section__illustration__connect-checked[data-num="2"]', '.section__illustration__connect-checked[data-num="3"]', '.section__illustration__connect-checked[data-num="4"]', '.section__illustration__connect-checked[data-num="5"]',
	'.section__illustration__connect-checked[data-num="6"]'], 1,  {y: -6, ease: Power2.easeInOut}, 1);


	////////Aset Marketplace -- section 5 //////////
	//spaceship
	TweenMax.to('.section__illustration__spaceship-rupie', 5, {y: '+=15', repeat: -1, yoyo: true, ease: Power2.easeInOut, repeatDelay: 0.4 }, 0.75);
	TweenMax.to('.section__illustration__spaceship-rupie-blades', .5, { rotationY: 180, repeat: -1, ease: Power0.easeNone });

	//rocketship
	TweenMax.to('.section__illustration__space-rocketship', 6, {y: '+=35', repeat: -1, yoyo: true, ease: Power2.easeInOut, repeatDelay: 2 });

	//Tube coins
	TweenMax.set('.section__illustration__space-coins[data-num="1"] img', {
		x: function (i) {
			return -(i * 24);
		}
	});
	TweenMax.staggerTo(['.section__illustration__space-coins[data-num="1"] [data-num="1"]', '.section__illustration__space-coins[data-num="1"] [data-num="2"]', '.section__illustration__space-coins[data-num="1"] [data-num="3"]', '.section__illustration__space-coins[data-num="1"] [data-num="4"]', '.section__illustration__space-coins[data-num="1"] [data-num="5"]'], 2, { x: '-=130', ease: Power0.easeNone, repeat: -1 }, 0.5);

	TweenMax.set('.section__illustration__space-coins[data-num="2"] img', {
		x: function (i) {
			return -(i * 24) - 130;
		}
	});
	TweenMax.staggerTo(['.section__illustration__space-coins[data-num="2"] [data-num="1"]', '.section__illustration__space-coins[data-num="2"] [data-num="2"]', '.section__illustration__space-coins[data-num="2"] [data-num="3"]', '.section__illustration__space-coins[data-num="2"] [data-num="4"]', '.section__illustration__space-coins[data-num="2"] [data-num="5"]'], 2, { x: '+=130', ease: Power0.easeNone, repeat: -1 }, 0.5);

	//buttons

	TweenMax.staggerTo('.section__illustration__space-base #buttons rect', 0.15, {fill: '#FFFFFF', repeat: -1, yoyo: true, ease: Power2.easeInOut, repeatDelay: 2 }, 0.2);




	////////Bounty System  -- Section 6 /////////////
	//Arm Boat
	var armboatTimeline = new TimelineMax({ repeat: -1, ease: Sine.easeIn, repeatDelay: 1});
	armboatTimeline.to('.section__illustration__robot #arm-boat', 6, {x: '+=50'})
	.to('.section__illustration__robot #arm-boat', 4, {y: '+=10'}, '-=2')
	.to('.section__illustration__robot #arm-boat', 12, {x: '-=100'})
	.to('.section__illustration__robot #arm-boat', 4, {y: '-=10'}, '-=2')
	.to('.section__illustration__robot #arm-boat', 6, {x: '+=50'});

	//helicopter
	var helicopter2Timeline = new TimelineMax({ repeat: -1, ease: Sine.easeIn });
	helicopter2Timeline.to('.section__illustration__helicopter[data-num="1"]', 4, { x: '+=2', y: '+=20' })
	.to('.section__illustration__helicopter[data-num="1"]', 4, { x: '+=10', y: '+=10' })
	.to('.section__illustration__helicopter[data-num="1"]', 4, { x: '-=18', y: '-=15' })
	.to('.section__illustration__helicopter[data-num="1"]', 4, { x: '+=6', y: '-=15' });

	//robot helicopter
	var helicopter3Timeline = new TimelineMax({ repeat: -1, yoyo: true, ease: Sine.easeInOut });
	helicopter3Timeline.to('.section__illustration__robot #helicopter, .section__illustration__robot-helicopter-blades', 4, { x: '+=20', y: '+=40' })
		.to('.section__illustration__robot #helicopter, .section__illustration__robot-helicopter-blades', 6, { x: '+=10', y: '-=20' })
		.to('.section__illustration__robot #helicopter, .section__illustration__robot-helicopter-blades', 6, { x: '-=30', y: '-=20' });

	TweenMax.to('.section__illustration__robot #tail-blades', 1, {rotation: 180, transformOrigin: "center", repeat: -1, ease: Power0.easeNone });

	TweenMax.to('.section__illustration__robot-helicopter-blades', 1.5, {rotationY: 360, repeat: -1, ease: Power0.easeNone });

	//robot leg
	TweenMax.to('.section__illustration__robot #robot-leg', 6, {y: '+=20', repeat: -1, repeatDelay: 2, yoyo: true, ease: Power2.easeInOut});



	//////////////Roadmap -- section 9////
	//////////////Roadmap -- section 9////
	TweenMax.staggerTo('.roadmap__step', 6, {y: '+=20', repeat: -1, repeatDelay: 2, yoyo: true, ease: Power2.easeInOut}, 0.5);





}

function initFooterAnimation() {
	var screenWidth = jQuery(window).outerWidth();
	var scale = screenWidth/1600;

	///////////Footer//////////////////////
	//////////////Roadmap -- section 9////
	TweenMax.set('.section__illustration__footer-path', {
		scaleX: function() {
			var screenWidth = jQuery(window).outerWidth();
			var scale = screenWidth/1600;
			return scale;
		}
	});

	if (footerCar) {
		footerCar.kill();
	}

	var footerCar = new TweenMax.fromTo('.section__illustration__footer-car', 10, {x: -210}, {
		x: function() {
			return screenWidth + 210;
		}, repeat: -1, ease: Power0.easeNone
	});

	footerCar.timeScale(1/scale);
	footerCar.play(1);
}

function initRupieTokenAnimation() {
	var screenWidth = jQuery(window).outerWidth();
	var scale = screenWidth/1600;

	TweenMax.killTweensOf('.section__illustration__rupie-token #rupie-right-tube [data-name="rupie"]', {x: true});

	TweenMax.killTweensOf('.section__illustration__rupie-token #rupie-left-tube [data-name="rupie"]', {x: true});

	TweenMax.set('.section__illustration__rupie-token #tube-left rect', {
		transformOrigin: "right"
	});

	TweenMax.set('.section__illustration__rupie-token #tube-right rect', {
		transformOrigin: "right"
	});

	TweenMax.set('.section__illustration__rupie-token #tube-left rect, .section__illustration__rupie-token #tube-right rect', {
		scaleX: function() {
			return scale*2.5;
		}
	});

	TweenMax.set('.section__illustration__rupie-token #rupie-left-tube [data-name="rupie"]', {
		x: function (i) {
			return (i * 53) + 21;
		}
	});
	TweenMax.staggerTo('.section__illustration__rupie-token #rupie-left-tube [data-name="rupie"]', 8, {
		x: function(i) {
			if (screenWidth > 992) {
			   var distance = 700*scale;
		   } else {
			   var distance = 500;
		   }

		   return '-=' + distance.toString();
		},
		 ease: Power0.easeNone, repeat: -1 }, 1);

	 TweenMax.set('.section__illustration__rupie-token #rupie-right-tube [data-name="rupie"]', {
		x: function (i) {
			return -(i * 52) - 21;
		}
	});

	 TweenMax.staggerTo('.section__illustration__rupie-token #rupie-right-tube [data-name="rupie"]', 8, {
		 x: function(i) {
			 if (screenWidth > 992) {
			 	var distance = 700*scale;
			} else {
				var distance = 500;
			}

			 return '+=' + distance.toString();
		 },
		ease: Power0.easeNone, repeat: -1 }, 1);

	TweenMax.staggerTo('.section__illustration__rupie-token-coin', 4, {rotationY: 360, ease: Power0.easeNone, repeat: -1, repeatDelay: 3 }, 5);
}

jQuery(document).ready(function () {
	jQuery('.menuToggle input').change(function () {
		jQuery('.menu').toggleClass('is-active');
	});

	jQuery('.menu').css({ 'height': jQuery(document).outerHeight() - 90 });
	toggleHeadlines();

	initAnimations();

	initFooterAnimation();

	initRupieTokenAnimation();

	initCardFlipInteraction();
});

jQuery(window).resize(function () {
	var screenWidth = jQuery(window).outerWidth();
	var scale = screenWidth/1600;

	jQuery('.menu').css({ 'height': jQuery(window).outerHeight() - 90 });

	TweenMax.set('.section__illustration__footer-path', {
		scaleX: function() {
			return scale;
		}
	});

	TweenMax.set('.section__illustration__rupie-token #tube-left rect, section__illustration__rupie-token #tube-right rect', {
		scaleX: function() {
			return scale*2;
		}
	});

	initRupieTokenAnimation();

	initFooterAnimation();
});
