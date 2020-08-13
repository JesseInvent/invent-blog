window.addEventListener('DOMContentLoaded', () => {

    const  formatElement = div => {

        let text = div.innerText;
        // console.log(text);

        let length = text.length; // Get the total length of text
        let halfLength = Math.round(length/3); // Divide the length by 2
        let firstHalf = text.slice(0, halfLength); // Slice the string halfway
        let otherHalf = text.slice(halfLength, length); // The other slice of the string

        // console.log(firstHalf);
        // console.log(otherHalf);

        let formatted = `<span class='content'>${firstHalf}</span><span class='dot'>...</span><span class='hide'>${otherHalf}</span>`; // add a hide span element to the second half to hide element, then concatenate with the first half element
        // console.log(formatted);

        div.innerHTML = formatted;

    }

    const readMore = element => {

        const children = element.children;
        children[1].classList.add('hide');
        children[2].classList.remove('hide');
    }

    const readLess = element => {

        const children = element.children;
        children[1].classList.remove('hide');
        children[2].classList.add('hide');
    }

    document.querySelectorAll('.blog p').forEach(el => { // get all content and format
        formatElement(el);
    });

    // Button eventListener
    document.querySelectorAll('button.read').forEach(el => {

        el.addEventListener('click', (e) => {

            let text = e.target.parentElement.previousElementSibling;
            let state = e.target.dataset.state;
            if(state == 'hide') {
                readMore(text);
                e.target.innerHTML = 'Read Less <i class="fa fa-arrow-up"></i>';
                e.target.dataset.state = 'show';
            } else if(state == 'show') {
                readLess(text);
                e.target.dataset.state = 'hide';
                e.target.innerHTML = 'Read More <i class="fa fa-arrow-down"></i>';
            }

        });
    });


});
