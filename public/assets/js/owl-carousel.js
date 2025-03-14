(function($) {
	/*---Owl-carousel----*/
	
	// ______________Owl-carousel-icons
	var owl = $('.owl-carousel-icons');
	owl.owlCarousel({
		margin: 0,
		padding:15,
		loop: true,
		nav: true,
		autoplay: true,
		dots: false,
		responsive: {
			0: {
				items: 1
			},
			600: {
				items: 2
			},
			1300: {
				items: 3
			}
		}
	})
	
		
	// ______________Owl-carousel-icons2
	var owl = $('.owl-carousel-icons2');
	owl.owlCarousel({
		loop: true,
		margin: 0,
		animateIn: 'fadeInDowm',
		animateOut: 'fadeOutDown',
		autoplay: false,
		autoplayTimeout: 5000, // set value to change speed
		autoplayHoverPause: true,
		dots: false,
		nav: true,
		autoplay: true,
		responsiveClass: true,
		responsive: {
			0: {
				items: 1,
			},
			600: {
				items: 2,
			},
			1300: {
				items: 4,
			}
		}
	})
	
	// ______________Owl-carousel-icons3
	var owl = $('.owl-carousel-icons3');
	owl.owlCarousel({
		margin: 25,
		loop: true,
		nav: false,
		dots: false,
		autoplay: true,
		responsive: {
			0: {
				items: 1
			},
			600: {
				items: 1
			},
			1000: {
				items: 2
			}
		}
	})
	
	// ______________Owl-carousel-icons4
	var owl = $('.owl-carousel-icons4');
	owl.owlCarousel({
		margin: 25,
		loop: true,
		nav: false,
		dots: false,
		autoplay: true,
		responsive: {
			0: {
				items: 1
			},
			600: {
				items: 3
			},
			1000: {
				items: 6
			}
		}
	})
	
	// ______________Owl-carousel-icons5
	var owl = $('.owl-carousel-icons5');
	owl.owlCarousel({
		loop: true,
		rewind: false,
		margin: 25,
		animateIn: 'fadeInDowm',
		animateOut: 'fadeOutDown',
		autoplay: false,
		autoplayTimeout: 5000, // set value to change speed
		autoplayHoverPause: true,
		dots: true,
		nav: false,
		autoplay: true,
		responsiveClass: true,
		responsive: {
			0: {
				items: 1,
				nav: true
			},
			600: {
				items: 2,
				nav: true
			},
			1300: {
				items: 4,
				nav: true
			}
		}
	})
	
	// ______________Owl-carousel-icons6
	var owl = $('.owl-carousel-icons6');
	owl.owlCarousel({
		margin: 25,
		loop: true,
		nav: false,
		dots: false,
		autoplay: true,
		responsive: {
			0: {
				items: 1
			},
			600: {
				items: 2
			},
			1000: {
				items: 3
			}
		}
	})
	
	// ______________Owl-carousel-icons7
	var owl = $('.owl-carousel-icons7');
	owl.owlCarousel({
		margin: 25,
		loop: true,
		nav: false,
		dots: false,
		autoplay: true,
		responsive: {
			0: {
				items: 1
			},
			600: {
				items: 2
			},
			1000: {
				items: 3
			}
		}
	})
	// ______________Testimonial-owl-carousel2
	var owl = $('.testimonial-owl-carousel2');
	owl.owlCarousel({
		margin: 25,
		loop: true,
		nav: true,
		autoplay: true,
		dots: true,
		animateOut: 'fadeOut',
		smartSpeed:450,
		responsive: {
			0: {
				items: 1
			}
		}
	})
	
	// ______________Testimonial-owl-carousel3
	var owl = $('.testimonial-owl-carousel3');
	owl.owlCarousel({
		margin: 25,
		loop: true,
		nav: false,
		autoplay: true,
		dots: true,
		responsive: {
			0: {
				items: 1
			}
		}
	})
	
	// ______________Testimonial-owl-carousel4
	var owl = $('.testimonial-owl-carousel4');
	owl.owlCarousel({
		margin: 25,
		loop: true,
		nav: false,
		autoplay: true,
		autoplayTimeout: 8000, // set value to change speed
		thumbs: true,
		dots: false,
		responsive: {
			0: {
				items: 1
			}
		}
	})
	
	// ______________Testimonial-owl-carousel
	var owl = $('.testimonial-owl-carousel');
	owl.owlCarousel({
		loop: true,
		margin: 0,
		autoplay: false,
		animateIn: 'fadeInDowm',
		animateOut: 'fadeOutDown',
		autoplayTimeout: 5000, // set value to change speed
		autoplayHoverPause: true,
		dots: false,
		nav: true,
		responsiveClass: true,
		responsive: {
			0: {
				items: 1
			},
			600: {
				items: 2
			},
			1000: {
				items: 3
			}
		}
	})
	
	// ______________Testimonial-owl-carousel
	var owl = $('.testimonial-owl-carousel-01');
	owl.owlCarousel({
		loop: true,
		rewind: false,
		margin: 25,
		autoplay: true,
		animateIn: 'fadeInDowm',
		animateOut: 'fadeOutDown',
		autoplay: true,
		autoplayTimeout: 5000, // set value to change speed
		autoplayHoverPause: true,
		dots: true,
		nav: false,
		responsiveClass: true,
		responsive: {
			0: {
				items: 1,
				nav: false
			},
			1000: {
				items: 1,
				nav: true
			}
		}
	})
	
	// ______________Client-carousel
	var owl = $('.client-carousel');
	owl.owlCarousel({
		loop: true,
		rewind: false,
		margin: 25,
		animateIn: 'fadeInDowm',
		animateOut: 'fadeOutDown',
		autoplay: true,
		autoplayTimeout: 5000, // set value to change speed
		autoplayHoverPause: true,
		dots: false,
		nav: false,
		responsiveClass: true,
		responsive: {
			0: {
				items: 2,
				nav:false
			},
			600: {
				items: 3,
				nav: false
			},
			1300: {
				items: 5,
				nav: false
			}
		}
	})
	
	// ______________Client-carousel
	var owl = $('.classes-carousel');
	owl.owlCarousel({
		loop:true,
		margin:0,
		autoplay:true,
		autoplayHoverPause:true,
		dots: false,
		 slideTransition: 'linear',
        autoplayTimeout: 3000,
        autoplaySpeed: 3000,
		responsiveClass: true,
		responsive: {
			0: {
				items: 1,
				nav:false
			},
			600: {
				items: 2,
				nav: false
			},
			1300: {
				items: 6,
				nav: false
			}
		}
	})
	
	// ______________Client-carousel
	var owl = $('.classes-carousel-1');
	owl.owlCarousel({
        // items:3,
		loop:true,
		margin:0,
		autoplay:true,
		autoplayHoverPause:true,
		dots: false,
		slideTransition: 'linear',
        autoplayTimeout: 3000,
        autoplaySpeed: 3000,
		responsiveClass: true,
		responsive: {
			0: {
				items: 1,
				nav:false
			},
			600: {
				items: 2,
				nav: false
			},
			1300: {
				items: 4,
				nav: false
			}
		}
	})
	
	// ______________Client-carousel
	var owl = $('.classes-carousel-2');
	owl.owlCarousel({
        // items:4,
		loop:true,
		margin:0,
		autoplay:true,
		autoplayHoverPause:true,
		dots: false,
		slideTransition: 'linear',
        autoplayTimeout: 3000,
        autoplaySpeed: 3000,
		responsiveClass: true,
		responsive: {
			0: {
				items: 1,
				nav:false
			},
			600: {
				items: 2,
				nav: false
			},
			1300: {
				items: 4,
				nav: false
			}
		}
	})
	// ______________bannner-owl-carousel
	var owl = $('.bannner-owl-carousel');
	owl.owlCarousel({
		margin: 0,
		padding:0,
		loop: true,
		nav: false,
		autoplay: true,
		dots: false,
		animateOut: 'fadeOut',
		smartSpeed:450,
		responsive: {
			0: {
				items: 1
			}
		}
	})
	
	// ______________bannner-owl-carousel1
	var owl = $('.bannner-owl-carousel1');
	owl.owlCarousel({
		margin: 0,
		loop: true,
		nav: true,
		autoplay: true,
		dots: false,
		animateOut: 'fadeIn',
		smartSpeed:450,
		responsive: {
			0: {
				items: 1
			}
		}
	})
	
})(jQuery);

