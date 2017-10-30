import React from 'react'
import Cell from './Cell'

import head from './assets/snake.png'
import './Snake.css'

const Body = ({xy}) => <Cell className="body" xy={xy} />
const Head = ({xy}) => <Cell className="head" img={head} xy={xy} />

const Snake = ({ positions }) =>
  <ul className="Snake">
    <Head xy={positions[0]} />
    {positions.slice(1).map(
      (xy, i) => <Body key={i} xy={xy} />
    )}
  </ul>

export default Snake