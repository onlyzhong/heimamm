<template>
  <el-dialog class="reg_dialog" title="用户注册" :visible.sync="dialogFormVisible">
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item prop="niconame" label="昵称" :label-width="formLabelWidth">
        <el-input v-model="form.niconame" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="email" label="邮箱" :label-width="formLabelWidth">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="phone" label="手机" :label-width="formLabelWidth">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码" :label-width="formLabelWidth">
        <el-input v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="imgcode" label="图形码" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="17">
            <el-input v-model="form.imgcode" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="7" class="imgcodeBox">
            <img class="imgcode" src="../../../assets/login_captcha.png" alt />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item prop="regcode" label="验证码" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="17">
            <el-input v-model="form.regcode" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="7" class="imgcodeBox">
            <el-button class="btncode">获取用户验证码</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "67px",
      form: {
        niconame: "",
        email: "",
        phone: "",
        password: "",
        imgcode: "",
        regcode: ""
      },
      rules: {
        //昵称验证
        niconame: [
          { required: true, message: "昵称不能为空", trigger: "blur" },
          { min: 4, max: 8, message: "长度在 4 到 8 个字符", trigger: "blur" }
        ],
        //邮箱验证
        email: [{ required: true, message: "邮箱不能为空", trigger: "blur" }],
        //手机验证
        phone: [
          { required: true, message: "手机不能为空", trigger: "blur" },
          { min: 11, max: 11, message: "长度是 11 个字符", trigger: "blur" }
        ],
        // 密码验证
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 4, max: 8, message: "长度在 4 到 8 个字符", trigger: "blur" }
        ],
        // 图形码
        imgcode: [
          { required: true, message: "图形码不能为空", trigger: "blur" },
          { min: 4, max: 4, message: "长度在 4 个字符", trigger: "blur" }
        ],
        //验证码
        regcode: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
          { min: 6, max: 6, message: "长度在 6 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //点击确认按钮触发事件
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$message({
            message: "验证通过",
            type: "success"
          });
        } else {
          this.$message.error("验证不通过");
        }
      });
    }
  }
};
</script>

<style lang="less">
.reg_dialog {

  // margin-top: -10px;
  .el-dialog__header {
    text-align: center;
    padding: 0px;
    height: 53px;
    line-height: 53px; // 设置背景为渐变色
    background: linear-gradient(to right, #0dc1ef, #1394fc);
    .el-dialog__title {
      color: #fff;
    }
  }
  //label居中
  .el-form-item__label{
    text-align: center;
  }
  .imgcodeBox {
    height: 41px;
    text-align: right;
    .imgcode,
    .btncode {
      width: 143px;
      height: 41px;
    }
  }
  .dialog-footer {
    text-align: center;
  }
}
</style>