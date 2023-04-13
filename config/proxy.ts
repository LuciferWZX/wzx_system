import config from "./config.json"
const proxy = {
    '/api': {
        target: config.proxy.api,
        changeOrigin: true,
        pathRewrite: { '^/api': '/api' }
    },
    '/socket.io': {
        target: config.proxy.socket,
        ws:true
    }
}
export default proxy
