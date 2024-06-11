let pokemonRepository = (function () {
    let pokemonList = []; // List to store Pokémon
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150"; // API URL to fetch Pokémon data
    let modalContainer = document.querySelector("#modal-container"); // Modal container element

    // Function to add a Pokémon to the list
    function add(item) {
        pokemonList.push(item);
    }

    // Function to get all Pokémon from the list
    function getAll() {
        return pokemonList;
    }

    // Function to add a Pokémon to the DOM as a list item
    function addListItem(pokemon) {
        let pokemonList = document.querySelector(".pokemon-list");
        let liElement = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("pokemon-button");
        liElement.appendChild(button);
        pokemonList.appendChild(liElement);

        // Event listener to show details on button click
        button.addEventListener("click", function () {
            showDetails(pokemon);
        });
    }

    // Function to show Pokémon details in a modal
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(
                pokemon.name,
                `Height: ${pokemon.height}m`,
                pokemon.imageUrl
            );
        });
    }

    // Function to load the list of Pokémon from the API
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

    // Function to load details of a specific Pokémon from the API
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (details) {
                // Add details to the Pokémon item
                item.imageUrl = details.sprites.front_default;
                item.height = details.height;
                item.types = details.types;
            })
            .catch(function (e) {
                console.error(e);
            });
    }

    // Function to show the modal with Pokémon details
    function showModal(title, text, imageUrl) {
        modalContainer.innerHTML = ""; // Clear existing content
        let modal = document.createElement("div");
        modal.classList.add("modal");

        let closeButtonElement = document.createElement("button");
        closeButtonElement.classList.add("modal-close");
        closeButtonElement.innerText = "Close";
        closeButtonElement.addEventListener("click", hideModal);

        let titleElement = document.createElement("h1");
        titleElement.innerText = title;

        let contentElement = document.createElement("p");
        contentElement.innerText = text;

        let imageElement = document.createElement("img"); // Create image element
        imageElement.src = imageUrl; // Set image source

        // Append elements to the modal
        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modal.appendChild(imageElement);
        modalContainer.appendChild(modal);

        // Show the modal
        modalContainer.classList.add("is-visible");
    }

    // Function to hide the modal
    function hideModal() {
        modalContainer.classList.remove("is-visible");
    }

    // Event listener to hide modal on Escape key press
    window.addEventListener("keydown", (e) => {
        if (
            e.key === "Escape" &&
            modalContainer.classList.contains("is-visible")
        ) {
            hideModal();
        }
    });

    // Event listener to hide modal on click outside the modal content
    modalContainer.addEventListener("click", (e) => {
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });

    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        showDetails: showDetails,
        loadList: loadList,
        loadDetails: loadDetails,
        showModal: showModal,
        hideModal: hideModal,
    };
})();

// Load the list of Pokémon and add to the DOM
pokemonRepository.loadList().then(function () {
    let allPokemon = pokemonRepository.getAll();
    allPokemon.forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});

// Event listener to show a sample modal when the "Show modal" button is clicked
document.querySelector("#show-modal").addEventListener("click", () => {
    pokemonRepository.showModal("Modal title", "This is the modal content!");
});
