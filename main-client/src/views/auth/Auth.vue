<template>
  <div>
    <b-button-group
    id="login-select"
    >
    <b-button
      v-for="option in options"
      v-bind:key="option.value"
      :to="option.value"
      :variant="option.value === state ? 'primary' : 'outline-primary'"
    >{{option.text}}</b-button>
    </b-button-group>
    <hr/>
    <Login v-if="state === 'login'"></Login>
    <Signup v-if="state === 'signup'"></Signup>
    <Forgot v-if="state === 'forgot'"></Forgot>
  </div>
</template>

<script>
import Login from '@/components/auth/Login.vue';
import Signup from '@/components/auth/Signup.vue';
import Forgot from '@/components/auth/Forgot.vue';

export default {
  name: 'auth',
  data() {
    return {
      options: [
        { text: 'Login', value: 'login' },
        { text: 'Signup', value: 'signup' },
        { text: 'Forgot', value: 'forgot' },
      ],
    };
  },
  components: {
    Login,
    Signup,
    Forgot,
  },
  computed: {
    state() { return this.$route.path.split('/')[1]; },
  },
};
</script>

<style>

</style>
