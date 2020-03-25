<template>
  <div class="editDialog">
    <el-dialog title="修改用户" class="reg_dialog" :visible.sync="dialogFormVisible">
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
        <el-form-item prop="username" label="昵称" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item prop="password" label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item> -->
        <el-form-item prop="role_id" label="角色" :label-width="formLabelWidth">
          <el-select v-model="form.role_id" autocomplete="off">
            <el-option :value="4" label="学生"></el-option>
            <el-option :value="3" label="老师"></el-option>
            <el-option :value="2" label="管理员"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="status" label="状态" :label-width="formLabelWidth">
          <el-select v-model="form.status" autocomplete="off">
            <el-option :value="0" label="禁用"></el-option>
            <el-option :value="1" label="启用"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="remark" label="用户备注" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="iaEdituser">确 定</el-button>
      </div>
    </el-dialog>
    {{form.password}}
  </div>
</template>

<script>
// 导入操作用户的方法
import { apiEidtUser } from "@/api/user.js";
// 导入自定义校验规则
import { checkPhone, checkEmail } from "@/utils/mycheck.js";
export default {
  data() {
    return {
      // 控制面板的显示和隐藏
      dialogFormVisible: false,
      //获取头像图片
      imageUrl: "",
      // 表单元素中的数据源
      form: {
        id: "", //用户标识
        username: "", // 昵称
        phone: "", // 手机
        email: "", // 邮箱
        avatar: "", // 头像
        password: "", //密码
        remark: "", //备注
        status: "", //状态
        role_id: "" //角色
      },
      imgUpload: process.env.VUE_APP_HTTP + "/uploads", //上传头像
      // 添加校验规则
      rules: {
        email: [{ validator: checkEmail, trigger: "blur" }],
        phone: [{ validator: checkPhone, trigger: "blur" }],
        password: [
          { min: 6, max: 18, message: "长度在 4 到 18个字符", trigger: "blur" }
        ]
      },
      // 标题文本的宽度：
      formLabelWidth: `80px`
    };
  },
  methods: {
    // 添加一个修改的方法
    iaEdituser() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // 1.0 得到面板中的数据 this.form
          // 2.0 提交到服务器
          console.log(this.form);

          apiEidtUser(this.form)
            .then(res => {
              console.log(this.form.id);
              if (res.data.code === 200) {
                // 关闭面板
                this.dialogFormVisible = false;
                // 提示用户修改成功
                this.$message.success("修改成功");
                // 刷新页面
                this.$parent.getUserData();
              } else if (res.data.code === 201) {
                this.$message.error(res.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          this.$message.error("验证不通过");
        }
      });
    },
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
.editDialog {
  .el-dialog__header {
    text-align: center;
    background: linear-gradient(to right, #00c6f7, #2194ec);
    .el-dialog__title {
      color: #fff;
    }
    .el-dialog__close {
      color: #fff;
    }
  }
  .dialog-footer {
    text-align: center;
  }
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
    // margin-right:30px ;
    height: 178px;
    display: block;
  }
}
</style>
