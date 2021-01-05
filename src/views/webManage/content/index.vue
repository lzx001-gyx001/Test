<!--内容管理  -->
<template>
  <el-container class="container-box">
    <!-- 左边的树 -->
    <el-col :span="3" class="left-box">
      <el-tree
        v-loading="treeLoading"
        @node-click="leftTreeOnClick"
        ref="leftTree"
        :data="treeList"
        class="filter-tree"
        default-expand-all
      />
    </el-col>

    <!-- 右侧区域 -->
    <el-col class="right-box">
      <el-row style="margin: 20px auto">
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
      <!-- 右侧表格 -->
      <el-row>
        <ContentTable
          :listLoading="this.listLoading"
          :tableList="this.tableList"
          @handleDelete="handleDelete"
        />
      </el-row>
    </el-col>

    <!-- 新增、 编辑弹框
    <el-dialog
      v-if="this.dialogFormVisible"
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      width="1040px"
      class="dialog-box"
    >
      <DialogForm
        :treeList="this.treeList"
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
import ContentTable from "./contentTable/index";
// import DialogForm from "./dialog/index";
import { formatDataOfParentMenu } from "@/utils/myUtils/RecursionData";
import { fetchContentList, changeContentState } from "@/api/myApi/menuContent";
import { fetchMenuList } from "@/api/myApi/menu";
export default {
  components: {
    ContentTable,
    // DialogForm,
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
      // dialogFormVisible: false, //是否显示 编辑表单
      // dialogStatus: "", //编辑表单状态：update or create
      // textMap: {
      //   create: "新增",
      //   update: "编辑",
      // },
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
        this.listQuery.model.sysmenuId = this.tableId;
        console.log("查询参数", this.listQuery);
        const res = await fetchContentList(this.listQuery);
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
    //重置Temp对象（即表格单行数据）
    // resetTemp() {
    //   this.temp = {
    //     parentMenuId: "", //"父栏目主键",
    //     parentMenu: "", // "父栏目",
    //     parentMenuMgl: "", // "父栏目(蒙)",
    //     menuCode: "", //"栏目编码",
    //     menuName: "", //"栏目名称",
    //     menuNameMgl: "", //"栏目名称(蒙)",
    //     menuTypeCode: "", //"目录类型编码",
    //     menuType: "", // "目录类型",
    //     menuTypeMgl: "", // "目录类型（蒙）",
    //     url: "", //"链接地址",
    //     rowsCount: 0, // "行数",
    //     menuIcon: "", // "栏目图标",
    //     location: "", // "图标位置",
    //     remark: "", // "备注",
    //     enabled: true,
    //   };
    // },
    //点击新增按钮
    // handleCreate() {
    //   this.resetTemp();
    //   this.dialogStatus = "create";
    //   this.dialogFormVisible = true;
    // },
    //点击新增按钮的确认按钮
    // async createData(temp) {
    //   this.dialogFormVisible = true;
    //   this.dialogFormVisible = false;
    //   this.temp = {
    //     ...temp,
    //   };
    //   let tempData = Object.assign({}, this.temp);
    //   //这里修改新增需要的参数
    //   tempData.enabled = tempData.enabled == true ? "1" : "0";
    //   let data = [];
    //   data.push(tempData);
    //   let query = {
    //     models: data,
    //     terminal: {
    //       code: "01",
    //       Text: "浏览器",
    //       modelCode: "modelcode002",
    //       model: "模块管理",
    //     },
    //   };
    //   console.log("新增按钮确认打印", query);
    //   return;
    //   try {
    //     const res = await saveMenu(query);
    //     if (res.code == 200) {
    //       this.$notify({
    //         title: "成功",
    //         message: "新增成功",
    //         type: "success",
    //         duration: 2000,
    //       });
    //       this.getTableList();
    //     }
    //   } catch (error) {
    //     console.log("新增失败打印：", error);
    //   }
    // },
    //点击编辑按钮
    // handleUpdate(row) {
    //   // 合并对象
    //   this.temp = Object.assign({}, row);
    //   this.temp.enabled = this.temp.enabled == "1" ? true : false;
    //   this.dialogStatus = "update";
    //   this.dialogFormVisible = true;
    //   this.$nextTick(() => {
    //     this.$refs.dataFormEdit.clearValidate();
    //   });
    // },
    //点击编辑按钮的确认按钮
    // updateData() {
    //   this.$refs.dataFormEdit.validate((valid) => {
    //     if (valid) {
    //       this.$nextTick(() => {
    //         this.$refs.upload.clearFiles();
    //       });
    //       this.dialogFormVisible = false;

    //       let tempData = Object.assign({}, this.temp);
    //       tempData.enabled = tempData.enabled == true ? "1" : "0";
    //       let data = [];
    //       data.push(tempData);
    //       let query = {
    //         models: data,
    //         terminal: {
    //           code: "01",
    //           Text: "浏览器",
    //           modelCode: "modelcode002",
    //           model: "模块管理",
    //         },
    //       };
    //       console.log("点击编辑按钮确认按钮：", query);
    //       saveMenu(query).then((res) => {
    //         //修改完数据，再获重新获取数据
    //         //AJAX()
    //         if (res.code == 200) {
    //           this.dialogFormVisible = false;
    //           this.$notify({
    //             title: "成功",
    //             message: "更新成功",
    //             type: "success",
    //             duration: 2000,
    //           });
    //           //AJAX请求刷新数据
    //           this.getTableList();
    //         }
    //       });
    //     }
    //   });
    // },
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
      await this.getTreeList();
      this.listLoading = false;
    },
    // //点击弹框的取消按钮
    // handleCancelDialog() {
    //   this.dialogFormVisible = false;
    // },
  },
  created() {
    // this.getTableList();
    this.getTreeList();
  },
  mounted() {},
  destroyed() {},
};
</script>
<style lang="scss" scoped>
.container-box {
  box-sizing: border-box;
  padding: 20px;

  .left-box {
    height: calc(100vh - 130px);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    padding: 20px;
    padding-top: 42px;
    box-sizing: border-box;
    margin-right: 20px;
  }
  .right-box {
    box-sizing: border-box;
    padding: 20px 25px 20px 25px;
    height: calc(100vh - 130px);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  .dialog-box > :only-child {
    margin-top: 8vh !important;
  }
}
</style>
