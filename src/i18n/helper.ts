

import { set } from 'lodash-es';

export function genMessage(langs: any, prefix = 'lang') {
  const obj: Record<string, any> = {};

  // 循环动态加载的模块路径，并获取内容。
  Object.keys(langs).forEach((key) => {
    const langFileModule = langs[key].default;
   /**
    * TODO:
    *  ./en/common.ts => common.ts
    * ./en/routes/b.ts => routes/b.ts
    */
    let fileName = key.replace(`./${prefix}/`, '').replace(/^\.\//, '');
    const lastIndex = fileName.lastIndexOf('.');
    /**
     * TODO: 
     * common.ts => common
     * routes/b.ts => routes/b
     */
    fileName = fileName.substring(0, lastIndex);
    const keyList = fileName.split('/');
    // 拿到第一层文件夹名称
    /**
     * common
     * routes
     */
    const moduleName = keyList.shift();
    // 拿到最后文件名称
    const objKey = keyList.join('.');
    if (moduleName) {
      if (objKey) {
        /**
         * set(object, path, value)
         * 
         * 设置 object对象中对应 path 属性路径上的值，如果path不存在，则创建。 缺少的索引属性会创建为数组，而缺少的属性会创建为对象。 
         * 
         */
        set(obj, moduleName, obj[moduleName] || {});
        set(obj[moduleName], objKey, langFileModule);
      } else {
        set(obj, moduleName, langFileModule || {});
      }
    }
  });
  return obj;
}
