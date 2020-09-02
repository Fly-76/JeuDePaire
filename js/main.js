/********************************************************************************/
// Define possible choices
let items = ["red", "yellow", "green", "pink", "violet", "brown"];

/********************************************************************************/
//  build the html
//

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

// Build html deck
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
    html+= 
    `
    <div class="offset-2 col-8 mb-3">
        <button class="btn btn-primary btn-block funnyFont" type="button" onclick="btnClick()">Jouer</button>
    </div>
    `;
deck.innerHTML = html;

/********************************************************************************/
//  game handler
//

// Constant definition
const HIDE_TIME = 1000;           // sleep time used before hiding cards
const GAME_TIME = 60000;

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
let lastId = null;
let started = false;

// Disable click on the whole page
function disableClick() {
    let body = document.getElementsByTagName("body")[0];
    body.setAttribute("style", "pointer-events: none;");
}

// Enable click on the whole page
function enableClick() {
    let body = document.getElementsByTagName("body")[0];
    body.setAttribute("style", "pointer-events: auto;");
}

// Hide a card
function hideCard(id) {
    let card2Hide = document.getElementById(id);
    card2Hide.classList.toggle("is-flipped");
    cardArray[id].status = "hidden";
}

// Use time out before hiding two cards
function maskCard(id1, id2) {
    disableClick();
    setTimeout(function(){ 
        hideCard(id1);
        hideCard(id2);
        // lastId = null;
        enableClick();
    }, HIDE_TIME);
}

// mark a paired card
function pairedCard(id1, id2) {
    cardArray[id1].status = "paired";
    cardArray[id2].status = "paired";
}

for (let card of cards){

    let cardStyle = window.getComputedStyle(card.childNodes[3],null);
    cardArray.push(new Card(
        card.childNodes[3].id,
        cardStyle.getPropertyValue("background-color")
        ));

    card.addEventListener( "click", function() {
        if(started) {

            // carte masquée ?
            if (cardArray[card.id].status === "hidden"){
                card.classList.toggle("is-flipped");
                cardArray[card.id].status = "showed";

                // carte precedente existe?
                if (lastId !== null) {
                    // même couleur?
                    if (cardArray[lastId].color === cardArray[card.id].color) {
                        pairedCard(card.id, lastId);
                    } else { // retarder l'occultaion des cartes
                        maskCard(card.id, lastId);
                    }
                    lastId = null;
                } else {
                    lastId = card.id;
                }
            }
        }
    });    
}

function btnClick() {
    started = !started;
    alert("click");
}