const addPost = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#title').value;
    const content = document.querySelector('#content').value;
  
    if (title && content) {
      const response = await fetch('/api/post', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        console.log('Response Okay');
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
    };

    document
    .querySelector('#newPost')
    .addEventListener('submit', addPost);