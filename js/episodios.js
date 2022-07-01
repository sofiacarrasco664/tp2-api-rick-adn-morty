'use strict';

window.addEventListener('offline', event =>{
    console.log('Estoy Offline');
})

window.addEventListener('online', event =>{
    console.log('Estoy online');
})

if(!navigator.online){
    console.log('Estoy sin conexión');
}

/**  */

const button = document.getElementById('sendButton');
const inputElement = document.getElementById('search');
let episodios = [];
const resultDiv = document.getElementById('lista');
const divPreLoad = document.getElementById('pre-load');

divPreLoad.innerHTML = `
<h1>Episodios Rick and Morty</h1>
<p> Empieza a buscar los episodios de tu serie favorita</p>
`;

const getEpisodios = (episodio) => `query {
    episodes (filter: {name: "${episodio}"}){
      info {
        count
      }
      results {
        id
        name
        air_date
        characters{
            name
            image
          }
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
            query: getEpisodios(valorDeInput)
        })
    }

    fetch('https://rickandmortyapi.com/graphql', options)
    .then(function (response){
        console.log('response cruda', response);

        return response.json();
    }).then(function(json){
        console.log(json.data.episodes.results);
        episodios = json.data.episodes.results;

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
            mostrarData(episodios);
        }
        
    })
    .catch(function (err){
        console.log('Algo fallo', err);
    })
});



function mostrarData() {
    let card = '';
    let nombre = "";
    let estreno = "";
    let id = "";


    if(0 < episodios.length) {

        console.log('tenemos array', episodios);

        for (let i = 0;i < episodios.length; i++){

            nombre = episodios[i].name;
            estreno = episodios[i].air_date;
            id = episodios[i].id;
            card += `
            <li class="episodios">
            <div>
  <div>
    <div class="card">
      <div class="card-body">
        <h2 class="card-title">${episodios[i].name}</h2>
        <p class="card-text">Personajes: </p>
        <p class="card-text">Episodio n° ${episodios[i].id} </p>
        <p class="card-text">${episodios[i].air_date}</p>
      </div>
    </div>
  </div>
            </li>`;
    
        }
        resultDiv.innerHTML = `<ul>${card}</ul>`;
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

}
