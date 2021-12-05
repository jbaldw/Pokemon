import { createStore } from 'vuex'

export default createStore({
  state: {
    pokemonCount: 0,
    loadedCount: 0,
    pokemon: [],
    pokemonToRender: []
  },
  mutations: {
    incrementPokemon(state) {
      state.pokemonCount++
    },

    incrementLoaded(state) {
      state.loadedCount++
    },

    addPokemon(state, pokemon) {
      state.pokemon = pokemon
    },

    addRender(state, pokemon) {
      state.pokemonToRender = pokemon
    }
  },
  actions: {
  },
  getters: {
    getPokemonCount: state => {
      return state.pokemonCount
    },

    getLoadedCount: state =>  {
      return state.loadedCount
    },

    getPokemon: state => {
      return state.pokemon
    },

    getRender: state => {
      return state.pokemonToRender
    }
  }
})
