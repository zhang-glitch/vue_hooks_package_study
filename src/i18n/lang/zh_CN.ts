import { genMessage } from '../helper';
// TODO: 其他库语言包 例如antd
// import antdLocale from 'ant-design-vue/es/locale/zh_CN';

const modules = import.meta.glob('./zh-CN/**/*.ts', { eager: true });
export default {
  message: {
    // 处理文件，拿出所有嵌套文件语言
    ...genMessage(modules, 'zh-CN'),
    // TODO: 其他库语言包 例如antd
    // antdLocale,
  },
};
