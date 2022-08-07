let workParagraph = document.querySelectorAll('.work-paragraph');
let workParagraphArray = Array.from(workParagraph);

let workButtonNext = document.querySelector('.work-button-next');
let workButtonPrev = document.querySelector('.work-button-prev');
let finishWorkButton = document.querySelector('.finish-work-button');

let counter=0;



workButtonNext.addEventListener('click', () => {
    if (counter < 3) {
        counter++;
        console.log('counter -->', counter)


        for (let i=0; i < workParagraphArray.length; i++) {
            if (counter >= i + 1) {
                workParagraphArray[i].style.opacity = 1;
            }
        }
    }
})



workButtonPrev.addEventListener('click', () => {
    if (counter >= 1) {
        counter--;
        console.log('counter -->', counter)
        for (let i=0; i < workParagraphArray.length; i++) {
            if (counter < i + 1) {
                workParagraphArray[i].style.opacity = 0;
            }
        }
    }
})