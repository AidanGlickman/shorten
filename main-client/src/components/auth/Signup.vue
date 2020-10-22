<template>
  <b-form @submit="onSubmit">
        <b-form-group
      id="email-group"
      label="Email"
      label-for="email-input"
    >
      <b-form-input
        id="email-input"
        v-model="user.email"
        required
        placeholder="me@email.com"
      ></b-form-input>
    </b-form-group>
    <b-form-group
      id="user-group"
      label="Username"
      label-for="user-input"
    >
      <b-form-input
        id="user-input"
        v-model="user.username"
        required
        placeholder="username"
      ></b-form-input>
    </b-form-group>
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
    <b-button
      type="submit"
      variant="primary"
      :disabled="$v.$invalid || !user.verified"
    >Submit</b-button>
    <vue-recaptcha
      :sitekey="recaptchaSite"
      :loadRecaptchaScript="true"
      @verify="onVerify"
      @expired="onExpire"
    >
    </vue-recaptcha>
  </b-form>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha';
import { required, email, sameAs } from 'vuelidate/lib/validators';
import api from '@/lib/api';

export default {
  name: 'Signup',
  data() {
    return {
      user: {
        username: '',
        email: '',
        password: '',
        passwordConfirm: '',
        verified: false,
      },
      recaptchaSite: '',
    };
  },
  components: { VueRecaptcha },
  validations: {
    user: {
      username: {
        required,
      },
      email: {
        email,
        required,
      },
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
        const registration = await api.post('/auth/register', { email: this.user.email, username: this.user.username, password: this.user.password });
        this.$root.$bvToast.toast(`Please check ${registration.data.user.email} to confirm your account`, {
          title: 'Signup Success!',
          variant: 'success',
          autoHideDelay: 5000,
          appendToast: true,
        });
        this.$router.push('');
      } catch (err) {
        this.$bvToast.toast(err.response.data, {
          title: 'Signup Failed',
          variant: 'danger',
          autoHideDelay: 5000,
          appendToast: true,
        });
        this.password = '';
        this.passwordConfirm = '';
      }
    },
    onVerify() {
      this.user.verified = true;
    },
    onExpire() {
      this.user.verified = false;
    },
  },
  created() {
    this.recaptchaSite = process.env.VUE_APP_GRECAPTCHA_SITE;
  },
};
</script>

<style>

</style>
