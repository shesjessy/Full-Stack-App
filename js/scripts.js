let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function getAll() {
        return pokemonList;
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function addListItem(pokemon) {
        let pokemonList = document.querySelector(".pokemon-list");

        let liElement = document.createElement("li");
        liElement.classList.add(
            "col-12",
            "col-sm-6",
            "col-md-4",
            "col-lg-3",
            "mb-4"
        );

        let button = document.createElement("button");
        button.innerHTML = `<span class="pokemon-name">${capitalizeFirstLetter(
            pokemon.name
        )}</span>`;
        button.classList.add(
            "pokemon-button",
            "btn",
            "btn-primary",
            "m-2",
            "btn-block"
        );
        button.setAttribute("data-toggle", "modal");

        // Set background image for the button
        loadDetails(pokemon).then(function () {
            button.style.backgroundImage = `url(${pokemon.imageUrl})`;
            button.style.backgroundSize = "contain";
            button.style.backgroundRepeat = "no-repeat";
            button.style.backgroundPosition = "center";
            button.style.color = "white"; // Ensure text is readable
        });

        // Event listener for showing Pokémon details on button click
        button.addEventListener("click", function () {
            showDetails(pokemon);
        });

        liElement.appendChild(button);
        pokemonList.appendChild(liElement);
    }

    function loadList() {
        return fetch(apiUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                let detailPromises = json.results.map(function (item, index) {
                    let pokemon = {
                        name: item.name,
                        detailsUrl: item.url,
                        pokedexNumber: index + 1, // Add Pokédex number based on the order
                    };
                    add(pokemon);
                    return loadDetails(pokemon); // Load details here
                });

                return Promise.all(detailPromises);
            })
            .then(function () {
                renderPokemonList(); // Render list after loading all details
            })
            .catch(function (e) {
                alert("Failed to load Pokémon data");
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
                item.imageUrl = details.sprites.front_default;
                item.height = details.height;
                item.weight = details.weight; // Added weight
                item.types = details.types.map(
                    (typeInfo) => typeInfo.type.name
                ); // Extract types
                item.abilities = details.abilities.map(
                    (abilityInfo) => abilityInfo.ability.name
                ); // Extract abilities
            })
            .catch(function (e) {
                console.error(e);
                throw e;
            });
    }

    function showDetails(pokemon) {
        loadDetails(pokemon)
            .then(function () {
                showModal(
                    capitalizeFirstLetter(pokemon.name),
                    `Height: ${pokemon.height}m`,
                    `Weight: ${pokemon.weight}kg`,
                    `Type: ${pokemon.types.join(", ")}`,
                    `Abilities: ${pokemon.abilities.join(", ")}`,
                    pokemon.imageUrl
                );
            })
            .catch(function () {
                alert("Failed to load Pokémon details");
            });
    }

    function showModal(title, height, weight, type, abilities, imageUrl) {
        let modalTitle = document.querySelector("#pokemonModalLabel");
        let modalBody = document.querySelector(".modal-body");

        modalTitle.innerText = title;
        modalBody.innerHTML = "";

        let heightElement = document.createElement("p");
        heightElement.innerText = height;

        let weightElement = document.createElement("p");
        weightElement.innerText = weight;

        let typeElement = document.createElement("p");
        typeElement.innerText = type;

        let abilitiesElement = document.createElement("p");
        abilitiesElement.innerText = abilities;

        let imageElement = document.createElement("img");
        imageElement.src = imageUrl;

        modalBody.appendChild(heightElement);
        modalBody.appendChild(weightElement);
        modalBody.appendChild(typeElement);
        modalBody.appendChild(abilitiesElement);
        modalBody.appendChild(imageElement);

        $("#pokemonModal").modal("show");
    }

    function sortPokemon(criteria) {
        if (criteria === "name-asc") {
            pokemonList.sort((a, b) => a.name.localeCompare(b.name));
        } else if (criteria === "name-desc") {
            pokemonList.sort((a, b) => b.name.localeCompare(a.name));
        } else if (criteria === "pokedex") {
            pokemonList.sort((a, b) => a.pokedexNumber - b.pokedexNumber);
        }
        renderPokemonList();
    }

    function renderPokemonList() {
        let pokemonListElement = document.querySelector(".pokemon-list");
        pokemonListElement.innerHTML = ""; // Clear existing list
        pokemonList.forEach(function (pokemon) {
            addListItem(pokemon);
        });
    }

    document
        .getElementById("sort-options")
        .addEventListener("change", function () {
            let sortCriteria = this.value;
            sortPokemon(sortCriteria);
        });

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails,
        loadList: loadList,
        loadDetails: loadDetails,
        showModal: showModal,
        sortPokemon: sortPokemon,
        renderPokemonList: renderPokemonList,
    };
})();

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
