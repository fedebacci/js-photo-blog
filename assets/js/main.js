// COMMENTO NORMALE
// ! COMMENTO ERRORE
// ? COMMENTO DOMANDA
// * COMMENTO HIGHLIGHT
// # COMMENTO WARNING
// - COMMENTO TEXT
// todo COMMENTO TODO



// # COSTANTI NOTE
// const apiUri = 'https://jsonplaceholder.typicode.com/';
const apiUri = 'https://lanciweb.github.io/demo/api/pictures/';



// # ELEMENTI HTML CON CUI INTERAGIRE
const cardsRowElement = document.getElementById('cards-row-element');
// console.debug('cardsRowElement', cardsRowElement);




// # FUNZIONI
// - FUNZIONE CHE CARICA LE CARDS ESEGUENDO LA RICHIESTA ALL'API
    // - RICHIAMA LA FUNZIONE CHE GENERA LA COLONNA CONTENENTE LA CARD POPOLATA CON I DATI RICEVUTI
const loadCards = () =>{
    axios
        .get(apiUri)
        .then(response => {
            // console.debug("response", response);
            const cardsDataArr = response.data;
            // console.debug("cardsDataArr", cardsDataArr);
            cardsDataArr.forEach(cardData => {
                generateCardColumn(cardData);
            });
        });
}


// - FUNZIONE CHE RICEVE LE INFORMAZIONI DI UNA CARD E GENERA UNA COLONNA CONTENENTE LA CARD CON LE INFORMAZIONI RICEVUTE
const generateCardColumn = (cardData) => {
    // console.debug("cardData", cardData);
    
    const cardColumnEl = document.createElement('div');
    cardColumnEl.className = 'col-12 col-md-6 col-lg-4';
    const cardEl = document.createElement('div');
    cardEl.className = 'card h-100';
    cardEl.dataset.id = `card-${cardData.id}`;
    cardEl.innerHTML = 
    `

                <div class="card-header border-0 p-3">
                    <img src="./assets/img/pin.svg" class="card-pin" alt="decorative pin">
                    <img src="${cardData.url}" class="card-img-top" alt="${cardData.title}">
                </div>
                <div class="card-body pt-0 pb-3 px-3">
                    <h5 class="card-title mb-0">
                        ${cardData.title}
                    </h5>
                    <p class="date mb-0">
                        ${cardData.date}
                    </p>
                </div>

    `;
    // todo AGGIUNGERE EVENT LISTENER SULLA CARD


    // console.debug("cardEl", cardEl);
    // console.debug("cardEl.outerHTML", cardEl.outerHTML);
    cardColumnEl.appendChild(cardEl)
    // console.debug("cardColumnEl", cardColumnEl);
    
    cardsRowElement.appendChild(cardColumnEl)
    // console.debug("cardsRowElement", cardsRowElement);
};



// # DA ESEGUIRE ONLOAD
loadCards();