<template>
  <div>
    <b-form-radio-group
    id="login-select"
    v-model="signup"
    :options="options"
    button-variant="outline-primary"
    buttons
    ></b-form-radio-group>
    <hr/>
    <Login v-if="signup === 'login'"></Login>
    <Signup v-if="signup === 'signup'" @success="this.signup = login"></Signup>
  </div>
</template>

<script>
import Login from '@/components/auth/Login.vue';
import Signup from '@/components/auth/Signup.vue';

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
    Signup,
  },
};
</script>

<style>

</style>
