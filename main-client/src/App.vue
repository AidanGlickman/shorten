<template>
  <div id="app">
    <Navbar></Navbar>
    <b-container>
      <router-view />
    </b-container>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar,
  },
  created() {
    this.$store.dispatch('user/refreshToken');
  },
};
</script>

<style>
</style>
