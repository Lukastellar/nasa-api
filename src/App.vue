<template>
  <nav id="nav" class="flex flex-col w-full justify-center items-center mt-3">
    <div class="routers mb-2">
      <router-link @click="navMenuToggle()" :class="{active: isActive}" to="/apod">apod</router-link>
      <router-link @click="navMenuToggle()" :class="{active: isActive}" to="/calculator">calc</router-link>
    </div>
    <div class="theme-options flex flex-wrap items-center gap-x-2">
      <button @click="changeTheme($event.target.id)" id="default"></button>
      <button @click="changeTheme($event.target.id)" id="theme-1"></button>
      <button @click="changeTheme($event.target.id)" id="theme-2"></button>
      <button @click="changeTheme($event.target.id)" id="theme-3"></button>
    </div>
  </nav>
  <router-view></router-view>
</template>

<script>
import Apod from '@/views/Apod.vue'

export default {
  components: {

  },
  data(){
    return {
      isActive: false
    }
  },
  methods: {
    changeTheme(id){
      $('main').attr('data-theme', id)
    },
    navMenuToggle(){
      this.isActive = !this.isActive
    }
  },
}
</script>
<style lang="scss">
  @import '@/main.scss';
</style>

<style scoped>

</style>