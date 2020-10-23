<template>
  <b-list-group-item>
    <b-form @submit="onSubmit" inline>
      <b-input-group
        append=".srn.pw"
        class="mb-2 mr-sm-2 mb-sm-0"
      >
        <b-form-input
          id="workspace-code"
          v-model="code"
          required
          placeholder="code"
        >
        </b-form-input>
      </b-input-group>
      <b-input-group
        class="mb-2 mr-sm-2 mb-sm-0"
      >
        <b-form-input
          id="workspace-title"
          v-model="title"
          required
          placeholder="title"
        >
        </b-form-input>
      </b-input-group>
      <b-input-group
        class="mb-2 mr-sm-2 mb-sm-0"
      >
        <b-form-checkbox
          id="workspace-private"
          v-model="isPrivate"
          value="true"
          unchecked-value=""
        >Private?</b-form-checkbox>
      </b-input-group>
      <b-input-group
        class="mb-2 mr-sm-2 mb-sm-0"
        v-if="isPrivateBool"
      >
        <b-form-input
          id="workspace-password"
          v-model="password"
          placeholder="password"
        ></b-form-input>
      </b-input-group>
      <b-button
        type="submit"
        variant="primary"
        :disabled="$v.$invalid"
      >Create New Workspace</b-button>
    </b-form>
  </b-list-group-item>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import api from '@/lib/api';

export default {
  name: 'NewWorkspaceEntry',
  data() {
    return {
      code: '',
      title: '',
      isPrivate: '',
      password: '',
    };
  },
  validations: {
    code: {
      required,
    },
    title: {
      required,
    },
  },
  computed: {
    isPrivateBool() { return !!this.isPrivate; },
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      try {
        api.post('workspace/create', {
          code: this.code,
          title: this.title,
          description: '',
          private: this.isPrivateBool,
          password: this.password,
        }, { headers: { Authorization: `Bearer ${this.$store.state.user.token}` } });
        this.$root.$bvToast.toast(`Created workspace ${this.code}`, {
          title: 'Success!',
          variant: 'success',
          autoHideDelay: 5000,
          appendToast: true,
        });
        this.$router.push(`edit/${this.code}`);
      } catch (err) {
        this.$bvToast.toast(err.data.message, {
          title: 'Failed to create workspace',
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
