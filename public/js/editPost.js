const editPost = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length -1
    ];
  
    if (title && content) {
      const response = await fetch(`/api/post/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            post_id: id, 
            title,
            content 
        }),
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
    .querySelector('#editPost')
    .addEventListener('submit', editPost);