<template>
  <div>
    <el-container style="marginBottom:20px">
      <i class="el-icon-s-opportunity"></i>
      <span>温馨提示：选中复选框即可授予相应权限，取消选中则回收相应权限。</span>
    </el-container>

    <el-row>
      <el-col :span="12">
        <el-row style="marginBottom:10px">
          <span>归属部门</span>
        </el-row>
        <el-tree
          @node-click="setTreeId('systemTree')"
          ref="systemTree"
          :data="treeList"
          default-expand-all
          v-loading="listLoading"
        />
      </el-col>
      <el-col :span="12">
        <el-container>
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
          >全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="city in cities" :label="city" :key="city">
              <svg-icon icon-class='user'/>
              <span>{{city}}</span>
            </el-checkbox>
          </el-checkbox-group>
        </el-container>
      </el-col>
    </el-row>
    <!-- 底部确定、取消的按钮 -->
    <!-- <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button
          type="primary"
          @click="dialogStatus==='create'?createData():updateData()"
        >{{ $t('table.confirm') }}</el-button>
    </div>-->
  </div>
</template>

<script>
const cityOptions = ["上海", "北京", "广州", "深圳"];
export default {
  props: ["dialogOb"],
  data() {
    return {
      tableId: 0, //根据该id获取右边数据
      listLoading: false, //加载动画
      treeList: [], //左边tree的数据
      checkAll: false,
      checkedCities: ["上海", "北京"],
      cities: cityOptions,
      isIndeterminate: true
    };
  },
  methods: {
    //点击获取当前节点树的id
    setTreeId(treeName) {
      if (treeName == "systemTree") {
        //外边的tree会根据tableId获取数据
        this.tableId = this.$refs.systemTree.currentNode.node.data.id;
        //AJAX 发送请求获取table数据
        this.getTableList(this.tableId); //这里传入
      } else if (treeName == "addTree") {
        //点击addTree，不会获取数据
        this.tableId = this.$refs.addTree.currentNode.node.data.id;
        this.temp.name = this.$refs.addTree.currentNode.node.data.label;
      }
      //根据tableId,获取对应的数据，赋值给list
      console.log("setTreeId调用" + this.tableId);
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
      this.isIndeterminate =checkedCount > 0 && checkedCount < this.cities.length;
      console.log(this.checkedCities)
    }
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
                label: "子菜单1-1-1"
              },
              {
                id: 10,
                label: "子菜单1-1-2"
              }
            ]
          }
        ]
      },
      {
        id: 2,
        label: "子菜单2"
      }
    ];
  }
};
</script>

<style>
.title-tips {
  background-color: #fffdcd;
  height: 42px;
}
</style>