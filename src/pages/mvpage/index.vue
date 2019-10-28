<template>
  <div class="mv-wrapper">
    <div class="header">
      <a-list itemLayout="horizontal" :dataSource="datas">
        <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
          <span class="select-title">{{item.title}}</span>
          <span
            class="data-title"
            :class="{'isactive': (item.type===0 && dataItem === area) || (item.type===1 && dataItem===type)}"
            v-for="(dataItem,idx) in item.data"
            :key="idx"
            @click="chooseType(item.type,dataItem)"
          >{{dataItem}}</span>
        </a-list-item>
      </a-list>
    </div>
    <div class="content">
      <MVItem v-for="(mvItem,index) in mvs" :key="index" :mvInfo="mvItem"></MVItem>
       <a-pagination size="small" :total="total" :current="current" @change="handlePaginationChange"/>
    </div>
  </div>
</template>
<script>
import { List, Pagination } from 'ant-design-vue'
import MVItem from '../../components/mvItem'
import HttpApi from '../../assets/api/index'
export default {
  name: 'MvPage',
  components: {
    'a-list': List,
    'a-list-item': List.Item,
    MVItem,
    'a-pagination':Pagination
  },
  data() {
    return {
      area: '全部',
      type: '全部',
      mvs: [],
      total:10,
      current:1,
      datas: [
        {
          type: 0,
          title: '地区:',
          data: ['全部', '内地', '港台', '欧美', '日本', '韩国']
        },
        {
          type: 1,
          title: '类型:',
          data: ['全部', '官方版', '原生', '现场版', '网易出品']
        }
      ]
    }
  },
  methods: {
    chooseType(type, data) {
      type === 1 ? (this.type = data) : (this.area = data)
      this.getMvList()
    },
    async getMvList() {
      const res = await HttpApi.getMvListByAreaType({
        area: this.area === '全部' ? '' : this.area,
        type: this.type === '全部' ? '' : this.type,
        offset:this.current,
        limit:50
      })
      if (res && res.data) {
        const mvs = res.data.data
        const total = res.data.count
        this.mvs = mvs
        this.total = total
      }
    },
    handlePaginationChange(val){
     this.current = val
     this.getMvList()
    }
  },
  created() {
    this.$nextTick(() => {
      this.getMvList()
    })
  }
}
</script>
<style lang="less" scoped>
.header {
  border: 1px solid #eee;
  text-align: center;
  .select-title {
    display: inline-block;
    width: 80px;
    font-size: 16px;
    color: #000;
  }
  .data-title {
    display: inline-block;
    padding: 2px 15px;
    font-size: 14px;
  }
  .isactive {
    transition: 500ms all;
    color: #06a5ff;
    background: #eee;
    border-radius: 5px;
  }
}
.content {
  display: flex;
  flex-wrap: wrap;
  margin-top: 40px;
}
</style>