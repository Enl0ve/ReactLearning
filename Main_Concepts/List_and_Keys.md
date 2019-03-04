> ## List and Keys
> #### 首先，让我们先复习一下在Javasript中如何转列表。
> #### 下面给出的代码中，使用map()函数遍历数组中的每一个元素，将其放大双倍，并且返回一个新的数组并且打印每一个元素，
```javacript
    const numbers = [1, 2, 3, 4, 5];
    number.map( el => { console.log(el); el*2;});
```
> #### 在React中，列表的转换和JavaScript几乎是一样的。

> ### 渲染多个组件
> #### 你可以创建元素集合并且用大括号包裹在JSX中。
> #### 下面的例子中，我们使用map()函数来遍历数组numbers,并且返回<li>元素，并且将结果分配给变量ListItems。
```javascript
    const numbers = [1, 2, 3, 4, 5];
    let ListItems = numbers.map( el => return <li>{ el }</li>);
```
> #### 我们将整个ListItems数组放在<ul>标签中，并且在渲染出来
```javascript
    const numbers = [1, 2, 3, 4, 5];
    let ListItems = numbers.map( el => <li>{ el }</li>);

    ReactDOM.render(){
        <ul>
            { ListItems }
        </ul>
        document.getElementById('root');
    };
```

> ### 基本列表组件
> #### 一般情况下你将在一个组件里渲染一个列表
> #### 我们可以通过一个接受数组并输出列表元素的组件来重构(refactor)上一个例子。
```javascript
    function ListItems(props) {
        const number = props.number;
        const listItems = number.map( (number) => <li>{number}</li>);

        return (
            <ul>
                {listItems}
            </ul>
        );
    }

    const numbers = [1, 2, 3, 4, 5];
    ReactDOM.render(
        <ListItems number={ numbers }/>
        document.getElementById('root')
    );
```
> #### 当我们运行这个例子的时候，我们可以发现浏览器中有个警告'Each child in a list should have a unique "key" prop.'
> #### "key"是一个我们在创建列表元素的时候需要包含的特殊的字符串属性。
> #### 让我们给每一个list都分配一个key,解决这个warning.
```javascript
    function ListItems(props) {
        const number = props.number;
        const listItems = number.map(
            (number) => <li key={number.toString()}>
                {number}
            </li>
        );

        return (
            <ul>
                {listItems}
            </ul>
        );
    }

    const number = [1, 2, 3, 4, 5];
    ReactDOM.render(
        <ListItems number={number}/>
        document.getElementById('root');    
    );
```

> ### Key
> #### 键名(keys)帮助React识别哪一个元素被新加了，哪一个元素被删除了，哪一个元素被改变了。为了给元素一个稳定的认证，键名应该在数组内部给予元素。
```javascript
    const number = props.number;
        const listItems = number.map(
            (number) => <li key={number.toString()}>
                {number}
            </li>
        );
```
> #### 最好的方法是在你的兄弟姐妹们中使用一个独一无二的字符串值作为你的key。大多数情况下你应该使用来自数据的ID作为你的key。
```javascript
    const listItems = number.map( number => 
        <li key={number.id}>
            {number.text} 
        </li>   
    );
```
> #### 当你没有ID的时候，你可以使用最近一次排序的集合的索引作为key的值
```javascript
    const listItems = number.map( (number, index) =>
        <li key={index}>
            {number.text}
        </li>
    );
```
> #### 实际上并不推荐使用索引作为key，如果对象的顺序可能会发生改变的话。这会对性能有一个消极的影响，并且会对组件的状态产生问题。如果你选则不给list元素分配一个key,那么React会默认使用索引作为key值。

> ## 注：<font style="color:red">下面由篇国外大佬写的文章，感兴趣的可以点击查看</font>
> ### 记得加注释。查一下链接
> ### 

> ### 用key提取组件
> #### Key只在上下文对象中的包围的数组中才能起作用
> #### 比如，如果你想提取ListItems组件，那么你需要将key放在元素<ListItems>中，而不是<li>元素中。
> #### 实例，错误的使用
```javascript
    function ListItems(props) {
        const value = props.value;
        return (
            //wrong, there is no need to spepcify key here
            <li key={value.toString()}>
                {value}
            </li>
        );
    }

    function NumberList(props) {
        const number = props.number;
        cosnt numberList = number.map( (number) => 
            //wrong, keys should be specified here
            <ListItems value={number} />
        );

        return (
            <ul>
                {numberList}
            </ul>
        );
    }

    const number = [1, 2, 3, 4, 5];
    ReactDOM.render(
        <NumberList number={number} />
        document.getElementById('root');
    );
```
> #### 实例，正确的写法
```javascript
    function ListItems(props) {
        const value = props.value;
        return (
            <li>
                {value}
            </li>
        );
    }

    function NumberList(props) {
        const number = props.number;
        const listItems = number.map( number => 
            <ListItems key={number.toString()} vlaue={number}/>    
        );

        return (
            <ul>
                { listItems}
            </ul>
        );
    }

    const number = [1, 2, 3, 4, 5];
    ReactDOM.render(
        <NumberList number={number} />
        document.getElementById('root')
    );
```
> #### 如果你能很清楚地区分key的使用位置，那么请记住一条规则：在map()函数内部使用key是一个不错的方法

> ### 在同级元素中kuy必须保持唯一性
> #### 在同级元素中，key必须保持唯一性，但是并不需要做到全局唯一性。我们可以使用相同的key当我们产生不同的数组时：
```javascript
    function ListItems(props) {
        const number = props.number;
        const title = number.map( number => 
            <li key={number.id}>{number.text}</li>
        );
        const content = number.ma( number =>
            <li key={number.id}>{number.text}</li>
        );
        return (
            <div>
                <ul>
                    {title}
                </ul>
                <hr />
                <ul>
                    {content}
                </ul>
            </div>
        );
    }
    
    const number = [
        {id:'Gu', text:'TingYe.Gu'},
        {id:'Sheng', text:'MingLan.Sheng'}
    ];

    ReactDOM.render(
        <ListItems number={number} />
        document.getElementById('root')
    );
```
> #### key作为一个隐射(hint),但是却不会被传递到组件中，如果你需要这个值，那么你可以把这个值传递给另一个不同名字的属性
```javascript
    const content = number.map(
        number => <li key={number.id} value={number.id}>{number.text}</li>
    );
```
> #### 这样写的话，你可以在组件中看到value属性，但是看不到key属性。、

> ### 在JSX中内嵌map函数
```javascript
    function ListItems(props) {
        const number = props.number;
        
        return (
            <ul>
                {
                    number.map( number => 
                        <li key={number.id}>{number.text}</li>    
                    )
                }
            </ul>
        );
    }

    const number = [1, 2, 3, 4, 5];
    ReactDOM.render(
        <ListItems number={number} />
        document.getElemntById('root')
    );
```
> #### 有时候这样写会让代码变的更加的简洁。但是也有可以会引起滥用。但是取决于你，是否值得为了可读性而提取一个变量。你需要记住的是如果map()函数回调函数内部嵌套太多，那么就是提取组件的好时机。