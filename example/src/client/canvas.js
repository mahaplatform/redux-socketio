import React from 'react'
import PropTypes from 'prop-types'
import * as actions from './actions'
import { connect } from 'react-redux'

class Canvas extends React.Component {
  
  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    log: PropTypes.array
  }
  
  _handleReceiveMessage = this._handleReceiveMessage.bind(this)

  render() {
    const { log } = this.props
    return (
      <div className="row">
        <div className="container">
          <div className="col-md-12 text-center">
            <form className="form-inline" onSubmit={ this._handleMessage.bind(this) }>
              <div className="input-group mb-2 mr-sm-2 mb-sm-0 mb-2 mr-sm-2 mb-sm-0">
                <input type="text" className="form-control" placeholder="Message" ref={ node => this.messageText = node } />
              </div>
              <div className="input-group mb-2 mr-sm-2 mb-sm-0 mb-2 mr-sm-2 mb-sm-0">
                <button className="btn btn-block btn-primary">
                  Send
                </button>
              </div>
            </form>
            { log.map((row, index) => (
              <div key={`row_${index}`}>
                { row.text }
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  
  componentDidMount() {
    this.context.network.subscribe('chat', 'message', this._handleReceiveMessage)
  }
  
  componentWillUnmount(e) {
    this.context.network.unsubscribe('chat', 'message', this._handleReceiveMessage)
  }
  
  _handleReceiveMessage(message) {
    this.props.onMessage(message)
  }
  
  _handleMessage(e) {
    e.preventDefault()
    const message = {
      text: this.messageText.value
    }
    this.context.network.message('chat', 'message', message)
  }

}

const mapStateToProps = state => ({
  log: state.log
})

const mapDispatchToProps = {
  onMessage: actions.message
}

export default connect(mapStateToProps, mapDispatchToProps)(Canvas)
