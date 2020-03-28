<template>
  <div>
    <!-- 顶部区域 -->
    <el-card>
      <el-form :inline="true" :model="navObj" class="demo-form-inline">
        <el-form-item label="用户名称">
          <el-input class="short" v-model="navObj.username"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱">
          <el-input class="long" v-model="navObj.email"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select class="long" v-model="navObj.role_id">
            <el-option label="所有" value></el-option>
            <el-option label="管理员" :value="2"></el-option>
            <el-option label="老师" :value="3"></el-option>
            <el-option label="学生" :value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="clearSearch">清除</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addUser">
            <i class="el-icon-plus"></i>&nbsp;新增用户
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 表格区域 -->
    <el-card class="card">
      <el-table :data="UserList" border style="width: 100%">
        <el-table-column type="index" label="序号" width="80"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <!-- <el-table-column prop="short_name" label="简称"></el-table-column> -->
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="role_id" label="角色">
          <template
            slot-scope="scope"
          >{{scope.row.role_id==3?"老师":(scope.row.role_id==4?"学生":"管理员")}}</template>
        </el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">{{scope.row.status?"启用":"禁用"}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-link type="primary" @click="edit(scope.row)">编辑</el-link>&nbsp;
            <el-link type="primary" @click="disAble(scope.row)">{{scope.row.status?"禁用":"启用"}}</el-link>&nbsp;
            <el-link type="primary" @click="deleteUser(scope.row)">删除</el-link>
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
    <addUser ref="addUser" />
    <!-- 编辑表单 -->
    <editUser ref="editUser"></editUser>
    {{ obj }}
  </div>
</template>

<script>
//导入操作用户列表的方法
import { apiGetUser, apiChangeStatus, apiDeleteUser } from "../../api/user";
//导入新增面版
import addUser from "./components/adddialog";
//导入编辑面板
import editUser from "./components/editdialog";
export default {
  data() {
    return {
      // 页容量的数据
      sizesArr: [2, 4, 6, 8],
      // 数据的总条数
      total: 4,
      //用户数据
      UserList: [],
      //请求用户列表的参数对象
      obj: {
        username: "", // 用户名
        email: "", // 邮箱
        role_id: "", // 角色数字
        page: 1, // 页码
        limit: 4 // 页容量
      },
      //筛选时暂存数据的对象
      navObj: {
        username: "",
        email: "",
        role_id: ""
      }
    };
  },
  //组件
  components: {
    addUser,
    editUser
  },
  methods: {
    //获取用户数据
    getUserData() {
      apiGetUser(this.obj).then(res => {
        console.log(res);
        this.UserList = res.data.data.items;
        // 将数据的总条数保存起来
        this.total = res.data.data.pagination.total;
      });
    },

    //每页条数改变时触发的事件
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.obj.limit = val;
      this.getUserData();
    },

    //当前页发生改变的出发事件
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.obj.page = val;
      this.getUserData();
    },

    //启用或禁用
    disAble(row) {
      let id = row.id;
      apiChangeStatus(id).then(() => {
        this.getUserData();
        if (!row.status) {
          this.$message.success("启用成功");
        } else {
          this.$message.success("禁用成功");
        }
      });
    },

    //添加用户按钮
    addUser() {
      this.$refs.addUser.dialogFormVisible = true;
    },

    //筛选按钮
    search() {
      // this.obj = this.navObj;
      this.obj.username = this.navObj.username;
      this.obj.email = this.navObj.email;
      this.obj.role_id = this.navObj.role_id;
      this.getUserData();
    },

    //清除按钮
    clearSearch() {
      this.navObj.eid = "";
      this.navObj.name = "";
      this.navObj.username = "";
      this.navObj.status = "";
    },

    //编辑按钮
    edit(row) {
      console.log(row);
      //打开编辑面板
      this.$refs.editUser.imageUrl =
        process.env.VUE_APP_HTTP + "/" + row.avatar;
      // console.log(this.$refs.editUser.imageUrl);
      this.$refs.editUser.dialogFormVisible = true;
      if (row.id !== this.$refs.editUser.form.id) {
        console.log(this.$refs.editUser.form.id);
        console.log(row.id);
        this.$refs.editUser.form = JSON.parse(JSON.stringify(row));
      }
    },

    //删除按钮
    deleteUser(row) {
      this.$confirm("是否确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(res => {
          console.log(res);
          console.log(row);
          apiDeleteUser(row).then(res => {
            if (res.data.code == 200) {
              if (this.UserList.length == 1) {
                this.obj.page = this.obj.page - 1;
              }
              this.$message.success("删除成功");
            }
            // console.log(res);
            this.getUserData();
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.getUserData();
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
// .el-table .isUse{
//   color: red;
// }
.card {
  margin-top: 20px;
}
// .isUse {
//   color: red;
// }
</style>
