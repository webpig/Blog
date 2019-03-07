## 嵌套组件的生命周期

问：有A、B、C三个组件，A为B的父组件，B为C的父组件，它们的创建和挂载顺序是怎样的？即（beforeCreate/created，beforeMounte/mounted）的执行顺序。

话不多说，直接上代码：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="https://cdn.jsdelivr.net/npm/vue"></script>
    <title>嵌套组件的生命周期</title>
</head>
<body>
    <div id="app">
        <component-a />
    </div>   

    <script>
        Vue.component('component-a', {
            template: '<div><component-b></component-b></div>',
            beforeCreate () {
                console.log('beforeCreate: A');
            },
            created() {
                console.log('created: A');
            },
            beforeMount() {
                console.log('beforeMount: A');
            },
            mounted() {
                console.log('mounted: A');
            },
        });

        Vue.component('component-b', {
            template: '<p><component-c></component-c></p>',
            beforeCreate () {
                console.log('beforeCreate: B');
            },
            created() {
                console.log('created: B');
            },
            beforeMount() {
                console.log('beforeMount: B');
            },
            mounted() {
                console.log('mounted: B');
            },
        });

        Vue.component('component-c', {
            template: '<span>hello world</span>',
            beforeCreate () {
                console.log('beforeCreate: C');
            },
            created() {
                console.log('created: C');
            },
            beforeMount() {
                console.log('beforeMount: C');
            },
            mounted() {
                console.log('mounted: C');
            },
        });

        const app = new Vue({
            el: '#app',
            beforeCreate () {
                console.log('beforeCreate: Root');
            },
            created() {
                console.log('created: Root');
            },
            beforeMount() {
                console.log('beforeMount: Root');
            },
            mounted() {
                console.log('mounted: Root');
            }
        });
    </script>
</body>
</html>
```

直接看打印结果：

```js
beforeCreate: Root
created: Root
beforeMount: Root
beforeCreate: A
created: A
beforeMount: A
beforeCreate: B
created: B
beforeMount: B
beforeCreate: C
created: C
beforeMount: C
mounted: C
mounted: B
mounted: A
mounted: Root
```

通过打印结果我们可以看到，beforeCreate、created、beforeMounted是按顺序执行，由外到内；而mounted即最终的挂载阶段则是由内到外，先将子组件挂载到dom上，然后再是父组件。

### 为什么

其实想想就知道了，既然组件之间存在父子关系，即父嵌套子，那么子组件就相当于父组件的一部分，那肯定要先将其一部分先挂载到dom上，然后再将整个父组件挂载上去。

### 总结

父子组件嵌套的生命周期其实都是 **先父后子** 然后 **先子后父**。后续再加入update和destroy的相关代码。