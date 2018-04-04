<template>
  <div class="notfind">
    <h1>Page not Find!</h1>
    <h2>你就不能输入个名字？</h2>
  </div>
</template>

<script>
export default {
  name: 'notfind',
  data () {
    return {
    }
  },
  mounted: function () {
    setInterval(() => {
      this.$router.push('/')
    }, 1500)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  .notfind
    text-align center
</style>
