<template>
  <div class="text-center">
    <h1 class="mb-3">Welcome to srn.pw! (BETA!)</h1>
    <b-row class="justify-content-md-center">
      <HomeLinkCard
        code="about"
        icon="question-circle"
        name="About srn.pw"
      ></HomeLinkCard>
      <template v-if="$store.getters['user/isLoggedIn']">
        <HomeLinkCard
          code="me"
          icon="user"
          name="My srn.pw"
        ></HomeLinkCard>
      </template>
      <template v-else>
        <HomeLinkCard
          code="login"
          icon="user"
          name="Login"
        ></HomeLinkCard>
        <HomeLinkCard
          code="signup"
          icon="add-files"
          name="Sign Up"
        ></HomeLinkCard>
      </template>
    </b-row>
    <p>Make and share custom linkbanks!</p>
  </div>
</template>

<script>
import HomeLinkCard from '@/components/HomeLinkCard.vue';

export default {
  name: 'Home',
  components: {
    HomeLinkCard,
  },
};
</script>
