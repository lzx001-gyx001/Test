<!-- 蒙医药用数据库管理 -->
<template>
  <el-container class="container-box">
    <!-- 表格区域 -->
    <el-col class="right-box">
      <!-- 按钮 -->
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
        <BotanyTable
          :listLoading="this.listLoading"
          :tableList="this.tableList"
          @handleUpdate="handleUpdate"
          @handleDelete="handleDelete"
        />
      </el-row>
    </el-col>

    <!-- 新增、编辑弹框 -->
    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      width="850px"
      style="min-width: 800px; min-height: 675px"
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
            <el-form-item label="药名" prop="botanyName">
              <el-input v-model="temp.botanyName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="拉丁文名称" prop="latinName">
              <el-input v-model="temp.latinName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 方剂编码/俗称 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="方剂">
              <el-autocomplete
                class="inline-input"
                v-model="temp.recipe"
                :fetch-suggestions="querySearch"
                placeholder="请输入方剂名称"
                :trigger-on-focus="false"
                @select="handleSelect"
              >
                <i slot="suffix" class="el-input__icon el-icon-search"></i>
              </el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="俗称" prop="botanyName1">
              <el-input v-model="temp.botanyName1"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="形态特征 " prop="feature">
              <el-select
                v-model="temp.feature"
                placeholder="请选择"
                @change="handleSelectFeature"
              >
                <el-option
                  v-for="(item, index) in this.featureList"
                  :key="index"
                  :label="item.text"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="植物科目" prop="plantFamily">
              <el-input v-model="temp.plantFamily" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="花期 " prop="florescence">
              <!-- <el-select v-model="value1" multiple placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select> -->
              <el-select
                v-model="temp.florescence"
                value-key="code"
                multiple
                placeholder="请选择"
                @change="handleSelectFlorescence"
              >
                <el-option
                  v-for="item in this.florescenceList"
                  :key="item.code"
                  :label="item.text"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="种子期" prop="seedStage">
              <el-select
                v-model="temp.seedStage"
                placeholder="请选择"
                @change="handleSelectSeedStage"
              >
                <el-option
                  v-for="(item, index) in this.seedStageList"
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
            <el-form-item label="入药部分 " prop="medicinePart">
              <el-select
                v-model="temp.medicinePart"
                placeholder="请选择"
                @change="handleSelectMedicinePart"
              >
                <el-option
                  v-for="(item, index) in this.medicinePartList"
                  :key="index"
                  :label="item.text"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="化学成分 " prop="component">
              <el-select
                v-model="temp.component"
                placeholder="请选择"
                @change="handleSelectComponent"
              >
                <el-option
                  v-for="(item, index) in this.componentList"
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
            <el-form-item label="性味 " prop="taste">
              <el-select
                v-model="temp.taste"
                placeholder="请选择"
                @change="handleSelectTaste"
              >
                <el-option
                  v-for="(item, index) in this.tasteList"
                  :key="index"
                  :label="item.text"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="主治功能 " prop="treatEffect">
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
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="说明" prop="remark">
              <el-input v-model="temp.remark" type="input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="选项" prop="enabled">
              <el-checkbox v-model="temp.enabled">有效</el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>

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
import BotanyTable from "./botanyTable/index";
import { getAllDropList } from "@/utils/myUtils/getAllDropList";
import { fetchBotanyList, saveBotany, changeBotanyState } from "@/api/myApi/botany";
import { fetchRecipeList } from "@/api/myApi/recipe";
export default {
  components: {
    BotanyTable,
  },
  data() {
    //这里存放数据
    return {
      treatEffectList: [], //主治功能数组
      tasteList: [], //性味数组
      componentList: [], //入药部分数组
      medicinePartList: [], //如要部分数组
      featureList: [], //形态特征数组
      seedStageList: [], //种子期数组
      recipeList: [], //方剂数组
      florescenceList: [], //花期数组
      listLoading: false, //控制刷新动画的变量
      listQuery: {
        //请求列表的参数
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
      tableList: [], //右边表格的数据
      total: 0, //数据总数
      temp: {
        florescence: [],
      },
      dialogFormVisible: false, //是否显示 编辑表单
      dialogStatus: "", //编辑表单状态：update or create
      textMap: {
        //弹出框的标题
        update: "编辑",
        create: "添加",
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
        const res = await fetchBotanyList(this.listQuery);
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
    //重置表单
    resetTemp() {
      this.temp = {
        recipe: "",
        recipeCode: "", //方剂编码（通过该编码查询药）
        botanyName: "", //药名
        latinName: "", //拉丁文名称
        botanyName1: "", //俗称
        ifhomeImage: "0", //有无封面(默认没有，上传图片后修改该值)
        location: "", //封面位置
        // plantFamilyCode: "", //植物科目编码
        // plantFamily: "暂无", //植物科目
        // florescenceCode: "", //花期编码
        // florescence: "", //花期
        florescence: [],
        // seedStageCode: "", //种子期编码
        // seedStage: "", //种子期
        // featureCode: "", //形态特征编码
        // feature: "", //形态特征
        distribution: "", //分布
        environment: "", //生境
        // medicinePartCode: "", //入药部分编码
        // medicinePart: "", //入药部分
        // componentCode: "", //化学成分编码
        // component: "", //化学成分
        // tasteCode: "", //性味编码
        // taste: "", //性味
        // treatEffectCode: "", //主治功能编码
        // treatEffect: "暂无", //主治功能
        remark: "", //备注
        enabled: true, //有效
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
      tempData.florescence = JSON.stringify(tempData.florescence);
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
        const res = await saveBotany(query);
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
        this.$refs.dataFormEdit.clearValidate();
      });
    },
    // 点击编辑按钮的确认按钮
    updateData() {
      this.$refs.dataFormEdit.validate((valid) => {
        if (valid) {
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
          saveBotany(query)
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
    //设置方剂编码
    // handleSelectRecipeCode(e) {
    //   this.temp.recipe = e.text;
    //   this.temp.recipeCode = e.code;
    // },
    //设置花期
    handleSelectFlorescence(e) {
      this.temp.florescence = e;
    },
    //设置种子期
    handleSelectSeedStage(e) {},
    //设置形态特征
    handleSelectFeature(e) {
      this.temp.feature = e.text;
      this.temp.featureCode = e.code;
    },
    //设置入药部分
    handleSelectMedicinePart(e) {
      this.temp.medicinePart = e.text;
      this.temp.medicinePartCode = e.code;
    },
    //设置化学成分
    handleSelectComponent(e) {
      this.temp.component = e.text;
      this.temp.componentCode = e.code;
    },
    //设置性味
    handleSelectTaste(e) {
      this.temp.taste = e.text;
      this.temp.tasteCode = e.code;
    },
    //设置主治功能
    handleSelectTreatEffect(e) {
      this.temp.treatEffect = e.text;
      this.temp.treatEffectCode = e.code;
    },
    //获取所有下拉列表的数据
    async getDropList() {
      try {
        const [Taste, Component, SeedStage, Florescence] = await getAllDropList([
          "Taste",
          "Component",
          // "MedicinePart", //入药部分暂无
          // "Feature", //形态特征暂无
          "SeedStage",
          "Florescence",
          // "PlantFamily", //植物科目 暂无
        ]);
        this.tasteList = Taste;
        this.componentList = Component;
        this.seedStageList = SeedStage;
        this.florescenceList = Florescence;
      } catch (error) {
        console.log("获取下拉框数据错误", error);
      }
    },
    //远程搜索方剂
    querySearch(queryString, cb) {
      var recipeList = this.recipeList;
      var results = queryString
        ? recipeList.filter(this.createFilter(queryString))
        : recipeList;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    //远程搜索辅助函数
    createFilter(queryString) {
      return (recipe) => {
        return recipe.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0;
      };
    },
    //选择方剂
    handleSelect(e) {
      this.temp.recipe = e.recipeName;
      this.temp.recipeCode = e.recipeCode;
    },
    //获取方剂数据
    async getRecipeList() {
      let listQuery = {
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
      };

      try {
        const res = await fetchRecipeList(listQuery);
        if (res.code == 200) {
          return res.data.rows.map((item) => {
            return {
              ...item,
              value: item.recipeName,
            };
          });
        }
      } catch (error) {
        console.log("获取方剂数据失败打印", error);
        return [];
      }
    },
    //上传图片
    handleUpload(e) {
      handleupload
        .call(this, e.file, "jpg", "admin")
        .then((res) => {
          this.submitBtn = false; //解除禁用提交按钮
          this.temp.location = res.Location;
          this.temp.ifhomeImage = "1";
          console.log("上传成功", this.temp.location);
        })
        .catch((error) => {
          this.temp.ifhomeImage = "0";
        });
    },
  },
  created() {
    //页面刚加载的时候
    this.getTableList();
    this.getDropList();
  },
  async mounted() {
    this.recipeList = await this.getRecipeList();
  },
  destroyed() {},
};
</script>
<style lang="scss" scoped>
.container-box {
  & .right-box {
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
  & >>> .el-autocomplete {
    width: 255px;
  }
}
</style>
