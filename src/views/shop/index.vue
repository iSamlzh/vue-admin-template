<template>
  <div class="app-container">
    <el-button type="primary" class="btn-create" @click="handleEdit('create')">新增</el-button>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="标题" align="center" prop="name" />
      <el-table-column label="商家图片" align="center">
        <img slot-scope="scope" :src="scope.row.logo_image" alt="">
      </el-table-column>
      <el-table-column label="分类" align="center" prop="classify" />
      <el-table-column label="城市" align="center" prop="city" />
      <el-table-column label="浏览人气" align="center" prop="popular" />
      <el-table-column label="综合评分" align="center" prop="score" />
      <el-table-column label="电话" align="center" prop="phone" />
      <el-table-column label="商家地址" align="center" prop="location" />
      <el-table-column label="营业时间" align="center" prop="open_time" />
      <el-table-column label="所在榜单" align="center" prop="rank_type" />
      <el-table-column label="详细介绍" align="center">
        <template slot-scope="scope">
          <div class="desc" v-html="scope.row.detail"></div>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" align="center" prop="updated_time" />
      <el-table-column label="操作" align="center">
        <el-button slot-scope="scope" size="mini" @click="handleEdit('edit', scope.row)">编辑</el-button>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :total="total"
      :current-page="page"
      @current-change="fetchData"
    />
    <el-dialog ref="model" title="编辑" width="50%" :visible.sync="dialogVisible">
      <el-form ref="form" :model="form">
        <el-form-item label="标题">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="商家图片">
          <el-upload
            class="avatar-uploader"
            action="/api_server/image/upload"
            name="image"
            :show-file-list="false"
            :on-success="handleSuccess"
          >
            <img v-if="form.logo_image" :src="form.logo_image" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="城市">
          <el-select v-model="form.city">
            <el-option v-for="(item, index) in citys" :key="index" :label="item.name" :value="item.en_name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类">
          <el-select v-model="form.classify">
            <el-option v-for="(item, index) in classifys" :key="index" :label="item.name" :value="item.en_name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所在榜单">
          <el-select v-model="form.rank_type">
            <el-option v-for="(item, index) in ranks" :key="index" :label="item.name" :value="item.en_name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="综合评分">
          <el-input v-model="form.score" />
        </el-form-item>
        <el-form-item label="浏览人气">
          <el-input v-model="form.popular" />
        </el-form-item>
        <el-form-item label="商家电话">
          <el-input v-model="form.phone" placeholder="请输入商家电话" />
        </el-form-item>
        <el-form-item label="预定电话" placeholder="此处输入底bar预定电话">
          <el-input v-model="form.yuding_phone" />
        </el-form-item>
        <el-form-item label="商家地址">
          <el-input v-model="form.location" />
        </el-form-item>
        <el-form-item label="营业时间">
          <el-input v-model="form.open_time" />
        </el-form-item>
        <el-form-item label="介绍内容">
          <div style="float: left;">
            <Toolbar
              style="border-bottom: 1px solid #ccc"
              :editor="editor"
              :defaultConfig="toolbarConfig"
              :mode="mode"
            />
            <Editor
              style="height: 500px; overflow-y: hidden;"
              v-model="form.detail"
              :defaultConfig="editorConfig"
              :mode="mode"
              @onCreated="onCreated"
            />
          </div>
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
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { getList, edit, getRankList, getClassifyList, getCityList } from '@/api/table'
import { getToken } from '@/utils/auth'
export default {
  components: {
    Editor,
    Toolbar
  },
  data() {
    /**
      "rank_type": "榜单标识",
      "name": "产品名称",
      "logo_image": "logo图片",
      "address": "地址",
      "price": 0,
      "phone": "13322222222",
      "open_time": "营业时间",
      "location": "所在区域",
      "trade_area": "商圈",
      "cost": 100,
      "taste_score": 8.0,
      "environment_score": 8.0,
      "serve_score": 8.0,
      "detail": "店铺详细介绍",
      "score": 0,
      "popular": 0,
      "opinions": 0,
      "ext": "其他信息",
      "updated_time": "更新时间",
      "created_time": "创建时间"
     */
    return {
      token: getToken(),
      dialogVisible: false,
      list: null,
      ranks: [],
      citys: [],
      classifys: [],
      page: 1,
      total: 0,
      listLoading: true,
      tmpData: null,
      editType: 'create',
      form: {
        name: '',
        logo_image: '',
        address: '',
        phone: '',
        open_time: '',
        rank_type: '',
        detail: ''
      },
      editor: null,
      toolbarConfig: {},
      editorConfig: { placeholder: '请输入内容...' },
      mode: 'default' // or 'simple'
    }
  },
  created() {
    this.fetchData()
    getRankList().then(res => {
      this.ranks = res.data
    })
    getClassifyList().then(res => {
      this.classifys = res.data
    })
    getCityList().then(res => {
      this.citys = res.data
    })
  },
  beforeDestroy() {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  },
  methods: {
    fetchData(val) {
      this.listLoading = true
      if (val) {
        this.page = val
      }
      getList({ page: this.page }).then(res => {
        this.list = res.data.list
        this.total = res.data.total
        this.page = res.data.page
        this.listLoading = false
      })
    },
    handleEdit(type, data) {
      this.dialogVisible = true
      if (type === 'edit') {
        this.form = data
        this.tmpData = data
      } else {
        this.form = {
          name: '',
          logo_image: '',
          address: '',
          phone: '',
          open_time: '',
          rank_type: '',
          desc: ''
        }
      }
      this.editType = type
    },
    editInfoComfrim() {
      let params = this.tmpData
      if (this.editType === 'create') {
        params = this.form
      }
      edit(params).then(res => {
        this.dialogVisible = false
        if (res.code === 0) {
          this.fetchData()
        } else {
          this.$message.error('请求异常，请联系管理员')
        }
      })
    },
    handleSuccess(res, file) {
      this.form.logo_image = URL.createObjectURL(file.raw)
    },
    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    }
  }
}
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>
<style>
.btn-create {
  margin-bottom: 10px;
}
.desc {
  max-height: 100px;
}
img {
  max-height: 100px;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
