//your JS code here. If required.
// Function to set a cookie
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

// Function to get a cookie by name
function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        const [key, value] = cookie.split("=");
        if (key === name) {
            return value;
        }
    }
    return null;
}

// Apply saved preferences from cookies
function applyPreferences() {
    const savedFontSize = getCookie("fontsize");
    const savedFontColor = getCookie("fontcolor");

    if (savedFontSize) {
        document.documentElement.style.setProperty("--fontsize", savedFontSize + "px");
        document.getElementById("fontsize").value = savedFontSize;
    }

    if (savedFontColor) {
        document.documentElement.style.setProperty("--fontcolor", savedFontColor);
        document.getElementById("fontcolor").value = savedFontColor;
    }
}

// Handle form submission
document.getElementById("font-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent page refresh

    const fontSize = document.getElementById("fontsize").value;
    const fontColor = document.getElementById("fontcolor").value;

    // Save values in cookies for 30 days
    setCookie("fontsize", fontSize, 30);
    setCookie("fontcolor", fontColor, 30);

    // Apply changes immediately
    applyPreferences();
});

// Apply preferences on page load
applyPreferences();
