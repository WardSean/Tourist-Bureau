// This script adds a class to the navigation link of the current page to highlight it
const currentLocation = location.pathname;
const navLinks = document.querySelectorAll('nav a');
for (const link of navLinks) {
  if (link.href.includes(currentLocation)) {
    link.classList.add('active');
    break;
  }
}
