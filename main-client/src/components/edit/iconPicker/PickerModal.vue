<template>
  <b-modal v-bind="$attrs">

  </b-modal>
</template>

<script>
import iconList from '@/assets/data/iconList';

export default {
  name: 'PickerModal',
  computed: {
    filteredList() {
      return iconList.filter(
        (search) => search.toLowerCase().includes(search.toLowerCase()),
      );
    },
  },
};
</script>

<style>

</style>
