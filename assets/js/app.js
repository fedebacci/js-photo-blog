// COMMENTO NORMALE
// ! COMMENTO ERRORE
// ? COMMENTO DOMANDA
// * COMMENTO HIGHLIGHT
// # COMMENTO WARNING
// - COMMENTO TEXT
// todo COMMENTO TODO






 


 
// # COSTANTI NOTE
// * URL DA UTILIZZARE PER LA RICHIESTA
// const apiUri = 'https://jsonplaceholder.typicode.com/';
const apiUri = 'https://lanciweb.github.io/demo/api/pictures/';
// * URL DA UTILIZZARE PER L'IMMAGINE PLACEHOLDER
const placeholderURL = "./assets/img/image-placeholder.png";
// * APPOGGIO PER ARRAY DI CARDS RICEVUTO DALL'API DA UTILIZZARE PER GENERARE LE CARDS (popolato in loadCards(apiUri))
let cardsDataArr = [];





// # DA ESEGUIRE ONLOAD
// * CARICO LE CARD SUL TABELLONE AL CARICAMENTO DELLA PAGINA
const init = (apiUri) => {
    loadCards(apiUri);
};





init(apiUri);