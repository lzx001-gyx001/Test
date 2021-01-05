<!-- 方剂数据库管理 -->
<template>
  <el-container class="container-box">
    <!-- 右侧区域 -->
    <el-col class="right-box">
      <el-row class="btn-row">
        <el-button
          :loading="this.listLoading"
          @click="handleRefresh"
          class="btn-green"
          icon="el-icon-edit"
          >刷新</el-button
        >

        <el-button
          :loading="this.listLoading"
          @click="handleCreate"
          class="btn-green"
          icon="el-icon-edit"
          >新增</el-button
        >
      </el-row>
      <!-- 右侧表格 -->
      <el-row>
        <RecipeTable
          :listLoading="this.listLoading"
          :tableList="this.tableList"
          @handleDelete="handleDelete"
          @handleUpdate="handleUpdate"
        />
      </el-row>
    </el-col>

    <!-- 弹框 -->
    <!-- 新增、编辑弹框 -->
    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      width="850px"
      style="min-width: 800px; min-height: 645px"
    >
      <el-form
        ref="dataFormEdit"
        :model="temp"
        label-position="right"
        label-width="120px"
        style="width: 750px; margin: 30px 20px 0 0"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="方剂名称" prop="recipeName">
              <el-input v-model="temp.recipeName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="方剂编码" prop="recipeCode">
              <el-input v-model="temp.recipeCode"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 方剂类型/主要成分 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="方剂来源" prop="source">
              <el-select
                value-key="2"
                v-model="temp.source"
                placeholder="请选择"
                @change="handleSelectSource"
              >
                <el-option
                  v-for="(item, index) in this.sourceList"
                  :key="index"
                  :label="item.text"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="方剂类型" prop="recipeType">
              <el-select
                value-key="3"
                v-model="temp.recipeType"
                placeholder="请选择"
                @change="handleSelectRecipeType"
              >
                <el-option
                  v-for="(item, index) in this.recipeTypeList"
                  :key="index"
                  :label="item.text"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="主要成分" prop="mainComponent">
              <el-select
                v-model="temp.mainComponent"
                placeholder="请选择"
                @change="handleSelectMainComponent"
              >
                <el-option
                  v-for="(item, index) in this.mainComponentList"
                  :key="index"
                  :label="item.text"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="主治器官" prop="treatOrgan">
              <el-input v-model="temp.treatOrgan" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="功能主治 " prop="treatEffect">
              <el-select
                v-model="temp.treatEffect"
                placeholder="请选择"
                @change="handleSelectTreatEffect"
              >
                <el-option
                  v-for="(item, index) in this.treatEffectList"
                  :key="index"
                  :label="item.text"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="说明" prop="remark">
              <el-input v-model="temp.remark" type="input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="企业名称" prop="factoryName">
              <el-input v-model="temp.factoryName" type="input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="选项" prop="enabled">
              <el-checkbox v-model="temp.enabled">有效</el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 选项：是否导航，是否启用，是否专题，有效 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="封面图片" prop="">
              <el-upload
                ref="upload"
                class="upload-box-PC"
                action=""
                :limit="1"
                list-type="picture-card"
                :http-request="handleUpload"
              >
                <!-- <img v-if="temp.imageUrl" :src="temp.imageUrl" class="avatar" /> -->
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
          @click="dialogStatus === 'create' ? createData() : updateData()"
          >{{ $t("table.confirm") }}</el-button
        >
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
import RecipeTable from "./recipeTable/index";
import { serachDic } from "@/api/myApi/searchDic";
import { handleupload } from "@/utils/myUtils/upload";
import { fetchRecipeList, saveRecipe, changeRecipeState } from "@/api/myApi/recipe";
export default {
  components: {
    RecipeTable,
  },
  data() {
    //这里存放数据
    return {
      sourceList: [], //方剂来源数据
      recipeTypeList: [], //方剂类型数据
      mainComponentList: [], //主要成分数据
      treatEffectList: [], //功能主治数据treatEffect
      tableList: [], //右边表格的数据
      listLoading: false, //table正在加载
      total: 0, //数据总数
      temp: {},
      dialogFormVisible: false, //是否显示 编辑表单
      dialogStatus: "", //编辑表单状态：update or create
      textMap: {
        //弹出框的标题
        update: "编辑",
        create: "添加",
      },
      listQuery: {
        model: {
          deleteMark: "0",
          enabled: "1",
        },
        page: {
          pageNumber: 1,
          pageSize: 10,
          sortName: "sort_code",
          sortOrder: "desc",
        },
        terminal: {
          code: "01",
          Text: "浏览器",
          modelCode: "modelcode001",
          model: "内容目录",
        },
      },
    };
  },
  methods: {
    //点击刷新
    handleRefresh() {
      this.getTableList();
    },
    //获取表格数据
    async getTableList() {
      this.listLoading = true;
      try {
        const res = await fetchRecipeList(this.listQuery);
        if (res.code == 200) {
          this.total = res.data.total;
          this.tableList = res.data.rows;
          this.listLoading = false;
        }
      } catch (error) {
        console.log("获取数据列表失败", error);
        this.listLoading = false;
      }
    },
    //重置Temp对象（即表格单行数据）
    resetTemp() {
      this.temp = {
        recipeName: "", //"方剂名称",
        recipeCode: "", //方剂编码
        ifhomeImage: "0", //有无封面
        location: "", //封面位置
        sourceCode: "", //来源编码(下拉框)
        source: "", //来源  (下拉框)
        recipeTypeCode: "", //方济类型编码(下拉框) [{code:0,text:浏览器},5,6,7],
        recipeType: "", //方剂类型(下拉框)
        mainComponentCode: "", //主要成分编码(下拉框)
        mainComponent: "", //主要成分(下拉框)
        treatOrganCode: "", //主治器官编码(下拉框)
        treatOrgan: "字典暂无", //主治器官(下拉框)
        factoryName: "", //企业名称
        treatEffectCode: "", //主治功能编码(下拉框)
        treatEffect: "", //主治功能(下拉框)
        remark: "", // "备注",
        enabled: true,
      };
    },
    //点击新增按钮
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
    },
    //点击新增按钮的确认按钮
    async createData() {
      this.dialogFormVisible = true;
      this.dialogFormVisible = false;
      let tempData = Object.assign({}, this.temp);
      //这里修改新增需要的参数
      tempData.enabled = tempData.enabled == true ? "1" : "0";
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
      console.log("新增按钮确认打印", query);
      try {
        const res = await saveRecipe(query);
        if (res.code == 200) {
          this.$notify({
            title: "成功",
            message: "新增成功",
            type: "success",
            duration: 2000,
          });
          this.getTableList();
        }
      } catch (error) {
        console.log("新增失败打印：", error);
      }
    },
    // 点击编辑按钮
    handleUpdate(row) {
      // 合并对象
      this.temp = Object.assign({}, row);
      this.temp.enabled = this.temp.enabled == "1" ? true : false;
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataFormEdit"].clearValidate();
      });
    },
    // 点击编辑按钮的确认按钮
    updateData() {
      this.$refs.dataFormEdit.validate((valid) => {
        if (valid) {
          this.$nextTick(() => {
            this.$refs.upload.clearFiles();
          });
          this.dialogFormVisible = false;

          let tempData = Object.assign({}, this.temp);
          tempData.enabled = tempData.enabled == true ? "1" : "0";
          let data = [];
          data.push(tempData);
          let query = {
            models: data,
            terminal: {
              code: "01",
              Text: "浏览器",
              modelCode: "modelcode002",
              model: "方剂管理",
            },
          };
          console.log("点击编辑按钮确认按钮：", query);
          saveRecipe(query)
            .then((res) => {
              //修改完数据，再获重新获取数据
              //AJAX()
              if (res.code == 200) {
                this.dialogFormVisible = false;
                this.$notify({
                  title: "成功",
                  message: "更新成功",
                  type: "success",
                  duration: 2000,
                });
                //AJAX请求刷新数据
                this.getTableList();
              }
            })
            .catch((error) => {
              console.log("修改接口报错,", error);
            });
        }
      });
    },
    //点击删除按钮
    async handleDelete(row) {
      let data = [];
      data.push({
        recipeId: row.recipeId,
        deleteMark: "1",
      });
      let query = {
        models: data,
        terminal: {
          code: "01",
          Text: "浏览器",
          modelCode: "modelcode002",
          model: "方剂管理",
        },
      };
      try {
        await this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        try {
          const res = await changeRecipeState(query);
          if (res.code == 200) {
            this.$notify({
              title: "成功",
              message: "删除成功",
              type: "success",
              duration: 2000,
            });
            //刷新数据
            this.getTableList();
          }
        } catch (error) {
          console.log("删除失败打印：", error);
        }
      } catch (error) {
        this.$message({
          type: "info",
          message: "已取消删除",
        });
      }
    },
    //读字典
    async getDicList(type) {
      let searchQuery = {
        dictionary: {
          companyCode: "999",
          code: type,
        },
        page: {
          pageNumber: 1,
          pageNumber: 50,
          sortOrder: "desc",
          sort_name: "code",
        },
        terminal: {
          code: "01",
          Text: "浏览器",
          modelCode: "modelcode02",
          model: "用户模块",
        },
      };
      try {
        const res = await serachDic(searchQuery);
        if (res.code == 200) {
          return res.data;
        }
      } catch (error) {}
    },
    //选择方剂来源
    handleSelectSource(e) {
      this.temp.sourceCode = e.code;
      this.temp.source = e.text;
    },

    //选择方剂类型
    handleSelectRecipeType(e) {
      this.temp.recipeType = e.text;
      this.temp.recipeTypeCode = e.code;
    },
    //选择主要成分
    handleSelectMainComponent(e) {
      this.temp.mainComponent = e.text;
      this.temp.mainComponentCode = e.code;
    },
    //选择功能主治
    handleSelectTreatEffect(e) {
      this.temp.treatEffect = e.text;
      this.temp.treatEffectCode = e.code;
    },

    //获取下拉框数据
    async getAllDropList() {
      try {
        const [RecipeType, RecipeSource, MainComponent, TreatEffect] = await Promise.all(
          ["RecipeType", "RecipeSource", "MainComponent", "TreatEffect"].map(
            async (item) => await this.getDicList(item)
          )
        );
        this.recipeTypeList = RecipeType;
        this.sourceList = RecipeSource;
        this.mainComponentList = MainComponent;
        this.treatEffectList = TreatEffect;
      } catch (error) {
        console.log(error);
      }
    },
    handleUpload(e) {
      handleupload.call(this, e.file, "jpg", "admin").then((res) => {
        this.submitBtn = false; //解除禁用提交按钮
        this.temp.location = res.Location;
        console.log("上传成功", this.temp.location);
      });
    },
  },
  async created() {
    this.getAllDropList(); //获取所有下拉框数据
    this.getTableList(); //获取数据列表
  },
  mounted() {},
  destroyed() {},
};
</script>
<style lang="scss" scoped>
.container-box {
  .right-box {
    box-sizing: border-box;
    padding: 20px;
    height: calc(100vh - 130px);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  & >>> .el-select {
    & .el-input {
      width: 255px;
    }
  }
}
</style>
