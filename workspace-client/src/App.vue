<template>
  <div id="app">
    <b-container>
      <WorkspaceContainer :code='this.workspaceCode'></WorkspaceContainer>
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
