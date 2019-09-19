## ES6实现自定义事件类

自定义事件类主要有四个方法，分别为on、once、off、emit。这里我们采用class语法来实现：

class结构：
```js
class EventEmitter {
    constructor () {
        this.events = {}
    }
    on (event, cb) {
        return this
    }
    off (event, cb) {
        return this
    },
    once (event, cb) {
        return this
    },
    emit (event, ...args) {
        return this
    }
}
```
```events``` 是一个对象，用来存储事件名以及对应的回调函数；```return this``` 返回该实例，可以链式调用。

on的实现：
```js
on (event, cb) {
    if (!this.events[event]) {
        this.events[event] = []
    }
    this.events[event].push(cb)

    return this
}
```
首先判断该event是否存在，若不存在则初始化为空数组（因为一个事件可以多次注册，可能会对应多个方法，所以这里使用数组存储函数），然后将函数添加进去；若event存在则直接添加到该事件的函数列表中。

如果对可读性要求不高，可写成：
```js
on (event, cb) {
    (this.events[event] || this.events[event] = []).push(cb)
    return this
}
```

off的实现：
```js
off (event, cb) {
    if (!cb) { 
        this.events[event] = null 
    } else {
        this.events[event].some((fn, i) => {
            if (cb === fn) {
                this.events[event].splice(i, 1)
                return true
            }
        })
    }

    return this
}
```
首先判断是否有cb参数，即具体的函数，如果没有则将整个event清空，如果有则将对应的fn清除，这里只清除第一个，如果需要清除全部可以使用forEach，不终止循环。

once的实现：
```js
once (event, cb) {
    const func = (...args) => {
        this.off(event, func)
        cb.apply(this, args)
    }
    this.on(event, func)

    return this
}
```
在内部定义一个函数，该函数只会执行一次，执行完后立即清除，即调用off方法，然后调用cb，即该事件注册时对应的方法。

emit的实现：
```js
emit (event, ...args) {
    const cbs = this.events[event]

    if (!cbs) {
        throw new Error(`${event} event is not registered.`)
    }

    cbs.forEach(cb => cb.apply(this, args))

    return this
}
```
首先判断是否注册该事件，未注册则报错，如果注册了则执行该函数

测试
```js
const add = (a, b) => console.log(a + b)
const log = (...args) => console.log(...args) 
const event = new EventEmitter()

event.on('add', add)
event.on('log', log)
event.emit('add', 1, 2) // 3
event.emit('log', 'hi~') // 'hi~'
event.off('add')
event.emit('add', 1, 2) // Error: add event is not registered.
event.once('once', add)
event.emit('once', 1, 2) // 3
event.emit('once', 1, 2)
event.emit('once', 1, 2)
```
这里是简易自定义事件类的实现，大家可根据自我需求进行完善。
