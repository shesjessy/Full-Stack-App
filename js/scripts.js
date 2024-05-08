let pokemonList = [
  {name: "Bulbasaur", height: 0.7, types: ['grass', 'poison']},
  {name: "Charizard", height: 1.7, types: ['fire', 'flying']},
  {name: "Jigglypuff", height: 0.5, types: ['fairy', 'normal']}
];

let pokemonRepository = (function (){
  let pokemonList = [];

  function add(pokemon) {
    pokemonList.push(pokemon);
    // adds one pokemon to the pokemonList
  }

function getAll () {
  return pokemonList;
  // returns all pokemon in the pokemonList
}

return{
  add: add,
  getAll: getAll
};

pokemonRepository.getAll().forEach(function(pokemon) {
  console.log(pokemon.name);
})});

(function() {
  pokemonList.forEach(function(pokemon) {
      document.write(pokemon.name + ' (height: ' + pokemon.height + ')');
      if (pokemon.height > 1.0){
          document.write(" - Wow, that's a big one!");
      }
  });
})();
