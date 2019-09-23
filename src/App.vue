<template>
    <div id="app">
        <Layout>
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
      const categoryStorage = window.localStorage.getItem('categoryList')
      if (!categoryStorage) {
        const res = await axios.get('https://www.printf520.com:8080/GetType')
        this.navbarList = res.data.Data
        window.localStorage.setItem('categoryList', JSON.stringify(this.navbarList))
      } else {
        this.navbarList = JSON.parse(categoryStorage)
      }
    }
  }
}
</script>

<style lang="scss">
</style>
