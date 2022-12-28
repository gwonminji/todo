<template>
  <Todo msg="Welcome to Your Vue.js App"/>
</template>

<script>
import Todo from './components/Todo.vue'

export default {
  name: 'App',
  components: {
    Todo
  }
}
</script>
<style lang="scss">
@import "@/assets/scss/main";
</style>