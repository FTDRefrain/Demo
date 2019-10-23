import React, {Component} from 'react'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import App from './App'

Enzyme.configure({adapter: new Adapter()})

class Todo extends Component {
	constructor(){}
	handleAddItem(){}
}

// 属性测试
it('render test', () => {
	// 浅复制，
	const container = shallow(<App />)
	expect(container.find('.App').length).toBe(1)
	expect(container.find('.App').prop('title')).toBe('123')
	// 解耦的方式，避免class变化
	expect(container.find('[data-test="App"]').prop('title')).toBe('123')
})
// 模拟给Header传递函数
it('addItem to header', () => {
	const container = shallow(<App />)
	const header = container.find('Header')
	// 即子组件上的方法是父组件上的方法
	expect(header.prop('addItem')).toBe(container.instance().handleAddItem)	
})