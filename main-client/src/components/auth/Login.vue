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
        v-model="login.user"
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
        v-model="login.pass"
        type="password"
        required
        placeholder="password"
      ></b-form-input>
    </b-form-group>
    <b-button type="submit" variant="primary">Submit</b-button>
  </b-form>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      login: {
        user: '',
        pass: '',
      },
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
    },
  },
};
</script>

<style>

</style>
