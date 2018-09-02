[![NPM](https://nodei.co/npm/extend-canvas.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/extend-canvas/)

# ExtendCanvas

Add some useful methods on CanvasRenderingContext2D.prototype

### features
* toLines: make long text to lines
* wrapText:  this method extend fillText，when fixed width it’ll automatic wrap text

### example
warpText

```javascript
import extCanvas from 'extend-canvas'
extCanvas()

let longText = 'this is long long long long long text'
let canvas = document.createElement('canvas')
canvas.width = 750
canvas.height = 1334
let context = canvas.getContext('2d')
context.fillStyle = '#000'
context.font = '48px PingFang SC'
context.textBaseline = 'hanging'
context.wrapText(longText, 79, 264, 592, 72)
```