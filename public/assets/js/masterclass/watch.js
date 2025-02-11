const leftSide = document.querySelector(".left-side"),
    rightSide = document.querySelector(".right-side"),
    rightSideContent = document.querySelector(".episode-content"),
    closeRightSideMobileBtn = document.querySelector(
        "#close-right-side-mobile"
    ),
    showRightSideMobileBtn = document.getElementById("show-right-side-mobile"),
    closeRightSide = document.getElementById("close-right-side"),
    openRightSide = document.getElementById("open-right-side")

const episodeInput = document.querySelector('input[name="episodeId"]');
let commentsCount = document.getElementById("comments-count");

if (episodeInput) {
    const episodeId = episodeInput.value;
    const player = new Plyr("#player");

    window.addEventListener("DOMContentLoaded", () => {
        const episodeElement = document.querySelector(".ep-" + episodeId);

        // if (episodeElement) {
        //     episodeElement.scrollIntoView();
        // } else {
        //     console.error(`Element with class "ep-${episodeId}" not found.`);
        // }

        if (localStorage.getItem("autoplay") === "true") {
            autocompleteSwitchBtn.setAttribute("checked", true);
            player.on("ended", autocomplete);
        }
    });

    function trackEpisodeProgress(done = false) {
        let updateEpisodeProgressInterval;
        player.on("playing", () => {
            clearInterval(updateEpisodeProgressInterval); // clear interval because the playing event fired two times
            updateEpisodeProgressInterval = setInterval(() => {
                updateEpisodeProgress(player.currentTime);
            }, 5000);
        });

        player.on("pause", () => {
            clearInterval(updateEpisodeProgressInterval);
        });

        if (!done) {
            player.on("ended", () => {
                updateEpisodeProgress(player.currentTime, true);
                clearInterval(updateEpisodeProgressInterval);
                document
                    .querySelector(".ep-" + episodeId)
                    .querySelector(".fa-circle-half-stroke")
                    .classList.replace(
                        "fa-circle-half-stroke",
                        "fa-circle-check"
                    );
            });
        }
    }

    function setPlayerCurrentTime(time) {
        setTimeout(() => {
            // player.on('ready', function () {
            console.log("> > > ", player.duration, time);
            if (player.duration > time) {
                //         console.log(player.duration)
                player.currentTime = +time;
                player.play();
            }
        }, 3000);
        // })
    }

    function autocomplete() {
        setTimeout(() => {
            completeAndContinue[0].click();
        }, 3000);
    }
}

$(document).ready(function () {
    $('#close-right-side').on('click', function () {
        $('#sidebar').addClass('sidebar');
        $('.left-edge-hover').addClass('sidebar');
        $('.left-side').addClass('full-screen');
        $('#open-right-side').removeClass('d-none')
        $('#close-right-side').addClass('d-none')
    })
});

$(document).ready(function () {
    $('#open-right-side').on('click', function () {
        $('#sidebar').removeClass('sidebar');
        $('.left-edge-hover').removeClass('sidebar');
        $('.left-side').removeClass('full-screen');
        $('#close-right-side').removeClass('d-none')
        $('#open-right-side').addClass('d-none')
    })
});

function SideBarStatus() {
    const closedSideBar = localStorage.getItem('closeSideBar');
    if (closedSideBar) {
        $('#sidebar').addClass('sidebar');
        $('.left-edge-hover').addClass('sidebar');
        $('.left-side').addClass('full-screen');
        $('#open-right-side').removeClass('d-none')
        $('#close-right-side').addClass('d-none')
    }
}

openRightSide.addEventListener("click", function () {
    localStorage.removeItem('closeSideBar');
});

closeRightSide.addEventListener("click", function () {
    localStorage.setItem('closeSideBar', true);
});

closeRightSideMobileBtn.addEventListener("click", function () {
    rightSide.classList.remove("showSideNav");
    rightSide.classList.remove("sidebar");
    showRightSideMobileBtn.classList.remove("d-none");
    this.classList.add("d-none");
});

showRightSideMobileBtn.addEventListener("click", function () {
    rightSide.classList.add("showSideNav");
    this.classList.add("d-none");
    rightSide.classList.remove("sidebar");
    closeRightSideMobileBtn.classList.remove("d-none");
});

SideBarStatus();

document.addEventListener("DOMContentLoaded", function () {
    let hideTimeout;

    function hideButtons() {
        hideTimeout = setTimeout(() => {
            showRightSideMobileBtn.classList.add("hidden-btn");
        }, 1000);
    }


    function showButtons() {
        clearTimeout(hideTimeout);
        showRightSideMobileBtn.classList.remove("hidden-btn");
        hideButtons();
    }

    document.addEventListener("mouseover", showButtons);
    rightSideContent.addEventListener("scroll", showButtons);

    hideButtons();


    const episodeList = document.querySelector(".episodes-list");

    if (episodeList) {
        const checkScrollFades = () => {
            const scrollTop = episodeList.scrollTop;
            const scrollHeight = episodeList.scrollHeight;
            const clientHeight = episodeList.clientHeight;

            const atTop = scrollTop === 0;
            const atBottom = scrollTop + clientHeight >= scrollHeight;

            if (atTop) {
                episodeList.classList.remove("fade-in-top");
            } else {
                episodeList.classList.add("fade-in-top");
            }

            if (atBottom) {
                episodeList.classList.remove("fade-in-bottom");
            } else {
                episodeList.classList.add("fade-in-bottom");
            }
        };

        episodeList.addEventListener("scroll", checkScrollFades);

        checkScrollFades();
    }

}); 