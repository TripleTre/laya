仿 vue angular 做的个小项目， 形似神不似。使用 webapp 那套思想来做游戏开发试一试。  

phaser游戏引擎中提供的 DisplayObject 类对象作为标签类的实现， 使用 html 模板的方式封装成组件， 以组件为  
基本单位来组织项目结构， 重用代码。 组件提供了 MVVM 框架类似的数据绑定， 结合事件系统和 redux 的状态管理， 可以  
深度解耦各个组件之间的依赖， 便于调试，维护和做单元测试。  

## 组件

一个完整的组件定义如下：  
``` javascript
@component({
  template: `
    <container l-bind-visible="GAME_STATE === 'ETC'">
        <integer-bitmap-text font="'numbers'" x="creditPosition.x" 
                             y="creditPosition.y" size="size"
                     anchor-x="0.5" anchor-y="0.5" l-bind-text="creditValue">
        </integer-bitmap-text>
    </container>
  `,
   injector: {
      GAME_STATE
   },
   name: 'ScoreBoard'
})
export default class ScoreBoard extends layaAbstract.AbstractComponent {
  @data
  private betValue = 0;
  @prop
  private creditPosition; 
  @prop
  private size;
  @getter('scoreBoard.creditValue')
  private creditValue;
  // ...

  $$init() {
    // ...
  }

  $$create() {
    // ...
  }

  @watch(['creditValue'])
  creditValueHandler() {
    // ...
  }
}
```    

**component** 注解标注该类是一个组件类， 要作为一个组件使用，该类还必须继承自 AbstractComponent 类。
注解接受一个 ComponentLike 类型的参数：
``` javascript
interface ComponentLike {
    template: string,
    injector?: any,
    name: string
}
```

template 属性的是该组件的 HTML 模板。  
injector 用于注入 组件实例上下文之外的变量， 用于在模板中直接访问。  
name 组件的名称，这个必须和组件类类名相同。

模板就和 MVVM 框架中的模板一样， 只不过没用浏览器提供的那些标签了， 都是 phaser 提供的 DisplayObject 。  

&lt;container>标签对应于 phaser.Group 类(稍后会列出完整的可用标签列表)，为了忘记 phaser 和替换引擎所  
以换了名字。标签中的属性都是 phaser.Group 类对象的属性， 给属性赋值就是给那些类对象赋值。属性可以用字面量  
赋值 font="'numbers'" anchor-x="0.5" 注意字符串字面量要加上单引号， 也可以用当前组件的响应式属性赋值  
x="creditPosition.x" creditPosition 就是标记为 @getter 的响应式属性， 这个属性的值来自于 redux 保存  
的 state 对象。注意虽然属性是响应式的， 但是并没有使用 l-bind 指令， 因此页面并不会动态改变， 只是在第一次  
创建这个组件的时候用到 creditPosition.x 的值。而 l-bind-text="creditValue" 这样为标签的 text 属性做  
了绑定后，界面就会动态响应 creditValue 值的变化。  

## 响应式属性

响应式属性就是在属性值变化时， 响应式系统可以感知到的属性。这种属性由类的成员变量添加注解来指明， 一共有三中  
注解：
* data 用于标注一个响应式属性， 该属性只能在组件内部才能访问得到， 并且可以自由赋值, 注意虽然有 TS 的private  
限制， 但是 js 这种灵活的语言还是可以在组件外部使用某些方法访问和修改该属性， 但是不要这样做。
* prop 表示该属性的值是由父组件传进来的，虽然（暂时）可以修改，但是在组件内部不要试图修改这个值，否则会造成数  
据流向不清楚，调试困难。
* getter 这种属性的值是由 redux 管理的 state 中取到的，取值方式是给注解传入一个路径字符串， 从根路径开始一路  
引用到需要的属性。getter 属性不能赋值，只能由 redux 的 action 触发修改。  

## 指令
指令也是照搬的 vue 和 angular 的概念。指令用来给标签实例添加功能。  
指令的形式： l-[名称]-[参数] = "[表达式]", 参数可以没有，表达式可以是任何有效的 JavaScript 表达式， 表达式  
中只能访问到组件实例的属性值和基本类型的字面量，只支持一个方法调用 bind 方法。   
一共内置了 6 种指令：
* l-bind &emsp;将标签类的属性绑定到表达式的值，使标签类自动响应表达式值的变化。指令的参数就是要绑定的属性。  
l-bind-visible = " test "，当 test 为 true 时， 该标签实例才可见。还有 l-bind-x, l-bind-key等等，关于哪  
些属性可以绑定，在标签一节中详细说明。  
* l-ref &emsp;使得 component 实例可以通过 this.$$refs.xxx 访问到标签类的实例。例如：
模板中定义 l-ref="'reelSound' + reelIndex"  
``` javascript
<sound-task l-ref="'reelSound' + reelIndex">
    <sound key="'scatsto0' + (reelIndex + 1)" l-if="list[0] === scatterKey || list[1] === scatterKey || list[2] === scatterKey"></sound>
    <sound key="'spin_end' + (reelIndex + 1)" l-if="list[0] !== scatterKey && list[1] !== scatterKey && list[2] !== scatterKey"></sound>
</sound-task>
```
然后在组件类的方法中可以访问到该标签实例：
``` javascript
tweenDone(index) {
    this.$$refs['reelSound' + index].play();
}
```
* l-wref &emsp;与 l-ref 类型， 不过是将标签类的实例暴露到 window 全局变量下。用 window.$$refs.xxx 来访问。


