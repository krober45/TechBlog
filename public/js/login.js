const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#userName').value.trim();
    //const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password').value.trim();
  
    if (username && password) {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        console.log('Response Okay');
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    }
    };

  document
  .querySelector('#loginForm')
  .addEventListener('submit', loginFormHandler);