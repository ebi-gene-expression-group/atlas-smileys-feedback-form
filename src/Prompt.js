import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Emoji from './Emojione'

const SmileyFace = styled.div`
  transition: all 0.5s;
  cursor: pointer;
  opacity: ${props => props.status ? 1.0 : 0.2};
  &:hover {
    opacity: 1.0
  };
`

const SmileyContainer = styled.div`
  display: flex;
  justify-content: space-around;
`

class Prompt extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      smileyDescription: ``,
      chosenSmiley: ``
    }
    this.onClick = this.onClick.bind(this)
  }

  onClick(description){
    this.setState({
      chosenSmiley: description
    })
    this.props.onSelect(description)
  }

  render() {
    const {smileyDescription, chosenSmiley} = this.state
    const smileyScale = [`Terrible`, `Bad`, `Okay`, `Good`, `Great`]
    const smileyId = [`disappointed`, `slightly_frowning_face`, `neutral_face`, `grin`, `satisfied`]

    return(
      <div>
        <p>How satisfied are you ?</p>
        <br/>
        <SmileyContainer>
          {
            smileyScale.map((scale, idx) =>
              <SmileyFace key={scale} status={chosenSmiley === scale}>
                <Emoji emoji={smileyId[idx]}
                  onLeave={() => this.setState({smileyDescription: ``})}
                  onOver={() => this.setState({smileyDescription: scale})}
                  onClick={() => this.onClick(scale)}/>
              </SmileyFace>
            )
          }
        </SmileyContainer>
        <p id={`scale`} style={{visibility: chosenSmiley || smileyDescription ? `visible` : `hidden`, textAlign: `center`}}>
          { smileyDescription || chosenSmiley || `empty` }
        </p>
        <br/>
        <a href={this.props.feedbackFormLink}>Click here to add a comment. </a>
      </div>
    )
  }
}

Prompt.propTypes = {
  onSelect: PropTypes.func.isRequired,
  feedbackFormLink: PropTypes.string.isRequired
}

export default Prompt