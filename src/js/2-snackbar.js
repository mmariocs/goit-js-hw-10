import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const delayInput = document.querySelector('.delay-input');
const createBtn = document.querySelector('.create-btn');

const toastOptions = {
  title: 'OK',
  titleColor: '#fff',
  titleSize: '16px',
  messageColor: '#fff',
  messageSize: '16px',
  position: 'topRight',
};

createBtn.addEventListener('click', createNotif);

function createNotif(event) {
  event.preventDefault();

  const fulfilled = document.querySelector(
    '.radio-input[value="fulfilled"]:checked'
  );

  const promise = new Promise((resolve, reject) => {
    const delay = delayInput.value || 0;

    setTimeout(() => {
      if (fulfilled) {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
      iziToast.success({
        ...toastOptions,
        message: `Fulfilled promise in ${delay}ms`,
        backgroundColor: '#59a10d',
      });
    })
    .catch(delay => {
      iziToast.error({
        ...toastOptions,
        message: `Rejected promise in ${delay}ms`,
        backgroundColor: '#ef4040',
      });
    });
}