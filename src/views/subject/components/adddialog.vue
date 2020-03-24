<template>
  <div class="addDialog">
    <el-dialog title="新增学科" class="reg_dialog" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item prop="rid" label="学科编号" :label-width="formLabelWidth">
          <el-input v-model="form.rid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="学科名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="short_name" label="学科简称" :label-width="formLabelWidth">
          <el-input v-model="form.short_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="intro" label="学科简介" :label-width="formLabelWidth">
          <el-input v-model="form.intro" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="remark" label="学科备注" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="iaAddSubject">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { apiAddSubject } from "../../../api/subject";
export default {
  data() {
    return {
      form: {
        rid: "",
        name: "",
        short_name: "",
        intro: "",
        remark: ""
      },
      rules: {
        rid: [{ required: true, message: "请输入学科编号", trigger: "blur" }],
        name: [{ required: true, message: "请输入学科名称", trigger: "blur" }]
      },
      dialogFormVisible: false,
      formLabelWidth: "120px"
    };
  },
  methods: {
    //添加学科
    iaAddSubject() {
      //验证表单
      this.$refs.form.validate(valid => {
        if (valid) {
          // 调用接口添加到服务器
          apiAddSubject(this.form).then(res => {
            console.log(res);
            if (res.data.code == 200) {
              this.$message.success("学科添加成功");
              //表单隐藏
              this.dialogFormVisible = false;
              //清空表单
              this.$refs.form.resetFields();
              //重新加载数据
              this.$parent.getSubjectData();
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
  .el-form-item__label {
    text-align: center;
  }

  .dialog-footer {
    text-align: center;
  }
}
</style>