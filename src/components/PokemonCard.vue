<template>
<div v-if="dataIsLoaded" class="card" v-bind:class="{notCurrCard, currCard, isPartyMember}">
  <div class="image">
    <img v-bind:src="pokemonImage" @load="incrementLoaded">
  </div>
  <div class="content">
    <div class="header">{{ pokemonName }}</div>
    <div class="meta">
      <a v-if="pokemonNumber > 0">#{{ pokemonNumber }}</a>
    </div>
  </div>
  <div class="description" v-if="!notCurrCard">
    <ul>
      <li>Base Health:          {{ baseHP }}</li>
      <li>Base Attack:          {{ baseAT }}</li>
      <li>Base Defense:         {{ baseDF }}</li>
      <li>Base Special-Attack:  {{ baseSA }}</li>
      <li>Base Special-Defense: {{ baseSD }}</li>
      <li>Base Speed:           {{ baseSP }}</li>
    </ul>
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

export default {
  data() {
    return {
      publicPath: process.env.BASE_URL,
      individualPokemonData: null,
      loaded: false,
      stats: "",
      baseHP: 0,
      baseAT: 0,
      baseDF: 0,
      baseSA: 0,
      baseSD: 0,
      baseSP: 0,
    }
  },

  props: ['pokemonNumber', 'curr', 'party'],

  methods: {
    incrementLoaded: function() {
      if(!this.curr && !this.party) {
        this.$store.commit('incrementLoaded')
        console.log(this.$store.getters.getLoadedCount)
      }
    }
  },

  computed: {
    dataIsLoaded: function() {
      return this.individualPokemonData !== null
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

    pokemonMoves: function() {
      console.log('reached');
      return "";
    },

    notCurrCard: function() {
      return !this.curr;
    },

    currCard: function() {
    return this.curr;
    },

    isPartyMember: function() {
      return this.party;
    },
  },

  watch: {
    pokemonNumber: function() {
      if(this.curr) {
        axios.get(`/pokemon-list/${this.pokemonNumber}.json`).then((response) => (this.individualPokemonData = response.data, this.stats = this.individualPokemonData.stats));
      }
    },

    stats: function() {
      console.log('reached');
      if(this.curr) {
        this.baseHP = this.stats[0].base_stat;
        this.baseAT = this.stats[1].base_stat;
        this.baseDF = this.stats[2].base_stat;
        this.baseSA = this.stats[3].base_stat;
        this.baseSD = this.stats[4].base_stat;
        this.baseSP = this.stats[5].base_stat;
      }
    }
  },

  beforeCreate() {
    axios.defaults.baseURL = this.publicPath;
    axios.get(`/pokemon-list/${this.pokemonNumber}.json`).then((response) => (this.individualPokemonData = response.data));
  },

  unmounted() {
    if(!this.curr && !this.party) {
      this.$store.commit('decrementLoaded')
      console.log(this.$store.getters.getLoadedCount)
    }
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

.notCurrCard, .isPartyMember {
  max-width: 135.33px;
  max-height: 245.59px;
}

.currCard {
  position: relative;
  bottom: 90px;
}

.name, .meta, .extra, .description {
  font-size: 20px;
}
</style>
