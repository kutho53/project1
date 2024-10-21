const submitEl = document.querySelector('#submit');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const submissionResponseEl = document.querySelector('#response');

// Action to be performed on click store in named function
function showResponse(event) {
  // Prevent default action
  event.preventDefault();
   // Store the name and email in local storage
   localStorage.setItem('name', nameInput.value);
   localStorage.setItem('email', emailInput.value);
  console.log(event);
  const response =
    'Thank you  ' +
    nameInput.value +
    '! We will be sending deals to you at ' +
    emailInput.value +
    '.';
  submissionResponseEl.textContent = response;
}

// Add listener to submit element
submitEl.addEventListener('click', showResponse);

