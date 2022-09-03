let questions = document.querySelectorAll('.question');

console.log(questions.length)

for (let question of questions) {

    question.addEventListener('click', () => {
        console.log(question.value)
        
        if (question.value === 'good-answer') {
            question.style.color = 'green';
        } else if (question.value === 'standard-answer') {
            question.style.color = 'black';
        } else if (question.value === 'bad-answer') {
            question.style.color = 'red';
        }
    })  
}
