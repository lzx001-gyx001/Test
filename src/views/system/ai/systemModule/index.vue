<template>
  <!-- 系统管理 -->
  <el-container class="container-box">
    <!-- 左侧tree组件-->
    <el-col :span="4" style="marginright: 0; minwidth: 120px">
      <el-card style="padding: 0" class="left-box">
        <div class="inner-title">导航目录</div>
        <el-tree
          @node-click="setTreeId"
          ref="systemTree"
          :data="treeList"
          default-expand-all
          v-loading="listLoading"
        />
      </el-card>
    </el-col>
    <!-- 右侧表格区域 -->
    <el-col class="right-box">
      <!-- 按钮区域 -->
      <el-row class="btn-row">
        <el-button icon="el-icon-edit" class="btn-blue" @click="refrensh">{{
          "刷新"
        }}</el-button>
        <el-button
          icon="el-icon-circle-plus-outline"
          class="btn-blue"
          @click="handleCreate"
          >{{ "新增" }}</el-button
        >
        <!-- upload -->
        <el-button
          class="filter-item btn-blue"
          style="margin-left: 10px"
          icon="el-icon-edit"
          @click="handleUploadModule"
          >{{ "导入" }}</el-button
        >
        <!-- ajax -->
        <el-button
          class="filter-item btn-blue"
          style="margin-left: 10px"
          icon="el-icon-edit"
          @click="handleLoadModule"
          >{{ "引入" }}</el-button
        >
      </el-row>
      <!-- 表格区域 -->
      <el-row>
        <DetailTalbe
          :data="this.tableList"
          @handleUpdate="handleUpdate"
          @handleDelete="handleDelete"
        />
      </el-row>
      <!-- 分页组件 -->
      <!-- <pagination
        v-show="total > 10"
        :total="total"
        :page.sync="listQuery.page.pageNumber"
        :limit.sync="listQuery.page.pageSize"
        @pagination="getTableListByPage"
      /> -->
    </el-col>

    <!-- 编辑，新增按钮的弹出框 -->
    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      width="700px"
    >
      <el-form
        ref="dataForm"
        :model="temp"
        class="dialog-form-box"
        label-position="right"
        label-width="80px"
        style="width: 600px; margin: 0 auto"
      >
        <!-- *模块编码/*模块名称 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="模块编码" prop="moduleCode">
              <el-input v-model="temp.moduleCode" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="模块名称" prop="fullName">
              <el-input v-model="temp.fullName" />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 上级模块/模块分类 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="上级模块" prop="type">
              <!-- 新增弹出框下的tree -->
              <el-dropdown trigger="click">
                <el-button class="class-btn">
                  {{ temp.parent ? temp.parent : "请选择" }}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu
                  ref="myDropDown"
                  slot="dropdown"
                  class="class-dropdown-menu"
                >
                  <el-dropdown-item style="padding: 0">
                    <!-- addTree里面渲染的是对应table表的数据 -->
                    <el-tree
                      @node-click="setAddTreeId"
                      ref="addTree"
                      :data="treeList"
                      default-expand-all
                    />
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="模块分类" prop="category">
              <el-select
                style="width: 220px"
                v-model="temp.category"
                placeholder="请选择"
              >
                <el-option
                  v-for="(item, index) in categoryList"
                  :key="index"
                  :label="item.text"
                  :value="item.text"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 蒙语名称/链接目标 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="蒙语名称" prop="fullNameMgl">
              <el-input v-model="temp.fullNameMgl" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="链接目标" prop="target">
              <el-select v-model="temp.target" style="width: 220px" placeholder="请选择">
                <el-option
                  v-for="item in ['iframe', 'click']"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- *级别层次/显示顺序 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="级别层次" prop="level">
              <el-input v-model="temp.level" />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="显示顺序" prop="sortCode">
              <el-input v-model="temp.sortCode" />
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 选项 -->
        <el-row>
          <el-form-item label="选项" prop="isexpand">
            <el-checkbox label="动态按钮" v-model="temp.allowButton"></el-checkbox>
            <el-checkbox label="动态视图" v-model="temp.allowView"></el-checkbox>
            <el-checkbox label="动态表单" v-model="temp.allowForm"></el-checkbox>
            <el-checkbox label="访问权限" v-model="temp.authority"></el-checkbox>
            <el-checkbox label="数据范围" v-model="temp.dataScope"></el-checkbox>
            <el-checkbox label="展开" v-model="temp.false"></el-checkbox>
            <el-checkbox label="有效" v-model="temp.enabled"></el-checkbox>
          </el-form-item>
        </el-row>
        <!-- 访问地址 -->
        <el-row>
          <el-form-item label="访问地址" prop="pageLocation">
            <el-input v-model="temp.pageLocation" />
          </el-form-item>
        </el-row>
        <!-- 说明 -->
        <el-row>
          <el-form-item label="说明" prop="remark">
            <el-input
              v-model="temp.remark"
              :autosize="{ minRows: 2, maxRows: 4 }"
              type="textarea"
            />
          </el-form-item>
        </el-row>
        <!-- 头像上传 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="图标" prop="" size="mini">
              <el-upload
                ref="upload"
                class="upload-box"
                action=""
                :limit="1"
                list-type="picture-card"
                :http-request="handleUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t("table.cancel") }}</el-button>
        <el-button
          type="primary"
          :disabled="this.submitBtn"
          @click="dialogStatus === 'create' ? createData() : updateData()"
          >{{ $t("table.confirm") }}</el-button
        >
      </div>
    </el-dialog>

    <!-- 上传按钮的弹出框 -->
    <el-dialog :visible.sync="showUpload" :title="textMap[dialogStatus]" width="400px">
      <DialogUploadModule
        v-if="dialogStatus == 'upload'"
        @hideDialogUpload="handleUploadModule"
      />

      <DialogLoadModule
        v-if="dialogStatus == 'load'"
        @cancelLoad="handleCancelLoad"
        @confirmLoad="handleConfirmLoad"
        :moduleList="moduleList"
      />
    </el-dialog>
  </el-container>
</template>

<script>
// import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import {
  fetchList,
  saveModule,
  deleteModuleData,
  changeModuleState,
} from "@/api/myApi/systemModule";
import { serachDic } from "@/api/myApi/searchDic";
import { handleupload } from "@/utils/myUtils/upload";
import { formatData, formatDataOfParent } from "@/utils/myUtils/RecursionData";
import DialogUploadModule from "./dialogUploadModule/index";
import DialogLoadModule from "./dialogLoadModule/index";
import DetailTalbe from "./detailTable/index";

/**
 * 过滤参数
 */
const filterParam = (data) => {
  if (typeof data == "object" && data.type == "add") {
    data.isexpand = data.isexpand == true ? "1" : "0";
    data.allowButton = data.allowButton == true ? "1" : "0";
    data.allowView = data.allowView == true ? "1" : "0";
    data.allowForm = data.allowForm == true ? "1" : "0";
    data.authority = data.authority == true ? "1" : "0";
    data.dataScope = data.dataScope == true ? "1" : "0";
    data.enabled = data.enabled == true ? "1" : "0";
  } else if (typeof data == "object" && data.type == "edit") {
    data.isexpand = data.isexpand == "1" ? true : false;
    data.allowButton = data.allowButton == "1" ? true : false;
    data.allowView = data.allowView == "1" ? true : false;
    data.allowForm = data.allowForm == "1" ? true : false;
    data.authority = data.authority == "1" ? true : false;
    data.dataScope = data.dataScope == "1" ? true : false;
    data.enabled = data.enabled == "1" ? true : false;
  } else {
    return "data is not an object";
  }
};
export default {
  components: {
    DialogUploadModule,
    DialogLoadModule,
    DetailTalbe,
    // Pagination,DialogUploadModule
  },
  computed: {
    //引入（模块）用
    moduleList() {
      return this.tableList.filter((item) => item.parentId == "0");
    },
  },
  data() {
    return {
      imageUrl: "", //临时存头像的地址。
      showUpload: false, //控制上传弹窗
      categoryList: [], //模块分类的循环数组
      submitBtn: false, //控制表单提交按钮（上传图片期间不允许提交表单）
      total: 0, //返回的总数，小于10不显示分页组件
      tableList: [], //右侧表格渲染的数组 tableList
      treeList: [], //所有tree的数组
      tableId: 0, //根据该值去获取对应的tableList
      listLoading: false, //是否正在加载
      dialogStatus: "", //弹出框的状态 create是创建 update是编辑
      dialogFormVisible: false, //是否显示弹出框
      listQuery: {
        //请求数据需要的参数
        model: {},
        terminal: {
          code: "01",
          Text: "浏览器",
          modelCode: "modelcode002",
          model: "模块管理",
        },
        page: {
          pageNumber: 1,
          pageSize: 20,
          sortName: "sort_code",
          sortOrder: "desc",
        },
      },
      temp: {
        //新增，编辑时候的默认值。
        moduleId: "", //主键id
        moduleCode: "", //模块编码
        fullName: "", //名称
        fullNameMgl: "", //蒙语名称
        parent: "", //上级模块
        parentId: "", //上级模块id
        parentMgl: "", //上级的蒙语名称
        category: "", //模块分类
        categoryCode: "", //模块分类编码
        moduleIcon: "", //模块图标
        location: "", //图标地址
        originalPic: "", //图标地址
        thumbnail: "", //图标缩略图地址
        reducePic: "", //图标压缩图地址
        target: "", //链接地址
        level: "", //级别层次
        // sortCode: "", //显示顺序
        isexpand: false, //是否展开
        allowButton: false, //是否动态按钮
        allowView: false, //是否动态视图
        allowForm: false, //是否动态表单
        authority: false, //是否访问权限
        dataScope: false, //是否数据范围
        pageLocation: "", //访问地址
        enabled: true, //有效(默认为true,发送请求时候根据true,false改为0||1)
        remark: "", //备注
      },
      rules: {
        //表单验证
        title: [{ required: true, message: "名称必须填写", trigger: "blur" }],
      },
      textMap: {
        //弹出框的标题
        update: "编辑",
        create: "添加",
        upload: "导入",
        load: "引入",
      },
    };
  },
  methods: {
    //获取tree数据
    //点击获取当前节点树的id
    setTreeId(data, node, self) {
      return;
      // this.setParent(data);
      // this.getTableList();
    },
    //点击新增表单中的tree
    setAddTreeId(data, node, self) {
      this.setParent(data);
    },
    //辅助函数设置temp的参数
    setParent(data) {
      this.tableId = data.moduleId;
      this.temp.parent = data.fullName;
      this.temp.parentId = data.moduleId;
      this.temp.parentMgl = data.fullNameMgl;
    },
    //获取tree数据
    async getTreeList() {
      // this.treeList = this.ta;
    },
    //根据tableId获取数据
    async getTableList() {
      this.listLoading = true;
      //这里调接口：base/module/find。
      try {
        console.log("请求列表参数", this.listQuery);
        this.listLoading = false;
        const res = await fetchList(this.listQuery);
        if (res.code == 200) {
          this.total = res.data.total;
          this.tableList = res.data.rows;
          //递归得到树
          this.treeList = formatDataOfParent(res.data.rows, "moduleId");
          this.listLoading = false;
        }
      } catch (error) {
        console.log("获取数据失败", error);
      }
    },
    //点击分页组件获取数据
    getTableListByPage(val) {
      if (val) {
        this.listQuery.page.pageNumber = val.page;
        this.listQuery.page.pageSize = val.limit;
        //刷新数据
        this.getTableList();
      }
    },
    //点击刷新按钮
    refrensh() {
      this.getTableList(); //重新刷新页面
    },
    //点击新增按钮
    //重置Temp对象（即表格单行数据）
    resetTemp() {
      this.temp = {
        //添加按钮默认表单内容
        moduleId: "", //主键id
        moduleCode: "", //模块编码
        fullName: "", //名称
        fullNameMgl: "", //蒙语名称
        parent: "", //上级模块
        parentId: "", //上级模块id
        parentMgl: "", //上级的蒙语名称
        category: "", //模块分类
        categoryCode: "", //模块分类编码
        moduleIcon: "", //模块图标
        location: "", //图标位置
        originalPic: "", //图标地址
        thumbnail: "", //图标缩略图地址
        reducePic: "", //图标压缩图地址
        target: "iframe", //链接地址
        level: "", //级别层次
        // sortCode: "", //显示顺序
        isexpand: false, //是否展开
        allowButton: false, //是否动态按钮
        allowView: false, //是否动态视图
        allowForm: false, //是否动态表单
        authority: false, //是否访问权限
        dataScope: false, //是否数据范围
        pageLocation: "", //访问地址
        enabled: true, //有效(默认为true,发送请求时候根据true,false改为0||1)
        remark: "", //备注
      };
    },
    //点击新增按钮
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs.dataForm.clearValidate();
        this.$refs.upload.clearFiles();
      });
    },
    //点击新增按钮的确认按钮
    createData() {
      this.dialogFormVisible = true;
      this.$refs.dataForm.validate(async (valid) => {
        if (valid) {
          this.$nextTick(() => {
            this.$refs.upload.clearFiles();
          });
          let tempData = {
            ...this.temp,
            type: "add", //根据不同类型操作,修改参数
          };
          tempData = this.setParams(tempData);
          filterParam(tempData); //修改参数
          //  this.temp.enabled= this.temp.enabled==true?'1':"0";
          let data = [];
          data.push(tempData);
          let query = {
            models: data,
            terminal: {
              code: "01",
              Text: "浏览器",
              modelCode: "modelcode002",
              model: "模块管理",
            },
          };
          console.log("新增按钮确认按钮打印", query);
          this.dialogFormVisible = false;
          //这里调接口：base/module/save
          try {
            const res = await saveModule(query);
            if (res.code == 200) {
              this.$notify({
                title: "成功",
                message: "创建成功",
                type: "success",
                duration: 2000,
              });
              this.getTableList(this.tableId);
            }
          } catch (error) {
            console.log("新增报错", error);
          }
        }
      });
    },
    setParams(tempData) {
      console.log("setCategory打印", this.temp.category);
      if (tempData.category == "业务") {
        tempData.categoryCode = "1";
      } else if (tempData.category == "系统") {
        tempData.categoryCode = "0";
      }
      if (!tempData.moduleIcon || !tempData.location) {
        tempData.moduleIcon = "默认图标";
        tempData.location = "默认地址";
      }
      return tempData;
    },
    //点击编辑按钮
    handleUpdate(row) {
      //辅助修改参数
      const tempData = {
        ...row,
        type: "edit",
      };
      filterParam(tempData); //修改参数
      this.imageUrl = tempData.location + tempData.moduleIcon;
      console.log("图片地址", this.imageUrl);
      this.temp = Object.assign({}, this.temp, tempData);
      // console.log("编辑按钮打印", this.temp);
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs.dataForm.clearValidate();
        this.$refs.upload.clearFiles();
      });
    },
    //点击编辑按钮的确认按钮
    async updateData() {
      this.$refs["dataForm"].validate(async (valid) => {
        if (valid) {
          this.$nextTick(() => {
            this.$refs.upload.clearFiles();
          });
          const tempData = Object.assign({}, this.temp);
          tempData.type = "add"; //把参数中的boolean换成"1"||"0"
          filterParam(tempData); //修改参数

          const data = [];
          data.push(tempData);

          let query = {
            models: data,
            terminal: {
              code: "01",
              Text: "浏览器",
              modelCode: "modelcode002",
              model: "模块管理",
            },
          };
          this.dialogFormVisible = false;
          console.log("编辑按钮确认按钮打印", query);
          //调接口修改数据
          try {
            const res = await saveModule(query);
            if (res.code == 200) {
              this.$notify({
                title: "成功",
                message: "更新成功",
                type: "success",
                duration: 2000,
              });
              this.getTableList();
            }
          } catch (error) {
            console.log("编辑按钮确认按钮报错", error);
          }
        }
      });
    },
    //点击删除按钮
    async handleDelete(row, index) {
      const data = [];
      const tempData = {
        moduleId: row.moduleId,
        deleteMark: "1", //软删除
      };
      data.push(tempData);
      let query = {
        models: data,
        terminal: {
          code: "01",
          Text: "浏览器",
          modelCode: "modelcode002",
          model: "模块管理",
        },
      };
      try {
        await this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        try {
          //物理删除
          // const res = await deleteModuleData(data);
          //软删除
          const res = await changeModuleState(query);
          if (res.code === 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            //刷新表格数据
            this.getTableList();
          }
        } catch (error) {}
      } catch (error) {
        this.$message({
          type: "info",
          message: "已取消删除",
        });
      }
    },
    //辅助函数,去除序号前面的0
    handleFilterSortCode(sortCode) {
      return sortCode.replace(/\b(0+)/gi, "");
    },
    //上传图片到腾讯云
    async handleUpload(e) {
      try {
        const res = await handleupload.call(this, e.file, "jpg", "admin");
        if (res.statusCode == 200) {
          this.submitBtn = false; //解除禁用提交按钮
          let str = res.Location;
          const index = str.indexOf("/");
          this.temp.location = "http://" + str.substring(0, index);
          this.temp.moduleIcon = str.substring(index, str.length);
        }
      } catch (error) {
        console.log(error);
      }
    },
    //点击导入按钮（弹出对话框，导入excel）
    handleUploadModule() {
      this.showUpload = true;
      this.dialogStatus = "upload";
    },
    //点击引入按钮（load）
    handleLoadModule() {
      this.showUpload = true;
      this.dialogStatus = "load";
    },
    //点击load弹框的取消按钮
    handleCancelLoad() {
      //关闭弹窗
      this.showUpload = false;
    },
    //点击load弹框的确认按钮
    async handleConfirmLoad(val) {
      //关闭弹窗
      this.showUpload = false;
      console.log("点击load弹窗打印", val);
      let tempData = {
        model: {
          dataDictionaryId: val,
        },
        terminal: {
          code: "01",
          Text: "浏览器",
          modelCode: "modelcode001",
          model: "数据字典管理",
        },
      };
      try {
        const res = await dicLoad(tempData);
        if (res.code == 200) {
          //引入成功，然后XXXX！！！
          this.$notify({
            title: "成功",
            message: "引入成功",
            type: "success",
            duration: 2000,
          });
        }
      } catch (error) {
        console.log("引入字典的错误打印", error);
      }
    },
  },
  async created() {
    this.getTableList();
    //获取下模块信息，根据code值Module
    try {
      const res = await serachDic({
        dictionary: {
          code: "Module",
          companyCode: "999",
        },
        page: {
          pageNumber: 1,
          pageSize: 12,
          sortName: "sort_code",
          sortOrder: "desc",
        },
        terminal: {
          code: "01",
          Text: "浏览器",
          modelCode: "modelcode001",
          model: "模块名称",
        },
      });
      if (res.code == 200) {
        this.categoryList = res.data;
      }
    } catch (error) {
      console.log("查询字典失败", error);
    }
  },
};
</script>

<style scoped lang="scss">
.inner-title {
  padding: 5px 5px 10px 5px;
}
.el-row {
  margin: 10px auto;
}
.class-btn {
  text-align: left;
  width: 220px;
  overflow: hidden;
}
.class-dropdown-menu {
  width: 220px;
  overflow-x: hidden;
}

.in-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.left-box {
  height: calc(100vh - 130px);
  // overflow-y: scroll;
}
.upload-box {
  width: 180px;
  height: 100px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding-left: 90px;
  position: relative;
}
.avatar {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 90px;
  height: 90px;
}
.right-box {
  overflow-y: scroll;
  border: 1px solid $tBorderColor;
  min-width: 500px;
  box-sizing: border-box;
  padding: 10px 25px 10px 25px;
  height: calc(100vh - 130px);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  margin-left: 20px;
}
</style>
