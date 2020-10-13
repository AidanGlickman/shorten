<template>
  <div>
    <code>{{ this.code }}.srn.pw</code>
    <div v-if="this.workspace">
      <h1>{{ this.workspace.title }}</h1>
      <h2>{{ this.workspace.description }}</h2>
      <LinksContainer
        v-if="this.fetched"
        :links="this.workspace.links"
      ></LinksContainer>
    </div>
    <div v-if="this.error">
      {{ this.error }}
    </div>
  </div>
</template>

<script>
import LinksContainer from '@/containers/LinksContainer.vue';

export default {
  name: 'WorkspaceContainer',
  props: {
    code: String,
  },
  components: {
    LinksContainer,
  },
  data() {
    return {
      workspace: null,
      error: false,
      fetched: false,
    };
  },
  mounted() {
    document.title = `${this.code} on srn.pw`;
    this.$api
      .get(`workspace/${this.code}`)
      .then((res) => {
        this.workspace = res.data.workspace;
        this.fetched = true;
      })
      .catch((err) => {
        console.log(err.response);
        this.error = err.response.data;
      });
  },
};
</script>

<style>
</style>
