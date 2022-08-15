<template>
  <div>
    <el-upload
      action="#"
      list-type="picture-card"
      :http-request="onRequest"
      :on-change="onChange"
      :on-remove="onRemove"
      :on-preview="onPreview"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :limit="1"
      :class="fileList.length ? 'hide' : ''"
      class="custom-upload"
      :before-upload="beforeUpload"
      :file-list="fileList"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
// SECRETID 和 SECRETKEY请登录 https://console.cloud.tencent.com/cam/capi 进行查看和管理
var cos = new COS({
  SecretId: 'AKIDnV6cCWrBVl1JnInYHLLI3odiliaMHDB6',
  SecretKey: 'HXnElLqOycOHHQjAmTD0ssKNiPSZkmt6',
})
export default {
  name: 'UploadImg',
  data() {
    return {
      fileList: [],
      dialogVisible: false,
      dialogImageUrl: '',
      loading: false,
    }
  },

  created() {},

  methods: {
    onRequest({ file }) {
      this.loading = true
      cos.putObject(
        {
          Bucket: 'tzq-1313341643' /* 必须 */,
          Region: 'ap-shanghai' /* 存储桶所在地域，必须字段 */,
          Key: file.name /* 必须 */,
          StorageClass: 'STANDARD',
          Body: file, // 上传文件对象
          onProgress: function (progressData) {
            console.log(JSON.stringify(progressData))
          },
        },
        (err, data) => {
          this.loading = false
          if (err || data.statusCode !== 200) {
            return this.$message.success('上传失败')
          }
          this.$emit('onSuccess', { url: 'https://' + data.Location })
        },
      )
    },
    onChange(file, fileList) {
      this.fileList = fileList
      console.log(this.fileList)
    },
    onRemove(file, fileList) {
      this.fileList = fileList
    },
    onPreview(file) {
      this.dialogVisible = true
      this.dialogImageUrl = file.url
    },
    beforeUpload(file) {
      const type = ['image/jpeg', 'image/gif']
      if (!type.includes(file.type)) {
        this.$message.error('请上传' + type.join('、') + '图片')
        return false
      }
      const maxSize = 2 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('图片大小不能超过2kb')
        return false
      }
    },
  },
}
</script>

<style scoped lang="scss">
.hide .el-upload--picture-card {
  display: none;
}
.custom-upload {
  width: 148px;
  height: 148px;
  overflow: hidden;
}
</style>
