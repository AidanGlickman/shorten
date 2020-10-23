<template>
  <b-row>
    <b-col xs=12 md="6" lg="4" class="mb-3">
      <LinkCard
        :workspaceCode="workspaceCode"
        :origLink="{}"
        type="new"
        @new-link="$emit('new-link')"
      ></LinkCard>
    </b-col>
    <b-col
      v-for="link in links"
      :key="link.id"
      xs="12"
      md="6"
      lg="4"
      class="mb-3"
    >
      <LinkCard
        :origLink="link"
        :workspaceCode="workspaceCode"
        type="existing"
      ></LinkCard>
    </b-col>
  </b-row >
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
