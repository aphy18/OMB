let selectAmount = document.getElementById('select-amount');
let withdrawalButton = document.querySelector('.banking-option-button');
let prompt = document.querySelector('.finish-work-prompt');
let bankingOptionContainer = document.querySelector('.banking-option-container');

let storeValue = [];

selectAmount.addEventListener('keyup', (e) => {
    storeValue.push(e.key)
    if (isNaN(e.key)) {
        storeValue.pop()
    }
    console.log('store value -->', storeValue)
    console.log('store value join -->', storeValue.join(''))
})

withdrawalButton.addEventListener('click', () => {
    if (storeValue.length === 0) {
        console.log('no input')
        return;
    }

    bankingOptionContainer.style.opacity = 0.4;

    prompt.style.transform = 'rotate(-0.12deg)';
    prompt.style.opacity = 1;
    prompt.style.zIndex = 1;
})