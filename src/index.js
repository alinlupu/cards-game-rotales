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

function getRandomCard() {
	if( cards.length == 0 ) return;
	let i = Math.floor(Math.random()*(cards.length-1));
	let card = cards[i];
	if( cards_freq[card] > 0 ) {
		if( --cards_freq[card] == 0 ) {
			cards.splice(i, 1);
		}
		return data[card];
	} 
}

function updateTable( n, m ) {
	
}

function updateCardsState( i, j) {
	let clickedCard = document.getElementById("backsideCard"+i+'_'+j);
	if( clickedCard != null) {
		console.log( last_i, last_j);
		clickedCard.style.display="none";
		if(last_i != null && last_j != null) {
			let lastClickedCard = document.getElementById("backsideCard"+last_i+'_'+last_j);
			let l_i = last_i; // Otherwise will be turned null, after
			let l_j = last_j; // and is needed for getting the image card.

			setTimeout(()=>{
				if( lastClickedCard.data != clickedCard.data) {
					lastClickedCard.style.display="block";
					clickedCard.style.display="block";
				} else {
					let c = document.getElementById("imageCard"+i+'_'+j);
					document.getElementById("card-name").textContent = c.data.name;
					document.getElementById("card-image").style.backgroundImage = `url('${c.data.path}')`;
					c.remove();
					document.getElementById("imageCard"+l_i+'_'+l_j).remove();
					initConfetti();	
				}
			}, 500);
		}

		last_i=(last_i!=null)?null:i;
		last_j=(last_j!=null)?null:j;
	}
}

var last_i, last_j;
function createTable( n, m ) {
	getRandomCards( n*m/2 );
	for(let i=0; i<n; i++ ) {
		const tblRow = document.createElement("tr");
		for(let j=0; j<m; j++ ) {
			// Backside Card 
			const backside = document.createElement("div");
			backside.id = "backsideCard"+i+'_'+j;
			backside.className = "backsideCard";
			backside.addEventListener("click", ()=>{
				updateCardsState(i, j);
			});

			// Image Card 
			let c = getRandomCard();
			const image = document.createElement("div");
			image.id = "imageCard"+i+'_'+j;
			image.style.backgroundImage=`url('${c.path}')`;
			image.data = c;
			backside.data = image.style.backgroundImage;
			image.appendChild( backside );

			// Table Cell
			const tblCell = document.createElement("td");
			tblCell.contentEditable="false";
			tblCell.append( image );
			tblRow.appendChild(tblCell);
		}
		parentTbl.appendChild(tblRow);
	}
}

createTable(3,4);
