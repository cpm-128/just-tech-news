async function logout() {
    const response = await fetch('/api/users/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        // go to homepage immediately after logout
        document.location.replace('/');
    } else {
        alert(response.statusText);
    };
};

document.querySelector('#logout').addEventListener('click', logout);