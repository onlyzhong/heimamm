<template>
  <div class="login">
    <div class="leftbox">
      <div class="title">
        <img class="titleimg" src="../../assets/title-logo.png" alt />
        <span class="titlename">黑马面面</span>
        <span class="titleline"></span>
        <span class="titlelogin">用户登录</span>
      </div>
      <!-- 使用表单元素完成结构 -->
      <el-form :rules="rules" class="loginform" ref="form" :model="form" label-width="0px">
        <el-form-item prop="phone">
          <el-input prefix-icon="el-icon-user" placeholder="请输入手机号" v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input prefix-icon="el-icon-lock" placeholder="请输入密码" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item prop="logincode">
          <!-- 使用栅格系统来添加内容 -->
          <el-row>
            <el-col :span="17">
              <el-input prefix-icon="el-icon-key" placeholder="请输入验证码" v-model="form.logincode"></el-input>
            </el-col>
            <el-col :span="7">
              <img @click="changeImg" class="loginCode" :src="imgCodeUrl" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item class="checkboxheight" prop="isCheck">
          <el-checkbox-group v-model="form.isCheck">
            <el-checkbox>
              我已阅读并同意
              <el-link type="primary">用户协议</el-link>和
              <el-link type="primary">隐私条款</el-link>
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button class="loginbnt" type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-button class="loginbnt" type="primary" @click="goRegister">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <img class="rightimg" src="../../assets/login_banner_ele.png" alt />
    <register ref="register"></register>
  </div>
</template>

<script>
import register from "./components/register";

// 导入自定义校验规则
import { checkPhone } from "@/utils/mycheck.js";

//导入操作登陆的方法
import { apiLogin } from "@/api/login.js";

//导入操作登录
import { setToken } from "@/utils/mytoken.js";
export default {
  data() {
    return {
      // 登录验证码路径
      imgCodeUrl:
        process.env.VUE_APP_HTTP + `/captcha?type=login&t=` + Date.now(),
      form: {
        // 手机号
        phone: "",
        // 密码
        password: "",
        // 验证码
        logincode: "",
        // 条款
        isCheck: []
      },
      rules: {
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "长度在 6 到 18 个字符",
            trigger: "blur"
          }
        ],
        logincode: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
          { min: 4, max: 4, message: "验证的长度应该为 4", trigger: "blur" }
        ],
        isCheck: [
          {
            type: "array",
            required: true,
            message: "请先阅读用户协议和隐私条款",
            trigger: "change"
          }
        ]
      }
      // comment: register
    };
  },
  components: {
    register
  },
  methods: {
    //点击图片切换验证码
    changeImg() {
      this.imgCodeUrl =
        process.env.VUE_APP_HTTP + `/captcha?type=login&t=` + Date.now();
    },
    // 登录按钮事件
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // this.$message({
          //   message: "验证成功",
          //   type: "success"
          // });
          apiLogin({
            phone: this.form.phone,
            password: this.form.password,
            code: this.form.logincode
          }).then(res => {
            setToken(res.data.data.token);
            window.console.log(res);
            this.$router.push("/index");
          });
        } else {
          this.$message.error("验证失败");
        }
      });
    },
    //注册按钮事件
    goRegister() {
      this.$refs.register.dialogFormVisible = true;
    }
  }
};
</script>

<style lang="less">
.login {
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  /* 使用 flex 布局 */
  display: flex;
  /* 让两者左右间隔相等 */
  justify-content: space-around;
  /* 设置上下居中 */
  align-items: center;
  .leftbox {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
    padding: 48px 42px 86px;
    /* padding 不会计入盒子的宽高中 */
    box-sizing: border-box;
    .title {
      display: flex;
      /* 上下对齐 */
      align-items: center;
      .titleimg {
        width: 22px;
        height: 17px;
      }
      .titlename {
        font-size: 24px;
        font-family: SourceHanSansCN;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
        margin-left: 16px;
        margin-right: 14px;
      }
      .titleline {
        width: 1px;
        height: 28px;
        background: rgba(199, 199, 199, 1);
        margin-right: 12px;
      }
      .titlelogin {
        font-size: 22px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
      }
    }
    .loginform {
      margin-top: 29px;
    }
    .loginCode {
      width: 100%;
      height: 40px;
    }
    .checkboxheight {
      .el-form-item__content {
        line-height: 20px;
      }
    }
    .loginbnt {
      width: 100%;
    }
  }
  .rightimg {
    width: 633px;
    height: 435px;
  }
}
</style>
