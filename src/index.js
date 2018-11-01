let pokemonResp

document.addEventListener('DOMContentLoaded', () => {
  const url = "http://localhost:3000/pokemon"
  const promise = fetch(url, { method: 'GET' })
  pokemonResp
  let response = promise.then(function (responseObj) {
    console.log(responseObj);
    return responseObj.json()
  }).then(function(responseObj){
      console.log(responseObj)
      pokemonResp = responseObj
      makePokemon(pokemonResp,'')
      // WE HAVE OUR ARRAY OF POKEMON HERE
     })
  let input = document.getElementById('pokemon-search-input')
    input.addEventListener('input', () => {
        //everytime user types
        // searchPokemon(input.value)
        makePokemon(pokemonResp,input.value)
    })
  })

  function makePokemon(array,name)
  {
    const pokemonContainer = document.getElementById('pokemon-container')
    pokemonContainer.innerHTML = ""
    if (name) {
      for(const pokemon of array) {
          pokemonContainer.innerHTML += appendPokemon(pokemon)
        }
    } else {
      for(const pokemon of array) {
        if(pokemon['name'].includes(name)) {
          pokemonContainer.innerHTML += appendPokemon(pokemon)
        }
      }
    }
  }

  function flipPokemon(stuff)
{
  let foundPokemon = pokemonResp.find(function (element){
    return element['id'] == stuff.dataset['id']
  })
  if(foundPokemon['sprites']['front'] == stuff['src'])
  {
    stuff['src'] = foundPokemon['sprites']['back'];
  }
  else
  {
    stuff['src'] = foundPokemon['sprites']['front'];
  }
}
function appendPokemon(pokemon){
  return `  <div style="width:230px;margin:10px;background:#fecd2f;color:#2d72fc" class="pokemon-frame;">
      <h1 class="center-text">${pokemon['name']}</h1>
      <div style="width:239px;margin:auto">
        <div style="width:96px;margin:auto">
          <img onclick="flipPokemon(this);"data-id="${pokemon['id']}" data-action="flip" class="toggle-sprite" src="${pokemon['sprites']['front']}">
        </div>
      </div>
    </div>`
}
