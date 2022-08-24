let workParagraph = document.querySelectorAll('.work-paragraph');
let workParagraphArray = Array.from(workParagraph);

let workButtonNext = document.querySelector('.work-button-next');
let workButtonPrev = document.querySelector('.work-button-prev');


let nextButton = document.querySelector('.next-button');
let prompt = document.querySelector('.finish-work-prompt');
let workForm = document.querySelector('.work-form');

let counter=0;



workButtonNext.addEventListener('click', () => {
    if (counter < 3) {
        counter++;
        nextButton.setAttribute('disabled', '');
        nextButton.style.opacity = 0.4;
        workButtonNext.style.opacity = 1;
        workButtonPrev.style.opacity = 1;
        console.log('counter -->', counter)


        for (let i=0; i < workParagraphArray.length; i++) {
            if (counter >= i + 1) {
                workParagraphArray[i].style.opacity = 1;
                // if (workParagraphArray[i].getAttribute('id') === 'paragraph-1' || workParagraphArray[i].getAttribute('id') === 'paragraph-3') {
                //     workParagraphArray[i].style.transform = 'translateX(50px)'
                // }
            }
        }
    }

    if (counter === 3) {
        nextButton.removeAttribute('disabled');
        nextButton.style.opacity = 1;

        nextButton.removeAttribute('disabled');
        nextButton.style.opacity = 1;

        nextButton.addEventListener('mouseover', () => {
            nextButton.style.backgroundColor = 'rgb(180, 44, 44)'
        })
        nextButton.addEventListener('mouseout', () => {
            nextButton.style.backgroundColor = 'rgb(206,77,77)'
        })
        workButtonNext.style.opacity = 0.4;
    }

})



workButtonPrev.addEventListener('click', () => {
    if (counter === 1) {
        workButtonPrev.style.opacity = 0.4;
    }

    if (counter >= 1) {
        counter--;
        nextButton.setAttribute('disabled','')
        nextButton.style.opacity = 0.4;
        workButtonNext.style.opacity = 1;
        console.log('counter -->', counter)
        for (let i=0; i < workParagraphArray.length; i++) {
            if (counter < i + 1) {
                workParagraphArray[i].style.opacity = 0;
                // if (workParagraphArray[i].getAttribute('id') === 'paragraph-1' || workParagraphArray[i].getAttribute('id') === 'paragraph-3') {
                //     workParagraphArray[i].style.transform = 'translateX(-50px)'
                // } else {
                //     workParagraphArray[i].style.transform = 'translateX(5px)'
                // }
            }
        }
    }
})

nextButton.addEventListener('click', () => {
    prompt.style.zIndex = 1;
    prompt.style.visibility = 'visible';
    prompt.style.transform = 'rotate(-0.12deg)';
    document.body.style.backgroundColor = 'black';
    workButtonNext.setAttribute('disabled', '');
    workButtonPrev.setAttribute('disabled', '');
    workButtonPrev.style.opacity = 0.4;
})