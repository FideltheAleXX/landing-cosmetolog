const track = document.querySelector('.slider__track');
const slides = document.querySelectorAll('.slider__track img');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

let index = 1;
const viewportWidth = 600;
const slideFullWidth = 330 + 20; // ширина + margin (10+10)

// Функция для вычисления сдвига, чтобы слайд был ПО ЦЕНТРУ
function getTransformValue() {
  const offset = (viewportWidth - slideFullWidth) / 2;
  return -(index * slideFullWidth - offset);
}

// Инициализация
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
