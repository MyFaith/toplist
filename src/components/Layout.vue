<template>
    <a-layout class="layout">
        <a-layout-sider class="sidebar" breakpoint="lg" collapsedWidth="0">
            <div class="logo">
                <span class="title">TopList</span>
            </div>
            <a-menu theme="dark" mode="inline" :defaultSelectedKeys="defaultSelectedKeys">
                <a-menu-item @click="currentTitle = item.title" :key="item.id" v-for="item in categoryList">
                    <router-link :to="`/news/${item.id}`" class="nav-text">{{ item.title }} ({{ item.sort }})</router-link>
                </a-menu-item>
            </a-menu>
        </a-layout-sider>
        <a-layout class="container">
            <a-layout-header class="header">
                <h3>{{ currentTitle }}</h3>
                <a-button @click="isShowSettings = true" type="primary" shape="circle" icon="setting"></a-button>
            </a-layout-header>
            <a-layout-content class="content">
                <Loading v-if="loading"/>
                <slot></slot>
            </a-layout-content>
            <a-layout-footer class="footer">© 2019 Copyright Powered by MyFaith</a-layout-footer>
        </a-layout>
        <a-modal title="设置" okText="保存" cancelText="取消" v-model="isShowSettings" @ok="saveSettings">
            <Settings ref="settings"/>
        </a-modal>
    </a-layout>
</template>
<script>
import Loading from './Loading'
import Settings from './Settings'

export default {
  components: { Loading, Settings },
  data () {
    return {
      isShowSettings: false,
      loading: false,
      currentTitle: '',
      defaultSelectedKeys: [],
      categoryList: []
    }
  },
  created () {
    this.getCategoryList()
    this.$bus.$on('loading', (status) => {
      this.loading = status
    })
  },
  methods: {
    saveSettings (e) {
      const categoryList = this.$refs.settings._data.categoryList
      if (categoryList) {
        window.localStorage.setItem('categoryList', JSON.stringify(categoryList))
        this.$message.success('保存成功,刷新后生效!')
        this.isShowSettings = false
      }
    },
    getCategoryList () {
      const catId = this.$route.params.catId
      const categoryStorage = window.localStorage.getItem('categoryList')
      if (categoryStorage) {
        this.categoryList = JSON.parse(categoryStorage)
      }
      if (!catId) {
        this.defaultSelectedKeys.push(this.categoryList[0].id)
        this.currentTitle = this.categoryList[0].title
      } else {
        this.defaultSelectedKeys.push(catId)
        const currentItem = this.categoryList.find(e => e.id === catId)
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
            display: flex;
            justify-content: space-between;
            align-items: center;
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
