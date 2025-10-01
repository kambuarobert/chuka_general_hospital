(() => {
const signupLink = document.getElementById('signup-link')
if(auth){
welcome.textContent = auth.name + ' — access your records and book services quickly.'
loginLink.style.display = 'none'
signupLink.style.display = 'none'
} else {
welcome.textContent = 'Please log in to access your patient portal.'
loginLink.style.display = 'inline-block'
signupLink.style.display = 'inline-block'
}
}
renderUser()
const logoutBtn = document.getElementById('logout-btn')
logoutBtn.addEventListener('click', () => {localStorage.removeItem('citycare-auth');renderUser();location.hash='home'})
const ambulanceForm = document.getElementById('ambulance-form')
ambulanceForm.addEventListener('submit', e => {
e.preventDefault()
const fd = new FormData(ambulanceForm)
const payload = {
name:fd.get('name'),
phone:fd.get('phone'),
pickup:fd.get('pickup'),
destination:fd.get('destination'),
condition:fd.get('condition'),
notes:fd.get('notes'),
requestedAt:new Date().toISOString()
}
const status = document.getElementById('ambulance-status')
const queue = JSON.parse(localStorage.getItem('ambulance-queue')||'[]')
queue.push(payload)
localStorage.setItem('ambulance-queue', JSON.stringify(queue))
status.textContent = 'Ambulance requested. Our dispatch team will contact you shortly.'
ambulanceForm.reset()
})
const quickBtn = document.getElementById('emergency-quick')
quickBtn.addEventListener('click', () => {
if(confirm('This will immediately send an urgent ambulance request with minimal details. Continue?')){
const auth = JSON.parse(localStorage.getItem('citycare-auth')||'null')
const payload = {name:auth?auth.name:'Urgent caller',phone:'Not provided',pickup:'Caller location',destination:'Nearest hospital',condition:'Critical',notes:'Quick emergency request',requestedAt:new Date().toISOString()}
const queue = JSON.parse(localStorage.getItem('ambulance-queue')||'[]')
queue.unshift(payload)
localStorage.setItem('ambulance-queue', JSON.stringify(queue))
document.getElementById('ambulance-status').textContent='Urgent ambulance dispatched. Stay on the line with emergency services.'
}
})
const contactForm = document.getElementById('contact-form')
contactForm.addEventListener('submit', e => {
e.preventDefault()
const fd = new FormData(contactForm)
const messages = JSON.parse(localStorage.getItem('contact-messages')||'[]')
messages.push({name:fd.get('name'),email:fd.get('email'),message:fd.get('message'),sentAt:new Date().toISOString()})
localStorage.setItem('contact-messages', JSON.stringify(messages))
document.getElementById('contact-form').reset()
alert('Thanks. Your message was sent to patient services.')
})
if(location.hash === '' ) location.hash = 'home'
})()