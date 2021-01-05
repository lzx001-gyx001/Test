<template>
  <div class="app-container">
    <el-input
      v-model="input"
      style="margin:0 0 20px 20px; width:300px;"
      placeholder="请输入内容"
      clearable
    />
    <el-button style="margin:0 0 10px 10px;" type="success">成功按钮</el-button>
    <el-card>
      <el-table
        v-loading="listLoading"
        :data="tableData"
        element-loading-text="Loading..."
        stripe
        style="width: 100%"
      >
        <el-table-column prop="date" label="日期" width="180" />
        <el-table-column prop="name" label="姓名" width="180" />
        <el-table-column prop="address" label="地址" />
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { fetchList } from '@/api/live'
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
      // this.tableData = [
      //   {
      //     date: '2016-05-02',
      //     name: '王小虎',
      //     address: '上海市普陀区金沙江路 1518 弄'
      //   },
      //   {
      //     date: '2016-05-04',
      //     name: '王小虎',
      //     address: '上海市普陀区金沙江路 1517 弄'
      //   },
      //   {
      //     date: '2016-05-01',
      //     name: '王小虎',
      //     address: '上海市普陀区金沙江路 1519 弄'
      //   },
      //   {
      //     date: '2016-05-03',
      //     name: '王小虎',
      //     address: '上海市普陀区金沙江路 1516 弄'
      //   }
      // ]
      fetchList(this.postData).then(response => {
        this.tableData = response.data.items
        this.listLoading = false
      })
      this.listLoading = false
    }
  }
}
</script>
