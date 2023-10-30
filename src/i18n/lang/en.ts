import { genMessage } from '../helper';
// TODO: 其他库语言包 例如antd
// import antdLocale from 'ant-design-vue/es/locale/en_US';

// 获取en文件夹下的所有ts结尾文件，嵌套文件
const modules = import.meta.glob('./en/**/*.ts', { eager: true });

export default {
  message: {
    // 处理文件，拿出所有嵌套文件语言
    ...genMessage(modules, 'en'),
    // TODO: 其他库语言包 例如antd
    // antdLocale,
  },
};
