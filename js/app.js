// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navList = document.getElementById('navList');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navList.classList.toggle('active');
  });

  // Close menu when link is clicked
  navList.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navList.classList.remove('active');
    });
  });
}

// close menu when click out of menu
document.addEventListener('click', (event) => {
  const isMenuOpen = navList.classList.contains('active');

  const isClickInsideMenu = navList.contains(event.target);
  const isClickOnBurger = menuToggle.contains(event.target);

  if (isMenuOpen && !isClickInsideMenu && !isClickOnBurger) {
    menuToggle.classList.remove('active');
    navList.classList.remove('active');
  }
});

const track = document.querySelector('.slider__track');
const slides = document.querySelectorAll('.slider__track img');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

let index = 1;

function getSliderDimensions() {
  const viewportWidth = document.querySelector('.slider__viewport').clientWidth;
  const slideImg = document.querySelector('.slider__track img');
  const slideFullWidth = slideImg.offsetWidth + 20;

  return { viewportWidth, slideFullWidth };
}

function getTransformValue() {
  const { viewportWidth, slideFullWidth } = getSliderDimensions();
  const offset = (viewportWidth - slideFullWidth) / 2;
  return -(index * slideFullWidth - offset);
}

// Initial setup
let { viewportWidth, slideFullWidth } = getSliderDimensions();
track.style.transform = `translateX(${getTransformValue()}px)`;
updateActive();

function move() {
  track.style.transition = '0.4s ease';
  track.style.transform = `translateX(${getTransformValue()}px)`;
  updateActive();
}

nextBtn.onclick = () => {
  if (index >= slides.length - 1) return;
  index++;
  move();
};

prevBtn.onclick = () => {
  if (index <= 0) return;
  index--;
  move();
};

track.addEventListener('transitionend', () => {
  if (slides[index].classList.contains('clone')) {
    track.style.transition = 'none';
    if (index === slides.length - 1) index = 1;
    if (index === 0) index = slides.length - 2;
    track.style.transform = `translateX(${getTransformValue()}px)`;
    updateActive();
  }
});

function updateActive() {
  slides.forEach((s) => s.classList.remove('active'));
  slides[index].classList.add('active');
}

window.addEventListener('resize', () => {
  track.style.transition = 'none';
  track.style.transform = `translateX(${getTransformValue()}px)`;
});

// About Section
const elements = document.querySelectorAll('.about');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  {
    threshold: 0.2,
  },
);

elements.forEach((el) => observer.observe(el));
