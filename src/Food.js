import React from 'react'

import Cell from './Cell'

import './Food.css'
import icon from './assets/rabbit.png'

const Food = ({ positions }) => <div>
    {positions.map((xy, i) => <Cell key={i} className="food" img={icon} xy={xy} />)}
  </div>

export default Food