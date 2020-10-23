<template>
  <div>
    <WorkspaceEntry
      context="full"
      :origWorkspace="workspaceData"
      type="existing"
      @updated="getInfo"
      @updated-code="updateCode"
      :key="workspaceData.code"
    >
    </WorkspaceEntry>
    <h2>Links:</h2>
    <LinkCardContainer
      :links="links"
      :workspaceCode="workspaceData.code"
      @update="getInfo"
    ></LinkCardContainer>
  </div>
</template>

<script>
import api from '@/lib/api';
import LinkCardContainer from '@/components/edit/LinkCardContainer.vue';
import WorkspaceEntry from '@/components/me/WorkspaceEntry.vue';

export default {
  name: 'Edit',
  data() {
    return {
      workspaceData: {},
      links: [],
    };
  },
  components: {
    LinkCardContainer,
    WorkspaceEntry,
  },
  methods: {
    async getInfo() {
      try {
        const workspaceRes = await api.get(`user/workspaces/${this.$route.params.code}`);
        const { workspace, links } = workspaceRes.data;
        this.workspaceData = workspace;
        this.links = links;
      } catch (err) {
        this.$root.$bvToast.toast(err.response.data, {
          title: 'Could Not Fetch Workspace.',
          variant: 'danger',
          autoHideDelay: 5000,
          appendToast: true,
        });
        this.$router.push('/me');
      }
    },
    updateCode(newCode) {
      this.$router.push(`/edit/${newCode}`);
    },
  },
  async mounted() {
    this.getInfo();
  },
};
</script>

<style>

</style>
