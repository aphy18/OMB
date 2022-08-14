let workParagraph = document.querySelectorAll('.work-paragraph');
let workParagraphArray = Array.from(workParagraph);

let workButtonNext = document.querySelector('.work-button-next');
let workButtonPrev = document.querySelector('.work-button-prev');
let finishWorkButton = document.querySelector('.finish-work-button');

let counter=0;



workButtonNext.addEventListener('click', () => {
    if (counter < 3) {
        counter++;
        finishWorkButton.setAttribute('disabled','');
        finishWorkButton.style.opacity = 0.4;
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
        finishWorkButton.removeAttribute('disabled');
        finishWorkButton.style.opacity = 1;
        finishWorkButton.addEventListener('mouseover', () => {
            finishWorkButton.style.backgroundColor = 'rgb(180, 44, 44)'
        })
        finishWorkButton.addEventListener('mouseout', () => {
            finishWorkButton.style.backgroundColor = 'rgb(206,77,77)'
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
        finishWorkButton.setAttribute('disabled','')
        finishWorkButton.style.opacity = 0.4;
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