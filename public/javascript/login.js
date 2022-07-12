// form is submitted
function signupFormHandler(event) {
    event.preventDefault();

    // GET the form data from the server
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    // POST the form data to the server after validation
    if (username && email && password) {
        fetch('/api/users', {
          method: 'post',
          body: JSON.stringify({
            username,
            email,
            password
          }),
          headers: { 'Content-Type': 'application/json' }
        }).then((response) => {console.log(response)})
      }
    }

// listen for the submit button
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);