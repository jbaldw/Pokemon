<template>
<div id="main-wrapper">
<SearchBar id="search"></SearchBar>
  <div id="pokemon-wrapper">
    <div id="party-container" class="ui three stackable link cards">
      <PokemonCard v-for="i in (6 - getPokemonParty.length)" v-bind:key="i"
                   v-bind:pokemonNumber="0"
                   v-bind:curr="false"
                   v-bind:party="true" @load="alert('loaded')">
      </PokemonCard>

      <PokemonCard v-for="pokemon in getPokemonParty" v-bind:key="pokemon"
                   v-bind:pokemonNumber="pokemon"
                   v-bind:curr="false"
                   v-bind:party="true">
      </PokemonCard>
    
      <div class="button-container clear-button">
        <button v-show="getPokemonParty.length > 0" class="ui button" @click="clearParty">Clear Party</button>
        <button v-show="getPokemonParty.length == 0" class="ui button" disabled>Clear Party</button>
      </div>
    </div>

    <div id="pokemon-container" class="ui three stackable link cards">
      <img id="loading" v-if="!imgsAreLoaded" src="/loading/loading.gif">

      <span id="results-span" v-show="noResults">No Pokemon found! Please search again</span>

      <PokemonCard v-for="pokemon in pokemonToRender" v-bind:key="pokemon" 
                   v-show="imgsAreLoaded" 
                   v-bind:pokemonNumber="getPokemonNumber(pokemon.url)"
                   v-bind:curr="false"
                   v-bind:party="false"
                   v-on:click="updateCurrCard(getPokemonNumber(pokemon.url))">
      </PokemonCard>
    </div>
    
    <div id="curr-container" class="ui one stackable cards">
      <img id="loading" v-if="!imgsAreLoaded" src="/loading/loading.gif">

      <PokemonCard v-bind:pokemonNumber="currCard"
                   v-bind:curr="true"
                   v-bind:party="false"
                   v-show="imgsAreLoaded">
      </PokemonCard>

      <div class="button-container add-button" v-if="imgsAreLoaded">
        <button v-show="getPokemonParty.length < 6" class="ui button" @click="addToParty(this.$store.getters.getCurrPokemon)">Add to Party</button>
        <button v-show="getPokemonParty.length == 6" class="ui button" disabled>Add to Party</button>
      </div>
    </div>
  </div>
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
    },

    currCard: function() {
      return this.$store.getters.getCurrPokemon;
    },

    imgsAreLoaded: function() {
      return this.$store.getters.getLoadedCount == this.$store.getters.getRender.length
    },

    noResults: function() {
      return this.$store.getters.getRender.length == 0
    },

    getPokemonParty: function() {
      return this.$store.getters.getPokemonParty
    },
  },

  methods: {
    getPokemonNumber: function(pokemon){
      return String(pokemon).match(/\d+.*?(\d+)/)[1];
    },

    updateCurrCard: function(number) {
      this.$store.commit('setCurrPokemon', number);
      this.$forceUpdate();
    },

    addToParty: function(pokemon) {
      this.$store.commit('addToParty', pokemon)
    },

    clearParty: function() {
      this.$store.commit('clearParty')
    }
  },

  beforeCreate() {
    this.$store.commit('addPokemon', data.results.map(pokemon => ({name: pokemon.name, url: pokemon.url})))
    this.$store.commit('addRender', this.$store.getters.getPokemon)
  },
}
</script>

<style scoped>
#pokemon-wrapper {
  display: flex;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
}

#loading {
  transform:scale(0.3, 0.3);
}

#results-span {
  width: 500px;
  height: 600px;
  text-align: center;
}

#party-container {
  background-color: #f7f7f7;
  width: 500px;
  height: 600px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  border-radius: 10px;
}

#pokemon-container {
  background-color: #f7f7f7;
  width: 500px;
  height: 600px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  border-radius: 10px;
  overflow: hidden;
  overflow-y: scroll;
}

#curr-container {
  background-color: #f7f7f7;
  width: 500px;
  height: 600px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 10px;
}

.button-container {
  margin-left: auto;
  margin-right: auto;
  align-items: center;
}

.add-button {
  position: relative;
  bottom: 225px;
}
</style>
