<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      log: '',
    };
  },
  methods: {
    callback(response) {
        this.log = response;
        this.loginGoogle()
    },

    loginGoogle() {
        this.$emit('loginGoogle', this.log)
    }
  },
};
</script>

<template>
  <GoogleLogin :callback="callback" prompt />
</template>
