// ===============
// CREATE NEW USER
// ===============

// form is submitted
async function signupFormHandler(event) {
    event.preventDefault();

    // GET the form data from the server
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    // POST the form data to the server after validation
    if (username && email && password) {
        // this is the Promise
        const response = await fetch('/api/users', {
          method: 'post',
          body: JSON.stringify({
            username,
            email,
            password
          }),
          headers: { 'Content-Type': 'application/json' }
        });
        // check the response status
        if (response.ok) {
            console.log('>> SUCCESS. User created. <<');
        } else {
            alert(response.statusText)
        }
      };
    };

// listen for the submit button
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);

// ==========
// USER LOGIN
// ==========

// form is submitted
async function loginFormHandler(event) {
    event.preventDefault();

    // GET the form data from the server
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    // POST the form data to the server after validation
    if (email && password) {
        // this is the Promise
        const response = await fetch('/api/users/login', {
          method: 'post',
          body: JSON.stringify({
            email,
            password
          }),
          headers: { 'Content-Type': 'application/json' }
        });
        // check the response status
        if (response.ok) {
            //console.log('>> SUCCESS. User logged in. <<');
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText)
        }
      };
    };

// listen for the submit button
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);