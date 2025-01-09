document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.characters');
    items.forEach((item, index) => {
        const delay = index * 250;
        item.style.animationDelay = `${delay}ms`;
        item.classList.add('fade-in');
        console.log(`Item ${index} delay: ${item.style.animationDelay}`);
    });
});