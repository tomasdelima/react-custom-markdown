import React from 'react'
import Button from './button'

export default class Editor extends React.Component {
  constructor (props) {
    super(props)
    this.captureKeys = this.captureKeys.bind(this)
    this.wrapCursor = this.wrapCursor.bind(this)
    this.wrapSelectedLines = this.wrapSelectedLines.bind(this)
  }

  componentDidMount () {
    this.editor = $("#editor")[0]
  }

  componentWillMount () {
    document.addEventListener("keydown", this.captureKeys)
  }

  componentWillUnmount () {
    document.removeEventListener("keydown", this.captureKeys)
  }

  wrapCursor (before, after) {
    var start, end
    [start, end] = [this.editor.selectionStart, this.editor.selectionEnd].sort((a, b) => a > b)
    var selected = this.editor.value.substring(start, end)
    var newBody = this.editor.value.substring(0, start) + before + selected + after + this.editor.value.substring(end)
    this.props.onChange(newBody)
    this.editor.value = newBody
    this.editor.focus()
    this.editor.selectionStart = start + before.length
    this.editor.selectionEnd = end + before.length
  }

  readSelectedLines () {
    var start, end
    [start, end] = [this.editor.selectionStart, this.editor.selectionEnd].sort((a, b) => a > b)
    var remaining = start
    var count = 0
    var previousLines = []
    var selectedLines = []
    var nextLines = []
    var lines = this.editor.value.split("\n").map((l) => {
      remaining -= l.length + 1

      if (remaining >= 0) {
        previousLines.push(l)
      } else if (count > end) {
        nextLines.push(l)
      } else {
        selectedLines.push(l)
      }

      count += l.length + 1
      return l
    })

    return {start, end, selected: this.editor.value.substring(start, end), previousLines, nextLines, selectedLines, lines}
  }

  wrapSelectedLines (before, after) {

    var lines = this.readSelectedLines()
    var selectedLines = lines.selectedLines.map((l) => before + l + after + "\n").join('')

    var start, end
    [start, end] = [this.editor.selectionStart, this.editor.selectionEnd].sort((a, b) => a > b)
    var newBody = lines.previousLines.map((l) => l + "\n").join('') + selectedLines + lines.nextLines.join("\n")
    this.props.onChange(newBody)
    this.editor.value = newBody
    this.editor.focus()
    this.editor.selectionStart = start + before.length
    this.editor.selectionEnd = end + before.length + (before.length + after.length) * (lines.selectedLines.length - 1)
  }

  captureKeys (event) {
    if (event.ctrlKey && (event.key == "s" || event.key == "S")) {
      this.props.changed ? this.props.onSave() : null
      event.preventDefault()
    }

    if (event.key == "Tab") {
      this.wrapSelectedLines("  ", "")
      event.preventDefault()
    }

    if (event.key == "Enter" && this.readSelectedLines().selected.length == 0) {
      var indent = this.readSelectedLines().selectedLines[0].match(/^ +/) || ""
      this.wrapCursor("\n" + indent, "")
      event.preventDefault()
    }
  }

  renderButton (label, alt, before, after, wrapSelectedLines) {
    return <Button wrapMethod={wrapSelectedLines ? this.wrapSelectedLines : this.wrapCursor} editor={this.editor} label={label} alt={alt} before={before} after={after}/>
  }

  render () {
    var separator = <span style={s.wide(5)}/>

    return <div>
      <div style={s.flex}>
        {this.renderButton('bold', 'Negrito', '*', '*')}
        {this.renderButton('underline', 'Sublinhado', '_', '_')}
        {this.renderButton('italic', 'Itálico', '/', '/')}

        {separator}

        {this.renderButton('picture-o', 'Imagem', '[image:', ']')}
        {this.renderButton('link', 'URL', '[url:', ']')}
        {this.renderButton('youtube', 'YouTube', '[youtube:', ']')}
        {this.renderButton('header', 'Título (permite múltiplos "#")', '#', '')}

        {separator}

        {this.renderButton('expand', 'Margem (espaçamento externo)', '<margin:10:', ':margin>')}
        {this.renderButton('compress', 'Padding (espaçamento interno)', '<padding:10:', ':padding>')}

        {separator}

        {this.renderButton('font', 'Cor da fonte', '<color:red:', ':color>')}
        {this.renderButton('tint', 'Cor de fundo', '<bg:red:', ':bg>')}

        {separator}

        {this.renderButton('align-left', 'Alinhar à esquerda', '<l:\n', '\n:l>')}
        {this.renderButton('align-right', 'Alinhar à direita', '<r:\n', '\n:r>')}
        {this.renderButton('align-justify', 'Justificar', '<j:\n', '\n:j>')}
        {this.renderButton('align-center', 'Alinhar ao centro', '<c:\n', '\n:c>')}
        {this.renderButton('indent', 'Indentar', '  ', '', true)}
      </div>

      <textarea id="editor" onChange={this.props.onChange} value={this.props.body} style={[s.wide("calc(100% - 6px)"), s.high(300), s.margin(10, 0), {resize: "vertical"}].merge()}/>
    </div>
  }
}
