document.addEventListener('DOMContentLoaded', () => {

const url = "http://localhost:3000/pokemon"
const container = document.getElementById('pokemon-container')
const searchField = document.querySelector('#pokemon-search-input')
let pokemonCards;

fetch(url, {
  method: 'GET'
}).then(function(responseObj){
  return responseObj.json()
}).then(function(parsedJSON){
  pokemonCards = parsedJSON
  appendCardsToDom(pokemonCards)
  return 'pokemon coming'
});

function appendCardsToDom(pokemonCards) {
  container.innerHTML = ''
  for (let i in pokemonCards){
    const cardDiv = document.createElement('div')
    cardDiv.innerHTML = `<div class="pokemon-container">
      <div style="width:230px;margin:10px;background:#fecd2f;color:#2d72fc" class="pokemon-frame">
        <h1 class="center-text">${pokemonCards[i].name}</h1>
        <div style="width:239px;margin:auto">
          <div style="width:96px;margin:auto">
            <img data-id="${pokemonCards[i].id}" data-action="flip" class="toggle-sprite" src="${pokemonCards[i].sprites.front}">
          </div>
        </div>
      </div>
    </div>`
    container.appendChild(cardDiv)
  }
}

const handleSearch = function (event) {
  const searchValue = event.target.value

  const filteredPokemonCards = pokemonCards.filter(function (pokemon) {
    return pokemon.name.includes(searchValue.toLowerCase())
  })
  appendCardsToDom(filteredPokemonCards)
}

searchField.addEventListener('input', function (event) { handleSearch (event) })


const handleCardClick = (event) => {

  // data-action="flip" which comes from the card html above will == event.target.dataset.action
  if (event.target.dataset.action === 'flip') {
    // data-id="${pokemonCards[i].id}" which comes from the card html above will == event.target.dataset.id
    const clickedPokemonCard = pokemonCards.find(function (pokemon) { return pokemon.id == event.target.dataset.id })
    event.target.src = (event.target.src === clickedPokemonCard.sprites.front ? clickedPokemonCard.sprites.back : clickedPokemonCard.sprites.front)
  }
}

container.addEventListener('click', (event) => handleCardClick(event))

})//end of document
