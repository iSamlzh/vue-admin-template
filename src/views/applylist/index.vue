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
      <el-table-column label="产品名称" align="center" prop="brank" />
      <el-table-column label="榜单标识" align="center" prop="company" />
      <el-table-column label="地址" align="center" prop="contact" />
      <el-table-column label="其他" align="center" prop="ext" />
      <el-table-column label="备注" align="center" prop="mark" />
    </el-table>
  </div>
</template>

<script>
import { getPinpaiApplyList } from '@/api/table'
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
      getPinpaiApplyList().then(res => {
        this.list = res.data
        this.listLoading = false
      })
    }
  }
}
</script>

