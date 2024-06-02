let pokemonRepository = (function () {
    let pokemonList = []; // Replaced the array of Pokémon objects with an empty array
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

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
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
            console.log("Details loaded for:", pokemon.name);
        });
    }

    function loadList() {
        return fetch(apiUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                json.results.forEach(function (item) {
                    let pokemon = {
                        name: item.name,
                        detailsUrl: item.url,
                    };
                    add(pokemon);
                    addListItem(pokemon);
                });
            })
            .catch(function (e) {
                console.error(e);
            });
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (details) {
                // Now we add the details to the item
                item.imageUrl = details.sprites.front_default;
                item.height = details.height;
                item.types = details.types;
            })
            .catch(function (e) {
                console.error(e);
            });
    }

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        showDetails: showDetails,
        loadList: loadList,
        loadDetails: loadDetails,
    };
})();

pokemonRepository.loadList().then(function () {
    let allPokemon = pokemonRepository.getAll();
    allPokemon.forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
