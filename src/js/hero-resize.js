document.addEventListener('DOMContentLoaded', () => {
  const heroCard = document.querySelector('.hero-card');
  
  if (!heroCard) return;
  
  const headline = heroCard.querySelector('h1');
  
  if (!headline) return;
  
  const observer = new ResizeObserver(entries => {
    for (let entry of entries) {
      const containerWidth = entry.contentRect.width;
      const calculated = containerWidth / 10;
      const clamped = Math.min(Math.max(28, calculated), 72);
      headline.style.fontSize = `${clamped}px`;
    }
  });
  
  observer.observe(heroCard);

  window.addEventListener('unload', () => observer.disconnect(), { once: true });
});

