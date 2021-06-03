<template>
  <div id="app">
    <p>{{ msg }}</p>
    <button @click="say">我是按钮</button>
    <One></One>
  </div>
</template>

<script>
import One from './components/One.vue'
export default {
  name: 'app',
  data: function () {
    return {
      msg: '112'
    }
  },
  methods: {
    say () {
      console.log('say')
    }
  },
  components: {
    One: One
  }
}
</script>

<style scoped>

</style>
