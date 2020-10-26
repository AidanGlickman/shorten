<template>
  <b-col xs=12 md="6" lg="3" class="mb-3 text-center">
    <a :href="link.link">
    <b-card header-tag="header" footer-tag="footer">
      <template #header>
        {{workspaceCode}}.srn.pw/{{link.code}}
      </template>

      <b-card-body>
        <i :class="`lnir lnir-32 lnir-${link.icon}`"></i>
        <br>
        <span class="nowrap" :id="`${_uid}_linkText`">{{link.link}}</span>
        <b-popover :target="`${_uid}_linkText`" triggers="hover" placement="bottom">
          <template #title>Full Link</template>
          {{link.link}}
        </b-popover>
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
.nowrap {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
  display: inline-block;
}
</style>
