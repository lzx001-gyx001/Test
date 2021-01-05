<template>
  <div class="app-container">
    <el-input
      v-model="input"
      style="margin:0 0 20px 20px; width:300px;"
      placeholder="请输入内容"
      clearable
    />
    <el-button style="margin:0 0 10px 10px;" type="success">成功按钮</el-button>
    <el-button type="primary" @click="handleAddRole">
      {{ $t('permission.addRole') }}
    </el-button>
    <el-card>
      <el-table
        v-loading="listLoading"
        :data="tableData"
        element-loading-text="Loading..."
        stripe
        style="width: 100%"
      >
        <el-table-column prop="Name" label="域名" />
        <el-table-column prop="CurrentCName" label="CNAME" />
        <el-table-column prop="Type" :formatter="typeFormatter" label="类型" />
        <el-table-column prop="IsMiniProgramLive" :formatter="liveFormatter" label="场景" />
        <el-table-column prop="Status" :formatter="statusFormatter" label="状态" />
        <el-table-column prop="CreateTime" label="开始时间" />
        <el-table-column prop="RentExpireTime" label="过期时间" />

        <el-table-column :label="$t('table.actions')" align="center" width="230" class-name="small-padding fixed-width">
          <template slot-scope="{row,$index}">
            <el-button type="primary" size="mini" @click="handleUpdate(row)">
              {{ $t('table.edit') }}
            </el-button>
            <el-button v-if="row.status!='published'" size="mini" type="success" @click="handleModifyStatus(row,'0')">
              {{ $t('table.publish') }}
            </el-button>
            <el-button v-if="row.status!='draft'" size="mini" @click="handleModifyStatus(row,'1')">
              {{ $t('table.draft') }}
            </el-button>
            <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
              {{ $t('table.delete') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { fetchList } from '@/api/domain'
// import { Message } from 'element-ui'
// import Axios from 'axios'
export default {
  data() {
    return {
      listLoading: true,
      input: '',
      tableData: null,
      postData: {
        Response: {
          OnlineInfo: [
            {
              StreamName: '5000_abcdefg',
              AppName: 'live',
              DomainName: '5000.livepush.myqcloud.com',
              PublishTimeList: [
                {
                  PublishTime: '2017-10-24T12:00:00Z'
                }
              ]
            }
          ],
          TotalNum: 1,
          TotalPage: 1,
          PageNum: 1,
          PageSize: 10,
          RequestId: '8e50cdb5-56dc-408b-89b0-31818958d424'
        }
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      // Axios.post('http://mtv.tib1206.com/admin/domain/list', { data: this.postData }).then(function(response) {
      //   var res = response.data
      //   if (res === '登录成功,3秒后跳转主页') {
      //     var noticeId = JSON.parse(window.sessionStorage.getItem('user'))
      //     alert(noticeId)
      //     alert(response.data)
      //     setTimeout(function() {
      //       this.listLoading = false
      //     }, 3 * 1000)
      //   } else if (response.data === '用户名不存在,请注册后重新登录') {
      //     // that.message = response.data
      //     Message({
      //       message: response.data.msg,
      //       type: 'error',
      //       duration: 5 * 1000
      //     })
      //   }
      // }).catch(function(error) {
      //   alert(error)
      // })
      fetchList(this.postData).then(response => {
        this.tableData = response.data.Response.DomainList
        console.log(this.tableData)
        this.listLoading = false
      })
      this.listLoading = false
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
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作成功',
        type: 'success'
      })
      row.Status = status
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
    // 类型
    typeFormatter(row, column) {
      const type = row.Type
      if (type === 0) {
        return '推流'
      } else {
        return '播放'
      }
    },
    // 场景
    liveFormatter(row, column) {
      const live = row.IsMiniProgramLive
      if (live === 0) {
        return '标准直播'
      } else {
        return '小程序直播'
      }
    },
    // 状态
    statusFormatter(row, column) {
      const status = row.Status
      if (status === 0) {
        return '停用'
      } else {
        return '启用'
      }
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>
