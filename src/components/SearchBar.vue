<template>
<div v-on:keyup.enter="searchPokemon" class="ui search">
  <div class="ui icon input">
    <input ref="search" class="prompt" type="text" placeholder="Search Pokemon...">
    <i class="search icon"></i>
  </div>
</div>
</template>

<script>
export default {
  methods: {
    searchPokemon: function() {
      let searchValue = this.$refs.search.value

      if(searchValue != "") {
        this.$store.commit('addRender', this.$store.getters.getPokemon.filter(pokemon => pokemon.name.startsWith(searchValue)))
      }
      else {
        this.$store.commit('addRender', this.$store.getters.getPokemon)
      }

      this.$store.commit('setPokemonCount', this.$store.getters.getRender.length)
      console.log(this.$store.getters.getPokemonCount)
    }
  }
}
</script>


<style scoped>
.search {
    text-align: center;
    margin-top: 10px;
}
</style>