import { LocaleType } from './useLocale';
import type { App } from 'vue';
import type { I18n, I18nOptions } from 'vue-i18n';
import { createI18n } from 'vue-i18n';
import { useAppStore } from "../store";
import { setHtmlPageLang } from "./helper";


export let i18n: ReturnType<typeof createI18n>;

export const LOCALE: { [key: string]: 'zh_CN' | 'en'} = {
  ZH_CN: 'zh_CN',
  EN_US: 'en',
};

async function createI18nOptions(): Promise<I18nOptions> {
  // TODO: 获取本地缓存的localeLang, 放在全局状态管理中，做响应式
  // const locale = localStorage.getItem("localeLang")  || LOCALE.ZH_CN
  const locale = useAppStore().localeLang  || LOCALE.zh_CN

  // 获取语言包
  const defaultLocal = await import(`./lang/${locale}.ts`);
  const message = defaultLocal.default?.message ?? {};
  setHtmlPageLang(locale as LocaleType);

  return {
    // 使用 Composition API 模式，则需要将其设置为false
    legacy: false,
    // 全局注入 $t 函数
    globalInjection: true,
    locale: locale,
    fallbackLocale: locale,
    messages: {
      [locale]: message,
    },
    availableLocales: [LOCALE.ZH_CN, LOCALE.EN_US],
    sync: true, //If you don’t want to inherit locale from global scope, you need to set sync of i18n component option to false.
    silentTranslationWarn: true, // true - warning off
    missingWarn: false,
    silentFallbackWarn: true,
  };
}

export async function setupI18n(app: App) {
  const options = await createI18nOptions();
  i18n = createI18n(options) as I18n;
  app.use(i18n);
}