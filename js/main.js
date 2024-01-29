let currentPage = 1;
// buscar dados dos Pokémons da API
function fetchPokemonData(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar dados dos Pokemons');
            }
            return response.json();
        })
        .then(data => {
            currentPage = data.next ? currentPage + 1 : null;
            updateNavigationButtons();
            return data.results;
        })
        .catch(error => console.error(error));
}

// Atualiza a função para buscar a próxima página de Pokemons
function fetchNextPage() {
    if (currentPage !== null) {
        const nextPageUrl = `https://pokeapi.co/api/v2/pokemon/?offset=${(currentPage - 1) * 10}&limit=10`;
        fetchPokemonData(nextPageUrl)
            .then(renderPokemonCards)
            .catch(error => console.error(error));
    }
}

// Adiciona a função para voltar para a página anterior
function goBack() {
    const previousPageUrl = `https://pokeapi.co/api/v2/pokemon/?offset=${(currentPage - 2) * 20}&limit=20`;
    fetchPokemonData(previousPageUrl)
        .then(renderPokemonCards)
        .catch(error => console.error(error));
}

// Atualiza a visibilidade dos botões de navegação
function updateNavigationButtons() {
    const backButton = document.getElementById('backBtn');
    if (currentPage > 1) {
        backButton.style.display = 'inline-block';
    } else {
        backButton.style.display = 'none';
    }
}

// Função para renderizar cards dos Pokemons na página principal
function renderPokemonCards(pokemonData) {
    const container = document.getElementById('pokemonContainer');

    container.innerHTML = '';

    // Itera sobre os dados dos Pokemons e cria os cards
    pokemonData.forEach(pokemon => {
        const card = document.createElement('div');
        card.classList.add('pokemon-card');

        // Adiciona a imagem do Pokemon
        const img = document.createElement('img');
        img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`;
        img.alt = pokemon.name;
        card.appendChild(img);

        // Adiciona o nome do Pokemon acima da imagem
        const name = document.createElement('p');
        name.textContent = pokemon.name;
        card.appendChild(name);

        // Adiciona os botões Adicionar e Detalhes dentro do card
        const addButton = document.createElement('button');
        addButton.textContent = 'Adicionar';
        addButton.addEventListener('click', () => addToPokedex(pokemon));
        card.appendChild(addButton);

        const detailsButton = document.createElement('button');
        detailsButton.textContent = 'Detalhes';
        detailsButton.addEventListener('click', () => showPokemonDetails(pokemon));
        card.appendChild(detailsButton);

        container.appendChild(card);
    });
}

// Função para adicionar o Pokemon à Pokedex
function addToPokedex(pokemon) {
    // Recupera a lista de Pokemons da Pokedex do armazenamento local
    let pokedex = JSON.parse(localStorage.getItem('pokedex')) || [];

    // Verifica se o Pokemon já está na Pokedex
    if (!pokedex.find(p => p.name === pokemon.name)) {
        // Adiciona o Pokemon à Pokedex
        pokedex.push({
            name: pokemon.name,
            imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`
        });

        // Atualiza a lista de Pokemons na Pokedex no armazenamento local
        localStorage.setItem('pokedex', JSON.stringify(pokedex));
        alert(`Pokemon ${pokemon.name} adicionado à Pokedex!`);
    } else {
        alert(`Pokemon ${pokemon.name} já está na Pokedex.`);
    }
}

// Função para mostrar os detalhes do Pokemon
function showPokemonDetails(pokemon) {
    // Redireciona para a página de detalhes do Pokemon
    window.location.href = `details.html?name=${pokemon.name}`;
}

// Adiciona event listeners e chama as funções necessárias
const apiUrl = 'https://pokeapi.co/api/v2/pokemon/';
fetchPokemonData(apiUrl)
    .then(renderPokemonCards)
    .catch(error => console.error(error));
