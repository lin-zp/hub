const crypto = require("crypto")

const passwordHandle = (password)=>{
    const md5 = crypto.createHash('md5')
    const result = md5.update(password).digest('hex')
    return result;
}

module.exports = passwordHandle

// const crypto = require('crypto');

// const md5password = (password) => {
//   const md5 = crypto.createHash('md5');
//   const result = md5.update(password).digest('hex');
//   return result;
// }

// module.exports = md5password;
