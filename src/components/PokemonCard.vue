<template>
<div v-if="dataIsLoaded" class="card" v-bind:class="pokemonColor">
  <div class="image">
    <img v-bind:src="pokemonImage">
  </div>
  <div class="content">
    <div class="header">{{ pokemonName }}</div>
    <div class="meta">
      <a>#{{ pokemonNumber }}</a>
    </div>
  </div>
  <div class="extra content">
    <span class="right floated">
      {{ pokemonType }}
    </span>
  </div>
</div>
</template>

<script>
import axios from "axios"
import typeTable from "../data/types.js"

export default {
  data() {
    return {
      publicPath: process.env.BASE_URL,
      individualPokemonData: null,
      loaded: false,
    }
  },

  props: ['pokemonNumber'],

  computed: {
    dataIsLoaded: function() {
      return this.individualPokemonData !== null;
    },

    pokemonImage: function() {
      return this.individualPokemonData.sprites.front_default;
    },

    pokemonName: function() {
      return capitalize(this.individualPokemonData.name);
    },

    pokemonType: function() {
      let typeData = this.individualPokemonData.types;

      if(typeData.length > 1)
      {
        return capitalize(`${typeData[0].type.name}/${capitalize(typeData[1].type.name)}`);
      }

      return capitalize(typeData[0].type.name);
      
    },

    pokemonColor: function() {
      return typeTable[this.individualPokemonData.types[0].type.name];
    }
  },

  beforeCreate() {
    axios.defaults.baseURL = this.publicPath;
    axios.get(`/pokemon-list/${this.pokemonNumber}.json`).then((response) => (this.individualPokemonData = response.data));
  },
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
</script>

<style scoped>
.card {
  transform:scale(0.5, 0.5);
}
</style>
