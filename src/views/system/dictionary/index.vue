<template>
  <!-- 数据字典 -->
  <el-container class="container-box">
    <!-- 左侧tree组件-->
    <el-col :span="4" style="min-width: 120px">
      <el-card style="padding: 0" class="left-box">
        <el-tree
          @node-click="setTreeId('dicTree')"
          ref="dicTree"
          :data="treeList"
          :props="defaultProps"
          :filter-node-method="filterNode"
          :highlight-current="true"
          class="filter-tree"
          default-expand-all
        />
      </el-card>
    </el-col>
    <!-- 右侧table组件 -->
    <el-col class="right-box">
      <!-- 按钮 -->
      <el-row class="btn-row">
        <el-button class="filter-item btn-blue" icon="el-icon-edit" @click="refrensh">{{
          "刷新"
        }}</el-button>
        <el-button
          class="filter-item btn-blue"
          style="margin-left: 10px"
          icon="el-icon-edit"
          @click="handleCreate"
          >{{ "新增明细" }}</el-button
        >

        <el-button
          class="filter-item btn-blue"
          style="margin-left: 10px"
          icon="el-icon-edit"
          @click="handleShowClass"
          >{{ "分类管理" }}</el-button
        >
        <!-- upload -->
        <el-button
          class="filter-item btn-blue"
          style="margin-left: 10px"
          icon="el-icon-edit"
          @click="handleUploadDic"
          >{{ "导入" }}</el-button
        >
        <!-- ajax -->
        <el-button
          class="filter-item btn-blue"
          style="margin-left: 10px"
          icon="el-icon-edit"
          @click="handleLoadDic"
          >{{ "引入" }}</el-button
        >
        <!-- 生成 -->
        <el-button
          class="filter-item btn-green"
          style="margin-left: 10px"
          icon="el-icon-edit"
          :loading="this.createBtnLoading"
          @click="handleCreateBtn"
          >生成</el-button
        >
      </el-row>
      <!-- 表格 -->
      <el-row>
        <MyTable :list="list" @handleUpdate="handleUpdate" @handleDelete="handleDelete" />

        <!-- 分页组件 -->
        <pagination
          v-show="total > 10"
          :total="total"
          :page.sync="listDetail.page.pageNumber"
          :limit.sync="listDetail.page.pageSize"
          @pagination="getTableListByPage"
        />
      </el-row>
    </el-col>
    <!-- 分类管理弹出菜单 -->
    <el-dialog :visible.sync="showClass" title="分类管理" width="800px">
      <el-row class="w in-row">
        <el-col :span="6">
          <el-card class="class-tree-box">
            <el-tree
              @node-click="setTreeId('classTree')"
              ref="classTree"
              :data="treeList"
              :rules="classRules"
              :props="defaultProps"
              :filter-node-method="filterNode"
              class="filter-tree class-tree"
              default-expand-all
            />
          </el-card>
        </el-col>

        <!-- 分类管理弹出框的的右边 -->
        <el-col :span="17">
          <el-card>
            <!-- 按钮 -->
            <div class="btn-container">
              <el-button @click="classCreate">新增</el-button>
              <!-- <el-button @click="classEdit">编辑</el-button> -->
              <el-button @click="classDelete">删除</el-button>
            </div>
            <!-- 中间表单 -->

            <el-form
              ref="dataClass"
              :model="classOb"
              label-position="right"
              label-width="80px"
              style="width: 400px; margin-left: 50px"
            >
              <el-form-item label="上级" prop="parent">
                <!-- 分类管理/分类上级 -->
                <el-dropdown trigger="click" class="class-drop-down">
                  <el-button class="class-btn">
                    {{ classOb.parent ? classOb.parent : "请选择" }}
                    <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
                  </el-button>
                  <el-dropdown-menu slot="dropdown" class="class-dropdown-menu">
                    <el-dropdown-item>
                      <el-tree
                        :data="treeList"
                        accordion
                        ref="classInnerTree"
                        @node-click="setTreeId('classInnerTree')"
                      ></el-tree>
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </el-form-item>
              <el-form-item label="分类名称" prop="fullName">
                <el-input v-model="classOb.fullName"></el-input>
              </el-form-item>
              <el-form-item label="分类编码" prop="code">
                <el-input v-model="classOb.code" />
              </el-form-item>
              <el-form-item label="蒙语名称" prop="fullNameMgl">
                <el-input v-model="classOb.fullNameMgl" />
              </el-form-item>
              <el-form-item label="显示顺序" prop="sortCode">
                <el-input v-model="classOb.sortCode" />
              </el-form-item>
              <el-form-item label="选项" prop="enabled">
                <el-checkbox
                  :checked="classOb.enabled == '1' ? true : false"
                ></el-checkbox>
              </el-form-item>
              <el-form-item label="备注" prop="remark">
                <el-input
                  v-model="classOb.remark"
                  :autosize="{ minRows: 2, maxRows: 4 }"
                  type="textarea"
                />
              </el-form-item>
            </el-form>
          </el-card>
        </el-col>
      </el-row>

      <el-row>
        <!-- 取消 确认按钮 -->
        <div class="class-footer btn-box">
          <el-button @click="showClass = false">{{ "取消" }}</el-button>
          <el-button type="primary" @click="handleClassConfirm">{{ "确定" }}</el-button>
        </div>
      </el-row>
    </el-dialog>
    <!-- 编辑，新增按钮的弹出框 -->
    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      width="600px"
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="right"
        label-width="80px"
        style="width: 400px; margin-left: 50px"
      >
        <el-form-item label="上级" prop="parent">
          <!-- 新增弹出框下的tree -->
          <el-dropdown trigger="click" :hide-on-click="true" class="class-drop-down">
            <el-button class="class-btn">
              {{ temp.parent ? temp.parent : "请选择" }}
            </el-button>
            <el-dropdown-menu slot="dropdown" class="class-dropdown-menu">
              <el-dropdown-item>
                <!-- addTree里面渲染的是对应table表的数据 -->
                <el-tree
                  @node-click="setTreeId('addTree')"
                  ref="addTree"
                  :data="treeList"
                  :props="defaultProps"
                  :filter-node-method="filterNode"
                  class="filter-tree"
                  default-expand-all
                />
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-form-item>
        <el-form-item label="项目名称" prop="fullName">
          <el-input v-model="temp.fullName"></el-input>
        </el-form-item>
        <el-form-item label="项目值" prop="code">
          <el-input v-model="temp.code" />
        </el-form-item>
        <el-form-item label="蒙语名称" prop="fullNameMgl">
          <el-input v-model="temp.fullNameMgl" />
        </el-form-item>
        <el-form-item label="显示顺序" prop="sortCode">
          <el-input v-model="temp.sortCode" />
        </el-form-item>
        <el-form-item label="选项" prop="enabled">
          <el-checkbox v-model="temp.enabled" />
          <span style="margin-left: 5px">有效</span>
        </el-form-item>
        <el-form-item label="说明" prop="remark">
          <el-input
            v-model="temp.remark"
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
          />
        </el-form-item>
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
    <!-- 上传按钮的弹出框 -->
    <el-dialog :visible.sync="showUpload" :title="textMap[dialogStatus]" width="400px">
      <DialogUploadExcel
        v-if="dialogStatus == 'upload'"
        @hideDialogUpload="handleDialogUpload"
      />

      <DialogLoadDic
        v-if="dialogStatus == 'load'"
        @cancelLoad="handleCancelLoad"
        @confirmLoad="handleConfirmLoad"
        :dicList="this.list"
      />
    </el-dialog>
  </el-container>
</template>

<script>
import {
  fetchList,
  getDetail,
  save,
  changeState,
  deleteData,
  dicLoad,
  dicCreate,
} from "@/api/myApi/dictionary";
import {
  getDicDetail,
  saveDetail,
  changeDetailState,
  deleteDetailData,
} from "@/api/myApi/dicsionaryDetail";
import { parseTime } from "@/utils";
import { formatData } from "@/utils/myUtils/RecursionData";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import waves from "@/directive/waves"; // waves directive
import DialogUploadExcel from "./dialogUploadExcel/index";
import DialogLoadDic from "./dialogLoadDic/index";
import MyTable from "./dicTable/index";
export default {
  components: { Pagination, DialogUploadExcel, DialogLoadDic, MyTable }, //分页组件
  directives: { waves },
  computed: {
    //明细表用
    filterSortCode() {
      if (this.list[0]) {
        if (parseInt(this.list[0].sortCode)) {
          return +this.list[0].sortCode + 1;
        } else {
          return "0";
        }
      } else {
        return "0";
      }
    },
    //分类管理用
    fiterClassSortCode() {
      if (this.treeListOrigin) {
        if (parseInt(this.treeListOrigin[0].sortCode)) {
          return +this.treeListOrigin[0].sortCode + 1;
        }
      } else {
        return "0";
      }
    },
    //引入（下载）字典用
    dicList() {
      return this.treeList.filter((item) => item.parentId == "0");
    },
  },
  data() {
    return {
      treeListOrigin: [], //最开始获取的树的列表，用于获取明细表编辑弹框的上级内容
      createBtnLoading: false, //控制生成按钮loading
      // loadDictionaryId: "", //上传弹窗的字典id
      // curTreeName: "", //当前点击tree的名字。
      showUpload: false, //控制上传弹窗
      showClass: false, //控制分类管理是否隐藏
      tableId: 0, //树的ID。
      detailId: 0, //明细的id，可以在明细下继续添加
      // filterText: "",
      treeList: [], //treeList数组
      defaultProps: {
        children: "children",
        label: "label",
      },
      tableKey: 0,
      list: [], //tableList
      total: 0, //数据总数
      listLoading: true, //table正在加载
      listQuery: {
        //字典树的查询参数
        model: {
          // fullName: "系统",
          // deleteMark: "0",
          companyCode: "999",
        },
        page: {
          pageNumber: 1,
          pageSize: 100,
          sortName: "sort_code",
          sortOrder: "desc",
        },
      },

      listDetail: {
        //字段详细信息的查询参数
        model: {
          deleteMark: "0",
        },
        page: {
          pageNumber: 1,
          pageSize: 8,
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
      // calendarTypeOptions,
      // sortOptions: [
      //   //正序倒序
      //   { label: "ID Ascending", key: "+id" },
      //   { label: "ID Descending", key: "-id" },
      // ],
      // statusOptions: ["published", "draft", "deleted"], //状态数组
      // showReviewer: false,？？
      dialogFormVisible: false, //是否显示 编辑表单
      dialogStatus: "", //编辑表单状态：update or create 弹框状态upload(上传) load(下载、引入)
      textMap: {
        //弹出框的标题
        update: "编辑",
        create: "添加",
        upload: "导入",
        load: "引入",
      },
      rules: {
        //新增表单验证
        parent: [{ required: true, message: "上级必须填写", trigger: "blur" }],
        fullName: [{ required: true, message: "名称必须填写", trigger: "blur" }],
        code: [{ required: true, message: "项目值必须填写", trigger: "blur" }],
        // sortCode: [
        //   { required: true, message: "显示顺序必须填写", trigger: "blur" },
        // ],
      },
      classRules: {
        //新增表单验证
        fullName: [{ required: true, message: "名称必须填写", trigger: "trigger" }],
      },
      // downloadLoading: false,//？？
      temp: {
        dataDictionaryId: "", //上级的树的id
        parent: "", //上级,
        parentId: "", //上级的明细的id
        dataDictionaryDetailId: "", //自己的id，传了就是修改，不传就是新增
        fullName: "", //项目名称
        code: "", //项目值
        fullNameMgl: "", //蒙文名称
        sortCode: "0", //显示顺序
        enabled: true, //分类选项
        remark: "", //说明
      },
      classOb: {
        dataDictionaryId: "", //自己的id：为空新增：不为空编辑
        parentId: "", //上级的id、
        parent: "", //上级的名称
        parentMgl: "", //父及的蒙语名称
        code: "", //自身的code
        fullName: "", //名称
        fullNameMgl: "", //蒙语名称
        category: "", //分类名称
        categoryCode: "0", //分类编码
        sortCode: "0", //显示顺序
        enabled: true, //分类选项
        remark: "", //说明
      },
      curData: {}, //当前点击的tree的所有信息
    };
  },
  // watch: {
  //   filterText(val) {
  //     this.$refs.tree.filter(val);
  //   },
  // },
  created() {
    this.getTreeList(); //获取tree的数据
  },
  methods: {
    //点击获取当前节点树的id
    setTreeId(treeName) {
      if (treeName == "dicTree") {
        //当前点击树的 所有信息
        this.tableId = this.$refs.dicTree.currentNode.node.data.dataDictionaryId;
        this.temp.parent = this.$refs.dicTree.currentNode.node.data.label;
        // this.curData = this.$refs.dicTree.currentNode.node.data;
        // this.temp.parentId = this.tableId;
        //发送AJAX获取对应的tableList
        this.getTableList();
      } else if (treeName == "classTree") {
        //分类管理左边树，这里用classOb的数据
        this.curData = this.$refs.classTree.currentNode.node.data;
        this.tableId = this.$refs.classTree.currentNode.node.data.dataDictionaryId;
        this.classOb = {
          ...this.curData,
        };
        // this.classOb.parent = this.$refs.classTree.currentNode.node.data.label;
        // this.classOb.parentId = this.tableId;
      } else if (treeName == "classInnerTree") {
        //分类管理右边树 这里用classOb的数据
        this.tableId = this.$refs.classInnerTree.currentNode.node.data.dataDictionaryId;
        this.classOb.parent = this.$refs.classInnerTree.currentNode.node.data.label;
        this.classOb.parentId = this.tableId;
        this.curData = this.$refs.classInnerTree.currentNode.node.data;
      } else if (treeName == "addTree") {
        //新增按钮弹出框的树。这里用temp的数据
        this.tableId = this.$refs.addTree.currentNode.node.data.dataDictionaryId;
        this.temp.parent = this.$refs.addTree.currentNode.node.data.label;
        this.curData = this.$refs.addTree.currentNode.node.data;
        // this.temp.parentId =
        //   this.$refs.addTree.currentNode.node.data.dataDictionaryId || 0;
      }
    },
    filterNode(value, data) {
      if (!value) {
        return true;
      } else {
        return data.label.indexOf(value) !== -1;
      }
    },
    //获取tree数据
    getTreeList() {
      this.listLoading = true;
      let treeList = []; //最后的树的数组
      //首先拿到tree的数据
      // let treeArr = []; //过滤用的临时数组
      //调接口：字典管理：base/datadictionary/find 用listQuery， 参数
      fetchList(this.listQuery).then((res) => {
        this.treeListOrigin = res.data.rows;
        console.log("getTreeList打印", res);
        this.treeList = formatData(res.data.rows, "dataDictionaryId");
        // this.treeList = treeList; // 然后赋值给 treeList
        this.listLoading = false; //关闭加载动画
      });
    },

    //获取table的数据
    getTableList(id) {
      this.listLoading = true;
      //调接口：字典管理明细：base/datadictionarydetail/find   用listDetail，参数
      this.listDetail.model.dataDictionaryId = this.tableId;
      // this.listDetail.model.parentId = this.tableId;
      if (id) {
        this.listDetail.model.dataDictionaryId = id;
      }
      getDicDetail(this.listDetail)
        .then((res) => {
          this.listLoading = false;
          this.list = res.data.rows;
          console.log("getTableList打印参数：", this.list);
          this.total = res.data.total;
        })
        .catch((error) => {
          console.log(error);
          this.listLoading = false;
        });
    },
    //点击分页按钮的处理函数
    getTableListByPage(val) {
      console.log("分页组件点击", val);
      this.listDetail.page.pageNumber = val.page;
      this.listDetail.page.pageSize = val.limit;
      //调接口：获取表格信息
      this.getTableList();
    },
    //重置Temp对象（即表格单行数据）
    resetTemp() {
      this.curData = {};
      this.temp = {
        dataDictionaryId: "", //数据字典的Id
        dataDictionaryDetailDetailId: "", //自身主键
        parentId: "", //明细的上级Id
        parent: this.temp.parent, //上级
        fullName: "", //项目名称
        code: "", //项目值
        fullNameMgl: "",
        sortCode: this.filterSortCode, //显示顺序
        enabled: true, //分类选项
        remark: "", //说明
      };
    },
    //点击新增按钮
    handleCreate() {
      if (!this.tableId) {
        this.$message("请选择分类", "提示");
        return;
      }
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs.dataForm.clearValidate();
      });
    },
    //点击新增按钮的确认按钮
    createData() {
      this.dialogFormVisible = true;
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          //这里修改新增需要的参数
          if (this.temp.enabled) {
            this.temp.enabled = "1";
          } else {
            this.temp.enabled = "0";
          }
          // this.temp.sortCode="888"
          this.temp.sortCode = "0000000" + this.filterSortCode;
          this.temp.dataDictionaryId = this.tableId;
          this.temp.parentMgl = this.curData.fullNameMgl;
          let data = [];
          data.push(this.temp);
          let tempData = {
            models: data,
            terminal: {
              code: "01",
              Text: "浏览器",
              modelCode: "modelcode001",
              model: "模块名称",
            },
          };
          console.log("新增按钮确认打印", tempData);
          this.dialogFormVisible = false;
          //调接口：字典管理明细表格的新增 base/datadictionarydetail/save
          saveDetail(tempData).then((res) => {
            if (res.code == 200) {
              this.$notify({
                title: "成功",
                message: "创建成功",
                type: "success",
                duration: 2000,
              });
              //新增完数据，重新获取该id下的数据
              //AJAX()
              this.getTableList();
            }
          });
        }
      });
    },
    //点击编辑按钮
    handleUpdate(row) {
      //合并对象
      this.temp = Object.assign({}, row);
      this.setParent(row.dataDictionaryId);
      this.temp.enabled = this.temp.enabled == "1" ? true : false;
      // this.temp.sortCode = this.handleFilterSortCode(this.temp.sortCode);
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    //点击编辑按钮的确认按钮
    updateData() {
      this.$refs["dataForm"].validate((valid) => {
        if (valid) {
          let tempData = Object.assign({}, this.temp);
          this.dialogFormVisible = false;
          tempData.enabled = this.temp.enabled == true ? "1" : "0";
          tempData.dataDictionaryId = this.curData.dataDictionaryId; //传了报错
          // this.temp.parentId = this.curData.dataDictionaryId;

          //调接口：字典管理明细表格的修改，base/datadictionarydetail/save;

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
          console.log("点击编辑按钮确认按钮：", query);
          saveDetail(query).then((res) => {
            //修改完数据，再获重新获取数据
            //AJAX()
            if (res.code == 200) {
              this.$notify({
                title: "成功",
                message: "更新成功",
                type: "success",
                duration: 2000,
              });
              //AJAX请求刷新数据
              this.getTableList();
            }
          });
        }
      });
    },
    //点击删除按钮
    async handleDelete(row) {
      let data = [];
      data.push({
        dataDictionaryDetailId: row.dataDictionaryDetailId,
        deleteMark: "1",
      });
      let query = {
        models: data,
        terminal: {
          code: "01",
          Text: "浏览器",
          modelCode: "modelcode001",
          model: "模块名称",
        },
      };

      try {
        await this.$confirm("此操作将删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        //调接口：字典管理明细，base/datadictionarydetail/state
        try {
          const res = await changeDetailState(query);
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
    //点击序号后的切换排序方式
    // sortChange(data) {
    //   const { prop, order } = data;
    //   if (prop === "id") {
    //     this.sortByID(order);
    //   }
    // },
    //排序辅助方法
    // sortByID(order) {
    //   if (order === "ascending") {
    //     this.listQuery.sort = "+id";
    //   } else {
    //     this.listQuery.sort = "-id";
    //   }
    //   this.handleFilter();
    // },
    //排序辅助方法
    getSortClass: function (key) {
      const sort = this.listQuery.sort;
      return sort === `+${key}` ? "ascending" : "descending";
    },

    // 分类管理的相关内容
    //重置classOb对象(分类管理内的表单数据)
    resetClassOb() {
      this.curData = {};
      this.classOb = {
        dataDictionaryId: "",
        parentId: "root", //上级的id
        parent: "", //上级的名称
        parentMgl: "", //父及的蒙语名称
        code: "", //自身的code
        fullName: "", //名称
        fullNameMgl: " ", //蒙语名称
        category: "", //分类
        categoryCode: "0", //分类编码
        sortCode: this.fiterClassSortCode, //显示顺序
        enabled: true, //分类选项
        remark: "", //说明
      };
    },
    //分类管理弹出框的确认按钮
    handleClassConfirm() {
      this.$refs["dataClass"].validate(async (valid) => {
        if (valid) {
          this.showClass = !this.showClass;
          if (this.curData.parentId) {
            // this.classOb.parentId = this.curData.parentId; //重要
            this.classOb.parentMgl = this.curData.fullNameMgl;
            this.classOb.parent = this.curData.fullName;
          } else {
            this.classOb.parentId = "root"; //重要
            this.classOb.parentMgl = "";
            this.classOb.parent = "";
          }
          this.classOb.sortCode = "0000000" + this.filterClassSortCode;
          this.setCategory(); //设置当前的分类编码category
          //定义一个变量用来传参
          let query = { ...this.classOb };
          if (this.classOb.enabled) {
            query.enabled = "1";
          } else {
            query.enabled = "0";
          }
          let data = [];
          data.push(query);
          let tempData = {
            models: data,
            terminal: {
              code: "01",
              Text: "浏览器",
              modelCode: "modelcode001",
              model: "数据字典管理",
            },
          };
          console.log("分类管理点击确认按钮打印", tempData);
          //调接口：新增、编辑表单
          try {
            const res = await save(tempData);
            if (res.code == 200) {
              this.$notify({
                title: "成功",
                message: "创建成功",
                type: "success",
                duration: 2000,
              });
              //重新获取数据
              this.getTreeList();
            }
          } catch (error) {}
        }
      });
    },
    //辅助设置分类管理category categoryCode的值
    setCategory() {
      if (this.curData.parentId) {
        //当前选中对象有值，就知道它的id，根据id查到它的category值
        this.treeListOrigin.forEach((item) => {
          if (item.dataDictionaryId == this.curData.dataDictionaryId) {
            this.classOb.category = item.category;
            this.classOb.categoryCode = item.categoryCode;
          }
        });
        console.log("当前对象有值");
      } else {
        //当前对象没有值，说明它是跟节点,根节点的category根categoryCode是它本身。
        console.log("当前对象没有值");
        this.classOb.categoryCode = this.classOb.code;
        this.classOb.category = this.classOb.fullName;
      }
    },
    //点击弹出分类管理
    handleShowClass(val) {
      this.showClass = !this.showClass;
      this.resetClassOb();
      this.$nextTick(() => {
        this.$refs["dataClass"].clearValidate();
      });
    },
    //点击分类管理中的新增按钮
    classCreate() {
      if (!this.curData.parentId) {
        //如果没有选中tree
        this.$message("您没有选中任何项，请选中后再操作");
        return;
      } else {
        this.$nextTick(() => {
          this.$refs["dataClass"].resetFields();
          this.classOb.parentId = "";
          this.curData = {};
        });
      }
    },
    //点击分类管理中的编辑按钮
    // classEdit() {
    //   if (!this.curData.parentId) {
    //     //如果没有选中tree
    //     this.$message("您没有选中任何项，请选中后再操作");
    //     return;
    //   } else {
    //     //让classOb内的内容，为当前选中对象的内容；
    //     this.classOb = {
    //       ...this.curData,
    //     };
    //   }
    // },
    //点击分类管理中的删除按钮 tableId
    async classDelete() {
      //删除选中的该条记录tableId
      if (!this.curData.parentId) {
        //如果没有选中tree
        this.$message("您没有选中任何项，请选中后再操作");
        return;
      }

      //是否删除
      try {
        await this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        //发送AJAX 删除该条数据
        let data = [];
        data.push({
          dataDictionaryId: this.curData.dataDictionaryId,
          deleteMark: "1",
        });
        let tempData = {
          models: data,
          terminal: {
            code: "01",
            Text: "浏览器",
            modelCode: "modelcode001",
            model: "数据字典管理",
          },
        };
        console.log("分类管理删除按钮打印", tempData);
        try {
          // const result = await deleteData(tempData);
          const result = await changeState(tempData);
          if (result.code === 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            //刷新树。
            this.getTreeList();
            //关闭弹出框
            this.showClass = !this.showClass;
          }
        } catch (error) {}
      } catch (error) {
        this.$message({
          type: "info",
          message: "已取消删除",
        });
      }
    },
    refrensh() {
      //刷新页面
      this.getTreeList(); //获取tree的数据
      this.getTableList(this.curData.dataDictionaryId);
    },
    //点击表格里的新增,给明细添加明细
    // handleDetailAdd(row) {
    //   this.resetTemp();
    //   this.temp.parentId = row.dataDictionaryDetailId;
    //   this.temp.parent = row.fullName;
    //   this.dialogStatus = "create";
    //   this.dialogFormVisible = true;
    //   this.$nextTick(() => {
    //     this.$refs.dataForm.clearValidate();
    //   });
    // },
    //过滤sortCode
    handleFilterSortCode(sortCode) {
      return sortCode.replace(/\b(0+)/gi, "");
    },
    //改变categoryCode的值
    handleChangeCategory() {
      if (this.classOb.category == "系统") {
        this.classOb.categoryCode = "0";
      } else if (this.classOb.category == "业务") {
        this.classOb.categoryCode = "1";
      }
    },
    //导入按钮监听函数：关闭上传的弹窗
    handleDialogUpload(val) {
      this.showUpload = val;
      //重新获取数据
      this.getTreeList();
    },
    //点击导入按钮（upload）
    handleUploadDic() {
      this.showUpload = true;
      this.dialogStatus = "upload";
    },
    //点击引入按钮（load）
    handleLoadDic() {
      this.showUpload = true;
      this.dialogStatus = "load";
    },
    //点击load弹框的取消按钮
    handleCancelLoad() {
      //关闭弹窗
      this.showUpload = false;
    },
    //点击load弹框的确认按钮
    async handleConfirmLoad(val) {
      //关闭弹窗
      this.showUpload = false;
      // this.loadDictionaryId = val;
      console.log("点击load弹窗打印", val);
      let tempData = {
        model: {
          dataDictionaryId: val,
        },
        terminal: {
          code: "01",
          Text: "浏览器",
          modelCode: "modelcode001",
          model: "数据字典管理",
        },
      };

      return;
      try {
        const res = await dicLoad(tempData);
        if (res.code == 200) {
          //引入成功，然后XXXX！！！
          this.$notify({
            title: "成功",
            message: "引入成功",
            type: "success",
            duration: 2000,
          });
        }
      } catch (error) {
        console.log("引入字典的错误打印", error);
      }
    },
    //点击生成按钮
    async handleCreateBtn() {
      this.createBtnLoading = true; //动画开启
      let tempData = {
        model: {},
        terminal: {
          code: "01",
          Text: "浏览器",
          modelCode: "modelcode001",
          model: "数据字典管理",
        },
      };
      try {
        //调接口：base/datadictionary/create
        const res = await dicCreate(tempData);
        if (res.code) {
          //引入成功，然后XXXX！！！
          this.$notify({
            title: "成功",
            message: "生成成功",
            type: "success",
            duration: 2000,
          });
          this.createBtnLoading = false; //动画关
        }
      } catch (error) {
        this.createBtnLoading = false; //动画关
      }
    },
    //辅助函数设置parent（编辑弹框上级）的值
    setParent(id) {
      this.treeListOrigin.forEach((item) => {
        if (item.dataDictionaryId == id) {
          this.temp.parent = item.fullName;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container-box {
  box-sizing: border-box;
  padding: 20px 20px 0 20px;
}
.in-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.w {
  margin: auto;
}
.btn-box {
  /* background-color: #f40; */
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
}

.class-btn {
  width: 320px;
  // margin-top: 30px;
}
.class-dropdown-menu {
  width: 320px;
}
.dialog-footer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.left-box {
  height: calc(100vh - 130px);
  overflow-y: scroll;
}
.right-box {
  overflow: hidden;
  min-width: 500px;
  // height: calc(100vh - 100px);
  border: 1px solid $tBorderColor;
  min-width: 500px;
  box-sizing: border-box;
  padding: 10px 25px 10px 25px;
  height: calc(100vh - 130px);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  margin-left: 20px;
}
.class-tree-box {
  height: 520px;
  margin-right: 20px;
  overflow-y: scroll;
}
.btn-container {
  margin-left: 130px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
}
.select-box {
  width: 320px;
}

.class-dropdown-menu {
  height: 397px;
  overflow-y: scroll;
}
.el-dropdown-menu__item {
  padding: 0;
}
</style>
