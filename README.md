# Eventer.js
自用的一个微型事件发布/订阅模块

## 特性
- 支持链式操作
- 支持批量注册事件
- 啦啦啦

## 开始使用
首先引入本模块:
```html
<script src="//path/to/eventer.js"></script>
```
我们给现有对象obj_margox绑定本模块:
```javascript
var obj_margox = {
    'name' : 'Margox',
    'age'  : 26,
    'sex'  : 'male',
    'isSingle'   : true,
    'girlFriend' : null
}

Eventer(obj_margox);
```
现在obj_margox这个对象已经具有了事件发布/订阅的功能
## 订阅事件
通过on方法可以订阅单个或者多个事件
```javascript
// 订阅单个事件
obj_margox.on('grow', function() {
    this.age = this.age + 1;
    console.log(this.name + ' is ' + this.age + 'years old.');
});

// 订阅多个事件
obj_margox.on({
    'hungry' : function() {
        console.log(this.name + ' is hungry!');
    },
    'tired' : function() {
        console.log(this.name + ' need a rest!');
    },
    'eat' : function(food) {
        console.log(this.name + ' just ate some ' + food);
    }
});
```
## 发布事件
通过trigger方法来发布（触发）一个事件
```javascript
obj_margox
    .trigger('hungry') // Margox is hungry!
    .trigger('tired') // Margox need a rest!
    .trigger('eat', 'breads'); // Margox just ate some breads
```
## 取消事件订阅
通过off方法来取消订阅指定的事件
```javascript
obj_margox
    .off('hungry') // 取消订阅hungry事件
    .trigger('hungry'); // nothing
```
