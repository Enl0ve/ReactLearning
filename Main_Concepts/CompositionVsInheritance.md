> ## 组合 VS 继承
> ### React有一个强力的组合模式。并且我们推荐使用组合代替继承在组件之间重用代码。
> #### 在这章节中，我们将思考一下React新手在使用继承时会碰到的一些问题，并且展示一下用组合来解决问题。

> ## 包含关系
> #### 一些组件无法提前知道他们的子组件。这对于sidebar或者Dialog这类通用容器很常见的。
> #### 这样的组件推荐使用特殊的children属性直接传递子元素给它们的输出。
```javascript
    function FancyBorder(props) {
        return (
            <div className={'FancyBorder FancyBorder-' + props.color}>
                {props.children}
            </div>
        );
    }
```
> #### 这样做还允许其他组件通过嵌套JSX来传递子组件。
```javascript
    function WelcomeDialog() {
        return (
            <FancyBorder color='blue'>
                <h1 className="Dialog-title">
                    Welcome
                </h1>
                <p className="Dialog-message">
                    Thank you for visiting out spacecraft
                </p>
            </FancyBorder>
        );
    }
```
> #### <FancyBorder>JSX标签内的任何内容都将通过children属性被传入FancyBorder。由于FancyBorder在一个<div>内渲染了{props.children}，所以被传递的所有元素都会出现在最终输出中。
> #### 虽然不太常见，但是有时你可能需要在组件中有多个入口。这种情况下你可以使用自己约定的属性而不是children。
```javascript
    function SplitPane(props) {
        return (
            <div className="SplitPane">
                <div className="SplitPane-left">
                    {props.left}
                </div>
                <div className="SplitPane-right">
                    {props.right}
                </div>
            </div>
        );
    }

    function App() {
        return (
            <SplitPane left={ <Contacts />} right={ <Chat/>}/>
        );
    }
```
> #### 类似<Contacts />和<Chat />这样的React元素都是对象，所以你可以像任何其他元素一样传递它们。

> ### 特殊实例
> #### 有时我们认为组件是其组件的特殊实例，比如，我们会说WelcomeDialog是Dialog的特殊实例。
> #### 在React中，这也是通过组合来实现的，通过配置属性用比较特殊的组件来渲染教通用的组件。
```javascript
    function Dialog(props) {
        return (
            <FancyBorder color="blue">
                <h1 className="Dialog-title">
                    {props.title}
                </h1>
                <p className="Dialog-message">
                    {props.message}
                </p>
            </FancyBorder>
        );
    }

    function WelcomeDialog() {
        return (
            <Dialog title="Welcome"
                    message="thank you for visiting out spacecraft" />
        );
    }
```

> #### 组合对于为类的组件同样适用
```javascript
    function Dialog(props) {
        return (
            <FancyBorder color="blue">
                <h1 className="Dialog-title">
                    {props.title}
                </h1>
                <p className="Dialog-message">
                    {props.message}
                </p>
            </FancyBorder>
        );
    }

    class SignUpDialog extends React.Component {
        constructor(props) {
            super(props);
            this.handleChange = this.handleChange.bind(this);
            this.handleSignUp = this.handleSignUp.bind(this);
            this.state = {
                login:'',
            }
        }

        handleChange(e) {
            this.setState({
                login: e.target.value
            });
        }

        handleSignUp() {
            alert(`Welcome aboard,${this.state.login}`);
        }

        render() {
            return (
                <Dialog title="Mars Exploration Program" message="How should we refer to you ">
                    <input value={this.state.login} onChange={this.handleChange} />
                    <button onClick={this.handleSinUp}>
                    Sign Me Up
                    </button>
                </Dialog>
            );
        }
     }
```

> ### 请记住，组件可以接受任意元素，包括基本数据类型、React元素或函数。