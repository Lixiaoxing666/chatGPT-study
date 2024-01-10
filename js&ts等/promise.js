User
详解promise和async，await。  从由来，定义，常用方法，使用方法，并用代码举例。教会我使用
ChatGPT
Promise 和 async/await 是JavaScript中用于处理异步操作的两种主要方法。

Promise：

由来：引入Promise是为了简化异步编程，避免回调地狱（callback hell）。
定义：Promise是一个代表了异步操作最终完成或失败的对象。
常用方法：.then()、.catch()、.finally()。
使用方法：Promise构造器接收一个函数，该函数包含resolve和reject两个参数。
示例：

javascript
Copy code
let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("完成"), 1000);
});

promise.then(result => console.log(result))
    .catch(error => console.log(error));

//fixme Async/Await：

由来：为了让异步代码看起来更像同步代码，提高代码的可读性和维护性。
定义：async函数返回一个Promise，await使得异步操作的代码看起来像同步代码。
使用方法：在函数前加上async关键字，然后在函数内部使用await关键字。
示例：

javascript
Copy code
async function asyncFunc() {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("完成"), 1000);
    });

    let result = await promise;
    console.log(result);
}

asyncFunc();
在使用async/await时，await只能在async函数内部使用。这两种方法都提供了更加清晰和简洁的方式来处理JavaScript中的异步操作。

User
promise还有很多方法，为什么不介绍？
ChatGPT
确实，Promise有一些其他重要的方法，我应该提及这些。除了.then()、.catch()和.finally()，还有：

Promise.all(iterable)：接收一个Promise数组（或任何可迭代的对象），并在所有Promise都成功完成时返回一个新的Promise，这个新的Promise解析为一个结果数组。如果其中任何一个Promise失败，则整个Promise.all调用失败。

Promise.race(iterable)：同样接收一个Promise数组（或任何可迭代的对象），但只要数组中的任何一个Promise解决或拒绝，就立即解析或拒绝。

Promise.allSettled(iterable)：接收一个Promise数组，并在所有Promise都完成（无论成功还是失败）后返回一个新的Promise，
这个新的Promise解析为一个对象数组，每个对象表示对应的Promise的结果。

Promise.resolve(value)：返回一个解析为给定值的Promise。

Promise.reject(reason)：返回一个因给定原因而拒绝的Promise。

这些方法提供了不同的方式来处理多个异步操作，使得Promise在复杂的异步场景中更加灵活和强大。

User
举出上述方法在开发中的用例
ChatGPT
在开发中，Promise的各种方法可以用于以下场景：

Promise.all(iterable)：当你需要同时执行多个异步操作，并且只有在所有操作都成功完成时才继续执行。例如，同时从多个API获取数据后再渲染页面。

Promise.race(iterable)：适用于多个异步操作竞赛的情况，比如，对于两个从不同源获取资源的请求，你可能只关心最先返回的结果。

Promise.allSettled(iterable)：当你需要等待多个异步操作完成并且希望知道每个操作的成功或失败结果时使用。例如，在初始化应用时，可能需要执行多个不相关的设置操作。

Promise.resolve(value)：可以用来将值或结果立即转换为Promise对象，适用于函数无论是同步还是异步都返回Promise的场景。

Promise.reject(reason)：当需要创建一个立即拒绝的Promise，通常用于测试或错误处理。

这些方法提供了灵活的方式来处理复杂的异步逻辑，帮助提高代码的可维护性和效率。

User
请用具体代码来展示这些方法的用法
ChatGPT
当然，以下是使用Promise各种方法的具体代码示例：

Promise.all(iterable)：

javascript
Copy code
Promise.all([
    fetch('/api/endpoint1'),
    fetch('/api/endpoint2')
]).then(([response1, response2]) => {
    // 两个请求都成功
}).catch(error => {
    // 至少一个请求失败
});
Promise.race(iterable)：

javascript
Copy code
Promise.race([
    fetch('/api/endpoint1'),
    fetch('/api/endpoint2')
]).then(response => {
    // 第一个成功的请求
}).catch(error => {
    // 第一个失败的请求
});
Promise.allSettled(iterable)：

javascript
Copy code
Promise.allSettled([
    fetch('/api/endpoint1'),
    fetch('/api/endpoint2')
]).then(results => {
    results.forEach((result) => {
        if (result.status === 'fulfilled') {
            console.log(result.value);
        } else {
            console.log(result.reason);
        }
    });
});
Promise.resolve(value) 和 Promise.reject(reason)：

javascript
Copy code
// 生成一个立即解析的Promise
Promise.resolve('成功').then(response => console.log(response));

// 生成一个立即拒绝的Promise
Promise.reject(new Error('失败')).catch(error => console.log(error));
这些示例展示了Promise方法在不同场景下的具体应用。

User
1 /* 例3.2 */
2 var promise = new Promise(function(resolve, reject) {
    3   console.log('before resolved');
    4   resolve();
    5   console.log('after resolved');
    6 });
7
8 promise.then(function() {
    9   console.log('resolved');
    10 });
11
12 console.log('outer');
13
14 -------output-------

    15 before resolved
16 after resolved
17 outer
18 resolved                                                        这段代码结果是否正确

ChatGPT
//fixme 是的，这段代码的输出结果是正确的。
// 在JavaScript的Promise中，构造函数（Promise构造器）中的代码是同步执行的，而.then()方法中的代码是异步执行的。因此，执行流程如下：

打印 'before resolved'。
执行 resolve()。
打印 'after resolved'。
退出Promise构造器，继续执行同步代码，打印 'outer'。
最后，事件队列中的 .then() 回调被调用，打印 'resolved'。
因此，最终的输出顺序为 'before resolved'、'after resolved'、'outer'、'resolved'。

User
async函数返回一个Promise，await使得异步操作的代码看起来像同步代码。但他终究不是同步的，如果一个代码段有个多async，await他们是否会发生阻塞，
他们的执行顺序会是什么样子的，请举代码说明
ChatGPT
在包含多个async和await的代码段中，await关键字会导致JavaScript运行时等待Promise解决，但它不会阻塞整个程序的执行，因为await只在
async函数的上下文中暂停执行。函数外的代码会继续执行。

//fixme 每个await表达式会按顺序等待其Promise解决，然后继续执行async函数内部的下一行代码。如果有多个async函数调用，它们会并行启动，但各自内部的await会按顺序等待。

javascript
Copy code
async function asyncFunc1() {
    console.log('Func1 Start');
    await new Promise(resolve => setTimeout(resolve, 1000)); // 延迟1秒
    console.log('Func1 End');
}

async function asyncFunc2() {
    console.log('Func2 Start');
    await new Promise(resolve => setTimeout(resolve, 500)); // 延迟0.5秒
    console.log('Func2 End');
}

console.log('Script Start');
asyncFunc1();
asyncFunc2();
console.log('Script End');

// 输出顺序:
// Script Start
// Func1 Start
// Func2 Start
// Script End
// Func2 End (在Func1之前结束，因为等待时间更短)
// Func1 End
在这个例子中，asyncFunc1和asyncFunc2几乎同时开始，但由于它们各自独立地等待不同的时间，所以结束时间也不同。整个脚本的执行不会因为await而被阻塞。

=============================================================================================
ES6之Promise用法详解
一 前言
本文主要对ES6的Promise进行一些入门级的介绍。要想学习一个知识点，肯定是从三个方面出发，what、why、how。下面就跟着我一步步学习吧~
    二 什么是Promise
首先是what。那么什么是Promise呢？
以下是MDN对Promise的定义
The Promise object is used for asynchronous computations. A Promise represents a single asynchronous operation that hasn't completed yet, but is expected in the future.
译文：Promise对象用于异步操作，它表示一个尚未完成且预计在未来完成的异步操作。
那么什么是异步操作？在学习promise之前需要把这个概念搞明白，下面将抽离一章专门介绍。
2.1 同步与异步
我们知道，JavaScript的执行环境是「单线程」。
所谓单线程，是指JS引擎中负责解释和执行JavaScript代码的线程只有一个，也就是一次只能完成一项任务，这个任务执行完后才能执行下一个，它会「阻塞」其他任务。这个任务可称为主线程。
但实际上还有其他线程，如事件触发线程、ajax请求线程等。
这也就引发了同步和异步的问题。
2.1.1 同步
同步模式，即上述所说的单线程模式，一次只能执行一个任务，函数调用后需等到函数执行结束，返回执行的结果，才能进行下一个任务。如果这个任务执行的时间较长，就会导致「线程阻塞」。
1 /* 例2.1 */
2 var x = true;
3 while(x);
4 console.log("don't carry out");    //不会执行
上面的例子即同步模式，其中的while是一个死循环，它会阻塞进程，因此第三句console不会执行。
同步模式比较简单，也较容易编写。但问题也显而易见，如果请求的时间较长，而阻塞了后面代码的执行，体验是很不好的。因此对于一些耗时的操作，异步模式则是更好的选择。
2.1.2 异步
下面就来看看异步模式。
异步模式，即与同步模式相反，可以一起执行多个任务，函数调用后不会立即返回执行的结果，如果任务A需要等待，可先执行任务B，等到任务A结果返回后再继续回调。
最常见的异步模式就数定时器了，我们来看看以下的例子。

 1 /* 例2.2 */
2 setTimeout(function() {
    3     console.log('taskA, asynchronous');
    4 }, 0);
5 console.log('taskB, synchronize');
6 //while(true);
7
8 -------ouput-------
    9 taskB, synchronize
10 taskA, asynchronous

我们可以看到，定时器延时的时间明明为0，但taskA还是晚于taskB执行。这是为什么呢？由于定时器是异步的，异步任务会在当前脚本的所有同步任务执行完才会执行。如果同步代码中含有死循环，即将上例的注释去掉，那么这个异步任务就不会执行，因为同步任务阻塞了进程。
2.1.3 回调函数
提起异步，就不得不谈谈回调函数了。上例中，setTimeout里的function便是回调函数。可以简单理解为：（执行完）回（来）调（用）的函数。
以下是WikiPedia对于callback的定义。
In computer programming, a callback is a piece of executable code that is passed as an argument to other code, which is expected to call back (execute) the argument at some convenient time.
    可以看出，回调函数是一段可执行的代码段，它以「参数」的形式传递给其他代码，在其合适的时间执行这段（回调函数）的代码。
WikiPedia同时提到
The invocation may be immediate as in a synchronous callback, or it might happen at a later time as in an asynchronous callback.
    也就是说，回调函数不仅可以用于异步调用，一般同步的场景也可以用回调。在同步调用下，回调函数一般是最后执行的。而异步调用下，可能一段时间后执行或不执行（未达到执行的条件）。

 1 /* 例2.3 */
2 /******************同步回调******************/
3 var fun1 = function(callback) {
    4     //do something
    5     console.log("before callback");
//js提供了typeof运算符，用来检测一个变量的类型。
    6     (callback && typeof(callback) === 'function') && callback();
    7     console.log("after callback");
    8 }
9 var fun2 = function(param) {
    10     //do something
    11     var start = new Date();
    12     while((new Date() - start) < 3000) { //delay 3s
        13     }
    14     console.log("I'm callback");
    15 }
16 fun1(fun2);
17
18 -------output--------
    19 before callback
20 //after 3s
21 I’m callback
22 after callback

由于是同步回调，会阻塞后面的代码，如果fun2是个死循环，后面的代码就不执行了。
上一小节中setTimeout就是常见的异步回调，另外常见的异步回调即ajax请求。

 1 /* 例2.4 */
2 /******************异步回调******************/
3 function request(url, param, successFun, errorFun) {
    4     $.ajax({
        5         type: 'GET',
        6         url: url,
        7         param: param,
        8         async: true,    //默认为true,即异步请求；false为同步请求
        9         success: successFun,
        10         error: errorFun
    11     });
    12 }
13 request('test.html', '', function(data) {
    14     //请求成功后的回调函数，通常是对请求回来的数据进行处理
    15     console.log('请求成功啦, 这是返回的数据:', data);
    16 },function(error) {
    17     console.log('sorry, 请求失败了, 这是失败信息:', error);
    18 });

2.2 为什么使用Promise
说完了以上基本概念，我们就可以继续学习Promise了。
上面提到，Promise对象是用于异步操作的。既然我们可以使用异步回调来进行异步操作，为什么还要引入一个Promise新概念，还要花时间学习它呢？不要着急，下面就来谈谈Promise的过人之处。
我们先看看下面的demo，利用Promise改写例2.4的异步回调。

 1 /* 例2.5 */
2 function sendRequest(url, param) {
    3     return new Promise(function (resolve, reject) {
        4         request(url, param, resolve, reject);
        5     });
    6 }
7
8 sendRequest('test.html', '').then(function(data) {
    9     //异步操作成功后的回调
    10     console.log('请求成功啦, 这是返回的数据:', data);
    11 }, function(error) {
    12     //异步操作失败后的回调
    13     console.log('sorry, 请求失败了, 这是失败信息:', error);
    14 });

这么一看，并没有什么区别，还比上面的异步回调复杂，得先新建Promise再定义其回调。其实，Promise的真正强大之处在于它的多重链式调用，可以避免层层嵌套回调。如果我们在第一次ajax请求后，还要用它返回的结果再次请求呢？

 1 /* 例2.6 */
2 request('test1.html', '', function(data1) {
    3     console.log('第一次请求成功, 这是返回的数据:', data1);
    4     request('test2.html', data1, function (data2) {
        5         console.log('第二次请求成功, 这是返回的数据:', data2);
        6         request('test3.html', data2, function (data3) {
            7             console.log('第三次请求成功, 这是返回的数据:', data3);
            8             //request... 继续请求
            9         }, function(error3) {
            10             console.log('第三次请求失败, 这是失败信息:', error3);
            11         });
        12     }, function(error2) {
        13         console.log('第二次请求失败, 这是失败信息:', error2);
        14     });
    15 }, function(error1) {
    16     console.log('第一次请求失败, 这是失败信息:', error1);
    17 });

以上出现了多层回调嵌套，有种晕头转向的感觉。这也就是我们常说的厄运回调金字塔（Pyramid of Doom），编程体验十分不好。而使用Promise，我们就可以利用then进行「链式回调」，将异步操作以同步操作的流程表示出来。

 1 /* 例2.7 */
2 sendRequest('test1.html', '').then(function(data1) {
    3     console.log('第一次请求成功, 这是返回的数据:', data1);
    4 }).then(function(data2) {
    5     console.log('第二次请求成功, 这是返回的数据:', data2);
    6 }).then(function(data3) {
    7     console.log('第三次请求成功, 这是返回的数据:', data3);
    8 }).catch(function(error) {
    9     //用catch捕捉前面的错误
    10     console.log('sorry, 请求失败了, 这是失败信息:', error);
    11 });

是不是明显清晰很多？孰优孰略也无需多说了吧~下面就让我们真正进入Promise的学习。
三 Promise的基本用法
3.1 基本用法
上一小节我们认识了promise长什么样，但对它用到的resolve、reject、then、catch想必还不理解。下面我们一步步学习。
Promise对象代表一个未完成、但预计将来会完成的操作。
它有以下三种状态：
pending：初始值，不是fulfilled，也不是rejected
fulfilled：代表操作成功
rejected：代表操作失败
Promise有两种状态改变的方式，既可以从pending转变为fulfilled，也可以从pending转变为rejected。一旦状态改变，就「凝固」了，会一直保持这个状态，不会再发生变化。当状态发生变化，promise.then绑定的函数就会被调用。 是指在一个then当中，每一个then之后都是一个新的promise对象
注意：Promise一旦新建就会「立即执行」，无法取消。这也是它的缺点之一。
下面就通过例子进一步讲解。

 1 /* 例3.1 */
2 //构建Promise
3 var promise = new Promise(function (resolve, reject) {
    4     if (/* 异步操作成功 */) {
        5         resolve(data);
        6     } else {
        7         /* 异步操作失败 */
        8         reject(error);
        9     }
    10 });

类似构建对象，我们使用new来构建一个Promise。Promise接受一个「函数」作为参数，该函数的两个参数分别是resolve和reject。这两个函数resolve和reject就是就是「回调函数」，由JavaScript引擎提供。
resolve函数的作用：在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；
reject函数的作用：在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。
Promise实例生成以后，可以用then方法指定resolved状态和reject状态的回调函数。

1 /* 接例3.1 */
2 promise.then(onFulfilled, onRejected);
3
4 promise.then(function(data) {
    5   // do something when success
    6 }, function(error) {
    7   // do something when failure
    8 });

then方法会返回一个Promise。它有两个参数，分别为Promise从pending变为fulfilled和rejected时的回调函数（第二个参数非必选）。这两个函数都接受Promise对象传出的值作为参数。
简单来说，then就是定义resolve和reject函数的，其resolve参数相当于：
1 function resolveFun(data) {
    2     //data为promise传出的值
    3 }
而新建Promise中的'resolve(data)'，则相当于执行resolveFun函数。
Promise新建后就会立即执行。而then方法中指定的回调函数，将在当前脚本所有同步任务执行完才会执行。如下例：
 1 /* 例3.2 */
2 var promise = new Promise(function(resolve, reject) {
    3   console.log('before resolved');
    4   resolve();
    5   console.log('after resolved');
    6 });
7
8 promise.then(function() {
    9   console.log('resolved');
    10 });
11
12 console.log('outer');
13
14 -------output-------
    15 before resolved
16 after resolved
17 outer
18 resolved

由于resolve指定的是异步操作成功后的回调函数，它需要等所有同步代码执行后才会执行，因此最后打印'resolved'，这个和例2.2是一样的道理。


You
1 /* 例3.2 */
2 var promise = new Promise(function(resolve, reject) {
    3   console.log('before resolved');
    4   resolve();
    5   console.log('after resolved');
    6 });
7
8 promise.then(function() {
    9   console.log('resolved');
    10 });
11
12 console.log('outer');
13
14 -------output-------
    15 before resolved
16 after resolved
17 outer
18 resolved                                                        这段代码结果是否正确
ChatGPT
是的，这段代码的输出结果是正确的。在JavaScript的Promise中，构造函数（Promise构造器）中的代码是同步执行的，而.then()方法中的代码是异步执行的。因此，执行流程如下：
打印 'before resolved'。
执行 resolve()。
打印 'after resolved'。
退出Promise构造器，继续执行同步代码，打印 'outer'。
最后，事件队列中的 .then() 回调被调用，打印 'resolved'。
因此，最终的输出顺序为 'before resolved'、'after resolved'、'outer'、'resolved'。



3.2 基本API
    .then()
语法：Promise.prototype.then(onFulfilled, onRejected)

对promise添加onFulfilled和onRejected回调，并返回的是一个新的Promise实例（不是原来那个Promise实例），且返回值将作为参数传入这个新Promise的resolve函数。
因此，我们可以使用链式写法，如上文的例2.7。由于前一个回调函数，返回的还是一个Promise对象（即有异步操作），这时后一个回调函数，就会等待该Promise对象的状态发生变化，才会被调用。
.catch()
语法：Promise.prototype.catch(onRejected)

该方法是.then(undefined, onRejected)的别名，用于指定发生错误时的回调函数。

 1 /* 例3.3 */
2 promise.then(function(data) {
    3     console.log('success');
    4 }).catch(function(error) {
    5     console.log('error', error);
    6 });
7
8 /*******等同于*******/
9 promise.then(function(data) {
    10     console.log('success');
    11 }).then(undefined, function(error) {
    12     console.log('error', error);
    13 });


1 /* 例3.4 */
2 var promise = new Promise(function (resolve, reject) {
    3     throw new Error('test');
    4 });
5 /*******等同于*******/
6 var promise = new Promise(function (resolve, reject) {
    7     reject(new Error('test'));
    8 });
9
10 //用catch捕获
11 promise.catch(function (error) {
    12     console.log(error);
    13 });
14 -------output-------
    15 Error: test

从上例可以看出，reject方法的作用，等同于抛错。
promise对象的错误，会一直向后传递，直到被捕获。即错误总会被下一个catch所捕获。then方法指定的回调函数，若抛出错误，也会被下一个catch捕获。catch中也能抛错，则需要后面的catch来捕获。

1 /* 例3.5 */
2 sendRequest('test.html').then(function(data1) {
    3     //do something
    4 }).then(function (data2) {
    5     //do something
    6 }).catch(function (error) {
    7     //处理前面三个Promise产生的错误
    8 });

上文提到过，promise状态一旦改变就会凝固，不会再改变。因此promise一旦fulfilled了，再抛错，也不会变为rejected，就不会被catch了。

1 /* 例3.6 */
2 var promise = new Promise(function(resolve, reject) {
    3   resolve();
    4   throw 'error';
    5 });
6
7 promise.catch(function(e) {
    8    console.log(e);      //This is never called
    9 });

如果没有使用catch方法指定处理错误的回调函数，Promise对象抛出的错误不会传递到外层代码，即不会有任何反应（Chrome会抛错），这是Promise的另一个缺点。

1 /* 例3.7 */
2 var promise = new Promise(function (resolve, reject) {
    3     resolve(x);
    4 });
5 promise.then(function (data) {
    6     console.log(data);
    7 });








如图所示，只有Chrome会抛错，且promise状态变为rejected，Firefox和Safari中错误不会被捕获，也不会传递到外层代码，最后没有任何输出，promise状态也变为rejected。
.all()
语法：Promise.all(iterable)

该方法用于将多个Promise实例，包装成一个新的Promise实例。
var p = Promise.all([p1, p2, p3]);
Promise.all方法接受一个数组（或具有Iterator接口）作参数，数组中的对象（p1、p2、p3）均为promise实例（如果不是一个promise，该项会被用Promise.resolve转换为一个promise)。它的状态由这三个promise实例决定。
当p1, p2, p3状态都变为fulfilled，p的状态才会变为fulfilled，并将三个promise返回的结果，按参数的顺序（而不是 resolved的顺序）存入数组，传给p的回调函数，如例3.8。
当p1, p2, p3其中之一状态变为rejected，p的状态也会变为rejected，并把第一个被reject的promise的返回值，传给p的回调函数，如例3.9。

 1 /* 例3.8 */
2 var p1 = new Promise(function (resolve, reject) {
    3     setTimeout(resolve, 3000, "first");
    4 });
5 var p2 = new Promise(function (resolve, reject) {
    6     resolve('second');
    7 });
8 var p3 = new Promise((resolve, reject) => {
    9   setTimeout(resolve, 1000, "third");
    10 });
11
12 Promise.all([p1, p2, p3]).then(function(values) {
    13   console.log(values);
    14 });
15
16 -------output-------
    17 //约 3s 后
18 ["first", "second", "third"]



1 /* 例3.9 */
2 var p1 = new Promise((resolve, reject) => {
    3   setTimeout(resolve, 1000, "one");
    4 });
5 var p2 = new Promise((resolve, reject) => {
    6   setTimeout(reject, 2000, "two");
    7 });
8 var p3 = new Promise((resolve, reject) => {
    9   reject("three");
    10 });
11
12 Promise.all([p1, p2, p3]).then(function (value) {
    13     console.log('resolve', value);
    14 }, function (error) {
    15     console.log('reject', error);    // => reject three
    16 });
17
18 -------output-------
    19 reject three

这多个 promise 是同时开始、并行执行的，而不是顺序执行。从下面例子可以看出。如果一个个执行，那至少需要 1+32+64+128

1 /* 例3.10 */
2 function timerPromisefy(delay) {
    3     return new Promise(function (resolve) {
        4         setTimeout(function () {
            5             resolve(delay);
            6         }, delay);
        7     });
    8 }
9 var startDate = Date.now();
10
11 Promise.all([
    12     timerPromisefy(1),
    13     timerPromisefy(32),
    14     timerPromisefy(64),
    15     timerPromisefy(128)
    16 ]).then(function (values) {
    17     console.log(Date.now() - startDate + 'ms');
    18     console.log(values);
    19 });
20 -------output-------
    21 133ms       //不一定，但大于128ms
22 [1,32,64,128]

    .race()
语法：Promise.race(iterable)

该方法同样是将多个Promise实例，包装成一个新的Promise实例。
var p = Promise.race([p1, p2, p3]);
Promise.race方法同样接受一个数组（或具有Iterator接口）作参数。当p1, p2, p3中有一个实例的状态发生改变（变为fulfilled或rejected），p的状态就跟着改变。并把第一个改变状态的promise的返回值，传给p的回调函数。

 1 /* 例3.11 */
2 var p1 = new Promise(function(resolve, reject) {
    3     setTimeout(reject, 500, "one");
    4 });
5 var p2 = new Promise(function(resolve, reject) {
    6     setTimeout(resolve, 100, "two");
    7 });
8
9 Promise.race([p1, p2]).then(function(value) {
    10     console.log('resolve', value);
    11 }, function(error) {
    12     //not called
    13     console.log('reject', error);
    14 });
15 -------output-------
    16 resolve two
17
18 var p3 = new Promise(function(resolve, reject) {
    19     setTimeout(resolve, 500, "three");
    20 });
21 var p4 = new Promise(function(resolve, reject) {
    22     setTimeout(reject, 100, "four");
    23 });
24
25 Promise.race([p3, p4]).then(function(value) {
    26     //not called
    27     console.log('resolve', value);
    28 }, function(error) {
    29     console.log('reject', error);
    30 });
31 -------output-------
    32 reject four

在第一个promise对象变为resolve后，并不会取消其他promise对象的执行，如下例

1 /* 例3.12 */
2 var fastPromise = new Promise(function (resolve) {
    3     setTimeout(function () {
        4         console.log('fastPromise');
        5         resolve('resolve fastPromise');
        6     }, 100);
    7 });
8 var slowPromise = new Promise(function (resolve) {
    9     setTimeout(function () {
        10         console.log('slowPromise');
        11         resolve('resolve slowPromise');
        12     }, 1000);
    13 });
14 // 第一个promise变为resolve后程序停止
15 Promise.race([fastPromise, slowPromise]).then(function (value) {
    16     console.log(value);    // => resolve fastPromise
    17 });
18 -------output-------
    19 fastPromise
20 resolve fastPromise
21 slowPromise     //仍会执行

    .resolve()
语法：

Promise.resolve(value);
Promise.resolve(promise);
Promise.resolve(thenable);
它可以看做new Promise()的快捷方式。

1 Promise.resolve('Success');
2
3 /*******等同于*******/
4 new Promise(function (resolve) {
    5     resolve('Success');
    6 });

这段代码会让这个Promise对象立即进入resolved状态，并将结果success传递给then指定的onFulfilled回调函数。由于Promise.resolve()也是返回Promise对象，因此可以用.then()处理其返回值。

/* 例3.13 */
Promise.resolve('success').then(function (value) {
    console.log(value);
});
-------output-------
    Success


/* 例3.14 */
//Resolving an array
Promise.resolve([1,2,3]).then(function(value) {
    console.log(value[0]);    // => 1
});

//Resolving a Promise
var p1 = Promise.resolve('this is p1');
var p2 = Promise.resolve(p1);
p2.then(function (value) {
    console.log(value);     // => this is p1
});

Promise.resolve()的另一个作用就是将thenable对象（即带有then方法的对象）转换为promise对象。

 1 /* 例3.15 */
2 var p1 = Promise.resolve({
    3     then: function (resolve, reject) {
    4         resolve("this is an thenable object!");
    5     }
6 });
7 console.log(p1 instanceof Promise);     // => true
8
9 p1.then(function(value) {
    10     console.log(value);     // => this is an thenable object!
    11   }, function(e) {
    12     //not called
    13 });

再看下面两个例子，无论是在什么时候抛异常，只要promise状态变成resolved或rejected，状态不会再改变，这和新建promise是一样的。

 1 /* 例3.16 */
2 //在回调函数前抛异常
3 var p1 = {
    4     then: function(resolve) {
    5       throw new Error("error");
    6       resolve("Resolved");
    7     }
8 };
9
10 var p2 = Promise.resolve(p1);
11 p2.then(function(value) {
    12     //not called
    13 }, function(error) {
    14     console.log(error);       // => Error: error
    15 });
16
17 //在回调函数后抛异常
18 var p3 = {
    19     then: function(resolve) {
    20         resolve("Resolved");
    21         throw new Error("error");
    22     }
23 };
24
25 var p4 = Promise.resolve(p3);
26 p4.then(function(value) {
    27     console.log(value);     // => Resolved
    28 }, function(error) {
    29     //not called
    30 });

.reject()
语法：Promise.reject(reason)

这个方法和上述的Promise.resolve()类似，它也是new Promise()的快捷方式。

1 Promise.reject(new Error('error'));
2
3 /*******等同于*******/
4 new Promise(function (resolve, reject) {
    5     reject(new Error('error'));
    6 });

这段代码会让这个Promise对象立即进入rejected状态，并将错误对象传递给then指定的onRejected回调函数。
四 Promise常见问题
经过上一章的学习，相信大家已经学会使用Promise。
总结一下创建promise的流程：
使用new Promise(fn)或者它的快捷方式Promise.resolve()、Promise.reject()，返回一个promise对象
在fn中指定异步的处理
处理结果正常，调用resolve
处理结果错误，调用reject
如果使用ES6的箭头函数，将会使写法更加简单清晰。
这一章节，将会用例子的形式，以说明promise使用过程中的注意点及容易犯的错误。
情景1：reject 和 catch 的区别
promise.then(onFulfilled, onRejected)
在onFulfilled中发生异常的话，在onRejected中是捕获不到这个异常的。
promise.then(onFulfilled).catch(onRejected)
    .then中产生的异常能在.catch中捕获
一般情况，还是建议使用第二种，因为能捕获之前的所有异常。当然了，第二种的.catch()也可以使用.then()表示，它们本质上是没有区别的，.catch === .then(null, onRejected)
--------------------------------------------------------------------------------
    情景2：如果在then中抛错，而没有对错误进行处理（即catch），那么会一直保持reject状态，直到catch了错误

1 /* 例4.1 */
2 function taskA() {
    3     console.log(x);
    4     console.log("Task A");
    5 }
6 function taskB() {
    7     console.log("Task B");
    8 }
9 function onRejected(error) {
    10     console.log("Catch Error: A or B", error);
    11 }
12 function finalTask() {
    13     console.log("Final Task");
    14 }
15 var promise = Promise.resolve();
16 promise
17     .then(taskA)
18     .then(taskB)
19     .catch(onRejected)
20     .then(finalTask);
21
22 -------output-------
    23 Catch Error: A or B,ReferenceError: x is not defined
24 Final Task




根据例4.1的输出结果及流程图，可以看出，A抛错时，会按照 taskA → onRejected → finalTask这个流程来处理。A抛错后，若没有对它进行处理，如例3.7，状态就会维持rejected，taskB不会执行，直到catch了错误。

 1 /* 例4.2 */
2 function taskA() {
    3     console.log(x);
    4     console.log("Task A");
    5 }
6 function taskB() {
    7     console.log("Task B");
    8 }
9 function onRejectedA(error) {
    10     console.log("Catch Error: A", error);
    11 }
12 function onRejectedB(error) {
    13     console.log("Catch Error: B", error);
    14 }
15 function finalTask() {
    16     console.log("Final Task");
    17 }
18 var promise = Promise.resolve();
19 promise
20     .then(taskA)
21     .catch(onRejectedA)
22     .then(taskB)
23     .catch(onRejectedB)
24     .then(finalTask);
25
26 -------output-------
    27 Catch Error: A ReferenceError: x is not defined
28 Task B
29 Final Task

将例4.2与4.1对比，在taskA后多了对A的处理，因此，A抛错时，会按照A会按照 taskA → onRejectedA → taskB → finalTask这个流程来处理，此时taskB是正常执行的。
--------------------------------------------------------------------------------
    情景3：每次调用then都会返回一个新创建的promise对象，而then内部只是返回的数据

1 /* 例4.3 */
2 //方法1：对同一个promise对象同时调用 then 方法
3 var p1 = new Promise(function (resolve) {
    4     resolve(100);
    5 });
6 p1.then(function (value) {
    7     return value * 2;
    8 });
9 p1.then(function (value) {
    10     return value * 2;
    11 });
12 p1.then(function (value) {
    13     console.log("finally: " + value);
    14 });
15 -------output-------
    16 finally: 100
17
18 //方法2：对 then 进行 promise chain 方式进行调用
19 var p2 = new Promise(function (resolve) {
    20     resolve(100);
    21 });
22 p2.then(function (value) {
    23     return value * 2;
    24 }).then(function (value) {
    25     return value * 2;
    26 }).then(function (value) {
    27     console.log("finally: " + value);
    28 });
29 -------output-------
    30 finally: 400

第一种方法中，then的调用几乎是同时开始执行的，且传给每个then的value都是100，这种方法应当避免。方法二才是正确的链式调用。
因此容易出现下面的错误写法：

 1 /* 例4.4 */
2 function badAsyncCall(data) {
    3     var promise = Promise.resolve(data);
    4     promise.then(function(value) {
        5         //do something
        6         return value + 1;
        7     });
    8     return promise;
    9 }
10 badAsyncCall(10).then(function(value) {
    11    console.log(value);          //想要得到11，实际输出10
    12 });
13 -------output-------
    14 10

正确的写法应该是：

 1 /* 改写例4.4 */
2 function goodAsyncCall(data) {
    3     var promise = Promise.resolve(data);
    4     return promise.then(function(value) {
        5         //do something
        6         return value + 1;
        7     });
    8 }
9 goodAsyncCall(10).then(function(value) {
    10    console.log(value);
    11 });
12 -------output-------
    13 11

情景4：在异步回调中抛错，不会被catch到

1 // Errors thrown inside asynchronous functions will act like uncaught errors
2 var promise = new Promise(function(resolve, reject) {
    3   setTimeout(function() {
        4     throw 'Uncaught Exception!';
        5   }, 1000);
    6 });
7
8 promise.catch(function(e) {
    9   console.log(e);       //This is never called
    10 });

情景5： promise状态变为resove或reject，就凝固了，不会再改变

console.log(1);
new Promise(function (resolve, reject){
    reject();
    setTimeout(function (){
        resolve();            //not called
    }, 0);
}).then(function(){
    console.log(2);
}, function(){
    console.log(3);
});
console.log(4);

-------output-------
    1
4
3

五 结语
关于promise就先介绍到这边了，比较基础，有不足的地方欢迎指出，有更好的也欢迎补充~
    分类: Javascript


==================================================================

ES6中的Promise用法
Node的产生，大大推动了Javascript这门语言在服务端的发展，使得前端人员可以以很低的门槛转向后端开发。
当然，这并不代表迸发成了全栈。全栈的技能很集中，绝不仅仅是前端会写一些HTML和一些交互，后台熟悉数据库的增删查改。
想必接触过Node的人都知道，Node是以异步(Async)回调著称的，其异步性提高了程序的执行效率，但同时也减少了程序的可读性。如果我们有几个异步操作，并且后一个操作需要前一个操作返回的数据才能执行，这样按照Node的一般执行规律，要实现有序的异步操作，通常是一层加一层嵌套下去。
为了解决这个问题，ES6提出了Promise的实现。
含义
Promise 对象用于一个异步操作的最终完成（或失败）及其结果值的表示。简单点说，它就是用于处理异步操作的，异步处理成功了就执行成功的操作，异步处理失败了就捕获错误或者停止后续操作。
它的一般表示形式为：
new Promise(
    /* executor */
    function(resolve, reject) {
        if (/* success */) {
            // ...执行代码
            resolve();
        } else { /* fail */
            // ...执行代码
            reject();
        }
    }
);

其中，Promise中的参数executor是一个执行器函数，它有两个参数resolve和reject。它内部通常有一些异步操作，如果异步操作成功，则可以调用resolve()来将该实例的状态置为fulfilled，即已完成的，如果一旦失败，可以调用reject()来将该实例的状态置为rejected，即失败的。
我们可以把Promise对象看成是一条工厂的流水线，对于流水线来说，从它的工作职能上看，它只有三种状态，一个是初始状态（刚开机的时候），一个是加工产品成功，一个是加工产品失败（出现了某些故障）。同样对于Promise对象来说，它也有三种状态：
pending
初始状态,也称为未定状态，就是初始化Promise时，调用executor执行器函数后的状态。
fulfilled
完成状态，意味着异步操作成功。
rejected
失败状态，意味着异步操作失败。
它只有两种状态可以转化，即
操作成功
pending -> fulfilled
操作失败
pending -> rejected
并且这个状态转化是单向的，不可逆转，已经确定的状态（fulfilled/rejected）无法转回初始状态（pending）。    是指在一个then当中，每一个then之后都是一个新的promise对象
方法
Promise.prototype.then()
Promise对象含有then方法，then()调用后返回一个Promise对象，意味着实例化后的Promise对象可以进行链式调用，而且这个then()方法可以接收两个函数，一个是处理成功后的函数，一个是处理错误结果的函数（处理错误的函数为可选，即可以省略）。
如下：
demo1:
    var promise1 = new Promise(function(resolve, reject) {
        // 2秒后置为接收状态
        setTimeout(function() {
            resolve('success'); //resolve()l的内容就是要传递下去的内容
        }, 2000);
    });

promise1.then(function(data) {
    console.log(data); // success
}, function(err) {
    console.log(err); // 不执行
}).then(function(data) {
    // 上一步的then()方法没有返回值
    console.log('链式调用：' + data); // 链式调用：undefined
}).then(function(data) {
    // ....
});

在这里我们主要关注promise1.then()方法调用后返回的Promise对象的状态，是pending还是fulfilled，或者是rejected?
    返回的这个Promise对象的状态主要是根据promise1.then()方法返回的值，大致分为以下几种情况：
如果then()方法中返回了一个参数值，那么返回的Promise将会变成接收状态。fulfilled
如果then()方法中抛出了一个异常，那么返回的Promise将会变成拒绝状态。rejected
如果then()方法调用resolve()方法，那么返回的Promise将会变成接收状态。fulfilled
如果then()方法调用reject()方法，那么返回的Promise将会变成拒绝状态。rejected
如果then()方法返回了一个未知状态(pending)的Promise新实例，那么返回的新Promise就是未知状态。pending
如果then()方法没有明确指定的resolve(data)/reject(data)/return data时，那么返回的新Promise就是接收状态fulfilled，可以一层一层地往下传递。
转换实例如下：
var promise2 = new Promise(function(resolve, reject) {
    // 2秒后置为接收状态
    setTimeout(function() {
        resolve('success');
    }, 2000);
});

promise2
    .then(function(data) {
        // 上一个then()调用了resolve，置为fulfilled态
        console.log('第一个then');
        console.log(data);
        return '2';
    })
    .then(function(data) {
        // 此时这里的状态也是fulfilled, 因为上一步返回了2
        console.log('第二个then');
        console.log(data);  // 2

        return new Promise(function(resolve, reject) {
            // 返回一个rejected的Promise实例
            reject('把状态置为rejected error');
        });
    }, function(err) {
        // error
    })
    .then(function(data) {
        /* 这里不运行 */
        console.log('第三个then');
        console.log(data);
        // ....
    }, function(err) {
        // error回调
        // 此时这里的状态也是fulfilled, 因为上一步使用了reject()来返回值
        console.log('出错：' + err); // 出错：把状态置为rejected error
    })
    .then(function(data) {
        // 没有明确指定返回值，默认返回fulfilled
        console.log('这里是fulfilled态');
    });

Promise.prototype.catch()
catch()方法和then()方法一样，都会返回一个新的Promise对象，它主要用于捕获异步操作时出现的异常。因此，我们通常省略then()方法的第二个参数，把错误处理控制权转交给其后面的catch()函数，如下：
var promise3 = new Promise(function(resolve, reject) {
    setTimeout(function() {
        reject('reject');
    }, 2000);
});

promise3.then(function(data) {
    console.log('这里是fulfilled状态'); // 这里不会触发
    // ...
}).catch(function(err) {
    // 最后的catch()方法可以捕获在这一条Promise链上的异常
    console.log('出错：' + err); // 出错：reject
});

Promise.all()
Promise.all()接收一个参数，它必须是可以迭代的，比如数组。
它通常用来处理一些并发的异步操作，即它们的结果互不干扰，但是又需要异步执行。它最终只有两种状态：成功或者失败。
它的状态受参数内各个值的状态影响，即里面状态全部为fulfilled时，它才会变成fulfilled，否则变成rejected。
成功调用后返回一个数组，数组的值是有序的，即按照传入参数的数组的值操作后返回的结果。如下：
// 置为fulfilled状态的情况
var arr = [1, 2, 3];
var promises = arr.map(function(e) {
    return new Promise(function(resolve, reject) {
        resolve(e * 5);
    });
});

Promise.all(promises).then(function(data) {
    // 有序输出
    console.log(data); // [5, 10, 15]
    console.log(arr); // [1, 2, 3]
});

// 置为rejected状态的情况
var arr = [1, 2, 3];
var promises2 = arr.map(function(e) {
    return new Promise(function(resolve, reject) {
        if (e === 3) {
            reject('rejected');
        }
        resolve(e * 5);
    });
});

Promise.all(promises2).then(function(data) {
    // 这里不会执行
    console.log(data);
    console.log(arr);
}).catch(function(err) {
    console.log(err); // rejected
});

Promise.race()
Promise.race()和Promise.all()类似，都接收一个可以迭代的参数，但是不同之处是Promise.race()的状态变化不是全部受参数内的状态影响，一旦参数内有一个值的状态发生的改变，那么该Promise的状态就是改变的状态。就跟race单词的字面意思一样，谁跑的快谁赢。如下：
var p1 = new Promise(function(resolve, reject) {
    setTimeout(resolve, 300, 'p1 doned');
});

var p2 = new Promise(function(resolve, reject) {
    setTimeout(resolve, 50, 'p2 doned');
});

var p3 = new Promise(function(resolve, reject) {
    setTimeout(reject, 100, 'p3 rejected');
});

Promise.race([p1, p2, p3]).then(function(data) {
    // 显然p2更快，所以状态变成了fulfilled
    // 如果p3更快，那么状态就会变成rejected
    console.log(data); // p2 doned
}).catch(function(err) {
    console.log(err); // 不执行
});


Promise.resolve()
Promise.resolve()接受一个参数值，可以是普通的值，具有then()方法的对象和Promise实例。正常情况下，它返回一个Promise对象，状态为fulfilled。但是，当解析时发生错误时，返回的Promise对象将会置为rejected态。如下：
// 参数为普通值
var p4 = Promise.resolve(5);
p4.then(function(data) {
    console.log(data); // 5
});


// 参数为含有then()方法的对象
var obj = {
    then: function() {
        console.log('obj 里面的then()方法');
    }
};

var p5 = Promise.resolve(obj);
p5.then(function(data) {
    // 这里的值时obj方法里面返回的值
    console.log(data); // obj 里面的then()方法
});


// 参数为Promise实例
var p6 = Promise.resolve(7);
var p7 = Promise.resolve(p6);

p7.then(function(data) {
    // 这里的值时Promise实例返回的值
    console.log(data); // 7
});

// 参数为Promise实例,但参数是rejected态
var p8 = Promise.reject(8);
var p9 = Promise.resolve(p8);

p9.then(function(data) {
    // 这里的值时Promise实例返回的值
    console.log('fulfilled:'+ data); // 不执行
}).catch(function(err) {
    console.log('rejected:' + err); // rejected: 8
});

Promise.reject()
Promise.reject()和Promise.resolve()正好相反，它接收一个参数值reason，即发生异常的原因。此时返回的Promise对象将会置为rejected态。如下：
var p10 = Promise.reject('手动拒绝');
p10.then(function(data) {
    console.log(data); // 这里不会执行，因为是rejected态
}).catch(function(err) {
    console.log(err); // 手动拒绝
}).then(function(data) {
    // 不受上一级影响
    console.log('状态：fulfilled'); // 状态：fulfilled
});

总之，除非Promise.then()方法内部抛出异常或者是明确置为rejected态，否则它返回的Promise的状态都是fulfilled态，即完成态，并且它的状态不受它的上一级的状态的影响。
总结
大概常用的方法就写那么多，剩下的看自己实际需要再去了解。
解决Node回调地狱的不止有Promise，还有Generator和ES7提出的Async实现。
方法不在多，而在于精。
分类: Javascript

====================================================
