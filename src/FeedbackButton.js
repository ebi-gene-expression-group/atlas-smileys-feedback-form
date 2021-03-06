import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
import Popup from 'react-popup'
import ReactGA from 'react-ga'

import Prompt from './Prompt'

const FeedbackButtonDiv = styled.button`
  position: fixed;
  bottom: 50%;
  right: 0;
  display: inline-block;
  background-color: #3497c5;
  color: white;
  font-size: 1.2rem;
  padding: 0.25rem 0.25rem 1rem 0.25rem;
  transition: all 0.2s;
  margin: -45px;
  :hover {
    background-color: #2f5767;
    cursor: pointer;
  }
  box-shadow: 2px 2px 3px #999;
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

    Popup.registerPlugin(
      `prompt`,
      (smileyScore, smileyChange, callback) => {
        Popup.create({
          title: `Your feedback`,
          content: <Prompt feedbackFormLink={props.feedbackFormLink} onSelect={smileyChange}/>,
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
    Popup.plugins().prompt(
      this.state.smileyScore,
      this.smileyChange,
      () => { Popup.alert(`Thank you for submitting your feedback.`) }
    )
  }

  render() {
    ReactGA.initialize(this.props.gaId)
    ReactGA.pageview(window.location.pathname + window.location.search)

    return (
      <div>
        <Popup />
        <FeedbackButtonDiv onClick={this.onClick}>
          <i className={`icon icon-functional`} data-icon={`n`} style={{paddingRight: `0.5rem`}}></i>Feedback
        </FeedbackButtonDiv>
      </div>
    )
  }
}

FeedbackButton.propTypes = {
  feedbackFormLink: PropTypes.oneOf([
    `https://www.ebi.ac.uk/support/gxa`,
    `https://www.ebi.ac.uk/support/gxasc`]).isRequired,
  gaId: PropTypes.string.isRequired
}

export default FeedbackButton
