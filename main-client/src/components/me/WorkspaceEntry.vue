<template>
  <b-list-group-item :to="`edit/${workspace.code}`">
    <strong>{{workspace.code}}</strong> | {{workspace.title}}
  </b-list-group-item>
</template>

<script>
export default {
  name: 'WorkspaceEntry',
  props: {
    workspace: Object,
  },
};
</script>

<style>

</style>
