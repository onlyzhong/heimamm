<template>
  <div class="addDialog">
    <el-dialog title="新增用户" class="reg_dialog" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item prop="username" label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="电话" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="role_id" label="角色" :label-width="formLabelWidth">
          <el-select v-model="form.role_id" autocomplete="off">
            <el-option value="4" label="学生"></el-option>
            <el-option value="3" label="老师"></el-option>
            <el-option value="2" label="管理员"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="status" label="状态" :label-width="formLabelWidth">
            <el-select v-model="form.status" autocomplete="off">
            <el-option value="0" label="禁用"></el-option>
            <el-option value="1" label="启用"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="remark" label="用户备注" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="isAdduser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 导入自定义校验规则
import { checkPhone, checkEmail } from "@/utils/mycheck.js";
//导入接口
import { apiAddUser } from "../../../api/user";
export default {
  data() {
    return {
      form: {
        username: "",
        email: "",
        phone: "",
        role_id: "",
        status: "",
        remark: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        email: [{ required: true, validator: checkEmail, trigger: "blur" }],
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
        role_id: [{ required: true, message: "请选择角色", trigger: "blur" }]
      },
      dialogFormVisible: false,
      formLabelWidth: "120px"
    };
  },
  methods: {
    //添加用户
    isAdduser() {
      //验证表单
      this.$refs.form.validate(valid => {
        if (valid) {
          // 调用接口添加到服务器
          apiAddUser(this.form).then(res => {
            console.log(res);
            if (res.data.code == 200) {
              this.$message.success("用户添加成功");
              //表单隐藏
              this.dialogFormVisible = false;
              //清空表单
              this.$refs.form.resetFields();
              //重新加载数据
              this.$parent.getUserData();
            } else {
              this.$message.error(res.data.message);
            }
          });
        } else {
          this.$message.error("验证失败");
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
  // .el-form-item__label {
  //   text-align: center;
  // }

  .dialog-footer {
    text-align: center;
  }
}
</style>