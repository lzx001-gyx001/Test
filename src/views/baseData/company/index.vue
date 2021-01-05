<template>
  <el-container class="container-box">
    <!-- 右侧表格区域 -->
    <el-col class="right-box">
      <!-- 按钮区域 -->
      <el-row class="btn-row">
        <el-button icon="el-icon-edit" @click="refrensh" class="btn-green">{{
          "刷新"
        }}</el-button>
        <el-button
          class="btn-blue"
          icon="el-icon-circle-plus-outline"
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
          <!-- 这里是子表格 -->

          <el-table-column type="expand">
            <template slot-scope="{ row }">
              <el-table
                :key="0"
                :data="row.children"
                fit
                highlight-current-row
                style="width: 100%"
                :show-header="false"
                v-if="row.children.length"
              >
                <!-- 占位 -->
                <el-table-column width="48px"></el-table-column>
                <!-- 序号 -->
                <el-table-column
                  :label="$t('table.id')"
                  prop="sortCode"
                  align="center"
                  width="80px"
                >
                  <template slot-scope="{ row }">
                    <span>{{ row.sortCode }}</span>
                  </template>
                </el-table-column>
                <!--名称 -->
                <el-table-column label="名称" prop="value" width="110px" align="center">
                  <template slot-scope="{ row }">
                    <span>{{ row.fullName }}</span>
                  </template>
                </el-table-column>
                <!--编码 -->
                <el-table-column
                  label="编码"
                  prop="companyCode"
                  min-width="150px"
                  width="80px"
                  align="center"
                >
                  <template slot-scope="{ row }">
                    <span>{{ row.companyCode }}</span>
                  </template>
                </el-table-column>

                <!--简称-->
                <el-table-column
                  label="简称"
                  prop="shortName"
                  width="80px"
                  align="center"
                >
                  <template slot-scope="{ row }">
                    <span>{{ row.shortName }}</span>
                  </template>
                </el-table-column>
                <!--分类 -->
                <el-table-column label="分类" prop="category" align="center" width="95">
                  <template slot-scope="{ row }">
                    <span>{{ row.category }}</span>
                  </template>
                </el-table-column>
                <!-- 联系人 -->
                <el-table-column
                  label="联系人"
                  width="150px"
                  align="center"
                  prop="contact"
                >
                  <template slot-scope="{ row }">
                    <span>{{ row.contact }}</span>
                  </template>
                </el-table-column>
                <!-- 电话 -->
                <el-table-column
                  label="电话"
                  prop="phone"
                  class-name="status-col"
                  width="150"
                >
                  <template slot-scope="{ row }">
                    <span>{{ row.phone }}</span>
                  </template>
                </el-table-column>
                <!-- 传真 -->
                <el-table-column
                  label="传真"
                  prop="fax"
                  class-name="status-col"
                  width="100"
                >
                  <template slot-scope="{ row }">
                    <span>{{ row.fax }}</span>
                  </template>
                </el-table-column>
                <!-- 选项 -->
                <el-table-column label="有效" prop="utime" width="100" align="center">
                  <template slot-scope="{ row }">
                    <el-checkbox
                      :checked="row.enabled == '1' ? true : false"
                    ></el-checkbox>
                  </template>
                </el-table-column>
                <!-- 描述 -->
                <el-table-column label="描述" prop="remark" width="150px" align="center">
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
                      ref="dataFormTable"
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
            </template>
          </el-table-column>

          <!-- 序号 -->
          <el-table-column
            :label="$t('table.id')"
            type="index"
            :index="indexMethod"
            prop="sortCode"
            align="center"
            width="80px"
          >
            <template slot-scope="{ row }">
              <span>{{ row.sortCode }}</span>
            </template>
          </el-table-column>
          <!-- 单选
          <el-table-column type="selection" align="center" width="55">
          </el-table-column> -->
          <!--名称 -->
          <el-table-column label="名称" prop="value" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.fullName }}</span>
            </template>
          </el-table-column>
          <!--编码 -->
          <el-table-column
            label="编码"
            prop="companyCode"
            min-width="150px"
            width="80px"
            align="center"
          >
            <template slot-scope="{ row }">
              <span>{{ row.companyCode }}</span>
            </template>
          </el-table-column>

          <!--简称-->
          <el-table-column label="简称" prop="shortName" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.shortName }}</span>
            </template>
          </el-table-column>
          <!--分类 -->
          <el-table-column label="分类" prop="category" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.category }}</span>
            </template>
          </el-table-column>
          <!-- 联系人 -->
          <el-table-column label="联系人" width="150px" align="center" prop="contact">
            <template slot-scope="{ row }">
              <span>{{ row.contact }}</span>
            </template>
          </el-table-column>
          <!-- 电话 -->
          <el-table-column label="电话" prop="phone" class-name="status-col" width="150">
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
          <!-- 选项 -->
          <el-table-column label="有效" prop="utime" width="100" align="center">
            <template slot-scope="{ row }">
              <el-checkbox :checked="row.enabled == '1' ? true : false"></el-checkbox>
            </template>
          </el-table-column>
          <!-- 描述 -->
          <el-table-column label="描述" prop="remark" align="center">
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
                ref="dataFormChildren"
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
        <!-- *公司编码/*公司名称 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="公司编码" prop="companyCode">
              <el-input v-model="temp.companyCode" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公司名称" prop="fullName">
              <el-input v-model="temp.fullName" />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 公司简称/公司分类 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="公司简称" prop="shortName">
              <el-input v-model="temp.shortName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公司分类" prop="category">
              <el-select v-model="temp.category" placeholder="请选择">
                <el-option
                  v-for="item in ['目录', '页面']"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 公司性质/公司法人 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="公司性质" prop="nature">
              <el-input v-model="temp.nature" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公司法人" prop="manager">
              <el-select v-model="temp.manager" placeholder="请选择">
                <el-option
                  v-for="item in ['iframe', 'click']"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 联系人/联系电话 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系人" prop="contact">
              <el-input v-model="temp.contact" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="temp.phone" />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 传真/电子邮件 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="传真" prop="fax">
              <el-input v-model="temp.fax" /> </el-form-item
          ></el-col>
          <el-col :span="12">
            <el-form-item label="电子邮件" prop="email">
              <el-input v-model="temp.email" /> </el-form-item
          ></el-col>
        </el-row>
        <!-- 所在省/所在市 -->
        <el-row>
          <el-form-item label="所在省" prop="province">
            <el-input v-model="temp.province" />
          </el-form-item>
        </el-row>
        <!-- 邮政编码/公司网址 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="邮政编码" prop="postalCode">
              <el-input v-model="temp.postalCode" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公司网址" prop="webUrl">
              <el-input v-model="temp.webUrl" />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 开户信息/显示顺序 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="开户信息" prop="accountInfo">
              <el-input v-model="temp.accountInfo" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="显示顺序" prop="sortCode">
              <el-input v-model="temp.sortCode" />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 选项（有效） -->
        <el-row>
          <el-form-item label="选项" prop="enabled">
            <el-checkbox :checked="temp.enabled == '1' ? true : false" />
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
        <el-button @click="handleCancel">{{ $t("table.cancel") }}</el-button>
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
import {
  fetchCompanyList,
  saveCompany,
  changeCompanyState,
  deleteCompany,
} from "@/api/myApi/company";
import { formatDataOfParent } from "@/utils/myUtils/RecursionData";
/**
 * 过滤参数
 */
const filterParam = (data) => {
  if (typeof data == "object" && data.type == "add") {
    data.isexpand = data.isexpand == true ? "1" : "0";
    data.allowButton = data.allowButton == true ? "1" : "0";
    data.allowView = data.allowView == true ? "1" : "0";
    data.allowForm = data.allowForm == true ? "1" : "0";
    data.authority = data.authority == true ? "1" : "0";
    data.dataScope = data.dataScope == true ? "1" : "0";
    data.enabled = data.enabled == true ? "1" : "0";
  } else if (typeof data == "object" && data.type == "edit") {
    data.isexpand = data.isexpand == "1" ? true : false;
    data.allowButton = data.allowButton == "1" ? true : false;
    data.allowView = data.allowView == "1" ? true : false;
    data.allowForm = data.allowForm == "1" ? true : false;
    data.authority = data.authority == "1" ? true : false;
    data.dataScope = data.dataScope == "1" ? true : false;
    data.enabled = data.enabled == "1" ? true : false;
  } else {
    return "data is not an object";
  }
};
export default {
  components: { Pagination },
  created() {
    //获取默认table数据
    this.getTableList();
  },
  data() {
    return {
      detailId: "", //判断是否是子表内容
      total: 0, //返回的总数，小于10不显示分页组件
      childrenList: [], //明细的明细的数组
      tableList: [], //右侧表格渲染的数组 tableList
      //treeList: [], //所有tree的数组
      // tableId: 0, //根据该值去获取对应的tableList
      listLoading: false, //是否正在加载
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
      },
      temp: {
        //新增，编辑时候的默认值。
        companyId: "", //主键id
        companyCode: "", //公司编码(单位编码)
        fullName: "", //名称
        shortName: "", //单位简称
        category: "", //单位分类
        nature: "", //公司性质
        manager: "", //公司法人
        contact: "", //联系人
        phone: "", //电话
        fax: "", //传真
        email: "", //邮箱
        province: "", //省
        address: "", //详细地址
        postalCode: "", //邮政编码
        webUrl: "", //公司网址
        accountInfo: "", //开户信息
        sortCode: "", //显示顺序
        enabled: "", //有效
        remark: "", //描述
        parentId: "", //父及主键，默认0
      },
      rules: {
        //表单验证
        title: [{ required: true, message: "名称必须填写", trigger: "blur" }],
      },
      textMap: {
        //弹出框的标题
        update: "编辑",
        create: "添加",
      },
    };
  },
  methods: {
    //根据tableId获取数据
    async getTableList() {
      this.listLoading = true;

      try {
        const res = await fetchCompanyList(this.listQuery);
        this.listLoading = false;
        this.tableList = formatDataOfParent(res.data.rows, "companyId");
        console.log(this.tableList);
        this.total = this.tableList.length;
      } catch (error) {
        console.log("getTableList错误打印", error);
      }
    },
    //点击分页组件获取数据
    getTableListByPage(val) {
      if (val) {
        this.listQuery.page.pageNumber = val.page;
        this.listQuery.page.pageSize = val.limit;
        //刷新数据
        this.getTableList();
      }
    },
    //点击刷新按钮
    refrensh() {
      this.getTableList(); //重新刷新页面
    },
    //点击新增按钮
    resetTemp() {
      //1.可以获取tableList中的一个数据然后合并
      //2.直接写死在这里
      this.temp = {
        //新增，编辑时候的默认值。
        companyId: "", //主键id
        companyCode: "", //公司编码(单位编码)
        fullName: "", //名称
        shortName: "", //单位简称
        category: "", //单位分类
        nature: "", //公司性质
        manager: "", //公司法人
        contact: "", //联系人
        phone: "", //电话
        fax: "", //传真
        email: "", //邮箱
        province: "", //省
        address: "", //详细地址
        postalCode: "", //邮政编码
        webUrl: "", //公司网址
        accountInfo: "", //开户信息
        sortCode: "", //显示顺序
        enabled: true, //有效
        remark: "", //描述
        parentId: "", //父及主键，默认0
      };
    },
    //点击新增按钮
    handleCreate() {
      // if (!this.detailId) {
      //   this.$message("请选择要操作的单位", "提示");
      //   return;
      // }
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs.dataForm.clearValidate();
      });
    },
    //点击新增按钮的确认按钮
    async createData() {
      this.dialogFormVisible = true;
      this.$refs.dataForm.validate(async (valid) => {
        if (valid) {
          let tempData = {
            ...this.temp,
          };
          if (this.detailId) {
            //如果点击了表格内容，说明要给改表格下增加内容
            tempData.parentId = this.detailId;
          }
          tempData.enabled = tempData.enabled == true ? "1" : "0";
          let data = [];
          data.push(tempData);
          let query = {
            models: data,
            terminal: {
              code: "01",
              Text: "浏览器",
              modelCode: "modelcode005",
              model: "账套管理",
            },
          };
          this.dialogFormVisible = false;
          console.log("新增按钮确认打印:", query);
          try {
            const res = await saveCompany(query);
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
            console.log("新增失败打印", error);
          }
        }
      });
    },
    //点击编辑按钮
    handleUpdate(row) {
      this.temp = Object.assign({}, row); //合并对象
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs.dataForm.clearValidate();
      });
    },
    //点击编辑按钮的确认按钮
    async updateData() {
      this.dialogFormVisible = false;
      this.$refs.dataForm.validate(async (valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp);
          //修改数据
          tempData.enabled = tempData.enabled == true ? "1" : "0";
          let data = [];
          data.push(tempData);

          let query = {
            models: data,
            terminal: {
              code: "01",
              Text: "浏览器",
              modelCode: "modelcode005",
              model: "账套管理",
            },
          };
          //调接口：/api/myApi/company
          try {
            const res = await saveCompany(query);
            if (res.code == 200) {
              //修改成功
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
        companyId: row.companyId,
        deleteMark: "1", //软删除
      };
      data.push(tempData);
      try {
        await this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        try {
          //物理删除
          // const res = await deleteModuleData(data);
          //软删除
          const res = await changeCompanyState(data);
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
    //点击弹出框的取消按钮
    handleCancel() {
      this.dialogFormVisible = false;
      this.detailId = "";
    },
    //点击表格中的某一行
    handleSelectTable(row) {
      if (row) {
        row[0] ? (this.detailId = row[0].companyId) : (this.detailId = "");
      }
      console.log("detaild", this.detailId);
    },
    //排序
    indexMethod(index) {
      return +index + 1;
    },
  },
};
</script>

<style scoped lang="scss">
.el-row {
  margin: 10px auto;
}
.right-box {
  overflow: hidden;
  min-width: 500px;
  border: 1px solid $tBorderColor;
  min-width: 500px;
  box-sizing: border-box;
  padding: 10px 25px 10px 25px;
  height: calc(100vh - 130px);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  box-sizing: border-box;
}
.class-btn {
  text-align: left;
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
</style>
