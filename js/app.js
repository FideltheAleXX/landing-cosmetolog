const track = document.querySelector('.slider__track');
const slides = document.querySelectorAll('.slider__track img');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

let index = 1;
const viewportWidth = 600;
const slideFullWidth = 330 + 20;

function getTransformValue() {
  const offset = (viewportWidth - slideFullWidth) / 2;
  return -(index * slideFullWidth - offset);
}

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
