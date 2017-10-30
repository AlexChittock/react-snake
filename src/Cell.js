import React from 'react'
import grid, { CELL_SIZE } from './scale'
import './Cell.css'

const Cell = ({ xy, className, img = "" }) => {
  // console.log('f', xy[0], xy[1])
  return <li className={[className, "cell"].join(" ")} style={Object.assign({
    backgroundImage: 'url(' + img + ')'
  }, {
    top: grid(xy[1]),
    left: grid(xy[0]),
    width: CELL_SIZE,
    height: CELL_SIZE
  })} />
}

export default Cell