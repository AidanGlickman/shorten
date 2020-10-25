<template>
  <b-navbar toggleable="lg" type="dark" variant="primary" class="mb-5">
    <b-container>
      <b-navbar-brand to="/">srn.pw</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/about">About</b-nav-item>

          <template v-if="!isLoggedIn">
            <b-nav-item to="/login">Login</b-nav-item>
            <b-nav-item to="/signup">Signup</b-nav-item>
          </template>
          <template v-else>
            <b-nav-item to="/me">Me</b-nav-item>
            <b-nav-item @click="logout">Logout</b-nav-item>
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
  methods: {
    logout() {
      this.$store.commit('user/logout');
      this.$root.$bvToast.toast('Successfully logged out', {
        title: 'Goodbye!',
        variant: 'success',
        autoHideDelay: 5000,
        appendToast: true,
      });
      this.$router.push('/');
    },
  },
};
</script>

<style>

</style>
