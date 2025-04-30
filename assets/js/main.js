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
const settings = {
    animationType: 'center',
    galleryType: 'pinboard',
};





 


 
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
// console.debug('imageDetailImgEl', imageDetailImgEl);

const inputAnimationType = document.getElementById('inputAnimationType');
// console.debug('inputAnimationType', inputAnimationType);
const inputGalleryType = document.getElementById('inputGalleryType');
// console.debug('inputGalleryType', inputGalleryType);






 


 
// # LISTENER DI EVENTI
// * AGGIUNGO L'EVENTO AL PULSANTE CHE CHIUDE IL DETTAGLIO DELL'IMMAGINE, INVOCANDO LA FUNZIONE hideImageDetail(e.target.dataset.cardId, e.target.dataset.url) 
// * LE PASSO COME PARAMETRI L'URL DELL'IMMAGINE DA REINSERIRE E L'ID DELLA CARD IN CUI REINSERIRE L'IMMAGINE
    // - RICHIAMA LA FUNZIONE hideImageDetail(e.target.dataset.cardId, e.target.dataset.url) CHE CHIUDE LA PREVIEW RESETTANDO (anche se non necessario) L'URL DEL DETTAGLIO E RIMETTENDO L'IMMAGINE ORIGINALE AL POSTO DEL PLACEHOLDER 
imageDetailCloseButton.addEventListener('click', (e) => {
    // console.debug(e.target);
    // console.debug("e.target.dataset.cardId", e.target.dataset.cardId);
    // console.debug("e.target.dataset.url", e.target.dataset.url);

    hideImageDetail(e.target.dataset.cardId, e.target.dataset.url);
});


inputAnimationType.value = settings.animationType;
inputAnimationType.addEventListener('change', (e) => {
    // e.preventDefault();
    setAnimationType(e.target.value);
});
inputGalleryType.value = settings.galleryType;
inputGalleryType.addEventListener('change', (e) => {
    // e.preventDefault();
    setGalleryType(e.target.value);
});






 


 
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

            generateCardsRow(cardsDataArr);
        })
        .catch (error=> {
            console.error("ERRORE:", error);
        })
        .finally(() => {
            hideSpinnerOverlayEl();
        });
};



// - FUNZIONE CHE RICEVE LE INFORMAZIONI DI TUTTE LE CARD RICEVUTE DALLA RICHIESTA E FA DUE COSE: GENERA L'HTML DI TUTTE LE CARD E POI SETTA I LISTENER DI EVENTI SULLE CARDS GENERATE
    // - RICHIAMA LA FUNZIONE generateCardsRowHTML CHE RICEVE LE INFORMAZIONI OTTENUTE DALLA RICHIESTA E GENERA L'HTML DI TUTTE LE CARDS RICEVUTE
    // - RICHIAMA LA FUNZIONE setCardsEventListeners CHE CERCA TUTTE LE CARD GENERATE E SETTA L'EVENT LISTENER DEL CLICK
/**
 * Funzione che riceve l'array contenente le informazioni di tutte le card ricevute dalla richiesta e richiama due funzioni: 
 * generateCardsRowHTML(cardsDataArr) genera l'html di tutte le card e poi setta I listener di eventi sulle cards generate
 * setCardsEventListeners() imposta i listener del click delle cards
 * @param {Array<object>} cardsDataArr Array di cards ricevuto dalla risposta 
 */
const generateCardsRow = (cardsDataArr) => {
    generateCardsRowHTML(cardsDataArr);
    setCardsEventListeners();
    setAnimationType(settings.animationType);
};



// - FUNZIONE CHE RICEVE DA generateCardsRowHTML LE INFORMAZIONI DI TUTTE LE CARD RICEVUTE DALLA RICHIESTA E CICLA L'ARRAY PER GENERARE L'HTML DI TUTTE LE CARD, CHE INFINE INSERISCE IN PAGINA.
    // - RICHIAMA LA FUNZIONE generateCardColumn CHE OTTIENE I DATI DI UNA SINGOLA CARD ALL'INTERNO DEL CICLO DELLA RISPOSTA, GENERA L'HTML E LO AGGIUNGE A QUELLO PRECEDENTEMENTE GENERATO.
/**
 * Funzione che riceve da generateCardsRowHTML le informazioni di tutte le card ricevute dalla richiesta e cicla l'array per generare, tramite la funzione generateCardColumn(cardData), l'html di tutte le card, che infine inserisce in pagina.
 * @param {Array<object>} cardsDataArr Array di cards ricevuto nella risposta ottenuta dall'API per cui dobbiamo generare le cards sul tabellone
 */
const generateCardsRowHTML = (cardsDataArr) => {
    let cardsRowHTML = '';
    cardsDataArr.forEach(cardData => {
        const newHTML = generateCardColumn(cardData);
        // console.debug(newHTML);
        
        cardsRowHTML += newHTML;
        // console.debug(cardsRowHTML);
    });
    // console.debug(cardsRowHTML);

    cardsRowElement.innerHTML = cardsRowHTML;
};



// - FUNZIONE CHE CERCA TUTTE LE CARD GENERATE E AGGIUNGE L'EVENT LISTENER PER  IL CLICK PER APRIRE IL DETTAGLIO DELL'IMMAGINE
    // - Solo al click DELL'ELEMENTO: RICHIAMA LA FUNZIONE showImageDetail CHE MOSTRA IL DETTAGLIO DELL'IMMAGINE CLICCATA E LE PASSA URL E CARDID
/**
 * Funzione che cerca tutte le card generate e aggiunge l'event listener per  il click per aprire il dettaglio dell'immagine, passando come parametri: cardId e cardToShow, ottenuti con i due diversi metodi. 
 * cardId è stato ottenuto con i data-attributes inseriti nell'HTML, 
 * cardToShow rappresenta invece il singolo oggetto di una card ottenuta dall'array ricevuto con axios
 */
const setCardsEventListeners = () => {
    const cards = cardsRowElement.querySelectorAll('.card');
    cards.forEach(cardEl => {
        cardEl.addEventListener('click', (e) => {
            // console.debug("Target: ", e.target);
            // console.debug("Evento click di: ", e.target.dataset.id);
            const cardId = parseInt(e.target.dataset.id);
            // console.debug("cardId", cardId);
            // console.debug("cardsDataArr", cardsDataArr);
            const cardToShow = cardsDataArr.find(card => card.id === cardId);
            // console.debug("cardToShow", cardToShow);
            // todo CAPIRE SE HA PIU SENSO PASSARE NELLA FUNZIONE E.TARGET E SEPARARE LE INFORMAZIONI CHE MI SERVONO LI DENTRO
            showImageDetail(cardToShow.url, cardId);
        });
    });
};



// - FUNZIONE CHE RICEVE LE INFORMAZIONI DI UNA CARD E GENERA UNA COLONNA CONTENENTE LA CARD CON LE INFORMAZIONI RICEVUTE
/**
 * Funzione che riceve un oggetto con le informazioni della card e inserisce una colonna per ogni card da aggiungere al tabellone.
 * @param {object} cardData Oggetto contenente le informazioni per generare la card. Deve avere: url: string, title: string, date: string, id: number
 */
const generateCardColumn = (cardData) => {
    // console.debug("cardData", cardData);
    
    const cardColumnEl = 
    `
        <div class="col-12 col-sm-6 col-lg-4">
            <div class="card shadow h-100" data-id="${cardData.id}">
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
            </div>
        </div>
    `;
    // console.debug("cardEl", cardEl);

    return cardColumnEl;
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

    hideCardImage(cardId);
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
    showCardImage(cardId, imageURL);
};






 
// - FUNZIONE CHE SOSTITUISCE L'URL DELL'IMMAGINE NELLA CARD SUL TABELLONE CON IL PLACEHOLDER SCELTO QUANDO QUELL'IMMAGINE È NEL DETTAGLIO
// - (Chiamata a catena al click di una card nel tabellone, il cui parametro viene dal data-attribute nella card)
/**
 * Funzione che riceve l'id della card cliccata e ne sostituisce l'immagine sul tabellone (che poi verrà mostrata nel dettaglio) con il placeholder scelto
 * @param {number} cardId Id numerico della card ricevuto da showImageDetail e utilizzato per trovare nel DOM la card alla quale sostituire l'url.
 */
const hideCardImage = (cardId) => {
    // console.debug("cardId", cardId);

    const cardImage = document.querySelector('[data-id="' + cardId + '"]').querySelector('.card-img-top');
    // console.debug("cardImage", cardImage);

    cardImage.src = placeholderURL;
};



// - FUNZIONE CHE REINSERISCE L'URL DELL'IMMAGINE NELLA CARD SUL TABELLONE AL POSTO DEL PLACEHOLDER QUANDO IL DETTAGLIO VIENE CHIUSO
// - (Chiamata a catena al click del pulsante di chiusura, il quale ci da i parametri tramite data-attributes)
/**
 * Funzione che riceve l'id della card cliccata e ne sostituisce l'immagine sul tabellone (che poi verrà mostrata nel dettaglio) con il placeholder scelto
 * @param {number} cardId Id numerico della card ricevuto da hideImageDetail e utilizzato per trovare nel DOM la card alla quale sostituire l'url.
 * @param {string} cardId URL della card ricevuto da hideImageDetail e reimpostato come url dell'immagine della card trovata.
 */
const showCardImage = (cardId, imageURL) => {
    // console.debug("cardId", cardId);
    // console.debug("imageURL", imageURL);

    const cardImage = document.querySelector('[data-id="' + cardId + '"]').querySelector('.card-img-top');
    // console.debug("cardImage", cardImage);

    cardImage.src = imageURL;
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
    // todo ? FORSE RESETTARE DATA-ATTRIBUTES DEL PULSANTE DI CHIUSURA, MA NON SAREBBE NECESSARIO

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


const setAnimationType = (animationType = 'center') => {
    // console.info(`Era: ${settings.animationType}`);
    // console.info(`Cambiato in: ${animationType}`);
    
    settings.animationType = animationType;

    const cards = cardsRowElement.querySelectorAll('.card');
    // console.debug("cards", cards);

    // let transformOriginString = 'center';
    let transformOriginString = '';
    if (animationType === 'center') {
        transformOriginString
        transformOriginString = 'center center';
    } else if (animationType === 'pin') {
        const examplePin = document.querySelector('.card-pin');
        // console.debug("examplePin", examplePin);
        // console.debug("examplePin.height", examplePin.height);
        transformOriginString = `center ${examplePin.height / 4}px`;
    } else {
        console.error("Errore");
    };

    cards.forEach(cardEl => {
        cardEl.style.transformOrigin = transformOriginString;
    });
};
const setGalleryType = (galleryType = 'pinboard') => {
    console.info(`Era: ${settings.galleryType}`);
    console.info(`Cambiato in: ${galleryType}`);

    settings.galleryType = galleryType;

    if (galleryType === 'pinboard') {
        cardsRowElement.classList.remove('free-carousel');
        const cards = cardsRowElement.querySelectorAll('.card');
        console.debug("setGalleryType free-carousel cards", cards);
        cards.forEach(cardEl => {
            cardEl.parentNode.className = 'col-12 col-sm-6 col-lg-4'; // ORIGINALE
        })
        cardsRowElement.firstElementChild.classList.remove('ms-5');
        cardsRowElement.lastElementChild.classList.remove('me-5');
        cardsRowElement.parentNode.classList.add('container');
        cardsRowElement.parentNode.classList.remove('container-fluid');
    } else if (galleryType === 'carousel') {

    }else if (galleryType === 'free-carousel') {
        // * AGGIUNGO CLASSE CHE DETERMINA IL TIPO DI CAROSELLO SCELTO
        cardsRowElement.classList.add('free-carousel');

        // * PRENDO TUTTE LE CARD E LE USO PER RISALIRE ALLE COLONNE CORRISPONDENTI, COSI DA POTERNE MODIFICARE LA DIMENSIONE PER LE DIVERSE DIMENSIONI DELLO SCHERMO TENENDO CONTO DEL FATTO CHE ORA SONO AFFIANCATE
        // console.debug("setGalleryType free-carousel cardsRowElement", cardsRowElement);
        const cards = cardsRowElement.querySelectorAll('.card');
        console.debug("setGalleryType free-carousel cards", cards);
        cards.forEach(cardEl => {
            // console.debug(cardEl.parentNode.className);
            // cardEl.parentNode.className = 'col-12 col-sm-6 col-lg-4'; // ORIGINALE
            // cardEl.parentNode.className = 'col-12 col-sm-4 col-lg-3'; // SM E LG MODIFICATO
            // cardEl.parentNode.className = 'col-12 col-sm-4 col-lg-4'; // SM MODIFICATO
            // cardEl.parentNode.className = 'col-12 col-sm-6 col-md-4'; // MD AGGIUNTO E LG RIMOSSO (SOSTITUITO DA MD, NON SERVIVA PIU)
            // cardEl.parentNode.className = 'col-12 col-sm-6 col-md-5 col-lg-4'; // MD AGGIUNTO
            cardEl.parentNode.className = 'col-12 col-sm-6 col-md-5 col-lg-4 col-xl-3'; // MD E XL AGGIUNTO
        });

        // * AGGIUNGO SPAZIATURA SX E DX PER PRIMO E ULTIMO ELEMENTO DEL CAROSELLO
        cardsRowElement.firstElementChild.classList.add('ms-5');
        cardsRowElement.lastElementChild.classList.add('me-5');

        // * RIMUOVO LIMITE DI LARGHEZZA DEL CONTAINER
        cardsRowElement.parentNode.classList.remove('container');
        cardsRowElement.parentNode.classList.add('container-fluid');
    } else {
        console.error("Errore");
    };
};




 


 
// # DA ESEGUIRE ONLOAD
// * CARICO LE CARD SUL TABELLONE AL CARICAMENTO DELLA PAGINA
loadCards(apiUri);