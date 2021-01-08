import React from 'react'
import MuiChip from '@material-ui/core/Chip'
import PropTypes from 'prop-types'

const CategoryChip = ({ isActive, id, name, setState, globalState }) => {
  const handleClick = () => {
    if (globalState) {
      setState(id)
    } else {
      setState(prevState => {
        if (prevState.includes(id)) {
          return prevState.filter(category => category !== id)
        } else {
          let state = [...prevState]
          state.push(id)
          return state
        }
      })
    }
  }

  const variant = isActive ? 'default' : 'outlined'

  return (
    <MuiChip
      variant={variant}
      size="medium"
      label={name}
      onClick={handleClick}
      color="primary"
    />
  )
}

CategoryChip.defaultProps = {
  globalState: false,
}

CategoryChip.propTypes = {
  isActive: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  setState: PropTypes.func.isRequired,
  globalState: PropTypes.bool,
}

export default CategoryChip
