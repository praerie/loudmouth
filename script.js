const textInput = document.getElementById('text-input');
const wordCountDisplay = document.getElementById('word-count');
const charCountDisplay = document.getElementById('char-count');

function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

textInput.addEventListener(
    'input',
    debounce(() => {
        const text = textInput.value;

        const charCount = text.length;

        const words = text.trim().split(/\s+/).filter(word => word.length > 0);
        const wordCount = words.length;

        charCountDisplay.textContent = charCount;
        wordCountDisplay.textContent = wordCount;
    }, 200)
);

let currentThemeIndex = 0;

document.getElementById('theme-toggle').addEventListener('click', () => {
    if (!themes || themes.length === 0) return;

    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    applyTheme(themes[currentThemeIndex]);
});

document.addEventListener('DOMContentLoaded', () => {
    if (themes && themes.length > 0) {
        applyTheme(themes[currentThemeIndex]);
    }
});

function applyTheme(theme) {
    document.body.style.backgroundColor = theme.backgroundColor;

    const boxContainer = document.querySelector('.textbox-container');
    if (boxContainer) {
        boxContainer.style.backgroundColor = theme.containerColor;
        boxContainer.style.boxShadow = `0 0.5rem 0.5rem 0.5rem ${theme.shadowColor}`;
    }

    const title = document.querySelector('h1');
    if (title) {
        title.style.color = theme.titleColor;
        title.style.textShadow = `0.2rem 0.2rem 0.2rem ${theme.shadowColor}`;
    }

    const subtitle = document.querySelector('h2');
    if (subtitle) {
        subtitle.style.color = theme.subtitleColor;
    }

    const stats = document.querySelectorAll('.stats p');
    stats.forEach(stat => {
        stat.style.color = theme.statsTextColor;
    });

    const hoverText = document.querySelector('.hover-text'); 
    if (hoverText) {
        hoverText.style.color = theme.statsTextColor;
    }

    const textarea = document.querySelector('textarea');
    if (textarea) {
        textarea.style.border = `0.5rem solid ${theme.borderColor}`;
        textarea.style.boxShadow = `0 0.2rem 0.2rem 0.2rem ${theme.shadowColor}`;
    }
}

const textMap = {
    help: "a simple word and character counter — type or paste your text below",
    undo: "undo",
    redo: "redo",
    clear: "get rid of it all",
    save: "save as a .txt file on your device"
};

function setupHoverEffect(buttonId) {
    const button = document.getElementById(buttonId);
    const hoverText = document.getElementById("hover-text");

    button.addEventListener("mouseover", () => {
        hoverText.textContent = textMap[buttonId];
        hoverText.style.display = "block";
    });

    button.addEventListener("mouseout", () => {
        hoverText.style.display = "none";
    });
}

setupHoverEffect("help");
setupHoverEffect("undo");
setupHoverEffect("redo");
setupHoverEffect("clear");
setupHoverEffect("save");
