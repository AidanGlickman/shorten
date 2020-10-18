<template>
  <b-form @submit="onSubmit">
    <b-form-group
      id="user-group"
      label="Username"
      label-for="user-input"
      description="use either your username or email."
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
      id="remember-group"
      label="Remember Me"
      label-for="remember-check"
    >
    <b-form-checkbox
      id="remember-check"
      v-model="user.remember"
      name="checkbox-1"
      value="true"
      unchecked-value=""
      switch
    >
    </b-form-checkbox>
    </b-form-group>
    <b-button type="submit" variant="primary">Submit</b-button>
  </b-form>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      user: {
        username: '',
        password: '',
        remember: '',
      },
    };
  },
  methods: {
    async onSubmit(evt) {
      evt.preventDefault();
      const loggedIn = await this.$store.dispatch('user/login', this.user);
      console.log(loggedIn);
      if (loggedIn.success) {
        this.$router.push('/me');
      } else {
        this.$bvToast.toast(loggedIn.data, {
          title: 'Login Failed',
          variant: 'danger',
          autoHideDelay: 5000,
          appendToast: 'append',
        });
        this.user.password = '';
        this.remember = '';
      }
    },
  },
};
</script>

<style>

</style>
