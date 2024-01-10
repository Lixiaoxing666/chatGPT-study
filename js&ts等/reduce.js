Array.prototype.reduce()
reduce() 方法对数组中的每个元素按序执行一个提供的 reducer 函数，每一次运行 reducer 会将先前元素的计算结果作为参数传入，最后将其结果汇总为单个返回值。

第一次执行回调函数时，不存在“上一次的计算结果”。如果需要回调函数从数组索引为 0 的元素开始执行，则需要传递初始值。否则，数组索引为 0 的元素将被用作初始值，迭代器将从第二个元素开始执行（即从索引为 1 而不是 0 的位置开始）。

下面的例子能够帮助你理解 reduce() 的用处——计算数组所有元素的总和：

尝试一下

reducer 逐个遍历数组元素，每一步都将当前元素的值与前一步的结果相加（该结果是之前所有步骤结果的总和）——直到没有更多需要相加的元素。

// todo 语法
JS

reduce(callbackFn)
reduce(callbackFn, initialValue)
参数
callbackFn
为数组中每个元素执行的函数。其返回值将作为下一次调用 callbackFn 时的 accumulator 参数。对于最后一次调用，返回值将作为 reduce() 的返回值。该函数被调用时将传入以下参数：

accumulator
上一次调用 callbackFn 的结果。在第一次调用时，如果指定了 initialValue 则为指定的值，否则为 array[0] 的值。

currentValue
当前元素的值。在第一次调用时，如果指定了 initialValue，则为 array[0] 的值，否则为 array[1]。

currentIndex
currentValue 在数组中的索引位置。在第一次调用时，如果指定了 initialValue 则为 0，否则为 1。

array
调用了 reduce() 的数组本身。

initialValue 可选
第一次调用回调时初始化 accumulator 的值。如果指定了 initialValue，则 callbackFn 从数组中的第一个值作为 currentValue 开始执行。如果没有指定 initialValue，则 accumulator 初始化为数组中的第一个值，并且 callbackFn 从数组中的第二个值作为 currentValue 开始执行。在这种情况下，如果数组为空（没有第一个值可以作为 accumulator 返回），则会抛出错误。

返回值
使用“reducer”回调函数遍历整个数组后的结果。

异常
TypeError
如果数组为空且未提供 initialValue，则会抛出异常。

描述
reduce() 方法是一个迭代方法。它按升序对数组中的所有元素运行一个“reducer”回调函数，并将它们累积到一个单一的值中。每次调用时，callbackFn 的返回值都作为 accumulator 参数传递到下一次调用中。accumulator 的最终值（也就是在数组的最后一次迭代中从 callbackFn 返回的值）将作为 reduce() 的返回值。

callbackFn 仅对已分配值的数组索引进行调用。不会对稀疏数组中的空槽进行调用。

与其他迭代方法不同，reduce() 不接受 thisArg 参数。callbackFn 调用时始终以 undefined 作为 this 的值，如果 callbackFn 未处于严格模式，则该值将被替换为 globalThis。

reduce() 是函数式编程中的一个核心概念，在函数式编程中，不可能改变任何值，因此为了累积数组中的所有值，必须在每次迭代中返回一个新的累加器。这种约定也适用于 JavaScript 的 reduce()：应该在可能的情况下使用展开语法或其他复制方法来创建新的数组和对象作为累加器，而不是改变现有的累加器。如果你决定改变累加器而不是复制它，请记得仍然在回调中返回修改后的对象，否则下一次迭代将收到 undefined。

reduce() 不会改变被调用的数组，但是作为 callbackFn 提供的函数可能会改变数组。但需要注意的是，在第一次调用 callbackFn 之前，数组的长度会被保存。因此：

当开始调用 reduce() 时，callbackFn 将不会访问超出数组初始长度的任何元素。
对已访问索引的更改不会导致再次在这些元素上调用 callbackFn。
如果数组中一个现有的、尚未访问的元素被 callbackFn 更改，则它传递给 callbackFn 的值将是该元素被修改后的值。被删除的元素则不会被访问。
警告： 上述类型的并发修改经常导致难以理解的代码，通常应避免（特殊情况除外）。

reduce() 方法是通用的。它只期望 this 值具有 length 属性和整数键属性。

不应使用 reduce() 的情况
像 reduce() 这样的递归函数可能非常强大，但有时可能很难理解，特别是对于缺乏经验的 JavaScript 开发人员。如果使用其他数组方法可以使代码更清晰，则开发人员必须权衡代码可读性与使用 reduce() 带来的好处。如果 reduce() 确实是最佳选择，应该通过良好的文档和语义化的变量命名来提高代码的可读性。

边界情况
如果数组只有一个元素（无论位置如何）且未提供 initialValue，或者提供了 initialValue 但数组为空，则将返回该单个值，而不调用 callbackFn。

如果提供了 initialValue 且数组不为空，则 reduce 方法将始终从索引 0 开始调用回调函数。

如果未提供 initialValue，则对于长度大于 1、等于 1 和 0 的数组，reduce 方法将有不同的表现，如以下示例所示：

JS
Copy to Clipboard
const getMax = (a, b) => Math.max(a, b);

// 从索引 0 开始为数组中的每个元素调用回调函数
[1, 100].reduce(getMax, 50); // 100
[50].reduce(getMax, 10); // 50

// 仅为索引 1 处的元素调用回调函数
[1, 100].reduce(getMax); // 100

// 不调用回调函数
[50].reduce(getMax); // 50
[].reduce(getMax, 1); // 1

[].reduce(getMax); // TypeError
示例
无初始值时 reduce() 如何运行
假如运行以下无初始值的 reduce() 代码：

JS
Copy to Clipboard
const array = [15, 16, 17, 18, 19];

function reducer(accumulator, currentValue, index) {
    const returns = accumulator + currentValue;
    console.log(
        `accumulator: ${accumulator}, currentValue: ${currentValue}, index: ${index}, returns: ${returns}`,
    );
    return returns;
}

array.reduce(reducer);
回调函数会被调用四次，每次调用的参数和返回值如下表：

accumulator	currentValue	index	返回值
第一次调用	15	16	1	31
第二次调用	31	17	2	48
第三次调用	48	18	3	66
第四次调用	66	19	4	85
array 参数在整个过程中始终不会改变——它始终是 [15, 16, 17, 18, 19]。reduce() 返回的值将是最后一次回调返回值（85）。

有初始值时 reduce() 如何运行
在这里，我们以相同的算法 reduce 同一个数组，但提供 10 作为 initialValue：

JS
Copy to Clipboard
    [15, 16, 17, 18, 19].reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    10,
);
回调函数会被调用五次，每次调用的参数和返回值如下表：

accumulator	currentValue	index	返回值
第一次调用	10	15	0	25
第二次调用	25	16	1	41
第三次调用	41	17	2	58
第四次调用	58	18	3	76
第五次调用	76	19	4	95
这种情况下 reduce() 返回的值是 95。

//fixme 求对象数组中值的总和 currentValue数组中每一个对象
为了对包含在对象数组中的值进行求和，必须提供一个 initialValue，以便每个项都通过回调函数处理。

JS
Copy to Clipboard
const objects = [{ x: 1 }, { x: 2 }, { x: 3 }];
const sum = objects.reduce(
    (accumulator, currentValue) => accumulator + currentValue.x,
    0,
);

console.log(sum); // 6
展平嵌套数组
JS
Copy to Clipboard
const flattened = [
    [0, 1],
    [2, 3],
    [4, 5],
].reduce((accumulator, currentValue) => accumulator.concat(currentValue), []);
// flattened 的值是 [0, 1, 2, 3, 4, 5]
//fixme 统计对象中值的出现次数
JS
Copy to Clipboard
const names = ["Alice", "Bob", "Tiff", "Bruce", "Alice"];

const countedNames = names.reduce((allNames, name) => {
    const currCount = allNames[name] ?? 0;
    return {
        ...allNames,
        [name]: currCount + 1,
    };
}, {});
// countedNames 的值是：
// { 'Alice': 2, 'Bob': 1, 'Tiff': 1, 'Bruce': 1 }

User
统计对象中值的出现次数
JS
Copy to Clipboard
const names = ["Alice", "Bob", "Tiff", "Bruce", "Alice"];

const countedNames = names.reduce((allNames, name) => {
    const currCount = allNames[name] ?? 0;
    return {
        ...allNames,
        [name]: currCount + 1,
    };
}, {});
// countedNames 的值是：
// { 'Alice': 2, 'Bob': 1, 'Tiff': 1, 'Bruce': 1 }                                                                                                                                       详细解析以上代码，逐行解释
ChatGPT
当然，我可以逐行解释这段 JavaScript 代码。这段代码使用 reduce() 方法来统计数组 names 中每个名字的出现次数，并将这些统计信息存储在一个对象 countedNames 中。

代码解析
javascript
Copy code
const names = ["Alice", "Bob", "Tiff", "Bruce", "Alice"];
这行代码声明了一个名为 names 的数组，包含一些名字的字符串。
javascript
Copy code
const countedNames = names.reduce((allNames, name) => {
    reduce() 方法在数组 names 上被调用。
reduce() 方法接收一个回调函数和一个初始值（在这个例子中，初始值是一个空对象 {}）。
回调函数接收两个参数：allNames（累加器）和 name（数组的当前元素）。
javascript
    Copy code
    const currCount = allNames[name] ?? 0;
    在每次迭代中，我们首先检查 allNames 对象中是否已经有一个以当前元素（name）为键的属性。
如果有，currCount 被赋值为该键的值；如果没有，currCount 使用 ?? 运算符（空值合并运算符）被赋值为 0。
allNames[name] ?? 0 这个表达式的意思是：如果 allNames[name] 为 undefined 或 null，则返回 0；否则返回 allNames[name] 的值。
javascript
    Copy code
    return {
        ...allNames,
        [name]: currCount + 1,
    };
    这里返回一个新对象。
...allNames 使用展开语法将当前 allNames 对象的所有属性复制到新对象中。
[name]: currCount + 1 将当前名字（name）作为键，并将其值设置为 currCount + 1，这样就对当前名字的计数加一。
每次迭代都会更新 allNames 对象，并将其作为累加器传递给下一次迭代。
javascript
    Copy code
}, {});
这是 reduce() 方法的第二个参数，即回调函数的初始值。
在这里，它是一个空对象 {}，意味着 allNames 最初是一个空对象。
随着 reduce() 方法的执行，这个对象将被填充并最终包含每个名字的计数。
结果
javascript
Copy code
// countedNames 的值是：
// { 'Alice': 2, 'Bob': 1, 'Tiff': 1, 'Bruce': 1 }
最终，countedNames 对象包含了数组 names 中每个元素的出现次数。
在这个例子中，"Alice" 出现了两次，其它名字各出现一次。
整个过程是一个典型的使用 reduce() 方法来将数组数据汇总为一个对象的例子，展示了 reduce() 方法在数据转换和汇总方面的强大能力。


按属性对对象进行分组
JS
Copy to Clipboard
const people = [
    { name: "Alice", age: 21 },
    { name: "Max", age: 20 },
    { name: "Jane", age: 20 },
];

function groupBy(objectArray, property) {
    return objectArray.reduce((acc, obj) => {
        const key = obj[property];
        const curGroup = acc[key] ?? [];

        return { ...acc, [key]: [...curGroup, obj] };
    }, {});
}

const groupedPeople = groupBy(people, "age");
console.log(groupedPeople);
// {
//   20: [
//     { name: 'Max', age: 20 },
//     { name: 'Jane', age: 20 }
//   ],
//   21: [{ name: 'Alice', age: 21 }]
// }
使用展开语法和 initialValue 连接包含在对象数组中的数组
JS
Copy to Clipboard
// friends——一个对象数组，其中对象字段“books”是最喜欢的书的列表
const friends = [
    {
        name: "Anna",
        books: ["Bible", "Harry Potter"],
        age: 21,
    },
    {
        name: "Bob",
        books: ["War and peace", "Romeo and Juliet"],
        age: 26,
    },
    {
        name: "Alice",
        books: ["The Lord of the Rings", "The Shining"],
        age: 18,
    },
];

// allbooks——列表，其中包含所有朋友的书籍和 initialValue 中包含的附加列表
const allbooks = friends.reduce(
    (accumulator, currentValue) => [...accumulator, ...currentValue.books],
    ["Alphabet"],
);
console.log(allbooks);
// [
//   'Alphabet', 'Bible', 'Harry Potter', 'War and peace',
//   'Romeo and Juliet', 'The Lord of the Rings',
//   'The Shining'
// ]
//todo 数组去重
备注： 可以使用 Set 和 Array.from() 来实现相同的效果，如 const arrayWithNoDuplicates = Array.from(new Set(myArray))，并且性能更好。

JS
Copy to Clipboard
const myArray = ["a", "b", "a", "b", "c", "e", "e", "c", "d", "d", "d", "d"];
const myArrayWithNoDuplicates = myArray.reduce((accumulator, currentValue) => {
    if (!accumulator.includes(currentValue)) {
        return [...accumulator, currentValue];
    }
    return accumulator;
}, []);

console.log(myArrayWithNoDuplicates);
使用 reduce() 来替代 .filter().map()
使用 filter() 和 map() 会遍历数组两次，但是你可以使用 reduce() 只遍历一次并实现相同的效果，从而更高效。（如果你喜欢使用 for 循环，你可以在遍历一次时使用 forEach() 进行过滤和映射。）

JS
Copy to Clipboard
const numbers = [-5, 6, 2, 0];

const doubledPositiveNumbers = numbers.reduce((accumulator, currentValue) => {
    if (currentValue > 0) {
        const doubled = currentValue * 2;
        return [...accumulator, doubled];
    }
    return accumulator;
}, []);

console.log(doubledPositiveNumbers); // [12, 4]

===================================

解释为什么使用 .filter().map() 组合会遍历数组两次，而 reduce() 只需遍历一次，可以从这两种方法的工作原理和操作过程来理解。

使用 .filter().map()
当你使用 .filter().map() 组合时，实际上你对数组执行了两次完整的遍历：

.filter() 遍历： filter() 方法创建一个新数组，包含所有通过测试函数的元素。这意味着数组中的每个元素都会被检查一次。

.map() 遍历： 然后，map() 方法对 filter() 创建的新数组进行另一次遍历。map() 对每个元素执行一个函数，并创建一个新数组，其中包含原始元素的修改版本。

因此，.filter().map() 实际上会对原始数组的元素进行两次独立的遍历。

使用 reduce()
另一方面，使用 reduce() 方法，你只需遍历数组一次：

reduce() 遍历： reduce() 方法接收一个累加器函数和一个初始累加器值。累加器函数在数组的每个元素上执行，但整个数组只遍历一次。在每次迭代中，你可以决定如何修改累加器。
在提供的例子中，reduce() 用于同时执行过滤和映射的操作：

如果当前元素 currentValue 大于 0（过滤条件），则计算其双倍值并将其添加到累加器数组中。
如果不满足条件，则不修改累加器。
因此，reduce() 既执行了过滤操作又执行了映射操作，但只需要遍历数组一次。
总结
    .filter().map() 组合在处理数组时更直观且易于理解，但它需要对数组进行两次遍历。而 reduce() 更高效，因为它只需遍历数组一次即可实现相同的效果。选择哪种方法取决于你的具体需求：如果追求代码的可读性和简洁性，.filter().map() 是一个不错的选择；如果追求性能优化，尤其是在处理大型数组时，reduce() 更为合适。

User
任何情况.filter().map()都可以代替reduce实现功能吗，单就实现功能来说
ChatGPT
    .filter().map() 组合和 reduce() 都是非常强大的数组方法，但它们在处理数组时的适用性和便利性有所不同。就实现功能而言，大多数使用 .filter().map() 组合可以实现的功能也可以用 reduce() 实现，但反之不一定总是成立。让我们来具体分析一下：

.filter().map() 可以被 reduce() 替代
    .filter().map() 组合是先筛选数组（filter()），然后对筛选后的结果应用函数（map()）。
reduce() 方法足够灵活，可以在单次遍历过程中同时执行筛选和映射（或其他操作）。
举例来说，如果你想要从一个数字数组中筛选出正数，并将它们翻倍，使用 .filter().map() 需要两次遍历，而 reduce() 只需要一次。
reduce() 不总是可以被 .filter().map() 替代
reduce() 的用途远超过筛选和映射。它可以处理更复杂的数据结构变换和累积操作。
如果你的操作涉及到在单次遍历中同时进行多个不同的操作（如同时统计、转换、累积），reduce() 可能是更好的选择。在这种情况下，用 .filter().map() 组合实现可能会非常复杂，甚至不可行。
总结
对于简单的筛选和映射操作，.filter().map() 组合和 reduce() 都可以实现相同的功能，但 reduce() 在执行上更为高效。
对于更复杂的数据处理任务，reduce() 的灵活性和强大的数据处理能力使得它可以实现 .filter().map() 无法轻松实现的功能。
总的来说，选择哪种方法取决于具体的用例和个人对代码可读性与性能的偏好。




按顺序运行 Promise
JS
Copy to Clipboard
/**
 * 链接一系列 Promise 处理程序。
 *
 * @param {array} arr——一个 Promise 处理程序列表，每个处理程序接收前一个处理程序解决的结果并返回另一个 Promise。
 * @param {*} input——开始调用 Promise 链的初始值
 * @return {Object}——由一系列 Promise 链接而成的 Promise
 */
function runPromiseInSequence(arr, input) {
    return arr.reduce(
        (promiseChain, currentFunction) => promiseChain.then(currentFunction),
        Promise.resolve(input),
    );
}

// Promise 函数 1
function p1(a) {
    return new Promise((resolve, reject) => {
        resolve(a * 5);
    });
}

// Promise 函数 2
function p2(a) {
    return new Promise((resolve, reject) => {
        resolve(a * 2);
    });
}

// 函数 3——将由 `.then()` 包装在已解决的 Promise 中
function f3(a) {
    return a * 3;
}

// Promise 函数 4
function p4(a) {
    return new Promise((resolve, reject) => {
        resolve(a * 4);
    });
}

const promiseArr = [p1, p2, f3, p4];
runPromiseInSequence(promiseArr, 10).then(console.log); // 1200
使用函数组合实现管道
JS
Copy to Clipboard
// 组合使用的构建块
const double = (x) => 2 * x;
const triple = (x) => 3 * x;
const quadruple = (x) => 4 * x;

// 函数组合，实现管道功能
const pipe =
    (...functions) =>
        (initialValue) =>
            functions.reduce((acc, fn) => fn(acc), initialValue);

// 组合的函数，实现特定值的乘法
const multiply6 = pipe(double, triple);
const multiply9 = pipe(triple, triple);
const multiply16 = pipe(quadruple, quadruple);
const multiply24 = pipe(double, triple, quadruple);

// 用例
multiply6(6); // 36
multiply9(9); // 81
multiply16(16); // 256
multiply24(10); // 240
在稀疏数组中使用 reduce()
reduce() 会跳过稀疏数组中缺失的元素，但不会跳过 undefined 值。

JS
Copy to Clipboard
console.log([1, 2, , 4].reduce((a, b) => a + b)); // 7
console.log([1, 2, undefined, 4].reduce((a, b) => a + b)); // NaN
在非数组对象上调用 reduce()
reduce() 方法读取 this 的 length 属性，然后访问每个整数索引。

JS
Copy to Clipboard
const arrayLike = {
    length: 3,
    0: 2,
    1: 3,
    2: 4,
};
console.log(Array.prototype.reduce.call(arrayLike, (x, y) => x + y));
// 9
规范
Specification
ECMAScript Language Specification
# sec-array.prototype.reduce