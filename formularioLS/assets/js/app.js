// Variables
const listaTweets = document.querySelector('#lista-tweets');




// Event Listener

eventListeners();

function eventListeners (){
    //Cuando se envia el formulario
    document.querySelector('#formulario'). addEventListener('submit', agregarTweet);

    // Borrar Twwets
    listaTweets.addEventListener('click', borrarTweet);

    // Contenido cargado
    document.addEventListener('DOMContentLoaded', localStorageListo);

}


// Funciones
function agregarTweet (e){
    e.preventDefault();
    // Leer valor textarea
    const tweet = document.querySelector('#tweet').value;
    // Crear boton borrado
    const btnDelete = document.createElement('a');
    btnDelete.classList = 'borrar-tweet';
    btnDelete.innerText = 'X';

    // Crear elemento y añadirle el contenido a la lista
    const elementLi = document.createElement('li');
    elementLi.textContent = tweet;
    // Añade el botón de borrar al tweet
    elementLi.append(btnDelete);
    // Añade el tweet a la lista
    listaTweets.appendChild(elementLi);

    // Añadir a local storage
    agregarTweetLocalStorage(tweet);
}

// Borrar Tweet
function borrarTweet (e){
    e.preventDefault();
    if(e.target.className === 'borrar-tweet'){
        e.target.parentElement.remove();
        borrarTweetLocalStorage(e.target.parentElement.innerText);

    }

}

// Mostrar datos de local storage en la lista

function localStorageListo (){
    let tweets;

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function (tweet){
        const btnDelete = document.createElement('a');
        btnDelete.classList = 'borrar-tweet';
        btnDelete.innerText = 'X';

        // Crear elemento y añadirle el contenido a la lista
        const elementLi = document.createElement('li');
        elementLi.textContent = tweet;
        // Añade el botón de borrar al tweet
        elementLi.append(btnDelete);
        // Añade el tweet a la lista
        listaTweets.appendChild(elementLi);
    })
}

// Agregar al local Storage

function agregarTweetLocalStorage (tweet) {
    let tweets;
    tweets = obtenerTweetsLocalStorage();
    // Añadir el nuevo tweet
    tweets.push(tweet);

    localStorage.setItem('tweets', JSON.stringify(tweets))
}

// Comprobar que hay elementos en local Storage
function obtenerTweetsLocalStorage () {
    let tweets;
    // Revisamos los valores de local Storage
    if(localStorage.getItem('tweets') === null){
        tweets = [];
    }else {
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }
    return tweets;
}

function borrarTweetLocalStorage (tweet){
    let tweets, tweetBorrar;
    tweetBorrar = tweet.substring(0, tweet.length -1);

    tweets = obtenerTweetsLocalStorage();
    tweets.forEach(function (tweet,index){
        if(tweetBorrar === tweet){
            tweets.splice(index, 1);
        }
    });

    localStorage.setItem('tweets', JSON.stringify(tweets));
}
