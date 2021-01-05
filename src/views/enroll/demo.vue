<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.title"
        :placeholder="$t('table.fullname')"
        style="width: 200px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >{{ $t("table.search") }}</el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >{{ $t("table.add") }}</el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-edit"
        @click="handleDelete(row,$index)"
      >{{ $t("table.delete") }}</el-button>
    </div>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
      @sort-change="sortChange"
    >
      <!-- 表单序列  -->
      <el-table-column
        :label="$t('table.id')"
        prop="id"
        sortable="custom"
        align="center"
        width="80"
        :class-name="getSortClass('id')"
      >
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <!-- 用户姓名 -->
      <el-table-column :label="$t('table.fullname')" min-width="150px">
        <template slot-scope="{row}">
          <span class="link-type" @click="handleUpdate(row)">{{ row.model.fullname }}</span>
          <!-- 请求完数据后把{{ row.title }}里面的title换成userName就OK了 -->
          <!-- <el-tag>{{ row.type | typeFilter }}</el-tag> -->
        </template>
      </el-table-column>
      <!-- 报名类型 -->
      <el-table-column :label="$t('table.enrolltype')" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.model.enrolltype }}</span>
        </template>
      </el-table-column>
      <!-- 作品类型 -->
      <el-table-column :label="$t('table.opustype')" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.model.opustype }}</span>
        </template>
      </el-table-column>
      <!-- 报名费用 -->
      <el-table-column :label="$t('table.servecost')" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.model.servecost }}</span>
        </template>
      </el-table-column>
      <!-- 有效 -->
      <el-table-column :label="$t('table.valid')" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.model.commonuse }}</span>
        </template>
      </el-table-column>
      <!-- 推荐 -->
      <el-table-column :label="$t('table.recommendation')" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.model.price }}</span>
        </template>
      </el-table-column>
      <!-- 免费 -->
      <el-table-column :label="$t('table.charge')" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.model.charge }}</span>
        </template>
      </el-table-column>
      <!-- 创建时间 -->
      <el-table-column :label="$t('table.createdate')" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.model.createdate | parseTime("{y}-{m}-{d} {h}:{i}") }}</span>
        </template>
      </el-table-column>
      <!-- 创建用户 -->
      <el-table-column :label="$t('table.createusername')" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.model.createusername }}</span>
        </template>
      </el-table-column>
      <!-- 修改时间 -->
      <el-table-column :label="$t('table.modifydate')" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.model.modifydate | parseTime("{y}-{m}-{d} {h}:{i}") }}</span>
        </template>
      </el-table-column>
      <!-- 修改用户 -->
      <el-table-column :label="$t('table.modifyusername')" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.model.modifyusername }}</span>
        </template>
      </el-table-column>
      <!-- 状态 -->
      <el-table-column :label="$t('table.status')" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-tag :type="row.status | statusFilter">{{ row.model.sfaudit }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.actions')"
        align="center"
        width="230"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">{{ $t("table.edit") }}</el-button>
          <el-button
            v-if="row.status!='待审'"
            size="mini"
            type="success"
            @click="handleModifyStatus(row,'审核通过')"
          >{{ $t("table.publish") }}</el-button>
          <el-button
            v-if="row.status!='审核通过'"
            size="mini"
            @click="handleModifyStatus(row,'审核未通过')"
          >{{ $t("table.draft") }}</el-button>
          <el-button
            v-if="row.status!='deleted'"
            size="mini"
            type="danger"
            @click="handleDelete(row,$index)"
          >{{ $t("table.delete") }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
    <!-- 弹出框  -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px margin-left:50px"
      >
        <!-- 添加用户姓名 -->
        <el-form-item :label="$t('table.fullname')" prop="userName">
          <el-input v-model="temp.fullname" />
        </el-form-item>
        <!-- 报名类型 -->
        <el-form-item :label="$t('table.enrolltype')">
          <el-select v-model="temp.enrolltype" class="filter-item" placeholder="Please select">
            <el-option
              v-for="item in enrollTypeOptions"
              :key="item"
              :label="item.display_name"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <!-- 作品类型 -->
        <el-form-item :label="$t('table.opustype')">
          <el-select v-model="temp.opustype" class="filter-item" placeholder="Please select">
            <el-option
              v-for="item in papersTypeOptions"
              :key="item"
              :label="item.display_name"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <!-- 报名费用 -->
        <el-form-item :label="$t('table.servecost')" prop="enrollCost">
          <el-input v-model="temp.servecost" />
        </el-form-item>
        <!-- time -->
        <!-- <el-form-item :label="$t("table.createdate")" prop="timestamp">
          <el-date-picker v-model="temp.createdate" type="datetime" placeholder="Please pick a date" />
        </el-form-item>-->
        <!-- 状态 -->
        <el-form-item :label="$t('table.status')">
          <el-select v-model="temp.sfaudit" class="filter-item" placeholder="Please select">
            <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button
          type="primary"
          @click="dialogStatus==='create'?createData():updateData()"
        >{{ $t("table.confirm") }}</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">{{ $t("table.confirm") }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchList, createArticle, fetchPv, updateArticle } from '@/api/demo'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      postData: {
        enrollid: '0bf13bb8-777e-43af-8ef6-2c0ce9e35744',
        deletemark: '0'
      },
      listQuery: {
        page: 1,
        limit: 3,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      sortOptions: [
        { label: 'ID Ascending', key: '+id' },
        { label: 'ID Descending', key: '-id' }
      ],
      // statusOptions: ["published", "draft", "deleted"],
      statusOptions: ['待审', '审核通过'],
      //  报名类型
      enrollTypeOptions: ['商品演出招商', '晚会招商', '广告招商', '设备租赁'],
      //  作品类型
      papersTypeOptions: ['歌曲', '乐谱', '歌词'],
      showReviewer: false,
      // temp: {
      //   fullname: '',
      //   // 报名类型
      //   enrolltype: '',
      //   // 作品类型
      //   opustype: '',
      //   // 报名费用
      //   servecost: ''
      //   // 创建时间
      //   // createdate: ""
      // },

      temp: {
        model: {
          fullname: '作品111111',
          enrolltype: '作品11111',
          membercontent: '11'
        },
        detail: [
          { opustype: '作品111', opuscontent: '作品1111' },
          { opustype: '作品2222', opuscontent: '作品2222' }
        ]
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      dialogPvVisible: false,
      pvData: [],
      // 表单验证规则对象
      rules: {
        // 验证用户名
        fullname: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        // 报名类型
        enrolltype: [
          { required: true, message: '请选择报名类型', trigger: 'change' }
        ],
        // 作品类型
        opustype: [
          { required: true, message: '请选择作品类型', trigger: 'change' }
        ],
        type: [
          { required: true, message: 'type is required', trigger: 'change' }
        ],
        timestamp: [
          {
            type: 'date',
            required: true,
            message: 'timestamp is required',
            trigger: 'change'
          }
        ],
        title: [
          { required: true, message: 'title is required', trigger: 'blur' }
        ]
      },
      downloadLoading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList({}).then(response => {
        console.log('请求的数据', response)
        this.list = response.data
        console.log(this.list)
        // this.total = response.data.total
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      // this.temp = {
      //   status: '审核通过',
      //   // type: '',
      //   // 添加用户名
      //   fullname: '',
      //   //  报名类型
      //   enrolltype: '',
      //   // 作品类型
      //   opustype: '',
      //   // 报名费用
      //   servecost: ''
      // }
      this.temp = {
        model: {
          fullname: '作品111111',
          enrolltype: '作品11111',
          membercontent: '11'
        },
        detail: [
          { opustype: '作品111', opuscontent: '作品1111' },
          { opustype: '作品2222', opuscontent: '作品2222' }
        ]
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          console.log('00000000000000000000000000000000000')
          console.log(this.temp)
          this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
          // this.temp.author = 'vue-element-admin'
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    //  跟新数据
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateArticle(tempData).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row, index) {
      this.$notify({
        title: '成功',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      this.list.splice(index, 1)
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        console.log('handleEetchPv:', response)
        this.pvData = response.data.pvData
        console.log(this.pvData)
        this.dialogPvVisible = true
      })
    },
    formatJson(filterVal) {
      return this.list.map(v =>
        filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        })
      )
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>
