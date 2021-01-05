<!--  -->
<template>
  <el-row class="form-box">
    <el-form
      ref="dataFormEdit"
      :model="tempData"
      label-position="right"
      label-width="120px"
      style="width: 100%"
    >
      <!-- *新闻主标题/*新闻主标题(蒙) -->
      <el-row class="in-row">
        <el-col :span="10">
          <el-form-item label="新闻主标题" prop="contentTitle">
            <el-input v-model="tempData.contentTitle"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="新闻主标题(蒙)" prop="contentTitleMgl">
            <el-input v-model="tempData.contentTitleMgl"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- *新闻副标题/新闻副标题(蒙) -->
      <el-row class="in-row">
        <el-col :span="10">
          <el-form-item label="新闻副标题" prop="contentSubTitle">
            <el-input v-model="tempData.contentSubTitle" />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="新闻副标题(蒙)" prop="contentSubTitleMgl">
            <el-input v-model="tempData.contentSubTitleMgl" />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 摘要 -->
      <el-row class="in-row">
        <el-col :span="10">
          <el-form-item label="摘要" prop="abstract">
            <el-input v-model="tempData.abstract" />
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="摘要(蒙)" prop="abstractMgl">
            <el-input v-model="tempData.abstractMgl" />
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 所属栏目显示顺序 -->
      <el-row class="in-row">
        <el-col :span="10">
          <el-form-item label="所属栏目" prop="sysmenu">
            <el-dropdown placement="bottom-start">
              <el-button class="commont-width select-input">
                <span class="text-box">{{
                  tempData.sysmenu ? tempData.sysmenu : "请选择"
                }}</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown" class="select-input">
                <el-tree
                  @node-click="addTreeOnClick"
                  ref="menuTree"
                  :data="treeList"
                  class="filter-tree"
                  default-expand-all
                />
              </el-dropdown-menu>
            </el-dropdown>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="显示顺序" prop="sortCode">
            <el-input v-model="tempData.sortCode" />
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 创建时间、创建用户 -->
      <!-- <el-row>
        <el-col :span="10">
          <el-form-item label="创建时间" prop="ctime">
            <el-input v-model="tempData.citem"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="创建用户" prop="ctime">
            <el-input v-model="tempData.cuser"></el-input>
          </el-form-item>
        </el-col>
      </el-row> -->
      <!-- 内容类型 -->
      <el-row class="in-row">
        <el-col :span="10">
          <el-form-item label="内容类型" prop="contentType">
            <el-select
              class="select-input"
              v-model="tempData.contentType"
              placeholder="请选择"
            >
              <el-option
                v-for="(item, index) in options"
                :key="index"
                :label="item.text"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="内容类型(蒙)" prop="contentTypeMgl">
            <el-select
              class="select-input"
              v-model="tempData.contentTypeMgl"
              placeholder="请选择"
            >
              <el-option
                v-for="(item, index) in options"
                :key="index"
                :label="item.text"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 内容发布类型 -->
      <el-row class="in-row">
        <el-col :span="10">
          <el-form-item label="内容发布类型" prop="fileType">
            <el-select
              class="select-input"
              v-model="tempData.fileType"
              placeholder="请选择"
            >
              <el-option
                v-for="(item, index) in options"
                :key="index"
                :label="item.text"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="内容发布类型(蒙)" prop="fileTypeMgl">
            <el-select
              class="select-input"
              v-model="tempData.fileTypeMgl"
              placeholder="请选择"
            >
              <el-option
                v-for="(item, index) in options"
                :key="index"
                :label="item.text"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 分享范围 -->
      <el-row class="in-row">
        <el-col :span="10">
          <el-form-item label="分享范围" prop="sharingScope">
            <el-select
              class="select-input"
              v-model="tempData.sharingScope"
              placeholder="请选择"
            >
              <el-option
                v-for="(item, index) in options"
                :key="index"
                :label="item.text"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="分享范围(蒙)" prop="sharingScopeMgl">
            <el-select
              class="select-input"
              v-model="tempData.sharingScopeMgl"
              placeholder="请选择"
            >
              <el-option
                v-for="(item, index) in options"
                :key="index"
                :label="item.text"
                :value="item.text"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 定位 -->
      <el-row class="in-row">
        <el-col :span="10">
          <el-form-item label="摘要" prop="abstract">
            <el-select v-model="tempData.fileTypeMgl" placeholder="请选择">
              <el-option
                v-for="(item, index) in options"
                :key="index"
                :label="item.text"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="摘要(蒙)" prop="abstractMgl">
            <el-select v-model="tempData.fileTypeMgl" placeholder="请选择">
              <el-option
                v-for="(item, index) in options"
                :key="index"
                :label="item.text"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 选项 -->
      <el-row class="in-row-one">
        <el-col>
          <el-form-item label="选项 " prop="menuType">
            <el-checkbox>首页图片</el-checkbox>
            <el-checkbox>推荐</el-checkbox>
            <el-checkbox>热门</el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 选项卡 -->
      <el-tabs type="border-card" class="tabs-box">
        <el-tab-pane label="用户管理">
          <el-row>
            <el-col :span="10">
              <div>pc</div>
              <el-upload
                ref="uploadPC"
                class="upload-box-PC"
                action=""
                :limit="1"
                list-type="picture-card"
                :http-request="handleUpload"
              >
                <i class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-col>
            <el-col :span="10">
              <el-upload
                ref="uploadPhone"
                class="upload-box-Phone"
                action=""
                :limit="1"
                list-type="picture-card"
                :http-request="handleUpload"
              >
                <i class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="配置管理">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
      </el-tabs>
      <!-- button -->
      <el-row class="btn-box">
        <el-button @click="handleCancelDialog">{{ "取消" }}</el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? createData() : updateData()"
          >{{ "确认" }}</el-button
        >
      </el-row>
    </el-form>
  </el-row>
</template>

<script>
export default {
  props: {
    dialogStatus: {
      type: String,
      default: "create",
      required: true,
    },
    temp: {
      type: Object,
      default: () => {},
      required: true,
    },
    treeList: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
  components: {},
  data() {
    //这里存放数据
    return {
      tempData: {},
      options: [
        { text: "标题1" },
        { text: "标题2" },
        { text: "标题3" },
        { text: "标题4" },
      ],
    };
  },
  methods: {
    //点击了书组件
    addTreeOnClick(data) {
      tempData.sysmenu = data.sysmenu;
      tempData.sysmenuId = data.sysmenuId;
      tempData.sysmenuMgl = data.sysmenuMgl;
    },
    // 点击了弹框的取消按钮
    handleCancelDialog() {
      this.$emit("handleCancelDialog");
    },
    // 点击了弹框按钮的确认按钮
    createData() {
      if (this.temp) {
        this.tempData = {
          ...this.temp,
        };
      }
      this.$refs.dataFormEdit.validate((valid) => {
        if (valid) {
          this.$emit("createData", tempData);
        }
      });
    },
    // 上传图片到腾讯云
    handleUpload(e) {
      //

      handleupload.call(this, e.file, "jpg", "admin").then((res) => {
        this.tempData.imageUrl = res.Location;
        console.log("上传成功", this.tempData.imageUrl);
      });
    },
  },
  created() {
    console.log("弹框组件加载了");
    this.$nextTick(() => {
      this.$refs.dataFormEdit.clearValidate();
    });
  },
  mounted() {},
  destroyed() {
    console.log("弹框组件卸载了");
  },
};
</script>
<style lang="scss" scoped>
.btn-box {
  margin: 0 auto;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.form-box {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 25px;
}

.tabs-box {
  height: 300px;
  margin-bottom: 40px;
}

.select-input {
  width: 267px;
}
.in-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.in-row-one {
  justify-self: start;
  margin-left: 50px;
}
</style>
