
// first initialize frist doctor data as a json object 
const myGetRequest = new Request('http://localhost:3000/doctors');

function bookAppointment(doctorId, appointmentTime) {
  const myPostRequest = new Request(`http://localhost:3000/doctors/${doctorId}/appointments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ appointmentTime })
  });

  fetch(myPostRequest)
    .then(response => response.json())
    .then(appointment => {
      console.log(`Appointment booked: ${appointment.time}`);
      // Update the UI to reflect the new appointment
    })
    .catch(error => console.error(error));
}
function cancelAppointment(doctorId, appointmentId) {
  const myDeleteRequest = new Request(`http://localhost:3000/doctors/${doctorId}/appointments/${appointmentId}`, {
    method: 'DELETE'
  });

  fetch(myDeleteRequest)
    .then(response => response.json())
    .then(appointment => {
      console.log(`Appointment cancelled: ${appointment.time}`);
      // Update the UI to reflect the cancelled appointment
    })
    .catch(error => console.error(error));
}


// function that will used as the callback function in the eventlistener or the the onclickevent listener function
function booked(event) {
  event.target.style.background="tomato";
   event.target.style.color="white";
  event.target.textContent="BOOKED";
  // Get the doctor's ID from the parent element
  const doctorId = event.target.closest('li').id;

  // Get the current date and time and format it as a string
  const now = new Date();
  const appointmentTime = now.toISOString();

  // Book the appointment
  bookAppointment(doctorId, appointmentTime);
  }

  function cancel(event) {
    event.target.style.background="purple";
    event.target.style.color="black";
    event.target.style.texttype="italic";
    event.target.textContent="CANCELLED";
    // Get the doctor's ID and appointment ID from the parent element
  const doctorId = event.target.closest('li').id;
  const appointmentId = event.target.dataset.appointmentId;

  // Cancel the appointment
  cancelAppointment(doctorId, appointmentId);

  }
  
  
  


function oneDoctor(doctor) {
const div = document.createElement('li');

div.innerHTML =  `

<div >
<img src="${doctor.image}" alt="Doctor Image" height=600px width=480>
<h4 id="card-title">${doctor.name}</h4> 
 <p id=speciality>Speciality: ${doctor.specialty}</p>
  <p>Age: ${doctor.age}</p> <p>license number:${doctor.medicallicensenumber}</p><br/> 
  <p>Billing: ${doctor.Billing}</p>
  <p>contact: ${doctor.email}</p>
   <p>Location: ${doctor.county}</p> 
  <p>Hospital: ${doctor.hospital}</p> <div> <button id="Book"onclick="booked(event)">Bookappointment</button> <button id='Cancel'onclick="cancel(event)"> Cancel Appointment</button> </div> <br> `;
console.log(div);

// the newly created li element will be added to the ul element with id "#doctorr" as the child element
document.getElementById('doctorr').appendChild(div);
const BOOK=document.querySelector('#Book');
const CANCEL=document.querySelector('#Cancel');
//BOOK.addEventListener('click', booked);





}

function allDoctors() {
fetch(myGetRequest)
.then(response => response.json())
.then(docdata => docdata.forEach(doctor => oneDoctor(doctor)))
.catch(error => console.error(error));
}
function initialize() {
allDoctors();
}
initialize();

