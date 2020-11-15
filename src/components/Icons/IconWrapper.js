import React from 'react'
import PropTypes from 'prop-types'

const IconWrapper = ({ children, size, color }) => {
  return <div onClick={clickHandler}>{children}</div>
}

export default IconWrapper

IconWrapper.defaultProps = {
  fontSize: '',
  color: '',
}

IconWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  size: PropTypes.string,
  color: PropTypes.string,
}
