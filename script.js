document.addEventListener('DOMContentLoaded', () => {

    // 1. SAFE MOTION REVEAL (Reset V2)
    // Only target specific "cards" and headers for a clean effect.
    // Avoid targeting large sections to prevent layout bugs.

    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const motionTargets = document.querySelectorAll('.vsl-container, .stat-card, .science-item, .module-item, .testimonial-card, .bonus-card, .pricing-card, section h2, .guarantee-box');

        const motionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    target.classList.add('motion-visible');
                    observer.unobserve(target);
                }
            });
        }, {
            threshold: 0.1, // Trigger when 10% visible
            rootMargin: "0px 0px -50px 0px" // Slight offset
        });

        motionTargets.forEach(el => {
            el.classList.add('motion-hidden'); // Hide only when JS is ready
            motionObserver.observe(el);
        });
    }

    // 2. SMOOTH SCROLL
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. FAQ LOGIC (If using details/summary, native behavior works, 
    // but we can add an exclusive accordion effect if desired)
    const details = document.querySelectorAll("details");
    details.forEach((targetDetail) => {
        targetDetail.addEventListener("click", () => {
            details.forEach((detail) => {
                if (detail !== targetDetail) {
                    detail.removeAttribute("open");
                }
            });
        });
    });

    // 4. COUNTDOWN TIMER (PERSUASION)
    const countdownEl = document.getElementById('countdown');
    if (countdownEl) {
        let timeInSeconds = 15 * 60; // 15 Minutes

        function updateTimer() {
            const minutes = Math.floor(timeInSeconds / 60);
            const seconds = timeInSeconds % 60;

            // Format 00:00
            const displayMin = minutes < 10 ? '0' + minutes : minutes;
            const displaySec = seconds < 10 ? '0' + seconds : seconds;

            countdownEl.innerHTML = `<span>00</span>:<span>${displayMin}</span>:<span>${displaySec}</span>`;

            if (timeInSeconds > 0) {
                timeInSeconds--;
            } else {
                // Determine what happens when time is up. 
                // For now, let's just reset or stay at 00:00:00
                timeInSeconds = 0;
            }
        }

        setInterval(updateTimer, 1000);
        updateTimer(); // Initial call
    }



    // 6. VIMEO PLAYER CONTROLLER
    const vslIframe = document.getElementById('vsl-player');
    const vslOverlay = document.getElementById('vsl-overlay');

    if (vslIframe && vslOverlay && window.Vimeo) {
        const player = new Vimeo.Player(vslIframe);

        // Ensure it's playing nicely on load (muted)
        player.setVolume(0);
        player.play().catch(error => {
            console.log("Autoplay blocked, waiting for interaction");
        });

        vslOverlay.addEventListener('click', () => {
            // 1. Unmute
            player.setVolume(1);

            // 2. Restart from 0:00
            player.setCurrentTime(0);

            // 3. Ensure playing
            player.play();

            // 4. Hide Overlay
            vslOverlay.style.display = 'none';
        });
    }

});
