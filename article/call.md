## call实现

借用MDN上的一句话介绍call： 

>call() 方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数。

理解了call方法，我们就可以去实现call了：

```js
// 采用ES3的语法
Function.prototype.myCall = function (context) {
    // context即为指定的this值，如果未指定或指为null则为全局对象，即window
    context = context || window
    // 将该函数作为对象方法，即 var obj = {
    //     value: 1,
    //     func: function () {}
    // } 这种形式
    context.fn = this

    // 上面两行代码确定了this值和方法，接下来确定参数
    var args = []
    for (var i = 1, len = arguments.length; i < len; i++) {
        // 需要动态调用，因为参数是一个列表，而call调用是根据函数的参数列表一一对应的，如果这里直接调用结果为数组
        args.push('arguments[' + i + ']')
    }

    // call方法调用后会有返回结果，这里存储该值，函数通过eval动态调用，因为该参数是字符串
    var result = eval('context.fn(' + args + ']')

    // 删除context.fn，不改变原来的对象，最后返回函数return值
    delete context.fn
    return result
}
```

测试：

```js
var obj = {
    a: 1
}

var a = 'window'

function log (b) {
    console.log(this.a, b)
    return 'log'
}

log.myCall(obj, 2) // 1, 2, 'log'
log.myCall(null, 2) // 'window' 2 'log'
```