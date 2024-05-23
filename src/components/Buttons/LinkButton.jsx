import React from 'react'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'; 

import useStyles from './styles'

const LinkButton = ({title, onclick, keyname, url, size}) => {
  const classes = useStyles()
  return (
   <Button size={size} onClick={onclick} key={keyname} className={classes.buttonstyle}>
       <Link to={url} className={classes.linkstyle} >
                      {title}
            </Link>
    </Button>
  )
}

export default LinkButton