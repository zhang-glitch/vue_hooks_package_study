import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// 2. 引入组件样式
import 'vant/lib/index.css';// Toast
import 'vant/es/toast/style';
import {createPinia} from "pinia"

import {setupI18n} from "./i18n/index"

const app = createApp(App)

async function bootstrap () {
  app.use(createPinia())
  await setupI18n(app)
  app.mount('#app')
}

// 可以设置脚本，执行获取package中的字段内容
// console.log("====", process.env.npm_package_config_dev)
// console.log("====", process.env.npm_package_name)

bootstrap()
