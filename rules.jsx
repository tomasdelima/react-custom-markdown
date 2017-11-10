export default [
  {name: 'literal', regexp: (/\[literal:([\s\S]+?):literal\]/), stopRulesPropagation: true},

  {name: 'columns', regexp: (/\<columns:\s*([\s\S]+?)\s*:columns\>\s*/)},
  {name: 'columns', regexp: (/\<columns2:\s*([\s\S]+?)\s*:columns2\>\s*/)},
  {name: 'column',  regexp: (/\<column:([1-9]|1[0-2])?:\s*([\s\S]+?)\s*:column\>\s*/),   i: 2, multiMatch: true},
  {name: 'column',  regexp: (/\<column2:([1-9]|1[0-2])?:\s*([\s\S]+?)\s*:column2\>\s*/), i: 2, multiMatch: true},

  {name: 'left',    regexp: (/\[l(eft)?:([\s\S]+?):l(eft)?\]/),                i: 2, multiMatch: true},
  {name: 'left',    regexp: (/\<l(eft)?:\s*([\s\S]+?)\s*:l(eft)?\>\s*/),       i: 2, multiMatch: true},
  {name: 'center',  regexp: (/\[c(enter)?:([\s\S]+?):c(enter)?\]/),            i: 2, multiMatch: true},
  {name: 'center',  regexp: (/\<c(enter)?:\s*([\s\S]+?)\s*:c(enter)?\>\s*/),   i: 2, multiMatch: true},
  {name: 'right',   regexp: (/\[r(ight)?:([\s\S]+?):r(ight)?\]/),              i: 2, multiMatch: true},
  {name: 'right',   regexp: (/\<r(ight)?:\s*([\s\S]+?)\s*:r(ight)?\>\s*/),     i: 2, multiMatch: true},
  {name: 'justify', regexp: (/\[j(ustify)?:([\s\S]+?):j(ustify)?\]/),          i: 2, multiMatch: true},
  {name: 'justify', regexp: (/\<j(ustify)?:\s*([\s\S]+?)\s*:j(ustify)?\>\s*/), i: 2, multiMatch: true},

  {name: 'page',     regexp: (/\[page:(.+?)\]/),                                 stopRulesPropagation: true},
  {name: 'argument', regexp: (/\[argument:(\d+?)\]/),                            stopRulesPropagation: true},
  {name: 'image',    regexp: (/\[image:((left|right):)?(http.?:.+?)(:(.+))?\]/), stopRulesPropagation: true, multiMatch: true},
  {name: 'url',      regexp: (/\[url:(([^\]]+?):)?(http\S+?)\]/),                stopRulesPropagation: true, multiMatch: true},
  {name: 'youtube',  regexp: (/\[youtube:(.+?)\]/)},

  {name: 'new-line',    regexp: (/(\n|\\n)/), stopRulesPropagation: true},
  {name: 'escape-char', regexp: (/\\(.)/)},
  {name: 'heading',     regexp: (/(?:^|\n)(\#+) *(.+)/), multiMatch: true},
  {name: 'bold',        regexp: (/\[bold:([\s\S]+):bold\]/)},
  {name: 'bold',        regexp: (/\*([\s\S]+?)\*/)},
  {name: 'italic',      regexp: (/\/([\s\S]+?)\//)},
  {name: 'underline',   regexp: (/\_([\s\S]+?)\_/)},
  {name: 'quote',       regexp: (/\[quote:([\s\S]+):quote\]/)},
  {name: 'quote',       regexp: (/\`([\s\S]+?)\`/)},

  {name: 'color', regexp: (/\[color:(.+?):\s*([\s\S]+?)\s*:color\]/),    multiMatch: true},
  {name: 'color', regexp: (/\<color:(.+?):\s*([\s\S]+?)\s*:color\>\s*/), multiMatch: true},
  {name: 'bg',    regexp: (/\[bg:(.+?):\s*([\s\S]+?)\s*:bg\]/),          multiMatch: true},
  {name: 'bg',    regexp: (/\<bg:(.+?):\s*([\s\S]+?)\s*:bg\>\s*/),       multiMatch: true},
]
