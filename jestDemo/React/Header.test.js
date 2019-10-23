import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import App from './App'

Enzyme.configure({adapter: new Adapter()})
// 模拟输入事件
it('event Test', () => {
	const container = shallow(<App />)
	const inputE = container.find('[data-test="input"]')
	const userInput = '123'
	inputE.simulate('change', {
		target: {value: userInput}
	})
	expect(container.state('value')).toEqual(userInput)
	const newInputE = container.find('[data-test="input"]')
	expect(newInputE.prop('value')).toEqual(userInput)
})
// 模拟回车
it('event Test', () => {
	const fn = jest.fn()
	const container = shallow(<App addItem={fn} />)
	const inputE = container.find('[data-test="input"]')
	container.setState({value: '123'})
	inputE.simulate('keyup', {
		keyCode: 13
	})
	expect(fn).toHaveBeenCalled()
	expect(fn).toHaveBeenCalledWith('123')
})