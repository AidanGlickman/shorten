<template>
  <div class="text-center">
    <h1 class="mb-3">Welcome to srn.pw!</h1>
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
          code="register"
          icon="add-files"
          name="Register"
        ></HomeLinkCard>
      </template>
    </b-row>
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
