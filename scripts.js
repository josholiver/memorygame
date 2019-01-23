const cards = document.querySelectorAll('.memory-card');


let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) return;

    if(this === firstCard) return;
    // basically add a class flip if it is not already there and remove it if it is present 
    this.classList.add('flip');

    if (!hasFlippedCard) {
        // First Click
        hasFlippedCard = true;
        firstCard = this;
       
        return;
    } 

    // Second click
    secondCard = this;
    
    checkForMatch();
}


function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    
    isMatch ? disableCards() : unFlipCards();

    // // do cards match?
    // if (firstCard.dataset.framework === secondCard.dataset.framework) {
    //     disableCards();
    // } else {
    //     unFlipCards();
    // }
}

function disableCards() {
    // It's a match
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unFlipCards() {
    lockBoard = true;

    // Not a match
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1200);
}


function resetBoard(){
    [hasFlippedCard,lockBoard] = [false,false];
    [firstCard,secondCard] = [null,null];
}


(function shuffle(){
    cards.forEach(card =>{
        let randomPos = Math.floor(Math.random()*12);
        card.style.order = randomPos;
    });
})();


cards.forEach(card => card.addEventListener('click', flipCard));
