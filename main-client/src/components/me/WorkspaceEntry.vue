<template>
  <b-col
    xs=12
    :md="context === 'full' ? '12' : '6'"
    :lg="context === 'full' ? '12' : '4'"
    class="mb-3"
  >
    <b-card header-tag="header" footer-tag="footer">
      <template #header>
        <b-form @submit="updateWorkspace">
          <b-input-group>
            <b-input-group-prepend>
            <b-button
              v-if="type !== 'new'"
              variant="danger"
              @click="deleteWorkspace"
            ><i class="lnir lnir-trash"></i></b-button>
          </b-input-group-prepend>

            <b-form-input
              v-model="workspace.code"
              placeholder="code"
              :state="(type === 'new' || !$v.workspace.code.$invalid) ? null : false"
              ></b-form-input>

            <b-input-group-append>
              <b-input-group-text>.srn.pw</b-input-group-text>
            </b-input-group-append>
          </b-input-group>
        </b-form>
      </template>
      <b-card-body>
        <b-form-input v-model="workspace.title" placeholder="title" class="mb-3">
        </b-form-input>
        <b-form-textarea
          v-model="workspace.description"
          placeholder="description"
          rows="3"
          no-resize
          class="mb-3"
        ></b-form-textarea>
        <b-input-group>
          <b-input-group-prepend is-text>
            <input type="checkbox" v-model="workspace.private">
          </b-input-group-prepend>
          <b-form-input
            v-model="workspace.password"
            placeholder="password"
            :type="viewPass ? 'text' : 'password'"
            :disabled="!workspace.private"
          ></b-form-input>
          <b-input-group-append>
            <b-button
              variant="info"
              @click="togglePass"
            ><i :class="`lnir lnir-emoji-${passVariant}`"></i></b-button>
          </b-input-group-append>
        </b-input-group>
      </b-card-body>
      <template #footer>
        <b-row v-if="type === 'new'" class="justify-content-md-center">
          <b-button variant="success" @click="updateWorkspace" class="mr-3">Create</b-button>
        </b-row>
        <b-row v-else class="justify-content-md-center">
          <b-button
            variant="success"
            @click="updateWorkspace"
            class="mr-3"
            :disabled="$v.$invalid"
          >Save</b-button>
          <b-button variant="info" :href="`https://${workspace.code}.srn.pw/`" target="_blank" class="mr-3">Preview</b-button>
          <b-button
            v-if="context !== 'full'"
            variant="warning"
            :to="`/edit/${workspace.code}`"
            class="mr-3"
          >Edit</b-button>
        </b-row>
      </template>
    </b-card>
  </b-col>
</template>

<script>
import api from '@/lib/api';
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'WorkspaceEntry',
  data() {
    return {
      workspace: {
        code: '',
        title: '',
        description: '',
        private: false,
        password: '',
      },
      viewPass: false,
    };
  },
  validations: {
    workspace: {
      code: {
        required,
      },
    },
  },
  computed: {
    passVariant() { return (this.viewPass ? 'smile' : 'cool'); },
  },
  props: {
    origWorkspace: Object,
    type: String,
    context: String,
  },
  methods: {
    async deleteWorkspace() {
      try {
        await api.delete(`workspace/${this.origWorkspace.code}`);
        this.$emit('updated');
        this.$root.$bvToast.toast(`Successfully deleted ${this.workspace.code}`, {
          title: 'Workspace Deleted',
          variant: 'success',
          autoHideDelay: 5000,
          appendToast: true,
        });
      } catch (err) {
        this.$root.$bvToast.toast(`Failed to delete ${this.workspace.code}`, {
          title: 'Workspace Deletion Failed',
          variant: 'danger',
          autoHideDelay: 5000,
          appendToast: true,
        });
        this.$emit('updated');
      }
    },
    async updateWorkspace(evt) {
      evt.preventDefault();
      try {
        await api.post(`workspace/${this.type === 'new' ? 'create' : `${this.origWorkspace.code}`}`,
          this.workspace);

        this.$root.$bvToast.toast(`${this.workspace.code} has been ${this.type === 'new' ? 'created' : 'updated'}`, {
          title: `Workspace ${this.type === 'new' ? 'Created' : 'Updated'}`,
          variant: 'success',
          autoHideDelay: 5000,
          appendToast: true,
        });
        if (this.workspace.code !== this.origWorkspace.code && this.context === 'full') {
          this.$emit('updated-code', this.workspace.code);
        }
        this.$emit('updated');
        if (this.type === 'new') {
          this.workspace.code = '';
          this.workspace.title = '';
          this.workspace.description = '';
          this.workspace.private = false;
          this.workspace.password = '';
        }
      } catch (err) {
        this.$bvToast.toast(err.response.data, {
          title: 'Saving failed.',
          variant: 'danger',
          autoHideDelay: 5000,
          appendToast: true,
        });
      }
    },
    togglePass() {
      this.viewPass = !this.viewPass;
    },
  },
  mounted() {
    this.workspace = { ...this.origWorkspace };
  },
};
</script>

<style>

</style>
