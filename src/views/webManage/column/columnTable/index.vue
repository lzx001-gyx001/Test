<!--栏目右侧表格  -->
<template>
  <el-table
    ref="dataFormEdit"
    :key="0"
    border
    fit
    v-loading="listLoading"
    :data="tableList"
    highlight-current-row
    style="width: 100%"
  >
    <!-- 表中表 -->
    <!-- <el-table-column type="expand">
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
          <el-table-column :label="$t('table.id')" prop="" align="center" width="48px"> 
          </el-table-column>
   
          <el-table-column :label="$t('table.id')" prop="" align="center" width="50px">
            <template slot-scope="{}">
              <span>{{}}</span>
            </template>
          </el-table-column>
  
          <el-table-column
            label="栏目编码"
            prop="menuCode"
            align="center"
            width="120px"
            sortable
          >
            <template slot-scope="{ row }">
              <span>{{ row.menuCode }}</span>
            </template>
          </el-table-column>
     
          <el-table-column label="栏目名称" width="80px" prop="menuName" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.menuName }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="栏目名称蒙语"
            width="120px"
            prop="menuNameMgl"
            align="center"
          >
            <template slot-scope="{ row }">
              <span>{{ row.menuNameMgl }}</span>
            </template>
          </el-table-column>
     
          <el-table-column label="链接地址" prop="url" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.url }}</span>
            </template>
          </el-table-column>
 
          <el-table-column label="目录类型" prop="menuType" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.menuType }}</span>
            </template>
          </el-table-column>

          <el-table-column label="备注" prop="remark" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.remark }}</span>
            </template>
          </el-table-column>
      
          <el-table-column label="默认行数" prop="rowsCount" align="center">
            <template slot-scope="{ row }">
              <span>{{ row.rowsCount }}</span>
            </template>
          </el-table-column>
       
          <el-table-column
            :label="$t('table.actions')"
            align="center"
            width="230px"
            class-name="small-padding fixed-width"
          >
            <template slot-scope="{ row }">

              <el-button
                ref="dataFormEdit"
                type="primary"
                size="mini"
                @click="handleUpdate(row)"
                >{{ $t("table.edit") }}</el-button
              >

         
              <el-button size="mini" type="danger" @click="handleDelete(row)">{{
                "删除"
              }}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-table-column> -->
    <!-- 序号 -->
    <el-table-column
      :label="$t('table.id')"
      type="index"
      :index="indexMethod"
      align="center"
      width="50px"
    >
    </el-table-column>
    <!-- 栏目编码(带排序) -->
    <el-table-column
      label="栏目编码"
      prop="menuCode"
      align="center"
      width="120px"
      sortable
    >
      <template slot-scope="{ row }">
        <span>{{ row.menuCode }}</span>
      </template>
    </el-table-column>
    <!-- 栏目名称 -->
    <el-table-column label="栏目名称" width="80px" prop="menuName" align="center">
      <template slot-scope="{ row }">
        <span>{{ row.menuName }}</span>
      </template>
    </el-table-column>
    <!-- 栏目名称蒙语 -->
    <el-table-column
      class="m-family"
      label="栏目名称蒙语"
      width="120px"
      prop="menuNameMgl"
      align="center"
    >
      <template slot-scope="{ row }">
        <span class="m-text">{{ row.menuNameMgl }}</span>
      </template>
    </el-table-column>
    <!-- 是否导航 -->
    <!-- <el-table-column label="是否导航" prop="" align="center">
      <template slot-scope="{ row }">
        <el-checkbox :checked="row.enabled == '1' ? true : false"></el-checkbox>
      </template>
    </el-table-column> -->
    <!-- 是否专题 -->
    <!-- <el-table-column label="是否专题" prop="" align="center">
      <template slot-scope="{ row }">
        <el-checkbox :checked="row.enabled == '1' ? true : false"></el-checkbox>
      </template>
    </el-table-column> -->
    <!-- 是否启用 -->
    <!-- <el-table-column label="是否启用" prop="" align="center">
      <template slot-scope="{ row }">
        <el-checkbox :checked="row.enabled == '1' ? true : false"></el-checkbox>
      </template>
    </el-table-column> -->
    <!-- 链接地址 -->
    <el-table-column label="链接地址" prop="url" align="center">
      <template slot-scope="{ row }">
        <span>{{ row.url }}</span>
      </template>
    </el-table-column>
    <!-- 内容页 -->
    <!-- <el-table-column label="内容页" prop="" align="center">
      <template slot-scope="{}">
        <span>{{ "xxx" }}</span>
      </template>
    </el-table-column> -->
    <!-- 打开方式 -->
    <!-- <el-table-column label="打开方式" prop="" align="center">
      <template slot-scope="{}">
        <span>{{ "xxx" }}</span>
      </template>
    </el-table-column> -->
    <!-- 导航类型 -->
    <el-table-column label="目录类型" prop="menuType" align="center">
      <template slot-scope="{ row }">
        <span>{{ row.menuType }}</span>
      </template>
    </el-table-column>
    <!-- 备注 -->
    <el-table-column label="备注" prop="remark" align="center">
      <template slot-scope="{ row }">
        <span>{{ row.remark }}</span>
      </template>
    </el-table-column>
    <!--有效  -->
    <!-- <el-table-column label="有效" prop="" align="center">
      <template slot-scope="{ row }">
        <el-checkbox :checked="row.enabled == '1' ? true : false"></el-checkbox>
      </template>
    </el-table-column> -->
    <!-- 默认行数 -->
    <el-table-column label="默认行数" prop="rowsCount" align="center">
      <template slot-scope="{ row }">
        <span>{{ row.rowsCount }}</span>
      </template>
    </el-table-column>
    <!-- 排序码 -->
    <!-- <el-table-column label="排序码" prop="sortCode" align="center">
      <template slot-scope="{ row }">
        <span>{{ row.sortCode }}</span>
      </template>
    </el-table-column> -->
    <!-- 操作 -->
    <el-table-column
      :label="$t('table.actions')"
      align="center"
      width="230px"
      class-name="small-padding fixed-width"
    >
      <template slot-scope="{ row }">
        <!-- 编辑按钮 -->
        <el-button
          ref="dataFormEdit"
          type="primary"
          size="mini"
          @click="handleUpdate(row)"
          >{{ $t("table.edit") }}</el-button
        >

        <!-- 删除按钮 -->
        <el-button size="mini" type="danger" @click="handleDelete(row)">{{
          "删除"
        }}</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  components: {},
  props: {
    listLoading: {
      type: Boolean,
      required: true,
      default: true,
    },
    tableList: {
      type: Array,
      required: true,
      default: [],
    },
  },
  computed: {},

  data() {
    //这里存放数据
    return {};
  },
  methods: {
    //点击编辑按钮
    handleUpdate(row) {
      this.$emit("handleUpdate", row);
    },
    //点击删除按钮
    handleDelete(row) {
      this.$emit("handleDelete", row);
    },
    indexMethod(index) {
      return +index + 1;
    },
  },
  created() {},
  updated() {
    // console.log("子组件打印:更新");
  },
  mounted() {},
  destroyed() {},
};
</script>
<style lang="scss" scoped></style>
