import data from './data.js'
import Logo from './logo.js'


let logo = new Logo(document.getElementById("logo"));
setTimeout( function(){ 
	logo.move();
}, 2000);

const infoSection = document.getElementById("info-section");
const cardsSection = document.getElementById("cards-section");
setTimeout( function(){
	cardsSection.style.visibility = "visible";
	cardsSection.style.opacity = "1";
	infoSection.style.opacity = "1";
}, 4000);


const parentTbl = document.getElementById("cards-table");
var cards = []
var cards_freq = {}

const TOTAL_CARDS = 8;
function getRandomCards( n ) {
	for(let i=0; i<n; i++ ) {
		let card_i = Math.floor(1+Math.random()*TOTAL_CARDS );
		while( cards.indexOf(card_i) != -1 ) {
			card_i = Math.floor(1+Math.random()*TOTAL_CARDS );
		}
		cards.push( card_i );
		cards_freq[card_i] = 2;
	}
}

function selectRandomCard() {
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


const audioPlayer = document.getElementById("card-track");
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
					document.getElementById("intro-text").style.display = "none";
					document.getElementById("intro-header").style.display = "none";
					audioPlayer.src = c.data.audio_path;
					audioPlayer.style.visibility = "visible";
					audioPlayer.play();
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
function createCard( i, j ) {
	// Backside Card 
	const backside = document.createElement("div");
	backside.id = "backsideCard"+i+'_'+j;
	backside.className = "backsideCard";
	backside.addEventListener("click", ()=>{
		updateCardsState(i, j);
	});


	// Image Card 
	let c = selectRandomCard();
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
	return tblCell;
}

var last_i, last_j;
function createTable( n, m ) {
	getRandomCards( n*m/2 );
	for(let i=0; i<n; i++ ) {
		const tblRow = document.createElement("tr");
			
		// Randomize cell selection
		let randomIndexes = []
		let tblCells = []
		for(let j=0; j<m/2; j++) {
			let randomIndex = Math.floor(Math.random()*m);
			while( randomIndexes.indexOf(randomIndex) != -1 ) {
				randomIndex = Math.floor(Math.random()*m);
			}
			randomIndexes.push(randomIndex);	
			tblCells[randomIndex] = createCard(i, randomIndex);
		}
		for(let j=0; j<m; j++ ) {
			if( randomIndexes.indexOf(j) == -1 )  {
				tblCells[j] = createCard(i, j);		
			}
		}

		for(let j=0; j<m; j++) {
			tblRow.appendChild(tblCells[j]);
		}

		parentTbl.appendChild(tblRow);
	}
}

createTable(4,4);
