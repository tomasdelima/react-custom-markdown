import React, { Component } from 'react'
import Elements from './elements'
import Rules from './rules'

export default class Markdown extends React.Component {
  constructor(props) {
    super(props)

    this.i = 0
    this.renderString = this.renderString.bind(this)
    this.compileFragment = this.compileFragment.bind(this)
    global.Page = this.props.Page
  }

  fragmentString (str) {
    var rule = this.firstMatchedRule(str)
    if (rule) {
      var index = str.search(rule.regexp)
      var length = str.match(rule.regexp)[0].length
      var before = str.slice(0, index)
      var matched = str.match(rule.regexp)
      var fragmentedMatched = rule.stopRulesPropagation ? matched[1] : this.fragmentString(matched[rule.i || 1])
      var result = [this.fragmentString(before), {content: rule.multiMatch ? matched : fragmentedMatched, rule: rule.name, type: rule.type}]

      var after = str.slice(index + length)
      var fragmentedAfter = this.fragmentString(after)
      result = fragmentedAfter.constructor.name == "Array" ? [...result, ...fragmentedAfter] : [...result, fragmentedAfter]

      return result.compact().flatten()
    } else {
      return str
    }
  }

  firstMatchedRule (str) {
    var sortedRules = Rules.map((rule) => [str.search(rule.regexp), rule]).sort((a, b) => a[0]-b[0])
    var filteredRules = sortedRules.filter((rule) => rule[0] >= 0).map((rule) => rule[1])
    return filteredRules[0]
  }

  compileFragment (fragment) {
    if (fragment) {
      this.i += 1
      return <Elements key={this.i} fragment={fragment} renderString={this.renderString} compileFragment={this.compileFragment} i={this.i} args={this.props.args} />
    } else {
      return null
    }
  }

  renderString (str) {
    return this.compileFragment(this.fragmentString(str))
  }

  render () {
    return this.renderString(this.props.children, 1)
  }
}
