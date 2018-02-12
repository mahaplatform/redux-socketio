import React from 'react'
import PropTypes from 'prop-types'
import * as actions from './actions'
import { connect } from 'react-redux'

class Network extends React.Component {
  
  static childContextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    log: PropTypes.array,
    onJoin: PropTypes.func,
    onLeave: PropTypes.func,
    onAction: PropTypes.func
  }

  render() {
    return this.props.children
  }
  
  getChildContext() {
    return {
      network: {
        subscribe: this._handleSubscribe.bind(this),
        unsubscribe: this._handleUnsubscribe.bind(this),
        message: this._handleMessage.bind(this)
      }
    }
  }
    
  _handleSubscribe(channel, action, handler) {
    this.props.onSubscribe(channel, action, handler)
  }
  
  _handleUnsubscribe(channel, action, handler) {
    this.props.onUnsubscribe(channel, action, handler)
  }
  
  _handleMessage(channel, action, message) {
    this.props.onMessage(channel, action, message)
  }

}

const mapStateToProps = state => ({
})

const mapDispatchToProps = {
  onSubscribe: actions.subscribe,
  onUnsubscribe: actions.unsubscribe,
  onMessage: actions.message
}

export default connect(mapStateToProps, mapDispatchToProps)(Network)
