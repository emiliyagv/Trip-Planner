import React from 'react'
import { Button } from '@mui/material'
import useStyles from './styles'

const Buttons = ({title, onclick, keyname, type, size, color, variant}) => {
  const classes = useStyles()
  return (
   <Button onClick={onclick} role="button" key={keyname} color={color} variant={variant} size={size} className={classes.buttonstyle} type={type}>{title}</Button>
  )
}

export default Buttons