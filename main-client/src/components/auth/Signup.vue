<template>
  <b-form @submit="onSubmit">
    <b-form-group
      id="email-group"
      label="Email"
      label-for="email-input"
      invalid-feedback="Please enter a valid email"
      :state="!$v.user.email.$invalid"
    >
      <b-form-input
        id="email-input"
        v-model="user.email"
        required
        placeholder="me@email.com"
        :state="user.email === '' ? null : !$v.user.email.$invalid"
      ></b-form-input>
    </b-form-group>
    <b-form-group
      id="user-group"
      label="Username"
      label-for="user-input"
      invalid-feedback="Required"
      :state="!$v.user.username.$invalid"
    >
      <b-form-input
        id="user-input"
        v-model="user.username"
        required
        placeholder="username"
        :state="user.username === '' ? null : !$v.user.username.$invalid"
      ></b-form-input>
    </b-form-group>
    <b-form-group
      id="pass-group"
      label="Password"
      label-for="pass-input"
      invalid-feedback="Password must be at least 7 characters and contain at least 1 number"
      :state="!$v.user.password.$invalid"
    >
      <b-form-input
        id="pass-input"
        v-model="user.password"
        type="password"
        required
        placeholder="password"
        :state="user.password === '' ? null : !$v.user.password.$invalid"
      ></b-form-input>
    </b-form-group>
    <b-form-group
      id="pass-confirm-group"
      label="Confirm Password"
      label-for="pass-confirm-input"
      invalid-feedback="Must match above password"
      :state="!$v.user.passwordConfirm.$invalid"
    >
      <b-form-input
        id="pass-confirm-input"
        v-model="user.passwordConfirm"
        type="password"
        required
        placeholder="password"
        :state="user.passwordConfirm === '' ? null : !$v.user.passwordConfirm.$invalid"
      ></b-form-input>
    </b-form-group>
    <b-row>
      <vue-recaptcha
        sitekey="6LehitkZAAAAANvI4D5JcfoElpbiL1Yee3rVC3Vt"
        :loadRecaptchaScript="true"
        @verify="onVerify"
        @expired="onExpire"
      >
      </vue-recaptcha>
      <b-button
        type="submit"
        variant="primary"
        :disabled="$v.$invalid || !user.verified"
      >Submit</b-button>
    </b-row>
  </b-form>
</template>

<script>
import VueRecaptcha from 'vue-recaptcha';
import {
  required, email, sameAs, minLength,
} from 'vuelidate/lib/validators';
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
        minLength: minLength(7),
        oneNum: (pass) => (/\d/.test(pass)),
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
        this.$router.push('/');
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
};
</script>

<style>

</style>
