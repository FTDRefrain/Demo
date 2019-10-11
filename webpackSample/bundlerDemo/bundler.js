const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const babel = require('@babel/core')

const moduleAnalyser = filename => {
	const content = fs.readFileSync(filename, 'utf-8')
	// ast解析
	const ast = parser.parse(content, {
		sourceType: 'module'
	})
	const dependencies = {}
	// babel提供的遍历函数，直接找到对应的字段
	traverse(ast, {
		ImportDeclaration({node}) {
			// 节点操作，相对->绝对路径
			const dirname = parth.dirname(filename)
			const newFile = path.join(dirname, node.source.value)
			dependencies[node.source.value] = newFile
		}
	})
	const { code } = babel.transformFromAst(ast, null, {
		presets: ['@babel/preset-env']
	})
	return {
		filename,
		dependencies,
		code,
	}
}

moduleAnalyser('./src/index.js')

const makeDependenciedGraph = entry => {
	const entryNode = moduleAnalyser(entry)
	let graphArray = [entryNode]
	// 依次解析依赖，然后直接放进去
	for(let i=0;i<graphArray.length;i++){
		const item = graphArray[i]
		const {dependencies} = item
		if(dependencies){
			for(let j in dependencies) {
				graphArray.push(moduleAnalyser(dependencies[j]))
			}
		}
	}
}