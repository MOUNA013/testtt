(function($) {
	"use strict";
	
	// ______________ Global Loader
	$(window).on("load", function(e) {
		$("#global-loader").fadeOut("slow");
	})
	
	
	
	// ______________ Cover-image
	$(".cover-image").each(function(e) {
		var attr = $(this).attr('data-bs-image-src');
		if (typeof attr !== typeof undefined && attr !== false) {
			$(this).css('background', 'url(' + attr + ') center center');
		}
	});

	
	// ______________Rating Stars
	var ratingOptions = {
		selectors: {
			starsSelector: '.rating-stars',
			starSelector: '.rating-star',
			starActiveClass: 'is--active',
			starHoverClass: 'is--hover',
			starNoHoverClass: 'is--no-hover',
			targetFormElementSelector: '.rating-value'
		}
	};
	
	// ______________Active Class
	$(".horizontalMenu-list li a").each(function(e) {
		var pageUrl = window.location.href.split(/[?#]/)[0];
		if (this.href == pageUrl) {
			$(this).addClass("active");
			$(this).parent().addClass("active"); // add active to li of the current link
			$(this).parent().parent().prev().addClass("active"); // add active class to an anchor
			$(this).parent().parent().prev().click(); // click the item to make it drop
		}
	});

	// ______________ Back to Top
	$(window).on("scroll", function(e) {
		if ($(this).scrollTop() > 0) {
			$('#back-to-top').fadeIn('slow');
		} else {
			$('#back-to-top').fadeOut('slow');
		}
	});
	$(document).on("click", "#back-to-top", function(e) {
		$("html, body").animate({
			scrollTop: 0
		}, 0);
		return false;
	});
	
	// ______________Quantity-right-plus
	var quantitiy = 0;
	$(document).on('click','.quantity-right-plus', function(e) {
		e.preventDefault();
		var quantity = parseInt($('#quantity').val()); 
		$('#quantity').val(quantity + 1); 
	});
	$(document).on('click', '.quantity-left-minus', function(e) {
		e.preventDefault();
		var quantity = parseInt($('#quantity').val());
		if (quantity > 0) {
			$('#quantity').val(quantity - 1);
		}
	});
	
	
	
	// ______________Chart-circle
	if ($('.chart-circle').length) {
		$('.chart-circle').each(function(e) {
			let $this = $(this);
			$this.circleProgress({
				fill: {
					color: $this.attr('data-color')
				},
				size: $this.height(),
				startAngle: -Math.PI / 4 * 2,
				emptyFill: '#f9faff',
				lineCap: ''
			});
		});
	}
	const DIV_CARD = 'div.card';
	
	// ___________TOOLTIP
	var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
	var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
		return new bootstrap.Tooltip(tooltipTriggerEl)
	})
	
	// __________POPOVER
	var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
	var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
	return new bootstrap.Popover(popoverTriggerEl)
	})
	// By default, Bootstrap doesn't auto close popover after appearing in the page
	$(document).on('click', function (e) {
		$('[data-bs-toggle="popover"],[data-original-title]').each(function () {
			if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
				(($(this).popover('hide').data('bs.popover')||{}).inState||{}).click = false  // fix for BS 3.3.6
			}

		});
	});
	
	// ______________Card Remove
	$(document).on('click', '[data-bs-toggle="card-remove"]', function(e) {
		let $card = $(this).closest(DIV_CARD);
		$card.remove();
		e.preventDefault();
		return false;
	});
	
	// ______________Card Collapse
	$(document).on('click', '[data-bs-toggle="card-collapse"]', function(e) {
		let $card = $(this).closest(DIV_CARD);
		$card.toggleClass('card-collapsed');
		e.preventDefault();
		return false;
	});
	
	// ______________Card Full Screen
	$(document).on('click', '[data-bs-toggle="card-fullscreen"]', function(e) {
		let $card = $(this).closest(DIV_CARD);
		$card.toggleClass('card-fullscreen').removeClass('card-collapsed');
		e.preventDefault();
		return false;
	});
	

})(jQuery);

// ______________ Modal
$(document).ready(function(){
	$("#myModal").modal('show');
});

$(document).ready(function(){
	$(".sticky").parent().addClass('header-absolute');
});




  // add resource to favorite
function handleResourceFavorite(csrf, textColor = true) {
    const favoritesBtn = document.querySelectorAll(".favorite-btn");
    favoritesBtn.forEach((btn) => {
        btn.addEventListener("click", async function () {
            const resourceId = this.getAttribute("data-id");
            // add resource to favorite
            if (this.querySelector("i").classList.contains("fe-heart")) {
                const response = await fetch(
                    `/favorites/resources/${resourceId}`,
                    {
                        method: "POST",
                        headers: {
                            "Accept": "application/json",
                            "Content-Type": "application/json",
                            "X-CSRF-TOKEN": csrf,
                        },
                    }
                );
                const result = await response.json();
                if (result?.status === 201) {
                    this.querySelector("i").classList.replace("fe", "fa");
                    this.querySelector("i").classList.replace(
                        "fe-heart",
                        "fa-heart"
                    );
                    if(textColor) this.classList.add("text-primary");
                } else if (result?.status === 401) {
                    $("#LoginModal").modal("show");
                    // Register()
                }
                else console.log(result);
            }
            // remove resource to favorite
            else {
                const response = await fetch(
                    `/favorites/resources/${resourceId}/s`,
                    {
                        method: "DELETE",
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/json",
                            "X-CSRF-TOKEN": csrf,
                        },
                    }
                );
                const result = await response.json();
                if (result?.status === 201) {
                    this.querySelector("i").classList.replace("fa", "fe");
                    this.querySelector("i").classList.replace(
                        "fa-heart",
                        "fe-heart"
                    );
                    if(textColor) this.classList.remove("text-primary");
                } else if (result?.status === 401) {
                    $("#LoginModal").modal("show");
                    // Register()
                }
                else console.log(result);
            }
        });
    });
}

// handle sidebar visibility
const itemUser = document.querySelector(".item-user");
const appSidebar = document.querySelector(".app-sidebar");
if (document.getElementById("aside-control")) {
    document
        .getElementById("aside-control")
        .addEventListener("click", function () {
            itemUser.classList.toggle("hide-sidebar");
            appSidebar.classList.toggle("hide-sidebar");
            if (sessionStorage.getItem("aside"))
                sessionStorage.removeItem("aside");
            else sessionStorage.setItem("aside", true);
        });
}
if (sessionStorage.getItem("aside")) {
    itemUser.classList.toggle("hide-sidebar");
    appSidebar.classList.toggle("hide-sidebar");
}