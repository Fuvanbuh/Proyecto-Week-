'use strict'

const searchInput = document.getElementById('search-but')
searchInput.addEventListener('click', search)

let res;
async function callApi() {

    let llamada =  await fetch ('https://raw.githubusercontent.com/ngryman/lol-champions/master/champions.json')
    res = await llamada.json()
    //return res;
}

callApi();


function search (event){
    let valInput = document.getElementById('name-champ')
    const searchResult = res.find(element => element.id === valInput.value.toLowerCase());
    const contChamp = document.getElementById('backCamp')
    console.log(contChamp)
    contChamp.innerHTML = `<section id="contai-champ" class="res-champions"> <img class="img-cham"  src='${searchResult.icon}' alt="">
    <div class="text-cent">
    <h3>${searchResult.title}</h3>
    <h2>${searchResult.name}</h2>
           <p  class="tipo">${searchResult.tags[0]}
           ${searchResult.tags[1] ? `- ${searchResult.tags[1]}`: ''}
           </p>
           <p>${searchResult.description}</p> </section></div>`
    console.log(res)
    
}

