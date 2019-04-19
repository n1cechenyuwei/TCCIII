<template>
  <div>环境配置单</div>
</template>

<script>
export default {
  methods: {
    router() {
      console.log(this.$route.query.id);
    }
  },
  created() {
    this.router();
  }
}
</script>
  
<style>

</style>
