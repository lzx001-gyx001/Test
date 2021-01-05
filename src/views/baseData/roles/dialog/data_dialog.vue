<template>
 
   <div>
        <el-form
        ref="dataForm"
        
        :model="dialogOb"
        class="dialog-form-box"
        label-position="right"
        label-width="80px"
        style="width:600px"
      >
        <!-- *模块编码/*模块名称 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="项目值" prop="title">
              <el-input value="Permission组件" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="显示顺序" prop="order">
              <el-input v-model="dialogOb.name" />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 上级模块/模块分类 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="上级" prop="type">
              <!-- 新增弹出框下的tree -->
              <el-dropdown trigger="click">
                <el-button class="class-btn">
                  {{dialogOb.name?dialogOb.name:"请选择"}}
                  <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
                </el-button>
                <el-dropdown-menu slot="dropdown" class="class-dropdown-menu">
                  <el-dropdown-item>
                    <!-- addTree里面渲染的是对应table表的数据 -->
                    <el-tree
                      @node-click="setTreeId('addTree')"
                      ref="addTree"
                      default-expand-all
                    />
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目名称" prop="timestamp">
              <el-input v-model="dialogOb.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- Icon图标/链接目标 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="项目值" prop="title">
              <el-input v-model="dialogOb.name" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="显示顺序" prop="order">
              <el-input v-model="dialogOb.name" />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- *级别层次/显示顺序 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="选项" prop="id">
              <el-input v-model="dialogOb.name" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="说明" prop="title">
              <el-input v-model="dialogOb.name" />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 选项 -->
        <el-row>
          <el-form-item label="选项" prop="id">
            <el-checkbox v-model="dialogOb.iswork" />
            <span style="margin-left:5px;">有效</span>
          </el-form-item>
        </el-row>
        <!-- 访问地址 -->
        <el-row>
          <el-form-item label="选项" prop="id">
            <el-input v-model="dialogOb.name" />
          </el-form-item>
        </el-row>
        <!-- 说明 -->
        <el-row>
          <el-form-item label="说明" prop="title">
            <el-input v-model="dialogOb.remark" :autosize="{ minRows: 2, maxRows: 4}" type="textarea" />
          </el-form-item>
        </el-row>
      </el-form>
      <!-- 底部确定、取消的按钮 -->
      <!-- <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button
          type="primary"
          @click="dialogStatus==='create'?createData():updateData()"
        >{{ $t('table.confirm') }}</el-button>
      </div> -->
   </div>
   
</template>

<script>
export default {
    props:['dialogPermission','dialogOb']
}
</script>

<style>

</style>