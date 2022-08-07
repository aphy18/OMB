let workParagraph = document.querySelectorAll('.work-paragraph');
let workParagraphArray = Array.from(workParagraph);

let workButtonNext = document.querySelector('.work-button-next');
let workButtonPrev = document.querySelector('.work-button-prev');

let tracker = -1;

workButtonNext.addEventListener('click', () => {
    tracker++

    for (let i=0; i < workParagraphArray.length; i++) {
        if (tracker === i) {
            console.log(`work paragraph ${i} -->`, workParagraphArray[i])
        }
    }
})