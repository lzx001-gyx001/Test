<!--load 弹框组件  -->
<template>
  <el-row v-if="dicList" class="load-box">
    <el-row class="w" style="marginBottom:50px">
      <el-select
        v-model="chooseDicId"
        clearable
        placeholder="请选择"
        
      >
        <el-option
          v-for="item in dicList"
          :key="item.sortCode"
          :label="item.fullName"
          :value="item.dataDictionaryId"
          clear
        >
        </el-option>
      </el-select>
    </el-row>

    <!-- 按钮 -->
    <el-row class="w">
      <el-button @click="handleCancle"> 取消 </el-button>
      <el-button
        type="primary"
        @click="handleConfirm">确认</el-button>
    </el-row>
  </el-row>
</template>

<script>
export default {
  components: {},
  props: {
    dicList: {
      type: Array,
      default: [],
      required: true,
    },
  },
  data() {
    //这里存放数据
    return {
      chooseDicId: "", //选择的字典的id
    };
  },
  methods: {
    //切换选项时触发
    // @change="handleChangeDicId"
    // handleChangeDicId() {
    //   console.log(this.chooseDicId);
    // },
    //点击load弹框的取消按钮
    handleCancle(){
        console.log("点击了取消")
        this.$emit("cancelLoad")
        this.chooseDicId="";
    },
    //点击load弹框的确认按钮
    handleConfirm(){
        if(!this.chooseDicId){
            this.$message("请选择要引入的字典","提示")
            return ;
        }
        console.log("点击了确认")
        this.$emit("confirmLoad",this.chooseDicId)//把选好的字典的id传出去
        this.chooseDicId="";
    }
  },
  created() {
    console.log("**** 下载--弹窗组件被加载了");
  },
  mounted() {},
  destroyed() {
    console.log("**** 下载 -- 弹窗组件被卸载了");
  },
};
</script>
<style lang='scss' scoped>
.load-box {
  height: 120px;

  .w {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
  }
}
</style>