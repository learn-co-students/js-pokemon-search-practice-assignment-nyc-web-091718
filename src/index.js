let pokemonList = {};
let pokemoncontainer
document.addEventListener('DOMContentLoaded', () => {


  fetch("http://localhost:3000/pokemon").then(function(response) {return response.json()}).then(function(data){pokemonList = data; data.forEach(pokemon => makePokemonDiv(pokemon))}).then(function(){makeFlippable()})

  function makePokemonDiv(pokemon) {
    document.getElementById("pokemon-container").innerHTML += `
    <div class="pokemon-container">
    <div style="width:230px;margin:10px;background:#fecd2f;color:#2d72fc" class="pokemon-frame">
      <h1 class="center-text">${pokemon["name"]}</h1>
      <div style="width:239px;margin:auto">
        <div style="width:96px;margin:auto">
          <img data-id="${pokemon.id}" data-action="flip" class="toggle-sprite" src="${pokemon.sprites.front}">
        </div>
      </div>
    </div>
    `
  }

  function makeFlippable() {
    sprites = document.querySelectorAll('.toggle-sprite')
    for (let sprite of sprites) {
      sprite.addEventListener("click", flipPokemon)
    }
  }

  function flipPokemon() {
    console.log("TARGET:", event.target)
    let img = event.target
    let pokemonId = img.dataset.id
    let pokemon = pokemonList.find(pokemon => pokemon["id"] == pokemonId)
    img.src = (img.src == pokemon.sprites.front) ? pokemon.sprites.back : pokemon.sprites.front
  }

  document.getElementById("pokemon-search-input").addEventListener("keydown", filterPokemon)

  function filterPokemon() {
    allPokemon = document.querySelectorAll(".pokemon-container")
    term = event.target.value.toLowerCase()
    for (pokemon of allPokemon) {
      if (!pokemon.querySelector("h1").innerText.toLowerCase().includes(term)) {
        pokemon.style.display = "none"
      } else {
        pokemon.style.display = ""
      }
    }

    }

    // event.target.value = search term
    // allpokemon.foreach style += "display: none;" if name doesnt match search term



})
