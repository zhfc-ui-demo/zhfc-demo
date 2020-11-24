
<template>
  <div class="zhfc-upload_out" :style="{width:width}">
    <div class="upload-header">批量导入</div>
    <div class="upload-main">
      <div class="uplaodimg">
        <el-upload
          drag
          :on-change="upload"
          action="https://jsonplaceholder.typicode.com/posts/"
          :auto-upload="true"
          :accept="accept"
          multiple
          list-type="picture"
          :show-file-list="true"
        >
          <div slot="default" class="btn-icon">
            <el-button class="zhfc-button primary">选择文件</el-button>
            <p>或将文件拖到此处</p>
          </div>
          <!-- <img v-if="file" :src="file" class="avatar" /> -->
        </el-upload>

      </div>
    </div>
    <div class="btn">
      <span>
        <el-button class="zhfc-button plain">取消</el-button>
        <el-button class="zhfc-button primary" @click="uploadSure">提交</el-button>
      </span>
    </div>
    <el-alert
      title="请上传20MB以内的，jpg、png、jpeg、bmp、tif格式的图片作为项目总平图"
      type="warning"
      :closable="false"
      show-icon
    ></el-alert>
  </div>
</template>

<script>
export default {
  name: "zhfcUploadImg",
  components: {},
  props: {
    width: {
      type: [Number, String],
      default: "100%",
    },

    accept: {
      type: String,
      default: ".jpg,.jpeg,.png,.JPG,.JPEG,.PNG",
    },
  },
  data() {
    return {
      file: "",
      formData: null,
      file: "",
      fileData: "",
    };
  },
  watch: {},
  mounted() {
    this.formData = new FormData();
  },
  methods: {
    // 将图片文件转成BASE64格式
    html5Reader(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.file = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    upload(file) {
      console.log(file);
      //文件
      this.formData.append("file", file.raw);
      this.fileData = file;
      this.html5Reader(file.raw);
    },
    uploadSure() {
      if (!this.formData) {
        this.$message.error("请先上传文件");
        return false;
      }
      this.$emit("upload", this.formData, this.fileData);
    },
  },
};
</script>
