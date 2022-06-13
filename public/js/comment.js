const comment = async (event) => {
    event.preventDefault();
  
    const text = document.querySelector('#commentText').value.trim();

    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length -1
    ];
  
    if (text && post_id) {
      const response = await fetch(`/api/comment`, {
        method: 'POST',
        body: JSON.stringify({
            text, 
            post_id 
        }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        console.log('Response Okay');
        document.location.reload();
      } else {
        alert(response.statusText);
      }
    }
    };

    document
    .querySelector('#newComment')
    .addEventListener('submit', comment);