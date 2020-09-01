/********************************************************************************/
// Define possible choices
let items = ["red", "yellow", "green", "pink", "violet", "brown"];

// Randomize data order of the given array
function randomize(array) {
    let i, j, swap;
    for (i = array.length - 1; i > 0; i--) {
        j = Math. floor(Math. random() * (i + 1));
        swap = array[i];
        array[i] = array[j];
        array[j] = swap;
    }
}

// Build an empty arrea with pair index 0, 0, 1, 1, 2, 2, etc...
// then randomize it
function buildArray() {
    let data = new Array;
    for (let i=0; i<items.length; i++) data.push(i, i);
    randomize(data);
    return data;
}

let randItems = buildArray();
console.log(randItems)

// Build deck
let deck = document.getElementsByTagName("section")[0];
let html = ""
for (let i=0; i<items.length*2; i++) html+=
    `
    <div class="scene col-3 col-sm-3 col-lg-2 my-2 cardHeight">
    <div id="${i}" class="card border-primary h-100">
        <div class="face front"></div>
        <div class="face back" style="background-color:${items[randItems[i]]};"></div>
    </div>
    </div>
    `;
deck.innerHTML = html;

/********************************************************************************/
//  game handler
//

// Class definition
class Card {
    constructor(id, color) {
        this.status = "hidden";
        this.id = id;
        this.color = color;
    }
}

// Global variables declaration
let cards = document.getElementsByClassName("card");
let cardArray = new Array;
let previousCard = new Card;
let lastId = null;


for (let card of cards){

    let cardStyle = window.getComputedStyle(card.childNodes[3],null);
    cardArray.push(new Card(
        card.childNodes[3].id,
        cardStyle.getPropertyValue("background-color")
        ));

    card.addEventListener( "click", function() {

        // carte masquée ?
        if (cardArray[card.id].status === "hidden"){
            card.classList.toggle("is-flipped");
            cardArray[card.id].status = "showed";

            // carte precedente existe?
            if (lastId !== null) {

                // même couleur?
                if (cardArray[lastId].color === cardArray[card.id].color) {

                    cardArray[lastId].status = "paired";
                    cardArray[card.id].status = "paired";
                    lastId = null;

                } else {

                    let previous = document.getElementById(lastId);
                    previous.classList.toggle("is-flipped");
                    cardArray[lastId].status = "hidden";
                    lastId = card.id;
                }

            } else {
                lastId = card.id;
            }
        }
    });    
}