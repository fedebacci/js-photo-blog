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