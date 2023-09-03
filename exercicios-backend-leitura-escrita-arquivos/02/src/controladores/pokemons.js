const { listarPokemons, detalharPokemon } = require("utils-playground");

const getPokemons = async (req, res) => {
    const pokemons = await listarPokemons();
    res.json(pokemons.results);
}

const getPokemon = async (req, res) => {
    const { nome } = req.params;

    try {
        const pokemon = await detalharPokemon(nome);

        const detalhesPokemon = {
            id: pokemon.id,
            name: pokemon.name,
            height: pokemon.height,
            weight: pokemon.weight,
            base: pokemon.base,
            _experience: pokemon._experience,
            forms: pokemon.forms,
            abilities: pokemon.abilities,
            species: pokemon.species
        };

        return res.json(detalhesPokemon);
    } catch (erro) {
        return res.status(404).json(`Erro: ${erro.message}`);
    }

}

module.exports = {
    getPokemons,
    getPokemon
}
