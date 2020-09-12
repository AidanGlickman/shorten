<template>
  <div>Welcome to the {{$route.params.workspace}} workspace</div>
</template>

<script>
export default {
  name: "Workspace",
  components: {},
  mounted() {
    history.pushState({}, this.$route.params.workspace, "/");
  },
};
</script>

<style>
</style>