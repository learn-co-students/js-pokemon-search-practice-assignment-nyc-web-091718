document.addEventListener('DOMContentLoaded', () => {
  let allPokemonData = []
  const pokemonDiv = document.getElementById('pokemon-container')
  const pokemonSearchInput = document.getElementById('pokemon-search-input')

  fetch('http://localhost:3000/pokemon')
  .then((responseObj) => responseObj.json())
  .then((parseJSON) => {
    allPokemonData = parseJSON
    pokemonDiv.innerHTML = appendPokemonToDom(allPokemonData)
  }) //End of Fetch



  pokemonDiv.addEventListener('click', (event) => {
    if (event.target.dataset.action === 'flip') {
      const clickedPokemon = allPokemonData.find((pokemonObject) => {
        return pokemonObject.id == event.target.dataset.id
    })
     event.target.src = (event.target.src === clickedPokemon.sprites.front ? clickedPokemon.sprites.back : clickedPokemon.sprites.front)
   }
  }) //End of Click EventListener

  pokemonSearchInput.addEventListener('input', (event) => {
    const userSearchTerm = event.target.value
    const filteredPokemon = allPokemonData.filter((pokemonObject) => {
      return pokemonObject.name.includes(userSearchTerm.toLowerCase())
    })
    pokemonDiv.innerHTML = appendPokemonToDom(filteredPokemon)
  }) //End of Input EventListener

})


function appendPokemonToDom(pokemonArray) {
  return pokemonArray.map(function(pokemon) {
    return `
    <div class="pokemon-container">
    <div style="width:230px;margin:10px;background:#fecd2f;color:#2d72fc" class="pokemon-frame">
    <h1 class="center-text">${pokemon.name}</h1>
    <div style="width:239px;margin:auto">
    <div style="width:96px;margin:auto">
    <img data-id=${pokemon.id} data-action="flip" class="toggle-sprite" src="${pokemon.sprites.front}">
    </div>
    </div>
    </div>
    </div>`
  }).join('')
}
