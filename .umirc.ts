import { defineConfig } from "umi";
import {proxy, routes} from "./config";

export default defineConfig({
  title:"wzx-system",
  routes:routes,
  npmClient: 'pnpm',
  alias:{
    '@':'src',
    'config':'config',
  },
  history:{
    type:"hash"
  },
  hash:true,
  proxy:proxy,
  plugins: [
    '@umijs/plugins/dist/initial-state',
    '@umijs/plugins/dist/model',
    '@umijs/plugins/dist/styled-components',
    // '@umijs/plugins/dist/valtio',
    '@umijs/plugins/dist/react-query',
    ],
  model:{},
  initialState: {},
  styledComponents:{},
  icons:{
    autoInstall: {},
    include:[
        "material-symbols:cancel-rounded",
        "ic:round-keyboard-arrow-down",
        "material-symbols:settings-suggest-outline-rounded",
        "ci:log-out",
        "ion:md-arrow-round-back",
        "clarity:switch-line",
        "material-symbols:close-rounded",
        "mingcute:contacts-fill",
        "ph:wechat-logo-duotone"
    ]
  },
  // valtio:{},
  reactQuery:{}
});
