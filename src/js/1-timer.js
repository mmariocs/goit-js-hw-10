import flatpickr from 'flatpickr'
import 'flatpickr/dist/flatpickr.min.css'

import iziToast from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'

const datetimePicker = document.querySelector('#datetime-picker')
const startBtn = document.querySelector('.start-btn')
const daysElement = document.querySelector('.value[data-days]')
const hoursElement = document.querySelector('.value[data-hours]')
const minutesElement = document.querySelector('.value[data-minutes]')
const secondsElement = document.querySelector('.value[data-seconds]')

let userSelectedDate = null
let timerInterval = null

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    handleDateSelection(selectedDates)
  },
}

flatpickr('#datetime-picker', options)

startBtn.addEventListener('click', startTimer)

function handleDateSelection(selectedDates) {
  userSelectedDate = selectedDates[0]
  const currentDate = Date.now()

  if (userSelectedDate <= currentDate) {
    showErrorToast('Please choose a date in the future')
    disableStartButton()
  } else {
    enableStartButton()
    iziToast.destroy()
  }
}

function showErrorToast(message) {
  iziToast.error({
    title: 'Error',
    titleColor: '#fff',
    titleSize: '16px',
    message: message,
    messageColor: '#fff',
    messageSize: '16px',
    backgroundColor: '#ef4040',
    position: 'topRight',
  })
}

function startTimer() {
  disableControls()

  timerInterval = setInterval(updateCountdown, 1000)
}

function updateCountdown() {
  const currentDate = Date.now()
  const timeDiff = userSelectedDate - currentDate

  if (timeDiff <= 0) {
    stopTimer()
    enableControls()
    return
  }

  const { days, hours, minutes, seconds } = convertMs(timeDiff)

  updateTime(days, hours, minutes, seconds)
}

function stopTimer() {
  clearInterval(timerInterval)
}

function convertMs(ms) {
  const second = 1000
  const minute = second * 60
  const hour = minute * 60
  const day = hour * 24

  const days = Math.floor(ms / day)
  const hours = Math.floor((ms % day) / hour)
  const minutes = Math.floor(((ms % day) % hour) / minute)
  const seconds = Math.floor((((ms % day) % hour) % minute) / second)

  return { days, hours, minutes, seconds }
}

function updateTime(days, hours, minutes, seconds) {
  daysElement.textContent = addLeadingZero(days)
  hoursElement.textContent = addLeadingZero(hours)
  minutesElement.textContent = addLeadingZero(minutes)
  secondsElement.textContent = addLeadingZero(seconds)
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0')
}

function disableControls() {
  datetimePicker.disabled = true
  startBtn.disabled = true
}

function enableControls() {
  datetimePicker.disabled = false
  startBtn.disabled = false
}

function disableStartButton() {
  startBtn.disabled = true
}

function enableStartButton() {
  startBtn.disabled = false
}