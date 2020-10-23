<template>
  <b-list-group>
    <WorkspaceEntry
      v-for="workspace in workspaces"
      :key="workspace.code"
      :workspace="workspace">
    </WorkspaceEntry>
    <b-list-group-item :to="`new`" variant='primary'>Create A New Workspace!</b-list-group-item>
  </b-list-group>
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
    try {
      console.log(this.$store.state.user.token);
      const workspaceList = await api.get('user/workspaces', {
        headers: { Authorization: `Bearer ${this.$store.state.user.token}` },
      });
      this.workspaces = workspaceList.data;
    } catch (error) {
      console.log(error);
      this.$bvToast.toast('Please reload the page.', {
        title: 'Something went wrong.',
        variant: 'danger',
      });
    }
  },
};
</script>

<style>

</style>
