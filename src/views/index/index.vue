<template>
  <div class="index">
    <el-container class="box">
      <!-- 头部 -->
      <el-header>
        <div class="left">
          <i class="el-icon-s-fold"></i>
          <img src="../../assets/index_logo.png" alt />
          <span>黑马面面</span>
        </div>
        <div class="right">
          <img :src="imgUrl" alt />
          <span class="word">{{ userInfo.username }}</span>
          <el-button @click="logout" type="primary" size="mini">退出</el-button>
        </div>
      </el-header>
      <el-container class="contentbox">
        <!-- 菜单导航栏 -->
        <el-aside width="200px">Aside</el-aside>
        <!-- 内容区域 -->
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// 导入方法
import { apiInfo } from "@/api/index.js";
// 导入操作 token 的方法
import { removeToken } from "@/utils/mytoken.js";
export default {
  data() {
    return {
      imgUrl: "",
      userInfo: {}
    };
  },
  methods: {
    logout() {
      this.$confirm("是否确定退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //清除token
          removeToken();
          //跳转到login页面
          this.$router.push("/login");
          //提示退出成功
          this.$message({
            type: "success",
            message: "退出成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消退出"
          });
        });
    }
  },
  created() {
    //获取用户信息
    apiInfo().then(res => {
      window.console.log(res);
      this.userInfo = res.data.data;
      this.imgUrl = process.env.VUE_APP_HTTP + "/" + this.userInfo.avatar;
    });
  }
};
</script>

<style lang="less">
.index,
.box,
.contentbox {
  height: 100%;
}

.el-header {
  background-color: #fff;
  color: #333;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    display: flex;
    align-items: center;
    i {
      font-size: 24px;
      margin-right: 22px;
    }
    img {
      width: 33px;
      height: 28px;
      margin-right: 11px;
    }
    span {
      font-size: 22px;
      color: #49a1ff;
    }
  }
  .right {
    display: flex;
    align-items: center;
    img {
      width: 43px;
      height: 43px;
      border-radius: 50%;
      margin-right: 9px;
    }
    .word {
      font-size: 14px;
      margin-right: 38px;
    }
  }
}

.el-aside {
  background-color: #fff;
  color: #333;
}

.el-main {
  background-color: #e8e9ec;
  color: #333;
}
</style>
