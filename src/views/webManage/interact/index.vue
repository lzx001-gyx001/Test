<!-- 互动管理 -->
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
        <!-- <el-button
          class="filter-item"
          style="margin-left: 10px"
          icon="el-icon-edit"
          @click="handleCreate"
          >{{ "新增" }}</el-button
        > -->
      </el-row>
      <!-- 右侧表格     v-if="this.tableList.length"-->
      <el-row>
        <RightTable
          :listLoading="this.listLoading"
          :tableList="this.tableList"
          @handleDelete="handleDelete"
        />
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
    <!-- <el-dialog
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
    </el-dialog> -->
  </el-container>
</template>

<script>
import Pagination from "@/components/Pagination";
import RightTable from "./rightTable/index";
import { fetchInteractList, changeInteractState } from "@/api/myApi/interact";
// import DialogForm from "./dialogForm/index";
export default {
  components: {
    Pagination,
    RightTable,
    // DialogForm,
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
            enable: "1",
            deleteMark: "0",
          },
        ],
        page: {
          pageNumber: 1,
          pageSize: 10,
          // sortName: "sort_code",
          // sortOrder: "asc",
        },
        terminal: {
          code: "01",
          Text: "浏览器",
          modelCode: "modelcode002",
          model: "模块管理",
        },
      },
    };
  },
  methods: {
    //获取表格数据
    async getTableList() {
      try {
        const res = await fetchInteractList(this.listQuery);
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
    //点击删除按钮
    async handleDelete(row) {
      let data = [];
      data.push({
        interactId: row.interactId,
        // deleteMark: "1",
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
          const res = await changeInteractState(data);
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
    margin: 0 auto;
    // margin-left: 20px;
    // overflow-y: scroll;
  }
  .dialog-box > :only-child {
    margin-top: 8vh !important;
  }
}
</style>
