document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll(".nav_link");
    const path = window.location.pathname;

    // Determine the active link based on the current pathname
    let activeLinkId;

    // Forum Links
    if (path === '/forum') {
        activeLinkId = 'all-link';
    } else if (path === '/forum/home/top') {
        activeLinkId = 'top-link';
    } else if (path === '/forum/home/follow') {
        activeLinkId = 'follow-link';
    }

    // Search Links
    const searchParams = new URLSearchParams(window.location.search);
    const filters = searchParams.get('filters');

    if (filters === 'posts') {
        activeLinkId = 'posts-result';
    } else if (filters === 'communities') {
        activeLinkId = 'communities-result';
    } else if (filters === 'users') {
        activeLinkId = 'users-result';
    }

    // If an active link ID is determined, apply 'nav_link_active' class to it
    if (activeLinkId) {
        const activeLink = document.getElementById(activeLinkId);
        if (activeLink) {
            activeLink.classList.add("nav_link_active");
        }
    }

    // Attach click event listeners to update the active class on click
    links.forEach(link => {
        link.addEventListener("click", function() {
            // Remove 'nav_link_active' class from all links
            links.forEach(link => {
                link.classList.remove("nav_link_active");
            });

            // Add 'nav_link_active' class to the clicked link
            this.classList.add("nav_link_active");
        });
    });
});