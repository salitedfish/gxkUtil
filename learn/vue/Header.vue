<template>
  <div class="common-header" :style="headerStyle">
    <div class="left">
      <slot name="left">
        <m-global-icon icon="icon-v2-arrow-left" @click="handleBack" />
      </slot>
    </div>

    <div class="center">
      <slot name="center">{{ title }}</slot>
    </div>

    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
/**框架*/
/**工具库*/
/**类型*/
/**网络请求*/
/**自定义方法*/
/**组件*/

defineProps<{
  title: string;
  headerStyle: string;
}>();

const handleBack = () => {};
</script>

<style scoped lang="less">
.common-header {
  position: fixed;
  display: flex;
  align-items: center;
  min-height: 40px;
  padding: 10px 15px;
  justify-content: space-between;
  left: 0;
  right: 0;
  z-index: 99;
  .center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    width: 70%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
