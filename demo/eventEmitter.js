class EventEmitter {
    constructor () {
        this.events = {}
    }
    on (event, cb) {
        if (!this.events[event]) {
            this.events[event] = []
        }
        this.events[event].push(cb)

        return this
    }
    once (event, cb) {
        const func = (...args) => {
            this.off(event, func)
            cb.apply(this, args)
        }
        this.on(event, func)

        return this
    }
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
    emit (event, ...args) {
        const cbs = this.events[event]

        if (!cbs) {
            throw new Error(`${event} event is not registered.`)
        }

        cbs.forEach(cb => cb.apply(this, args))

        return this
    }
}

const add = (a, b) => console.log(a + b)
const log = (...args) => console.log(...args) 
const event = new EventEmitter()
event.on('add', add)
event.on('log', log)
event.emit('add', 1, 2)
event.emit('log', 'hi~')
event.off('add')
// event.emit('log', 'hi~')
event.emit('add', 1, 2)
event.once('add', add)
event.emit('add', 1, 2)
event.emit('add', 1, 2)
