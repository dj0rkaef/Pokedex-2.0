// Arquivo JavaScript para a lógica da página Pokedex
// Inclua a lógica para renderizar os Pokemons selecionados pelo usuário na Pokedex

// Função para renderizar cards dos Pokemons na página Pokedex
function renderPokedexCards(pokedexData) {
    const container = document.getElementById('pokedexContainer');

    // Limpa o conteúdo existente no container
    container.innerHTML = '';

    // Itera sobre os dados dos Pokemons na Pokedex e cria os cards
    pokedexData.forEach(pokemon => {
        const card = document.createElement('div');
        card.classList.add('pokemon-card');

        // Adiciona a imagem do Pokemon
        const img = document.createElement('img');
        img.src = pokemon.imageUrl;
        img.alt = pokemon.name;
        card.appendChild(img);

        // Adiciona o nome do Pokemon acima da imagem
        const name = document.createElement('p');
        name.textContent = pokemon.name;
        card.appendChild(name);

        // Adiciona os botões Remover e Detalhes dentro do card
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remover';
        removeButton.addEventListener('click', () => removeFromPokedex(pokemon));
        card.appendChild(removeButton);

        const detailsButton = document.createElement('button');
        detailsButton.textContent = 'Detalhes';
        detailsButton.addEventListener('click', () => showPokemonDetails(pokemon));
        card.appendChild(detailsButton);

        // Adiciona o card ao container
        container.appendChild(card);
    });

    // Adiciona o botão "Voltar para a Home"
    const backButton = document.getElementById('backBtn');
    backButton.addEventListener('click', () => window.location.href = 'index.html');
}

// Função para remover o Pokemon da Pokedex
function removeFromPokedex(pokemon) {
    // Recupera a lista de Pokemons da Pokedex do armazenamento local
    let pokedex = JSON.parse(localStorage.getItem('pokedex')) || [];

    // Filtra a lista para remover o Pokemon selecionado
    pokedex = pokedex.filter(p => p.name !== pokemon.name);

    // Atualiza a lista de Pokemons na Pokedex no armazenamento local
    localStorage.setItem('pokedex', JSON.stringify(pokedex));
    
    // Atualiza a renderização dos Pokemons na Pokedex
    renderPokedexCards(pokedex);

    alert(`Pokemon ${pokemon.name} removido da Pokedex.`);
}

function showPokemonDetails(pokemon) {
    // Redireciona para a página de detalhes do Pokemon
    window.location.href = `details.html?name=${pokemon.name}`;
}

// Adiciona event listeners e chama as funções necessárias
const pokedexData = JSON.parse(localStorage.getItem('pokedex')) || [];
renderPokedexCards(pokedexData);
