<template>
  <b-form @submit="onSubmit">
    <b-form-group
      id="user-group"
      label="Username"
      label-for="user-input"
      description="use either your username or email."
      invalid-feedback="required"
      :state="!$v.user.username.$invalid"
    >
      <b-form-input
        id="user-input"
        v-model="user.username"
        required
        placeholder="username"
      ></b-form-input>
    </b-form-group>
    <b-button type="submit" variant="primary" :disabled="$v.$invalid">Reset Password</b-button>
  </b-form>
</template>

<script>
import api from '@/lib/api';
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'Forgot',
  data() {
    return {
      user: {
        username: '',
      },
    };
  },
  validations: {
    user: {
      username: {
        required,
      },
    },
  },
  methods: {
    async onSubmit(evt) {
      evt.preventDefault();
      try {
        await api.post('auth/forgot', { username: this.user.username });
        this.$root.$bvToast.toast(`If ${this.user.username} is an account a reset email will be sent with further instructions.`, {
          title: 'Password Reset Initiated.',
          variant: 'success',
          autoHideDelay: 5000,
          appendToast: true,
        });
      } catch (err) {
        this.$bvToast.toast('Please try again.', {
          title: 'Password Reset Failed.',
          variant: 'danger',
          autoHideDelay: 5000,
          appendToast: true,
        });
      }
    },
  },
};
</script>

<style>

</style>
