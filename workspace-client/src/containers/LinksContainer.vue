<template>
  <b-row class="justify-content-md-center">
    <LinkCard
      v-for='link in links'
      :link='link'
      :key='link.id'
      :workspaceCode="workspaceCode"
    ></LinkCard>
  </b-row>
</template>

<script>
import LinkCard from '@/components/LinkCard.vue';

export default {
  name: 'LinksContainer',
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
