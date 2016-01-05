/*var React = require('react');
var ReactDOM = require('react-dom');*/

var MyComponent = React.createClass({
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
    console.log('onSave');
  },
  onReset(){
    console.log('onReset');
  },
  render(){
    console.log(this.state.name)
    return <div className = 'container'>
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
              <input className="col-md-3 col-sm-3 col-lg-3" type = 'text' value = {this.state.work} ref = 'work' onChange={this.onChangeHandle}/>
            </div>
          </div>
          <div className="col-md-12 col-sm-12 col-lg-12 center">
            <div className="btn-group">
              <input className="btn btn-primary" type = 'button' value = 'Save'/>
              <input className="btn btn-default" type = 'button' value = 'Reset'/>
            </div>
          </div>
        </div>
      </form>
    </div>
  }
});
ReactDOM.render(<MyComponent />,document.getElementById('content'));
