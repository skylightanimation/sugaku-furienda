<template>
    <UserAgenAccess/>
    <ContentButton/>
</template>

<script>
import ContentButton from './components/ContentButton.vue'
import UserAgenAccess from './components/UserAgenAccess.vue'

export default {
  name: 'App',
  components: {
    ContentButton,
    UserAgenAccess
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
