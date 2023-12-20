// Função para buscar informações detalhadas do Pokemon da API
function fetchPokemonDetails(name) {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao buscar detalhes do Pokemon');
            }
            return response.json();
        })
        .catch(error => console.error(error));
}

// Função para renderizar informações detalhadas do Pokemon na página de Detalhes
function renderPokemonDetails(detailsData) {
    const container = document.getElementById('pokemonDetails');
    
    // Limpa o conteúdo existente no container
    container.innerHTML = '';

    // Adiciona as imagens do Pokemon (frente e costas)
    const frontImage = document.createElement('img');
    frontImage.src = detailsData.sprites.front_default;
    frontImage.alt = 'Imagem da frente do Pokemon';
    container.appendChild(frontImage);

    const backImage = document.createElement('img');
    backImage.src = detailsData.sprites.back_default;
    backImage.alt = 'Imagem de costas do Pokemon';
    container.appendChild(backImage);

    // Adiciona a descrição de stats do Pokemon
    const stats = document.createElement('div');
    stats.innerHTML = `
        <h2>Stats:</h2>
        <p>HP: ${detailsData.stats[0].base_stat}</p>
        <p>Attack: ${detailsData.stats[1].base_stat}</p>
        <p>Defense: ${detailsData.stats[2].base_stat}</p>
        <p>Speed: ${detailsData.stats[5].base_stat}</p>
    `;
    container.appendChild(stats);

    // Adiciona os tipos do Pokemon
    const types = document.createElement('div');
    types.innerHTML = `<h2>Tipos:</h2>`;
    detailsData.types.forEach(type => {
        types.innerHTML += `<p>${type.type.name}</p>`;
    });
    container.appendChild(types);

    // Adiciona os movimentos do Pokemon
    const moves = document.createElement('div');
    moves.innerHTML = `<h2>Movimentos:</h2>`;
    detailsData.moves.slice(0, 5).forEach(move => {
        moves.innerHTML += `<p>${move.move.name}</p>`;
    });
    container.appendChild(moves);

        // Adiciona o botão "Voltar para a Home"
        const backButton = document.getElementById('backBtn');
        backButton.addEventListener('click', () => window.location.href = 'index.html');
    
}

// Adiciona event listeners e chama as funções necessárias
const urlParams = new URLSearchParams(window.location.search);
const pokemonName = urlParams.get('name');

if (pokemonName) {
    fetchPokemonDetails(pokemonName)
        .then(renderPokemonDetails)
        .catch(error => console.error(error));
} else {
    console.error('Nome do Pokemon não fornecido.');
}
