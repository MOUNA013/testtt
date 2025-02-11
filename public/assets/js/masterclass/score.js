document.addEventListener("DOMContentLoaded", function () {
    
    const episodeId = document.getElementById("episodeId&").value;

    let totalScore;
    let score;

    function storeScore() {
        const formattedScore = `${score}/${totalScore}`;
        console.log("Formatted Score:", formattedScore);

        fetch(`/student-ressources/store-score-episode/${episodeId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": document.querySelector(
                    'meta[name="csrf-token"]'
                ).content,
            },
            body: JSON.stringify({ score: formattedScore }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", formattedScore);
                // document.getElementById("quizForm").submit();
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    let isMaxScoreChecked = false;

    function checkForMaxScore() {
        const maxScoreElement = document.querySelector(
            ".h5p-joubelui-score-max"
        );
        if (maxScoreElement && !isMaxScoreChecked) {
            totalScore = parseInt(maxScoreElement.textContent.trim()) || 0;
            console.log("Total Score:", totalScore);
            isMaxScoreChecked = true;
            return true;
        }
        return false;
    }

    function waitForScoreContainer(callback) {
        const observer = new MutationObserver((mutations, obs) => {
            const scoreContainer = document.querySelector(
                ".h5p-container:not(.h5p-interactive-video)"
            );
            if (scoreContainer) {
                obs.disconnect();
                callback(scoreContainer);
            }
        });
    
        observer.observe(document.body, { childList: true, subtree: true });
    }
    
    waitForScoreContainer((scoreContainer) => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === "childList" || mutation.type === "subtree") {
                    checkForMaxScore();
    
                    const scoreElement = document.querySelector(
                        ".h5p-joubelui-score-number-counter"
                    );
                    if (scoreElement) {
                        const updatedScoreText = scoreElement.textContent.trim();
                        const newScore = parseInt(updatedScoreText) || 0;
    
                        if (newScore !== score) {
                            score = newScore;
                            console.log("Current Score:", score);
                            if (totalScore > 0) {
                                storeScore();
                                console.log("first")
                            }
                        }
                    }
                }
            });
        });
    
        observer.observe(scoreContainer, {
            childList: true,
            subtree: true,
        });
    });
    
    


    function extractInteractiveVideoScores() {
        const scoreRows = document.querySelectorAll(
            ".h5p-interactive-video-endscreen-overview-table-row"
        );

        totalScore = 0;
        score = 0;

        scoreRows.forEach((row) => {
            const scoreText = row
                .querySelector(
                    ".h5p-interactive-video-endscreen-overview-table-row-score"
                )
                .textContent.trim();
            const [points, maxPoints] = scoreText.split("/").map(Number);
            if (!isNaN(points) && !isNaN(maxPoints)) {
                score += points;
                totalScore += maxPoints;
            }
        });

        console.log("Interactive Video Scored Points:", score);
        console.log("Interactive Video Total Score:", totalScore);
    }

    const interactiveVideoContainer = document.querySelector(
        ".h5p-interactive-video"
    );

    if (interactiveVideoContainer) {
        const videoObserver = new MutationObserver(() => {
            const submitButton = document.querySelector(
                ".h5p-interactive-video-endscreen-submit-button"
            );
            if (submitButton) {
                submitButton.addEventListener("click", () => {
                    extractInteractiveVideoScores();
                    if (totalScore > 0) {
                        storeScore();
                    }
                });
                console.log("Submit button detected and event listener added.");
                videoObserver.disconnect();
            }
        });

        videoObserver.observe(interactiveVideoContainer, {
            childList: true,
            subtree: true,
        });
    }
});

