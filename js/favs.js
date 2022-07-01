'use strict';

const resultUl = document.getElementById('resultado');
const contenedorDiv = document.getElementById('main');
const avisoDiv = document.getElementById('aviso');
let eliminados = [];

const favoritos = JSON.parse(localStorage.getItem("favoritos"));

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




function mostrarData(favoritos) {
    let card = '';

        console.log('tenemos array', favoritos);

        for (let i = 0; i < favoritos.length ; i++){
            card += `
            <li id="personaje-fav">
                <div class="card">
                    <img src="${favoritos[i][0].image}" class="card-img-top" alt="Imagen del personaje '${favoritos[i][0].name}' de la serie Rick and Morty">
                <div class="card-body">
                <p class="card-text status">${favoritos[i][0].status}</p>
                    <h2 class="card-title">${favoritos[i][0].name}</h2>
                    <p class="card-text">Genero: ${favoritos[i][0].gender}</p>
                    <p class="card-text">Especie: ${favoritos[i][0].species}</p>
                </div>
                <div class="card-body">
                    <button data-id="${favoritos[i][0].id}" type="button" class="eliminar card-link">Eliminar</button>
                </div>
                </div>
            </li>`;
    
        }

        resultUl.innerHTML = `<ul>${card}</ul>`;

        let botonesEliminados = document.querySelectorAll(`.eliminar`);
        for (let boton of botonesEliminados) {
            boton.addEventListener(`click`, (e) => {  
                e.preventDefault();
                    eliminados = favoritos.filter(favorito => favorito[0].id == e.target.dataset.id);
                    console.log(eliminados);
                    eliminarFavoritosObj(eliminados)
                }
            )
        }

    }

    window.addEventListener('load', event =>{
        if(0 < favoritos.length){
            contenedorDiv.innerHTML= `
            <h1>Tus Personajes favoritos</h1>
            <p>Navega por tus personajes favoritos sin problemas </p>
            `
            mostrarData(favoritos);
        } else {
            resultUl.innerHTML = `
                <div class="aviso_mal">
                    <img src="img/Rick-borracho_con_morty.png" alt="Rick Sanchez borracho incomodando a Morty" class="img-fluid"/>
                    <h1>No tienes ningún personaje guardado</h1>
                    <p> Empieza a guardar tus personajes</p>
                </div>
                `;
        }
    })

    function eliminarFavoritosObj (eliminados) {
       favoritos.splice(0, eliminados[0][0].id);
        console.log(favoritos);
        //localStorage.setItem('favoritos', favoritos);
        mostrarData(favoritos);
    }