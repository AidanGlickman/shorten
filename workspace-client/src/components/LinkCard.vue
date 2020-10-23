<template>
  <b-col xs=12 md="6" lg="3" class="mb-3">
    <a :href="link.link">
    <b-card header-tag="header" footer-tag="footer">
      <template #header>
        {{workspaceCode}}.srn.pw/{{link.code}}
      </template>

      <b-card-body>
        <i :class="`lni lni-32 lni-${link.icon}`"></i>
        <br>
        {{link.link}}
      </b-card-body>

      <template #footer>
        {{link.name}}
      </template>
    </b-card>
    </a>
  </b-col>
</template>

<script>
import '@/assets/css/LineIcons.css';

export default {
  name: 'linkCard',
  props: {
    link: Object,
    workspaceCode: String,
  },
};
</script>

<style>
</style>
