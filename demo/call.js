Function.prototype.myCall = function (context) {
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

Function.prototype.myApply = function (context, arr) {
    context = context || window
    context.fn = this

    var result

    if (!arr) {
        result = context.fn()
    } else {
        var args = []
        for (var i = 0, len = arr.length; i < len; i++) {
            args.push('arr[' + i + ']')
        }
        result = eval('context.fn(' + args + ')')
    }
    
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

// log.myCall(obj, 2) // 
// log.myCall(null)
log.myApply(obj, [2])
