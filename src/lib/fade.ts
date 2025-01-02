export function fadeLastCharacters(text: string): string {
  if (!text) return '';

     // Remove trailing ellipsis and trim whitespace
     text = text.replace(/\.{3,}$/, '').trim();
     
  if (text.length <= 500) {
    return applyFade(text);
  }



  const mainText = text.slice(100, -10);
  const fadeText = text.slice(-20);

  return mainText + applyFade(fadeText);
}

function applyFade(text: string): string {
  return text.split('').map((char, index) => {
    const opacity = 1 - (index * 0.02);
    return `<span style="opacity: ${Math.max(opacity, 0)}">${char}</span>`;
  }).join('');
}
 