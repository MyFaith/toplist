<template>
    <div class="settings">
        <h2 class="title">分类编辑</h2>
        <a-button type="primary" @click="resetCategory">恢复分类数据</a-button>
        <draggable class="drag" v-model="categoryList" @start="drag=true" @end="drag=false">
            <div class="cat-item" v-for="cat in categoryList" :key="cat.id">
                <a-button @click="removeCategory(cat)" icon="delete" shape="circle"></a-button>
                <span class="name">{{ cat.title }}</span>
            </div>
        </draggable>
    </div>
</template>

<script>
import axios from 'axios'
import draggable from 'vuedraggable'

export default {
  components: { draggable },
  data () {
    return {
      categoryList: []
    }
  },
  mounted () {
    const categoryStorage = window.localStorage.getItem('categoryList')
    if (categoryStorage) {
      this.categoryList = JSON.parse(categoryStorage)
    }
  },
  methods: {
    async resetCategory () {
      const res = await axios.get('https://www.printf520.com:8080/GetType')
      this.categoryList = res.data.Data
    },
    removeCategory (cat) {
      this.categoryList = this.removeAaary(this.categoryList, cat)
    },
    removeAaary (_arr, _obj) {
      var length = _arr.length
      for (var i = 0; i < length; i++) {
        if (_arr[i] === _obj) {
          if (i === 0) {
            _arr.shift() // 删除并返回数组的第一个元素
            return _arr
          } else if (i === length - 1) {
            _arr.pop() // 删除并返回数组的最后一个元素
            return _arr
          } else {
            _arr.splice(i, 1) // 删除下标为i的元素
            return _arr
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">
.settings {
    .title {
        display: inline;
        padding-right: 15px;
    }
    .drag {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      .cat-item {
          padding: 10px;
          margin: 10px;
          min-width: 130px;
          cursor: crosshair;
          background-color: #eee;
          border-radius: 5px;
          .name {
              padding-left: 10px;
          }
      }
    }
}
</style>
