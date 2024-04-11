
// first initialize frist doctor data as a json object 
const myGetRequest = new Request('http://localhost:3000/doctors');

// function that will used as the callback function in the eventlistener or the the onclickevent listener function
function booked(event) {
  event.target.style.background="tomato";
   event.target.style.color="white";
  event.target.textContent="BOOKED";
  
  }

  function cancel(event) {
    event.target.style.background="purple";
    event.target.style.color="black";
    event.target.style.texttype="italic";
    event.target.textContent="CANCELLED";
    

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
  <p>Hospital: ${doctor.hospital}</p> <div> 
  <button id="Book"onclick="booked(event)">Bookappointment</button> <button id='Cancel'onclick="cancel(event)"> Cancel Appointment</button> </div>
  <br> `;
console.log(div);
// i used the onlick evenlistener (onclick)
// the newly created li element will be added to the ul element with id "#doctorr" as the child element
document.getElementById('doctorr').appendChild(div);
const BOOK=document.querySelector('#Book');
const CANCEL=document.querySelector('#Cancel');






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

