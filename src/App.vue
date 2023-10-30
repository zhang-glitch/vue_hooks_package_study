<script setup lang="ts">
import {Form, CellGroup, Field, Button, showToast, Cell, ActionSheet} from "vant"
import { ref } from 'vue';
import { useI18n, changeLocale } from "./i18n/useI18n";
import {useAppStore} from "./store/index"
import {useLocale} from "./i18n/useLocale"
import langContent from "./test"

  const username = ref('');
  const password = ref('');
  const onSubmit = (values) => {
    console.log('submit', values);
  };


  const show = ref(false);
  const actions = [
    { name: '选项一' },
    { name: '选项二' },
    { name: '选项三' },
  ];
  const onSelect = (item) => {
    // 默认情况下点击选项时不会自动收起
    // 可以通过 close-on-click-action 属性开启自动收起
    show.value = false;
    showToast(item.name);
  };

  const {t} = useI18n()
  const {changeLocale} = useLocale()

  const handleLangChange = async (lang: string) => {
    console.log("======lang", lang)
    // localStorage.setItem("localeLang", lang)
    await changeLocale(lang)
    useAppStore().changeLocaleLang(lang)
    location.reload()
  }


</script>

<template>
  <div class="div">{{ t('routes.a.btn') }}</div>
  <div class="div">{{ t('common.commonBtn') }}</div>
  <!-- 对于通过配置设置的国际化内容，是不能更新的，所以需要通过location.reload()刷新页面 -->
  <div class="div">{{ langContent.a }}</div>
  <button @click="handleLangChange('zh_CN')">中文</button>
  <button @click="handleLangChange('en')">英文</button>
  <Form @submit="onSubmit">
    <CellGroup inset>
      <Field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <Field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
    </CellGroup>
    <div style="margin: 16px;">
      <Button round block type="primary" native-type="submit">
        提交
      </Button>
    </div>
  </Form>

  <Cell is-link title="基础用法" @click="show = true" />
  <ActionSheet v-model:show="show" :actions="actions" @select="onSelect" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.div {
  font-size: 20px;
  width: 100px;
}
</style>
