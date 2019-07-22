Function.prototype.myCall = function (context) {
    if (typeof this !== 'function') {
        throw new TypeError('not function')
    }

    context = context || window
    context.fn = this

    var args = []
    for (var i = 1, len = arguments.length; i < len; i++) {
        args.push('arguments[' + i + ']')
    }
    var result = eval('context.fn(' + args + ')')

    delete context.fn

    return result
}

var obj = {
    a: 1
}

var a = 'window'

function log (b) {
    console.log(this.a, b)
    return {
        name: this.a
    }
}

log.myCall(obj, 2) // 
log.myCall(null)
