let pokemonList = [
  {name: "Bulbasaur", height: 0.7, types: ['grass', 'poison']},
  {name: "Charizard", height: 1.7, types: ['fire', 'flying']},
  {name: "Jigglypuff", height: 0.5, types: ['fairy', 'normal']}
];

//Use document.write() 
//for example, “Bulbasaur (height: 7)”

//check if the height is above a certain value
//if yes= "Wow, that's big!"
//set up the conditional so that only one Pokémon has the label “Wow, that’s big!”
//example: “Bulbasaur (height: 7) - Wow, that’s big!”

pokemonList.forEach(function(pokemon) {
document.write(pokemon.name + ' (height: ' + pokemon.height + ')');
if (pokemon.height > 1.0){
document.write (" - Wow, that's a big one!");
}});