console.log("loaded");

// 
let items = ["red", "yellow", "green", "pink", "violet", "brown"];

// Randomize data order
function randomize(array) {
    let i, j, swap;
    for (i = array.length - 1; i > 0; i--) {
        j = Math. floor(Math. random() * (i + 1));
        swap = array[i];
        array[i] = array[j];
        array[j] = swap;
    }
}

// Build an empty arrea with pair index
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
    <div class="card border-primary h-100">
    <div class="face rounded-lg front"></div>
    <div class="face rounded-lg back" style="background-color:${items[randItems[i]]};"></div>
    </div>
    </div>
    `;
deck.innerHTML = html;


let cards = document.getElementsByClassName("card");

for (let card of cards){
    card.addEventListener( 'click', function() {
        card.classList.toggle('is-flipped');
    });    
}