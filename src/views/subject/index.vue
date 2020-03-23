<template>
  <div>
    <!-- 顶部区域 -->
    <el-card>
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="学科编号">
          <el-input class="short" v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="学科名称">
          <el-input class="long" v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input class="short" v-model="formInline.user"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select class="long" v-model="formInline.region" placeholder="请选择状态">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="onSubmit">清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">
            <i class="el-icon-plus"></i>&nbsp;新增学科
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 表格区域 -->
    <el-card class="card">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="date" label="学科编号"></el-table-column>
        <el-table-column prop="date" label="学科名称"></el-table-column>
        <el-table-column prop="date" label="简称"></el-table-column>
        <el-table-column prop="date" label="创造者"></el-table-column>
        <el-table-column prop="date" label="创建日期"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">{{scope.row.isUse?"禁用":"启用"}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template>
            <el-link type="primary">编辑</el-link>&nbsp;
            <el-link type="primary">禁用</el-link>&nbsp;
            <el-link type="primary">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="mypagintation"
        background
        :current-page="currentPage"
        :page-sizes="sizesArr"
        :page-size="pagesize"
        :hide-on-single-page="true"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import { apiGetSubject } from "../../api/subject";
export default {
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      // 当前页
      currentPage: 1,
      // 页容量的数据
      sizesArr: [10, 20, 30],
      // 页容量
      pagesize: 10,
      // 数据的总条数
      total: 30,

      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
          isUse: false
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
          isUse: false
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          isUse: true
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
          isUse: true
        }
      ]
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },
  created() {
    apiGetSubject({}).then(res => {
      console.log(res);
    });
  }
};
</script>

<style lang="less">
.demo-form-inline {
  .short {
    width: 80px;
  }
  .long {
    width: 130px;
  }
  .el-form-item {
    margin-bottom: 0px;
  }
}
.mypagintation {
  text-align: center;
  margin-top: 30px;
}
.card {
  margin-top: 20px;
}
// .isUse {
//   color: red;
// }
</style>
