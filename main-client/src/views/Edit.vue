<template>
  <LinkCardContainer
    :links="links"
    :workspaceCode="workspaceData.code"
    @new-link="rerender"
  ></LinkCardContainer>
</template>

<script>
import api from '@/lib/api';
import LinkCardContainer from '@/components/edit/LinkCardContainer.vue';

export default {
  name: 'Edit',
  data() {
    return {
      workspaceData: {},
      links: [],
      containerKey: false,
    };
  },
  components: {
    LinkCardContainer,
  },
  methods: {
    rerender() {
      this.getInfo();
    },
    async getInfo() {
      try {
        const workspaceRes = await api.get(`user/workspaces/${this.$route.params.code}`);
        const { workspace, links } = workspaceRes.data;
        this.workspaceData = workspace;
        this.links = links;
      } catch (err) {
        console.log(err);
        this.$root.$bvToast.toast(err.response.data);
      }
    },
  },
  async mounted() {
    this.getInfo();
  },
};
</script>

<style>

</style>
