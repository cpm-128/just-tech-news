async function upvoteClickHandler(event) {
    event.preventDefault();

    // must pass the post_id and user_id for the PUT upvote request to go through
    // user_id is available from the session backend
    // post_id we will get from the url by splitting the / and taking the last item
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    //console.log('>> post id: ', id);

    const response = await fetch('/api/posts/upvote', {
        method: 'PUT',
        body: JSON.stringify({
            post_id: id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.upvote-btn').addEventListener('click', upvoteClickHandler);