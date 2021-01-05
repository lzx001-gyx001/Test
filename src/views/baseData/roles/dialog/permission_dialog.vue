<template>
 
</template>

<script>
import { fetchList } from "@/api/myApi/systemModule";
export default {
  props :{
    dialogOb:{
      type:Object,
      default:{},
      required:true
    }
  },
  data() {
    return {
      treeList: [], //树的 数组
    };
  },
  async created() {
    console.log("created",this.dialogOb);
    //第一次拿到roleId，发送数据，第2次roleId改变该生命周期函数不会运行
  },
  destroyed() {
    console.log("权限组件卸载了");
  },
  methods: {},
  beforeUpdate(){
    console.log("befordUpdate",this.dialogOb)
  },
  // watch: {
  //   dialogOb: {
  //     handler(newV) {
  //       console.log("watch", newV);
  //       //当第2次改变roleId的值的时候,
  //     },
  //     deep:true
  //   },
  // },
};
</script>

<style lang="scss" scoped>
.permission-box {
  display: flex;
  flex-direction: row;
  width: 100%;
}
</style>>

