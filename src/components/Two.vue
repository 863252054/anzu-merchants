<template>
  <div>
    <p>我是第二个子组件</p>
<!--    <button @click="getName">获取共享数据</button>-->
  </div>
</template>

<script>
export default {
  name: 'One',
  methods: {
    getName () {
      console.log(this.$store.state.name)
    }
  }
}
</script>
<style scoped>
p{
  /*background: skyblue;*/
}
</style>
