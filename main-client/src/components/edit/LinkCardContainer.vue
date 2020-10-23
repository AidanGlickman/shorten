<template>
  <b-row>
      <LinkCard
        :workspaceCode="workspaceCode"
        :origLink="{}"
        type="new"
        @new-link="$emit('new-link')"
      ></LinkCard>
      <LinkCard
        v-for="link in links"
        :key="link.id"
        :origLink="link"
        :workspaceCode="workspaceCode"
        type="existing"
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
