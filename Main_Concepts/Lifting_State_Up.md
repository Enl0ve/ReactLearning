> ### 状态提升
> #### 通常一些组件需要共用状态数据。我们推荐将共享的状态数据提升至他们最近的父组件进行管理。让我们看看具体这是如何操作的。

> #### 在这一章节中，我们将创建一个温度计算组件，根据给出的温度来判断是否能够让水沸腾。 
> #### 我们将创建一个BoilingVirdect组件，用一个temperature属性来计算温度是否足够让水沸腾。
```javascript
    function BoilingVirdect(props) {
        if( props.temperature > 100){
            return <p>The water can boil</p>
        }
        
        return <p>The water can not boil</p>
    }

    ReactDOM.render(
        <BoilingVirdect temperature={ 80 }/>
    );
```

> #### 下面，我们将创建一个Caculator组件来渲染一个输入框，让你手动输入温度值并且将值保存在this.state.temperature中。
> #### 另外，它也反应了BoiliingVirdect组件的值。
```javascript
    class Caculator extends React.Component{
        constructor(props){
            super(props);
            this.handleChange = this.handleChange.bind(this);
            this.state = {
                temperature: '',
            };
        }

        handleChange(event) {
            this.setState({
                temperature: event.target.value
            });
        }

        render(){
            const temperature = this.state.temperature;

            return (
                <fieldset>
                    <legend>Enter temperature in Celsius</legend>
                    <input value={temperature} onChange={this.handleChange}/>

                    <BoilingVirdect temperature={ parseFloat(temperature)}/>
                </fieldset>
            );
        }
    }
```

> ### 添加第二个输入值
> #### 我们的新要求就是，除了摄氏度值，我们需要添加一个华氏度值，并且两者的值保持同步更新。
> #### 我们从Caculator组件中提取一个TmpInput组件。并且给它添加一个新的"scale"属性，其值为'f'或者'c'的任意一个。
```javascript
    const scaleNames = {
        'c':"Celsius",
        'f':"fahrenheit"
    }

    class TmpInput extends React.Component {
        constructor(props) {
            super(props);
            this.handleChange = this.handleChange.bind(this);
            this.state = {
                temperature:'',
                scale:'c'
            };
        }

        this.handleChange(e) {
            this.setState({
                temperature: e.target.value
            });
        }

        render() {
            const scale = this.state.scale;
            const temperature = this.state.temperature;
            return (
                <fieldset>
                    <legend>Enter temperature in {scaleNames[scale]}</legend>
                    <input value={temperature} 
                            onChange={this.handleChange}/>

                    <BoilingVirdect temperature={ parseFloat(temperature)}/>
                </fieldset>
            );
        }
    }
```
> #### 现在我们可以将Caculator组件渲染成两个单独的输入框
```javascript
    ReactDOM.render(
        <div>
            <TmpInput scale='c'/>
            <TmpInput scale='f'/>
        </div>
    );
```
> #### 现在我们有两个输入框了，但是当我们输入其中一个的时候，另一个不会输入框的值不会发生变化，这和我们的需求不符合。我们需要两个输入框组的值同时更新。
> #### 我们无法从Caculator中显示BoilingVirdect,因为temperature的值在TmpInput内部。

> ### 写出转变函数
> #### 首先，我们写出两个函数来转换摄氏度和华氏度的值。
```javascript
    function convert2Celsius(input) {
        return (input - 32)*5/9;
    }

    function convert2Fahrenheit(input) {
        return (input*5/9) -32;
    }
```
> #### 上面两个函数转换数值。我们写另一个函数将temperature和转换函数作为参数，并且返回一个字符串。我们使用它来计算输入框基于另一个输入框的值得出的结果。
> ####　如果temperature是不合法的值，则返回空值。 返回值保留后三位小数。
```javascript   
    function convert(temperature, convertCb) {
        cont input = parseFloat(temperature);
        if(Number.isNaN(input)){
            return '';
        }

        const output = convertCb(input);
        const round = (output*1000)/1000;
        return round.toString();
    }
```

> ### 提升状态数据
> #### 当前，两个TempInput组件在局部状态中独立地保存各自的值。
```javascript
    class TmpInput extends React.Component {
        constructor(props) {
            super(props);
            this.handleChange = this.handleChange.bind(this);
            this.state = {
                temperature:'',
                scale:'c'
            };
        }

        this.handleChange(e) {
            this.setState({
                temperature: e.target.value
            });
        }

        render() {
            const scale = this.state.scale;
            const temperature = this.state.temperature;
            //return element object
        }
```
> #### 但是，我们想要两个输入框组相互同步反应值。当温度的值发生改变时，华氏度的值同样的能够显示出相应的值，反之亦然。
> #### 在React中，我们同意通过将状态数据提升到最近的父组件中来实现状态数据共享。这称为“状态提升”。我们将temperature从TmpInput组件中转移到Caculator组件中。
> #### 如果Caculator组件拥有了共享状态数据，那么当前温度值就会称为两个输入框组的数据源。它会传递给下面温度输入组件一致的数据。由于两个 TemperatureInput 温度组件的props属性都是来源于共同的父组件 Calculator，它们的数据也会保持同步。
> #### 让我们来一步一步看看这是如何实现的。
> #### 首先，让我们在TmpInput组件中用this.props.temperature来替代this.state.temperature。现在，让我们假设this.props.temperature已经存在，即使未来我们需要通过Caculator组件来传递它。
```javascript
   render(){
       //before: const temperature = this.state.temperature;
       const temperature = this.props.temperature;
   }
```
> #### 我们知道属性是只读的。当temperature是局部状态时，我们只能通过调用this.setState()去改变它的值。既然temperature已经成为来自父组件的一个属性，那么组件TmpInput已经是失去了对它的控制。
> #### 在React中，通常使得这个组件被控制来解决这个问题，就像DOM元素input接受属性value和onChange一样,组件TmpInput一样可以从它的父组件中接受temperature和onTemperature属性。
```javascript
    handleChange(e) {
        //before: this.setState({temperature: e.target.value});
        this.props.onTemperatureChange(e.target.value);
    }
```

> #### <font sytle="color:red">Note:</font>其中的temperature和onTemperatureChange并没有什么特别的意义。但是使用on+值+Change是一个命名规范。

> #### onTemperatureChange属性将和temperature属性一起被父组件提供。组件可以通过自身的方法来响应状态数据的改变，从而使用新的值来重新渲染两个输入框组件。不过我们先放着，最后再来修改它。
> #### 在我们改写Caculator组件之前，让我们先概括一下TmpInput组件的改变。我们可以将局部状态数据从它移除出去，并且现在读取this.props.temperature，而不是读取this.state.temperature。我们使用Caculator组件提供的onTemperatureChange属性来代替this.setState()函数改变值。
```javascript
    class TmpInput extends React.Component {
        constructor(poprs) {
            super(props);
            this.hanleChange = this.handleChange.bind(this);
        }

        handleChange(e) {
            this.props.onTemperatureChange(e.target.value);
        }

        render() {
            const temperature = this.props.temperature;
            const scale = this.props.scale;

            return (
                <filedset>
                    <legend>Enter temperature in {ScaleNames[scale]}</legend>
                    <input value={temperature} onChange={this.handleChange}/>
                </filedset>
            );
        }
    }
```
> #### 现在让我们转换到Caculator组件
> #### 我们将在局部状态中保存temperatue和scale。提升的状态数据将成为两个输入框组公用的数据源。
> #### 这是我们所需要的能够重新渲染并且表示两个不同输入组件的最基本的数据.

> #### 比如：我们在摄氏度输入框中输入37，那么Caculator的状态将会是：
```javascript
    {
        temperature:'37',
        scale:'c'
    }
```
> #### 如果编辑的输入框是华氏度，输入212，那么Caculator的状态是:
```javascript
    {
        temperature:'212',
        scale:'f'
    }
```
> #### 我们可以保存两个数据的状态。但是这没有必要，保存最近改变的数据和它的单位就足够了，我们可以根据当前的状态值来推断出另一个状态的值和单位。
> #### 现在输入框中的值是保持同步的，因为它们用的值来自于相同的状态。
```javascript
    class Caculator extends React.Component {
        constructor(props) {
            super(props);
            this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
            this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
            this.state = {
                temperature:'',
                scale:'c'
            }
        }

        handleCelsiusChange() {
            this.setState({
                temperature: this.state.temperature,
                scale:'c'
            });
        }

        handleFahrenheitChange() {
            this.setState({
                temperature: this.state.temperature,
                scale:'f'
            });
        }

        render() {
            const scale = this.state.scale;
            const temperature = this.state.temperature;
            const Celsius = temperature=='f'?convert(temperature, convert2Celsius):temperature;
            const fahrenheit = scale==='c'?convert(temperature, convert2Fahrenheit):temperature;

            return (
                <div>
                    <TmpInput scale='c' temperature={Celsius} onTemperatureChange={this.handleCelsiusChange}/>
                    <TmpInput scale='f' temperature={fahrenheit} onTemperatureChange={this.handleFahrenheitChange}/>

                    <BoilingVirdect temperature={parseFloat(Celsius)}/>
                </div> 
            );
        }
    }
```

> #### 现在，无论你编辑哪一个输入框，Calculator 组件中 this.state.temperature 和 this.state.scale 都会更新。其中之一的输入框得到用户原样输入的值，另一个输入框总是显示基于这个值计算出的结果。
> #### 让我们梳理下编辑输入框时所发生的一系列活动：
> 1. React在DOM原生组件input上调用指定的onChange函数。在本例中，指的是TemperatureInput组件上的handleChange函数。
> 2. TemperatureInput组件的handleChange函数会在值发生变化时调用this.props.onTemperatureChange()函数。这些props属性，像onTemperatureChange都是由父组件Calculator提供的。
> 3. 当最开始渲染时，Calculator组件把内部的handleCelsiusChange方法指定给摄氏输入组件TemperatureInput的onTemperatureChange方法，并且把handleFahrenheitChange方法指定给华氏输入组件TemperatureInput的onTemperatureChange。两个Calculator内部的方法都会在相应输入框被编辑时被调用。
> 4. 在这些方法内部，Calculator组件会让React使用编辑输入的新值和当前输入框的温标来调用this.setState()方法来重渲染自身。
> 5. React会调用Calculator组件的render方法来识别UI界面的样子。基于当前温度和温标，两个输入框的值会被重新计算。温度转换就是在这里被执行的。
接着React会使用Calculator指定的新props来分别调用TemperatureInput组件.React也会识别出子组件的UI界面。
> 6. React DOM 会更新DOM来匹配对应的值。我们编辑的输入框获取新值，而另一个输入框则更新经过转换的温度值。
一切更新都是经过同样的步骤，因而输入框能保持同步的。
