window.addEventListener('DOMContentLoaded', () => {

    // EventListener
    document.querySelectorAll('a#delete').forEach(deleteEl => {

       deleteEl.addEventListener('click', (e) => {

        e.preventDefault();

        if(confirm('Delete this Blog')){

           const id = e.target.dataset.id;

           fetch(`/blogs/${id}`, {
              method: 'DELETE'
           })
           .then(res => res.json() )
           .then(data => {
             console.log(data);
             window.location.href = data.redirectUrl;
           })
           .catch(err => {
             alert(err);
           });

        }

       });

    });

});
