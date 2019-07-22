// function unique (arr) {
//     let res = [], i, j;

//     for (i = 0; i < arr.length; i++) {
//         for (j = 0; j < res.length; j++) {
//             if (arr[i] === res[j]) {
//                 break;
//             }
//         }

//         if (j === res.length) {
//             res.push(arr[i]);
//         }
//     }

//     return res;
// }

// function unique (arr) {
//     let res = [];

//     for (let i = 0; i < arr.length; i++) {
//         if (res.indexOf(arr[i]) === -1) {
//             res.push(arr[i]);
//         }
//     }

//     return res;
// }

// function unique (arr) {
//     let res = [];

//     for (let i = 0; i < arr.length; i++) {
//         if (!res.includes(arr[i])) {
//             res.push(arr[i]);
//         }
//     }

//     return res;
// }

// function unique (arr) {
//     return arr.filter((item, index, array) => array.indexOf(item) === index);
// }

// function unique (arr) {
//     return arr.reduce((prev, curr) => {
//         if (prev.indexOf(curr) === -1) {
//             prev.push(curr);
//         }
//         return prev;
//     }, [])
// }

// function unique (arr) {
//     let obj = {}, res = [];

//     for (let i = 0; i < arr.length; i++) {
//         if (!obj[arr[i]]) {
//             obj[arr[i]] = true;
//             res.push(arr[i]);
//         }
//     }

//     return res;
// }
// function unique (arr) {
//     let res = [];
//     let sortedArr = arr.sort();
//     console.log(sortedArr);

//     for (let i = 0; i < sortedArr.length; i++) {
//         if (sortedArr[i] !== sortedArr[i + 1]) {
//             res.push(sortedArr[i]);
//         }
//     }

//     return res;
// }
// function unique (arr) {
//     return arr.sort().reduce((prev, curr) => {
//         if (prev.length === 0 || prev[prev.length - 1] !== curr) {
//             prev.push(curr);
//         }
//         return prev;
//     }, []);
// }

function findRepeat (arr) {
    for (let i = 0; i < arr.length; i++) {
        while (arr[i] !== i) {
            if (arr[i] === arr[arr[i]]) {
                return arr[i];
            }
            [arr[i], arr[arr[i]]] = [arr[arr[i]], arr[i]];
        }
    }

    return false;
}

console.log(findRepeat([1, 2, 4, 2]));

// function unique (arr) {
    // return Array.from(new Set(arr));
    // return [...new Set(arr)];
// }

// console.log(unique([1, 1, 0, 2, 2, 3, 1, '1', '1']));