export function fadeLastCharacters(text: string): string {
  if (text.length <= 50) {
    return applyFade(text);
  }

  const mainText = text.slice(0, -50);
  const fadeText = text.slice(-50);

  return mainText + applyFade(fadeText);
}

function applyFade(text: string): string {
  return text.split('').map((char, index) => {
    const opacity = 1 - (index * 0.02);
    return `<span style="opacity: ${Math.max(opacity, 0)}">${char}</span>`;
  }).join('');
}