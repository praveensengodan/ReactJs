let React = require('react');
let ReactDOM = require('react-dom');
let AppStore = require('./src/js/stores/AppStore.js');
let AppActions = require('./src/js/actions/AppAction.js');

class FormComponent extends React.Component{
  constructor() {
   super();
     this.state ={
         id: 0,
         name: '',
         work: '',
     }
     this.handleChange = this.handleChange.bind(this);
     this.onSave = this.onSave.bind(this);
     this.onReset = this.onReset.bind(this);
  }
  handleChange(){
    this.setState({
      id :  this.refs.id.value,
      name : this.refs.name.value,
      work : this.refs.work.value,
    })
  }
  triggerReload() {
    console.log("triggerReload");
    ReactDOM.render(<TableComponent />,document.getElementById('content'));
  }
  onSave(){
    let entity = {
      id :  this.state.id,
      name : this.state.name,
      work : this.state.work
    }
    AppStore.onSaveComplete(this.triggerReload);
    AppActions.addPerson(entity)
  }
  onReset(){
    this.setState({
        id :  0,
        name : '',
        work : '',
    })
  }
  render(){
    return <div>
      <form className = 'well'>
        <div className="row">
          <div className="col-md-12 col-sm-12 col-lg-12 field">
              <div className="row">
                <span className="col-md-3 col-sm-3 col-lg-3">Id</span>
                <input className="col-md-3 col-sm-3 col-lg-3" type = 'number' value = {this.props.id} disabled = "disabled" ref = 'id'/>
              </div>
          </div>
          <div className="col-md-12 col-sm-12 col-lg-12 field">
            <div className="row">
              <span className="col-md-3 col-sm-3 col-lg-3">Name</span>
              <input className="col-md-3 col-sm-3 col-lg-3" type = 'text' value = {this.state.name}  ref = 'name' onChange={this.handleChange}/>
            </div>
          </div>
          <div className="col-md-12 col-sm-12 col-lg-12 field">
            <div className="row">
              <span className="col-md-3 col-sm-3 col-lg-3">Work</span>
              <input className="col-md-3 col-sm-3 col-lg-3" type = 'text' value = {this.state.work} ref = 'work' onChange={this.handleChange} />
            </div>
          </div>
          <div className="col-md-12 col-sm-12 col-lg-12 center">
            <div className="btn-group">
              <input className="btn btn-primary" type = 'button' value = 'Save' onClick={this.onSave}/>
              <input className="btn btn-default" type = 'button' value = 'Reset' onClick={this.onReset}/>
            </div>
          </div>
        </div>
      </form>
    </div>
  }
}
class TableComponent extends React.Component {
  constructor() {
   super();
     this.state ={
       entity:[],
       isLoading: true
     }
     this.getAllPerson = this.getAllPerson.bind(this);
     this.onAdd = this.onAdd.bind(this);
     this.triggerReload = this.triggerReload.bind(this);

  }

  componentDidMount() {
    AppStore.addChangeListener(this.getAllPerson);
    AppStore.getAllPersons();
  }

  getAllPerson(){
    this.setState({
      entity: AppStore.getPerson()
    })
  }

  onAdd(){
    console.log(this.state);
    ReactDOM.render(<FormComponent id={this.state.entity.length+1}/>,document.getElementById('content'));
  }
  triggerReload() {
    window.location.reload(true);
  }
  onDelete() {
    AppStore.onDeleteComplete(this.triggerReload);
    AppActions.deletePerson(arguments[0]);
  }

  render(){
    console.log("in render",this.state);
    let  tbody = [];
    if(this.state.entity.length){
      tbody = this.state.entity.map(function(tableData){
          return(
            <tr>
              <td>{tableData.id}</td>
              <td>{tableData.name}</td>
              <td>{tableData.work}</td>
              <td><button onClick={this.onDelete.bind(this,tableData.id)} className="btn btn-danger">Delete</button></td>
            </tr>
          )
      }.bind(this))
    }
    return (
      <div className = 'container'>
        <h1>Table Of Contents</h1>
        <table className = 'table'>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Work</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tbody}
          </tbody>
        </table>
        <input className="btn btn-primary" type = 'button' value = 'Add' onClick={this.onAdd}/>
      </div>
    )
  }

}
ReactDOM.render(<TableComponent />,document.getElementById('content'));
