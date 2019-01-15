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
          placeholder="请输入任务名称"
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
            prop="id"
            align="center"
            label="项目编号"
            width="120">
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            label="项目名称">
            <template slot-scope="scope">
              <span class="colcell" @click="rownameclick(scope.row)">{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="starttime"
            label="起始日"
            width="180">
          </el-table-column>
          <el-table-column
            prop="endtime"
            label="到期日"
            width="180">
          </el-table-column>
          <el-table-column
            prop="progress"
            width="100"
            label="进度">
            <template slot-scope="scope">
              <span>{{scope.row.progress}}%</span>
            </template>
          </el-table-column>
          <el-table-column
            width="150"
            label="申请检测类型">
            <template slot-scope="scope">
              <span>{{scope.row.type}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      projectlist:[
        {
          id: 10001,
          name: "三号线大华公司",
          starttime: "2018-11-02",
          endtime: "2019-05-06",
          progress: 30,
          type: "PIS"
        },
        {
          id: 10002,
          name: "三号线奔讯公司",
          starttime: "2018-11-02",
          endtime: "2019-05-06",
          progress: 50,
          type: "VMS"
        }
      ],
      myprojectsearch: ""
    }
  },
  methods: {
    rownameclick(row) {
      this.$router.push({
        name: "projectdetails",
        params: {
          id: row.id,
          path: "/projected",
          name: "已完成项目"
        }
      })
    },
    //筛选按钮
    handleCommand(command) {
      if (command === "a") {
        console.log("aaa");
      } else if (command === "b") {
        console.log("bbb");
      }
    },
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
</style>
