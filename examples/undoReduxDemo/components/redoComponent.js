import React, { Component } from 'react'
import {Button} from 'react-bootstrap'

export default class RedoComponent extends Component {
  render() {
    const {values, onIncrease, onDecrease, onRedo, onUndo} = this.props;
    return (
      <div>
        <p>clicked {values}</p>
        <Button variant="primary" onClick={onIncrease}>＋</Button>
        <Button variant="primary" onClick={onDecrease}>ー</Button>
        <Button variant="primary" onClick={onUndo}>undo</Button>
        <Button variant="primary" onClick={onRedo}>redo</Button>
      </div>
    )
  }
}