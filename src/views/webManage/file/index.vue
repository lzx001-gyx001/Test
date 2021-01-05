<template>
  <el-row class="container-box">
    <!-- 右侧表格区域 -->
    <el-row>
      <el-col class="right-box">
        <!-- 按钮区域 -->
        <el-row class="in-row btn-row btn-box">
          <el-button class="btn-green" icon="el-icon-edit" @click="refrensh">{{
            "刷新"
          }}</el-button>

          <span class="btn-tips">关键字:</span>

          <el-input
            class="btn-input"
            v-model="searchKeyWord"
            clearable
            maxlength="20"
            show-word-limit
            @keyup.native="handleKeyUp"
          ></el-input>

          <el-button class="btn-search btn-blue" @click="handleSearch">搜索</el-button>

          <!-- <el-button icon="el-icon-circle-plus-outline" @click="handleCreate">{{
            "新增"
          }}</el-button> -->
        </el-row>
        <!-- 表格区域 -->
        <el-row>
          <el-table
            v-if="tableList.length"
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
              type="index"
              :index="indexMethod"
              label="序号"
              align="center"
              width="80"
            ></el-table-column>
            <!-- 动态加载表格 -->
            <template v-for="(item, name) in filterList[0]">
              <el-table-column
                :resizable="false"
                :key="name"
                align="center"
                show-overflow-tooltip
                :label="setHeaders(name)"
              >
                <template slot-scope="{ row }">
                  <span>{{ row[name] }}</span>
                </template>
              </el-table-column>
            </template>

            <!-- 操作 -->
            <el-table-column
              :resizable="false"
              :label="$t('table.actions')"
              align="center"
              width="230"
              class-name="small-padding fixed-width"
            >
              <template slot-scope="{ row, $index }">
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
          v-show="total > 10"
          :total="total"
          :page.sync="listQuery.page.pageNumber"
          :limit.sync="listQuery.page.pageSize"
          @pagination="getTableListByPage"
        />
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import { fetchFileList, changeFileState } from "@/api/myApi/file";
export default {
  components: {
    Pagination,
  },
  data() {
    return {
      total: 0, //返回的总数，小于10不显示分页组件
      tableList: [], //右侧表格渲染的数组 tableList
      treeList: [], //所有tree的数组
      tableId: 0, //根据该值去获取对应的tableList
      listLoading: false, //是否正在加载
      // dialogStatus: "", //弹出框的状态 create是创建 update是编辑
      // dialogFormVisible: false, //是否显示弹出框
      listQuery: {
        model: {
          deleteMark: "0",
          enabled: "1",
        },
        page: {
          pageNumber: 1,
          pageSize: 10,
          sortName: "sort_code",
          sortOrder: "Asc",
        },
        terminal: {
          code: "01",
          Text: "浏览器",
          modelCode: "modelcode001",
          model: "附件",
        },
      },

      searchKeyWord: "",
      flag: false,
    };
  },
  computed: {
    filterList() {
      return this.tableList.map((item, index) => {
        return {
          businessTitel: item.businessTitel,
          imgType: item.imgType,
          fileOldName: item.fileOldName,
          filePath: item.filePath,
          reducePath: item.reducePath,
          broadType: item.broadType,
          coverImg: item.coverImg,
          location: item.location,
          originalPic: item.originalPic,
          remark: item.remark,
        };
      });
    },
  },
  methods: {
    //直接获取数据
    async getTableList(keyWords) {
      this.listLoading = true;
      if (keyWords) {
        //查询
        this.listLoading = true;
        this.listQuery.model.searchKeyWord = keyWords;
        try {
          const res = await fetchFileList(this.listQuery);
          if (res.code == 200) {
            this.tableList = res.data.rows;
            this.listLoading = false;
          }
        } catch (error) {
          this.listLoading = false;
        }
        console.log("查询");
      } else {
        //直接获取内容
        try {
          const res = await fetchFileList(this.listQuery);
          if (res.code == 200) {
            this.tableList = res.data.rows;
            this.listLoading = false;
          }
        } catch (error) {
          this.listLoading = false;
        }
      }
    },
    //点击分页组件获取数据
    getTableListByPage(val) {
      if (val) {
        this.listQuery.page.pageNumber = val.page;
        this.listQuery.page.pageSize = val.limit;
      }
    },
    //点击刷新按钮
    refrensh() {
      this.getTableList(); //重新刷新页面
    },
    //点击新增按钮
    //重置Temp对象（即表格单行数据）
    // resetTemp() {
    //   this.temp = {
    //     id: undefined,
    //     importance: 1,
    //     remark: "",
    //     timestamp: new Date(),
    //     title: "",
    //     status: "published",
    //     type: "",
    //     iswork: true,
    //   };
    // },
    //点击新增按钮
    // handleCreate() {
    //   this.resetTemp();
    //   this.dialogStatus = "create";
    //   this.dialogFormVisible = true;
    //   this.$nextTick(() => {
    //     this.$refs["dataForm"].clearValidate();
    //   });
    // },
    //点击新增按钮的确认按钮
    // async createData() {
    //   this.dialogFormVisible = true;
    //   this.$refs["dataForm"].validate((valid) => {
    //     if (valid) {
    //     }
    //   });
    // },
    //点击编辑按钮
    // handleUpdate(row) {
    //   this.temp = Object.assign({}, row); //合并对象
    //   this.dialogStatus = "update";
    //   this.dialogFormVisible = true;
    //   this.$nextTick(() => {
    //     this.$refs["dataForm"].clearValidate();
    //   });
    // },
    //点击编辑按钮的确认按钮
    // async updateData() {
    //   this.$refs["dataForm"].validate((valid) => {
    //     if (valid) {
    //       const tempData = Object.assign({}, this.temp);
    //     }
    //   });
    // },

    indexMethod(index) {
      return index + 1;
    },
    //点击删除按钮
    async handleDelete(row, index) {
      let data = [];
      data.push({
        fileId: row.fileId,
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
        await this.$confirm("此操作将删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        try {
          const res = await changeFileState(query);
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
    //点击搜索按钮
    async handleSearch() {
      if (!this.searchKeyWord && !this.flag) {
        this.$message("请输入搜索内容", "提示");
        return;
      }
      this.flag = true; //上锁，不让回车和点击同时进行；
      // console.log(this.searchKeyWord);
      //发送AJAX
      if (!this.flag) {
        return;
      }
      try {
        const res = await this.getTableList(this.searchKeyWord);
        if (res.code == 200) {
          this.tableList = res.data.rows;
          this.flag = false; //解锁
        }
      } catch (error) {
        this.flag = false; //解锁
      }
    },
    //回车搜索
    async handleKeyUp(e) {
      if (e.keyCode != 13) {
        return;
      }
      if (!this.searchKeyWord) {
        this.$message("请输入搜索内容", "提示");
        return;
      }
      this.flag = true; //上锁，不让回车和点击同时进行；
      if (!this.flag) {
        return;
      }

      console.log("查询");
      this.flag = false;
      this.getTableList(this.searchKeyWord);
    },
    //设置表头
    setHeaders(head) {
      let str = "";
      switch (head) {
        case "businessTitel":
          str = "业务名称";
          break;
        case "imgType":
          str = "图片类型";
          break;
        case "fileOldName":
          str = "原文件名";
          break;
        case "fileCodeName":
          str = "新文件名";
          break;
        case "filePath":
          str = "原文件地址";
          break;
        case "reducePath":
          str = "压缩文件地址";
          break;
        case "broadType":
          str = "文件大类";
          break;
        case "coverImg":
          str = "封面图片";
          break;
        case "location":
          str = "图片位置";
          break;
        case "originalPic":
          str = "原图";
          break;
        case "remark":
          str = "备注";
      }
      return str;
    },
  },
  created() {
    //获取默认table数据
    this.getTableList();
  },
};
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 15px;
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
  align-items: center;
}
.btn-box {
  justify-content: flex-start !important;

  .btn-tips {
    // width: 100px;
    min-width: 55px;
    margin-left: 20px;
    color: #606266;
    font-size: 14px;
  }
  .btn-input {
    width: 200px;
    margin-left: 15px;
  }
  .btn-search {
    width: 100px;
    margin-left: 15px;
  }
}
.left-box {
  height: calc(100vh - 130px);
}
.right-box {
  border: 1px solid $tBorderColor;
  // color: $tBorderColor;
  min-width: 500px;
  margin-left: 20px;
  padding-right: 30px;
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
