// const passwordHandle = require('./src/utils/password-handle')
// const config = require("./src/app/config")

// const fs = require('fs');


// const useRoutes = function() {
//   fs.readdirSync(`${__dirname}/src/router`).forEach(file => {
//     // if (file === 'index.js') return;
//     // const router = require(`./${file}`);
//     // this.use(router.routes());
//     // this.use(router.allowedMethods());
//     console.log(this);
//   })
// }

// useRoutes()
// // module.exports = useRoutes;



// // const result = passwordHandle("123456")
// // console.log(result);
// // const file = fs.readFileSync(__dirname)
// // console.log(file);
// const app = require("./src/app/index")
// const useRoutes = require("./src/router/index")

// app.useRoutes = useRoutes;
// console.log(useRoutes());
// app.useRoutes()
// console.log(app);
// const fs = require("fs")
// const path = require("path")
// // const app = require("./src/app/index")

// const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname,"./src/app/keys/private.key"))
// // const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname,"./key/public.key"))


// console.log(ctx);
const jwt = require("jsonwebtoken")
const {PUBLIC_KEY} = require("./src/app/config")
const {PRIVATE_KEY} = require("./src/app/config")

const testline = {
    id:"123"
}
const token = jwt.sign(testline,PRIVATE_KEY,{
    // algorithm:"HS256",
    algorithm:"RS256",
    expiresIn:60
})
console.log("----------------------");
console.log(token);
console.log("----------------------");
const result = jwt.verify(token,PUBLIC_KEY,{
    algorithms:"RS256"
  })
console.log(result);
console.log("----------------------");