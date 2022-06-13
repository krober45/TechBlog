const deletePost = async (event) => {
    event.preventDefault();
  
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length -1
    ];
  
    if (title && content) {
      const response = await fetch(`/api/post/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({
            post_id: id, 
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
    .querySelector('.deleteBtn')
    .addEventListener('click', deletePost);