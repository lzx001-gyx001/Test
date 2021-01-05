<template>
  <el-container class="container-box">
    <!-- 左侧tree组件-->
    <!-- <el-col :span="5" style="marginright: 0; minwidth: 120px" v-if="this.treeList.length">
      <el-card style="padding: 0" class="left-box">
        <div class="tree-title">公司目录</div>
        <el-tree
          @node-click="clickOuterTree"
          ref="outerTree"
          :data="treeList"
          default-expand-all
          v-loading="listTreeLoading"
        />
      </el-card>
    </el-col> -->
    <!-- 右侧表格区域 -->
    <el-col class="right-box">
      <!-- 按钮区域 -->
      <el-row class="btn-row">
        <el-button class="btn-green" icon="el-icon-edit" @click="refrensh">{{
          "刷新"
        }}</el-button>
        <!-- <el-button icon="el-icon-circle-plus-outline" @click="handleCreate">{{
          "新增"
        }}</el-button> -->
      </el-row>
      <!-- 表格区域 -->
      <el-row>
        <el-table
          :key="0"
          v-loading="listLoading"
          :data="tableList"
          border
          fit
          highlight-current-row
          style="width: 100%"
        >
          <!-- 序号 -->
          <el-table-column
            :index="indexMethod"
            type="index"
            :label="$t('table.id')"
            prop="id"
            align="center"
            width="80"
          >
          </el-table-column>

          <!--手机号码 -->
          <el-table-column label="手机号码" prop="mobile" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.mobile }}</span>
            </template>
          </el-table-column>
          <!--验证码 -->
          <el-table-column label="验证码" prop="code" width="150" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.code }}</span>
            </template>
          </el-table-column>
          <!--短信内容-->
          <el-table-column label="短信内容" prop="content" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.nature }}</span>
            </template>
          </el-table-column>
          <!--是否已发送 -->
          <el-table-column label="是否已发送" prop="sended" align="center" width="115">
            <template slot-scope="{ row }">
              <span>{{ row.sended }}</span>
            </template>
          </el-table-column>
          <!-- 是否已获取 -->
          <el-table-column label="是否已获取" prop="gain" width="115" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.gain }}</span>
            </template>
          </el-table-column>
          <!--失效时长  -->
          <el-table-column label="失效时长" prop="gain" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.failureTime + "分钟" }}</span>
            </template>
          </el-table-column>
          <!-- 失效时间 -->
          <el-table-column label="失效时间" prop="gain" align="center">
            <template slot-scope="{ row }">
              <span>{{ formatDate(row.deadlineDate) }}</span>
            </template>
          </el-table-column>
          <!-- 操作 -->
          <el-table-column
            :label="$t('table.actions')"
            align="center"
            width="230"
            class-name="small-padding fixed-width"
          >
            <template slot-scope="{ row, $index }">
              <!-- 编辑按钮 -->
              <!-- <el-button
                ref="dataForm"
                type="primary"
                size="mini"
                @click="handleUpdate(row)"
                >{{ $t("table.edit") }}</el-button
              > -->

              <!-- 删除按钮 -->
              <el-button
                v-if="row.status != 'deleted'"
                size="mini"
                type="danger"
                @click="handleDelete(row, $index)"
                >{{ "删除" }}</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <!-- 分页组件 -->
      <pagination
        v-show="total > 9"
        :total="total"
        :page.sync="listQuery.page.pageNumber"
        :limit.sync="listQuery.page.pageSize"
        @pagination="getTableListByPage"
      />
    </el-col>
  </el-container>
</template>

<script>
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
// import { fetchCompanyList } from "@/api/myApi/company";
// import { serachDic } from "@/api/myApi/searchDic";
// import { formatDataOfParent } from "@/utils/myUtils/RecursionData";
import { format } from "@/utils/myUtils/formatDate";
import { fetchSmsList, saveSms, changeSmsState } from "@/api/myApi/shortMessage";
export default {
  components: {
    Pagination,
  },
  data() {
    return {
      natureList: [], //部门性质选项的数组
      total: 0, //返回的总数，小于10不显示分页组件
      tableList: [], //右侧表格渲染的数组 tableList
      treeList: [], //所有tree的数组
      tableId: 0, //根据该值去获取对应的tableList
      listLoading: false, //是否正在加载
      listTreeLoading: false, //树是否在加载
      dialogStatus: "", //弹出框的状态 create是创建 update是编辑
      dialogFormVisible: false, //是否显示弹出框
      listQuery: {
        //请求数据需要的参数
        model: {},
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
          model: "模块名称",
        },
      },
      listTreeQuery: {
        model: {},
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
          model: "模块名称",
        },
      },
      temp: {
        //添加按钮默认表单内容
        departmentCode: "", //部门编码
        fullName: "", //部门名称
        shortName: "", //部门简称
        nature: "", //部门性质（字典获取）
        natureCode: "", //部门性质编码（字典获取）
        manager: "", //负责人
        phone: "", //联系电话
        email: "", //邮件
        fax: "", //传真
        enabled: "1", //选项
        remark: "", //说明
      },
      //新增表单验证
      // rules: {

      //   title: [{ required: true, message: "名称必须填写", trigger: "blur" }],
      // },
      textMap: {
        //弹出框的标题
        update: "编辑",
        create: "添加",
      },
    };
  },
  methods: {
    //点击outerTree
    clickOuterTree(data, node, self) {
      console.log("outerTree", data);
      this.tableId = data.id;
    },
    //获取tree数据
    async getTreeList() {
      this.listTreeLoading = true;
      try {
        const res = await fetchCompanyList(this.listTreeQuery);
        if (res.code == 200) {
          this.listTreeLoading = false;
          this.treeList = formatDataOfParent(res.data.rows, "companyId");
        }
      } catch (error) {
        this.listTreeLoading = false;
      }
    },
    //根据tableId获取数据
    async getTableList() {
      this.listLoading = true;
      try {
        console.log("department列表请求参数打印", this.listQuery);
        this.listQuery.model.deleteMark = "0";
        const res = await fetchSmsList(this.listQuery);
        console.log(res);
        if (res.code == 200) {
          this.listLoading = false;
          this.tableList = res.data.rows;
          this.total = res.data.total;
        }
      } catch (error) {
        this.listLoading = false;
      }
    },
    //根据code从字典获取渲染【部门性质】select的数组
    // async getNatureList() {
    //   let query = {
    //     dictionary: {
    //       companyCode: "999",
    //       code: "Nature",
    //     },
    //     terminal: {
    //       code: "01",
    //       Text: "浏览器",
    //       modelCode: "modelcode001",
    //       model: "模块名称",
    //     },
    //   };
    //   console.log("字典请求参数打印:", query);
    //   try {
    //     const res = await serachDic(query);
    //     if (res.code == 200) {
    //       this.natureList = res.data;
    //       console.log("字典请求打印:", res);
    //     }
    //   } catch (error) {}
    // },
    //点击分页组件获取数据
    getTableListByPage(val) {
      if (val) {
        this.listQuery.page.pageNumber = val.page;
        this.listQuery.page.pageSize = val.limit;
      }
      this.getTableList();
    },
    //点击刷新按钮
    refrensh() {
      this.getTableList(); //重新刷新页面
      // this.getTreeList(); //获取tree的数据
    },
    //点击新增按钮
    //重置Temp对象（即表格单行数据）
    resetTemp() {
      this.temp = {
        departmentCode: "", //部门编码
        fullName: "", //部门名称
        shortName: "", //部门简称
        nature: "", //部门性质（字典获取）
        natureCode: "", //部门性质编码（字典获取）
        manager: "", //负责人
        phone: "", //联系电话
        email: "", //邮件
        fax: "", //传真
        enabled: true, //选项
        remark: "", //说明
      };
    },
    //点击【新增按钮】
    handleCreate() {
      // if (!this.tableId) {
      //   this.$alert("请选择左边的公司", "提示", {
      //     confirmButtonText: "确定",
      //   });
      //   return;
      // }
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    //点击【新增按钮的确认按钮】
    createData() {
      this.dialogFormVisible = true;
      this.$refs["dataForm"].validate(async (valid) => {
        if (valid) {
          this.setTempData(this.temp.nature);
          let data = [];
          this.temp.enabled = this.temp.enabled == true ? "1" : "0";
          data.push(this.temp);
          let query = {
            models: data,
            terminal: {
              code: "01",
              Text: "浏览器",
              modelCode: "modelcode002",
              model: "模块管理",
            },
          };
          console.log("新增【确认】按钮打印：", query);
          this.dialogFormVisible = false;
          try {
            const res = await saveSms(query);
            if (res.code == 200) {
              this.$notify({
                title: "成功",
                message: "新增成功",
                type: "success",
                duration: 2000,
              });
              this.getTableList(); //刷新数据
            }
          } catch (error) {}
        }
      });
    },
    //辅助函数,设置natureCode的值
    setTempData(name) {
      switch (name) {
        case "咨询性":
          this.temp.natureCode = "2";
          break;
        case "协调性":
          this.temp.natureCode = "1";
          break;
        case "综合性":
          this.temp.natureCode = "0";
          break;
      }
    },
    //点击【编辑】按钮
    handleUpdate(row) {
      this.temp = Object.assign({}, row); //合并对象
      this.temp.enabled = this.temp.enabled == "1" ? true : false;
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    //点击【编辑按钮的确认按钮】
    async updateData() {
      this.$refs["dataForm"].validate(async (valid) => {
        if (valid) {
          let tempData = Object.assign({}, this.temp);
          //调接口修改数据
          this.setTempData(tempData.nature);
          tempData.enabled = tempData.enabled == true ? "1" : "0";
          let data = [];
          data.push(tempData);
          let query = {
            models: data,
            terminal: {
              code: "01",
              Text: "浏览器",
              modelCode: "modelcode001",
              model: "模块名称",
            },
          };
          this.dialogFormVisible = false;
          console.log("【编辑确认按钮打印】", query);
          try {
            const res = await saveSms(query);
            if (res.code == 200) {
              this.$notify({
                title: "成功",
                message: "更新成功",
                type: "success",
                duration: 2000,
              });
              //重新获取数据
              this.getTableList();
            }
          } catch (error) {
            console.log("【编辑报错打印】:", error);
          }
        }
      });
    },
    //点击【删除按钮】
    async handleDelete(row) {
      //这里删除数据
      const query = {
        models: [{ departmentId: row.departmentId, deleteMark: "1" }],
        terminal: {
          code: "01",
          Text: "浏览器",
          modelCode: "modelcode002",
          model: "模块管理",
        },
      };
      try {
        const res = await changeSmsState(query);
        if (res.code == 200) {
          this.$notify({
            title: "成功",
            message: "删除成功",
            type: "success",
            duration: 2000,
          });
          this.getTableList();
        }
      } catch (error) {
        console.log("表格删除【按钮报错打印】", error);
      }
    },
    // 格式化时间
    formatDate(data) {
      return format(data);
    },
    indexMethod(index) {
      return +index + 1;
    },
  },
  created() {
    //获取默认table数据
    this.getTableList();
    //获取treeList
    // this.getTreeList();
    //获取 新增、编辑弹框中 部门性质的 列表
    // this.getNatureList();
  },
};
</script>

<style scoped lang="scss">
.class-btn {
  width: 220px;
}
.class-dropdown-menu {
  width: 220px;
}

.in-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.left-box {
  height: calc(100vh - 130px);
  margin-right: 10px;
  box-sizing: border-box;
}
.right-box {
  border: 1px solid $tBorderColor;
  min-width: 500px;
  box-sizing: border-box;
  padding: 20px;
  height: calc(100vh - 130px);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.tree-title {
  margin-bottom: 20px;
}
.el-dialog__footer {
  padding-right: 50px !important;
}
</style>
