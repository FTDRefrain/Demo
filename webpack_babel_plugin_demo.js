/**
 * 删除 css 的引入
 */
module.exports = function ({ types: babelTypes }) {
    return {
        name: "no-require-css",
        visitor: {
            ImportDeclaration(path, state) {
                let importFile = path.node.source.value;
                if(importFile.indexOf('.scss')>-1){
                    // 干掉css 导入
                    path.remove();
                }
            }
        }
    };
};

//.babelrc 中使用

 "plugins": [
                "./webpack/babel/plugin/no-require-css"  //引入        
            ]
