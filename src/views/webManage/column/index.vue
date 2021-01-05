<!-- 目录 -->
<template>
  <el-container class="container-box">
    <!-- 左侧tree -->
    <!-- <el-col :span="3" v-if="this.treeList.length">
      <el-card style="padding: 0" class="left-box">
        <el-tree
          v-loading="listLoading"
          @node-click="leftTreeOnClick"
          ref="leftTree"
          :data="treeList"
          class="filter-tree"
          default-expand-all
        />
      </el-card>
    </el-col> -->
    <!-- 右侧表格 + 按钮 -->
    <el-col class="right-box">
      <!-- 按钮 -->
      <el-row class="btn-row">
        <el-button @click="handleRefresh" class="btn-green">刷新</el-button>
        <el-button
          class="filter-item btn-blue"
          style="margin-left: 10px"
          icon="el-icon-edit"
          @click="handleCreate"
          >{{ "新增" }}</el-button
        >
      </el-row>
      <!-- 表格 -->
      <el-row>
        <el-col :span="24">
          <ClolumnTable
            v-if="this.tableList"
            :tableList="this.tableList"
            :listLoading="this.listLoading"
            @handleUpdate="handleUpdate"
            @handleDelete="handleDelete"
          />
        </el-col>
      </el-row>

      <!-- 分页组件 -->
      <el-row>
        <pagination
          v-show="total > 4"
          :total="total"
          :page.sync="listQuery.page.pageNumber"
          :limit.sync="listQuery.page.pageSize"
          @pagination="getTableListByPage"
        />
      </el-row>
    </el-col>

    <!-- 新增、编辑弹框 -->
    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      width="800px"
    >
      <el-form
        ref="dataFormEdit"
        :rules="rules"
        :model="temp"
        label-position="right"
        label-width="120px"
        style="width: 600px; margin: 0 0 0 60px"
      >
        <!-- *栏目编码/*栏目名称 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="栏目编码" prop="menuCode">
              <el-input v-model="temp.menuCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="栏目名称" prop="menuName">
              <el-input v-model="temp.menuName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- *栏目名称（蒙）/上级 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="栏目名称（蒙）" prop="menuNameMgl">
              <el-input v-model="temp.menuNameMgl" class="m-family" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上级栏目" prop="parentMenu">
              <el-dropdown trigger="click" placement="bottom-start">
                <el-button class="commont-width parent-box" style="width: 180px">
                  <span>{{
                    this.temp.parentMenu ? this.temp.parentMenu : "请选择"
                  }}</span>
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown" style="width: 180px">
                  <el-tree
                    @node-click="addTreeOnClick"
                    ref="addTree"
                    :data="treeList"
                    class="filter-tree"
                    default-expand-all
                  />
                </el-dropdown-menu>
              </el-dropdown>
              <!-- <el-select
                v-model="temp.parentMenu"
                placeholder="请选择"
                class="commont-width"
                @change="handleSelectParentMenu"
              >
                <el-option
                  v-for="(item, index) in this.tableList"
                  :key="index"
                  :label="item.menuName"
                  :value="item"
                >
                </el-option>
              </el-select> -->
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 默认行数/显示顺序 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="默认行数" prop="rowsCount">
              <el-input v-model="temp.rowsCount" type="number" min="0" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="显示顺序" prop="sortCode">
              <el-input v-model="temp.sortCode" />
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 链接地址、内容页面 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="链接地址" prop="url">
              <el-input v-model="temp.url" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="目录类型 " prop="menuType">
              <el-select
                v-model="temp.menuType"
                placeholder="请选择"
                class="commont-width"
                @change="handleSelectMenu"
              >
                <el-option
                  v-for="(item, index) in this.menuTypeList"
                  :key="index"
                  :label="item.text"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
            <el-form-item label="内容页面" prop="">
              <el-input v-model="temp" />
            </el-form-item>
          </el-col> -->
        </el-row>
        <!-- 导航类型，说明 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="说明" prop="remark">
              <el-input v-model="temp.remark" type="input"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 选项：是否导航，是否启用，是否专题，有效 -->
        <el-row>
          <el-form-item label="选项" prop="enabled">
            <!-- <el-checkbox v-model="">是否导航</el-checkbox>
            <el-checkbox v-model="checked">是否启用</el-checkbox>
            <el-checkbox v-model="checked">是否专题</el-checkbox> -->
            <el-checkbox v-model="temp.enabled">有效</el-checkbox>
          </el-form-item>
        </el-row>
        <!-- 图片 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="图片" prop="">
              <el-upload
                ref="upload"
                class="upload-box-PC"
                action=""
                :limit="1"
                list-type="picture-card"
                :http-request="handleUpload"
              >
                <img v-if="temp.imageUrl" :src="temp.imageUrl" class="avatar" />
                <i class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 创建时间、创建用户 -->
        <!-- <el-row>
          <el-col :span="12">
            <el-form-item label="创建时间" prop="createDate">
              <el-date-picker
                v-model="temp.createDate"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="创建用户" prop="createUser">
              <el-input v-model="temp.createUser"  />
            </el-form-item>
          </el-col>
        </el-row> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t("table.cancel") }}</el-button>
        <el-button
          :disabled="this.submitBtn"
          type="primary"
          @click="dialogStatus === 'create' ? createData() : updateData()"
          >{{ $t("table.confirm") }}</el-button
        >
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
import ClolumnTable from "./columnTable/index";
import Pagination from "@/components/Pagination";
// import { getMockTree, getMockTable } from "@/api/myApi/mockApi";
import { fetchMenuList, saveMenu, changeMenuState } from "@/api/myApi/menu";
import { formatDataOfParentMenu } from "@/utils/myUtils/RecursionData";
import { handleupload } from "@/utils/myUtils/upload";
import { serachDic } from "@/api/myApi/searchDic";

export default {
  components: {
    ClolumnTable,
    Pagination,
  },
  data() {
    //这里存放数据
    return {
      menuTypeList: [],
      submitBtn: false, //禁止提交
      tableId: 0, //树的id
      treeList: [], //左边树的数据
      tableList: [], //右边表格的数据
      total: 0, //数据总数
      listLoading: true, //table正在加载
      listQuery: {
        //字典树的查询参数
        model: {
          // fullName: "系统",
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
      dialogFormVisible: false, //是否显示 编辑表单
      dialogStatus: "", //编辑表单状态：update or create
      textMap: {
        //弹出框的标题
        update: "编辑",
        create: "添加",
      },
      rules: {
        //新增表单验证
        menuCode: [{ required: true, message: "栏目编码必须填写", trigger: "blur" }],
        menuName: [{ required: true, message: "栏目名称必须填写", trigger: "blur" }],
        // menuType: [{ required: true, message: "目录类型必须选择", trigger: "blur" }],
      },
      temp: {
        parentMenuId: "", //"父栏目主键",
        parentMenu: "", // "父栏目",
        parentMenuMgl: "", // "父栏目(蒙)",
        menuCode: "", //"栏目编码",
        menuName: "", //"栏目名称",
        menuNameMgl: "", //"栏目名称(蒙)",
        menuTypeCode: "", //"目录类型编码",
        menuType: "", // "目录类型",
        menuTypeMgl: "", // "目录类型（蒙）",
        url: "", //"链接地址",
        rowsCount: 0, // "行数",
        menuIcon: "", // "栏目图标",
        location: "", // "图标位置",
        originalPic: "", // "图标原图地址",
        thumbnail: "", // "图标缩略图地址",
        reducePic: "", // "图标压缩图地址",
        remark: "", // "备注",
        enabled: "", // "有效",
      },
      imageUrl: "", //储存上传图片的地址
    };
  },
  created() {
    // this.getTreeList();
    this.getTableList();
    this.serachDic(); //获取字典数据???接口有问题
  },
  mounted() {},
  destroyed() {},
  methods: {
    //点击左边的树
    // leftTreeOnClick(data, node, self) {
    //   this.tableId = data.id;
    //   this.getTableList();
    //   console.log("左边的树被点击了", this.tableId);
    // },
    //点击addTree
    addTreeOnClick(data, node, self) {
      this.temp.parentMenu = data.menuName;
      this.temp.parentMenuMgl = data.menuNameMgl;
      this.temp.parentMenuId = data.menuId;
    },
    //获取tree数据
    // async getTreeList() {
    //   this.listLoading = true;
    //   try {
    //     const res = await getMockTree();
    //     if ((res.code = 200)) {
    //       //注意mock的返回结构不同！！！！
    //       this.treeList = formatDataOfParent(res.data, "id");
    //       this.total = this.tableList.length;
    //       this.listLoading = false;
    //     }
    //   } catch (error) {
    //     console.log("getTreeList错误打印：", error);
    //     this.listLoading = false;
    //   }
    // },
    //获取table的数据
    async getTableList() {
      this.listLoading = true;
      try {
        const res = await fetchMenuList(this.listQuery);
        if (res.code == 200) {
          this.listLoading = false;
          console.log("getTableList打印：", res);
          // this.tableList = formatDataOfParentMenu(res.data.rows, "menuId");
          this.tableList = res.data.rows;
          this.treeList = formatDataOfParentMenu(res.data.rows, "menuId");
          this.total = res.data.total;
        }
      } catch (error) {
        this.listLoading = false;
        console.log("****错误打印******getTableListc：", error);
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
        parentMenuId: "", //"父栏目主键",
        parentMenu: "", // "父栏目",
        parentMenuMgl: "", // "父栏目(蒙)",
        menuCode: "", //"栏目编码",
        menuName: "", //"栏目名称",
        menuNameMgl: "", //"栏目名称(蒙)",
        menuTypeCode: "", //"目录类型编码",
        menuType: "", // "目录类型",
        menuTypeMgl: "", // "目录类型（蒙）",
        url: "", //"链接地址",
        rowsCount: 0, // "行数",
        menuIcon: "", // "栏目图标",
        location: "", // "图标位置",
        remark: "", // "备注",
        enabled: true,
      };
    },
    //点击新增按钮
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs.dataFormEdit.clearValidate();
        this.$refs.upload.clearFiles();
      });
    },
    //点击新增按钮的确认按钮
    createData() {
      this.dialogFormVisible = true;
      this.$refs.dataFormEdit.validate(async (valid) => {
        if (valid) {
          this.$nextTick(() => {
            this.$refs.upload.clearFiles();
          });
          this.dialogFormVisible = false;
          //这里修改新增需要的参数

          this.temp.enabled = this.temp.enabled == true ? "1" : "0";
          let data = [];
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
          console.log("新增按钮确认打印", tempData);
          try {
            const res = await saveMenu(tempData);
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
        }
      });
    },
    //设置menuType menuTypeCode menuTypeMgl 参数
    handleSelectMenu(e) {
      this.temp.menuType = e.text;
      this.temp.menuTypeMgl = e.mongolia;
      this.temp.menuTypeCode = e.code;
    },
    //设置parentMent
    handleSelectParentMenu(e) {
      this.temp.parentMenu = e.menuName;
      this.temp.parentMenuMgl = e.menuNameMgl;
      this.temp.parentMenuId = e.menuId;
    },
    //点击刷新按钮
    async handleRefresh() {
      this.listLoading = true;
      await this.getTableList();
      this.listLoading = false;
    },

    //点击编辑按钮
    handleUpdate(row) {
      // 合并对象
      this.temp = Object.assign({}, row);
      this.temp.enabled = this.temp.enabled == "1" ? true : false;
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs.dataFormEdit.clearValidate();
        this.$refs.upload.clearFiles();
      });

      // this.dialogStatus = row.dialogStatus;
      // this.dialogFormVisible = row.dialogFormVisible;
    },
    //点击编辑按钮的确认按钮
    updateData() {
      this.$refs.dataFormEdit.validate((valid) => {
        if (valid) {
          this.$nextTick(() => {
            this.$refs.upload.clearFiles();
          });
          this.dialogFormVisible = false;

          let tempData = Object.assign({}, this.temp);
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
          saveMenu(query).then((res) => {
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
          });
        }
      });
    },
    //点击删除按钮
    async handleDelete(row) {
      let data = [];
      data.push({
        menuId: row.menuId,
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
        const res = await changeMenuState(query);
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
    },
    // 上传图片到腾讯云
    handleUpload(e) {
      handleupload.call(this, e.file, "jpg", "admin").then((res) => {
        this.submitBtn = false; //解除禁用提交按钮
        this.imageUrl = res.Location;
        console.log("上传成功", this.imageUrl);
      });
    },
    //从字典获取数据
    async serachDic() {
      let query = {
        dictionary: {
          companyCode: "999",
          code: "Menu",
        },
        terminal: {
          code: "01",
          Text: "浏览器",
          modelCode: "modelcode002",
          model: "模块管理",
        },
      };

      try {
        const res = await serachDic(query);
        if (res.code == 200) {
          this.menuTypeList = res.data;
        }
      } catch (error) {
        console.log("获取字典数据失败", error);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.container-box {
  box-sizing: border-box;
  padding: 20px 40px 20px 20px;

  .left-box {
    height: calc(100vh - 130px);
  }
  .right-box {
    box-sizing: border-box;
    padding: 20px;
    height: calc(100vh - 130px);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }
  .commont-width {
    width: 180px !important;
  }
  .upload-box {
    width: 180px;
    height: 100px;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    padding-left: 90px;
  }
}
</style>
