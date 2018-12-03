<template>
  <div class="height-auto">
    <div class="applyfor-top">
      <i id="detection-icon" class="iconfont icon-gongsimingcheng"></i>
      <i class="font">浙江大华公司入围检测实验室检测审核任务</i>
    </div>
    <div class="detection-jibenxinxi">
      <div>
        <div class="statusbox">
          <i class="statusbox-font">负责人：</i>
          <i>郝佳贺</i>
        </div>
        <div class="statusbox">
          <i class="statusbox-font">起始日：</i>
          <i>2018-11-12</i>
        </div>
        <div class="statusbox">
          <i class="statusbox-font">到期日：</i>
          <i>2018-11-16</i>
        </div>
        <div class="statusbox">
          <i class="statusbox-font">任务状态：</i>
          <i>超时</i>
        </div>
      </div>
      <div>
        <div class="gong-information-box">
          <span>所属项目：</span>
          <span class="gong-box-font">浙江大华公司入围检测项目</span>
        </div>
      </div>
      <div class="taskSliderBox">
        <span>任务进度:</span>
        <div class="Slider">
          <el-slider v-model="taskvalue"></el-slider>
        </div>
        <span>{{taskvalue}}%</span>
      </div>
      <div class="detec-mt">
        <div class="eqconfig-information-box">
          <div class="information-box">
            <span>设备名称：</span>
            <span class="information-box-font">海康威视球机</span>
          </div>
          <div class="information-box2">
            <span>设备编号：</span>
            <span class="information-box-font">1001</span>
          </div>
        </div>
        <div class="eqconfig-information-box">
          <div class="information-box">
            <span>硬件类型：</span>
            <span class="information-box-font">球机</span>
          </div>
          <div class="information-box2">
            <span>设备序列号：</span>
            <span class="information-box-font">AS45648151564</span>
          </div>
        </div>
        <div class="eqconfig-information-box">
          <div class="information-box">
            <span>检测台编号：</span>
            <span class="information-box-font">005</span>
          </div>
          <div class="information-box2">
            <span>任务类型：</span>
            <span class="information-box-font">IPC协议检测</span>
          </div>
        </div>
      </div>
    </div>
    <div class="detec-conteng">     
      <el-table
        height="460"
        stripe
        :data="eqinformation"
        style="width: 100%">
        <el-table-column type="expand" label="展开" width="70">
          <template slot-scope="scope">
            <div class="detec-expand-rizhi">日志附件</div>
            <div class="expand-rizhi-list">
              <div v-for="(item, index) in scope.row.rizhilist" :key="index" :class="{'expand-rizhi-listone': index % 2 === 0, 'expand-rizhi-listtwo': index % 2 !== 0, 'hov': isok}">
                <i class="el-icon-d-arrow-right rizhi-list-icon"></i>
                <span class="rizhi-list-name">{{item}}</span>
                <i class="el-icon-download list-icon-download"></i>
                <i class="el-icon-delete list-icon-delete"></i>
              </div>
            </div>
            <div class="detec-expand-rizhi">其他附件</div>
            <div class="expand-rizhi-list">
              <div v-for="(item, index) in scope.row.qitalist" :key="index" :class="{'expand-rizhi-listone': index % 2 === 0, 'expand-rizhi-listtwo': index % 2 !== 0, 'hov': isok}">
                <i class="el-icon-d-arrow-right rizhi-list-icon"></i>
                <span class="rizhi-list-name">{{item}}</span>
                <i class="el-icon-download list-icon-download"></i>
                <i class="el-icon-delete list-icon-delete"></i>
              </div>
            </div>
            <div class="detec-expand-rizhi">建议</div>
            <div class="expand-rizhi-list">
              <div v-for="(item, index) in scope.row.jianyilist" :key="index" :class="{'expand-jianyi-listone': index % 2 === 0, 'expand-jianyi-listtwo': index % 2 !== 0, 'hov': isok}">
                <i class="el-icon-d-arrow-right jianyi-list-icon"></i>
                <div class="jianyi-list-name">{{item.name}}：</div>
                <div class="jianyi-list-content">{{item.content}}</div>
              </div>
              <div class="jianyi-box">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 3}"
                  placeholder="请输入建议"
                  v-model="textarea3">
                </el-input>
                <div class="jianyi-btn-box">
                  <el-button type="primary" size="mini" class="jianyi-btn">发表建议</el-button>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          width="120"
          label="用例编号"
          prop="id">
        </el-table-column>
        <el-table-column
          label="用例名称"
          prop="name">
        </el-table-column>
        <el-table-column
          label="检测员"
          width="100"
          prop="jiancep">
        </el-table-column>
        <el-table-column
          label="检测结果"
          width="100"
          prop="jianceres">
        </el-table-column>
        <el-table-column
          label="审核员"
          width="100"
          prop="shenhep">
        </el-table-column>
        <el-table-column
          label="审核结果"
          width="120">
          <template slot-scope="scope">
            <el-select v-model="value4" clearable placeholder="请选择" size="mini">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
      </el-table>
      <div class="eqconfig-bot-btn">
        <el-button size="small" type="primary" @click="eqconfigsubmit">提交任务</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      taskvalue: 0, // 任务进度条
      eqinformation: [
        {
          id: "1005",
          name: "最大亮度等级",
          jiancep: "郝佳贺",
          jianceres: "通过",
          shenhep: "赵龙",
          shenheres: "待审核",
          rizhilist: ["最大亮度等级级别日志1", "最大亮度等级级别日志2"],
          qitalist: ["最大亮度等级级别视频", "最大亮度等级级别照片"],
          jianyilist: [
            {
              name: "赵龙",
              content: "检测不符合规范"
            },
            {
              name: "郝佳贺",
              content: "重新检测"
            }
          ]
        },
        {
          id: "1006",
          name: "注册-基础数字摘要认证",
          jiancep: "郝佳贺",
          jianceres: "通过",
          shenhep: "赵龙",
          shenheres: "待审核",
          rizhilist: ["最大亮度等级级别日志1", "最大亮度等级级别日志2"],
          qitalist: ["最大亮度等级级别视频", "最大亮度等级级别照片"],
          jianyilist: [
            {
              name: "赵龙",
              content: "检测不符合规范"
            },
            {
              name: "郝佳贺",
              content: "重新检测"
            }
          ]
        }
      ],
      isok: true,
      options: [
        {
          value: "选项1",
          label: "通过"
        },
        {
          value: "选项2",
          label: "未通过"
        }
      ],
      value4: ""
    };
  },
  methods: {
    // 提交任务
    eqconfigsubmit() {
      this.$confirm("确定提交任务吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          this.$message.success("提交成功");
        })
        .catch(() => {});
    }
  }
};
</script>

<style>
#detection-icon {
  font-size: 32px;
  color: #1ac7ff;
}
.detection-jibenxinxi {
  background-color: #fff;
  padding: 10px 0 10px 20px;
  border-top: 1px solid #dae9f9;
  border-bottom: 1px solid #dae9f9;
}
.detec-mt {
  margin-top: 14px;
}
.detec-conteng {
  height: 600px;
  background-color: #fff;
  border-top: 1px solid #dae9f9;
  border-bottom: 1px solid #dae9f9;
  box-sizing: border-box;
  margin-top: 6px;
}
.detec-expand-rizhi {
  height: 14px;
  font-size: 14px;
  color: #409eff;
  margin-top: 6px;
}
.expand-rizhi-list {
  margin-top: 10px;
  padding-left: 20px;
}
.expand-rizhi-listone {
  height: 28px;
  line-height: 28px;
  position: relative;
}
.expand-rizhi-listtwo {
  height: 28px;
  line-height: 28px;
  background-color: #f5f7fa;
  position: relative;
}

.expand-jianyi-listone {
  line-height: 24px;
  position: relative;
  margin-top: 4px;
}
.expand-jianyi-listtwo {
  line-height: 24px;
  background-color: #f5f7fa;
  position: relative;
  margin-top: 4px;
}
.rizhi-list-icon {
  color: #409eff;
}
.rizhi-list-name {
  margin-left: 10px;
}
.list-icon-download {
  color: #409eff;
  position: absolute;
  top: 3px;
  right: 100px;
  font-size: 20px;
}
.list-icon-delete {
  color: #e6a23c;
  position: absolute;
  top: 3px;
  right: 70px;
  font-size: 18px;
}
.el-table__expanded-cell {
  padding: 4px 50px 10px 50px !important;
}
.jianyi-list-content {
  display: inline-block;
  max-width: 750px;
}
.jianyi-list-name {
  display: inline-block;
  margin-left: 10px;
  vertical-align: top;
}
.jianyi-list-icon {
  color: #409eff;
  vertical-align: middle;
}
.jianyi-box {
  margin-top: 10px;
}
.jianyi-btn-box {
  margin-top: 6px;
  position: relative;
  height: 24px;
}
.jianyi-btn {
  right: 0;
  position: absolute;
}
</style>
