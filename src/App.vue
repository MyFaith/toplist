<template>
    <div id="app">
        <Layout v-if="navbarList" :navbar="navbarList">
            <router-view />
        </Layout>
    </div>
</template>

<script>
import axios from 'axios'
import Layout from './components/Layout'

export default {
  components: { Layout },
  data () {
    return {
      navbarList: []
    }
  },
  created () {
    this.getCategory()
  },
  methods: {
    async getCategory () {
      const res = await axios.get('https://www.printf520.com:8080/GetType')
      if (res.data.Code === 0) {
        this.navbarList = res.data.Data
      }
    }
  }
}
</script>

<style lang="scss">
</style>
