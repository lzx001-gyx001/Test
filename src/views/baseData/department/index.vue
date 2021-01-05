<template>
  <el-container class="container-box">
    <!-- 左侧tree组件-->
    <el-col :span="5" style="marginright: 0; minwidth: 120px" v-if="this.treeList.length">
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
    </el-col>
    <!-- 右侧表格区域 -->
    <el-col class="right-box">
      <!-- 按钮区域 -->
      <el-row class="btn-row">
        <el-button icon="el-icon-edit" class="btn-green" @click="refrensh">{{
          "刷新"
        }}</el-button>
        <el-button
          icon="el-icon-circle-plus-outline"
          class="btn-blue"
          @click="handleCreate"
          >{{ "新增" }}</el-button
        >
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
            :label="$t('table.id')"
            type="index"
            :index="indexMethod"
            prop="id"
            align="center"
            width="80"
          >
          </el-table-column>

          <!--编码 -->
          <el-table-column
            label="编码"
            prop="departmentCode"
            min-width="150px"
            align="center"
          >
            <template slot-scope="{ row }">
              <span>{{ row.departmentCode }}</span>
            </template>
          </el-table-column>
          <!-- 部门名称 -->
          <el-table-column label="部门名称" prop="shortName" width="110px" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.fullName }}</span>
            </template>
          </el-table-column>
          <!--简称 -->
          <el-table-column label="简称" prop="shortName" width="110px" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.shortName }}</span>
            </template>
          </el-table-column>
          <!--性质-->
          <el-table-column label="性质" prop="nature" width="80px" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.nature }}</span>
            </template>
          </el-table-column>
          <!--负责人 -->
          <el-table-column label="负责人" prop="manager" align="center" width="95">
            <template slot-scope="{ row }">
              <span>{{ row.manager }}</span>
            </template>
          </el-table-column>
          <!-- 电话 -->
          <el-table-column label="电话" width="150px" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.phone }}</span>
            </template>
          </el-table-column>
          <!-- 传真 -->
          <el-table-column label="传真" prop="fax" class-name="status-col" width="100">
            <template slot-scope="{ row }">
              <span>{{ row.fax }}</span>
            </template>
          </el-table-column>
          <!-- 所属公司 -->
          <el-table-column
            label="所属公司"
            prop="companyCode"
            width="150px"
            align="center"
          >
            <template slot-scope="{ row }">
              <span>{{ row.companyCode }}</span>
            </template>
          </el-table-column>
          <!-- 有效 -->
          <el-table-column label="有效" prop="enabled" width="150px" align="center">
            <template slot-scope="{ row }">
              <el-checkbox :checked="row.enabled == '1' ? true : false"></el-checkbox>
            </template>
          </el-table-column>
          <!-- 说明 -->
          <el-table-column label="说明" prop="remark" width="150px" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.remark }}</span>
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
              <el-button
                ref="dataForm"
                type="primary"
                size="mini"
                @click="handleUpdate(row)"
                >{{ $t("table.edit") }}</el-button
              >

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
        <!-- *部门编码/*部门名称 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="部门编码" prop="departmentCode">
              <el-input v-model="temp.departmentCode" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门名称" prop="fullName">
              <el-input v-model="temp.fullName" />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 部门简称/部门性质 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="部门简称" prop="shortName">
              <el-input v-model="temp.shortName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门性质" prop="nature">
              <el-select style="width: 220px" v-model="temp.nature" placeholder="请选择">
                <el-option
                  v-for="(item, index) in natureList"
                  :key="index"
                  :label="item.text"
                  :value="item.text"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 负责人/联系电话 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="负责人" prop="manager">
              <el-input v-model="temp.manager" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="temp.phone" />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 电子邮件/传真 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="电子邮件" prop="email">
              <el-input v-model="temp.email" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="传真" prop="fax">
              <el-input v-model="temp.fax" />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- *显示顺序/选项 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="显示顺序" prop="id">
              <el-input v-model="temp.name" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="选项" prop="id">
              <el-checkbox label="有效" v-model="temp.enabled" />
            </el-form-item>
          </el-col>
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
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import { fetchCompanyList } from "@/api/myApi/company";
import {
  fetchDepartmentList,
  saveDepartment,
  changeDepartmentState,
} from "@/api/myApi/department";
import { serachDic } from "@/api/myApi/searchDic";
import { formatDataOfParent } from "@/utils/myUtils/RecursionData";
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
        const res = await fetchDepartmentList(this.listQuery);
        console.log(res);
        if (res.code == 200) {
          this.listLoading = false;
          this.tableList = res.data.rows;
        }
      } catch (error) {
        this.listLoading = false;
      }
    },
    //根据code从字典获取渲染【部门性质】select的数组
    async getNatureList() {
      let query = {
        dictionary: {
          companyCode: "999",
          code: "Nature",
        },
        terminal: {
          code: "01",
          Text: "浏览器",
          modelCode: "modelcode001",
          model: "模块名称",
        },
      };
      console.log("字典请求参数打印:", query);
      try {
        const res = await serachDic(query);
        if (res.code == 200) {
          this.natureList = res.data;
          console.log("字典请求打印:", res);
        }
      } catch (error) {}
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
            const res = await saveDepartment(query);
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
            const res = await saveDepartment(query);
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
        const res = await changeDepartmentState(query);
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
    this.getNatureList();
  },
};
</script>

<style scoped>
.el-row {
  margin: 10px auto;
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
  margin-right: 10px;
  box-sizing: border-box;
}
.right-box {
  box-sizing: border-box;
  padding: 20px;
  height: calc(100vh - 130px);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.container-box {
  box-sizing: border-box;
  padding: 20px 40px 20px 20px;
}
.tree-title {
  margin-bottom: 20px;
}
.el-dialog__footer {
  padding-right: 50px !important;
}
</style>
