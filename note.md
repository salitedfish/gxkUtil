# 网络通信

https传输过程同时用了三个密钥，服务端生成的公钥和私钥用来非对称加密，客户端生成的密钥用来对称加密
https对称加密所需要的密钥，是用https非对称加密来传输的，内容数据通过密钥进行对称加密传输

# js基础

js中引用类型的存储其实，变量和堆内存之间还存在存储在栈内存中的堆地址，const a => 123456 => { b: 1}

# vue

1、其实响应式的根本原理是每个响应式数据对应一组依赖此数据的对象集合(set或weakMap), 当数据改变时依次执行此集合中的对象的函数。

2、依赖本质上是一个new ReactiveEffetc()实例，上面有run方法或者调度函数，更新依赖本质上是执行run或者调度函数，具体操作则是由实现时传入

3、render函数执行或使用ref和effect和computed，如果有用到响应式数据的，会实例化new ReactiveEffect()，这个实例初始会执行一次run方法触发响应式数据的依赖收集，以后每次数据更新会触发依赖更新。
render函数执行或使用reactive或者readonly或者shallowReadonly时，才用的proxy，根据用户的使用实现不用的getter和setter函数

4、每个vue文件就相当于定义了一个原型对象，其他组件在使用时就相当于基于这个原型实例化了一个实例，并把方法绑定到这个实例上。data是个函数会执行创建新对象，并把属性绑定到新的实例上。实际上，data是对象也能做到，那就要深拷贝，影响性能所以使用函数。props属性还是在原型上。

5、正常情况下：vue模板 —> 编译成ast语法树 —> 编译成render函数(render函数其实返回一个个h函数，而h函数其实就是调用createVNode) —> vue实例初始化时添加render函数(compile模块和runtime模块的交汇点) —> vue实例初始化完后beforeMount前执行render函数(同时会实例化ReactiveEffect触发依赖收集，runtime模块和reactive模块的交汇点) —> 虚拟节点 —> 挂载
如果直接写render函数：以上步骤直接从render函数开始

6、ref、computed和reactive、readonly等保存依赖的方式不同，前者是每个包装对象都有个set结构的dep属性，存储着依赖。而后者则保存在一个全局的weakMap上，结构如下：
```
// 引用类型的依赖保存结构：key为属性名，target为对象，dep为依赖实例
{ 
  target => { key => { dep, dep }，key => { dep, dep } }, 
  target => { key => { dep, dep } } 
}
```
更新时通过target和key来获取到对应的set结构依赖。（这里如果依赖的是对象中的对象，则会递归调用reactive，所以第一层weak中的target可能是其他target属性的值）

7、vue3之所以用weakMap是，如果用map:
```
let a = { a: 1 }
let genMap = new Map()
genMap.set(a, 1)
```
上述代码map中用了a当作键，此时如果把a设为null，垃圾回收机制并不会回收{a:1}这个内存，因为map中还引用着，然后用户永远也无法访问到这个内存（没有及时释放，造成内存泄漏。栈与堆指针没了，如果是数组，那么对象是作为值保存，那么数组内的key与对象的指针还在，所以数组不会有影响），也无法回收。而weakMap中的key不会被垃圾回收处理，外部如果没有这个对象的引用，则对象就会被回收掉。

# axios

1、axios在浏览器中是用XMLHttpRequest，在node中是用http模块

2、axios的终止请求就是用了原生请求中的abort方法