var fs = require('fs')
let content = String(fs.readFileSync('./.gitlab-ci.yml'))
content = content.replace(/^name$/g, '1111')
// content.replace(/s/,'s')
console.log(content)
fs.writeFileSync('./.gitlab-ci.yml',content)