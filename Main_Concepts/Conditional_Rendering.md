> ## 条件渲染
> ### 在React中，你创建了封装了你需要的行为的不同组件，然后，你可以根据你应用的状态，只渲染部分组件。 

> #### React条件渲染和在JS中是一样的。使用JS运算符if或者其他的来创建代表当前状态的元素，从而让React去匹配他们以更新UI。
> #### 请思考下面的代码
 ```Javascript
   function  UserGreeting() {
        return <h1>Welcome back!</h1>
    }

    function GuestGreeting() {
        return <h1>please sign up.</h1>
    } 
 ```
>#### Greeting组件根据是否有用户登陆来判断任意显示其中一个组件
 ```javascript
 function Greeting(props) {
	if(props.isLoggedIn) {
		return <UserGreeting />;
	}else{
		return <GuestGreeting />;
	}
}

 ReactDOM.render(
	<Greeting isLoggedIn={ false }/>
	document.getElementById("root")
);
 ```

> ### 元素变量
> #### 你可以使用变量来保存元素。这可以帮助你条件性地渲染一部分组件，当剩余的部分输出没有发生改变的时候。
> #### 思考一下下面两个代表登陆和登出的组件
 ```javascript
 function LogIn(props) {
	return (
		<button onClick={ props.onClick }>
			Log In
		<button/>
       );
 }
 
 function LogOut(props) {
	return (
		<button onClick={ props.onClick }>
            Log out
        </button>
		);
} 
``` 

> #### 下面是一个有状态的组件LoginControll
> #### 这个组件根据当前的状态来渲染LogInButton和LogOutButton组件中的任意一个
```javascript
  class LoggingControl extends React.Component(props) {
        constructor(props) {
            super(props);
            this.state = {
                isLoggingIn : true,
            }

            // bind  `this`
            this.handleLoggingIn = this.handleLoggingIn.bind(this);
            this.handleLoggingOut = this.handleLoggingOut.bind(this);
        }

        handleLogginIn() {
            this.setState( state => ({
                isLoggingIn: state.isLoggingIn,
            }
            ));
        }

        handleLoggingOut() {
            this.setState( state => ({
                isLoggingIn: !state.isLoggingIn,
            }));
        }

        renderLoggingIn() {
            return <LoggingIn onClick={ this.handleLoggingIn }/>
        }

        renderLoggingOut() {
            return <LoggingOut onClick={ this.handleLoggingOut } />
        }

        render() {
            return (
                const isLoggingIn = this.state.isLoggingIn;
                let button;

                if(isLoggingIn){
                    button = this.renderLoggingIn();
                }else{
                    button = this.renderLoggingOut();
                }
                <div>
                    <Greeting isLoggingIn={ isLoggingIn } />
                    { button }
                </div>
            );
        }
    }
```

> #### 除了上面使用变量来存储元素和使用If语句来进行条件渲染。但有时我们可以使用更加精简的语法来实现条件渲染。
> #### 我们可以有一些办法在JSX中内联条件。

> ### 使用带有逻辑&&运算符的内联if
> #### 你可能使用大括号(curly brace)在JSX语法中包裹任何内嵌表达式，这包含了逻辑&&运算符。它可以有条件地很容易包含一个元素
```javascript
    function Mailbox(props) {
        const unreadMessages = props.unreadMessages;
        return (
            <div>
                <h1>Hello!</h1>
                {unreadMessages.length > 0 && 
                    <h2>
                        You have {unreadMessages.length} unread messages.
                    </h2>
                }
            </div>
        );
    }

    const messages = ['React', 'Re: React', 'Re: React'];
    ReactDOm.render(
        <Mailbox unreadMessages = {message} />,
        document.getElementById('root')
    );
```
> #### 因为在Javascript，所以它会起作用， true && expression总是执行为expression,而false && expression总是执行为false。
> 因此，如果这个情况是true,&&之后的元素将会出现在输出中。如果这是false，React将会忽略并且跳过它。

> ### 内联的带有条件判断符的if-else
> #### 另一个内联的条件渲染元素的方法就是三目运算符：codition?true:false。
> #### 下面的例子中，我们使用它来条件渲染一小块文本。
```javascript
    render() {
        const isLoggedIn = this.state.isLoggedIn;

        return (
            <div>
                The user is <b>{ isLoggedIn?'currently':'not'}</b> logged in.
            </div>
        );
    }
```
> ####尽管这样不是更明显，但它可以用在更大的语句中 
```javascript
    render(){
        const isLoggedIn = this.state.isLoggedIn;
        return (
            <div>
                {isLoggedIn ? (
                    <LogoutButton onClick={this.handleLogoutClick} />
                ):(
                    <loginButton onClick={this.handleLoginClick} />
                )}
            </div>
        );
    }
```
> #### 使用什么样的风格取决于你和你的团队，但是记住一点，当条件变得很复杂是，提取组件是一个好的机会。

> ### 阻止组件渲染
> #### 少数情况下你可能想要一个组件隐藏它自己，即使它是被另一个组件渲染的。为了阻止组件渲染，需要返回null对象，而不是渲染输出。
> #### 在下面的例子中，<WarningBanner />靠着属性warn的值来渲染，如果这个值是false,组件将不会渲染
```javascript
    function WarningBanner(props){
        if(!props.warn) {
            return null;
        }

        return (
            <div className="warning">
                Warning!
            </div>
        );
    }

    class Page extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                showWarning: true,
            };
            this.handleToggleClick = this.handleToggleClick.bind(this);
        }

        handleToggleClick() {
            this.setState( states => ({
                showWarning:!states.showWarning
            }));
        }

        render() {
            return (
                <div>
                    <WarningBanner warn={this.state.showWarning} />
                    <button onClick={this.handleToggleClick}>
                        {this.state.showWarning?'Hide':'Show'}
                    </button>
                </div>
            );
        }
    }

    ReactDom.render(
        <Page />
        document.getElementById('root')
    );
```
> #### 一个组件的渲染方法返回Null将不会影响组件的生命周期方法的触发。比如componentDidUpdate方法将仍会被触发。
