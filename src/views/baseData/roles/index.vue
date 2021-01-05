<template>
  <el-container class="container-box">
    <!-- 右侧表格区域 -->
    <el-col class="right-box">
      <!-- 按钮区域 -->
      <el-row class="btn-row">
        <el-button icon="el-icon-edit" class="btn-green" @click="refrensh">{{
          "刷新"
        }}</el-button>
        <el-button
          class="btn-blue"
          icon="el-icon-circle-plus-outline"
          style="margin-left: 10px"
          @click="handleCreate"
          >{{ "新增" }}</el-button
        >
        <el-dropdown trigger="click" style="margin-left: 10px">
          <el-button style="width: 150px" class="btn-blue">
            {{ "权限设置" }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown" style="width: 150px; textalign: center">
            <el-dropdown-item @click.native="handleUserShow('user')">
              <i class="el-icon-user-solid"></i> 角色用户
            </el-dropdown-item>
            <el-dropdown-item @click.native="handlePermissionShow('permission')">
              <i class="el-icon-key"></i>
              角色权限
            </el-dropdown-item>
            <el-dropdown-item @click.native="handleDataShow('data')">
              <i class="el-icon-coin"></i>
              数据范围
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
      <!-- 表格区域 -->
      <el-row>
        <DetailTable
          :data="this.tableList"
          @handleUpdate="handleUpdate"
          @handleDelete="handleDelete"
          @currentChange="handleCurrentChange"
        />
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
      width="500px"
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        class="dialog-form-box"
        label-position="right"
        label-width="80px"
        style="width: 400px"
      >
        <!-- *角色编码 -->
        <el-row>
          <el-col>
            <el-form-item label="角色编码" prop="roleCode">
              <el-input v-model="temp.roleCode" />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- *角色名称 -->
        <el-row>
          <el-col>
            <el-form-item label="角色名称" prop="fullName">
              <el-input v-model="temp.fullName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 蒙语名称 -->
        <el-row>
          <el-col>
            <el-form-item label="蒙语名称" prop="fullNameMgl">
              <el-input v-model="temp.fullNameMgl" />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- *显示顺序 -->
        <el-row>
          <el-col>
            <el-form-item label="显示顺序" prop="sortCode">
              <el-input v-model="temp.sortCode" />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 选项（有效） -->
        <el-row>
          <el-form-item label="选项" prop="enabled">
            <el-checkbox v-model="temp.enabled" />
            <span style="margin-left: 5px">有效</span>
          </el-form-item>
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
    <!-- 角色权限弹窗 -->
    <el-dialog :visible.sync="dialogPermission" width="900px" title="角色权限">
      <el-row v-if="dialogPermission" class="permission-box">
        <!-- 左边的树 -->
        <el-col :span="7">
          <el-row class="title-box"> 系统模块 </el-row>
          <el-card class="tree-box">
            <el-tree
              :data="moduleTreeList"
              show-checkbox
              default-expand-all
              node-key="fullName"
              :expand-on-click-node="false"
              :default-checked-keys="defaultCheckedKeys"
              @node-click="clickModuleTree"
              @check="handleCheckTreeNode"
              ref="moduleTree"
              highlight-current
              class="module-tree"
            >
            </el-tree>
          </el-card>
        </el-col>
        <!-- 右侧的内容区 -->
        <el-col :span="16">
          <el-row class="title-box"> 系统视图 </el-row>
          <!-- <el-card class="content-box"> -->
          <div class="content-box">
            <el-checkbox
              :disabled="!this.isDisabled"
              v-show="modules[0]"
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              @change="handleCheckAllChange"
              >全选</el-checkbox
            >
            <div style="margin: 15px 0"></div>
            <el-checkbox-group
              :disabled="!this.isDisabled"
              v-model="checkedModules"
              @change="handleCheckedCitiesChange"
            >
              <el-checkbox
                class="checkbox-item"
                v-for="(item, index) in modules"
                :label="item"
                :key="index"
                border
              >
                <svg-icon icon-class="user" />
                <span>{{ item[Object.keys(item)[0]] }}</span>
              </el-checkbox>
            </el-checkbox-group>
          </div>
          <!-- </el-card> -->
        </el-col>
      </el-row>
      <!-- 确定取消按钮 -->
      <el-row class="in-row btn-box">
        <el-button>取消</el-button>
        <el-button @click="getCheckedNodes">确认</el-button>
      </el-row>
    </el-dialog>
    <!-- 角色用户弹窗 -->
    <el-dialog :visible.sync="dialogUser" width="800px" title="角色用户"> </el-dialog>
    <!-- 角色用户弹窗 -->
    <el-dialog :visible.sync="dialogData" width="800px" title="数据范围"> </el-dialog>
  </el-container>
</template>

<script>
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
// import DialogPermission from "./dialog/permission_dialog";
// import DialogUser from "./dialog/user_dialog";
// import DialogData from "./dialog/data_dialog";
import DetailTable from "./detailTable/index";
import { getRoles, saveRole, remarkRole, deleteRole } from "@/api/myApi/RoleManagement"; //角色api
import { fetchList } from "@/api/myApi/systemModule"; //系统模块api
import { savePermission, searchPermission } from "@/api/myApi/modulePermission"; //模块权限api
import { formatDataOfParent } from "@/utils/myUtils/RecursionData";
import { render } from "nprogress";

const moduleOptions = ["上海", "北京", "广州", "深圳"];
export default {
  components: {
    Pagination,
    DetailTable,
  },
  computed: {
    // filterSortCode() {
    //   if (this.tableList[0]) {
    //     return +this.tableList[0][sortCode] + 1;
    //   } else {
    //     return "0";
    //   }
    // },
  },
  data() {
    return {
      //弹窗用的数据
      dialogUser: false, //显示用户弹窗
      dialogData: false, //显示数据弹窗
      dialogOb: null, //给权限、用户、数据弹窗传递的值。

      // permission用的数据
      isDisabled: true, //用来判断当前moduleId下的右侧内容是否可用
      curModuleOb: {}, //保存下当前选中的树节点
      isIndeterminate: true,
      checkAll: false, //全选右侧
      checkedModules: [], //选中的功能
      modules: [], //拥有所有的功能(根据moduleId,ajax请求接口)
      dialogPermission: false, //显示权限弹窗
      moduleTreeList: [], //所有tree的数组
      defaultCheckedKeys: [], //左边tree默认选中的节点（通过ajax得到）
      listModuleQuery: {
        //获取模块菜单
        model: {
          deleteMark: "0",
        },
        page: {
          pageNumber: 1,
          pageSize: 20,
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
      listPermissionQuery: {
        model: {},
        page: {
          pageNumber: 1,
          pageSize: 12,
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
      // roles用的数据
      total: 0, //返回的总数，小于10不显示分页组件+this.tableList[0].sortCode+1
      tableList: [], //右侧表格渲染的数组 tableList
      tableId: "", //根据该值去获取对应的tableList
      listLoading: false, //是否正在加载
      dialogStatus: "", //弹出框的状态 create是创建 update是编辑
      dialogFormVisible: false, //是否显示弹出框
      listQuery: {
        //请求数据需要的参数
        model: {
          deleteMark: "0",
        },
        page: {
          pageNumber: 1,
          pageSize: 12,
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
        roleId: "", //角色主键
        roleCode: "", //角色编码
        fullName: "", //角色名称
        enabled: true, //有效
        remark: "", //说明
      },
      rules: {
        //新增表单验证
        // roleCode: [
        //   { required: true, message: "名称必须填写", trigger: "blur" },
        // ],
      },
      textMap: {
        //弹出框的标题
        update: "编辑",
        create: "添加",
      },
    };
  },
  methods: {
    //点击左边tree
    // setTreeId(data, node, self) {
    //   this.tableId = data.companyId;
    //   this.getTableList();
    // },
    //获取tree数据
    // async getTreeList() {
    //   this.listLoading = true;
    //   try {
    //     const res = await fetchList(this.listQuery);
    //     if (res.code == 200) {
    //       this.moduleT= formatData(res.data.rows, "companyId");
    //       this.listLoading = false;
    //     }
    //   } catch (error) {
    //     console.log("getTreeList报错", error);
    //     this.listLoading = false;
    //   }
    // },
    //根据tableId获取数据
    async getTableList() {
      this.listLoading = true;
      try {
        const res = await getRoles(this.listQuery);
        if (res.code == 200) {
          this.listLoading = false;
          this.tableList = res.data.rows;
        }
      } catch (error) {
        console.log("获取列表数据打印：", error);
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
      this.getTableList();
    },
    //重置Temp对象（即表格单行数据）
    resetTemp() {
      this.temp = {
        roleId: "", //角色主键
        roleCode: "", //角色编码
        fullName: "", //角色名称
        enabled: true, //有效

        remark: "", //说明
      };
    },
    //点击新增按钮
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    //点击新增按钮的确认按钮
    createData() {
      this.dialogFormVisible = true;
      this.$refs["dataForm"].validate(async (valid) => {
        if (valid) {
          this.dialogFormVisible = false;
          this.temp.enabled = this.temp.enabled == true ? "1" : "0";
          const data = [];
          data.push(this.temp);
          let tempData = {
            models: data,
            terminal: {
              code: "01",
              Text: "浏览器",
              modelCode: "modelcode002",
              model: "模块管理",
            },
          };
          console.log("新增按钮打印", tempData);
          try {
            const res = await saveRole(tempData);
            if (res.code == 200) {
              this.$notify({
                title: "成功",
                message: "新增成功",
                type: "success",
                duration: 2000,
              });
              this.getTableList(); //刷新数据
            }
          } catch (error) {
            console.log("新增失败打印：", error);
          }
        }
      });
    },
    //点击编辑按钮
    handleUpdate(row) {
      this.temp = Object.assign({}, row); //合并对象
      this.temp.enabled = this.temp.enabled == "1" ? true : false;
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    //点击编辑按钮的确认按钮
    updateData() {
      this.$refs["dataForm"].validate(async (valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp);
          tempData.enabled = tempData.enabled == true ? "1" : "0";
          //调接口修改数据
          const data = [];
          data.push(tempData);
          this.dialogFormVisible = false;

          let query = {
            models: data,
            terminal: {
              code: "01",
              Text: "浏览器",
              modelCode: "modelcode002",
              model: "模块管理",
            },
          };
          console.log("点击编辑按钮确认按钮打印", query);
          try {
            const res = await saveRole(query);
            if (res.code == 200) {
              this.$notify({
                title: "成功",
                message: "更新成功",
                type: "success",
                duration: 2000,
              });
              this.getTableList(); //刷新数据
            }
          } catch (error) {
            console.log("编辑失败打印：", error);
          }
        }
      });
    },
    //点击删除按钮
    async handleDelete(row) {
      const data = [];
      const tempData = {
        roleId: row.roleId,
        deleteMark: "1", //软删除
      };
      data.push(tempData);
      //参数
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
          // 软删除
          const res = await remarkRole(query);
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

    //点击权限设置-->用户选项
    handleUserShow() {},
    //点击权限设置-->权限选项-->发送请求获取当前角色的权限
    async handlePermissionShow() {
      if (!this.dialogOb) {
        this.$message("请选择要操作的角色", "提示");
        return;
      }
      this.dialogPermission = true;
      console.log("systemModule请求参数", this.listModuleQuery);
      //请求模块菜单-->请求到moduleId,
      try {
        const res = await fetchList(this.listModuleQuery);
        this.moduleTreeList = formatDataOfParent(res.data.rows, "moduleId");
      } catch (error) {
        console.log("获取模块菜错误打印", error);
      }
      //再请求permission，请求权限
      console.log("Permission请求参数", this.listPermissionQuery);
      try {
        this.listPermissionQuery.model.objectId = this.dialogOb.roleId;
        const result = await searchPermission(this.listPermissionQuery);
        console.log("权限find接口打印", result);
        //这里让返回的数足等于左边树选中的渲染数组
        this.defaultCheckedKeys = result.data.rows.map((item) => {
          return item.module;
        });
        this.$nextTick(() => {
          this.$refs.moduleTree.setCheckedKeys(this.defaultCheckedKeys);
        });
        console.log(this.defaultCheckedKeys);
      } catch (error) {
        console.log("权限find接口打印", error);
      }
    },
    //点击权限设置-->数据选项
    handleDataShow() {},
    //点击弹出框 取消、处理函数
    handleDialogButton(val) {
      console.log("取消打印", val);
      // if(dialog=='user'){
      //   this.dialogUser = val
      // }
    },
    //子组件表格单行传递过来的数据
    handleCurrentChange(val) {
      this.dialogOb = val;
      console.log("table传过来的值", this.dialogOb);
    },
    //点击【权限设置确认】按钮处理函数
    async getCheckedNodes() {
      //得到左边树选择的所有module

      let data = this.$refs.moduleTree.getCheckedNodes(false, true);
      if (!this.dialogOb) {
        return;
      }
      data = data.map((item) => {
        return {
          moduleId: item.moduleId,
          // module: item.moduleCode,
          module: item.fullName,
          objectId: this.dialogOb.roleId,
          object: this.dialogOb.roleCode,
        };
      });

      // {
      //     moduleId: item.moduleId,
      //     // module: item.moduleCode,
      //     module: item.fullName,
      //     objectId: this.dialogOb.roleId,
      //     object: this.dialogOb.roleCode,
      //   };
      let query = {
        models: data,
        terminal: {
          code: "01",
          Text: "浏览器",
          modelCode: "modelcode002",
          model: "模块管理",
        },
      };
      console.log("权限管理打印", query);
      // return;
      try {
        const res = await savePermission(query);
        if (res.code == 200) {
          console.log(res);
        }
      } catch (error) {
        console.log("权限管理打印", error);
      }
    },
    //点击【权限弹框右侧全】选按钮
    handleCheckAllChange(val) {
      console.log("val", val);
      this.checkedModules = val ? this.modules : [];
      this.isIndeterminate = false;
      console.log("handleCheckAllChange打印checkedModules", this.checkedModules);
    },
    //点击【权限弹框右侧选择复选框】
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.modules.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.modules.length;
      console.log("点击右侧复选框checkedModules", this.checkedModules);
    },
    //点击【权限弹框左侧树】
    clickModuleTree(data, node, self) {
      console.log("moduleTree打印", node);
      //获取右侧内容（调用getRightContent方法）。且渲染(给this.modeles赋值)。
      this.modules = this.getRightContent(data);
      //点节点的时候给  isDisabled 赋值
      this.isDisabled = node.checked;
    },
    //辅助函数,【权限弹框左侧树点击，获取右边内容】
    getRightContent(data) {
      this.curModuleOb = data; //保存下当前点击的对象
      let renderArr = [];
      for (const key in data) {
        let map = {};
        if (data[key]) {
          map[key] = data[key];
          renderArr.push(map);
        }
      }
      return renderArr.slice(0, 5);
    },
    //辅助函数,【权限弹框右侧按钮是否可用】
    handleIsDisabled(arr) {
      let res = arr.filter((item) => {
        return item.moduleId == this.curModuleOb.moduleId;
      });
      if (res[0]) {
        return true;
      } else {
        return false;
      }
    },
    //点击树节点的复选框处理函数
    handleCheckTreeNode(data, node) {
      console.log(data, node);
      //改变右侧内容
      this.modules = this.getRightContent(data);
      //判断当前节点是不是被选中，按钮是否可用
      this.isDisabled = this.handleIsDisabled(node.checkedNodes);
    },
  },
  created() {
    //获取列表数据
    this.getTableList();
  },
};
</script>

<style scoped lang="scss">
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
}

/* 右侧表格 */
.right-box {
  min-width: 500px;
  height: calc(100vh - 130px);
  user-select: none;
  overflow: hidden;
  min-width: 500px;
  border: 1px solid $tBorderColor;
  min-width: 500px;
  box-sizing: border-box;
  padding: 10px 25px 10px 25px;
  height: calc(100vh - 130px);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  // margin-left: 20px;
}

/* 权限弹框的盒子 */
.permission-box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  background-color: #fff;
}
.title-box {
  margin: 0;
  padding: 10px 20px;
  margin-bottom: 15px;
  background-color: #f2f2f2;
}
.permission-box > .el-col {
  border: 1px solid #eee;
  padding: 3px;
}
.permission-box .content-box,
.permission-box .tree-box {
  height: 500px;
}
.permission-box .content-box {
  box-sizing: border-box;
  webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.permission-box .tree-box {
  overflow-y: scroll;
  /* height: 100%; */
}
.btn-box {
  margin: 0;
  margin-top: 30px;
  justify-content: center;
  align-items: center;
}

/* 右侧checkboxgroup */
.checkbox-item {
  padding: 0;
  margin: 0;
  line-height: 24px;
}
.el-checkbox.is-bordered + .el-checkbox.is-bordered {
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100px;
  overflow: hidden;
}

.el-checkbox.is-bordered:nth-of-type(1) {
  margin-left: 10px;
  width: 100px;
  overflow: hidden;
}
/* 权限弹框的树 */
.module-tree {
  user-select: none;
}
</style>
