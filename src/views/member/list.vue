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
        :data="list"
        element-loading-text="Loading..."
        stripe
        style="width: 100%"
      >
        <el-table-column prop="root" label="用户名" />
        <el-table-column prop="mobile" label="注册手机号" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="sfaudit" label="状态" />
        <el-table-column prop="platform" label="来源" />
        <el-table-column prop="register" label="注册来源" />
        <el-table-column prop="createdate" label="创建时间" />
        <!-- <el-table-column :label="$t('table.actions')" align="center" width="230" class-name="small-padding fixed-width">
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
        </el-table-column> -->
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { fetchList } from '@/api/user'
export default {
  data() {
    return {
      listLoading: true,
      input: '',
      list: null,
      listQuery: {
        pageNumber: 1,
        pageSize: 20,
        sortName: 'CreateDate',
        sortOrder: 'DESC'
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.rows
        console.log('kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk')
        console.log(this.list)
        this.total = response.data.total
        this.listLoading = false
      })
    }
  }
}
</script>
