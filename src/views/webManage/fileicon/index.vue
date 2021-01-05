<!-- 文件图标 -->
<template>
  <el-row class="container-box">
    <!-- 右侧表格区域 -->
    <el-row>
      <el-col class="right-box">
        <!-- 按钮区域 -->
        <el-row class="in-row btn-box btn-row">
          <el-button icon="el-icon-edit" class="btn-green" @click="refrensh">{{
            "刷新"
          }}</el-button>
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
            />
            <!-- 动态加载表格 -->
            <template v-for="(item, name) in filterList[0]">
              <el-table-column
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
            <!-- 选项 -->
            <el-table-column label="有效" align="center" prop="enabled">
              <template slot-scope="{ row }">
                <el-checkbox :checked="row.enabled == '1' ? true : false"></el-checkbox>
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
          v-show="total > 10"
          :total="total"
          :page.sync="listQuery.page.pageNumber"
          :limit.sync="listQuery.page.pageSize"
          @pagination="getTableListByPage"
        />
      </el-col>
    </el-row>

    <!-- 编辑，新增按钮的弹出框 -->
    <!-- <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      width="700px"
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        class="dialog-form-box"
        label-position="right"
        label-width="80px"
        style="width: 600px; margin: 0 auto"
      >
 
        <el-row>
          <el-col :span="12">
            <el-form-item label="图标名称" prop="title">
              <el-input v-model="temp.name" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="图标路径" prop="order">
              <el-input v-model="temp.name" />
            </el-form-item>
          </el-col>
        </el-row>
    
        <el-row>
          <el-col :span="12">
            <el-form-item label="对应后缀" prop="timestamp">
              <el-input v-model="temp.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="文件类型" prop="type">
              <el-input v-model="temp.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
   
        <el-row>
          <el-form-item label="备注" prop="title">
            <el-input
              v-model="temp.remark"
              :autosize="{ minRows: 2, maxRows: 4 }"
              type="textarea"
            />
          </el-form-item>
        </el-row>
    
        <el-row>
          <el-col :span="12">
            <el-form-item label="有效" prop="id">
              <el-checkbox label="有效" v-model="temp.iswork" />
          
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="排序号" prop="id">
              <el-input v-model="temp.name" />
            </el-form-item>
          </el-col>
        </el-row>
   
        <el-row>
          <el-col :span="12">
            <el-form-item label="创建用户" prop="id">
              <el-input v-model="temp.name" readonly />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="创建时间" prop="order">
              <el-input v-model="temp.name" readonly />
            </el-form-item>
          </el-col>
        </el-row>
    
        <el-row v-if="dialogStatus == 'update'">
          <el-col :span="12">
            <el-form-item label="变更人" prop="id">
              <el-input v-model="temp.name" readonly />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="变更时间" prop="order">
              <el-input v-model="temp.name" readonly />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button @click="dialogFormVisible = false">{{ $t("table.cancel") }}</el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? createData() : updateData()"
          >{{ $t("table.confirm") }}</el-button
        >
      </div>
    </el-dialog> -->
  </el-row>
</template>

<script>
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
// import { fetchFileList, changeFileState } from "@/api/myApi/file";
import { fetchFileIconList, changeFileIconState } from "@/api/myApi/fileIcon";
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
      // temp: {
      //   //添加按钮默认表单内容
      //   id: undefined,
      //   code: "",
      //   name: "",
      //   class: "目录",
      //   url: "/xxxxx/xxxx/xx",
      //   target: "iframe",
      //   zIndex: 2,
      //   iswork: true,
      //   tips: "",
      // },
      // rules: {
      //   //新增表单验证
      //   title: [{ required: true, message: "名称必须填写", trigger: "blur" }],
      // },
      // textMap: {
      //   //弹出框的标题
      //   update: "编辑",
      //   create: "添加",
      // },
      // searchKeyWord: "",
      // flag: false,
    };
  },
  computed: {
    filterList() {
      return this.tableList.map((item, index) => {
        return {
          fileName: item.fileName,
          filePath: item.filePath,
          fileExtensions: item.fileExtensions,
          fileType: item.filePath,
          remark: item.remark,
        };
      });
    },
  },
  methods: {
    //直接获取数据
    async getTableList(keyWords) {
      this.listLoading = true;
      try {
        const res = await fetchFileIconList(this.listQuery);
        if (res.code == 200) {
          this.tableList = res.data.rows;
          this.listLoading = false;
        }
      } catch (error) {
        this.listLoading = false;
      }
    },
    //点击分页组件获取数据
    getTableListByPage(val) {
      if (val) {
        this.listQuery.page.pageNumber = val.page;
        this.listQuery.page.pageSize = val.limit;
        this.getTableList();
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
        fileIconId: row.fileIconId,
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
    //设置表头
    setHeaders(head) {
      let str = "";
      switch (head) {
        case "fileName":
          str = "图标名称";
          break;
        case "filePath":
          str = "图标路径";
          break;
        case "fileExtensions":
          str = "后缀名";
          break;
        case "fileType":
          str = "文件类型";
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
    margin-left: 15px;
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
  box-sizing: border-box;
  padding: 20px;
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
