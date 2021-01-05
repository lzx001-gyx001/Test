<!-- 简历 -->
<template>
  <el-container class="container-box">
    <!-- 左边的树 -->
    <!-- <el-col :span="5" class="left-box">
      <el-tree
        v-loading="listLoading"
        @node-click="leftTreeOnClick"
        ref="leftTree"
        :data="treeList"
        class="filter-tree"
        default-expand-all
      />
    </el-col> -->

    <!-- 右侧区域 -->
    <el-col class="right-box">
      <el-row class="btn-row">
        <el-button @click="handleRefresh" class="btn-green" icon="el-icon-edit"
          >刷新</el-button
        >
        <el-button
          class="filter-item btn-blue"
          style="margin-left: 10px"
          icon="el-icon-edit"
          @click="handleCreate"
          >{{ "新增" }}</el-button
        >
      </el-row>
      <!-- 右侧表格     v-if="this.tableList.length"-->
      <el-row>
        <el-col>
          <RightTable
            :listLoading="this.listLoading"
            :tableList="this.tableList"
            @handleDelete="handleDelete"
            @handleUpdate="handleUpdate"
          />
        </el-col>
      </el-row>
      <!-- 分页组件 -->
      <el-row>
        <pagination
          v-show="total > 10"
          :total="total"
          :page.sync="listQuery.page.pageNumber"
          :limit.sync="listQuery.page.pageSize"
          @pagination="getTableListByPage"
        />
      </el-row>
    </el-col>

    <!--新增、 编辑弹框 -->
    <el-dialog
      v-if="this.dialogFormVisible"
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      width="1040px"
      class="dialog-box"
    >
      <DialogForm
        :dialogStatus="this.dialogStatus"
        :temp="this.temp"
        @handleCancelDialog="handleCancelDialog"
        @createData="createData"
        @updateData="updateData"
      />
    </el-dialog>
  </el-container>
</template>

<script>
import Pagination from "@/components/Pagination";
import RightTable from "./rightTable/index";
import { fetchResumeList, saveResume, changeResumeState } from "@/api/myApi/resume";
import DialogForm from "@/views/webManage/resume/dialogForm/index";
export default {
  components: {
    Pagination,
    RightTable,
    DialogForm,
  },
  data() {
    //这里存放数据
    return {
      tableId: 0, //树的id
      treeList: [], //左边树的数据
      tableList: [], //右边表格的数据
      total: 0, //数据总数
      listLoading: false, //table正在加载
      listQuery: {
        models: [
          {
            // interactId: "16b3d5ad-294d-11eb-9a19-00163e10dbce",
            enabled: "1",
            deleteMark: "0",
          },
        ],
        page: {
          pageNumber: 1,
          pageSize: 10,
          sortName: "stop_date",
          sortOrder: "desc",
        },
        terminal: {
          code: "01",
          Text: "浏览器",
          modelCode: "modelcode002",
          model: "模块管理",
        },
      },
      dialogFormVisible: false, //是否显示 编辑表单
      dialogStatus: "", //编辑表单状态：update or create
      textMap: {
        create: "新增",
        update: "编辑",
      },
      temp: {},
    };
  },
  methods: {
    //获取表格数据
    async getTableList() {
      try {
        const res = await fetchResumeList(this.listQuery);
        if (res.code == 200) {
          this.total = res.data.total;
          this.tableList = res.data.rows;
        }
      } catch (error) {
        console.log("获取数据列表失败", error);
      }
    },

    //点击分页按钮的处理函数
    getTableListByPage(val) {
      console.log("分页组件点击", val);
      this.listQuery.page.pageNumber = val.page;
      this.listQuery.page.pageSize = val.limit;
      //调接口：获取表格信息
      this.getTableList();
    },
    //重置Temp对象（即表格单行数据）
    resetTemp() {
      this.temp = {
        resumeTypeCode: "", //简历类型编码
        resumeType: "", // 简历类型,
        startDate: "", //开始时间
        stopDate: "", //结束时间
        mechanism: "", //单位
        remark: "", // "备注"
        duties: "", //职务
        dutiesCode: "", //职务编码
        jobContent: "", //工作内容
        school: "", //毕业学校
        schoolCode: "", //毕业学校编码
        education: "", //学历
        educationCode: "", //学历编码
        major: "", //专业
        majorCode: "", //专业编码
        degree: "", //最高学位
        degreeCode: "", //最高学位编码
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
    async createData(temp) {
      this.dialogFormVisible = true;
      this.dialogFormVisible = false;
      let tempData = Object.assign({}, temp);
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
        const res = await saveResume(query);
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
    //点击编辑按钮
    handleUpdate(row) {
      // 合并对象
      this.temp = Object.assign({}, row);
      console.log("父级打印", this.temp);
      this.temp.enabled = this.temp.enabled == "1" ? true : false;
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
    },
    //点击编辑按钮的确认按钮
    updateData(row) {
      let tempData = Object.assign({}, row);
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
      console.log("点击编辑按钮确认按钮：", query);
      saveResume(query)
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
          console.log("编辑错误打印：", error);
        });
    },
    //点击删除按钮
    async handleDelete(row) {
      let data = [];
      data.push({
        resumeId: row.resumeId,
        deleteMark: "1",
        enabled: "0",
      });
      let query = {
        models: data,
        terminal: {
          code: "01",
          Text: "浏览器",
          modelCode: "modelcode002",
          model: "模块管理",
        },
      };
      //调接口：字典管理明细，base/datadictionarydetail/state
      try {
        await this.$confirm("此操作将删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        try {
          //物理删除
          // const res = await deleteModuleData(data);
          //软删除
          const res = await changeResumeState(query);
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
    //点击刷新按钮
    async handleRefresh() {
      this.listLoading = true;
      await this.getTableList();
      this.listLoading = false;
    },
    //弹框取消
    handleCancelDialog() {
      this.dialogFormVisible = false;
    },
  },
  created() {
    this.getTableList();
  },
  mounted() {},
  destroyed() {
    this.tableList = [];
  },
};
</script>
<style lang="scss" scoped>
.container-box {
  .left-box {
    height: calc(100vh - 130px);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    padding: 20px;
    box-sizing: border-box;
  }
  .right-box {
    box-sizing: border-box;
    padding: 20px;
    height: calc(100vh - 130px);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  .dialog-box > :only-child {
    margin-top: 8vh !important;
  }
}
</style>
