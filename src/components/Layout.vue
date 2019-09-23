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
                <slot></slot>
            </a-layout-content>
            <a-layout-footer style="textAlign: center">TopList Made by MyFaith © 2019</a-layout-footer>
        </a-layout>
    </a-layout>
</template>
<script>
export default {
  props: {
    navbar: {
      type: Array
    }
  },
  data () {
    return {
      currentTitle: '',
      defaultSelectedKeys: []
    }
  },
  watch: {
    navbar (item) {
      const catId = this.$route.params.catId
      if (!catId) {
        this.defaultSelectedKeys.push(item[0].id)
        this.currentTitle = item[0].title
      } else {
        this.defaultSelectedKeys.push(catId)
        this.currentTitle = item.find(e => e.id === parseInt(catId)).title
      }
    }
  }
}
</script>

<style lang="scss">
.layout {
    .sidebar {
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
        .header {
            background: #fff;
        }
        .content {
            margin: 24px 16px 0;
            padding: 24px;
            background: #fff;
            min-height: 360px;
        }
    }
}
</style>
