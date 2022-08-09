let workParagraph = document.querySelectorAll('.work-paragraph');
let workParagraphArray = Array.from(workParagraph);

let workButtonNext = document.querySelector('.work-button-next');
let workButtonPrev = document.querySelector('.work-button-prev');
let finishWorkButton = document.querySelector('.finish-work-button');

let counter=0;



workButtonNext.addEventListener('click', () => {
    if (counter < 3) {
        finishWorkButton.setAttribute('disabled','')
        counter++;
        console.log('counter -->', counter)


        for (let i=0; i < workParagraphArray.length; i++) {
            if (counter >= i + 1) {
                workParagraphArray[i].style.opacity = 1;
                // if (workParagraphArray[i].getAttribute('id') === 'paragraph-1' || workParagraphArray[i].getAttribute('id') === 'paragraph-3') {
                //     workParagraphArray[i].style.transform = 'translateX(50px)'
                // }
            }
        }
    } else {
        finishWorkButton.removeAttribute('disabled')
    }
})



workButtonPrev.addEventListener('click', () => {
    if (counter >= 1) {
        finishWorkButton.setAttribute('disabled','')
        counter--;
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