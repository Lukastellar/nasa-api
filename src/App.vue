<template>
    <nav id="nav" class="flex w-full justify-center">
    <router-link to="/apod">apod</router-link>
    <router-link to="/calculator">calc</router-link>
  </nav>
  <router-view />
</template>

<script>
import Apod from '@/views/Apod.vue'
export default {
  components: {

  }
}
</script>

<style scoped>
  #nav {
    position: fixed;
    top: 0;
  }
  #nav a{
    position: relative;
    color: #555;
    padding: 10px 12px;
    margin: 10px 0;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
    transition: 200ms ease-in-out;
  }
  #nav a:hover{
    color: black;
  }
  #nav a:not(:first-child):before{
    content: '';
    position: absolute;
    display: block;
    height: 100%;
    transform: scaleY(0.5);
    top: 0;
    left: -1px;
    width: 2px;
    background: #555;
  }

  #nav a:after{
    content: '';
    position: absolute;
    display: block;
    width: 50%;
    height: 2px;
    left: 25%;
    transform: scaleX(0.5);
    transition: 200ms ease-in-out;
  }
  #nav a:hover:after {
    transform: scaleX(1.1);
    background: black;
  }
</style>