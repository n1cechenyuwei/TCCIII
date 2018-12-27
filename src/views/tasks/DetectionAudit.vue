<template>
  <div class="height-auto">
    <div class="applyfor-top">
      <i id="detection-icon" class="iconfont icon-gongsimingcheng"></i>
      <i class="font">{{taskinfo.taskname}}任务</i>
    </div>
    <div class="detection-jibenxinxi">
      <div>
        <div class="statusbox">
          <i class="statusbox-font">负责人：</i>
          <i>{{taskinfo.user}}</i>
        </div>
        <div class="statusbox">
          <i class="statusbox-font">起始日：</i>
          <i>{{taskinfo.starttime}}</i>
        </div>
        <div class="statusbox">
          <i class="statusbox-font">到期日：</i>
          <i>{{taskinfo.endtime}}</i>
        </div>
        <div class="statusbox">
          <i class="statusbox-font">任务状态：</i>
          <i>{{taskinfo.state}}</i>
        </div>
      </div>
      <div>
        <div class="gong-information-box">
          <span>所属项目：</span>
          <span class="gong-box-font">{{taskinfo.projectname}}</span>
        </div>
      </div>
      <div class="taskSliderBox">
        <span>任务进度:</span>
        <div class="Slider">
          <el-slider v-model="$store.state.tasksechedule" :disabled="disable" @change="handletasksechedule"></el-slider>
        </div>
        <span>{{$store.state.tasksechedule}}%</span>
      </div>
      <div class="detec-mt">
        <div class="eqconfig-information-box">
          <div class="information-box">
            <span>设备名称：</span>
            <span class="information-box-font">{{deviceinfo.devicename}}</span>
          </div>
          <div class="information-box2">
            <span>设备编号：</span>
            <span class="information-box-font">{{deviceinfo.id}}</span>
          </div>
        </div>
        <div class="eqconfig-information-box">
          <div class="information-box">
            <span>硬件类型：</span>
            <span class="information-box-font">{{deviceinfo.devicetype}}</span>
          </div>
          <div class="information-box2">
            <span>设备序列号：</span>
            <span class="information-box-font">{{deviceinfo.serialnumber}}</span>
          </div>
        </div>
        <div class="eqconfig-information-box">
          <div class="information-box">
            <span>任务类型：</span>
            <span class="information-box-font">{{tasktype}}</span>
          </div>
          <!-- <div class="information-box2">
            <span>任务类型：</span>
            <span class="information-box-font">{{tasktype}}</span>
          </div> -->
        </div>
      </div>
    </div>
    <div class="detec-conteng">
      <el-table
        height="460"
        stripe
        :data="usecaseinfo"
        style="width: 100%">
        <el-table-column type="expand" label="展开" width="70">
          <template slot-scope="scope">
            <div class="detec-expand-rizhi">日志附件</div>
            <div class="expand-rizhi-list">
              <div v-show="scope.row.accessory_info.caselog_info.length === 0" class="expand-rizhi-listone">无</div>
              <div v-for="(item, index) in scope.row.accessory_info.caselog_info" :key="index" :class="{'expand-rizhi-listone': index % 2 === 0, 'expand-rizhi-listtwo': index % 2 !== 0, 'hov': isok}">
                <i class="el-icon-d-arrow-right rizhi-list-icon"></i>
                <span class="rizhi-list-name">{{item.name}}</span>
                <el-button type="primary" size="mini" icon="el-icon-edit" class="list-icon-edit" @click="$store.dispatch('caselogcontent', item.id)"></el-button>
                <!-- <el-button type="warning" size="mini" icon="el-icon-delete" class="list-icon-delete" @click="handledeletelog(item.id, scope.row.id)"></el-button> -->
              </div>
            </div>
            <div class="detec-expand-rizhi">视频附件</div>
            <div class="expand-rizhi-list">
              <div v-show="scope.row.accessory_info.casevideo_info.length === 0" class="expand-rizhi-listone">无</div>
              <div v-for="(item, index) in scope.row.accessory_info.casevideo_info" :key="index" :class="{'expand-rizhi-listone': index % 2 === 0, 'expand-rizhi-listtwo': index % 2 !== 0, 'hov': isok}">
                <i class="el-icon-d-arrow-right rizhi-list-icon"></i>
                <span class="rizhi-list-name">{{item.video_name}}</span>
                <el-button type="primary" size="mini" icon="el-icon-view" class="list-icon-edit" @click="opencasevideo(item.path)"></el-button>
                <!-- <el-button type="warning" size="mini" icon="el-icon-delete" class="list-icon-delete" @click="deletevideo(item.id, scope.row.id)"></el-button> -->
              </div>
            </div>
            <div class="detec-expand-rizhi">照片附件</div>
            <div class="expand-rizhi-list">
              <div v-show="scope.row.accessory_info.caseimage_info.length === 0" class="expand-rizhi-listone">无</div>
              <div v-for="(item, index) in scope.row.accessory_info.caseimage_info" :key="index" :class="{'expand-rizhi-listone': index % 2 === 0, 'expand-rizhi-listtwo': index % 2 !== 0, 'hov': isok}">
                <i class="el-icon-d-arrow-right rizhi-list-icon"></i>
                <span class="rizhi-list-name">{{item.image_name}}</span>
                <el-button type="primary" size="mini" icon="el-icon-view" class="list-icon-edit" @click="opencaseimg(item.path)"></el-button>
                <!-- <el-button type="warning" size="mini" icon="el-icon-delete" class="list-icon-delete" @click="deletecaseimg(item.id, scope.row.id)"></el-button> -->
              </div>
            </div>
            <div class="detec-expand-rizhi">建议</div>
            <div class="expand-rizhi-list">
              <div v-show="scope.row.accessory_info.casecomment_info.length === 0" class="expand-rizhi-listone">无</div>
              <div v-for="(item, index) in scope.row.accessory_info.casecomment_info" :key="index" :class="{'expand-jianyi-listone': index % 2 === 0, 'expand-jianyi-listtwo': index % 2 !== 0, 'hov': isok}">
                <i class="el-icon-d-arrow-right jianyi-list-icon"></i>
                <div class="jianyi-list-name">{{item.author}}：</div>
                <div class="jianyi-list-content">{{item.content}}</div>
                <div class="jianyi-time">{{item.comment_time}} 发表</div>
              </div>
              <div class="jianyi-box">
                <el-form :model="textForm" status-icon :rules="textFormrules" ref="textForm">
                  <el-form-item prop="content">
                    <el-input
                      type="textarea"
                      spellcheck ="false"
                      :autosize="{ minRows: 2, maxRows: 2}"
                      placeholder="请输入建议"
                      v-model.trim="textForm.content">
                    </el-input>
                  </el-form-item>
                </el-form>
                <div class="jianyi-btn-box">
                  <el-button type="primary" size="mini" class="jianyi-btn" @click="published(scope.row.id)">发表建议</el-button>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          width="120"
          show-overflow-tooltip
          label="用例编号"
          prop="case_no">
        </el-table-column>
        <el-table-column
          label="用例名称"
          show-overflow-tooltip
          prop="case_name">
        </el-table-column>
        <el-table-column
          label="检测员"
          width="100"
          empty-text="无"
          show-overflow-tooltip
          prop="test_person">
        </el-table-column>
        <el-table-column
          label="检测结果"
          width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.test_result === '1'" class="tongguo">通过</span>
            <span v-if="scope.row.test_result === '0'" class="butongguo">不通过</span>
            <span v-if="scope.row.test_result === null">待审核</span>
          </template>
        </el-table-column>
        <el-table-column
          label="审核员"
          width="100"
          prop="auditor">
        </el-table-column>
        <el-table-column
          label="审核结果"
          width="130">
          <template slot-scope="scope">
            <el-select v-model="scope.row.audit_result" placeholder="请选择结果" size="mini" @change="caserecords(scope.row.audit_result, scope.row.id)">
              <el-option
                v-for="item in resultoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
      </el-table>
      <div class="deca-btn">
        <el-button size="small" type="primary" @click="eqconfigsubmit">提交任务</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["taskid"],
  data() {
    return {
      isok: true,
      textForm: {
        content: ""
      },
      textFormrules: {
        content: [{ required: true, message: "请输入建议", trigger: "blur" }]
      },
      resultoptions: [
        {
          label: "通过",
          value: 1
        },
        {
          label: "不通过",
          value: 0
        }
      ]
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
          const res = await this.$http.put(`detectionaudit/${this.taskid}`);
          if (res.status === 200) {
            this.$message.success("提交成功");
            this.$store.commit("taskhuakuaihidden");
            this.$store.dispatch("loadingMytask", 1);
            this.$store.dispatch("hometask");
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(() => {});
    },
    // 更改任务进度
    handletasksechedule() {
      this.$store.dispatch("handletasksechedule", this.taskid);
    },
    // 更新审核结果
    async caserecords(result, rowid) {
      const res = await this.$http.put(`caserecords/${rowid}`, { result: result });
      if (res.status === 200) {
        this.$store.dispatch("routerright", { taskid: this.taskid, route: "detectionaudit" });
        this.$message.success("审批成功")
      } else {
        this.$message.error(res.msg)
      }
    },
    // 删除日志
    // handledeletelog(id, rowid) {
    //   this.$confirm("确定提交任务吗", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   })
    //     .then(async () => {
    //       const res = await this.$http.delete(`caselogs/${id}`);
    //       if (res.status === 200) {
    //         this.$store.dispatch("caseloglist", rowid);
    //         this.$message.success("日志删除成功");
    //       } else {
    //         this.$message.error(res.msg);
    //       }
    //     })
    //     .catch(() => {});
    // },
    // 发表建议
    published(id) {
      this.$refs.textForm.validate(async valid => {
        if (!valid) {
          return this.$message.warning("请输入建议");
        }
        const res = await this.$http.post(
          `casecommentlist/${id}`,
          this.textForm
        );
        if (res.status === 200) {
          this.$message.success("发表成功");
          this.$refs.textForm.resetFields();
          this.$store.dispatch("handlecasecomment", id);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    // 点击用例照片按钮
    opencaseimg(img) {
      this.$store.commit("handlecaseimgopen", img);
    },
    // 删除用例照片按钮
    // async deletecaseimg(id, rowid) {
    //   this.$confirm("确定删除照片吗", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   })
    //     .then(async () => {
    //       const res = await this.$http.delete(`caseimage/${id}`);
    //       if (res.status === 200) {
    //         this.$message.success("照片删除成功");
    //         this.$store.dispatch("caseimglist", rowid);
    //       } else {
    //         this.$message.error(res.msg);
    //       }
    //     })
    //     .catch(() => {});
    // },
    // 删除用例视频
    // async deletevideo(id, rowid) {
    //   this.$confirm("确定删除视频吗", "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   })
    //     .then(async () => {
    //       const res = await this.$http.delete(`video/${id}`);
    //       if (res.status === 200) {
    //         this.$message.success("照片删除成功");
    //         this.$store.dispatch("casevideolist", rowid);
    //       } else {
    //         this.$message.error(res.msg);
    //       }
    //     })
    //     .catch(() => {});
    // },
    // 点击用例视频按钮
    opencasevideo(video) {
      this.$store.commit("handlecasevideoopen", video);
    }
  },
  computed: mapState({
    taskinfo: "taskinfo",
    deviceinfo: "deviceinfo",
    workbenchid: "workbenchid",
    tasktype: "tasktype",
    usecaseinfo: "usecaseinfo",
    disable: "disable",
    dis: "dis"
  })
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
  vertical-align: top;
}
.el-table__expanded-cell {
  padding: 4px 50px 10px 50px !important;
}

.deca-btn {
  text-align: center;
  margin-top: 10px;
}
</style>
