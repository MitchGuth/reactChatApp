let AppTitle = () =>
    <h1 id='page-title'>Churper</h1>;

let NewChurpForm = (props) =>{
    return <form className='new-churp-form'
            onSubmit= { (event) => {
                event.preventDefault();
                props.addChurp(props.newChurp);
            }
        }>
            <input
                type= 'text'
                value= {props.newChurp} 
                onChange= {(event)=> {
                    let value = event.target.value;
                    props.setNewChurp(value)
                }
            }/>
            <button type='submit'>Submit</button>
        </form>
}

class NewChurpContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            newChurp : ''
        }
    }
    render(){
        let setNewChurp =(value)=>{
            this.setState({newChurp: value})
        }
        return <NewChurpForm 
        {...this.state} 
        {...this.props} 
        setNewChurp= {setNewChurp} />
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

let Homepage = (props) =>{
    return <div className= 'whole-page'>
            <AppTitle/>
            <NewChurpContainer addChurp= {props.addChurp}/>
            <ChurpList churps= {props.churps}/>
            </div>
}

class HomepageContainer extends React.Component {
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

        return <Homepage {...this.state} 
            {...this.props} 
            addChurp ={addChurp}/>

    };
};
ReactDOM.render( <HomepageContainer/>, document.querySelector('.react-root') );