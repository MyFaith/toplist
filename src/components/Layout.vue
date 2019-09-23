<template>
    <a-layout class="layout">
        <a-layout-sider class="sidebar" breakpoint="lg" collapsedWidth="0">
            <div class="logo">
                <span class="title">TopList</span>
            </div>
            <a-menu theme="dark" mode="inline" :defaultSelectedKeys="defaultSelectedKeys">
                <a-menu-item @click="currentTitle = item.title" :key="item.id" v-for="item in navbar">
                    <router-link :to="`/news/${item.id}`" class="nav-text">{{ item.title }} ({{ item.sort }})</router-link>
                </a-menu-item>
            </a-menu>
        </a-layout-sider>
        <a-layout class="container">
            <a-layout-header class="header">
                <h3>{{ currentTitle }}</h3>
            </a-layout-header>
            <a-layout-content class="content">
                <Loading v-if="loading"></Loading>
                <slot></slot>
            </a-layout-content>
            <a-layout-footer class="footer">© 2019 Copyright Powered by MyFaith</a-layout-footer>
        </a-layout>
    </a-layout>
</template>
<script>
import Loading from './loading'

export default {
  components: { Loading },
  props: {
    navbar: {
      type: Array
    }
  },
  data () {
    return {
      loading: false,
      currentTitle: '',
      defaultSelectedKeys: []
    }
  },
  created () {
    this.$bus.$on('loading', (status) => {
      this.loading = status
    })
  },
  watch: {
    navbar (item) {
      const catId = this.$route.params.catId
      if (!catId) {
        this.defaultSelectedKeys.push(item[0].id)
        this.currentTitle = item[0].title
      } else {
        this.defaultSelectedKeys.push(catId)
        const currentItem = item.find(e => e.id === catId)
        if (currentItem) {
          this.currentTitle = currentItem.title
        }
      }
    }
  }
}
</script>

<style lang="scss">
.layout {
    .sidebar {
        height: 100vh;
        overflow: scroll;
        .logo {
            height: 32px;
            background: rgba(255, 255, 255, 0.2);
            margin: 16px;
            .title {
                color: #fff;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100%;
                font-size: 20px;
            }
        }
    }
    .container {
        height: 100vh;
        overflow: scroll;
        .header {
            background: #fff;
        }
        .content {
            margin: 24px 16px 0;
            padding: 24px;
            background: #fff;
            height: 100vh;
            overflow: scroll;
        }
        .footer {
            text-align: center;
            padding: 10px 50px
        }
    }
}
</style>
