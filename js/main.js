console.log("loaded");

let cards = document.getElementsByClassName("card");

for (let card of cards){
    card.addEventListener( 'click', function() {
        card.classList.toggle('is-flipped');
    });    
}