<template>
  <div>
    <h2>My Workspaces</h2>
    <b-list-group>
      <WorkspaceEntry
        v-for="workspace in workspaces"
        :key="workspace.code"
        :workspace="workspace">
      </WorkspaceEntry>
      <b-list-group-item :to="`new`" variant='primary'>Create A New Workspace!</b-list-group-item>
    </b-list-group>
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
  async created() {
    if (this.$store.getters('user/isTokenExpired')) {
      await this.$store.dispatch('user/refreshToken');
    }
  },
  async mounted() {
    try {
      const workspaceList = await api.get('user/workspaces', {
        headers: { Authorization: `Bearer ${this.$store.state.user.token}` },
      });
      this.workspaces = workspaceList.data;
    } catch (error) {
      try {
        await this.$store.dispatch('user/refreshToken');
        const workspaceList = await api.get('user/workspaces', {
          headers: { Authorization: `Bearer ${this.$store.state.user.token}` },
        });
        this.workspaces = workspaceList.data;
      } catch {
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
