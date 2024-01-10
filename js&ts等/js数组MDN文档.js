Array
与其他编程语言中的数组一样，Array 对象支持在单个变量名下存储多个元素，并具有执行常见数组操作的成员。

描述
在 JavaScript 中，数组不是基本类型，而是具有以下核心特征的 Array 对象：

JavaScript 数组是可调整大小的，并且可以包含不同的数据类型。（当不需要这些特征时，可以使用类型化数组。）
JavaScript 数组不是关联数组，因此，不能使用任意字符串作为索引访问数组元素，但必须使用非负整数（或它们各自的字符串形式）作为索引访问。
JavaScript 数组的索引从 0 开始：数组的第一个元素在索引 0 处，第二个在索引 1 处，以此类推，最后一个元素是数组的 length 属性减去 1 的值。
JavaScript 数组复制操作创建浅拷贝。（所有 JavaScript 对象的标准内置复制操作都会创建浅拷贝，而不是深拷贝）。
数组下标
Array 对象不能使用任意字符串作为元素索引（如关联数组），必须使用非负整数（或它们的字符串形式）。通过非整数设置或访问不会设置或从数组列表本身检索元素，但会设置或访问与该数组的对象属性集合相关的变量。数组的对象属性和数组元素列表是分开的，数组的遍历和修改操作不能应用于这些命名属性。

数组元素是对象属性，就像 toString 是属性一样（具体来说，toString() 是一种方法）。然而，尝试按以下方式访问数组的元素会抛出语法错误，因为属性名无效：

JS
Copy to Clipboard
console.log(arr.0); // 语法错误
JavaScript 语法要求使用方括号表示法而不是点号表示法来访问以数字开头的属性。也可以用引号包裹数组下标（例如，years['2'] 而不是 years[2]），尽管通常没有必要。

JavaScript 引擎通过隐式的 toString，将 years[2] 中的 2 强制转换为字符串。因此，'2' 和 '02' 将指向 years 对象上的两个不同的槽位，下面的例子可能是 true：

JS
Copy to Clipboard
console.log(years["2"] !== years["02"]);
只有 years['2'] 是一个实际的数组索引。years['02'] 是一个在数组迭代中不会被访问的任意字符串属性。

长度与数值属性的关系
JavaScript 数组的 length 属性和数值属性是连接的。

一些内置数组方法（例如 join()、slice()、indexOf() 等）在被调用时会考虑到数组的 length 属性的值。

其他方法（例如，push()、splice() 等）也会更新数组的 length 属性。

JS
Copy to Clipboard
const fruits = [];
fruits.push("banana", "apple", "peach");
console.log(fruits.length); // 3
当在 JavaScript 数组上设置一个属性时，如果该属性是一个有效的数组索引并且该索引在数组的当前边界之外，引擎将相应地更新数组的 length 属性：

JS
Copy to Clipboard
fruits[5] = "mango";
console.log(fruits[5]); // 'mango'
console.log(Object.keys(fruits)); // ['0', '1', '2', '5']
console.log(fruits.length); // 6
增加 length。

JS
Copy to Clipboard
fruits.length = 10;
console.log(fruits); // ['banana', 'apple', 'peach', empty x 2, 'mango', empty x 4]
console.log(Object.keys(fruits)); // ['0', '1', '2', '5']
console.log(fruits.length); // 10
console.log(fruits[8]); // undefined
但是，减少 length 属性会删除元素。

JS
Copy to Clipboard
fruits.length = 2;
console.log(Object.keys(fruits)); // ['0', '1']
console.log(fruits.length); // 2
这将在 Array/length 页中进一步解释。

数组方法和空槽
稀疏数组中的空槽在数组方法之间的行为不一致。通常，旧方法会跳过空槽，而新方法将它们视为 undefined。

在遍历多个元素的方法中，下面的方法在访问索引之前执行 in 检查，并且不将空槽与 undefined 合并：

concat()
copyWithin()
every()
filter()
flat()
flatMap()
forEach()
indexOf()
lastIndexOf()
map()
reduce()
reduceRight()
reverse()
slice()
some()
sort()
splice()
关于它们是如何处理空槽的，请参阅每个方法的页面。

这些方法将空槽视为 undefined：

entries()
fill()
find()
findIndex()
findLast()
findLastIndex()
includes()
join()
keys()
toLocaleString()
values()
复制方法和修改方法
有些方法不会修改调用该方法的现有数组，而是返回一个新的数组。它们通过首先构造一个新数组，然后填充元素来实现。复制始终是浅层次的——该方法从不复制一开始创建的数组之外的任何内容。原始数组的元素将按以下方式复制到新数组中：

对象：对象引用被复制到新数组中。原数组和新数组都引用同一个对象。也就是说，如果一个被引用的对象被修改，新数组和原数组都可以看到更改。
基本类型，如字符串、数字和布尔值（不是 String、Number 和 Boolean 对象）：它们的值被复制到新数组中。
其他方法会改变调用该方法的数组，在这种情况下，它们的返回值根据方法的不同而不同：有时是对相同数组的引用，有时是新数组的长度。

以下方法通过访问 this.constructor[Symbol.species] 来创建新数组，以确定要使用的构造函数：

concat()
filter()
flat()
flatMap()
map()
slice()
splice()（构造返回的已删除元素数组）
以下方法总是使用 Array 基础构造函数创建新数组：

toReversed()
toSorted()
toSpliced()
with()
    下表列出了会修改原始数组的方法，以及相应的非修改方法：

修改方法	相应的非修改方法
copyWithin()	没有相应的非修改方法
fill()	没有相应的非修改方法
pop()	slice(0, -1)
push(v1, v2)	concat([v1, v2])
reverse()	toReversed()
shift()	slice(1)
sort()	toSorted()
splice()	toSpliced()
unshift(v1, v2)	toSpliced(0, 0, v1, v2)
将改变原数组的方法转换为非修改方法的一种简单方式是使用展开语法或 slice() 先创建一个副本：

JS
Copy to Clipboard
arr.copyWithin(0, 1, 2); // 改变了 arr
const arr2 = arr.slice().copyWithin(0, 1, 2); // 不改变 arr
const arr3 = [...arr].copyWithin(0, 1, 2); // 不改变 arr
迭代方法
许多数组方法接受一个回调函数作为参数。回调函数按顺序为数组中的每个元素调用，且最多调用一次，并且回调函数的返回值用于确定方法的返回值。它们都具有相同的方法签名：

JS
Copy to Clipboard
method(callbackFn, thisArg)
其中 callbackFn 接受三个参数

element
数组中当前正在处理的元素。

index
正在处理的元素在数组中的索引。

array
调用该方法的数组。

callbackFn 的返回值取决于调用的数组方法。

thisArg 参数（默认为 undefined）将在调用 callbackFn 时用作 this 值。最终由 callbackFn 观察到的 this 值根据通常的规则 确定：如果 callbackFn 是非严格模式（译注：正常模式/马虎模式），原始 this 值将被包装为对象，并将 undefined/null 替换为 globalThis。对于使用 箭头函数 定义的任何 callbackFn 来说，thisArg 参数都是无关紧要的，因为箭头函数没有自己的 this 绑定。

所有迭代方法都是复制方法和通用方法，尽管它们在处理空槽时的行为不同。

以下方法是迭代方法：

every()
filter()
find()
findIndex()
findLast()
findLastIndex()
flatMap()
forEach()
map()
some()
特别地，every()、find()、findIndex()、findLast()、findLastIndex() 和 some() 并不总是在每个元素上调用 callbackFn——它们在确定返回值后立即停止迭代。

还有两个方法接受一个回调函数，并对数组中的每个元素最多运行一次，但它们的方法签名与典型的迭代方法略有不同（例如，它们不接受 thisArg）：

reduce()
reduceRight()
sort() 方法也接受一个回调函数，但它不是一个迭代方法。它会就地修改数组，不接受 thisArg，并且可能在索引上多次调用回调函数。

通用数组方法
数组方法总是通用的——它们不访问数组对象的任何内部数据。它们只通过 length 属性和索引访问数组元素。这意味着它们也可以在类数组对象上调用。

JS
Copy to Clipboard
const arrayLike = {
    0: "a",
    1: "b",
    length: 2,
};
console.log(Array.prototype.join.call(arrayLike, "+")); // 'a+b'
长度属性的规范化
length 属性被转换为一个数字，被截断为一个整数，然后固定为 0 到 253 - 1 之间的范围。NaN 变成 0，所以即使 length 没有出现或是 undefined，它也会表现得好像它的值是 0。

JavaScript 避免将 length 设置为不安全的整数。如果 length 将被设置为大于 253 - 1 的数字，则所有内置方法都将抛出 TypeError。但是，由于数组的 length 属性在设置为大于 232 时会抛出错误，因此通常不会达到安全整数阈值，除非该方法在非数组对象上调用。

JS
Copy to Clipboard
Array.prototype.flat.call({}); // []
一些数组方法会设置数组对象的 length 属性。它们总是在规范化后设置值，因此 length 总是以整数结尾。

JS
Copy to Clipboard
const a = { length: 0.7 };
Array.prototype.push.call(a);
console.log(a.length); // 0
类数组对象
术语类数组对象指的是在上面描述的 length 转换过程中不抛出的任何对象。在实践中，这样的对象应该实际具有 length 属性，并且索引元素的范围在 0 到 length - 1 之间。（如果它没有所有的索引，它将在功能上等同于稀疏数组。）

许多 DOM 对象都是类数组对象——例如 NodeList 和 HTMLCollection。arguments 对象也是类数组对象。你可以在它们上调用数组方法，即使它们本身没有这些方法。

JS
Copy to Clipboard
function f() {
    console.log(Array.prototype.join.call(arguments, "+"));
}

f("a", "b"); // 'a+b'
构造函数
Array()
创建一个新的 Array 对象。

静态属性
get Array[@@species]
返回 Array 构造函数。

静态方法
Array.from()
: 从数组类对象或可迭代对象创建一个新的 Array 实例。
Array.fromAsync() 实验性
从异步可迭代、可迭代或类数组对象创建新的 Array 实例。
Array.isArray()
: 如果参数是数组则返回 true ，否则返回 false 。
Array.of()
: 创建一个新的 Array 实例，具有可变数量的参数，而不管参数的数量或类型。
实例属性
以下属性在 Array.prototype 上定义，并由所有 Array 实例共享。

Array.prototype.constructor
创建实例对象的构造函数。对于 Array 实例，初始值是 Array 构造函数。

Array.prototype[@@unscopables]
包含 ES2015 版本之前 ECMAScript 标准中没有包含的属性名，在使用 with 绑定语句时会被忽略。

以下属性是每个 Array 实例自有的属性。

Array.prototype.length
反映数组中元素的数量。

实例方法
Array.prototype.at()
返回给定索引处的数组元素。接受从最后一项往回计算的负整数。

Array.prototype.concat()
返回一个新数组，该数组由被调用的数组与其他数组或值连接形成。

Array.prototype.copyWithin()
在数组内复制数组元素序列。

Array.prototype.entries()
返回一个新的数组迭代器对象，其中包含数组中每个索引的键/值对。

Array.prototype.every()
如果调用数组中的每个元素都满足测试函数，则返回 true。

Array.prototype.fill()
用静态值填充数组中从开始索引到结束索引的所有元素。

Array.prototype.filter()
返回一个新数组，其中包含调用所提供的筛选函数返回为 true 的所有数组元素。

Array.prototype.find()
返回数组中满足提供的测试函数的第一个元素的值，如果没有找到合适的元素，则返回 undefined。

Array.prototype.findIndex()
返回数组中满足提供的测试函数的第一个元素的索引，如果没有找到合适的元素，则返回 -1。

Array.prototype.findLast()
返回数组中满足提供的测试函数的最后一个元素的值，如果没有找到合适的元素，则返回 undefined。

Array.prototype.findLastIndex()
返回数组中满足所提供测试函数的最后一个元素的索引，如果没有找到合适的元素，则返回 -1。

Array.prototype.flat()
返回一个新数组，所有子数组元素递归地连接到其中，直到指定的深度。

Array.prototype.flatMap()
对调用数组的每个元素调用给定的回调函数，然后将结果展平一层，返回一个新数组。

Array.prototype.forEach()
对调用数组中的每个元素调用给定的函数。

Array.prototype.includes()
确定调用数组是否包含一个值，根据情况返回 true 或 false。

Array.prototype.indexOf()
返回在调用数组中可以找到给定元素的第一个（最小）索引。

Array.prototype.join()
将数组的所有元素连接为字符串。

Array.prototype.keys()
返回一个新的数组迭代器，其中包含调用数组中每个索引的键。

Array.prototype.lastIndexOf()
返回在调用数组中可以找到给定元素的最后一个（最大）索引，如果找不到则返回 -1。

Array.prototype.map()
返回一个新数组，其中包含对调用数组中的每个元素调用函数的结果。

Array.prototype.pop()
从数组中移除最后一个元素并返回该元素。

Array.prototype.push()
在数组末尾添加一个或多个元素，并返回数组新的 length。

Array.prototype.reduce()
对数组的每个元素（从左到右）执行用户提供的“reducer”回调函数，将其简化为单个值。

Array.prototype.reduceRight()
对数组的每个元素（从右到左）执行用户提供的“reducer”回调函数，将其简化为单个值。

Array.prototype.reverse()
就地反转数组中元素的顺序。（前面变成后面，后面变成前面。）

Array.prototype.shift()
从数组中移除第一个元素并返回该元素。

Array.prototype.slice()
提取调用数组的一部分并返回一个新数组。

Array.prototype.some()
如果调用数组中至少有一个元素满足提供的测试函数，则返回 true。

Array.prototype.sort()
对数组的元素进行排序并返回该数组。

Array.prototype.splice()
从数组中添加和/或删除元素。

Array.prototype.toLocaleString()
返回一个表示调用数组及其元素的本地化字符串。重写 Object.prototype.toLocaleString() 方法。

Array.prototype.toReversed()
返回一个新数组，该数组的元素顺序被反转，但不改变原始数组。

Array.prototype.toSorted()
返回一个新数组，其中元素按升序排序，而不改变原始数组。

Array.prototype.toSpliced()
返回一个新数组，在给定索引处删除和/或替换了一些元素，而不改变原始数组。

Array.prototype.toString()
返回一个表示调用数组及其元素的字符串。重写 Object.prototype.toString() 方法。

Array.prototype.unshift()
在数组的前面添加一个或多个元素，并返回数组新的 length。

Array.prototype.values()
返回一个新的数组迭代器对象，该对象包含数组中每个索引的值。

Array.prototype.with()
返回一个新数组，其中给定索引处的元素替换为给定值，而不改变原始数组。

Array.prototype[@@iterator]()
默认情况下，该方法为 values() 方法的别名。

示例
本节提供一些 JavaScript 中常见的数组操作示例。

备注： 如果你还不熟悉数组的基础知识，可以考虑先读一下 JavaScript 第一步：数组，它解释了数组是什么，还包括其他常见的数组操作示例。

创建数组
下面的例子展示了三种创建新数组的方法：首先使用数组字面量，然后使用 Array() 构造函数，最后使用 String.prototype.split() 从字符串构建数组。

JS
Copy to Clipboard
// 使用数组字面量创建的 'fruits' 数组。
const fruits = ["Apple", "Banana"];
console.log(fruits.length);
// 2

// 使用 Array() 构建函数创建的 'fruits2' 数组。
const fruits2 = new Array("Apple", "Banana");
console.log(fruits2.length);
// 2

// 使用 String.prototype.split() 方法创建的 'fruits3' 数组。
const fruits3 = "Apple, Banana".split(", ");
console.log(fruits3.length);
// 2
从数组中创建一个字符串
下面的例子使用 join() 方法从 fruits 数组中创建一个字符串。

JS
Copy to Clipboard
const fruits = ["Apple", "Banana"];
const fruitsString = fruits.join(", ");
console.log(fruitsString);
// "Apple, Banana"
通过索引访问数组元素
下面的例子展示了如何通过指定它们在数组中的位置的索引号来访问 fruits 数组中的元素。

JS
Copy to Clipboard
const fruits = ["Apple", "Banana"];

// 数组第一个元素的索引始终为 0。
fruits[0]; // Apple

// 数组第二个元素的索引始终为 1。
fruits[1]; // Banana

// 数组最后一个元素的索引总是比数组的长度小 1。
fruits[fruits.length - 1]; // Banana

// 使用大于数组长度的索引会返回"undefined"
fruits[99]; // undefined
在数组中查找元素的索引
下面的例子使用 indexOf() 方法查找字符串 "Banana" 在 fruits 数组中的位置（索引）。

JS
Copy to Clipboard
const fruits = ["Apple", "Banana"];
console.log(fruits.indexOf("Banana"));
// 1
检查数组是否包含某个元素
下面的例子展示了两种检查 fruits 数组是否包含 "Banana" 和 "Cherry" 的方法：首先使用 includes() 方法，然后使用 indexOf() 方法来测试索引值不是 -1。

JS
Copy to Clipboard
const fruits = ["Apple", "Banana"];

fruits.includes("Banana"); // true
fruits.includes("Cherry"); // false

// 如果 indexOf() 不返回 -1，则数组包含给定的元素。
fruits.indexOf("Banana") !== -1; // true
fruits.indexOf("Cherry") !== -1; // false
将元素添加到数组中
下面的例子使用 push() 方法向 fruits 数组追加一个新字符串。

JS
Copy to Clipboard
const fruits = ["Apple", "Banana"];
const newLength = fruits.push("Orange");
console.log(fruits);
// ["Apple", "Banana", "Orange"]
console.log(newLength);
// 3
移除数组中的最后一个元素
下面的例子使用 pop() 方法从 fruits 数组中移除最后一个元素。

JS
Copy to Clipboard
const fruits = ["Apple", "Banana", "Orange"];
const removedItem = fruits.pop();
console.log(fruits);
// ["Apple", "Banana"]
console.log(removedItem);
// Orange
备注： pop() 只能用于从数组中移除最后一个元素。若要从数组末尾移除多个元素，请参见下一个示例。

从数组末尾移除多个元素
下面的例子使用 splice() 方法从 fruits 数组中移除最后 3 个元素。

JS
Copy to Clipboard
const fruits = ["Apple", "Banana", "Strawberry", "Mango", "Cherry"];
const start = -3;
const removedItems = fruits.splice(start);
console.log(fruits);
// ["Apple", "Banana"]
console.log(removedItems);
// ["Strawberry", "Mango", "Cherry"]
将数组截断为前 N 个元素
下面的例子使用 splice() 方法将 fruits 数组截断到只剩下前 2 个元素。

JS
Copy to Clipboard
const fruits = ["Apple", "Banana", "Strawberry", "Mango", "Cherry"];
const start = 2;
const removedItems = fruits.splice(start);
console.log(fruits);
// ["Apple", "Banana"]
console.log(removedItems);
// ["Strawberry", "Mango", "Cherry"]
移除数组中的第一个元素
下面的例子使用 shift() 方法从 fruits 数组中移除第一个元素。

JS
Copy to Clipboard
const fruits = ["Apple", "Banana"];
const removedItem = fruits.shift();
console.log(fruits);
// ["Banana"]
console.log(removedItem);
// Apple
备注： shift() 只能用于从数组中移除第一个元素。若要从数组的开头移除多个元素，请参见下一个示例。

从数组开头移除多个元素
下面的例子使用 splice() 方法从 fruits 数组中移除前 3 个元素。

JS
Copy to Clipboard
const fruits = ["Apple", "Strawberry", "Cherry", "Banana", "Mango"];
const start = 0;
const deleteCount = 3;
const removedItems = fruits.splice(start, deleteCount);
console.log(fruits);
// ["Banana", "Mango"]
console.log(removedItems);
// ["Apple", "Strawberry", "Cherry"]
向数组开头添加一个新的元素
下面的例子使用 unshift() 方法在索引 0 处向 fruits 数组中添加一个新元素——使其成为数组中新的第一元素。

JS
Copy to Clipboard
const fruits = ["Banana", "Mango"];
const newLength = fruits.unshift("Strawberry");
console.log(fruits);
// ["Strawberry", "Banana", "Mango"]
console.log(newLength);
// 3
按索引移除单个元素
下面的例子使用 splice() 方法从 fruits 数组中删除字符串 "Banana"——通过指定 "Banana" 的索引位置。

JS
Copy to Clipboard
const fruits = ["Strawberry", "Banana", "Mango"];
const start = fruits.indexOf("Banana");
const deleteCount = 1;
const removedItems = fruits.splice(start, deleteCount);
console.log(fruits);
// ["Strawberry", "Mango"]
console.log(removedItems);
// ["Banana"]
按索引移除多个元素
下面的例子使用 splice() 方法从 fruits 数组中删除字符串 "Banana" 和 "Strawberry"——通过指定 "Banana" 的索引位置，以及要移除的元素总数。

JS
Copy to Clipboard
const fruits = ["Apple", "Banana", "Strawberry", "Mango"];
const start = 1;
const deleteCount = 2;
const removedItems = fruits.splice(start, deleteCount);
console.log(fruits);
// ["Apple", "Mango"]
console.log(removedItems);
// ["Banana", "Strawberry"]
替换数组中的多个元素
下面的例子使用 splice() 方法将 fruits 数组中的最后两个元素替换为新元素。

JS
Copy to Clipboard
const fruits = ["Apple", "Banana", "Strawberry"];
const start = -2;
const deleteCount = 2;
const removedItems = fruits.splice(start, deleteCount, "Mango", "Cherry");
console.log(fruits);
// ["Apple", "Mango", "Cherry"]
console.log(removedItems);
// ["Banana", "Strawberry"]
遍历数组
下面的例子使用 for...of 循环遍历 fruits 数组，将每一个元素打印到控制台。

JS
Copy to Clipboard
const fruits = ["Apple", "Mango", "Cherry"];
for (const fruit of fruits) {
    console.log(fruit);
}
// Apple
// Mango
// Cherry
但 for...of 只是遍历任意数组的众多方法之一；更多方法，参见循环与迭代，并查看 every()、filter()、flatMap()、map()、reduce() 和 reduceRight() 方法——并参见下一个示例，该示例使用 forEach() 方法。

对数组中的每个元素调用函数
下面的例子使用 forEach() 方法在 fruits 数组中的每个元素上调用一个函数；该函数将每个元素以及元素的索引号打印到控制台。

JS
Copy to Clipboard
const fruits = ["Apple", "Mango", "Cherry"];
fruits.forEach((item, index, array) => {
    console.log(item, index);
});
// Apple 0
// Mango 1
// Cherry 2
合并多个数组
下面的例子使用 concat() 方法将 fruits 数组与 moreFruits 数组合并，生成一个新的 combinedFruits 数组。注意，fruits 和 moreFruits 保持不变。

JS
Copy to Clipboard
const fruits = ["Apple", "Banana", "Strawberry"];
const moreFruits = ["Mango", "Cherry"];
const combinedFruits = fruits.concat(moreFruits);
console.log(combinedFruits);
// ["Apple", "Banana", "Strawberry", "Mango", "Cherry"]

// The 'fruits' array remains unchanged.
console.log(fruits);
// ["Apple", "Banana", "Strawberry"]

// The 'moreFruits' array also remains unchanged.
console.log(moreFruits);
// ["Mango", "Cherry"]
复制数组
下面的例子展示了从现有的 fruits 数组创建新数组的三种方法：首先使用展开语法，然后使用 from() 方法，然后使用 slice() 方法。

JS
Copy to Clipboard
const fruits = ["Strawberry", "Mango"];

// Create a copy using spread syntax.
const fruitsCopy = [...fruits];
// ["Strawberry", "Mango"]

// Create a copy using the from() method.
const fruitsCopy2 = Array.from(fruits);
// ["Strawberry", "Mango"]

// Create a copy using the slice() method.
const fruitsCopy3 = fruits.slice();
// ["Strawberry", "Mango"]
所有内置的数组复制操作（展开语法、Array.from()、Array.prototype.slice() 和 Array.prototype.concat()）都会创建浅拷贝。如果你想要一个数组的深拷贝，你可以使用 JSON.stringify() 将数组转换成一个 JSON 字符串，然后使用 JSON.parse() 将字符串转换回一个完全独立于原数组的新数组。

JS
Copy to Clipboard
const fruitsDeepCopy = JSON.parse(JSON.stringify(fruits));
你还可以使用 structuredClone() 方法创建深拷贝，该方法的优点是允许源代码中的可转移对象被转移到新的副本，而不仅仅是克隆。

最后，重要的是要理解，将现有数组赋值给新变量并不会创建数组或其元素的副本。相反，新变量只是对原数组的引用或别名；也就是说，原来的数组名和新的变量名只是同一个对象的两个名称（因此总是被计算为严格相等）。因此，如果你对原数组的值或新变量的值做了任何改变，另一个也会改变：

JS
Copy to Clipboard
const fruits = ["Strawberry", "Mango"];
const fruitsAlias = fruits;
// 'fruits' 和 'fruitsAlias' 是同一个对象，严格相等。
fruits === fruitsAlias; // true
// 对 'fruits' 数组的任何更改也会更改 'fruitsAlias'。
fruits.unshift("Apple", "Banana");
console.log(fruits);
// ['Apple', 'Banana', 'Strawberry', 'Mango']
console.log(fruitsAlias);
// ['Apple', 'Banana', 'Strawberry', 'Mango']
创建二维数组
下面的例子创建了一个代表棋盘的二维字符串数组。第一步是将 board[6][4] 中的 'p' 复制到 board[4][4]。原本的 [6][4] 位置则被设置为空格。

JS
Copy to Clipboard
const board = [
    ["R", "N", "B", "Q", "K", "B", "N", "R"],
    ["P", "P", "P", "P", "P", "P", "P", "P"],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    ["p", "p", "p", "p", "p", "p", "p", "p"],
    ["r", "n", "b", "q", "k", "b", "n", "r"],
];

console.log(`${board.join("\n")}\n\n`);

// 将国王的兵向前移动 2
board[4][4] = board[6][4];
board[6][4] = " ";
console.log(board.join("\n"));
下面是输出：

R,N,B,Q,K,B,N,R
P,P,P,P,P,P,P,P
    , , , , , , ,
    , , , , , , ,
    , , , , , , ,
    , , , , , , ,
    p,p,p,p,p,p,p,p
r,n,b,q,k,b,n,r

R,N,B,Q,K,B,N,R
P,P,P,P,P,P,P,P
    , , , , , , ,
    , , , , , , ,
    , , , ,p, , ,
    , , , , , , ,
    p,p,p,p, ,p,p,p
r,n,b,q,k,b,n,r
使用数组将一组值制成表格
JS
Copy to Clipboard
const values = [];
for (let x = 0; x < 10; x++) {
    values.push([2 ** x, 2 * x ** 2]);
}
console.table(values);
结果为：

// The first column is the index
0  1    0
1  2    2
2  4    8
3  8    18
4  16   32
5  32   50
6  64   72
7  128  98
8  256  128
9  512  162
使用匹配的结果创建数组
RegExp 和字符串之间的匹配结果可以创建一个 JavaScript 数组，该数组具有匹配信息的属性和元素。这样的数组由 RegExp.prototype.exec() 和 String.prototype.match() 返回。

例如：

JS
Copy to Clipboard
// 匹配一个 d 后跟一个或多个 b 后跟一个 d
// 记住匹配的 b 和后面的 d
// 忽略大小写

const myRe = /d(b+)(d)/i;
const execResult = myRe.exec("cdbBdbsbz");

console.log(execResult.input); // 'cdbBdbsbz'
console.log(execResult.index); // 1
console.log(execResult); // [ "dbBd", "bB", "d" ]
有关匹配结果的更多信息，请参见 RegExp.prototype.exec() 和 String.prototype.match() 页