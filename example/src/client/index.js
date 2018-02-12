import React from 'react'
import ReactDOM from 'react-dom'
import Root from './root'
import Network from './network'
import Canvas from './canvas'

const router = (
  <Root>
    <Network>
      <Canvas />
    </Network>
  </Root>
)

ReactDOM.render(router, document.getElementById('main'))
