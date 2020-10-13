<template>
  <div>
    <b-form-radio-group
    id="login-select"
    v-model="signup"
    :options="options"
    button-variant="outline-primary"
    buttons
    ></b-form-radio-group>
    <Login v-if="signup === 'login'"></Login>
  </div>
</template>

<script>
import Login from '@/components/auth/Login.vue';

export default {
  name: 'auth',
  data() {
    return {
      signup: 'login',
      options: [
        { text: 'Login', value: 'login' },
        { text: 'Signup', value: 'signup' },
      ],
    };
  },
  components: {
    Login,
  },
};
</script>

<style>

</style>
