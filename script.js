function isValidDate(date) {
  return date instanceof Date && !isNaN(date);
}

function validateDateInput(year, month, day) {
  const date = new Date(year, month - 1, day);

  console.log(month);
  console.log(date.getMonth());
  if (isValidDate(date) && date.getMonth() + 1 == month) {
    return date;
  }

  return null;
}

function animateNumbers(id, start, end, duration) {
  if (start === end) return;
  let range = start - end;
  let current = start;
  let increment = end > start ? 1 : -1;
  let stepTime = Math.abs(Math.floor(duration / range));
  let element = document.getElementById(id);
  let timer = setInterval(function () {
    current += increment;
    element.innerHTML = current;
    if (current == end) {
      clearInterval(timer);
    }
  }, stepTime);
}

const dayInput = document.getElementById('day');

dayInput.addEventListener('invalid', (e) => {
  e.preventDefault();
  if (dayInput.value == '') {
    document.querySelector(`.day-error`).innerHTML = 'This field is required';
  } else {
    document.querySelector(`.day-error`).innerHTML = 'Must be a valid day';
  }
  document.querySelector(`.day-error`).style.display = 'block';
});

dayInput.addEventListener('input', () => {
  if (dayInput.validity.valid) {
    document.querySelector(`.day-error`).style.display = 'none';
  }
});

const monthInput = document.getElementById('month');

monthInput.addEventListener('invalid', (e) => {
  e.preventDefault();
  if (monthInput.value == '') {
    document.querySelector(`.month-error`).innerHTML = 'This field is required';
  } else {
    document.querySelector(`.month-error`).innerHTML = 'Must be a vaild month';
  }
  document.querySelector(`.month-error`).style.display = 'block';
});

monthInput.addEventListener('input', () => {
  if (monthInput.validity.valid) {
    document.querySelector(`.month-error`).style.display = 'none';
  }
});

const yearInput = document.getElementById('year');
yearInput.max = new Date().getFullYear();

yearInput.addEventListener('invalid', (e) => {
  e.preventDefault();
  if (yearInput.value == '') {
    document.querySelector(`.year-error`).innerHTML = 'This field is required';
  } else {
    document.querySelector(`.year-error`).innerHTML = 'Must be a vaild year';
  }
  document.querySelector(`.year-error`).style.display = 'block';
});

yearInput.addEventListener('input', () => {
  if (yearInput.validity.valid) {
    document.querySelector(`.year-error`).style.display = 'none';
  }
});

let dateForm = document.getElementById('dateForm');

dateForm.addEventListener('submit', (e) => {
  e.preventDefault();

  let day = document.getElementById('day').value;
  let month = document.getElementById('month').value;
  let year = document.getElementById('year').value;

  const date = validateDateInput(year, month, day);
  if (
    !date &&
    dayInput.validity.valid &&
    monthInput.validity.valid &&
    yearInput.validity.valid
  ) {
    document.querySelector('.date-error').innerHTML = 'Must be a vaild date';
    document.querySelector('.date-error').style.display = 'block';
    return false;
  }

  const today = new Date();

  let diff = today - date;
  let seconds = Math.floor(diff / 1000),
    minutes = Math.floor(seconds / 60),
    hours = Math.floor(minutes / 60),
    days = Math.floor(hours / 24),
    months = Math.floor(days / 30),
    years = Math.floor(days / 365);

  days %= 30;
  months %= 12;

  animateNumbers('yearsDiff', 0, years, 1000);
  animateNumbers('monthsDiff', 0, months, 1000);
  animateNumbers('daysDiff', 0, days, 1000);
});
