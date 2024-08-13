document.addEventListener('DOMContentLoaded', function () {
  const cardButtons = document.querySelectorAll('.container .btn');
  const bookButtons = document.querySelectorAll('.myModal');
  const modal = document.getElementById('modal-for-form');
  const mainElement = document.getElementById('menuDisplay');
  const targetDivs = document.querySelectorAll('.targetElement');
  let selectedTour = '';
  let isNameValid;
  let isEmailValid;
  const closeBtn = modal.querySelector('.close');
  const userFullName = document.getElementById('fullName');
  const emailAdd = document.getElementById('emailAddress');
  const confirmModal = document.getElementById('confirmation-Modal');
  const form = document.getElementById('form');
  const formInputData = document.getElementById('form-data-container');

  for (const btn of cardButtons) {
      btn.addEventListener('click', function () {
          selectedTour = btn.getAttribute('data-button');
          mainElement.innerHTML = '';

          for (const div of targetDivs) {
              if (div.classList.contains(selectedTour + '-box')) {  //if the div corresponds to the data.set attribute of clicked button...
                  if (div.classList.contains('hidden')) { //kung may class siyang 'hidden', 
                      div.classList.remove('hidden'); // remove the class 'hidden. to display the div 
                  } else {
                      div.classList.add('hidden'); // to hide the corresponding div
                  }
              } else {
                  div.classList.add('hidden');
              }
          }
      });
  }

  for (const bookBtn of bookButtons) {  //all 'book now' buttons
      bookBtn.addEventListener('click', function () {
          modal.style.display = 'block';

          function closeModal() {
              modal.style.display = 'none';
              closeBtn.removeEventListener('click', closeModal);
          }

          closeBtn.addEventListener('click', closeModal); // para pag close ng modal, pag click uli ng booknow buton, andun parin yung function ng X.

          userFullName.addEventListener('input', function (event) {
              const validName = event.target.value.trim();
              if (!/^[a-zA-Z\s]+$/.test(validName)) {
                  alert('The name should not contain numbers and special characters');
                  userFullName.value = '';   //mag eempty yung input 
                  isNameValid = false;
              } else {
                  isNameValid = true;
              }
          });

          emailAdd.addEventListener('keyup', function (event) {
              const validEmail = event.target.value.trim();
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (!emailRegex.test(validEmail)) {
                  isEmailValid = false;
              } else {
                  isEmailValid = true;
              }
          });

          const date = document.getElementById('dateOfVisit');
          const tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          const tomorrowISO = tomorrow.toISOString().split('T')[0];
          date.setAttribute('min', tomorrowISO);

          confirmModal.style.display = 'none';

          form.addEventListener('submit', function (event) {
              event.preventDefault();    

              setTimeout(function() {
              if (!(isNameValid && isEmailValid)) {
                  alert("Please enter a valid address where we can contact you.");
              } else {
                  confirmationModal();  //call the function to get all the input value and display to the modal
              }
            }, 2000);    // to delay 2 seconds
          });
      });
  }


  function confirmationModal() {
    formInputData.innerHTML = '';   // para di magpatong mga info / input value everytime the user clicked the button 'submit'
    const collectData = {};
    const inputsData = document.querySelectorAll('input');
    for (const inputData of inputsData) {
        collectData[inputData.name] = inputData.value;    //we use the name as key
    }

   //at this point typeof object na si collectData

    // Append the input values as text to the form container
    for (const key in collectData) {    //The loop iterates over each enumerable property of the object. key === property
        const value = collectData[key];   // collectData[key]  === yung value nung property

        const paragraph = document.createElement('p');
        paragraph.innerHTML = `<strong>${key}:</strong> ${value}`;
        formInputData.appendChild(paragraph);
    }

        
        const dataToQr = JSON.stringify(collectData);    //para maging string

        // Encode the JSON string
        const encodedDataString = encodeURIComponent(dataToQr);  
    
        // Create the QR code URL with the encoded data
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodedDataString}&size=100x100`;
    
        // Create an image element for the QR code
        const qrImage = document.createElement('img');
        qrImage.src = qrUrl;

        formInputData.appendChild(qrImage); 
    
        // Append the QR code image to the form container
    

    // Hide the modal and display the confirmation modal
    modal.style.display = 'none';
    confirmModal.style.display = 'block';

    // Close button event listener
    const closeButton = document.querySelector('#confirmation-Modal .close');
    closeButton.addEventListener('click', function () {
        confirmModal.style.display = 'none';
    });
}

  const printButton = document.querySelector('.print');
  printButton.addEventListener('click', function () {
      window.print();
  });
});




