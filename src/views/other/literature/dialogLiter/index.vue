<!-- 文献弹框 -->
<template>
  <div>
    <!-- 树和表单 -->
    <el-container class="container-box">
      <el-col :span="5" class="left-box">
        <el-tree
          ref="literTree"
          @node-click="handleCheckChange"
          :data="this.treeList"
          :highlight-current="true"
        />
      </el-col>

      <el-col :span="18" class="right-box">
        <el-row class="btn-group">
          <el-button class="btn-green" @click="handleCreat">新增</el-button>
          <el-button class="btn-red" @click="handleDelete">删除</el-button>
        </el-row>
        <el-form
          ref="dataFormLiter"
          :model="tempData.model"
          label-position="right"
          width="900px"
          label-width="100px"
        >
          <el-row class="in-row">
            <el-col :span="12">
              <el-form-item label="文献名称" prop="title">
                <el-input v-model="tempData.model.title"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="文献编码" prop="literatureCode">
                <el-input v-model="tempData.model.literatureCode"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row class="in-row">
            <el-col :span="12">
              <el-form-item label="文献类型" prop="literatureType">
                <el-select
                  value-key="2"
                  v-model="tempData.model.literatureType"
                  @change="handleChangeLiterType"
                  :placeholder="
                    tempData.model.literatureType
                      ? tempData.model.literatureType
                      : '请选择'
                  "
                >
                  <el-option
                    v-for="(item, index) in this.literatureTypeList"
                    :key="index"
                    :label="item.text"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="文献简称" prop="subtitle">
                <el-input v-model="tempData.model.subtitle"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row class="in-row">
            <el-col :span="12">
              <el-form-item label="作者" prop="author">
                <el-input v-model="tempData.model.author" />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="出版社" prop="publisher">
                <el-input v-model="tempData.model.publisher" type="input"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row class="in-row">
            <el-col :span="12">
              <el-form-item label="出版时间 " prop="publicationTime">
                <el-date-picker
                  style="width: 188.75px"
                  v-model="tempData.model.publicationTime"
                  type="date"
                  placeholder="选择日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="选项" prop="enabled">
                <el-checkbox v-model="tempData.model.enabled">有效</el-checkbox>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row class="in-row">
            <el-col :span="24">
              <el-form-item label="说明" prop="remark">
                <el-input v-model="tempData.model.remark" type="input"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row class="in-row">
            <el-col :span="24">
              <el-form-item label="作者介绍" prop="authorIntroduce">
                <el-input
                  v-model="tempData.model.authorIntroduce"
                  type="input"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <el-form-item label="摘要" prop="abstract">
                <el-input v-model="model.abstract"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row class="in-row">
            <el-col>
              <el-form-item label="封面图片" prop="">
                <el-upload
                  ref="upload"
                  :multiple="true"
                  action=""
                  :limit="3"
                  :http-request="handleUpload"
                  :on-exceed="handleExceed"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-container>
    <!-- 按钮 -->
    <el-row class="btn-box">
      <el-button @click="handleCancel">取消</el-button>
      <el-button @click="handleConfirm">确认</el-button>
    </el-row>
  </div>
</template>

<script>
import { serachDic } from "@/api/myApi/searchDic";
import { handleupload } from "@/utils/myUtils/upload";
export default {
  components: {},
  props: ["treeList"],
  data() {
    //这里存放数据
    return {
      btnstatus: "新增",
      picList: [], //上传图片的数组，多选
      tempData: {
        model: {
          enabled: true,
          ifhomeImage: "",
          location: "",
        },
        pictures: [],
      },
      model: {
        enabled: true,
        ifhomeImage: "",
        location: "",
      },
      literatureTypeList: [], //文献类型数组
      curNode: {}, //当前选中的节点对象
    };
  },
  methods: {
    //查字典
    async getDic(type) {
      let query = {
        dictionary: {
          code: type,
          companyCode: "999",
        },
        terminal: {
          code: "01",
          Text: "浏览器",
          modelCode: "modelcode002",
          model: "文献管理",
        },
      };
      try {
        const res = await serachDic(query);
        if (res.code == 200) {
          return res.data;
        }
      } catch (error) {
        return [];
      }
    },
    //设置literatureTypeList的值
    handleChangeLiterType(e) {
      this.tempData.model.literatureType = e.text;
      this.tempData.model.literatureTypeCode = e.code;
    },
    //点击弹框的树组件
    handleCheckChange(data) {
      this.btnstatus = "编辑";
      // if (data.label == this.tempData.label) {
      //   return;
      // }

      this.tempData.model = {
        ...data.model,
      };
      this.tempData.model.enabled = this.tempData.model.enabled == "1" ? true : false;
    },
    //上传封面图片
    handleUpload(e) {
      // this.picList.push(e.file);
      let query = {
        imgType: "封面",
        imgTypeCode: "0",
        location: "",
      };
      handleupload.call(this, e.file, "jpg", "admin").then((res) => {
        query.location = "http://" + res.Location;
        this.picList.push(query);
        this.tempData.model.ifhomeImage = "1";
      });
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    //点击取消按钮
    handleCancel() {
      console.log("点击了取消按钮");
      this.$emit("handleCancel");
    },
    //点击了确认按钮
    handleConfirm() {
      this.$confirm(`是否确认该${this.btnstatus}操作?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.tempData.pictures = this.picList;
          this.tempData.btnstatus = this.btnstatus;
          this.$emit("handleConfirm", this.tempData);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: `已取消${this.btnstatus}操作`,
          });
        });
    },
    //点击了新增按钮
    handleCreat() {
      this.btnstatus = "新增";
      this.tempData = {
        model: {
          enabled: true,
          ifhomeImage: "",
          location: "",
        },
        pictures: [],
      };
    },
    //点击删除按钮
    handleDelete() {
      if (!this.tempData.model.literatureId) {
        this.$message("请选择要删除的对象");
        return;
      }
      this.tempData.btnstatus = "删除";
      this.$confirm(`是否确认该${this.tempData.btnstatus}操作?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$emit("handleDelete", this.tempData);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: `已取消${this.tempData.btnstatus}操作`,
          });
          this.btnstatus = "编辑";
          this.tempData.btnstatus = "编辑";
        });
    },
  },
  async created() {
    this.literatureTypeList = await this.getDic("LiteratureType");
  },
  mounted() {},
  destroyed() {},
};
</script>
<style lang="scss" scoped>
.right-box,
.left-box {
  box-sizing: border-box;
  padding: 20px;
  // height: calc(100vh - 130px);
  height: 600px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.right-box {
  margin-left: 20px;
  padding-right: 40px;
  & .btn-group {
    padding-left: 30px;
    padding-bottom: 20px;
  }
}
.in-row {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.margin-r {
  margin-right: 20px;
}
.btn-box {
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
