const textInput = document.getElementById('text-input');
const wordCountDisplay = document.getElementById('word-count');
const charCountDisplay = document.getElementById('char-count');

textInput.addEventListener('input', () => {
  const text = textInput.value.trim();
  
  const charCount = text.length;
  
  const words = text.split(/\s+/).filter(word => word.length > 0);
  const wordCount = words.length;

  charCountDisplay.textContent = charCount;
  wordCountDisplay.textContent = wordCount;
});