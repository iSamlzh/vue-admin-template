<template>
  <div class="app-container">
    <!-- <div>
        <el-input v-model="form.title" placeholder="请输入文章标题" />
        <el-button type="primary" @click="search">查找</el-button>
    </div> -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="文章标题" align="center" prop="title" />
      <el-table-column label="文章作者" align="center" prop="articlor" />
      <el-table-column label="城市" align="center" prop="city" />
      <el-table-column label="内容" align="center">
        <div class="desc" slot-scope="scope" v-html="scope.row.content"></div>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :total="total"
      :current-page="page"
      @current-change="fetchData"
    />
  </div>
</template>

<script>
import { getArticleList } from '@/api/table'
export default {

  data() {
    return {
      list: null,
      form: {
        title: ''
      },
      total: 0,
      page: 1,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData(val) {
      this.listLoading = true
      if (val) {
        this.page = val
      }
      getArticleList({ page: this.page }).then(res => {
        this.list = res.data.list
        this.listLoading = false
      })
    },
    search() {
      this.listLoading = true
      getArticleList({ searchKey: this.form }).then(res => {
        this.list = res.data.list
        this.listLoading = false
      })
    }
  }
}
</script>

<style>
.desc {
  max-height: 100px;
}
</style>
