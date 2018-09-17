let AppTitle = () =>
    <h1 id='page-title'>Churper</h1>;

class NewChurpForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            newChurp : ''
        }
    }
    render(){
        return( <form className='new-churp-form'
            onSubmit= { (event) => {
                event.preventDefault();
                this.props.addChurp(this.state.newChurp);
            }
        }>
            <input
                type= 'text'
                value= {this.state.newChurp} 
                onChange= {(event)=> {
                    let value = event.target.value;
                    this.setState({newChurp: value})
                }
            }/>
            <button type='submit'>Submit</button>
        </form>);
    }
};

let IndividualChurp = (props) => 
    <li>
        <p className='individual-churp'>Churp: {props.churp.content}</p>
    </li>

let ChurpList = (props) =>
    <ul className='churp-list'>
        {props.churps.map(churp =>
        <IndividualChurp churp= {churp} key= {churp.id} />)
    }
    </ul>

let generateId = () =>
  Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString();

class Homepage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            churps: []
        }
    }
    componentDidMount() {
        let retrievePosts = () =>
            fetch(`http://0.tcp.ngrok.io:11971/wassups.json`)
                .then(response =>{
                    return response.json()})
                    .then(data =>{
                        this.setState({churps: data});
                    })
        retrievePosts();
    }
    render() {
        
        let addChurp = (newChurp) => {
            this.setState({churps: this.state.churps.concat([
                    {
                        userId: 1,
                        id: generateId(),
                        content: newChurp
                    }
                ])
            })
        }

        return (<div className= 'whole-page'>
            <AppTitle/>
            <NewChurpForm addChurp= {addChurp}/>
            <ChurpList churps= {this.state.churps}/>
            </div>
        )};
};

ReactDOM.render( <Homepage/>, document.querySelector('.react-root') );
