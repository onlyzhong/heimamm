<template>
  <div>
    <!-- 顶部区域 -->
    <el-card>
      <el-form :inline="true" :model="navObj" class="demo-form-inline">
        <div class="formDiv">
          <el-form-item label="学科" :label-width="formLabelWidth">
            <el-select v-model="navObj.subject" placeholder="请选择学科">
              <el-option
                v-for="(item, index) in subjectList"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="阶段" :label-width="formLabelWidth">
            <el-select v-model="navObj.step">
              <el-option label="所有" value></el-option>
              <el-option label="初级" :value="1"></el-option>
              <el-option label="中级" :value="2"></el-option>
              <el-option label="高级" :value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="企业" :label-width="formLabelWidth">
            <el-select v-model="navObj.enterprise" placeholder="请选择企业">
              <el-option
                v-for="(item, index) in enterpriseList"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="题型" :label-width="formLabelWidth" placeholder="请选择题型">
            <el-select v-model="navObj.type">
              <el-option label="所有" value></el-option>
              <el-option label="单选" :value="1"></el-option>
              <el-option label="多选" :value="2"></el-option>
              <el-option label="简答" :value="3"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="formDiv">
          <el-form-item label="难度" :label-width="formLabelWidth">
            <el-select v-model="navObj.difficulty" placeholder="请选择难度">
              <el-option label="请选择" value></el-option>
              <el-option label="简单" :value="1"></el-option>
              <el-option label="一般" :value="2"></el-option>
              <el-option label="困难" :value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="作者" :label-width="formLabelWidth">
            <el-input class="short" v-model="navObj.username"></el-input>
          </el-form-item>
          <el-form-item label="状态" :label-width="formLabelWidth">
            <el-select v-model="navObj.status">
              <el-option label="所有" value></el-option>
              <el-option label="启用" :value="1"></el-option>
              <el-option label="禁用" :value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="日期" :label-width="formLabelWidth">
            <el-date-picker
              class="short"
              type="datetime"
              placeholder="选择日期"
              v-model="navObj.create_date"
            ></el-date-picker>
          </el-form-item>
        </div>
        <div class="formDiv">
          <el-form-item label="题目名称" :label-width="formLabelWidth">
            <el-input class="long" v-model="navObj.title"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">搜索</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="clearSearch">清除</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addUser">
              <i class="el-icon-plus"></i>&nbsp;新增试题
            </el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-card>
    <!-- 表格区域 -->
    <el-card class="card">
      <el-table :data="QuestionList" border style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column label="题目" width="200">
          <template slot-scope="scope">
            <span v-html="scope.row.title"></span>
          </template>
        </el-table-column>
        <el-table-column prop="subject" label="学科•阶段">
          <template slot-scope="scope">
            {{ scope.row.subject_name }} •
            <span v-if="scope.row.step === 1">初级</span>
            <span v-if="scope.row.step === 2">中级</span>
            <span v-if="scope.row.step === 3">高级</span>
          </template>
        </el-table-column>
        <el-table-column prop="step" label="题型">
          <template slot-scope="scope">
            <span v-if="scope.row.step === 1">单选</span>
            <span v-if="scope.row.step === 2">多选</span>
            <span v-if="scope.row.step === 3">简答</span>
          </template>
        </el-table-column>
        <el-table-column prop="enterprise_name" label="企业"></el-table-column>
        <el-table-column prop="username" label="创建者">
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">{{scope.row.status?"启用":"禁用"}}</template>
        </el-table-column>
        <el-table-column prop="reads" label="访问量"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-link type="primary" @click="edit(scope.row)">编辑</el-link>&nbsp;
            <el-link type="primary" @click="disAble(scope.row)">{{scope.row.status?"禁用":"启用"}}</el-link>&nbsp;
            <el-link type="primary" @click="deleteQuestion(scope.row)">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        class="mypagintation"
        background
        :current-page="obj.page"
        :page-sizes="sizesArr"
        :page-size="obj.limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import {
  apiGetQuestion,
  apiChangeStatus,
  apiDeleteQuestion
} from "../../api/question";

// 导入得到学科数据的方法
import { apiGetSubject } from "../../api/subject.js";
// 导入得到企业数据的方法
import { apiGetenterprise } from "../../api/enterprise.js";
export default {
  data() {
    return {
      // 页容量的数据
      sizesArr: [2, 4, 6, 8],
      // 数据的总条数
      total: 4,
      formLabelWidth: `90px`,
      // 学科数据
      subjectList: [],
      // 企业数据
      enterpriseList: [],
      //题目数据
      QuestionList: [],
      //请求题目列表的参数对象
      obj: {
        title: "",
        subject: "",
        enterprise: "",
        type: "",
        step: "",
        username: "",
        status: "",
        difficulty: "",
        create_date: "",
        page: "",
        limit: ""
      },
      //筛选时暂存数据的对象
      navObj: {
        title: "",
        subject: "",
        enterprise: "",
        type: "",
        step: "",
        username: "",
        status: "",
        difficulty: "",
        create_date: "",
        page: 1,
        limit: 10
      }
    };
  },
  methods: {
    //获取学科数据
    getSubject() {
      apiGetSubject(this.obj).then(res => {
        this.subjectList = res.data.data.items;
      });
    },
    // 得到企业数据
    getEnterprise() {
      apiGetenterprise(this.obj).then(res => {
        this.enterpriseList = res.data.data.items;
      });
    },
    //获取题目数据
    getQuestionData() {
      apiGetQuestion(this.obj).then(res => {
        console.log(res);
        this.QuestionList = res.data.data.items;
        // 将数据的总条数保存起来
        this.total = res.data.data.pagination.total;
      });
    },
    //每页条数改变时触发的事件
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.obj.limit = val;
      this.getQuestionData();
    },

    //当前页发生改变的出发事件
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.obj.page = val;
      this.getQuestionData();
    },

    //启用或禁用
    disAble(row) {
      let id = row.id;
      apiChangeStatus(id).then(() => {
        this.getQuestionData();
        if (!row.status) {
          this.$message.success("启用成功");
        } else {
          this.$message.success("禁用成功");
        }
      });
    },
    //删除按钮
    deleteQuestion(row) {
      this.$confirm("是否确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(res => {
          console.log(res);
          console.log(row);
          apiDeleteQuestion(row).then(res => {
            if (res.data.code == 200) {
              if (this.QuestionList.length == 1) {
                this.obj.page = this.obj.page - 1;
              }
              this.$message.success("删除成功");
            }
            // console.log(res);
            this.getQuestionData();
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.getSubject();
    this.getQuestionData();
    this.getEnterprise();
  }
};
</script>


<style lang="less" scoped>
.demo-form-inline {
  .formDiv {
    margin-bottom: 20px;
    .el-form-item {
      margin-bottom: 0px;
      //label居中
      // .el-form-item__label {
      //   text-align: center ;
      // }
      .el-form-item__content {
        width: 150px;
        .el-select {
          width: 150px;
          .el-input {
            width: 150px;
          }
        }
        .short {
          width: 150px;
        }
        .long {
          width: 400px;
        }
      }
    }
  }
}

.mypagintation {
  text-align: center;
  margin-top: 30px;
}
.card {
  margin-top: 20px;
}
</style>
