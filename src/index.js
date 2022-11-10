import data from './data.js'

const parentTbl = document.getElementById("cards-table");
var cards = []
var cards_freq = {}

function getRandomCards( n ) {
    for(let i=0; i<n; i++ ) {
        let card_i = Math.floor(1+Math.random()*22 );
        while( cards.indexOf(card_i) != -1 ) {
            card_i = Math.floor(1+Math.random()*22 );
        }
        cards.push( card_i );
        cards_freq[card_i] = 2;
    }
}

function getPath() {
    if( cards.length == 0 ) return;
    let i = Math.floor(Math.random()*(cards.length-1))
    console.log(i);
    console.log(cards);
    let card = cards[i]
    if( cards_freq[card] > 0 ) {
        if( --cards_freq[card] == 0 ) {
            cards.splice(i, 1);
        }
        return data[card].path;
    } 
}

function updateTable( n, m ) {

}

function createTable( n, m ) {
    getRandomCards( n*m/2 );
    for(let i=0; i<n; i++ ) {
        const tblRow = document.createElement("tr");
        for(let j=0; j<m; j++ ) {
            const tblCell = document.createElement("td");
            tblCell.contentEditable="false";
            const image = document.createElement("img");
            image.src=getPath();
            image.width="100";
            image.height="120";
            image.class="cardImg"
            tblCell.append( image );
            tblRow.appendChild(tblCell);
        }
        parentTbl.appendChild(tblRow);
    }
}

createTable(3,4);
