<template>
  <div>
    <h2>My Workspaces</h2>
    <b-row>
      <WorkspaceEntry
        type="new"
        :origWorkspace="{}"
        @updated="getUserWorkspaces"
      >
      </WorkspaceEntry>
      <WorkspaceEntry
        v-for="workspace in workspaces"
        :key="workspace.code"
        :origWorkspace="workspace"
        type="existing"
        @updated="getUserWorkspaces"
      >
      </WorkspaceEntry>
    </b-row>
  </div>
</template>

<script>
import api from '@/lib/api';
import WorkspaceEntry from './WorkspaceEntry.vue';

export default {
  name: 'WorkspaceList',
  components: {
    WorkspaceEntry,
  },
  data() {
    return {
      workspaces: [],
    };
  },
  methods: {
    async getUserWorkspaces() {
      const workspaceList = await api.get('user/workspaces');
      this.workspaces = workspaceList.data;
    },
  },
  async mounted() {
    try {
      await this.getUserWorkspaces();
    } catch {
      if (!this.$store.getters('user/isLoggedIn')) {
        this.$root.$bvToast.toast('Please Log In.', {
          title: 'Session Expired.',
          variant: 'danger',
        });
        this.$router.push('/login');
      }
    }
  },
};
</script>

<style>

</style>
