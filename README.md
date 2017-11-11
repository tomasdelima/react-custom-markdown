## react-custom-markdown

A React component that allows flexible, customizable and scaleable text compiling. This component is inspired on the original concept of the Markdown language, though different in specific rules.

## Installation

    $ npm install react-custom-markdown --save

  Thats all!

## Usage

Before using this lib, it is needed to understand it's core concept. The goal is to transform a string into the desired HTML code. For such, it is needed a set of rules and a rendering function. This library comes with a many rules (`lib/rules.js`) and a rendering method for each (`lib/elements.js`) from which new ones can be derived.

```javascript
<CustomMarkdown customRules={...} customElementsRenderer={...}>
  ...
</CustomMarkdown>
```

### Creating your own rules and elements

Let's say we want to create a simple custom element which, given the rule `!!!some text!!!`, outputs to `<strong>some text</strong>`.

1. The rule must be an array of objects, each containing the keys `name` and `regexp`. The `name` value will be used in the rendering function and the `regexp` value must have the matched text in a group:

```javascript
var customRules = [{name: 'strong', regexp: /\!\!\!(.+)\!\!\!/}]
```

2. The rendering function must return either a valid renderable React object or nothing (null, undefined, 0, false). The function receives a `fragment` argument with the matched data and a `props` argument for further uses:

```javascript
var customELementsRenderer = function (fragment, props) {
  if (fragment.rule == "strong") {
    return <strong>{fragment.content}</strong>
  }
}
```

The outcome would be:

```javascript
<CustomMarkdown customRules={customRules} customElementsRenderer={customElementsRenderer}>
  some text
</CustomMarkdown>
```

**Note**: depending on you are writing React code, it may be needed to use `customElementsRenderer={customElementsRenderer.bind(this)}`

If the given child string does not match any of the given or predefined rules, it will be rendered as plain text.

## Code Example

The code bellow uses some of the predefined rules and elements in this lib:

```javascript
import CustomMarkdown from 'react-custom-markdown'

<CustomMarkdown customElementsRenderer={...} customRules={...}>
  [left:this is left:left]
  [right:this is right:right]
  [justify:this is justified:justify]
  [center:this is centered:center]
  this is an image: [image:https://i.ytimg.com/vi/6KQPhoCICcs/maxresdefault.jpg]
  this is url 1: [url:https://i.ytimg.com/vi/6KQPhoCICcs/maxresdefault.jpg]
  [url:this is url 2:https://i.ytimg.com/vi/6KQPhoCICcs/maxresdefault.jpg]
</CustomMarkdown>
```

## List of predefined rules and elements

- Literal text: `[literal:some text:literal]`.
- Literal character: `\X`, where `X` is the character.
- Align left: `[l:some text:l]` or `[left:some text:left]` or `<l:some text:l>` or `<left:some text:left>`.
- Align center: `[c:some text:c]` or `[center:some text:center]` or `<c:some text:c>` or `<center:some text:center>`.
- Align right: `[r:some text:r]` or `<r:some text:r>` or `[right:some text:right]` or `<right:some text:right>`.
- Justified: `[j:some text:j]` or `<j:some text:j>` or `[justify:some text:justify]` or `<justify:some text:justify>`.
- Image: `[image:image.url/foo.jpg]` or `[image:left:image.url/foo.jpg]` or `[image:right:image.url/foo.jpg]` or `[image:image.url/foo.jpg:url.on.click.com]` or `[image:left:image.url/foo.jpg:url.on.click.com]` or `[image:right:image.url/foo.jpg:url.on.click.com]`.
- URL: `[url:your.url.com]` or `[url:some text:your.url.com]`.
- YouTube: `[youtube:video-id]`.
- New line: `\n`.
- Heading: `# Some Text`, `## Some Text`, `### Some Text`, ...
- Bold: `*some text*` or `[bold:some text:bold]`.
- Italic: `/some text/`.
- Underline: `_text_`.
- Quote: `some text` or `[quote:some text:quote]`.
- Text color: `[color:your-color:some text:color]` or `<color:your-color:some text:color>`; CSS colors allowed.
- Background color: `[bg:your-color:some text:bg]` or `<bg:your-color:some text:bg>`; CSS colors allowed.
- Column: `<columns:[ ... ]:columns>` and `<column:number:some text:column>`. See example below:

```
<columns:
  <column:6:this column is 6/12 wide:column>
  <column:4:this column is 4/12 wide:column>
  <column:2:this column is 2/12 wide:column>
:columns>
```

Note: the rules that start with `<` and end with `>` allow for multilining, as the example above.

## Contributors

Feel free to suggest improvements. PRs are welcome!

## License

MIT
