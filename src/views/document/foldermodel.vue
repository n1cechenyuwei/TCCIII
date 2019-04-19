<template>
  <div>
    <div class="mytask-content-top">
      <el-dropdown
        @command="handleCommand"
        placement="bottom-start"
        class="mytask-dropdown">
        <el-button type="primary" size="small">
          筛选<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a">按开始时间(最新)</el-dropdown-item>
          <el-dropdown-item command="b">按结束时间(最新)</el-dropdown-item>
          <el-dropdown-item command="c">按任务进度(最新)</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="search-box">
        <el-input
          size="small"
          class="mytasksearch"
          placeholder="请输入文件夹名称"
          v-model="myprojectsearch">
        </el-input>
        <i class="el-icon-search sreach-icon"></i>      
      </div>     
      <el-button type="primary" size="mini">搜索</el-button>
    </div>
    <div class="mytask-content-middle">
      <div class="mytask-content-table">
        <el-table
          :data="projectlist"
          class="mytask-content-table-one"
          stripe
          style="width: 100%">
          <el-table-column
            prop="name"
            label="名称">
            <template slot-scope="scope">
              <i class="iconfont wenjianjia icon-tubiaozhizuomoban"></i>
              <span>{{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="size"
            label="大小"
            width="180">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="time"
            width="400"
            label="生成时间">
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        class="taskpage"
        :current-page.sync="currentPage"
        @current-change="handleprojectChange"
        :page-size="taskpagesize"
        layout="total, prev, pager, next, jumper"
        :total="projecttotal">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: ["prostatus"],
  data() {
    return {
      currentPage: 1, //默认第几页
      taskpagesize: 14, //每页显示几条
      projecttotal: 0,
      projectlist: [
        {
          name: "文件夹1",
          time: "2018-10-01",
          size: "1.5MB"
        }
      ],
      myprojectsearch: "",
      propstatus: this.prostatus
    };
  },
  methods: {
    
    //筛选按钮
    handleCommand(command) {
      if (command === "a") {
        console.log("aaa");
      } else if (command === "b") {
        console.log("bbb");
      }
    },
    handleprojectChange(val) {
      // this.projecteddata(val);
    }
  },
  created() {
    // this.projecteddata(this.currentPage);
  }
};
</script>

<style>
.mytask-content-top {
  height: 54px;
  background-color: #fbfbfb;
  border-top-left-radius: 6px;
  border-bottom: 1px solid #e8e8e8;
}
.mytasksearch {
  width: 300px;
  margin-top: 11px;
  margin-left: 20px;
  margin-right: 10px;
  position: relative;
}
.sreach-icon {
  position: absolute;
  top: 0px;
}
.mytask-dropdown {
  margin-left: 30px;
}
.wenjianjia {
  font-size: 28px;
  color: #ffd659;
  position: relative;
  top: 4px;
  margin: 0 10px 0 0;
}
</style>
