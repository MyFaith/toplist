<template>
    <div class="news">
        <a-list :dataSource="newsList" v-if="imageIdList.includes(catId)">
            <a-list-item slot="renderItem" slot-scope="item">
                <img style="max-width: 100%;" :src="item.url" />
            </a-list-item>
        </a-list>
        <a-list itemLayout="horizontal" :dataSource="newsList" v-else>
            <a-list-item slot="renderItem" slot-scope="item">
                <a-list-item-meta :description="item.desc">
                    <a slot="title" target="_blank" :href="item.url">{{ item.title }}</a>
                    <!-- <a-avatar slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /> -->
                </a-list-item-meta>
            </a-list-item>
        </a-list>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    catId: {
      type: String
    }
  },
  data () {
    return {
      imageIdList: ['135', '136'],
      newsList: [],
      id: this.catId
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.id = to.params.catId
    this.getNews()
    next()
  },
  mounted () {
    this.getNews()
  },
  methods: {
    async getNews () {
      this.newsList = []
      this.$bus.$emit('loading', true)
      const res = await axios.get(
        'https://www.printf520.com:8080/GetTypeInfo?id=' + this.id
      )
      this.newsList = res.data.Data
      this.$bus.$emit('loading', false)
    }
  }
}
</script>

<style lang="scss">
.ant-list-item-meta-title {
    a {
        font-size: 16px;
    }
}
.ant-list-item-meta-description {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
}
</style>
