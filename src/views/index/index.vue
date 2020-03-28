<template>
  <div class="index">
    <el-container class="box">
      <!-- 头部 -->
      <el-header>
        <div class="left">
          <i
            @click="iscollapse=!iscollapse"
            :class="{'el-icon-s-fold':iscollapse,'el-icon-s-unfold':!iscollapse }"
          ></i>
          <img src="../../assets/index_logo.png" alt />
          <span>黑马面面</span>
        </div>
        <div class="right">
          <img :src="$store.state.avatar" alt />
          <span class="word">{{ $store.state.name }}</span>
          <el-button @click="logout" type="primary" size="mini">退出</el-button>
        </div>
      </el-header>
      <el-container class="contentbox">
        <!-- 菜单导航栏 -->
        <!-- <el-aside> -->
        <el-menu
          :default-active="defaultRouter"
          :router="true"
          class="el-menu-vertical-demo"
          :collapse="iscollapse"
        >
          <template v-for="(item, index) in child">
            <el-menu-item
              :key="index"
              v-if="item.meta.roles.includes($store.state.role)"
              :index="item.meta.fullpath"
            >
              <i class="el-icon-pie-chart"></i>
              <span slot="title">{{ item.meta.title }}</span>
            </el-menu-item>
          </template>
          <!-- <el-menu-item index="/index/chart">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="/index/user">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="/index/question">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="/index/enterprise">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="/index/subject">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>-->
        </el-menu>
        <!-- </el-aside> -->
        <!-- 内容区域 -->
        <el-main>
          <!-- <div>{{ $store.state.name }}</div> -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// 导入方法
import { apiLogout } from "@/api/index.js";
// import { apiInfo, apiLogout } from "@/api/index.js";

// 导入子路由
import child from "@/router/childRouter.js";

// 导入操作 token 的方法
// import { removeToken } from "@/utils/mytoken.js";
import { removeToken, getToken } from "@/utils/mytoken.js";
//
export default {
  data() {
    return {
      imgUrl: "",
      userInfo: {},
      iscollapse: false,
      defaultRouter: "",
      // 生成导航的数据源
      child: child
    };
  },
  methods: {
    // 接收数据改变store中的值
    changeInfo() {
      this.$store.commit("changeInfo", this.userInfo);
    },
    // 退出按钮
    logout() {
      this.$confirm("是否确定退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          apiLogout().then(res => {
            if (res.data.code == 200) {
              //清除token
              removeToken();
              //跳转到login页面
              this.$router.push("/login");
              //提示退出成功
              this.$message({
                type: "success",
                message: "退出成功!"
              });
            }
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
    window.console.log(this.$router.currentRoute.path);
    this.defaultRouter = this.$router.currentRoute.path;
    //判断是否存在token
    if (!getToken()) {
      this.$message.error("请先登录");
      this.$router.push("/");
      return;
    }
    //获取用户信息
    // apiInfo().then(res => {
    //   window.console.log(res);
    //   if (res.data.code == 200) {
    //     this.userInfo = res.data.data;
    //     this.userInfo.avatar = process.env.VUE_APP_HTTP + "/" + this.userInfo.avatar;
    //     this.changeInfo();
    //   } else if (res.data.code == 206) {
    //     this.$message.error("token错误,请先登录");
    //     this.$router.push("/");
    //   }
    // });
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
  width: 0;
}

.el-main {
  background-color: #e8e9ec;
  color: #333;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
