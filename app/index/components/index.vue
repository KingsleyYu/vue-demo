<style>
body {
  font: Helvetica, sans-serif;
  color: #999;
}
.logo {
  width: 40px;
  height: 40px;
}
</style>

<template>
  <div>
    <h1>{{msg}}</h1>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Hello from another module!'
    }
  }
}
</script>