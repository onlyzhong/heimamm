<template>
  <div class="login">
    <div class="leftbox">
      <div class="title">
        <img class="titleimg" src="../../assets/title-logo.png" alt="">
        <span class="titlename">黑马面面</span>
        <span class="titleline"></span>
        <span class="titlelogin">用户登录</span>
      </div>
    </div>
    <img class="rightimg" src="../../assets/login_banner_ele.png" alt="">
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
.login {
  height: 100%;
  background: linear-gradient(225deg, rgba(20, 147, 250, 1), rgba(1, 198, 250, 1));
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
  }
  .rightimg {
    width: 633px;
    height: 435px;
  }
}
</style>
