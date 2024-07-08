let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon) {
        let pokemonList = document.querySelector(".pokemon-list");

        let liElement = document.createElement("li");
        liElement.classList.add("list-group-item");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add(
            "pokemon-button",
            "btn",
            "btn-primary",
            "m-2",
            "btn-block"
        );
        button.setAttribute("data-toggle", "modal");
        button.setAttribute("data-target", "#pokemonModal");

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
                json.results.forEach(function (item) {
                    let pokemon = {
                        name: item.name,
                        detailsUrl: item.url,
                    };
                    add(pokemon);
                });
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
                item.types = details.types;
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
                    pokemon.name,
                    `Height: ${pokemon.height}m`,
                    pokemon.imageUrl
                );
            })
            .catch(function () {
                alert("Failed to load Pokémon details");
            });
    }

    function showModal(title, text, imageUrl) {
        let modalTitle = document.querySelector("#pokemonModalLabel");
        let modalBody = document.querySelector(".modal-body");

        modalTitle.innerText = title;
        modalBody.innerHTML = "";
        let contentElement = document.createElement("p");
        contentElement.innerText = text;

        let imageElement = document.createElement("img");
        imageElement.src = imageUrl;

        modalBody.appendChild(contentElement);
        modalBody.appendChild(imageElement);

        $("#pokemonModal").modal("show");
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails,
        loadList: loadList,
        loadDetails: loadDetails,
        showModal: showModal,
    };
})();

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
