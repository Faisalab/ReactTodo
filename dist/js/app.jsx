// import './main.css'

class App extends React.Component {
  
    
    state = {
        input: '',
        tasks: [],
        error: false
    }

    input = e => {
        e.preventDefault();
        //set input to whats being typed in the input field
        this.setState({ input: e.target.value });
    }

    addTask = e => {
        e.preventDefault();

        let taskArray = this.state.tasks;

        if(this.state.input === ''){
            this.setState({
                error: true
            });
        } else {
            //push the new task to the array copy
            taskArray.push(this.state.input);
            //setState the tasks to be the array copy
            this.setState({
                tasks: taskArray
            });
            //clear the input field
            this.clear();
        }
    }

    clear = () => {
        this.setState({
            input: ''
        });
    };

    remove = index => {

       this.setState({
           tasks: [
            //    start from 0 and go to the index, slice it...
               ...this.state.tasks.slice(0, index),
            //    and then go beyond only the selcted index, so it is the only thing removed
               ...this.state.tasks.slice(index +1)
           ]
       });
        console.log(this.state.tasks);
    };

    alert = () => {
        // if(error === true){
            setTimeout(() => {
                return 'Please add todo'
            },2000);
        // }
        
    }


    render() {
        const { error } = this.state;
        return (
            <div className="container">
                <div className="row ">
                    <div className="col title-div">
                        <Heading input="Todo List" />
                    </div>
                    
                </div>

                <div className="row">
                    <div className="col">
                        <Form 
                        input={this.input} 
                        error={this.state.error} 
                        value={this.state.input} 
                        addinput={error ? this.alert : this.addTask} 
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <div className="list-group">
                            <h4>Task's remaining: </h4>
                            {this.state.tasks.map( (task , i) => 
                                <Tasks key={i} task={task} remove={() => this.remove(i)} />
                            )}
                        </div>
                    </div>
                </div>
                
               
                

               {/* {error ? this.alert() : ''} */}
                
               

              
            </div>

        )
    }
}


const Heading = props => {
    return(
        <h1>{props.input} <a href="https://github.com/Faisalab"><i class="fab fa-github"></i></a> </h1>
    )
}


const Form = props => {
    return(
        <form onSubmit={props.addinput}>
            <div className="form-group">
                
                <label htmlFor="input" className="lead text-light">Add Task: </label>

               

                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1"><i class="fas fa-list-ul"></i></span>
                    </div>

                    <input 
                        type="text" 
                        onChange={props.input} name="input" 
                        placeholder="Type Todo" className={props.error ? "form-control is-invalid" : "form-control"} 
                        value={props.value} placeholder="New todo.." 
                    />

                    </div>

                <button className="add btn btn-secondary" type="submit">Add Task</button>
            </div>
        </form>
    )   
}

const Tasks = props => {
    return(
        <button type="button" className="list-group-item list-group-action"><span className="todo">{props.task}</span> <a onClick={props.remove} ><i class="fas fa-minus-circle"></i></a> </button>
    )
}



ReactDOM.render(<App />, document.getElementById("root"));