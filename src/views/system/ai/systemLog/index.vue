<!-- 系统日志 -->
<template>
  <el-container>
    <el-col :span="4">
      <el-card style="padding: 0" class="left-box">
        <el-tree
          @node-click="leftTreeOnClick"
          ref="leftTree"
          :data="treeList"
          class="filter-tree"
          default-expand-all
        />
      </el-card>
    </el-col>
    <el-col :span="17">
      <el-row>
        <el-button @click="handleRefresh">刷新</el-button>
        <el-button>清空数据</el-button>
      </el-row>
      <el-row>
        <LogTable :tableList="this.tableList" :listLoading="this.listLoading" />
      </el-row>
      <el-row>
        <!-- 分页组件 -->
        <pagination
          v-show="total > 4"
          :total="total"
          :page.sync="listQuery.page.pageNumber"
          :limit.sync="listQuery.page.pageSize"
          @pagination="getTableListByPage"
        />
      </el-row>
    </el-col>
  </el-container>
</template>

<script>
import LogTable from "./logTable/index";
import Pagination from "@/components/Pagination";
export default {
  components: {
    LogTable,
    Pagination
  },
  data() {
    //这里存放数据
    return {
      tableId: 0, //树的id
      treeList: [], //左边树的数据
      tableList: [], //右边表格的数据
      total: 0, //数据总数
      listLoading: true, //table正在加载
      listQuery: {
        //字典树的查询参数
        model: {
          // fullName: "系统",
          // deleteMark: "0",
        },
        page: {
          pageNumber: 1,
          pageSize: 3,
          sortName: "sort_code",
          sortOrder: "desc",
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
        // parent: [{ required: true, message: "上级必须填写", trigger: "blur" }],
      },
      temp: {
        dataDictionaryId: "", //上级的树的id
        parent: "", //上级,
        parentId: "", //上级的明细的id
        dataDictionaryDetailId: "", //自己的id，传了就是修改，不传就是新增
        fullName: "", //项目名称
        code: "", //项目值
        sortCode: "0", //显示顺序
        enabled: true, //分类选项
        remark: "", //说明
      },
    };
  },
  methods: {
    //点击左边的树
    leftTreeOnClick(data, node, self) {
      console.log("左边的树被点击了");
    },
    //获取tree数据
    getTreeList() {
      // this.listLoading = true;
      let treeList = []; //最后的树的数组
      //首先拿到tree的数据
      let treeArr = []; //过滤用的临时数组
      //调接口：字典管理：base/datadictionary/find 用listQuery， 参数
      // fetchList(this.listQuery).then((res) => {
      //   treeArr = res.data.rows;
      //   console.log("getTreeList打印", treeArr);
      //   // treeArr = treeArr.filter((item) => item.istree); //首先确定都是tree
      //   treeList = formatData(treeArr, "dataDictionaryId");
      //   this.data2 = treeList; // 然后赋值给 treeList
      //   this.listLoading = false; //关闭加载动画
      // });
      this.tableList = [
        {
          sortCode: "0000012",
          createDate: new Date("2020-11-24"),
          module: "系统模块",
          logType: "访问",
          ipAddressCode: "127.0.0.1",
          createUser: "admin",
          company: "内蒙古大学",
          status: "成功",
          object: this.createHash(5),
          remark: this.createHash(6),
        },
        {
          sortCode: "0000013",
          createDate: new Date("2020-11-25"),
          module: "单位模块",
          logType: "访问",
          ipAddressCode: "127.0.0.1",
          createUser: "admin",
          company: "内蒙古大学",
          status: "成功",
          object: this.createHash(5),
          remark: this.createHash(6),
        },
        {
          sortCode: "0000014",
          createDate: new Date("2020-11-26"),
          module: "管理模块",
          logType: "访问",
          ipAddressCode: "127.0.0.1",
          createUser: "admin",
          company: "内蒙古大学",
          status: "成功",
          object: this.createHash(5),
          remark: this.createHash(6),
        },
        {
          sortCode: "0000015",
          createDate: new Date("2020-11-27"),
          module: "日志模块",
          logType: "访问",
          ipAddressCode: "127.0.0.1",
          createUser: "admin",
          company: "内蒙古大学",
          status: "成功",
          object: this.createHash(5),
          remark: this.createHash(6),
        },
        {
          sortCode: "0000016",
          createDate: new Date("2020-11-28"),
          module: "登录模块",
          logType: "访问",
          ipAddressCode: "127.0.0.1",
          createUser: "admin",
          company: "内蒙古大学",
          status: "成功",
          object: this.createHash(5),
          remark: this.createHash(6),
        },
        {
          sortCode: "0000017",
          createDate: new Date("2020-11-29"),
          module: "字典模块",
          logType: "访问",
          ipAddressCode: "127.0.0.1",
          createUser: "admin",
          company: "内蒙古大学",
          status: "成功",
          object: this.createHash(5),
          remark: this.createHash(6),
        },
      ];
      this.total = this.tableList.length
      setTimeout(() => {
        this.listLoading = false;
      }, 500);
    },
    //获取table的数据
    getTableList() {
      this.listLoading = true;
      //这里请求数据。
      //AJAX(id)
      //调接口：字典管理明细：base/datadictionarydetail/find   用listDetail，参数
      this.listDetail.model.dataDictionaryId = this.tableId;
      // this.listDetail.model.parentId = this.tableId;
      console.log("getTableList打印参数：", this.listDetail);
      getDicDetail(this.listDetail)
        .then((res) => {
          this.listLoading = false;
          this.list = res.data.rows;
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
      this.listQuery.page.pageNumber = val.page;
      this.listQuery.page.pageSize = val.limit;
      //调接口：获取表格信息
      // this.getTableList();
    },
    //重置Temp对象（即表格单行数据）
    resetTemp() {
      this.temp = {
        dataDictionaryId: "", //数据字典的Id
        dataDictionaryDetailDetailId: "", //自身主键
        parentId: "", //明细的上级Id
        parent: this.temp.parent, //上级
        fullName: "", //项目名称
        code: "", //项目值
        sortCode: "0", //显示顺序
        enabled: true, //分类选项
        remark: "", //说明
      };
    },
    //点击刷新按钮
    handleRefresh() {
      this.listLoading = true;
      this.getTreeList();
      setTimeout(() => {
        this.listLoading = false;
      }, 500);
    },
    //hash
    createHash(hashLength) {
      // 默认长度 24
      return Array.from(Array(Number(hashLength) || 24), () =>
        Math.floor(Math.random() * 36).toString(36)
      ).join("");
    },
  },
  created() {
    this.getTreeList();
  },
  mounted() {},
  destroyed() {},
};
</script>
<style lang='scss' scoped>
.left-box {
  height: calc(100vh - 90px);
}
</style>