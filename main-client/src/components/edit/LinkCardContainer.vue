<template>
  <b-row>
      <LinkCard
        :workspaceCode="workspaceCode"
        key="newLink"
        :origLink="{icon: 'link'}"
        type="new"
        @update="$emit('update')"
      ></LinkCard>
      <LinkCard
        v-for="link in links"
        :key="link.id"
        :origLink="link"
        :workspaceCode="workspaceCode"
        type="existing"
        @update="$emit('update')"
      ></LinkCard>
  </b-row>
</template>

<script>
import LinkCard from './LinkCard.vue';

export default {
  name: 'LinkCardContainer',
  components: {
    LinkCard,
  },
  props: {
    links: Array,
    workspaceCode: String,
  },
};
</script>

<style>

</style>
