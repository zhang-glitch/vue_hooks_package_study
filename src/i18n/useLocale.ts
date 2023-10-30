import { useAppStore } from './../store/index';
import { setHtmlPageLang } from "./helper";
import { i18n } from "./index"

import {unref} from "vue"
export type LocaleType = "zh_CN" | "en"

function setI18nLanguage(locale: LocaleType) {
  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale;
  } else {
    (i18n.global.locale as any).value = locale;
  }
  // TODO: 更新全局状态中的语言变量
  useAppStore().changeLocaleLang(locale)
  // 设置html lang属性
  setHtmlPageLang(locale);
}


export function useLocale() {
  /**
 * 切换语言类型调用
 */
  async function changeLocale(locale: LocaleType) {
    const globalI18n = i18n.global;
    // 获取当前语言类型
    const currentLocale = unref(globalI18n.locale);
    if (currentLocale === locale) {
      return locale;
    }

    // 拿到当前语言包message对象
    const langModule = ((await import(`./lang/${locale}.ts`)) as any).default;
    if (!langModule) return;

    const { message } = langModule;


    // 更新i18n语言包
    globalI18n.setLocaleMessage(locale, message);
    // 更新locale
    setI18nLanguage(locale);

    return locale;
  }
  return {
    changeLocale
  }
}