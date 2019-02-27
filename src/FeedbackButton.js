import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import Popup from 'react-popup'
import ReactGA from 'react-ga'

import Prompt from './Prompt'

const FeedbackButtonDiv = styled.button`
  position: fixed;
  bottom: 50%;
  right: 0px;
  display: inline-block;
  border-radius: 0px;
  background-color: #3497c5;
  border: none;
  color: white;
  text-align: center;
  font-size: 1.2rem;
  padding: 0.25rem;
  transition: all 0.2s;
  margin: -40px;
  &:hover {
    background-color: #2f5767;
    cursor: pointer;
  }
  box-shadow: 2px 2px 3px #999;
  -ms-transform: rotate(-90deg); /* IE 9 */
  -webkit-transform: rotate(-90deg); /* Safari 3-8 */
  transform: rotate(-90deg);
`

class FeedbackButton extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      smileyScore: null
    }

    this.onClick = this.onClick.bind(this)
    this.smileyChange = this.smileyChange.bind(this)
  }

  smileyChange(smileyScore) {
    this.setState(
      { smileyScore: smileyScore },
      () => {
        Popup.close()
        this.onClick()
      })
  }

  onClick() {
    const {feedbackFormLink} = this.props

    Popup.registerPlugin(
      `prompt`,
      (smileyScore, smileyChange, callback) => {
        Popup.create({
          title: `Your feedback`,
          content: <Prompt feedbackFormLink={feedbackFormLink} onSelect={smileyChange}/>,
          buttons: {
            left: [`cancel`],
            right: smileyScore ?
              [{
                text: `Submit`,
                className: `success`,
                action: () => {
                  callback()
                  smileyScore && ReactGA.event({
                    category: `Satisfaction`,
                    action: smileyScore.toString()
                  })
                  smileyScore && Popup.close()
                }
              }] :
              []
          }
        })
      }
    )

    Popup.plugins().prompt(
      this.state.smileyScore,
      this.smileyChange,
      () => { Popup.alert(`Thank you for submitting your feedback.`) }
    )
  }

  render() {
    ReactGA.initialize(this.props.gaId)
    ReactGA.pageview(window.location.pathname + window.location.search)

    return(
      <div>
        <Popup defaultOk={`Ok`} />
        <FeedbackButtonDiv onClick={this.onClick}>
          <i className={`icon icon-functional`} data-icon={`n`} style={{paddingRight: `0.5rem`}}></i>Feedback
        </FeedbackButtonDiv>
      </div>
    )
  }
}

FeedbackButton.propTypes = {
  feedbackFormLink: PropTypes.string.isRequired,
  gaId: PropTypes.string.isRequired
}

export default FeedbackButton
