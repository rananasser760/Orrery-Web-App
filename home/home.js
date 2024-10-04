// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function () {
    // Select the login form and buttons
    const WhoButton = document.querySelector('.who');
    const HelpButton = document.querySelector('.help');
    const TeamButton = document.querySelector('.team');
    const ExploreButton = document.querySelector('.explore_btn'); // Check the class name here

    // Add an event listener for ExploreButton if needed
    if (ExploreButton) {
        ExploreButton.addEventListener('click', function () {
        window.location.href = "../solar_system.html";
    });
    }


  // Function to create stars in a specific container
function createStarsInContainer(containerSelector) {
    const starContainer = document.querySelector(containerSelector + ' .stars');
    if (!starContainer) return; // If the container doesn't exist, return

    for (let i = 0; i < 100; i++) { // Adjust number of stars here
        const star = document.createElement('div');
        star.classList.add('star');

        // Set random position within the container
        const x = Math.random() * 100; // 0 to 100%
        const y = Math.random() * 100; // 0 to 100%
        star.style.left = `${x}vw`;
        star.style.top = `${y}vh`;

        // Add random size and animation
        const size = Math.random() * 3 + 1; // Random size between 1px and 4px
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animation = `twinkle ${Math.random() * 1 + 0.5}s infinite`;

        // Append star to the starContainer
        starContainer.appendChild(star);
    }
}

// Create stars in both .teamm and .footer
createStarsInContainer('.teamm');
createStarsInContainer('.footer');


const subscribeButton = document.getElementsByClassName("subscribe")[0];

            const emailInput = document.getElementsByClassName("email")[0];

            subscribeButton.addEventListener("click", function (event) {
                // Prevent the default form submission
                event.preventDefault();

                const emailValue = emailInput.value.trim();

                if (emailValue) {
                    subscribeButton.innerHTML = "<b>SUBSCRIBED !!</b>";
                    subscribeButton.style.backgroundColor = "orange"; 
                    subscribeButton.style.color = "black"; 
                    subscribeButton.style.border = "1px solid black";
                    alert("You are SUBSCRIBED!! Enjoy with the Newsletter");
                } else {
                    alert("Please enter your email address.");
                }
            });



});
