<template>
  <div class="app-container">
    <el-button type="primary" class="btn-create" @click="handleEdit">新增榜单预定电话</el-button>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="榜单名称" align="center" prop="rankName" />
      <el-table-column label="城市" align="center" prop="cityName" />
      <el-table-column label="预定电话" align="center" prop="yuding_phone" />
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :total="total"
      :current-page="page"
      @current-change="fetchData"
    />
    <el-dialog ref="model" title="预定电话" width="60%" :visible.sync="dialogVisible">
      <el-form ref="form" :model="form">
        <el-form-item label="城市">
          <el-select v-model="form.city">
            <el-option v-for="(item, index) in citys" :key="index" :label="item.name" :value="item.en_name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="榜单">
          <el-select v-model="form.rank">
            <el-option v-for="(item, index) in ranks" :key="index" :label="item.name" :value="item.en_name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="预定电话" placeholder="此处输入底bar预定电话">
          <el-input v-model="form.yuding_phone" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="editInfoComfrim">提交</el-button>
          <el-button @click="dialogVisible=false;">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getRankList, getClassifyList, getCityList, getCityRankList, editCityRankList } from '@/api/table'
export default {

  data() {
    return {
      dialogVisible: false,
      list: null,
      page: 1,
      total: 0,
      listLoading: true,
      citys: [],
      classifys: [],
      ranks: [],
      form: {
        city: '',
        rank: '',
        yuding_phone: '',
        wx: '',
        dx: ''
      }
    }
  },
  created() {
    this.fetchData()
    getClassifyList().then(res => {
      this.classifys = res.data
    })
    getCityList().then(res => {
      this.citys = res.data
    })
    getRankList().then(res => {
        this.ranks = res.data
    })
  },
  methods: {
    fetchData(val) {
      if (val) {
            this.page = val
      }
      this.listLoading = true
      getCityRankList().then(res => {
        this.list = res.data.list
        this.total = res.data.total
        this.page++
        getRankList().then(res => {
            const ranklist = res.data
            this.list.forEach(item => {
                ranklist.forEach(rank => {
                    if (rank.en_name === item.rank) {
                        this.$set(item, 'rankName', rank.name)
                    }
                })
            })
        })
        getCityList().then(res => {
            const citylist = res.data
            this.list.forEach(item => {
                citylist.forEach(city => {
                    if (city.en_name === item.city) {
                        this.$set(item, 'cityName', city.name)
                    }
                })
            })
        })
        this.listLoading = false
      })
    },
    handleEdit() {
      this.dialogVisible = true
      this.form = {
        city: '',
        rank: '',
        yuding_phone: '',
        phone: '',
        wx: '',
        dx: ''
      }
    },
    editInfoComfrim() {
      this.form.wx = this.form.yuding_phone
      this.form.dx = this.form.yuding_phone
      const params = this.form
      editCityRankList(params).then(res => {
        this.dialogVisible = false
        if (res.code === 0) {
          this.fetchData()
        } else {
          this.$message.error('请求异常，请联系管理员')
        }
      })
    }
  }
}
</script>
<style>
.btn-create{
    margin-bottom: 10px;
}
</style>