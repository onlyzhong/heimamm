// 封装两个方法
// 检验手机号
export function checkPhone(rule, value, callback) {
  // 定义正则
  var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
  if (value == "") {
    return callback(new Error("请输入手机号"));
  } else {
    if (reg.test(value)) {
      callback();
    } else {
      callback(new Error("手机号格式不正确"));
    }
  }
}

// 检验邮箱
export function checkEmail(rule, value, callback) {
  // 定义正则
  var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  if (value == "") {
    return callback(new Error("请输入邮箱"));
  } else {
    if (reg.test(value)) {
      callback();
    } else {
      callback(new Error("邮箱格式不正确"));
    }
  }
}