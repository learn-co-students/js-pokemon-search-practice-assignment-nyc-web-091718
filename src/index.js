document.addEventListener('DOMContentLoaded', () => {
  //YOUR CODE HERE
  const pokemonContainer = document.querySelector('#pokemon-container')
  // console.log(pokemonContainer)
  let pokemons = []
  const pokemonInputField = document.querySelector('#pokemon-search-input')
  console.dir(pokemonInputField)

  fetch('http://localhost:3000/pokemon', {
    method: 'GET'
  }).then(function(responseObj) {
    return responseObj.json()
  }).then(function(parsedJSON) {
    pokemons = parsedJSON
    // console.log(pokemons)
    pokemonContainer.innerHTML = appendPokemontoDom(pokemons)
  })

  const appendPokemontoDom = /*FUNCTION*/ (pokemonArray) => {
  return pokemonArray.map((pokemon) => {
    // the return value of the callback passed to map will be added to the NEW ARRAY that map creates (see the DIY map below for details)
    return `
    <div class="pokemon-container">
      <div style="width:230px;margin:10px;background:#fecd2f;color:#2d72fc" class="pokemon-frame">
        <h1 class="center-text">${pokemon.name}</h1>
        <div style="width:239px;margin:auto">
          <div style="width:96px;margin:auto">
            <img name="flip" data-id="${pokemon.id}" data-action="flip" class="toggle-sprite" src="${pokemon.sprites.front}">
          </div>
        </div>
      </div>
    </div>
    `
  }).join('') //map returns an array. we want to use a STRING to update our div's innerHTML. ['h', 'e', 'l', 'l', 'o'].join('') -> 'hello'
}

  pokemonContainer.addEventListener('click', (event) => {
    if (event.target.dataset.action === 'flip') {
      // console.log(event.target)
      const clickedPokemon = pokemons.find((pokemonObj) => {
        // console.log(event.target.dataset.id)
        return pokemonObj.id == event.target.dataset.id
        // console.dir(clickedPokemon)
      })
      event.target.src = (event.target.src === clickedPokemon.sprites.front ? clickedPokemon.sprites.back : clickedPokemon.sprites.front)

    }
  })

  pokemonInputField.addEventListener('input', (event) => {
    const userSearchTerm = event.target.value
    const filteredPokemon = pokemons.filter((pokemonObject) => {
      // pokemonObject.name -> 'charizard'
      return pokemonObject.name.includes(userSearchTerm.toLowerCase())
    })
    pokemonContainer.innerHTML = appendPokemontoDom(filteredPokemon)
  }) //end input event listener


}) // End of DOMContentLoaded
