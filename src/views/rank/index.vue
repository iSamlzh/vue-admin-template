<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="榜单名称" align="center" prop="name" />
      <el-table-column label="榜单标识" align="center" prop="en_name" />
    </el-table>
  </div>
</template>

<script>
import { getRankList } from '@/api/table'
export default {

  data() {
    return {
      list: null,
      page: 1,
      total: 0,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getRankList().then(res => {
        this.list = res.data
        this.listLoading = false
      })
    }
  }
}
</script>

