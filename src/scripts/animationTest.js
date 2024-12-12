export function setupAnimationTest() {
  const breathingText = document.getElementById('breathingText');

  breathingText.addEventListener('animationstart', () => {
    console.log('Animation started');
  });

  breathingText.addEventListener('animationiteration', () => {
    console.log('Animation iteration');
  });

  breathingText.addEventListener('animationend', () => {
    console.log('Animation ended');
  });
}