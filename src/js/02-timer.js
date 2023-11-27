import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  chooseData: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.startBtn.disabled = true;
let selectedDate;
let timerId;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < options.defaultDate) {
      Notify.failure('Please choose a date in the future');
      // window.alert('Please choose a date in the future');
      return;
    } else {
      refs.startBtn.disabled = false;
    }

    selectedDate = selectedDates[0].getTime();
    // updateTime(selectedDate);
    // leastTime1 = selectedDate - options.defaultDate;
    // leastTime = convertMs(selectedDate - options.defaultDate);
    // refs.days.textContent = addLeadingZero(leastTime.days);
    // refs.hours.textContent = addLeadingZero(leastTime.hours);
    // refs.minutes.textContent = addLeadingZero(leastTime.minutes);
    // refs.seconds.textContent = addLeadingZero(leastTime.seconds);
    // console.log(leastTime);
    // console.log(leastTime1);
    // return leastTime1;
  },
};
flatpickr(refs.chooseData, options);

// function updateTime(selectedDate) {
//   const leastTime = convertMs(selectedDate - options.defaultDate);
//   refs.days.textContent = addLeadingZero(leastTime.days);
//   refs.hours.textContent = addLeadingZero(leastTime.hours);
//   refs.minutes.textContent = addLeadingZero(leastTime.minutes);
//   refs.seconds.textContent = addLeadingZero(leastTime.seconds);
//   console.log(leastTime);
// }

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function updateTimer() {
  refs.startBtn.disabled = true;
  const currentDate = new Date().getTime();
  const timeDifference = selectedDate - currentDate;
  if (timeDifference <= 0) {
    clearInterval(timerId);
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(timeDifference);

  // const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  // const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  // const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  // const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  refs.days.textContent = addLeadingZero(`${days}`);
  refs.hours.textContent = addLeadingZero(`${hours}`);
  refs.minutes.textContent = addLeadingZero(`${minutes}`);
  refs.seconds.textContent = addLeadingZero(`${seconds}`);
}

refs.startBtn.addEventListener('click', () => {
  timerId = setInterval(updateTimer, 1000);
});
