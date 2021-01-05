<template>
  <el-container>
    <!-- 左侧tree组件-->
    <el-col :span="6" style="marginRight:0;minWidth:120px;">
      <el-card style="padding:0" class="left-box">
        <div class="bg-purple-dark">导航目录</div>
        <el-tree
          @node-click="setTreeId('systemTree')"
          ref="systemTree"
          :data="treeList"
          default-expand-all
          v-loading="listLoading"
        />
      </el-card>
    </el-col>
    <!-- 右侧表格区域 -->
    <el-col class="right-box">
      <!-- 按钮区域 -->
      <el-row>
        <el-button icon="el-icon-edit" @click="refrensh">{{'刷新'}}</el-button>
        <el-button icon="el-icon-circle-plus-outline" @click="handleCreate">{{ '新增' }}</el-button>
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
          style="width: 100%;"
        >
          <!-- 序号 -->
          <el-table-column :label="$t('table.id')" prop="id" align="center" width="80" fixed>
            <template slot-scope="{row}">
              <span>{{ row.id }}</span>
            </template>
          </el-table-column>

          <!--编码 -->
          <el-table-column label="编码" prop="name" min-width="150px" align="center">
            <template slot-scope="{row}">
              <span class="link-type" @click="handleUpdate(row)">{{ row.code }}</span>
            </template>
          </el-table-column>
          <!--名称 -->
          <el-table-column label="名称" prop="value" width="110px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>
          <!--分类-->
          <el-table-column label="分类" prop="isWork" width="80px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.class }}</span>
            </template>
          </el-table-column>
          <!--访问地址 -->
          <el-table-column label="访问地址" prop="cuser" align="center" width="95">
            <template slot-scope="{row}">
              <span>{{row.url}}</span>
            </template>
          </el-table-column>
          <!-- 目标 -->
          <el-table-column label="目标" width="150px" align="center">
            <template slot-scope="{row}">
              <span>{{ row.target}}</span>
            </template>
          </el-table-column>
          <!-- 层次 -->
          <el-table-column label="层次" prop="utime" class-name="status-col" width="100">
            <template slot-scope="{row}">
              <span>{{row.zIndex}}</span>
            </template>
          </el-table-column>
          <!-- 选项 -->
          <el-table-column label="有效" prop="utime" width="150px" align="center">
            <template slot-scope="{row}">
              <el-checkbox>{{row.title}}</el-checkbox>
            </template>
          </el-table-column>
          <!-- 说明 -->
          <el-table-column label="说明" prop="utime" width="150px" align="center">
            <template slot-scope="{row}">
              <span>{{row.tips}}</span>
            </template>
          </el-table-column>
          <!-- 操作 -->
          <el-table-column
            :label="$t('table.actions')"
            align="center"
            width="230"
            class-name="small-padding fixed-width"
            fixed="right"
          >
            <template slot-scope="{row,$index}">
              <!-- 编辑按钮 -->
              <el-button
                ref="dataForm"
                type="primary"
                size="mini"
                @click="handleUpdate(row)"
              >{{ $t('table.edit') }}</el-button>

              <!-- 删除按钮 -->
              <el-button
                v-if="row.status!='deleted'"
                size="mini"
                type="danger"
                @click="handleDelete(row,$index)"
              >{{ '删除'}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <!-- 分页组件 -->
      <pagination
        v-show="total>10"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getTableListByPage"
      />
    </el-col>

    <!-- 编辑，新增按钮的弹出框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="700px">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        class="dialog-form-box"
        label-position="right"
        label-width="80px"
        style="width:600px;margin:0 auto"
      >
        <!-- *模块编码/*模块名称 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="模块编码" prop="title">
              <el-input v-model="temp.name" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="模块名称" prop="order">
              <el-input v-model="temp.name" />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 上级模块/模块分类 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="上级模块" prop="type">
              <!-- 新增弹出框下的tree -->
              <el-dropdown trigger="click">
                <el-button class="class-btn">
                  {{temp.name?temp.name:"请选择"}}
                  <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
                </el-button>
                <el-dropdown-menu slot="dropdown" class="class-dropdown-menu">
                  <el-dropdown-item>
                    <!-- addTree里面渲染的是对应table表的数据 -->
                    <el-tree
                      @node-click="setTreeId('addTree')"
                      ref="addTree"
                      :data="treeList"
                      default-expand-all
                    />
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="模块分类" prop="timestamp">
              <el-dropdown trigger="click">
                <el-button class="class-btn in-row">
                  <span>{{dropListModule[0].name}}</span>
                  <span class="el-icon-arrow-down el-icon--right"></span>
                </el-button>
                <el-dropdown-menu slot="dropdown" class="class-dropdown-menu">
                  <el-dropdown-item v-for="item in dropListModule" :key="item.id">{{item.name}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- Icon图标/链接目标 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="Icon图标" prop="title">
              <el-input v-model="temp.name" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="链接目标" prop="order">
              <el-input v-model="temp.name" />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- *级别层次/显示顺序 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="级别层次" prop="id">
              <el-input v-model="temp.name" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="显示顺序" prop="title">
              <el-input v-model="temp.name" />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 选项 -->
        <el-row>
          <el-form-item label="选项" prop="id">
            <el-checkbox-group v-model="temp.checkList">
              <el-checkbox 
              :label="item" 
              v-for="(item,index) in 
              temp.checkList" 
              :key="index"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-row>
        <!-- 访问地址 -->
        <el-row>
          <el-form-item label="访问地址" prop="id">
            <el-input v-model="temp.name" />
          </el-form-item>
        </el-row>
        <!-- 说明 -->
        <el-row>
          <el-form-item label="说明" prop="title">
            <el-input v-model="temp.remark" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" />
          </el-form-item>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button
          type="primary"
          @click="dialogStatus==='create'?createData():updateData()"
        >{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination
export default {
  components: {
    Pagination
  },
  data() {
    return {
      total: 0, //返回的总数，小于10不显示分页组件
      tableList: [], //右侧表格渲染的数组 tableList
      treeList: [], //所有tree的数组
      tableId: 0, //根据该值去获取对应的tableList
      listLoading: false, //是否正在加载
      dialogStatus: "", //弹出框的状态 create是创建 update是编辑
      dialogFormVisible: false, //是否显示弹出框
      listQuery: {
        //请求数据需要的参数
        page: 1,
        limit: 20
      },
      temp: {},//新增，编辑时候的默认值。
      rules: {
        //表单验证
        title: [{ required: true, message: "名称必须填写", trigger: "blur" }]
      },
      textMap: {
        //弹出框的标题
        update: "编辑",
        create: "添加"
      },
      //模拟数据
      dropListModule: [
        //编辑弹出框中的模块分类
        {
          id: 1,
          name: "黄金糕"
        },
        {
          id: 2,
          name: "狮子头"
        },
        {
          id: 3,
          name: "双皮奶"
        }
      ],
      dropListTarget: [
        //编辑弹出框中链接目标
        {
          id: 1,
          name: "iframe"
        },
        {
          id: 2,
          name: "click"
        }
      ]
    };
  },
  methods: {
    //点击获取当前节点树的id
    setTreeId(treeName) {
      if (treeName == "systemTree") {
        //外边的tree会根据tableId获取数据
        this.tableId = this.$refs.systemTree.currentNode.node.data.id;
        //AJAX 发送请求获取table数据
      } else if (treeName == "addTree") {
        //点击addTree，不会获取数据
        this.tableId = this.$refs.addTree.currentNode.node.data.id;
        this.temp.name = this.$refs.addTree.currentNode.node.data.label;
      }
    },
    //获取tree数据
    getTreeList() {
      this.listLoading = true;
      //调接口 模块菜单：base/module/find
      let treeList = [
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
      this.treeList = treeList;
      setTimeout(() => {
        this.listLoading = false;
      }, 500);
    },
    //根据tableId获取数据
    getTableList(tableId) {
      this.listLoading = true;
      //根据tableId获取对应的数据，赋值给list
      let id = 0; //默认id，根据该id获取默认数据
      if (!tableId) {
        //没有tableId,页面刚加载时候，默认显示的数据，ajax。。。
        console.log("getTableList调用：没有tableId", id);
        this.listLoading = false;
      } else {
        //有tablieId,点击了tree以后，获取对应的数据，ajax。。。
        id = tableId;
        console.log("getTableList调用有tableId", id);
        this.listLoading = false;
      }
      //模拟一条假数据
      this.tableList = [
        {
          id: 1,
          code: "10.07.01",
          name: "免责声明",
          class: "页面",
          url: "/xxxxx/xxxx/xx",
          target: "iframe",
          zIndex: 2,
          checkList: ["访问权限", "数据范围", "动态试图", "动态表单", "有效"],
          tips: ""
        }
      ];
    },
    //点击分页组件获取数据
    getTableListByPage(val) {
      if (val) {
        this.listQuery.page = val.page;
        this.listQuery.limit = val.limit;
        console.log(this.listQuery, val);
      }
    },
    //点击刷新按钮
    refrensh() {
      this.getTableList(); //重新刷新页面
      this.getTreeList(); //获取tree的数据
    },
    //点击新增按钮
    //重置Temp对象（即表格单行数据）
    resetTemp() {
      //1.可以获取tableList中的一个数据然后合并
      //2.直接写死在这里
      this.temp = {
        //添加按钮默认表单内容
        module_id: undefined,//id
        module_code: "",//编码
        full_name: "",//名称
        category: "目录",//分类
        category_code:"",//分类编码--只有0（目录）和1（页面）
        page_location: "/xxxxx/xxxx/xx",//访问地址
        target: "iframe",//目标
        level: 2,//层级
        // checkList: ["访问权限", "数据范围", "动态试图", "动态表单", "有效"],//有效
        enabled:true,
        remark: ""//说明
      };
    },
    //点击新增按钮
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    //点击新增按钮的确认按钮
    createData() {
      this.dialogFormVisible = true;
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024; // mock a id
          this.temp.name = "vue-element-admin";
          //这里新增数据
          //  await createDictionary(this.temp);
          //   this.dialogFormVisible = false;
          //     this.$notify({
          //       title: "成功",
          //       message: "创建成功",
          //       type: "success",
          //       duration: 2000
          //     });
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp);
            this.dialogFormVisible = false;
            this.$notify({
              title: "成功",
              message: "创建成功",
              type: "success",
              duration: 2000
            });
          });
          //新增完数据，重新获取数据
          //AJAX()
        }
      });
    },
    //点击编辑按钮
    handleUpdate(row) {
      this.temp = Object.assign({}, row); //合并对象
      console.log(this.temp);
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    //点击编辑按钮的确认按钮
     updateData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
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
            const index = this.list.findIndex(v => v.id === this.temp.id);
            this.list.splice(index, 1, this.temp);
            //修改完数据，再获重新获取数据
            //AJAX()
            this.dialogFormVisible = false;
            this.$notify({
              title: "成功",
              message: "更新成功",
              type: "success",
              duration: 2000
            });
          });
        }
      });
    },
    //点击删除按钮
    handleDelete(row, index) {
      //删除完数据再重新获取数据。
      //AJAX()
      //这里删除数据
      //  await deleteDictionary(row.id)
      //   this.$notify({
      //     title: "成功",
      //     message: "删除成功",
      //     type: "success",
      //     duration: 2000
      //   });
      //   this.getList()

      this.list.splice(index, 1);
    }
  },
  created() {
    //获取treeList
    this.getTreeList();
  }
};
</script>

<style scoped>
.el-row{
  margin: 10px auto;
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
  height: calc(100vh - 90px);
}
.right-box {
  min-width: 500px;
  height: calc(100vh - 100px);
}
</style>

