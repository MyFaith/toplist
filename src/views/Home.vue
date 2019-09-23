<template>
    <div class="news">
        <a-list itemLayout="horizontal" :dataSource="newsList">
            <a-list-item slot="renderItem" slot-scope="item">
                <a-list-item-meta :description="item.desc">
                    <a slot="title" :href="item.url">{{ item.title }}</a>
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
      newsList: []
    }
  },
  mounted () {
    this.getNews()
  },
  methods: {
    async getNews () {
      const res = await axios.get('https://www.printf520.com:8080/GetTypeInfo?id=' + this.catId)
      this.newsList = res.data.Data
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
