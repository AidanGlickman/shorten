<template>
<div>
  <code>{{this.workspace.code}}.srn.pw</code>
  <h1>{{this.workspace.title}}</h1>
  <h2>{{this.workspace.description}}</h2>
  <div v-if="this.fetched">
    <LinkCard v-for='link in this.workspace.links' :link='link' :key='link.id'></LinkCard>
  </div>
</div>
</template>

<script>
import LinkCard from '@/components/LinkCard.vue';

export default {
  name: 'WorkspaceContainer',
  props: {
    code: String,
  },
  components: {
    LinkCard,
  },
  data() {
    return {
      workspace: null,
      error: false,
      fetched: false,
    };
  },
  mounted() {
    console.log(this.code);
    this.$api.get(`workspace/${this.code}`).then((res) => {
      this.workspace = res.data.workspace;
      this.fetched = true;
    }).catch((err) => {
      this.error = err;
    });
  },
};
</script>

<style>

</style>
