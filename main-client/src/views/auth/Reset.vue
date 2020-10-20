<template>
  <div>
    Reset your password for {{user.email}}.
    <b-form @submit="onSubmit">
      <b-form-group
        id="pass-group"
        label="Password"
        label-for="pass-input"
      >
        <b-form-input
          id="pass-input"
          v-model="user.password"
          type="password"
          required
          placeholder="password"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="pass-confirm-group"
        label="Confirm Password"
        label-for="pass-confirm-input"
      >
        <b-form-input
          id="pass-confirm-input"
          v-model="user.passwordConfirm"
          type="password"
          required
          placeholder="password"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary" :disabled="$v.$invalid">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode';
import api from '@/lib/api';
import { required, sameAs } from 'vuelidate/lib/validators';

export default {
  name: 'Reset',
  data() {
    return {
      user: {
        password: '',
        passwordConfirm: '',
        token: '',
      },
    };
  },
  validations: {
    user: {
      password: {
        required,
      },
      passwordConfirm: {
        required,
        sameAsPass: sameAs('password'),
      },
    },
  },
  methods: {
    async onSubmit(evt) {
      evt.preventDefault();
      try {
        await api.post('/auth/reset', { token: this.user.token, password: this.user.password });
        this.$root.$bvToast.toast('Please login', {
          title: 'Password Reset Success!',
          variant: 'success',
          autoHideDelay: 5000,
          appendToast: true,
        });
        this.$router.push('login');
      } catch (err) {
        this.$bvToast.toast(err.response.data, {
          title: 'Password Reset Failed',
          variant: 'danger',
          autoHideDelay: 5000,
          appendToast: true,
        });
        this.password = '';
      }
    },
  },
  created() {
    this.user.token = this.$route.query.token;
    this.user.email = jwtDecode(this.user.token).data.email;
  },
};

</script>

<style>

</style>
