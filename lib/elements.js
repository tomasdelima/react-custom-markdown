import React from 'react'
import YouTube from 'react-youtube'
import s from 'react-quick-styles'

export default class Elements extends React.Component {
  constructor(props) {
    super(props)
    this.seed = Math.random()
    this.state = {}
  }

  componentWillMount() {
    this.videos = []
  }

  renderByClassName (fragment) {
    fragment = fragment || this.props.fragment
    var {renderString, compileFragment, i} = this.props
    var className = fragment.constructor.name

    switch (className) {
      case 'String':
        return <span key={i} className="string" style={[].merge()}>{fragment}</span>
      case 'Array':
        return fragment.length == 1 ? this.render(fragment[0]) : <span key={i} className="array" style={[s.high()].merge()}>{fragment.map((item, i) => compileFragment(item, i))}</span>
      default:
        return null
    }
  }

  renderByRuleName (fragment) {
    fragment = fragment || this.props.fragment
    var {renderString, compileFragment, i} = this.props

    switch (fragment.rule) {
      case 'literal':
      case 'escape-char':
        return <span key={i} className={fragment.rule}>{fragment.content}</span>
      case 'columns':
        return <div key={i} className="columns" style={[s.flex, s.wrap].merge()}>{fragment.content.map((item, i) => compileFragment(item, i))}</div>
      case 'column':
        return <div key={i} className="column" style={[s.wide(100*fragment.content[1]/12 + "%"), s.minWidth(fragment.content[1] * 30), s.shrink(0)].merge()}>
          <div style={s.padding(5)}>
            {renderString(fragment.content[2])}
          </div>
        </div>
      case 'image':
        var style = fragment.content[2] ? [s.maxWidth(), s.padding(10), {float: fragment.content[2]}] : [s.wide()]
        return <a href={fragment.content[5]}><img key={i} className="image" style={style.merge()} src={fragment.content[3]}/></a>
      case 'youtube':
        if (!this.state[fragment.content]) this.state[fragment.content] = {width: "100%", height: "0"}
        this.videos[fragment.content+this.seed] = this.videos[fragment.content+this.seed] || <YouTube ref={fragment.content} id={fragment.content} videoId={fragment.content} opts={this.state[fragment.content]} onReady={() => this.updateVideoDimensions(fragment.content+this.seed)}/>
        return this.videos[fragment.content]
      case 'left':
      case 'center':
      case 'right':
      case 'justify':
        return <div key={i} className="alignment" style={{textAlign: fragment.rule}}>{renderString(fragment.content[2])}</div>
      case 'margin':
      case 'padding':
        return <div key={i} className={fragment.rule} style={s[fragment.rule](fragment.content[1].split(','))}>{renderString(fragment.content[2])}</div>
      case 'heading':
        return React.createElement("h" + fragment.content[1].length, {key: i, className: 'heading', style: [s.padding(10)].merge()}, fragment.content[2])
      case 'url':
        var url = fragment.content
        return <a key={i} className="url" style={[s.wrapWord].merge()} href={url[3]}>{url[2] || url[3]}</a>
      case 'color':
        return <div key={i} className="color" style={{color: fragment.content[1]}}>{renderString(fragment.content[2])}</div>
      case 'bg':
        return <div key={i} className="bg" style={[s.inline, s.rect(), {backgroundColor: fragment.content[1]}].merge()}>{renderString(fragment.content[2])}</div>
      case 'new-line':
        return <br className="new-line" key={i} />
      default:
        null
    }
  }

  updateVideoDimensions (videoId) {
    var obj = {}
    var e = $('#'+videoId)
    obj[videoId] = {width: e.width(), height: e.width() * 315/560}
    if (this.state[videoId] != obj) {
      this.videos[videoId] = null
      this.setState(obj)
    }
  }

  renderObject (fragment) {
    fragment = fragment || this.props.fragment
    var {renderString, compileFragment, i} = this.props
    var className = fragment.constructor.name

    if (className == 'Object') {
      return <span key={i} className={fragment.rule} style={s[fragment.rule]}>{compileFragment(fragment.content)}</span>
    } else {
      console.error('ERROR!!!: UNKNOWN FRAGMENT: ' + JSON.stringify(fragment))
      return null
    }
  }

  render (fragment) {
    if (this.props.fragment.match && this.props.fragment.match(/^\s*$/)) {
      return null
    } else {
      return this.props.customElementsRenderer(fragment || this.props.fragment, this.props) || this.renderByClassName(fragment) || this.renderByRuleName(fragment) || this.renderObject(fragment)
    }
  }
}