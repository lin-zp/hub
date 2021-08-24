// const fs  = require("fs")

// // console.log(fs.readdirSync(__dirname));
// const userRouters = function(){
//     fs.readdirSync(__dirname).forEach(file => {
//         if(file == "index.js") return;
//         const router = require(`./${file}`)
//         this.use(router.routes());
//         this.use(router.allowedMethods())
//     });
// }

// module.exports = userRouters

const fs = require('fs');


const useRoutes = function() {
  fs.readdirSync(__dirname).forEach(file => {
    if (file === 'index.js') return;
    const router = require(`./${file}`);
    // console.log(this);
    this.use(router.routes());
    this.use(router.allowedMethods());
  })
}

module.exports = useRoutes;