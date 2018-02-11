import React from 'react'
import PropTypes from 'prop-types'
import * as actions from './actions'
import { connect } from 'react-redux'

class Canvas extends React.Component {

  static propTypes = {
    log: PropTypes.array,
    onJoin: PropTypes.func,
    onLeave: PropTypes.func,
    onAction: PropTypes.func
  }

  render() {
    const { log } = this.props
    return (
      <div className="row">
        <div className="container">
          <div className="col-md-12 text-center">
            <form className="form-inline" onSubmit={ this._handleJoin.bind(this) }>
              <div className="input-group mb-2 mr-sm-2 mb-sm-0 mb-2 mr-sm-2 mb-sm-0">
                <input type="text" className="form-control" placeholder="Channel" ref={ node => this.joinChannel = node } />
              </div>
              <div className="input-group mb-2 mr-sm-2 mb-sm-0 mb-2 mr-sm-2 mb-sm-0">
                <button className="btn btn-block btn-primary">
                  Join
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="container">
          <div className="col-md-12 text-center">
            <form className="form-inline" onSubmit={ this._handleLeave.bind(this) }>
              <div className="input-group mb-2 mr-sm-2 mb-sm-0 mb-2 mr-sm-2 mb-sm-0">
                <input type="text" className="form-control" placeholder="Channel" ref={ node => this.leaveChannel = node } />
              </div>
              <div className="input-group mb-2 mr-sm-2 mb-sm-0 mb-2 mr-sm-2 mb-sm-0">
                <button className="btn btn-block btn-primary">
                  Leave
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="container">
          <div className="col-md-12 text-center">
            <form className="form-inline" onSubmit={ this._handleMessage.bind(this) }>
              <div className="input-group mb-2 mr-sm-2 mb-sm-0 mb-2 mr-sm-2 mb-sm-0">
                <input type="text" className="form-control" placeholder="Channel" ref={ node => this.messageChannel = node } />
              </div>
              <div className="input-group mb-2 mr-sm-2 mb-sm-0 mb-2 mr-sm-2 mb-sm-0">
                <input type="text" className="form-control" placeholder="Message" ref={ node => this.messageText = node } />
              </div>
              <div className="input-group mb-2 mr-sm-2 mb-sm-0 mb-2 mr-sm-2 mb-sm-0">
                <button className="btn btn-block btn-primary">
                  Send
                </button>
              </div>
            </form>
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>TYPE</th>
                  <th>CHANNEL</th>
                  <th>RESULT</th>
                  <th>DATA</th>
                </tr>
              </thead>
              <tbody>
                { log.map((row, index) => (
                  <tr key={`row_${index}`}>
                    <td>{ row.type }</td>
                    <td>{ row.channel }</td>
                    <td>{ JSON.stringify(row.meta) }</td>
                    <td>{ JSON.stringify(row.data) }</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>        
      </div>
    )
  }
  
  _handleJoin(e) {
    e.preventDefault()
    this.props.onJoin(this.joinChannel.value)
  }
  
  _handleLeave(e) {
    e.preventDefault()
    this.props.onLeave(this.leaveChannel.value)
  }
  
  _handleMessage(e) {
    e.preventDefault()
    const data = {
      action: 'message',
      text: this.messageText.value
    }
    this.props.onMessage(this.messageChannel.value, data)
  }

}

const mapStateToProps = state => ({
  log: state.log
})

const mapDispatchToProps = {
  onJoin: actions.join,
  onLeave: actions.leave,
  onMessage: actions.message,
  onAction: actions.action,
}

export default connect(mapStateToProps, mapDispatchToProps)(Canvas)
