<template>
  <div class="editDialog">
    <el-dialog title="修改学科" :visible.sync="dialogFormVisible">
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item prop="rid" label="学科编号" :label-width="formLabelWidth">
          <el-input v-model="form.rid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="name" label="学科名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科简称" :label-width="formLabelWidth">
          <el-input v-model="form.short_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科介绍" :label-width="formLabelWidth">
          <el-input v-model="form.intro" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学科备注" :label-width="formLabelWidth">
          <el-input v-model="form.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editSubject">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 导入操作学科的方法
import { apiEidtSubject } from "@/api/subject.js";

export default {
  data() {
    return {
      // 控制面板的显示和隐藏
      dialogFormVisible: false,
      // 表单元素中的数据源
      form: {
        rid: "", // 学科编号
        name: "", // 学科名称
        short_name: "", // 简称
        intro: "", // 介绍
        remark: "", // 备注
        id: ""
      },
      // 添加校验规则
      rules: {
        rid: [{ required: true, message: "请输入学科编号", trigger: "blur" }],
        name: [{ required: true, message: "请输入学科名称", trigger: "blur" }]
      },
      // 标题文本的宽度：
      formLabelWidth: `120px`
    };
  },
  methods: {
    // 添加一个修改的方法
    editSubject() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // 1.0 得到面板中的数据 this.form
          // 2.0 提交到服务器
          apiEidtSubject(this.form).then(res => {
            if (res.data.code === 200) {
              // 关闭面板
              this.dialogFormVisible = false;
              // 提示用户修改成功
              this.$message.success("修改成功");
              // 刷新页面
              this.$parent.getSubjectData();
            } else if (res.data.code === 201) {
              this.$message.error(res.data.message);
            }
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
</style>
