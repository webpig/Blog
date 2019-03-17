## 数组去重

数组去重的几种方法

### 简单的两层循环

```js
function unique (arr) {
    let res = [], i, j;

    for (i = 0; i < arr.length; i++) {
        for (j = 0; j < res.length; j++) {
            if (arr[i] === res[j]) {
                break;
            }
        }

        if (j === res.length) {
            res.push(arr[i]);
        }
    }

    return res;
}

console.log(unique([1, 1, '1', 0, '1', 0, 2])); // [ 1, '1', 0, 2 ]
```

### indexOf

```js
function unique (arr) {
    let res = [];

    for (let i = 0; i < arr.length; i++) {
        if (res.indexOf(arr[i]) === -1) {
            res.push(arr[i]);
        }
    }

    return res;
}
```

### includes

```js
function unique (arr) {
    let res = [];

    for (let i = 0; i < arr.length; i++) {
        if (!res.includes(arr[i])) {
            res.push(arr[i]);
        }
    }

    return res;
}
```

### filter

```js
function unique (arr) {
    return arr.filter((item, index, array) => array.indexOf(item) === index);
}
```

### reduce

```js
function unique (arr) {
    return arr.reduce((prev, curr) => {
        // indexOf和includes都可以
        if (prev.indexOf(curr) === -1) {
            prev.push(curr);
        }
        return prev;
    }, [])
}
```

### Object键值

```js
function unique (arr) {
    let obj = {}, res = [];

    for (let i = 0; i < arr.length; i++) {
        if (!obj[arr[i]]) {
            obj[arr[i]] = true;
            res.push(arr[i]);
        }
    }

    return res;
}
```

### 排序后去重

```js
function unique (arr) {
    let res = [];
    let sortedArr = arr.sort();

    for (let i = 0; i < sortedArr.length; i++) {
        if (sortedArr[i] !== sortedArr[i + 1]) {
            res.push(sortedArr[i]);
        }
    }

    return res;
}
使用reduce
function unique (arr) {
    return arr.sort().reduce((prev, curr) => {
        if (prev.length === 0 || prev[prev.length - 1] !== curr) {
            prev.push(curr);
        }
        return prev;
    }, []);
}
```

### Set

```js
function unique (arr) {
    return Array.from(new Set(arr));
}
使用扩展运算符
function unique (arr) {
    return [...new Set(arr)];
}
```