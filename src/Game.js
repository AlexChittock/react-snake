import React, { Component } from 'react'

import Snake from './Snake'
import Food from './Food'
import { CELL_SIZE } from './scale'

const noop = () => {}

const Controls = ({ onClick = noop }) =>
  <div className="Controls" onClick={onClick}>▶︎</div>

const equalDimensions = (dimensions, obj1, obj2) =>
  dimensions.reduce((res, cur) => res && obj1[cur] === obj2[cur], true)

const hitTest = (pos1, pos2) =>
  equalDimensions([0, 1], pos1, pos2)

class Game extends Component {
  constructor(props) {
    super(props)

    this.setSize(this.props)
    
    this.bind()

    this.state = this.getInitialState()
  }

  setSize({ x = 20, y = 20 }) {
    this.bounds = [ x, y ]
    this.width = CELL_SIZE * x
    this.height = CELL_SIZE * y
  }

  bind() {
    window.onkeydown = (e) => {
      if (-1 === [37, 38, 39, 40].indexOf(e.which)) {
        return
      }

      this.setState({
        direction: [
          37 === e.which ? -1 : 39 === e.which ? 1 : 0,
          38 === e.which ? -1 : 40 === e.which ? 1 : 0
        ]
      })
    }
  }

  getInitialState() {
    return {
      direction: [1, 0],
      snake: [[3, 5], [2, 5], [1, 5]],
      food: [[5, 2], [6, 12], [8, 10]],
      isPaused: true
    }
  }

  componentDidMount() {
    this.loop()
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId)
  }

  loop() {
    this.spawnFood()
    this.moveSnake()
    if (!this.state.isPaused) {
      this.timeoutId = setTimeout(() => this.loop(), 250 + 10 * Math.max(0, 20 - this.state.snake.length))
    }
  }

  spawnFood() {
    if (Math.random() < 0.8) {
      return
    }
    
    let next = null;
    do {
      next = this.bounds.map(v => Math.floor(Math.random()*v))
    } while (this.state.snake.concat(this.state.food).some(hitTest.bind(null, next)))
  
    const food = this.state.food.concat([next])
    this.setState({
      food: food
    })
  }
  

  moveSnake() {
    const next = this.state.snake[0].map((v, k) => v + this.state.direction[k])
    const test = hitTest.bind(null, next)
    if (
      !next.reduce((res, pos, k) => res && pos < this.bounds[k] && pos >= 0 , true) ||
      this.state.snake.some(test)
    ) {
      this.setState({
        isPaused: true
      })
      return
    }

    const eating = this.state.food.some(test)
    this.setState({
      snake: [next].concat(this.state.snake.slice(0, eating ? undefined : -1)),
      food: this.state.food.filter(pos => !hitTest(pos, next))
    })
  }

  reset() {
    this.setState(Object.assign({}, this.getInitialState(), {
      isPaused: false
    }), () => this.loop())
  }

  render() {
    return (
      <div className={["Game", this.state.isPaused && "paused"].join(' ')} style={{
        width: this.width,
        height: this.height
      }}>
        <Snake positions={this.state.snake} />
        <Food positions={this.state.food} />
        {this.state.isPaused && <Controls onClick={() => this.reset()}/>}
      </div>
    )
  }
}

export default Game