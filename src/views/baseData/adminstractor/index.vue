<template>
  <!-- 用户管理页面 -->
  <el-container class="container-box">
    <!-- 左侧tree组件-->
    <!-- <el-col :span="5" style="marginright: 0; minwidth: 120px" v-if="this.treeList.length">
      <el-card style="padding: 0" class="left-box">
        <div class="bg-purple-dark">导航目录</div>
        <el-tree
          @node-click="setTreeId('systemTree')"
          ref="systemTree"
          :data="treeList"
          default-expand-all
          v-loading="listLoading"
        />
      </el-card>
    </el-col> -->
    <!-- 右侧表格区域 -->
    <el-col class="right-box">
      <!-- 按钮区域 -->
      <div class="in-row btn-row">
        <el-button icon="el-icon-edit" @click="refrensh" class="btn-green">{{
          "刷新"
        }}</el-button>
        <el-button
          class="btn-blue"
          icon="el-icon-circle-plus-outline"
          @click="handleCreate"
          >{{ "新增" }}</el-button
        >
        <el-button icon="el-icon-edit" class="btn-blue" @click="resetPwd"
          >重置密码</el-button
        >
        <!-- 搜索框 -->
        <div class="search-box in-row">
          <span class="key-word-box">关键字:</span>
          <el-input v-model="searchKeyWord"></el-input>
          <el-button class="btn-red" @click="handleSearch">{{ "搜索" }}</el-button>
        </div>
      </div>

      <!-- 表格区域 -->
      <el-row>
        <RightTable :listLoading="this.listLoading" :tableList="this.tableList" />
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
      class="dialog-edit"
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      width="1000px"
    >
      <div class="edit-dialog-box">
        <el-tabs @tab-click="handleChangePane" value="first">
          <el-tab-pane label="基本信息" name="first">
            <el-form
              ref="dataForm1"
              :model="temp"
              class="dialog-form-box"
              label-position="right"
              label-width="100px"
              style="width: 725px; height: 450px; margin: 0 auto"
            >
              <el-row>
                <el-col :span="12">
                  <el-form-item label="用户名" prop="account">
                    <el-input v-model="temp.account" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="登录密码" prop="password">
                    <el-input v-model="temp.password" />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <el-form-item label="姓名" prop="realName">
                    <el-input v-model="temp.realName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="姓名(蒙)" prop="realNameMgl">
                    <el-input v-model="temp.realNameMgl"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <el-form-item label="用户简介(蒙)" prop="introduceMgl">
                    <el-input v-model="temp.introduceMgl" />
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="用户简介" prop="introduce">
                    <el-input v-model="temp.introduce" />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <el-form-item label="姓名拼音" prop="spell">
                    <el-input v-model="temp.spell" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="账户类型" prop="userType">
                    <el-select
                      class="input-width"
                      v-model="temp.userType"
                      @change="handleChangeUserType"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in this.accountTypeList"
                        :key="item.text"
                        :label="item.text"
                        :value="item"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 选项 -->
              <el-row>
                <el-col :span="12">
                  <el-form-item label="性别" prop="gender">
                    <el-select
                      class="input-width"
                      v-model="temp.gender"
                      @change="handleChangeGender"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in this.genderList"
                        :key="item.text"
                        :label="item.text"
                        :value="item"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="出生日期" prop="birthday">
                    <el-date-picker
                      class="input-width"
                      v-model="temp.birthday"
                      type="date"
                      placeholder="选择日期"
                    >
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <el-form-item label="部门名称" prop="department">
                    <el-dropdown trigger="click" class="class-drop-down">
                      <el-button class="class-btn">
                        {{ this.temp.department ? this.temp.department : "请选择" }}
                        <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
                      </el-button>
                      <el-dropdown-menu slot="dropdown" class="class-dropdown-menu">
                        <el-dropdown-item>
                          <el-tree
                            :data="departmentList"
                            accordion
                            ref="departmentTree"
                            @node-click="clickTree"
                          ></el-tree>
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="有效" prop="enabled">
                    <el-checkbox
                      :value="temp.enabled == '1' ? true : false"
                    ></el-checkbox>
                  </el-form-item>
                </el-col>
              </el-row>

              <!-- 说明 -->
              <el-row>
                <el-col :span="12">
                  <el-form-item label="说明" prop="remark">
                    <el-input
                      v-model="temp.remark"
                      :autosize="{ minRows: 2, maxRows: 4 }"
                      type="textarea"
                    />
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="用户头像" prop="userAvatar">
                    <!-- <el-input v-model="temp.userAvatar" /> -->
                    <el-upload
                      ref="upload"
                      class="upload-box"
                      action=""
                      :limit="1"
                      list-type="picture-card"
                      :http-request="handleUpload"
                    >
                      <!-- <img v-if="temp.imageUrl" :src="temp.imageUrl" class="avatar" /> -->
                      <i class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>

          <el-tab-pane label="工作相关" name="second">
            <el-form
              ref="dataForm2"
              :model="temp"
              class="dialog-form-box"
              label-position="right"
              label-width="100px"
              style="width: 900px; height: 680px; margin: 0 auto"
            >
              <el-row>
                <el-col :span="8">
                  <el-form-item label="身份证号" prop="idCard">
                    <el-input v-model="detail.idCard" />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="年龄" prop="age">
                    <el-input v-model="detail.age" />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="手机" prop="mobile">
                    <el-input v-model="detail.mobile"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="8">
                  <el-form-item label="电子邮件" prop="email">
                    <el-input v-model="detail.email"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="紧急联系人" prop="emergencyContact">
                    <el-input v-model="detail.emergencyContact" />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="QQ号码" prop="qicq">
                    <el-input v-model="detail.qicq" />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="8">
                  <el-form-item label="微信号码" prop="wechatId">
                    <el-input v-model="detail.wechatId" />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="微博号码" prop="sinaId">
                    <el-input v-model="detail.sinaId" />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="民族" prop="nation">
                    <el-input v-model="temp.nation" :disabled="!temp.nation">{{
                      "暂无"
                    }}</el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="8">
                  <el-form-item label="国籍" prop="nationality">
                    <el-input
                      v-model="detail.nationality"
                      :disabled="!temp.nationality"
                      >{{ "暂无" }}</el-input
                    >
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="政治面貌 " prop="party">
                    <el-input v-model="detail.party"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="工作单位" prop="workUnit">
                    <el-input v-model="detail.workUnit" />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="8">
                  <el-form-item label="用工性质 " prop="workingProperty">
                    <el-input v-model="detail.workingProperty" />
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="职业资格" prop="competency">
                    <el-input v-model="detail.name" />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="工资卡 " prop="bankCode">
                    <el-input v-model="detail.bankCode"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="8">
                  <el-form-item label="职务" prop="duties">
                    <el-input v-model="detail.duties" />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="毕业学校 " prop="school">
                    <el-input v-model="detail.school" :disabled="!temp.school">{{
                      "暂无"
                    }}</el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="毕业时间" prop="graduationDate">
                    <el-input v-model="detail.graduationDate" />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="8">
                  <el-form-item label="工作时间 " prop="workingDate">
                    <el-input v-model="detail.workingDate" />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="学历" prop="education">
                    <el-input v-model="detail.name" />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="专业 " prop="major">
                    <el-input :disabled="!temp.major">{{ "暂无" }}</el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="最高学位" prop="degree">
                    <el-input v-model="detail.name" />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item
                    label="籍贯 "
                    :disabled="!temp.nativePlace"
                    prop="nativePlace"
                  >
                    <el-input>{{ "暂无" }}</el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="家庭住址邮编" prop="home_zip_code">
                    <el-input v-model="detail.name" />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="8">
                  <el-form-item label="家庭住址 " prop="home_address">
                    <el-input></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="住宅电话" prop="home_phone">
                    <el-input v-model="detail.name" />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="家庭传真 " prop="home_fax">
                    <el-input></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <!-- 说明 -->
              <el-row>
                <el-col :span="8">
                  <el-form-item label="有效" prop="enabled">
                    <el-checkbox :checked="detail.enabled"></el-checkbox>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="说明" prop="title">
                    <el-input
                      v-model="detail.remark"
                      :autosize="{ minRows: 2, maxRows: 4 }"
                      type="textarea"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="照片" prop="photograph">
                    <!-- <el-input v-model="temp.userAvatar" /> -->
                    <el-upload
                      ref="uploadPhoto"
                      class="upload-box"
                      action=""
                      :limit="1"
                      list-type="picture-card"
                      :http-request="handleUploadPic"
                    >
                      <!-- <img v-if="temp.imageUrl" :src="temp.imageUrl" class="avatar" /> -->
                      <i class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-tab-pane>
        </el-tabs>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">{{
            $t("table.cancel")
          }}</el-button>
          <el-button
            type="primary"
            @click="dialogStatus === 'create' ? createData() : updateData()"
            >{{ $t("table.confirm") }}</el-button
          >
        </div>
      </div>
    </el-dialog>

    <!-- 重置密码--弹出框 -->
    <el-dialog title :visible.sync="showResetPwd" width="400px">
      <el-form
        ref="dataForm"
        class="dialog-form-box"
        label-position="right"
        label-width="80px"
        style="width: 300px"
        :model="userInfo"
      >
        <el-form-item label="登录账户" prop="title">
          <!-- <el-input v-model="adminLoginUser.id" readonly /> -->
        </el-form-item>
        <el-form-item label="新密码" prop="title">
          <el-input v-model="userInfo.pwd" />
        </el-form-item>
        <el-form-item label="确认密码" prop="title">
          <el-input v-model="userInfo.pwdAgain" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleResetPwd('cancle')">{{ $t("table.cancel") }}</el-button>
        <el-button type="primary" @click="handleResetPwd('confirm')">{{
          $t("table.confirm")
        }}</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
import RightTable from "./rightTable/index";
import { fetchUsersList, saveUsers, changeUsersState } from "@/api/myApi/admin"; //用户api
import { fetchDepartmentList } from "@/api/myApi/department";
import { serachDic } from "@/api/myApi/searchDic"; //查字典 api
import { handleupload } from "@/utils/myUtils/upload"; //上传图片 api
import { formatDataOfParent } from "@/utils/myUtils/RecursionData";
export default {
  components: { Pagination, RightTable },
  data() {
    return {
      total: 0, //返回的总数，小于10不显示分页组件
      tableList: [], //右侧表格渲染的数组 tableList
      // tableId: 0, //根据该值去获取对应的tableList
      listLoading: false, //是否正在加载
      showResetPwd: false, //控制重置密码的弹框
      dialogStatus: "", //弹出框的状态 create是创建 update是编辑
      dialogFormVisible: false, //是否显示弹出框
      listQuery: {
        //请求数据需要的参数
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
          model: "模块名称",
        },
      },
      searchDicQuery: {
        dictionary: {
          companyCode: "999",
          code: "",
        },
        page: {
          pageNumber: 1,
          pageNumber: 10,
          sortOrder: "desc",
          sort_name: "code",
        },
        terminal: {
          code: "01",
          Text: "浏览器",
          modelCode: "modelcode02",
          model: "用户模块",
        },
      },
      temp: {
        //添加按钮默认表单内容
      },
      detail: {
        //添加按钮默认工作相关表单
      },
      textMap: {
        //弹出框的标题
        update: "编辑",
        create: "添加",
      },
      // multipleSelection: [],

      searchKeyWord: "",

      userInfo: {
        //保存新密码
        pwd: "",
        pwdAgain: "",
      },
      genderList: [], //性别数组
      accountTypeList: [], //账户类型数组
      departmentList: [], //部门数组
      partyList: [], //政治面貌数组
    };
  },
  methods: {
    //获取tree数据
    getTreeList() {
      this.listLoading = true;
      setTimeout(() => {
        this.listLoading = false;
      }, 500);
    },
    //根据tableId获取数据
    async getTableList() {
      this.listLoading = true;
      this.listLoading = false;
      try {
        const res = await fetchUsersList(this.listQuery);
        if (res.code == 200) {
          this.listLoading = false;
          this.tableList = res.data.rows;
          console.log(this.tableList);
        }
      } catch (error) {
        this.listLoading = false;
        console.log("列表数据错误打印", error);
      }
    },
    //点击分页组件获取数据
    getTableListByPage(val) {
      if (val) {
        this.listQuery.page.pageNumber = val.page;
        this.listQuery.page.pageSize = val.limit;
        // console.log(this.listQuery, val);
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
        userId: "", //用户主键
        innerUser: "1", //是否内内部用户
        account: "", //用户名
        userTypeCode: "", //账户类型编码
        userType: "", //账户类型
        password: "", //登录密码
        equipment: "", //设备类型
        realName: "", //姓名
        realNameMgl: "", //姓名蒙语
        spell: "", //姓名拼音
        introduce: "", //用户简介
        introduceMgl: "", //用户简介（蒙）
        userAvatar: "", //用户头像
        location: "", //头像位置
        gender: "", //性别
        genderCode: "", //性别编码
        birthday: "", //出生日期
        department: "", //部门
        departmentId: "", //部门主键
        remark: "", //备注
        enabled: true, //有效
      };
    },
    resetDetail() {
      this.detail = {
        employeeId: "", //职员主键
        userId: "", //用户主键
        photograph: "", //照片√
        idCard: "", //身份证号码√
        age: "", //年龄√
        mobile: "", //电话√
        email: "", //电子邮件√
        emergencyContact: "", //紧急联系人√
        qicq: "", //QQ号码√
        wechatId: "", //微信号√
        sinaId: "", //微博号√
        nationCode: "", //民族编码 (暂无)
        nation: "", //民族(暂无)
        nationalityCode: "", //国籍编码(暂无)
        nationality: "", //国籍（暂无）
        partyCode: "", //政治面貌编码√
        party: "", //政治面貌√
        workUnit: "", //工作单位√
        workingProperty: "", //用工性质√
        competency: "", //职业资格√
        bankCode: "", //工资卡√
        dutiesCode: "", //职务编码√
        duties: "", //职务√
        schoolCode: "", //毕业学校编码（暂无）
        school: "", //毕业学校（暂无）
        graduationDate: "", //毕业时间√
        workingDate: "", //工作时间√
        educationCode: "", //学历编码√
        education: "", //学历√
        majorCode: "", //专业编码（暂无）
        major: "", //专业（暂无）
        degreeCode: "", //最高学位编码√
        degree: "", //最高学位√
        nativePlace: "", //籍贯(暂无)
        provinceCityCode: "", //省市区编码（暂无）
        provinceCity: "", //省市区（暂无）
        homeZipCode: "", //家庭住址邮编√
        homeAddress: "", //家庭住址√
        homePhone: "", //住宅电话√
        homeFax: "", //家庭传真√
        isdimissionCode: "", //是否离职编码√
        isdimission: "", //是否离职√
        dimissionDate: "", //离职日期√
        dimissionCause: "", //离职原因√
        dimissionWhither: "", //离职去向√
        enabled: true, //
      };
    },
    //点击新增按钮
    handleCreate() {
      this.resetTemp();
      this.resetDetail();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm1"].clearValidate();
        this.$refs.upload.clearFiles();
        this.$refs.uploadPhoto.clearFiles();
      });
    },
    //点击新增按钮的确认按钮
    async createData() {
      this.dialogFormVisible = true;
      this.$refs["dataForm1"].validate((valid) => {
        if (valid) {
          this.$nextTick(() => {
            this.$refs.upload.clearFiles();
            this.$refs.uploadPhoto.clearFiles();
          });
        }
      });
    },
    //点击编辑按钮
    handleUpdate(row) {
      // if (!this.multipleSelection.length > 0) {
      //   this.$alert("您没有选择任何,请选中后再操作", "提示");
      //   console.log(123);
      //   return;
      // }
      this.temp = Object.assign({}, row); //合并对象
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
        this.$refs.upload.clearFiles();
        this.$refs.uploadPhoto.clearFiles();
      });
    },
    //点击编辑按钮的确认按钮
    async updateData() {
      this.$refs["dataForm1"].validate((valid) => {
        if (valid) {
          this.$nextTick(() => {
            this.$refs.upload.clearFiles();
            this.$refs.uploadPhoto.clearFiles();
          });
          const tempData = Object.assign({}, this.temp);
          //调接口修改数据

          // await updateDictionary(tempData);
          // this.dialogFormVisible = false;
          //   this.$notify({
          //     title: "成功",
          //     message: "更新成功",
          //     type: "success",
          //     duration: 2000
          //   });
          updateArticle(tempData).then(() => {
            const index = this.list.findIndex((v) => v.id === this.temp.id);
            this.list.splice(index, 1, this.temp);
            //修改完数据，再获重新获取数据
            //AJAX()
            this.dialogFormVisible = false;
            this.$notify({
              title: "成功",
              message: "更新成功",
              type: "success",
              duration: 2000,
            });
          });
        }
      });
    },
    //点击删除按钮
    async handleDelete(row, index) {
      //删除完数据再重新获取数据。

      this.list.splice(index, 1);
    },
    //点击重置密码
    resetPwd() {
      // if (!this.multipleSelection.length > 0) {
      //   this.$alert("您没有选择任何,请选中后再操作", "提示");
      //   console.log(123);
      //   return;
      // }
      this.showResetPwd = !this.showResetPwd;
    },
    //点击搜索按钮
    hanleSearch() {
      if (!this.searchKeyWord) {
        return;
      }
      console.log(this.searchKeyWord);
      //根据关键字搜索，然后赋值给tableList渲染
    },
    //点击重置密码按钮弹出菜单，的【取消】【确定】按钮的处理函数
    handleResetPwd(val) {
      if (val == "confirm") {
        // this.userInfo.id = this.adminLoginUser.id;
        console.log(this.userInfo);
        //点击了确认
        //1.发送AJAX重置密码
        //2.关闭弹出窗口!
        this.showResetPwd = !this.showResetPwd;
      } else if (val == "cancle") {
        //点击了取消
        console.log("点击了取消");
        this.showResetPwd = false;
      }
    },
    //点击搜索按钮
    handleSearch() {
      return;
    },
    //编辑弹框选项卡
    handleChangePane(tab, e) {
      return;
    },
    //设置性别
    handleChangeGender(e) {
      this.temp.genderCode = e.code;
      this.temp.gender = e.text;
    },
    //获取性别数组
    async getGender() {
      this.searchDicQuery.dictionary.code = "Gender";
      try {
        const res = await serachDic(this.searchDicQuery);
        if (res.code == 200) {
          this.genderList = res.data.sort(this.compare);
        }
      } catch (error) {}
    },
    //设置账户类型
    handleChangeUserType(e) {
      this.temp.userTypeCode = e.code;
      this.temp.userType = e.text;
    },
    //获取账户类型
    async getUserType() {
      this.searchDicQuery.dictionary.code = "AccountType";
      try {
        const res = await serachDic(this.searchDicQuery);
        if (res.code == 200) {
          this.accountTypeList = res.data.rows;
        }
      } catch (error) {}
    },
    //获取部门数组
    async getDepartment() {
      let query = {
        model: {
          deleteMark: "0",
          enabled: "1",
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
      };
      try {
        const res = await fetchDepartmentList(query);
        if (res.code == 200) {
          // console.log("获取部门数组打印", res);
          this.departmentList = formatDataOfParent(res.data.rows, "departmentId");
          console.log(res.data.rows);
          console.log("部门数组", this.departmentList);
        }
      } catch (error) {}
    },
    //辅助排序
    compare(obj1, obj2) {
      var val1 = obj1.code;
      var val2 = obj2.code;
      if (val1 < val2) {
        return -1;
      } else if (val1 > val2) {
        return 1;
      } else {
        return 0;
      }
    },
    // 上传头像
    handleUpload(e) {
      handleupload.call(this, e.file, "jpg", "admin").then((res) => {
        this.submitBtn = false; //解除禁用提交按钮
        this.temp.location = "http://" + res.Location;
        console.log("上传成功", this.temp.location);
      });
    },
    //上传照片
    handleUploadPic(e) {
      handleupload.call(this, e.file, "jpg", "admin").then((res) => {
        this.submitBtn = false; //解除禁用提交按钮
        this.detail.photograph = "http://" + res.Location;
      });
    },
    //点击部门树
    clickTree(data, node, selft) {
      this.temp.department = data.fullName;
      this.temp.departmentId = data.departmentId;
    },
  },
  created() {
    //获取默认table数据
    this.getTableList();
    this.getGender();
    this.getDepartment();
    //获取treeList
    // this.getTreeList();
  },
};
</script>

<style scoped lang="scss">
.el-row {
  // margin: 10px auto;
}
.right-box {
  min-width: 400px;
}
.class-btn {
  width: 220px;
}
.class-dropdown-menu {
  width: 262.5px !important;
  box-sizing: border-box;
  left: 265px !important;
}

.in-row {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.search-box {
  margin-left: 10px;
  width: 500px;

  & :nth-child(3) {
    margin-left: 15px;
  }
  // & :nth-child(1) {
  //   color: #606266;
  // }
}
.left-box {
  height: calc(100vh - 130px);
}
.right-box {
  box-sizing: border-box;
  padding: 20px;
  height: calc(100vh - 130px);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.key-word-box {
  display: inline-block;
  height: 100%;
  min-width: 80px;
  line-height: 36px;
  font-size: 14px;
  text-align: center;
}
.container-box {
  box-sizing: border-box;
  padding: 20px 40px 20px 20px;
}

.btn-red:only-child {
  color: #fff;
}
.dialog-edit {
  .edit-dialog-box {
    height: 800px;
    width: 100%;
    position: relative;

    & .dialog-footer {
      position: absolute;
      bottom: 20px;
      right: 20px;
    }
    & .el-tabs > .el-tabs__header {
      margin-bottom: 22px !important;
      background-color: #f40;
    }
  }
}

.dialog-form-box {
  margin-right: 0;
}
.input-width {
  width: 262.5px;
}
.class-btn {
  width: 262.5px;
  // margin-top: 30px;
}

// .upload-box-p {
//   &:nth-child(1),
//   &:nth-child(2) {
//     top: -20px;
//   }
// }
</style>
