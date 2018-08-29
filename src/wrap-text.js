'use strict'

module.exports = function extendCanvas () {
  CanvasRenderingContext2D.prototype.wrapText = function (text, x, y, width, lineHeight) {
    if (typeof text !== 'string') throw new Error('text not string')

    function toNumber (val, defaultVal = 0) {
      if (Number.isNaN(Number(defaultVal))) throw new Error('defaultVal type must be number')
      let valNum = Number(val)
      return Number.isNaN(valNum) ? defaultVal : valNum
    }

    function toLines (text) {
      let words = text.split('')
      let wordsLen = words.length
      let line = ''
      let lines = []
      // 匹配这些中文标点符号，中文标点不能作为行首
      let symbolReg = /[\。\？\！\，\、\；\：\“\”\‘\'\（\）\《\》\〈\〉\【\】\『\』\「\」\﹃\﹄\〔\〕\…\—\～\﹏\￥]/
      let englishReg = /[a-zA-Z]+/

      function showMergeWord (nowWord, nextWord) {
        return symbolReg.test(nextWord) || (englishReg.test(nowWord) && englishReg.test(nextWord))
      }

      for (let i = 0; i < wordsLen;) {
        let word = words[i]
        // 按照word-break的break-word原则合并word
        if (i + 1 < wordsLen && showMergeWord(word, word[i + 1])) {
          words[i + 1] = word + words[i + 1]
          i++
          continue
        }
        // 检测是否需要换行
        let tempLine = line + word
        if (this.measureText(tempLine).width > width) {
          lines.push(line)
          line = ''
          continue
        }
        line = tempLine
        if (i + 1 === wordsLen) {
          lines.push(line)
        }
        i++
      }
      return lines
    }

    let canvas = this.canvas
    const fontSize = toNumber(((this.font || '').match(/\d+/g) || [])[0], 24)
    const defaultLineHeight = fontSize * 1.5
    if (width < fontSize) throw new Error('width must rather than fontSize')
    x = toNumber(x)
    y = toNumber(y)
    width = toNumber(width, canvas.width)
    lineHeight = toNumber(lineHeight, defaultLineHeight)
    let lines = toLines.call(this, text)
    lines.forEach((line, index) => {
      this.fillText(line, x, y + lineHeight * index)
    })
  }
}