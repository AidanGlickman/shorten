<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-container>
      <b-navbar-brand href="#">srn.pw</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

          <template v-if="!isLoggedIn">
            <b-nav-item to="login">Login</b-nav-item>
            <b-nav-item to="signup">Signup</b-nav-item>
          </template>
          <template v-else>
            <b-nav-item to="me">Me</b-nav-item>
          </template>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script>
export default {
  name: 'Navbar',
  computed: {
    isLoggedIn() { return this.$store.getters['user/isLoggedIn']; },
  },
};
</script>

<style>

</style>
