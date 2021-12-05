<template>
<SearchBar id="search"></SearchBar>

<div id="pokemon-container" class="ui three stackable link cards">
  <PokemonCard v-for="pokemon in pokemonToRender" v-bind:key="pokemon" 
               v-bind:pokemonNumber="getPokemonNumber(pokemon.url)">
  </PokemonCard>
</div>
</template>

<script>
import PokemonCard from "./components/PokemonCard.vue"
import SearchBar from "./components/SearchBar.vue"
import data from "../data/pokemon.json"

export default {
  components: {
    PokemonCard,
    SearchBar,
  },

  data() {
    return {
      data: data,
    }
  },

  computed: {
    pokemonToRender: function() {
      return this.$store.getters.getRender;
    }
  },

  methods: {
    getPokemonNumber: function(pokemon){
      return String(pokemon).match(/\d+.*?(\d+)/)[1];
    },
  },

  beforeCreate() {
    this.$store.commit('addPokemon', data.results.map(pokemon => ({name: pokemon.name, url: pokemon.url})))
    this.$store.commit('addRender', this.$store.getters.getPokemon)
  },
}
</script>

<style>
#pokemon-container {
  background-color: #f7f7f7;
  max-width: 500px;
  max-height: 600px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  border-radius: 10px;
  overflow: hidden;
  overflow-y: scroll;
}
</style>
