const app = require("./app")
const http  = require("http")
const config = require("./config/config")



const server = http.createServer(app) 


server.listen(config.PORT,()=>{
    console.log(`Server is running on port ${config.PORT}`);
    
})