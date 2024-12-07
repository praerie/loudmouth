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

    const boxContainer = document.querySelector('.box-container');
    if (boxContainer) {
        boxContainer.style.backgroundColor = theme.containerColor;
        boxContainer.style.boxShadow = `0 0.5rem 0.5rem 0.5rem ${theme.shadowColor}`;
    }

    const statsContainer = document.querySelector('.stats-container');
    if (statsContainer) {
        statsContainer.style.backgroundColor = theme.statsContainerColor || theme.containerColor;
    }

    const title = document.querySelector('h1');
    if (title) {
        title.style.color = theme.titleColor;
        title.style.textShadow = `0.2rem 0.2rem 0.2rem ${theme.titleShadowColor}`;
    }

    const subtitle = document.querySelector('h2');
    if (subtitle) {
        subtitle.style.color = theme.subtitleColor;
        subtitle.style.textShadow = `0.02rem 0.02rem 0.2rem ${theme.subtitleShadowColor}`;
    }

    const stats = document.querySelectorAll('.stats p');
    stats.forEach(stat => {
        stat.style.color = theme.statsColor;
        stat.style.textShadow = `0.01rem 0.01rem 0.2rem ${theme.statsShadowColor}`;
    });

    const textarea = document.querySelector('textarea');
    if (textarea) {
        textarea.style.backgroundColor = theme.textareaBackgroundColor;
        textarea.style.color = theme.textareaTextColor;
        textarea.style.borderColor = theme.textareaBorderColor;
        textarea.style.boxShadow = `0 0.2rem 0.2rem 0.2rem ${theme.textareaShadowColor}`;
    }
}
