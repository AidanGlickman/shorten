<template>
  <div>
    <h2>My Workspaces</h2>
    <b-list-group>
      <WorkspaceEntry
        v-for="workspace in workspaces"
        :key="workspace.code"
        :workspace="workspace">
      </WorkspaceEntry>
      <NewWorkspaceEntry></NewWorkspaceEntry>
    </b-list-group>
  </div>
</template>

<script>
import api from '@/lib/api';
import WorkspaceEntry from './WorkspaceEntry.vue';
import NewWorkspaceEntry from './NewWorkspaceEntry.vue';

export default {
  name: 'WorkspaceList',
  components: {
    WorkspaceEntry,
    NewWorkspaceEntry,
  },
  data() {
    return {
      workspaces: [],
    };
  },
  methods: {
    async getUserWorkspaces() {
      const workspaceList = await api.get('user/workspaces', {
        headers: { Authorization: `Bearer ${this.$store.state.user.token}` },
      });
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
