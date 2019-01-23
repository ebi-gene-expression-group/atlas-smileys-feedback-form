import React from 'react'
import renderer from 'react-test-renderer'
import Enzyme from 'enzyme'
import {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Emoji from '../src/Emojione'

Enzyme.configure({ adapter: new Adapter() })

describe(`Emojione`, () => {

  const smileyId = [`disappointed`, `slightly_frowning_face`, `neutral_face`, `grin`, `satisfied`]
  const randoemFace = smileyId[Math.round(Math.random(0,smileyId.length))]
  const props = {
    emoji: randoemFace,
    onLeave: ()=>{},
    onOver: ()=>{},
    onClick: ()=>{},
  }

  test(`should render 2 span components and id equals to emoji id`, () => {
    const wrapper = shallow(<Emoji {...props} />)
    expect(wrapper.find(`span`)).toHaveLength(2)
    expect(wrapper.find(`#${randoemFace}`)).toHaveLength(1)
  })

  test(`matches snapshot`, () => {
    const tree = renderer.create(<Emoji  {...props}/>).toJSON()
    expect(tree).toMatchSnapshot()
  })
})