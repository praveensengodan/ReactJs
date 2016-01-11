/*var React = require('react');
var ReactDOM = require('react-dom');*/

var FormComponent = React.createClass({
  getInitialState: function() {
    return {
      id: 0,
      name: '',
      work: '',
    };
  },
  handleChange(){
    this.setState({
      id :  this.refs.id.value,
      name : this.refs.name.value,
      work : this.refs.work.value,
    })
  },
  onSave(){
  console.log('onsave');
      $.ajax({
            url : "http://localhost:3000/people",
            method : "post",
            dataType : "json",
            contentType : "application/json",
            data : JSON.stringify({id : this.state.id,name: this.state.name, work : this.state.work})
        }).then(function(data){
             ReactDOM.render(<TableComponent />,document.getElementById('content'));
        });
  },
  onReset(){
    console.log('onReset');
  },
  render(){
    console.log(this.state.name)
    return <div>
      <form className = 'well'>
        <div className="row">
          <div className="col-md-12 col-sm-12 col-lg-12 field">
              <div className="row">
                <span className="col-md-3 col-sm-3 col-lg-3">Id</span>
                <input className="col-md-3 col-sm-3 col-lg-3" type = 'number' value = {this.state.id} ref = 'id' onChange={this.handleChange}/>
              </div>
          </div>
          <div className="col-md-12 col-sm-12 col-lg-12 field">
            <div className="row">
              <span className="col-md-3 col-sm-3 col-lg-3">Name</span>
              <input className="col-md-3 col-sm-3 col-lg-3" type = 'text' value = {this.state.name} ref = 'name' onChange={this.handleChange}/>
            </div>
          </div>
          <div className="col-md-12 col-sm-12 col-lg-12 field">
            <div className="row">
              <span className="col-md-3 col-sm-3 col-lg-3">Work</span>
              <input className="col-md-3 col-sm-3 col-lg-3" type = 'text' value = {this.state.work} ref = 'work' onChange={this.handleChange}/>
            </div>
          </div>
          <div className="col-md-12 col-sm-12 col-lg-12 center">
            <div className="btn-group">
              <input className="btn btn-primary" type = 'button' value = 'Save' onClick={this.onSave}/>
              <input className="btn btn-default" type = 'button' value = 'Reset'/>
            </div>
          </div>
        </div>
      </form>
    </div>
  }
});
var TableComponent = React.createClass({
  getInitialState(){
    return {
      entity:[],
      isLoading: true
    }
  },
  onAdd(){
    ReactDOM.render(<FormComponent />,document.getElementById('content'));
  },
  componentWillMount(){
    $.ajax({
          url : "http://localhost:3000/people",
          method : "GET",
          dataType : "json",
          contentType : "application/json"
      }).then(function(data){
          this.setState({
            entity:data,
            isLoading : false
          })
      }.bind(this));
  },
  onDelete() {
    $.ajax({
        url : "http://localhost:3000/people/"+arguments[0],
        method : "DELETE",
        dataType : "json",
        contentType : "application/json"
    }).then(function(data){
      this.setState({
          isLoading : false
      })
    }).catch(function(err){
        this.setState({
            isLoading : true
        })
    })
  },
  render(){

    var  tbody = [];
    if(this.state){
      tbody = this.state.entity.map(function(tableData){
          return(
            <tr>
              <td>{tableData.id}</td>
              <td>{tableData.name}</td>
              <td>{tableData.work}</td>
              <td><button onClick = {this.onDelete.bind(null,tableData.id)} className="btn btn-danger">Delete</button></td>
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
        <div className='well loading'><span className ="glyphicon glyphicon-refresh glyphicon-spin"></span>.</div>
      </div>
    )
  }

});
ReactDOM.render(<TableComponent />,document.getElementById('content'));
