<template>
  <b-modal
    ref="passwordModal"
    hide-footer
    no-close-on-esc
    no-close-on-backdrop
    @shown="focusPassBox"
    v-model="show"
  >
    <template #modal-header>
      This workspace is password protected.
    </template>
    <b-form @submit="onSubmit">
      <b-form-group
        label="Password:"
        label-for="passwordBox"
      >
        <b-input-group>
          <b-form-input
            ref="passwordBox"
            id="passwordBox"
            v-model="password"
            placeholder="password"
            type="password"
          ></b-form-input>
          <template #append>
            <b-button variant="success" type="submit">Submit</b-button>
          </template>
        </b-input-group>
      </b-form-group>
    </b-form>
  </b-modal>
</template>

<script>
export default {
  name: 'PasswordModal',
  props: {
    show: Boolean,
  },
  data() {
    return {
      password: '',
    };
  },
  methods: {
    focusPassBox() {
      this.$refs.passwordBox.focus();
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.$emit('privatePassword', this.password);
    },
  },
};
</script>

<style>

</style>
