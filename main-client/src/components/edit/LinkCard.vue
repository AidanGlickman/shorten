<template>
  <b-col xs=12 md="6" lg="4" class="mb-3">
    <b-card
      header-tag="header"
      footer-tag="footer"
    >
      <template #header>
        <b-form @submit="save">
          <b-input-group>
            <b-input-group-prepend>
              <b-button
                v-if="type !== 'new'"
                variant="danger"
                @click="deleteLink"
              ><i class="lnir lnir-trash"></i></b-button>
              <b-input-group-text>{{workspaceCode}}.srn.pw/</b-input-group-text>
            </b-input-group-prepend>

            <b-form-input v-model="link.code" placeholder="code">
            </b-form-input>
          </b-input-group>
        </b-form>
      </template>

      <b-card-body class="text-center">
        <!-- <b-form-input v-model="link.icon" placeholder="icon" class="mb-3">
        </b-form-input> -->
        <b-button
          variant="outline-primary"
          class="mb-3"
          @click="$bvModal.show(`${_uid}_iconPicker`)"
        >
          <i :class="`lnir lnir-32 lnir-${link.icon || 'link'}`"></i>
        </b-button>
        <PickerModal
          :id="`${_uid}_iconPicker`"
          :oldIcon="link.icon"
          @new-icon="newIcon"
        ></PickerModal>
        <b-form-input
          v-model="link.link"
          placeholder="https://mylink.com"
          :state="((type === 'new' && link.link === '') || !$v.saniLink.$invalid) ? null : false"
          >
        </b-form-input>
      </b-card-body>

      <template #footer>
        <b-form @submit="save">
          <b-input-group>
            <b-form-input v-model="link.name" placeholder="name">
            </b-form-input>
            <b-button
              type='submit'
              variant="success"
              @click="save"
              :disabled="$v.$invalid"
            >Save</b-button>
          </b-input-group>
        </b-form>
      </template>
    </b-card>
  </b-col>
</template>

<script>
import { required, url } from 'vuelidate/lib/validators';
import api from '@/lib/api';
import PickerModal from './iconPicker/PickerModal.vue';
import '@/assets/css/LineIcons.css';

export default {
  name: 'LinkCard',
  components: {
    PickerModal,
  },
  data() {
    return {
      link: {
        code: '',
        icon: '',
        name: '',
        link: '',
      },
      showPicker: false,
    };
  },
  computed: {
    saniLink() {
      if (!this.link.link) { return ''; }
      if (this.link.link.split('://').length < 2) {
        return `https://${this.link.link}`;
      } return this.link.link;
    },
  },
  props: {
    workspaceCode: String,
    type: String,
    origLink: Object,
  },
  validations: {
    link: {
      code: {
        required,
      },
      link: {
        required,
      },
    },
    saniLink: {
      url,
    },
  },
  methods: {
    newIcon(icon) {
      this.link.icon = icon;
    },
    async save(evt) {
      evt.preventDefault();
      try {
        const newLink = { ...this.link };
        newLink.link = this.saniLink;
        await api.post(`link/${this.workspaceCode}/${this.type === 'new' ? 'create' : this.origLink.code}`,
          newLink);
        this.$root.$bvToast.toast(`${this.link.code} has been ${this.type === 'new' ? 'created' : 'updated'}`, {
          title: `Link ${this.type === 'new' ? 'Created' : 'Updated'}`,
          variant: 'success',
          autoHideDelay: 5000,
          appendToast: true,
        });
        this.$emit('update');
        if (this.type === 'new') {
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
    async deleteLink(evt) {
      evt.preventDefault();
      try {
        await api.delete(`link/${this.workspaceCode}/${this.origLink.code}`);
        this.$root.$bvToast.toast(`${this.link.code} has been deleted`, {
          title: 'Link Deleted',
          variant: 'success',
          autoHideDelay: 5000,
          appendToast: true,
        });
        this.$emit('update');
      } catch (err) {
        this.$bvToast.toast(err.response.data, {
          title: 'Deleting failed.',
          variant: 'danger',
          autoHideDelay: 5000,
          appendToast: true,
        });
      }
    },
  },
  mounted() {
    this.link = { ...this.origLink };
  },
};
</script>

<style>

</style>
