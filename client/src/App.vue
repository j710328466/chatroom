<template>
  <transition name="fade">
    <div class="container">
      <router-view/>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'jmChat',
  data () {
    return {
      number: 1
    }
  }
}
</script>

<style>
ul li {
  list-style: none;
}
.container {
  position: relative;
  margin: auto;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-width: 750px!important;
}
.popup-top {
  width: 100%;
  opacity: .8;
  height: 48px;
  line-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 375px;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, .1);
}
.ml-10 {
  margin-left: 10px;
}
.mr-10 {
  margin-right: 10px;
}
.ml-40 {
  margin-left: 40px;
}
.mr-40 {
  margin-right: 40px;
}
</style>
