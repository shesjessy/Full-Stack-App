let pokemonRepository = (function (){

let pokemonList = [
  {name: "Bulbasaur", height: 0.7, types: ['grass', 'poison']},
  {name: "Charizard", height: 1.7, types: ['fire', 'flying']},
  {name: "Jigglypuff", height: 0.5, types: ['fairy', 'normal']}
];

function add(item) {
  pokemonList.push(item);
}

function getAll() {
  return pokemonList;
}

return {
  getAll: getAll,
  add: add,
};
})();

pokemonRepository.getAll().forEach(function (pokemon) {
  document.write(pokemon.name + " (height: " + pokemon.height + ")");
  if (pokemon.height > 1.0) {
    document.write(" - Wow that's a big one!");
  }
  document.write("<br>");
});