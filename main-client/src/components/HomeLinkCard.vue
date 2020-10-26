<template>
  <b-col xs=12 md="6" lg="3" class="mb-3 text-center">
    <router-link :to="code">
      <b-card header-tag="header" footer-tag="footer">
        <template #header>
          srn.pw/{{code}}
        </template>

        <b-card-body>
          <i :class="`lnir lnir-32 lnir-${icon}`"></i>
        </b-card-body>

        <template #footer>
          {{name}}
        </template>
      </b-card>
    </router-link>
  </b-col>
</template>

<script>
import '@/assets/css/LineIcons.css';

export default {
  name: 'HomeLinkCard',
  props: {
    code: String,
    icon: String,
    name: String,
  },
};
</script>

<style>
</style>
