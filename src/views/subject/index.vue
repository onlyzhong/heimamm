<template>
  <div>
    <!-- 顶部区域 -->
    <el-card>
      <el-form :inline="true" :model="navObj" class="demo-form-inline">
        <el-form-item label="学科编号">
          <el-input class="short" v-model="navObj.rid"></el-input>
        </el-form-item>
        <el-form-item label="学科名称">
          <el-input class="long" v-model="navObj.name"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input class="short" v-model="navObj.username"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select class="long" v-model="navObj.region">
            <el-option label="所有" value></el-option>
            <el-option label="禁用" :value="0"></el-option>
            <el-option label="启用" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">筛选</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="clearSearch">清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addSubject">
            <i class="el-icon-plus"></i>&nbsp;新增学科
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 表格区域 -->
    <el-card class="card">
      <el-table :data="subjectList" style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="rid" label="学科编号"></el-table-column>
        <el-table-column prop="name" label="学科名称"></el-table-column>
        <el-table-column prop="short_name" label="简称"></el-table-column>
        <el-table-column prop="username" label="创造者"></el-table-column>
        <el-table-column prop="create_time" label="创建日期" width="180"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">{{scope.row.status?"禁用":"启用"}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-link type="primary" @click="edit(scope.row)">编辑</el-link>&nbsp;
            <el-link type="primary" @click="disAble(scope.row)">{{scope.row.status?"启用":"禁用"}}</el-link>&nbsp;
            <el-link type="primary" @click="deleteSubject(scope.row)">删除</el-link>
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
    <!-- 新增表单 -->
    <addSubject ref="addSubject" />
    <!-- 编辑表单 -->
    <editSubject ref="editSubject"></editSubject>
  </div>
</template>

<script>
//导入操作学科列表的方法
import {
  apiGetSubject,
  apiChangeStatus,
  apiDeleteSubject
} from "../../api/subject";
//导入新增面版
import addSubject from "./components/adddialog";
//导入编辑面板
import editSubject from "./components/editdialog";
export default {
  data() {
    return {
      // 页容量的数据
      sizesArr: [2, 4, 6, 8],
      // 数据的总条数
      total: 4,
      //学科数据
      subjectList: [],
      //请求学科列表的参数对象
      obj: {
        name: "", // 学科名称
        page: 1, // 当前页
        limit: 4, // 页容量
        rid: "", // 当前学科编号
        username: "", // 创建者的名称
        status: "" // 状态
      },
      //筛选时暂存数据的对象
      navObj: {
        rid: "",
        name: "",
        username: "",
        region: ""
      }
    };
  },
  //组件
  components: {
    addSubject,
    editSubject
  },
  methods: {
    //获取学科数据
    getSubjectData() {
      apiGetSubject(this.obj).then(res => {
        console.log(res);
        this.subjectList = res.data.data.items;
        // 将数据的总条数保存起来
        this.total = res.data.data.pagination.total;
      });
    },

    //每页条数改变时触发的事件
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.obj.limit = val;
      this.getSubjectData();
    },

    //当前页发生改变的出发事件
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.obj.page = val;
      this.getSubjectData();
    },

    //启用或禁用
    disAble(row) {
      let id = row.id;
      apiChangeStatus(id).then(() => {
        this.getSubjectData();
        if (row.status) {
          this.$message.success("启用成功");
        } else {
          this.$message.success("禁用成功");
        }
      });
    },

    //添加学科按钮
    addSubject() {
      this.$refs.addSubject.dialogFormVisible = true;
    },

    //筛选按钮
    search() {
      // this.obj = this.navObj;
      this.obj.rid = this.navObj.rid;
      this.obj.name = this.navObj.name;
      this.obj.username = this.navObj.username;
      this.obj.region = this.navObj.region;
      this.getSubjectData();
    },

    //清除按钮
    clearSearch() {
      this.navObj.rid = "";
      this.navObj.name = "";
      this.navObj.username = "";
      this.navObj.region = "";
    },

    //编辑按钮
    edit(row) {
      console.log(row);
      //打开编辑面板
      this.$refs.editSubject.dialogFormVisible = true;
      //直接渲染会出现同步修改的bug
      // this.$refs.editSubject.form = row;
      // // 解决同步修改的 bug
      // let str = JSON.stringify(row)
      // let objStr = JSON.parse(str)
      // // 重新赋值
      // this.$refs.editDailog.form = objStr
      // 简写
      this.$refs.editSubject.form = JSON.parse(JSON.stringify(row));
    },

    //删除按钮
    deleteSubject(row) {
      this.$confirm("是否确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(res => {
          console.log(res);
          console.log(row);
          apiDeleteSubject(row).then(res => {
            console.log(res);
            this.getSubjectData();
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.getSubjectData();
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
