const password = document.getElementById('password')
const email = document.getElementById('email').value
const password2 = document.getElementById('password2')
const form = document.getElementById('form')
const errorElement = document.getElementById('error')
const pattern = /^[^ ]+@[^ ]+\.[ a-z ]{2,3}$/
form.addEventListener('submit', (e) => {
  let messages = []
  if (password.value.length < 6) {
    messages.push('პაროლი უნდა იყოს მინიმუმ 6 სიმბოლო')
  }
  if (password.value.length >= 20) {
    messages.push('პაროლი არ შეიძლება იყოს 20 სიმბოლოზე მეტი')
  }
  if (password.value !== password2.value) {
    messages.push('პაროლები  არ ემთხვევა')
  }
  if(!email.match(pattern))
  {
    messages.push('ელფოსტა არასწორია')
  }
  if (messages.length > 0) {
    e.preventDefault()
    errorElement.innerText = messages.join(', ')
  }
})