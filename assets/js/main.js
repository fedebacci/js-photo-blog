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
const placeholderURL = "./assets/img/image-placeholder.png";
let cardsDataArr = [];






 


 
// # ELEMENTI DEL DOM CON CUI INTERAGIRE
const spinnerOverlayEl = document.querySelector('.spinner-overlay');
// console.debug('spinnerOverlayEl', spinnerOverlayEl);
const cardsRowElement = document.getElementById('cards-row-element');
// console.debug('cardsRowElement', cardsRowElement);
const imageDetailEl = document.getElementById('image-detail');
// console.debug('imageDetailEl', imageDetailEl);
const imageDetailCloseButton = imageDetailEl.querySelector('.btn');
// console.debug('imageDetailCloseButton', imageDetailCloseButton);
const imageDetailImgEl = imageDetailEl.querySelector('img');






 


 
// # LISTENER DI EVENTI
// * AGGIUNGO L'EVENTO AL PULSANTE CHE CHIUDE IL DETTAGLIO DELL'IMMAGINE, INVOCANDO LA FUNZIONE hideImageDetail(e.target.dataset.cardId, e.target.dataset.url) 
// * LE PASSO COME PARAMETRI L'URL DELL'IMMAGINE DA REINSERIRE E L'ID DELLA CARD IN CUI REINSERIRE L'IMMAGINE
    // - RICHIAMA LA FUNZIONE hideImageDetail(e.target.dataset.cardId, e.target.dataset.url) CHE CHIUDE LA PREVIEW RESETTANDO (anche se non necessario) L'URL DEL DETTAGLIO E RIMETTENDO L'IMMAGINE ORIGINALE AL POSTO DEL PLACEHOLDER 
imageDetailCloseButton.addEventListener('click', (e) => {
    // console.debug(e.target);
    // console.debug("e.target.dataset.cardId", e.target.dataset.cardId);
    // console.debug("e.target.dataset.url", e.target.dataset.url);

    hideImageDetail(e.target.dataset.cardId, e.target.dataset.url);
})






 


 
// # FUNZIONI CHE REAGISCONO AL CARICAMENTO DELLA PAGINA
// - FUNZIONE CHE RICEVE UN URL E CARICA LE CARDS ESEGUENDO LA RICHIESTA ALL'API SPECIFICATA
    // - RICHIAMA LA FUNZIONE CHE GENERA LA COLONNA CONTENENTE LA CARD POPOLATA CON I DATI RICEVUTI
/**
 * Funzione che richiede all'api: `apiUri (default = https://lanciweb.github.io/demo/api/pictures/)` le informazioni di n cards e chiama la funzione generateCardColumn per ciascuna delle cards da generare
 * @param {string} apiUri URI Dell'API alla quale eseguire la richiesta. Come risposta **DEVE** darmi un array di oggetti con le informazioni delle card
 */
const loadCards = (apiUri = 'https://lanciweb.github.io/demo/api/pictures/') =>{

    showSpinnerOverlayEl();
    // console.debug("spinnerOverlayEl", spinnerOverlayEl);

    axios
        .get(apiUri)
        .then(response => {
            // console.debug("response", response);

            cardsDataArr = response.data;
            // console.debug("cardsDataArr", cardsDataArr);
            cardsDataArr.forEach(cardData => {
                generateCardColumn(cardData);
            });
        })
        .catch (error=> {
            console.error("ERRORE:", error);
        })
        .finally(() => {
            hideSpinnerOverlayEl();
        });
};



// - FUNZIONE CHE RICEVE LE INFORMAZIONI DI UNA CARD E GENERA UNA COLONNA CONTENENTE LA CARD CON LE INFORMAZIONI RICEVUTE
/**
 * Funzione che riceve un oggetto con le informazioni della card e inserisce una colonna per ogni card da aggiungere al tabellone. Aggiunge alla card l'event listener per il click per poter aprire il dettaglio dell'immagine
 * @param {object} cardData Oggetto contenente le informazioni per generare la card. Deve avere: url: string, title: string, date: string, id: number
 */
const generateCardColumn = (cardData) => {
    // console.debug("cardData", cardData);
    
    const cardColumnEl = document.createElement('div');
    cardColumnEl.className = 'col-12 col-sm-6 col-lg-4';
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
        // todo CAPIRE SE HA PIU SENSO PASSARE NELLA FUNZIONE E.TARGET E SEPARARE LE INFORMAZIONI CHE MI SERVONO LI DENTRO
        showImageDetail(cardToShow.url, cardId);
    });
    // console.debug("cardEl", cardEl);

    cardColumnEl.appendChild(cardEl);
    // console.debug("cardColumnEl", cardColumnEl);
    
    cardsRowElement.appendChild(cardColumnEl);
    // console.debug("cardsRowElement", cardsRowElement);
};






 


 
// # FUNZIONI CHE REAGISCONO ALL'UTENTE
// - FUNZIONE CHE IMPOSTA L'URL DELL'IMMAGINE CLICCATA NELLA SCHERMATA CON IL DETTAGLIO DELL'IMMAGINE E MOSTRA LA SCHERMATA.
// - (Chiamata al click di una card nel tabellone, i cui parametri vengono dal data-attribute nella card e dall'array delle informazioni ricevute dalla richiesta all'API)
    // - RICHIAMA LA FUNZIONE CHE RIMUOVE L'IMMAGINE DAL TABELLONE ED INSERISCE IL PLACEHOLDER
    // - RICHIAMA LA FUNZIONE CHE MOSTRA FISICAMENTE IL BLOCCO DEL DETTAGLIO DELL'IMMAGINE
// - RIMUOVE L'IMMAGINE SCELTA DAL TABELLONE ED IMPOSTA LE VARIABILI DEL PULSANTE DI CHIUSURA CHE SERVONO PER POTERLA POI RIMETTERE
/**
 * Funzione che richiama le funzioni per rimuovere l'immagine scelta dal tabellone e per mostrare il dettaglio dell'immagine scelta. Imposta anche le variabili id e url al pulsante di chiusura per poterla rimettere nel tabellone una volta chiuso il dettaglio.
 * @param {string} imageURL Url dell'immagine da mostrare in dettaglio e da assegnare al pulsante di chiusura per poterla rimettere nel tabellone una volta chiuso il dettaglio.
 * @param {number} cardId Id numerico della card cliccata da rimovere dal tabellone e da assegnare al pulsante di chiusura per poterla rimettere nel tabellone una volta chiuso il dettaglio.
 */
const showImageDetail = (imageURL, cardId) => {
    // console.debug("imageURL:", imageURL);
    // console.debug("cardId:", cardId);

    hideImageCard(cardId);
    showImageDetailEl(imageURL);

    imageDetailCloseButton.dataset.cardId = cardId;
    imageDetailCloseButton.dataset.url = imageURL;
};



// - FUNZIONE CHE RESETTA L'URL DELL'IMMAGINE CLICCATA E NASCONDE LA SCHERMATA CON IL DETTAGLIO DELL'IMMAGINE. RIMETTE L'IMMAGINE RIMOSSA DAL DETTAGLIO NEL TABELLONE.
// - (Chiamata al click del pulsante di chiusura, il quale ci da i parametri tramite data-attributes)
    // - RICHIAMA LA FUNZIONE CHE RIMETTE L'IMMAGINE PICCOLA NEL TABELLONE UTILIZZANDO I PARAMETRI ID E URL RICEVUTI DAL PULSANTE DI CHIUSURA
    // - RICHIAMA LA FUNZIONE CHE NASCONDE FISICAMENTE IL BLOCCO DEL DETTAGLIO DELL'IMMAGINE
/**
 * Funzione che resetta l'URL dell'immagine nella schermata del dettaglio e la chiude. 
 * Quindi utilizza i parametri ricevuti dal pulsante di chiusura della schermata del dettaglio per reimpostare l'immagine nel tabellone, al suo posto
 * @param {number} cardId Id numerico della card ricevuto dal pulsante di chiusura del dettaglio e passato alla funzione per reinserire l'immagine nel tabellone.
 * @param {string} imageURL Url dell'immagine rimossa dal dettaglio ricevuto dal pulsante di chiusura del dettaglio e passato alla funzione per reinserire l'immagine nel tabellone.
 */
const hideImageDetail = (cardId, imageURL) => {
    // console.debug("cardId", cardId);
    // console.debug("imageURL", imageURL);

    hideImageDetailEl();
    showImageCard(cardId, imageURL);
};






 
// - FUNZIONE CHE SOSTITUISCE L'URL DELL'IMMAGINE NELLA CARD SUL TABELLONE CON IL PLACEHOLDER SCELTO QUANDO QUELL'IMMAGINE È NEL DETTAGLIO
// - (Chiamata a catena al click di una card nel tabellone, il cui parametro viene dal data-attribute nella card)
/**
 * Funzione che riceve l'id della card cliccata e ne sostituisce l'immagine sul tabellone (che poi verrà mostrata nel dettaglio) con il placeholder scelto
 * @param {number} cardId Id numerico della card ricevuto da showImageDetail e utilizzato per trovare nel DOM la card alla quale sostituire l'url.
 */
const hideImageCard = (cardId) => {
    // console.debug("cardId", cardId);

    const imageCard = document.querySelector('[data-id="' + cardId + '"]').querySelector('.card-img-top');
    // console.debug("imageCard", imageCard);

    imageCard.src = placeholderURL;
};



// - FUNZIONE CHE REINSERISCE L'URL DELL'IMMAGINE NELLA CARD SUL TABELLONE AL POSTO DEL PLACEHOLDER QUANDO IL DETTAGLIO VIENE CHIUSO
// - (Chiamata a catena al click del pulsante di chiusura, il quale ci da i parametri tramite data-attributes)
/**
 * Funzione che riceve l'id della card cliccata e ne sostituisce l'immagine sul tabellone (che poi verrà mostrata nel dettaglio) con il placeholder scelto
 * @param {number} cardId Id numerico della card ricevuto da hideImageDetail e utilizzato per trovare nel DOM la card alla quale sostituire l'url.
 * @param {string} cardId URL della card ricevuto da hideImageDetail e reimpostato come url dell'immagine della card trovata.
 */
const showImageCard = (cardId, imageURL) => {
    // console.debug("cardId", cardId);
    // console.debug("imageURL", imageURL);

    const imageCard = document.querySelector('[data-id="' + cardId + '"]').querySelector('.card-img-top');
    // console.debug("imageCard", imageCard);

    imageCard.src = imageURL;
};






 
// - FUNZIONE CHE IMPOSTA L'IMMAGINE DEL CARD-DETAIL E LO MOSTRA FISICAMENTE
// - (Chiamata a catena al click di una card nel tabellone il cui parametro viene dall'array delle informazioni ricevute dalla richiesta all'API)
/**
 * Funzione che riceve da showImageDetail l'URL dell'immagine scelta, lo imposta come URL dell'immagine nella schermata del dettaglio e mostra la schermata del dettaglio.
 * @param {string} imageURL (DEFAULT = placeholderURL) URL dell'immagine da inserire come immagine nella schermata del dettaglio
 */
const showImageDetailEl = (imageURL = placeholderURL) => {
    imageDetailImgEl.src = imageURL;
    imageDetailEl.classList.remove('d-none');
};



// - FUNZIONE CHE NASCONDE FISICAMENTE IL CONTENITORE DEL CARD-DETAIL
// - (Chiamata a catena al click del pulsante di chiusura)
/**
 * Funzione che, anche se non serve, reimposta come immagine nel dettaglio il placeholder. Quindi nasconde fisicamente la schermata del dettaglio
 */
const hideImageDetailEl = () => {
    // * NON NECESSARIO
    imageDetailImgEl.src = placeholderURL;

    imageDetailEl.classList.add('d-none');
};






 


 
// # FUNZIONI UTILITY
// - FUNZIONE CHE MOSTRA LO SPINNER DEL CARICAMENTO
/**
 * Funzione che mostra lo spinner del caricamento
 */
const showSpinnerOverlayEl = () => {
    spinnerOverlayEl.classList.remove('d-none');
};



// - FUNZIONE CHE NASCONDE LO SPINNER DEL CARICAMENTO
/**
 * Funzione che mostra lo spinner del caricamento
 */
const hideSpinnerOverlayEl = () => {
    spinnerOverlayEl.classList.add('d-none');
};






 


 
// # DA ESEGUIRE ONLOAD
// * CARICO LE CARD SUL TABELLONE AL CARICAMENTO DELLA PAGINA
loadCards(apiUri);