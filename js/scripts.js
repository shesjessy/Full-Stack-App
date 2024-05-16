let pokemonRepository = (function () {
    let pokemonList = [
        { name: "Bulbasaur", height: 0.7, types: ["grass", "poison"] },
        { name: "Charizard", height: 1.7, types: ["fire", "flying"] },
        { name: "Jigglypuff", height: 0.5, types: ["fairy", "normal"] },
    ];

    function add(item) {
        pokemonList.push(item);
    }

    function getAll() {
        return pokemonList;
    }

    //create function named addListItem() inside IIFE w/ parameter named pokemon
    //cut code from forEach loop, moved to addListItem() function
    function addListItem(pokemon) {
        let pokemonList = document.querySelector(".pokemon-list"); //variable assigned
        //loop block emptied
        let liElement = document.createElement("li"); //create li element
        let button = document.createElement("button"); //create button element
        button.innerText = pokemon.name; //set button innerText to pokemon's name
        button.classList.add("pokemon-button"); //added class to button
        liElement.appendChild(button); // append button to li element
        pokemonList.appendChild(liElement); // append li element to ul

        //add event listener
        button.addEventListener("click", function () {
            showDetails(pokemon);
        });
    }
})(
    //create function called showDetails()
    function showDetails(pokemon) {
        console.log(pokemon);

        return {
            getAll: getAll,
            add: add,
            addListItem: addListItem,
        };
    }
);

pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});
