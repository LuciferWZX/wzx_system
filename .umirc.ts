import { defineConfig } from "umi";
import {proxy, routes} from "./config";

export default defineConfig({
  title:"wzx-system",
  routes:routes,
  npmClient: 'pnpm',
  alias:{
    '@':'src',
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
    '@umijs/plugins/dist/valtio',
    ],
  model:{},
  initialState: {},
  styledComponents:{},
  icons:{
    autoInstall: {},
  },
  valtio:{},
});
