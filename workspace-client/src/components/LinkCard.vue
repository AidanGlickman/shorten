<template>
  <b-col col="4" sm="4" md="3" lg="2" class="mb-3 text-center">
    <a :href="link.link">
      <b-card header-tag="header" footer-tag="footer" :id="`${_uid}_card`" class="h-100">
        <template #header>
          {{link.name}}
        </template>

    <b-popover :target="`${_uid}_card`" triggers="hover" placement="bottom">
      <template #title><a :href="link.link">{{workspaceCode}}.srn.pw/{{link.code}}</a></template>
            <a :href="link.link">{{link.link}}</a>
    </b-popover>

        <b-card-body>
          <i :class="`lnir lnir-32 lnir-${link.icon}`"></i>
        </b-card-body>

        <template #footer>
          {{link.code}}
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
.nowrap {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
  display: inline-block;
}
</style>
