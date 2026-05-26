function celebrate() {
    confetti({
        particleCount: 180,
        spread: 100,
        origin: { y: 0.6 }
    });

    setTimeout(() => {
        confetti({
            particleCount: 80,
            angle: 60,
            spread: 60,
            origin: { x: 0 }
        });

        confetti({
            particleCount: 80,
            angle: 120,
            spread: 60,
            origin: { x: 1 }
        });
    }, 250);
}

function setupSubmissionWatcher() {

    let recentlyClickedSubmit = false;

    document.addEventListener("click", (event) => {

        const button = event.target.closest("button, input[type='submit']");

        if (!button) return;

        const text = (button.innerText || button.value || "").toLowerCase();

        if (text.includes("submit") || text.includes("turn in")) {
            recentlyClickedSubmit = true;

            setTimeout(() => {
                recentlyClickedSubmit = false;
            }, 10000);
        }
    });

    const observer = new MutationObserver(() => {

        if (!recentlyClickedSubmit) return;

        const alerts = document.querySelectorAll(
            ".alert, .messages, .notification, [role='alert'], .status, .success"
        );

        for (let el of alerts) {
            const text = el.innerText.toLowerCase();

            if (
                text.includes("submitted") ||
                text.includes("success") ||
                text.includes("complete")
            ) {
                recentlyClickedSubmit = false;
                celebrate();
                break;
            }
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

setupSubmissionWatcher();