<template>
  <div class="dialog-box">
    <el-container
      style="marginbottom: 20px; borderbottom: 1px solid #777; height: 25px"
    >
      <i class="el-icon-s-opportunity"></i>
      <span
        >温馨提示：选中复选框即可授予相应权限，取消选中则回收相应权限。</span
      >
    </el-container>
  <!-- 左侧树结构 -->
    <el-row type="flex" class="flex-box">
      <el-col :span="6">
        <el-card class="tree-box">
          <div slot="header" class="clearfix row">
            <span>归属部门</span>
          </div>
          <el-tree
            @node-click="setTreeId"
            :data="treeList"
            default-expand-all
            v-loading="listLoading"
          />
        </el-card>
      </el-col>
      <!-- 右侧内容 -->
      <el-col :span="17" style="paddingtop: 10px">
        <el-card class="right-box">
          <div slot="header" class="clearfix row">
            <div>用户查询</div>
            <el-input style="width:180px;marginLeft:20px"></el-input>
          </div>
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
            >全选</el-checkbox
          >
          <el-container>
            <el-checkbox-group
            
              v-model="checkedCities"
              @change="handleCheckedCitiesChange"
            >
              <el-checkbox v-for="city in cities" :label="city" :key="city" border>
                <svg-icon icon-class="user" />
                <span>{{ city }}</span>
              </el-checkbox>
            </el-checkbox-group>
          </el-container>
        </el-card>
      </el-col>
    </el-row>
    <!-- 底部确定、取消的按钮 -->
    <div slot="footer" class="dialog-footer in-row">
      <el-button @click="handleCancel">{{ $t("table.cancel") }}</el-button>
      <el-button @click="handleConfirm" type="primary">{{
        $t("table.confirm")
      }}</el-button>
    </div>
  </div>
</template>

<script>
const cityOptions = ["上海", "北京", "广州", "深圳"];
export default {
  props: ["dialogOb"],
  data() {
    return {
      // curNode: {
      //   //当前选中的左边树的对象 信息：id，label，children等
      //   id: this.dialogOb.id,
      //   label: this.dialogOb.class,
      //   children: [],
      // },
      listLoading: false, //加载动画
      treeList: [], //左边tree的数据
      checkAll: false, //全选
      checkedCities: ["上海", "北京"], //选中的内容
      cities: cityOptions, //根据左侧树获取的对应的数组
      isIndeterminate: true,
    };
  },
  methods: {
    //点击,获取当前节点树的id，然后请求相应的数据
    setTreeId(data) {
      // console.log('dialogOb',this.dialogOb)
      // this.curNode.id = data.id || "";
      // this.curNode.label = data.label || "";
      // this.curNode.children = data.children || [];
    },
    //点击全选按钮
    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    //选择复选框
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.cities.length;
    },
    //点击取消
    handleCancel() {
      this.$emit("cancel");
    },
    //点击确定按钮
    handleConfirm() {
      console.log(this.checkedCities);
      // this.curNode.children = this.checkedCities;//给当前选中的节点的children赋值，然后传给父组件。
      // this.curNode.close = false;
      // this.$emit('confirm',this.curNode)
    },
  },
  created() { 
    this.treeList = [
      {
        id: 1,
        label: "子菜单1",
        children: [
          {
            id: 4,
            label: "子菜单1-1",
            children: [
              {
                id: 9,
                label: "子菜单1-1-1",
              },
              {
                id: 10,
                label: "子菜单1-1-2",
              },
            ],
          },
        ],
      },
      {
        id: 2,
        label: "子菜单2",
      },
    ];
  },
};
</script>

<style>
.title-tips {
  background-color: #fffdcd;
  height: 42px;
}
.flex-box {
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}
.dialog-box {
  height: 420px;
  /* margin-bottom: 20px; */
}
.tree-box {
  height: 340px;
}
.right-box {
  height: 340px;
}
.in-row {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.row{
  height: 15px;
   display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
</style>