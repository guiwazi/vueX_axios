<template>
  <div class="content">
    <div class="contentTop">
      <span>快递公司：</span>
        <el-select v-model="expressValue" class="topSelect" placeholder="请选择快递公司">
          <el-option
            v-for="item in express"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      <span>运输方式：</span>
        <el-select v-model="transportValue" class="topSelect" placeholder="请选择运输方式">
          <el-option
            v-for="item in transport"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-search" @click="search()">搜索</el-button>
    </div>
      <el-button type="primary" class="addBtn" icon="el-icon-plus" @click="addTable()">新增</el-button>
    <div class="contentTable">
        <el-table
        :data="tableList"
        border
        style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
          width="50"
          align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="寄件人"
          align="center">
        </el-table-column>
        <el-table-column
          prop="tel"
          label="联系电话"
          align="center">
        </el-table-column>
        <el-table-column
          prop="company"
          label="物流公司"
          align="center">
        </el-table-column>
        <el-table-column
          prop="number"
          label="无聊单号"
          align="center">
        </el-table-column>
        <el-table-column
          prop="transport"
          label="运输方式"
          align="center">
        </el-table-column>
        <el-table-column
          prop="remarks"
          label="备注"
          align="center">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="edit(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="deleteInfo(scope.row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="contentPage">
      <el-pagination
        v-show="tableListCount > 0"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="10"
        layout="total, prev, pager, next"
        :total="tableListCount">
      </el-pagination>
    </div>
    <transition name="el-fade-in-linear">
    <tablePop v-show="popShow" :scope-data="datatip" @cancelPop="cancelPop" @getTableList="getTableList"></tablePop>
    </transition>
  </div>
</template>
<script>
// 引入弹窗
import tablePop from './tablePop.vue'
export default{
  components: {
    tablePop
  },
  data () {
    return {
      datatip: {},
      popShow: false,
      express: [{
        value: '中通快递',
        label: '中通快递'
      }, {
        value: '圆通快递',
        label: '圆通快递'
      }, {
        value: '顺丰快递',
        label: '顺丰快递'
      }],
      expressValue: ['中通快递', '圆通快递', '顺丰快递'],
      transport: [{
        value: '空运',
        label: '空运'
      }, {
        value: '陆运',
        label: '陆运'
      }, {
        value: '海运',
        label: '海运'
      }],
      transportValue: ['空运', '陆运', '海运'],
      // 分页
      currentPage: 1
    }
  },
  computed: {
    tableList () {
      return this.$store.state.table.tableList
    },
    tableListCount () {
      return this.$store.state.table.tableListCount
    }
  },
  mounted () {
    let params = {
      limit: 10,
      offset: 0
    }
    this.$store.dispatch('table/getTableList', params)
  },
  methods: {
    // 搜索
    search () {
      let data = {
        company: this.expressValue,
        transport: this.transportValue
      }
      this.$store.dispatch('table/searchInfo', data)
    },
    // 分页
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      let params = {
        limit: 10,
        offset: (val - 1)
      }
      this.$store.dispatch('table/getTableList', params)
    },
    // 删除物流信息
    deleteInfo (_id) {
      this.$confirm('此操作将删除该物流信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('table/deleteInfo', _id).then(res => {
          let params = {
            limit: 10,
            offset: this.currentPage - 1
          }
          this.$store.dispatch('table/getTableList', params).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 新增
    addTable () {
      this.popShow = true
      this.datatip = Object.assign({}, {tip: 1})
    },
    cancelPop (data) {
      if (data.cancel) {
        this.popShow = false
      }
    },
    getTableList (data) {
      let params = {
        limit: 10,
        offset: this.currentPage - 1
      }
      if (data.getTableList) {
        this.$store.dispatch('table/getTableList', params).then(res => {
          this.popShow = false
        })
      }
    },
    // 编辑
    edit (data) {
      this.popShow = true
      this.datatip = Object.assign({}, {data: data, tip: 2})
    }
  }
}
</script>
<style  lang="scss" scoped>
.content{
  width: 1100px;
  margin: 50px auto;
  .contentTop{
    width: 100%;
    height: auto;
    margin-bottom: 30px;
    span{
      line-height: 40px;
      float: left;
    }
    .topSelect{
      width: 150px;
      float: left;
      margin: 0 100px 0 0;
    }
  }
  .contentTable{
    width: 100%;
    height: auto;
  }
  .contentPage{
    margin-top: 20px;
  }
  .addBtn{
    float: right;
    margin: 0 174px 20px 0;
  }
}
</style>
