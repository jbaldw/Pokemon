import { createStore } from 'vuex'

export default createStore({
  state: {
    pokemonCount: 898,
    loadedCount: 0,
    pokemon: [],
    pokemonToRender: [],
    pokemonParty: [],
    currPokemon: 1,
  },
  mutations: {
    setPokemonCount(state, number) {
      state.pokemonCount = number
    },

    incrementLoaded(state) {
      state.loadedCount++
    },

    decrementLoaded(state) {
      state.loadedCount--
    },

    addPokemon(state, pokemon) {
      state.pokemon = pokemon
    },

    addRender(state, pokemon) {
      state.pokemonToRender = pokemon
    },

    setCurrPokemon(state, number) {
      state.currPokemon = number
    },

    addToParty(state, pokemon) {
      if(state.pokemonParty.length < 6) {
        state.pokemonParty.push(pokemon)
      }
    },

    clearParty(state) {
      state.pokemonParty = []
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
    },

    getCurrPokemon: state => {
      return state.currPokemon
    },

    getPokemonParty: state => {
      return state.pokemonParty
    },
  }
})
