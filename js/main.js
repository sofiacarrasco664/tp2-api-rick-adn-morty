'use strict';

const button = document.getElementById('sendButton');
const inputElement = document.getElementById('search');
let personajes = [];
let episodios = [];
let favoritos = [];
let filtroFav = [];
const divPreLoad = document.getElementById('pre-load');
const resultDiv = document.getElementById('main');
const avisoDiv = document.getElementById('aviso');
let i = 0


window.addEventListener('offline', event =>{
    console.log('Estoy Offline');
    avisoDiv.innerHTML = `<p> La app esta offline </p>`;
})

window.addEventListener('online', event =>{
    console.log('Estoy online');
    avisoDiv.innerHTML = ``;
})

if(!navigator.online){
    console.log('Estoy sin conexión');
}

divPreLoad.innerHTML = `
<h1>Personajes de Rick and Morty</h1>
<p> Empieza a buscar tus personajes de tu serie favorita</p>
`;



const getCharacter = (character) => `query {
    characters(filter: { name: "${character}" }) {
      info {
        count
      }
      results {
        id
        name
        status
        species
        image
        gender
      }
      
    }
   
  }`

button.addEventListener('click', ()=>{
    const valorDeInput = inputElement.value;
    const options = {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query: getCharacter(valorDeInput)
        })
    }

    fetch('https://rickandmortyapi.com/graphql', options)
    .then(function (response){
        console.log('response cruda', response);

        return response.json();
    }).then(function(json){
        console.log(json.data.characters.results);
        personajes = json.data.characters.results;

        if(valorDeInput == "") {
            resultDiv.innerHTML = `
            <div class="aviso_mal">
            <img src="img/jerry_con_un_calcetin.png" alt="Jerry conversando con un titere de calcetin" />
            <p>Por favor ingresa un nombre</p> 
            <p>Mira bien la próxima vez ¡No seas un Jerry!</p>
            </div>
            `;
        } else if (valorDeInput == " ") {
            resultDiv.innerHTML = `
            <div class="aviso_mal">
            <img src="img/rick_sanchez_indiferente.png" alt="Rick Sanchez indiferente" class="img-fluid"/>
            <p>No encontramos resultados ¡no te asustes! </p> 
            <p>Usa la maquina del tiempo de Rick para volver al pasado y solucionarlo o simplemente usa el buscador o el menú, lo que te sea mas cómodo </p>
            </div>
            `;
        } else {
            mostrarData(personajes);
        }
        
    })
    .catch(function (err){
        console.log('Algo fallo', err);
    })
});

function mostrarData() {
    let card = '';

    if(0 < personajes.length) {

        console.log('tenemos array', personajes);

        for (;i < personajes.length; i++){
            card += `
            <li>
                <div class="card">
                    <img src="${personajes[i].image}" class="card-img-top" alt="Imagen del personaje '${personajes[i].name}' de la serie Rick and Morty">
                <div class="card-body">
                <p class="card-text status">${personajes[i].status}</p>
                    <h2 class="card-title">${personajes[i].name}</h2>
                    <p class="card-text">Genero : ${personajes[i].gender}</p>
                    <p class="card-text">Tipo de especie : ${personajes[i].species}</p>
                </div>
                <div class="card-body">
                    <button data-id="${personajes[i].id}" type="button" class="botonFav">Favorito</button>
                </div>
                </div>
            </li>`
        }
        resultDiv.innerHTML = `<ul>${card}</ul>`;
        


        let botonesFavoritos = document.querySelectorAll(`.botonFav`);
        for (let boton of botonesFavoritos) {
            boton.addEventListener(`click`, (e) => {  
                    e.preventDefault();
                    filtroFav = personajes.filter(personaje => personaje.id == e.target.dataset.id);
                    console.log(filtroFav);
                    saveFavoritosObj(filtroFav)
                }
            )
        }

    } else {
        card += `
        <div class="aviso_mal">
            <img src="img/rick_sanchez_indiferente.png" alt="Rick Sanchez indiferente" class="img-fluid"/>
            <p>No encontramos resultados ¡no te asustes! </p> 
            <p>Usa la maquina del tiempo de Rick para volver al pasado y solucionarlo o simplemente usa el buscador o el menú, lo que te sea mas cómodo </p>
            </div>
        `;


        resultDiv.innerHTML = `<ul>${card}</ul>`;
    }

    let btnVolver = document.querySelector('.volver');

    btnVolver.addEventListener('click', ()=>{
        window.location.href = window.location.href;
    })

}

function saveFavoritosObj (filtroFav) {
    favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    favoritos.push(filtroFav);
    console.log(favoritos);

    let favoritosGuardados = JSON.stringify(favoritos);
    localStorage.setItem('favoritos', favoritosGuardados);
}
  
