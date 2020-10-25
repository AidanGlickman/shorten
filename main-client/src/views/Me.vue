<template>
  <div>
    <h1>Welcome, {{this.user.username}}</h1>
    <WorkspaceList></WorkspaceList>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import WorkspaceList from '@/components/me/WorkspaceList.vue';

export default {
  name: 'Me',
  title: 'My srn.pw',
  components: {
    WorkspaceList,
  },
  computed: {
    ...mapState({
      user: 'user',
    }),
  },
};
</script>

<style>

</style>
