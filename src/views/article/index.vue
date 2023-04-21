<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="城市">
          <el-select v-model="form.city" placeholder="请选择城市">
            <el-option v-for="(item, index) in citys" :key="index" :label="item.name" :value="item.en_name"></el-option>
          </el-select>
        </el-form-item>
      <el-form-item label="文章标题">
        <el-input v-model="form.title" placeholder="请输入文章标题" />
      </el-form-item>
      <el-form-item label="文章作者">
        <el-input v-model="form.articlor" placeholder="请输入作者" />
      </el-form-item>
      <el-form-item label="内容">
        <Toolbar
          style="border-bottom: 1px solid #ccc"
          :editor="editor"
          :defaultConfig="toolbarConfig"
          :mode="mode"
        />
        <Editor
          style="height: 500px; overflow-y: hidden;"
          v-model="form.content"
          :defaultConfig="editorConfig"
          :mode="mode"
          @onCreated="onCreated"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { editArticle, getCityList } from '@/api/table'

export default {
  components: {
    Editor,
    Toolbar
  },
  data() {
    return {
      form: {
        city: '',
        articlor: '',
        title: '',
        content: '',
        image: ''
      },
      citys: [],
      editor: null,
      html: '',
      toolbarConfig: {
        excludeKeys: ['bgColor', 'blockquote', 'fontFamily', 'color', 'insertVideo', 'insertLink', 'uploadVideo', 'editVideoSize', 'code', 'codeBlock', 'codeSelectLang', 'fullScreen']
      },
      editorConfig: {
        placeholder: '请输入内容...',
        MENU_CONF: {
          uploadImage: {
            server: '/api_server/image/upload',
            fieldName: 'image',
            customInsert(res, insertFn) {
              insertFn(res.data.urls)
            }
          }
        }
      },
      mode: 'default', // or 'simple'
    }
  },
  created() {
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
    onSubmit() {
      editArticle(this.form).then(res => {
        if (res.code === 0) {
          this.$message('发布成功!')
        } else {
          this.$message('系统有点问题，请联系管理员!')
        }
      })
    },
    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    }
  }
}
</script>

<style src="@wangeditor/editor/dist/css/style.css"></style>
<style scoped>
.line{
  text-align: center;
}
</style>

