<template>
  <div>
    <code>{{ code }}.srn.pw</code>
    <div v-if="this.workspace">
      <h1>{{ workspace.title }}</h1>
      <h2>{{ workspace.description }}</h2>
      <LinksContainer
        :links="workspace.links"
        :workspaceCode="workspace.code"
      ></LinksContainer>
    </div>
    <PasswordModal :show="showPassModal" @privatePassword="privatePass"></PasswordModal>
  </div>
</template>

<script>
import LinksContainer from '@/containers/LinksContainer.vue';
import PasswordModal from '@/components/PasswordModal.vue';

export default {
  name: 'WorkspaceContainer',
  props: {
    code: String,
  },
  components: {
    LinksContainer,
    PasswordModal,
  },
  data() {
    return {
      workspace: null,
      showPassModal: false,
      password: '',
    };
  },
  mounted() {
    document.title = `${this.code} on srn.pw`;
    this.$api
      .get(`workspace/${this.code}`)
      .then((res) => {
        const response = res.data;
        if (response.private) {
          this.showPassModal = true;
        } else {
          this.workspace = response.workspace;
        }
      })
      .catch((err) => {
        console.log(err.response);
        this.error = err.response.data;
      });
  },
  methods: {
    async privatePass(password) {
      try {
        const workspace = await this.$api.post(`workspace/private/${this.code}`, { password });
        this.workspace = workspace.data.workspace;
        this.showPassModal = false;
      } catch (err) {
        this.$bvToast.toast(err.response.data, {
          title: 'Failed to get workspace.',
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
