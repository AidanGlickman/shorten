<template>
  <div class='row'>
    <LinkCard v-for='link in this.links' :link='link' :key='link.id'></LinkCard>
  </div>
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
  },
};
</script>

<style>
.row {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10vw;
}
</style>
