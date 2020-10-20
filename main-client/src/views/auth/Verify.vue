<template>
  <div>
    <p v-if="!tried">Verifying...</p>
    <div v-if="tried">
      <p v-if="verified">Verified!</p>
      <p v-else>{{message}}</p>
    </div>
  </div>
</template>

<script>
import api from '@/lib/api';

export default {
  name: 'Verify',
  data() {
    return {
      tried: false,
      verified: false,
      message: '',
    };
  },
  async mounted() {
    try {
      await api.post('/auth/verify', { token: this.$route.query.token });
      this.$root.$bvToast.toast('Please Log in.', {
        title: 'Account Verified!',
        variant: 'success',
        autoHideDelay: 5000,
        appendToast: true,
      });
      this.$router.push('/login');
    } catch (err) {
      this.tried = true;
      this.message = err.response.data;
    }
  },
};
</script>

<style>

</style>
