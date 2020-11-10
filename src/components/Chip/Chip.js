import React from 'react';
import MuiChip from '@material-ui/core/Chip';
import PropTypes from 'prop-types'


const Chip = ({isActive, name, setState}) =>  {

  const handleClick = () => {
    console.info('You clicked the Chip.');

    setState(prevState => {
        if(prevState.includes(name)) {
            return prevState.filter(category => category !== name)
        } else {
            let state = [...prevState]
            state.push(name)
            return state
        }
    })
  };

  const variant = isActive ? "default" : "outlined"

  return (
      <MuiChip
        variant={variant}
        size="medium"
        label={name}
        onClick={handleClick}
        color="primary"
      />
  );
}

Chip.propTypes = {
    isActive: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    setState: PropTypes.func.isRequired,
  }

export default Chip

