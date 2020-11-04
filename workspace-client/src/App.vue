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
