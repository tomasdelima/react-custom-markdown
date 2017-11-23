import React from 'react'

export default class EditorButton extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.toggleTooltip = this.toggleTooltip.bind(this)
  }

  toggleTooltip (show) {
    this.setState({showTooltip: show})
  }

  render () {
    return <div style={[s.relative, s.flex, s.column, s.wide(28)].merge()} onMouseEnter={() => this.toggleTooltip(true)} onMouseLeave={() => this.toggleTooltip(false)}>
      <button style={s.wide(28)} onClick={() => this.props.wrapMethod(this.props.before, this.props.after)}>
        <i alt={this.props.alt} className={"fa fa-"+this.props.label}/>
      </button>

      {this.state.showTooltip && <div className="editor-button-tooltip" style={[s.absolute, s.top("calc(100% + 7px)"), s.BG("#393939"), s.white, s.size(13), s.noWrap, s.padding(7), s.radius(4), {alignSelf: 'center', fontFamily: 'sans-serif'}].merge()}>
        {this.props.alt}
      </div>}
    </div>
  }
}
