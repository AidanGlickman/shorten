<template>
  <b-col xs=12 md="6" lg="4" class="mb-3">
    <b-card
      header-tag="header"
      footer-tag="footer"
    >
      <template #header>
        <b-input-group>
        <b-input-group-prepend>
          <b-button
            v-if="type !== 'new'"
            variant="danger"
            @click="deleteLink"
          ><i class="lni lni-trash"></i></b-button>
          <b-input-group-text>{{workspaceCode}}.srn.pw/</b-input-group-text>
        </b-input-group-prepend>
          <b-form-input v-model="link.code" placeholder="code">
          </b-form-input>
        </b-input-group>
      </template>

      <b-card-body>
        <b-form-input v-model="link.icon" placeholder="icon" class="mb-3">
        </b-form-input>
        <b-form-input v-model="link.link" placeholder="https://mylink.com">
        </b-form-input>
      </b-card-body>

      <template #footer>
          <b-input-group>
            <b-form-input v-model="link.name" placeholder="name">
            </b-form-input>
            <b-button type='submit' variant="success" @click="save">Save</b-button>
          </b-input-group>
      </template>
    </b-card>
  </b-col>
</template>

<script>
import api from '@/lib/api';
import '@/assets/css/LineIcons.css';

export default {
  name: 'LinkCard',
  data() {
    return {
      link: {
        code: '',
        icon: '',
        name: '',
        link: '',
      },
    };
  },
  props: {
    workspaceCode: String,
    type: String,
    origLink: Object,
  },
  methods: {
    async save(evt) {
      evt.preventDefault();
      try {
        await api.post(`link/${this.workspaceCode}/${this.type === 'new' ? 'create' : this.link.code}`,
          this.link);
        this.$root.$bvToast.toast(`${this.link.code} has been ${this.type === 'new' ? 'created' : 'updated'}`, {
          title: `Link ${this.type === 'new' ? 'Created' : 'Updated'}`,
          variant: 'success',
          autoHideDelay: 5000,
          appendToast: true,
        });
        if (this.type === 'new') {
          this.$emit('new-link');
          this.link.code = '';
          this.link.icon = '';
          this.link.name = '';
          this.link.link = '';
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
    deleteLink(evt) {
      evt.preventDefault();
      api.delete(`link/${this.workspaceCode}/${this.link.code}`);
    },
  },
  mounted() {
    this.link = this.origLink;
  },
};
</script>

<style>

</style>
