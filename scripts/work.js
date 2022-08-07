let workParagraph = document.querySelectorAll('.work-paragraph');
let workParagraphArray = Array.from(workParagraph);

let workButtonNext = document.querySelector('.work-button-next');
let workButtonPrev = document.querySelector('.work-button-prev');

let tracker = 0;



workButtonNext.addEventListener('click', () => {
    if (tracker < 3) {
        tracker++;
        console.log('tracker -->', tracker)
        for (let i=0; i < workParagraphArray.length; i++) {
            if (tracker === i + 1) {
                console.log(`work paragraph ${i + 1} -->`, workParagraphArray[i])
            }
        }
    }
})



workButtonPrev.addEventListener('click', () => {
    if (tracker > 0) {
        tracker--;
        console.log('tracker -->', tracker)
        for (let i=0; i < workParagraphArray.length; i++) {
            if (tracker === i + 1) {
                console.log(`work paragraph ${i + 1} -->`, workParagraphArray[i])
            }
        }
    }
})