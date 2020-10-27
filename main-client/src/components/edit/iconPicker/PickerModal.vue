<template>
  <b-modal v-bind="$attrs" scrollable ok-only>
    <template #modal-header>
      <b-input v-model="search" placeholder="search"></b-input>
      <b-form-checkbox-group

      ></b-form-checkbox-group>
    </template>
      <b-row class="justify-content-center">
      <b-button
        variant="outline-primary"
        v-for="icon in filteredList"
        :key="icon.name"
        class="m-1"
        :id="`${_uid}_${icon.name}`"
        @click="selectedIcon=icon.name"
        :pressed="selectedIcon === icon.name"
      >
        <i :class="`lnir lnir-32 lnir-${icon.name}`"></i>
        <b-tooltip :target="`${_uid}_${icon.name}`" triggers="hover">
          {{icon.name}}
        </b-tooltip>
      </b-button>
      </b-row>
  </b-modal>
</template>

<script>
import { categories, icons } from '@/assets/data/iconList';

export default {
  name: 'PickerModal',
  data() {
    return {
      search: '',
      selectedIcon: this.oldIcon,
      categories,
      selectedCategories: [],
    };
  },
  props: {
    oldIcon: String,
  },
  computed: {
    filteredList() {
      return icons.filter(
        (el) => el.name.toLowerCase().includes(this.search.toLowerCase()) || el.categories.join(' ').toLowerCase().includes(this.search.toLowerCase()),
      );
    },
  },
  watch: {
    selectedIcon() { this.$emit('new-icon', this.selectedIcon); },
  },
};
</script>

<style>

</style>
