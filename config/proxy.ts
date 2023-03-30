const proxy = {
    '/gateway': {
        target: "http://172.25.128.98:3000/gateway",
        changeOrigin: true,
        pathRewrite: { '^/gateway': '' }
    },
    '/api': {
        target: "http://localhost:3001",
        changeOrigin: true,
        pathRewrite: { '^/api': '/api' }
    }
}
export default proxy
