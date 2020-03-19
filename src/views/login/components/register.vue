<template>
  <el-dialog class="reg_dialog" title="用户注册" :visible.sync="dialogFormVisible">
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item prop="avatar" label="头像" :label-width="formLabelWidth">
        <el-upload
          class="avatar-uploader"
          name="image"
          :action="imgUpload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
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
            <img @click="chengeImg" class="imgcode" :src="imgcodeUrl" alt />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item prop="regcode" label="验证码" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="17">
            <el-input v-model="form.regcode" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="7" class="imgcodeBox">
            <el-button
              class="btncode"
              @click="getRegcode"
              :disabled="time!=0"
            >{{time==0?"获取用户验证码":time}}</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancle">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// import axios from "axios";
import { apiGetCode, apiRegister } from "@/api/register";
// 导入自定义校验方法
import { checkPhone, checkEmail } from "@/utils/mycheck.js";
export default {
  data() {
    // //自定义验证方法  --验证手机号
    // var validatePhone = (rule, value, callback) => {
    //   var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
    //   if (value == "") {
    //     return callback(new Error("请输入手机号"));
    //   } else {
    //     if (reg.test(value)) {
    //       callback();
    //     } else {
    //       callback(new Error("手机号格式不正确"));
    //     }
    //   }
    // };

    // //自定义验证方法 --验证邮箱
    // var validateEmail = (rule, value, callback) => {
    //   var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    //   if (value == "") {
    //     return callback(new Error("请输入邮箱"));
    //   } else {
    //     if (reg.test(value)) {
    //       callback();
    //     } else {
    //       callback(new Error("邮箱格式不正确"));
    //     }
    //   }
    // };

    return {
      dialogFormVisible: false,
      formLabelWidth: "67px",
      //获取验证码图片
      imgcodeUrl:
        process.env.VUE_APP_ONLINEHTTP +
        "/captcha?type=sendsms&t=" +
        Date.now(),
      imageUrl: "", //头像图片
      timeId: null, //定时器id
      time: 0,
      imgUpload: process.env.VUE_APP_HTTP + "/uploads", //上传头像

      form: {
        niconame: "", //昵称
        email: "", //邮箱
        phone: "", //手机
        password: "", //密码
        imgcode: "", //图形码
        regcode: "", //手机验证码
        avatar: "" //头像
      },
      rules: {
        //头像验证
        avatar: [{ required: true, message: "头像不能为空", trigger: "blur" }],
        //昵称验证
        niconame: [
          { required: true, message: "昵称不能为空", trigger: "blur" },
          { min: 4, max: 8, message: "长度在 4 到 8 个字符", trigger: "blur" }
        ],
        //邮箱验证
        email: [{ required: true, validator: checkEmail, trigger: "blur" }],
        //手机验证
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
        // 密码验证
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 18, message: "长度在 4 到 18个字符", trigger: "blur" }
        ],
        // 图形码
        imgcode: [
          { required: true, message: "图形码不能为空", trigger: "blur" },
          { min: 4, max: 4, message: "长度在 4 个字符", trigger: "blur" }
        ],
        //验证码
        regcode: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
          { min: 4, max: 4, message: "长度在 4 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //重置表单
    cancle() {
      // 得到 form 组件元素，用且调用 resetFields
      this.$refs.form.resetFields();
      // 手动清除图片
      this.imageUrl = "";
      // 关闭面板
      this.dialogFormVisible = false;
    },
    //点击确认按钮触发事件
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // this.$message({
          //   message: "验证通过",
          //   type: "success"
          // });
          // apiRegister(this.form)
          //   .then(res => {
          //     window.console.log(res);
          //   })
          //   .catch(err => {
          //     console.log(err);
          //   });

          // 将注册的参数提交到服务器中
          apiRegister({
            username: this.form.niconame,
            phone: this.form.phone,
            email: this.form.email,
            avatar: this.form.avatar,
            password: this.form.password,
            rcode: this.form.regcode
          }).then(res => {
            // 判断注册是否成功
            if (res.data.code === 200) {
              // 提示用户注册成功
              this.$message.success("注册成功");
              // 关闭注册面板
              this.dialogFormVisible = false;
              // 重新数据
              this.$refs.form.resetFields();
              this.imageUrl = "";
            } else {
              this.$message.error(res.data.message);
            }
          });
        } else {
          this.$message.error("验证不通过");
        }
      });
    },

    //点击获取图片
    chengeImg() {
      this.imgcodeUrl =
        process.env.VUE_APP_ONLINEHTTP +
        "/captcha?type=sendsms&t=" +
        Date.now();
    },

    //点击获取短信验证码
    getRegcode() {
      var phoneReg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;

      if (!phoneReg.test(this.form.phone)) {
        this.$message.error("手机号不合法");
        return;
      }
      if (this.form.imgcode.trim().length != 4) {
        this.$message.error("验证码不合法");
        return;
      }

      //按钮禁用及倒计时
      // 将时间设置为 60s
      this.time = 60;
      // 添加一个定时器：判断当前按钮是否可以点击
      this.timeId = setInterval(() => {
        if (this.time > 0) {
          this.time--;
        }
        // 当时间为0时，定时器清空
        if (this.time === 0) {
          clearInterval(this.timeId);
        }
      }, 100);

      //获取验证码
      apiGetCode({
        code: this.form.imgcode,
        phone: this.form.phone
      })
        .then(res => {
          window.console.log(res);
          // this.$message.success(res.data.data.captcha);
        })
        .catch(err => {
          window.console.log(err);
        });
      // console.log(this.form.imgcode);
      // axios({
      //   url: process.env.VUE_APP_ONLINEHTTP + "/sendsms",
      //   method: "POST",
      //   data: {
      //     code: this.form.imgcode,
      //     phone: this.form.phone
      //   },
      //   withCredentials: true
      // })
      //   .then(res => {
      //     console.log(res);
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    },

    // 上传成功后的回调函数
    //  res：服务器返回的信息
    //  file：上传的文件
    handleAvatarSuccess(res, file) {
      // 将已经上传好的图片显示到页面上:
      // file.raw：上传的图片对象
      // URL.createObjectURL：
      this.imageUrl = URL.createObjectURL(file.raw);
      // 给 avatar 赋值
      this.form.avatar = res.data.file_path;
      // console.log(res.data.file_path) // 上传过来的图片的路径
      // 单独给 avatar 参数进行验证
      this.$refs.form.validateField("avatar");
    },

    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png" || "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG/PNG/GIF 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
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
  .el-form-item__label {
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
  .avatar-uploader {
    text-align: center;
    .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
}
</style>