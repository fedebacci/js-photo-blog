// # COSTANTI NOTE
const settings = {
    animationType: 'center',
    galleryType: 'pinboard',
};
// ! DEBUG
// const settings = {
//     animationType: 'pin',
//     galleryType: 'free-carousel',
// };





// # ELEMENTI DEL DOM CON CUI INTERAGIRE
const inputAnimationType = document.getElementById('inputAnimationType');
// console.debug('inputAnimationType', inputAnimationType);
const inputGalleryType = document.getElementById('inputGalleryType');
// console.debug('inputGalleryType', inputGalleryType);





// # DA ESEGUIRE ONLOAD
inputAnimationType.value = settings.animationType;
inputGalleryType.value = settings.galleryType;





// # LISTENER DI EVENTI
inputAnimationType.addEventListener('change', (e) => {
    setAnimationType(e.target.value);
});



inputGalleryType.addEventListener('change', (e) => {
    setGalleryType(e.target.value);
});






// # FUNZIONI PER LA GESTIONE DELLE IMPOSTAZIONI (COMPRENDONO ANCHE MANIPOLAZIONE DEL DOM)
// * FUNZIONI PER LA GESTIONE DELL'ANIMAZIONE (COMPRENDONO ANCHE MANIPOLAZIONE DEL DOM)
const setAnimationType = (animationType = 'center') => {
    // console.info(`Era: ${settings.animationType}`);
    // console.info(`Cambiato in: ${animationType}`);
    
    settings.animationType = animationType;

    let transformOriginString = '';
    if (animationType === 'center') {
        transformOriginString = setAnimationTypeCenter();
    } else {
        transformOriginString = setAnimationTypePin();
    };

    cardsElArr.forEach(cardEl => {
        // console.debug("transformOriginString", transformOriginString);
        cardEl.style.transformOrigin = transformOriginString;
    });
};



const setAnimationTypeCenter = () => {
    // console.info(`setAnimationTypeCenter`);

    return 'center center';
};



const setAnimationTypePin = () => {
    // console.info(`setAnimationTypePin`);

    const examplePin = document.querySelector('.card-pin');
    // console.debug(`setAnimationTypePin examplePin`, examplePin);
    // console.debug("examplePin", examplePin);
    // console.debug("examplePin.height", examplePin.height);

    return `center ${examplePin.height / 4}px`;
};





// * FUNZIONI PER LA GESTIONE DEL TIPO DI GALLERIA (COMPRENDONO ANCHE MANIPOLAZIONE DEL DOM)
const setGalleryType = (galleryType = 'pinboard') => {
    // console.info(`Era: ${settings.galleryType}`);
    // console.info(`Cambiato in: ${galleryType}`);

    settings.galleryType = galleryType;

    if (galleryType === 'pinboard') {
        setPinBoardGalleryType();
    } else {
        setFreeCarouselGalleryType();
    };
};



const setPinBoardGalleryType = () => {
    // console.info(`setPinBoardGalleryType`);

    cardsRowElement.classList.remove('free-carousel');
    cardsElArr.forEach(cardEl => {
        cardEl.parentNode.className = 'col-12 col-sm-6 col-lg-4'; // ORIGINALE
    })
    cardsRowElement.firstElementChild.classList.remove('ms-5');
    cardsRowElement.lastElementChild.classList.remove('me-5');
    cardsRowElement.parentNode.classList.add('container');
    cardsRowElement.parentNode.classList.remove('container-fluid');
};



const setFreeCarouselGalleryType = () => {
    // console.info(`setFreeCarouselGalleryType`);

    // * AGGIUNGO CLASSE CHE DETERMINA IL TIPO DI CAROSELLO SCELTO
    cardsRowElement.classList.add('free-carousel');

    // * PRENDO TUTTE LE CARD E LE USO PER RISALIRE ALLE COLONNE CORRISPONDENTI, COSI DA POTERNE MODIFICARE LA DIMENSIONE PER LE DIVERSE DIMENSIONI DELLO SCHERMO TENENDO CONTO DEL FATTO CHE ORA SONO AFFIANCATE
    cardsElArr.forEach(cardEl => {
        // console.debug(cardEl.parentNode.className);
        cardEl.parentNode.className = 'col-12 col-sm-6 col-md-5 col-lg-4 col-xl-3'; // MD E XL AGGIUNTO
    });

    // * AGGIUNGO SPAZIATURA SX E DX PER PRIMO E ULTIMO ELEMENTO DEL CAROSELLO
    cardsRowElement.firstElementChild.classList.add('ms-5');
    cardsRowElement.lastElementChild.classList.add('me-5');

    // * RIMUOVO LIMITE DI LARGHEZZA DEL CONTAINER
    cardsRowElement.parentNode.classList.remove('container');
    cardsRowElement.parentNode.classList.add('container-fluid');
};