<!--  -->
<template>
  <el-row class="form-box">
    <el-form
      :rules="rules"
      ref="dataFormEdit"
      :model="tempData"
      label-position="right"
      label-width="120px"
      style="width: 100%"
    >
      <!-- *简历类型/*单位 -->
      <el-row class="in-row">
        <el-col :span="10" class="in-row-left">
          <el-form-item label="简历类型" prop="resumeType">
            <el-select
              :value-key="'1'"
              class="select-input"
              @change="changeResume"
              @visible-change="clickResume"
              :value="tempData.resumeType"
              placeholder="请选择"
            >
              <el-option
                v-for="(item, index) in this.resumeList"
                :key="index"
                :label="item.text"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10" class="in-row-left">
          <el-form-item label="单位" prop="mechanism">
            <el-input v-model="tempData.mechanism"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 开始时间，结束时间 -->
      <el-row class="in-row">
        <el-col :span="10" class="in-row-left">
          <el-form-item label="开始时间" prop="startDate">
            <!-- <el-input v-model="tempData.startDate" /> -->
            <el-date-picker
              class="select-input"
              v-model="tempData.startDate"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="10" class="in-row-left">
          <el-form-item label="结束时间" prop="stopDate">
            <!-- <el-input v-model="tempData.stopDate" /> -->
            <el-date-picker
              class="select-input"
              v-model="tempData.stopDate"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 职务\工作内容 -->
      <el-row class="in-row">
        <el-col :span="10" class="in-row-left">
          <el-form-item label="职务" prop="duties">
            <el-select
              :value-key="'1'"
              class="select-input"
              @change="changeDuties"
              @visible-change="clickDuties"
              :value="tempData.duties"
              placeholder="请选择"
            >
              <el-option
                v-for="(item, index) in this.dutiesList"
                :key="index"
                :label="item.text"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10" class="in-row-left">
          <el-form-item label="工作内容" prop="jobContent">
            <el-input v-model="tempData.jobContent" />
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 毕业学校、学历 -->
      <el-row class="in-row">
        <el-col :span="10" class="in-row-left">
          <el-form-item label="毕业学校" prop="school">
            <el-select
              :value-key="'1'"
              class="select-input"
              @change="changeSchool"
              :value="tempData.school"
              placeholder="请选择"
            >
              <el-option
                v-for="(item, index) in options"
                :key="index"
                :label="item.text"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10" class="in-row-left">
          <el-form-item label="学历" prop="education">
            <el-select
              :value-key="'1'"
              class="select-input"
              @change="changeEducation"
              @visible-change="clickEducation"
              :value="tempData.education"
              placeholder="请选择"
            >
              <el-option
                v-for="(item, index) in educationList"
                :key="index"
                :label="item.text"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 专业、最高学位 -->
      <el-row class="in-row">
        <el-col :span="10" class="in-row-left">
          <el-form-item label="专业" prop="major">
            <el-select
              :value-key="'1'"
              class="select-input"
              @change="changeMajor"
              @visible-change="clickMajor"
              :value="tempData.major"
              placeholder="请选择"
            >
              <el-option
                v-for="(item, index) in majorList"
                :key="index"
                :label="item.text"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10" class="in-row-left">
          <el-form-item label="最高学位" prop="degree">
            <el-select
              :value-key="'1'"
              class="select-input"
              @change="changeDegree"
              @visible-change="clickDegree"
              :value="tempData.degree"
              placeholder="请选择"
            >
              <el-option
                v-for="(item, index) in degreeList"
                :key="index"
                :label="item.text"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 选项 -->
      <el-row class="in-row-one">
        <el-col :span="12" class="in-row-left">
          <el-form-item label="选项 " prop="enabled" style="marginleft: 20px">
            <el-checkbox :checked="tempData.enabled">首页图片</el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 备注 -->
      <el-row class="in-row">
        <el-col :span="10" class="in-row-left">
          <el-form-item label="备注 " prop="remark">
            <el-input
              :autosize="{ minRows: 4, maxRows: 4 }"
              type="textarea"
              placeholder="请输入内容"
              v-model="tempData.remark"
              maxlength="30"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" class="in-row-left"></el-col>
      </el-row>
      <!-- button -->
      <el-row class="btn-box">
        <el-button @click="handleCancelDialog">{{ "取消" }}</el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? createData() : updateData()"
          >{{ "确认" }}</el-button
        >
      </el-row>
    </el-form>
  </el-row>
</template>

<script>
import { serachDic } from "@/api/myApi/searchDic";
export default {
  props: {
    dialogStatus: {
      type: String,
      default: "create",
      required: true,
    },
    temp: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  components: {},
  data() {
    //这里存放数据
    return {
      tempData: {
        resumeType: "", //简历类型
        mechanism: "", //单位
        startDate: "", //开始时间
        stopDate: "", //结束时间
        duties: "", //职务
        jobContent: "", //工作内容
        school: "", //毕业学校
        education: "", //学历
        major: "", //专业
        degree: "", //最高学历
        enabled: true,
      },
      options: [
        { text: "标题1", code: "1" },
        { text: "标题2", code: "2" },
        { text: "标题3", code: "3" },
        { text: "标题4", code: "4" },
      ],
      resumeList: [], //简历类型下拉框数组
      dutiesList: [], //职务下拉框数组
      educationList: [], //学历下拉框数组
      majorList: [], //专业下拉框数组
      degreeList: [], //最高学位下拉数组
      rules: {
        startDate: [{ required: true, message: "请选择开始时间", trigger: "blur" }],
        stopDate: [{ required: true, message: "请选择结束时间", trigger: "blur" }],
      },
    };
  },
  methods: {
    // 点击了弹框的取消按钮
    handleCancelDialog() {
      this.$emit("handleCancelDialog");
    },
    // 点击了弹框按钮的确认按钮
    createData() {
      //这里设置参数
      console.log("新增打印", this.tempData);
      this.$refs.dataFormEdit.validate((valid) => {
        if (valid) {
          this.$emit("createData", this.tempData);
        }
      });
    },
    //点击弹框按钮确认按钮
    updateData() {
      //这里设置参数
      console.log("编辑打印", this.tempData);
      this.$refs.dataFormEdit.validate((valid) => {
        if (valid) {
          this.$emit("updateData", this.tempData);
        }
      });
    },
    // setQuery(queryList) {
    //   queryList.forEach((item) => {
    //     this.tempData["text"];
    //   });
    // },
    async serachFromDic(code) {
      if (!code) {
        return;
      }
      try {
        const res = await serachDic({
          dictionary: { code, companyCode: "999" },
          terminal: {
            code: "01",
            Text: "浏览器",
            modelCode: "modelCode002",
            model: "简历管理",
          },
        });
        if (res.code == 200) {
          return res.data;
        }
      } catch (error) {
        console.log("字典查询错误", error);
      }
    },
    //选择简历
    changeResume(e) {
      this.tempData.resumeType = e.text;
      this.tempData.resumeTypeCode = e.code;
    },
    //请求简历类型
    async clickResume(e) {
      if (e && this.resumeList.length) {
        return;
      }
      if (e) {
        try {
          this.resumeList = await this.serachFromDic("Resume");
        } catch (error) {}
      }
    },
    //选择学校
    changeSchool(e) {
      this.tempData.school = e.text;
      this.tempData.schoolCode = e.code;
    },
    //选择学位
    changeDegree(e) {
      this.tempData.degree = e.text;
      this.tempData.degreeCode = e.code;
    },
    //请求学位
    async clickDegree(e) {
      if (e && this.degreeList.length) {
        return;
      }
      if (e) {
        try {
          this.degreeList = await this.serachFromDic("Degree");
        } catch (error) {}
      }
    },
    //选择专业
    changeMajor(e) {
      this.tempData.major = e.text;
      this.tempData.majorCode = e.code;
    },
    //请求专业
    async clickMajor(e) {
      //没数据写个假的
      this.majorList = [
        { text: "专业1", code: "1" },
        { text: "专业2", code: "2" },
        { text: "专业3", code: "3" },
        { text: "专业4", code: "4" },
      ];
      return;
      if (e && this.majorList.length) {
        return;
      }
      if (e) {
        try {
          this.majorList = await this.serachFromDic("Major");
        } catch (error) {}
      }
    },
    //选择学历
    changeEducation(e) {
      this.tempData.education = e.text.substring(0, 2);
      this.tempData.educationCode = e.code.replace(/^(0)/, "");
    },
    //请求学历
    async clickEducation(e) {
      if (e && this.educationList.length) {
        return;
      }
      if (e) {
        try {
          this.educationList = await this.serachFromDic("Education");
        } catch (error) {}
      }
    },
    //选择职务
    changeDuties(e) {
      this.tempData.duties = e.text;
      this.tempData.dutiesCode = e.code;
    },
    //请求职务信息
    async clickDuties(e) {
      if (e && this.dutiesList.length) {
        return;
      }
      if (e) {
        try {
          this.dutiesList = await this.serachFromDic("Duties");
        } catch (error) {}
      }
    },
  },
  async created() {
    this.tempData = {
      ...this.tempData,
      ...this.temp,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.dataFormEdit.clearValidate();
    });
  },
  destroyed() {
    console.log("弹框组件卸载了");
  },
};
</script>
<style lang="scss" scoped>
.btn-box {
  margin: 0 auto;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.form-box {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 25px;
}

.tabs-box {
  height: 300px;
  margin-bottom: 40px;
}

.select-input {
  width: 267px !important;
}
.in-row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.in-row-one {
  justify-self: start;
  margin-left: 80px;
}
.in-row-left {
  margin-left: -45px;
}
</style>
