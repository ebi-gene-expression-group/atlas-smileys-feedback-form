import React from 'react'
import PropTypes from 'prop-types'

const emojione ={
  smiley: { id: `smiley`, name: `Smiling Face with Open Mouth`, colons: `:smiley:`, text: `:)`, skin: null, native: `😃`},
  disappointed: { id: `disappointed`, name: `Disappointed Face`, colons: `:disappointed:`,  unified: `1f61e`, skin: null, native: `😞` },
  slightly_frowning_face: { id: `slightly_frowning_face`, name: `Slightly Frowning Face`, colons: `:slightly_frowning_face:`, unified: `1f641`, skin: null, native: `🙁` },
  neutral_face: { id: `neutral_face`, name: `Neutral Face`, colons: `:neutral_face:`, unified: `1f610`, skin: null, native: `😐` },
  grin: { id: `grin`, name: `Grinning Face with Smiling Eyes`, colons: `:grin:`, unified: `1f601`, skin: null, native: `😁` },
  satisfied: { id: `laughing`, name: `Smiling Face with Open Mouth and Tightly-Closed Eyes`, colons: `:laughing:`, unified: `1f606`, skin: null, native: `😆` }
}

const Emoji = ({emoji, onLeave, onOver, onClick}) =>{
  return   <span
    key={emoji}
    onClick={(e) => onClick(e)}
    onMouseEnter={(e) => onOver(e)}
    onMouseLeave={(e) => onLeave(e)}
    id={emoji}
  >
    <span style={{fontSize: `40px`}}>{emojione[emoji].native}</span>
  </span>
}

Emoji.propTypes={
  emoji: PropTypes.string.isRquired,
  onLeave: PropTypes.func.isRequired,
  onOver: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
}

export default Emoji