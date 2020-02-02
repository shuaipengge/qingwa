<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
})
export default class App extends Vue {}
</script>

<style>
/* 图片上传组件 预览图 宽度自适应 */
.avue-upload__avatar {
  height: auto !important;
}
</style>
