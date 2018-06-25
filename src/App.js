import React, { Component } from 'react';
import './App.css';

class App extends Component {
  lines = [0, 1, 2, 3, 4, 5]
  line = (value, ix) => <div key={ix} tabIndex={0} className="line">{value}</div>
  parent = null

  componentDidMount() {
    window.addEventListener('keydown', this.handleKey)
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKey)
  }

  render() {
    return (
      <div>
        <input tabIndex={0} autoFocus={true} />
        <div ref={el => this.parent = el}>
          {this.lines.map(this.line)}
        </div>
      </div>
    )
  }

  handleKey = (e) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
    e.preventDefault()

    const el = e.key === 'ArrowDown' ? this.getNextSibling(e.target) : this.getPrevSibling(e.target)
    el.focus()
  }

  getNextSibling = (el) => {
    const { els, pos } = this.getPos(el)
    const nextPos = pos === els.length - 1 ? 0 : pos + 1
    return els[nextPos]
  }

  getPrevSibling = (el) => {
    const { els, pos } = this.getPos(el)
    const prevPos = pos === 0 ? els.length - 1 : pos - 1
    return els[prevPos]
  }

  getPos = (el) => {
    const els = [ ...this.parent.querySelectorAll('[tabIndex]') ]
    return {
      els,
      pos: els.indexOf(el)
    }
  }
}

export default App
