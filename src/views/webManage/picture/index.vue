<!--图片明细  -->
<template>
  <el-row class="container-box">
    <!-- 左边的树 -->
    <!-- <el-col :span="3" class="left-box">
      <el-tree
        v-loading="treeLoading"
        @node-click="leftTreeOnClick"
        ref="leftTree"
        :data="treeList"
        class="filter-tree"
        default-expand-all
      />
    </el-col> -->
    <el-row>
      <!-- 右侧区域 -->
      <el-col class="right-box">
        <el-row class="btn-row">
          <el-button class="btn-green" @click="handleRefresh" icon="el-icon-edit"
            >刷新</el-button
          >
        </el-row>
        <!-- 右侧表格 -->
        <el-row>
          <RightTable
            v-if="this.tableList.length"
            :listLoading="this.listLoading"
            :tableList="this.tableList"
            @handleDelete="handleDelete"
          />
        </el-row>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
import RightTable from "./rightTable/index";
import { formatDataOfParentMenu } from "@/utils/myUtils/RecursionData";
import { fetchPictureList, changePictureState } from "@/api/myApi/picture";
export default {
  components: {
    RightTable,
  },
  data() {
    //这里存放数据
    return {
      treeLoading: false, //控制tree的加载动画
      tableId: 0, //树的id
      treeList: [], //左边树的数据
      tableList: [], //右边表格的数据
      total: 0, //数据总数
      listLoading: false, //table正在加载
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
      temp: {},
    };
  },
  methods: {
    //点击左边的树
    leftTreeOnClick(data, node, self) {
      this.tableId = data.menuId;
      this.getTableList();
      console.log("左边的树被点击了", this.tableId);
    },
    //获取表格数据
    async getTableList() {
      this.listLoading = true;
      try {
        // this.listQuery.model.sysmenuId = this.tableId;
        console.log("查询参数", this.listQuery);
        const res = await fetchPictureList(this.listQuery);
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
    async getTreeList() {
      this.treeLoading = true;
      try {
        const res = await fetchMenuList(this.listQuery);
        if (res.code == 200) {
          this.treeList = formatDataOfParentMenu(res.data.rows, "menuId");
          this.treeLoading = false;
        }
      } catch (error) {
        console.log("获取数据列表失败", error);
        this.treeLoading = false;
      }
    },
    //点击删除按钮
    async handleDelete(row) {
      let data = [];
      data.push({
        contentId: row.contentId,
        deleteMark: "1",
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
      try {
        await this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        try {
          const res = await changeContentState(query);
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
    //点击刷新按钮
    async handleRefresh() {
      this.listLoading = true;
      // await this.getTreeList();
      await this.getTableList();
      this.listLoading = false;
    },
  },
  created() {
    this.getTableList();
    // this.getTreeList();
  },
  mounted() {},
  destroyed() {},
};
</script>
<style lang="scss" scoped>
.el-row {
  margin-bottom: 15px;
}
.right-box {
  min-width: 500px;
  margin-left: 20px;
  padding-right: 30px;
}
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
}
.right-box {
  min-width: 500px;
  margin-left: 20px;
  border: 1px solid $tBorderColor;
  box-sizing: border-box;
  padding: 10px 25px 10px 25px;
  height: calc(100vh - 130px);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin: 0 auto;
}
.key-word-box {
  display: inline-block;
  width: 100%;
  height: 100%;
  line-height: 36px;
  text-align: center;
}
</style>
