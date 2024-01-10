some() 方法测试数组中是否至少有一个元素通过了由提供的函数实现的测试。如果在数组中找到一个元素使得提供的函数返回 true，则返回 true；否则返回 false。它不会修改数组。

const array = [1, 2, 3, 4, 5];

// Checks whether an element is even
const even = (element) => element % 2 === 0;

console.log(array.some(even));
// Expected output: true

every() 方法测试一个数组内的所有元素是否都能通过指定函数的测试。它返回一个布尔值。

const isBelowThreshold = (currentValue) => currentValue < 40;

const array1 = [1, 30, 39, 29, 10, 13];

console.log(array1.every(isBelowThreshold));
// Expected output: true

forEach() 方法对数组的每个元素执行一次给定的函数。

const array1 = ['a', 'b', 'c'];

array1.forEach((element) => console.log(element));

// Expected output: "a"
// Expected output: "b"
// Expected output: "c"

map() 方法创建一个新数组，这个新数组由原数组中的每个元素都调用一次提供的函数后的返回值组成。

const array1 = [1, 4, 9, 16];

// Pass a function to map
const map1 = array1.map((x) => x * 2);

console.log(map1);
// Expected output: Array [2, 8, 18, 32]

splice() 方法通过移除或者替换已存在的元素和/或添加新元素就地改变一个数组的内容。

要创建一个删除和/或替换部分内容而不改变原数组的新数组，请使用 toSpliced()。要访问数组的一部分而不修改它，参见 slice()。

const months = ['Jan', 'March', 'April', 'June'];
months.splice(1, 0, 'Feb');
// Inserts at index 1
console.log(months);
// Expected output: Array ["Jan", "Feb", "March", "April", "June"]

//fixme 如果 start >= array.length，则不会删除任何元素，但是该方法会表现为添加元素的函数，添加所提供的那些元素。
months.splice(4, 1, 'May');
//todo Replaces 1 element at index 4     在索引4替换一个元素'May'  原数组索引4没有内容，因此表现为新增
console.log(months);
// Expected output: Array ["Jan", "Feb", "March", "April", "May"]
语法：
splice(start)
splice(start, deleteCount)
splice(start, deleteCount, item1)
splice(start, deleteCount, item1, item2, itemN)

参数
start
从 0 开始计算的索引，表示要开始改变数组的位置，它会被转换成整数。

负索引从数组末尾开始计算——如果 start < 0，使用 start + array.length。
如果 start < -array.length，使用 0。
//fixme 如果 start >= array.length，则不会删除任何元素，但是该方法会表现为添加元素的函数，添加所提供的那些元素。
如果 start 被省略了（即调用 splice() 时不传递参数），则不会删除任何元素。这与传递 undefined 不同，后者会被转换为 0。

slice() 方法返回一个新的数组对象，这一对象是一个由 start 和 end 决定的原数组的浅拷贝（包括 start，不包括 end），其中 start 和 end 代表了数组元素的索引。原始数组不会被改变。
const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

console.log(animals.slice(2));
// Expected output: Array ["camel", "duck", "elephant"]

console.log(animals.slice(2, 4));
// Expected output: Array ["camel", "duck"]

console.log(animals.slice(1, 5));
// Expected output: Array ["bison", "camel", "duck", "elephant"]

console.log(animals.slice(-2));
// Expected output: Array ["duck", "elephant"]

console.log(animals.slice(2, -1));
// Expected output: Array ["camel", "duck"]

console.log(animals.slice());
// Expected output: Array ["ant", "bison", "camel", "duck", "elephant"]


find() 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。

如果需要在数组中找到对应元素的索引，请使用 findIndex()。

const array1 = [5, 12, 8, 130, 44];

const found = array1.find((element) => element > 10);

console.log(found);
// Expected output: 12




Array.isArray() 静态方法用于确定传递的值是否是一个数组。

console.log(Array.isArray([1, 3, 5]));
// Expected output: true

console.log(Array.isArray('[]'));
// Expected output: false

console.log(Array.isArray(new Array(5)));
// Expected output: true

console.log(Array.isArray(new Int16Array([15, 33])));
// Expected output: false

