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
let cardsDataArr = [];



// # ELEMENTI DEL DOM CON CUI INTERAGIRE
const cardsRowElement = document.getElementById('cards-row-element');
// console.debug('cardsRowElement', cardsRowElement);
const imageDetailEl = document.getElementById('image-detail');
// console.debug('imageDetailEl', imageDetailEl);
const imageDetailCloseButton = imageDetailEl.querySelector('.btn');
// console.debug('imageDetailCloseButton', imageDetailCloseButton);
const imageDetailImgEl = imageDetailEl.querySelector('img');



// # LISTENER DI EVENTI
imageDetailCloseButton.addEventListener('click', () => {
    hideImageDetailEl();
})



// # FUNZIONI
// - FUNZIONE CHE RICEVE UN URL E CARICA LE CARDS ESEGUENDO LA RICHIESTA ALL'API SPECIFICATA
    // - RICHIAMA LA FUNZIONE CHE GENERA LA COLONNA CONTENENTE LA CARD POPOLATA CON I DATI RICEVUTI
/**
 * Funzione che richiede all'api: `apiUri (default = https://lanciweb.github.io/demo/api/pictures/)` le informazioni di n cards e chiama la funzione generateCardColumn per ciascuna delle cards da generare
 * @param {string} apiUri URI Dell'API alla quale eseguire la richiesta. Come risposta **DEVE** darmi un array di oggetti con le informazioni delle card
 */
const loadCards = (apiUri = 'https://lanciweb.github.io/demo/api/pictures/') =>{
    axios
        .get(apiUri)
        .then(response => {
            // console.debug("response", response);

            // todo PASSARE IN FUNZIONE SOTTO PERCHE LA POSSA PASSARE A FUNZIONE PER CLICK IMMAGINE / RENDERLA VARIABILE GLOBALE PERCHE CLICK IMMAGINE POSSA ACCEDERVI
            // ? HA PIU SENSO PASSARLO DENTRO OGNI FUNZIONE O RENDERLO GLOBALE?
            // const cardsDataArr = response.data;
            cardsDataArr = response.data;
            // console.debug("cardsDataArr", cardsDataArr);
            cardsDataArr.forEach(cardData => {
                generateCardColumn(cardData);
            });
        });
}


// - FUNZIONE CHE RICEVE LE INFORMAZIONI DI UNA CARD E GENERA UNA COLONNA CONTENENTE LA CARD CON LE INFORMAZIONI RICEVUTE
/**
 * 
 * @param {object} cardData Oggetto contenente le informazioni per generare la card. Deve avere: url: string, title: string, date: string, id: number
 */
const generateCardColumn = (cardData) => {
    // console.debug("cardData", cardData);
    
    const cardColumnEl = document.createElement('div');
    cardColumnEl.className = 'col-12 col-md-6 col-lg-4';
    const cardEl = document.createElement('div');
    cardEl.className = 'card h-100';
    cardEl.dataset.id = cardData.id;
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
    cardEl.addEventListener('click', (e) => {
        // console.debug("Evento click di: ", e.target.dataset.id);
        const cardId = parseInt(e.target.dataset.id);
        // console.debug("cardId", cardId);
        // console.debug("cardsDataArr", cardsDataArr);
        const cardToShow = cardsDataArr.find(card => card.id === cardId);
        // console.debug("cardToShow", cardToShow);
        showImage(cardToShow.url);
    })


    // console.debug("cardEl", cardEl);
    // console.debug("cardEl.outerHTML", cardEl.outerHTML);
    cardColumnEl.appendChild(cardEl)
    // console.debug("cardColumnEl", cardColumnEl);
    
    cardsRowElement.appendChild(cardColumnEl)
    // console.debug("cardsRowElement", cardsRowElement);
};


// - FUNZIONE CHE IMPOSTA L'URL DELL'IMMAGINE CLICCATA E MOSTRA LA SCHERMATA CON IL DETTAGLIO DELL'IMMAGINE
    // - RICHIAMA LA FUNZIONE CHE MOSTRA FISICAMENTE IL BLOCCO DEL DETTAGLIO DELL'IMMAGINE
const showImage = (imageURL) => {
    // console.debug("showImage:", imageURL);
    imageDetailImgEl.src = imageURL;

    showImageDetailEl();
};




// - FNZIONE CHE MOSTRA FISICAMENTE IL CONTENITORE DEL CARD-DETAIL
const showImageDetailEl = () => {
    imageDetailEl.classList.remove('d-none');
};
// - FNZIONE CHE NASCONDE FISICAMENTE IL CONTENITORE DEL CARD-DETAIL
const hideImageDetailEl = () => {
    imageDetailEl.classList.add('d-none');
};











// # DA ESEGUIRE ONLOAD
loadCards(apiUri);