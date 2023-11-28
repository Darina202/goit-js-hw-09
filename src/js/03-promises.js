import { Notify } from 'notiflix/build/notiflix-notify-aio';
const refs = {
  formPromises: document.querySelector('.form'),
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
};

refs.formPromises.addEventListener('submit', function (e) {
  e.preventDefault();
  generatePromises();
  // e.currentTarget.reset(); ???? А чи треба очищувати взагалі форму?
});

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}

function generatePromises(e) {
  let firstDelay = Number(refs.delay.value);
  let inputStep = Number(refs.step.value);
  let amount = Number(refs.amount.value);

  for (let i = 0; i <= amount; i += 1) {
    let currentDelay = firstDelay + inputStep * i;
    createPromise(i + 1, currentDelay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        // console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        // console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}
