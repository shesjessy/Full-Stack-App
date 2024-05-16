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

    function addListItem(pokemon) {
        let pokemonList = document.querySelector(".pokemon-list");
        let liElement = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("pokemon-button");
        liElement.appendChild(button);
        pokemonList.appendChild(liElement);

        button.addEventListener("click", function () {
            showDetails(pokemon);
        });
    }

    function showDetails(pokemon) {
        console.log(pokemon);
    }

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        showDetails: showDetails,
    };
})();

pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});
