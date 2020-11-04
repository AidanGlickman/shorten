<template>
  <div id="app">
    <b-container>
      <WorkspaceContainer :code='this.workspaceCode'></WorkspaceContainer>
      <div class="fixed-bottom footer">Make your own at <a href="https://srn.pw">srn.pw</a></div>
    </b-container>
  </div>
</template>

<script>
import WorkspaceContainer from '@/containers/WorkspaceContainer.vue';

export default {
  name: 'App',
  components: {
    WorkspaceContainer,
  },
  data() {
    return {
      workspaceCode: null,
    };
  },
  created() {
    [this.workspaceCode] = window.location.hostname.split('.');
    const [, linkCode] = window.location.pathname.split('/');
    if (linkCode !== '') {
      this.$api.get(`/link/${this.workspaceCode}/${linkCode}`).then(((res) => {
        const link = res.data;
        if (link) {
          window.location = link.link;
        } else {
          this.$bvToast.toast(`No link exists with code ${linkCode} on this workspace.`, {
            title: 'No such link.',
            variant: 'danger',
            autoHideDelay: 5000,
            appendToast: true,
          });
          window.location.pathname = '/';
        }
      }));
    }
  },
};
</script>

<style>
#app {
  text-align: center;
  margin-top: 60px;
}

.footer {
  padding-bottom: 20px;
}
</style>
