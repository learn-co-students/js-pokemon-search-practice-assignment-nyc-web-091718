document.addEventListener('DOMContentLoaded', () => {
  //YOUR CODE HERE

  let pokemonData = []
  // let ivysaur
  const pokemonDiv = document.getElementById('pokemon-container')
  const pokemonSearch = document.querySelector('#pokemon-search-input')
  // console.log(pokemonSearch)
  fetch('http://localhost:3000/pokemon', {
    method:'GET'
  }).then((responseObj) => {
    // console.log(responseObj)
    return responseObj.json()
  }).then((parsedJSON) => {
    pokemonData = parsedJSON
    pokemonDiv.innerHTML = loopThroughPkm(pokemonData)
    // console.log('pokemonData is:'+ pokemonData)
  //   return pokemonData
  // }).then(function(pokemonData) {

  //   // ivysaur = pokemonData[0]
  //   // console.log(pokemonData[0])
  //   // console.log(ivysaur.name)
  })

  const loopThroughPkm = (pokemonArray) => {
    return pokemonArray.map((pokemon) => {
      return `
      <div class="pokemon-container">
        <div style="width:230px;margin:10px;background:#fecd2f;color:#2d72fc" class="pokemon-frame">
          <h1 class="center-text">${pokemon.name}</h1>
          <div style="width:239px;margin:auto">
            <div style="width:96px;margin:auto">
              <img data-id="${pokemon.id}" data-action="flip" class="toggle-sprite" src="${pokemon.sprites.front}">
            </div>
          </div>
        </div>
      </div>
        `
      }).join('')
    }

  // debugger

  pokemonDiv.addEventListener("click",(event) => {
    let pokemonID = event.target.dataset.id
      if (event.target.dataset.action === 'flip') {
        let clickedPkm = pokemonData.find((pokemon) => {
          return pokemon.id == pokemonID
        });
        // let clicked = event.target
        // console.log(clicked)
        // console.log(clicked[`data-id`])
        (event.target.src === clickedPkm.sprites.front ?
          event.target.src = clickedPkm.sprites.back :
          event.target.src = clickedPkm.sprites.front)
      }
    })

  pokemonSearch.addEventListener('input', (event) => {
    const searchInput = event.target.value
    const filteredPkm = pokemonData.filter(pokemon => pokemon.name.includes(searchInput.toLowerCase()))
    pokemonDiv.innerHTML = loopThroughPkm(filteredPkm)
  })
  // debugger
  // const flip = function () {
  //   debugger
  //   let imgTag = this.querySelector('img')
  //   console.log()
  //   debugger
    // imgTag.src = '${data[pkm].sprites['back']'
  // }



})

// <div style="width:230px;margin:10px;background:#fecd2f;color:#2d72fc" class="pokemon-frame">
//   <h1 class="center-text">ivysaur</h1>
//   <div style="width:239px;margin:auto">
//     <div style="width:96px;margin:auto">
//       <img data-id="2" data-action="flip" class="toggle-sprite" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png">
//     </div>
//   </div>
// </div>
