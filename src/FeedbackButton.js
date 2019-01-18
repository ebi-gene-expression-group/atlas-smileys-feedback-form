import React from 'react'
import styled from 'styled-components'
import Popup from 'react-popup'
import PropTypes from 'prop-types'

import Prompt from './Prompt'
import ReactGA from 'react-ga'

const FeedbackButtonDiv = styled.button`
  position:fixed;
  bottom:40%;
  right:0px;
  display: inline-block;
  border-radius: 0px;
  background-color: #3497c5;
  border: none;
  color: white;
  text-align: center;
  font-size: 18px;
  padding: 2px;
  width: 120px;
  height: 30px;
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

class FeedbackButton extends React.Component{

  constructor(props) {
    super(props)

    this.state = {
      smiley: ``
    }
    this.onClick = this.onClick.bind(this)
    this.smileyChange = this.smileyChange.bind(this)
  }

  smileyChange(smileyValue){
    this.setState(
      {smiley: smileyValue},
      () => {
        Popup.close() 
        this.onClick()
      })
  }

  onClick(){
    const {feedbackFormLink} = this.props

    Popup.registerPlugin(`prompt`, function (smiley, smileyChange, callback) {
      this.create({
        title: `Your feedback`,
        content: <Prompt feedbackFormLink={feedbackFormLink} onSelect={smileyChange} />,
        buttons: {
          left: [`cancel`],
          right: smiley ? [{
            text: `Save`,
            className: `success`,
            action: function () {
              console.log(`in`,smiley)
              callback()
              smiley && ReactGA.event({
                category: `Satisfaction`,
                action: smiley
              })
              smiley && Popup.close()
            }
          }] : []
        }
      })
    })

    Popup.plugins().prompt(this.state.smiley, this.smileyChange, function () {
      Popup.alert(`Thank you for submitting your feedback.`)
    })

  }

  render(){
    ReactGA.initialize(this.props.GAid)
    ReactGA.pageview(window.location.pathname + window.location.search)

    return(
      <div>
        <Popup defaultOk={`OK`} />
        <FeedbackButtonDiv id={`feedback-button`} onClick={this.onClick}>
          <i className={`icon icon-common icon-comment-alt`}></i> Feedback
        </FeedbackButtonDiv>
      </div>
    )
  }
}

FeedbackButton.propTypes = {
  feedbackFormLink: PropTypes.string.isRequired,
  GAid: PropTypes.string.isRequired
}

export default FeedbackButton
