let AppDispatcher = require('../dispatcher/AppDispatcher');
let AppConstants = require('../constants/AppConstants');

let AppActions = {
  addPerson: function(entity){
    console.log("in action",entity);
    AppDispatcher.handleViewAction({
      actionType:AppConstants.ADD_PERSON,
      entity: entity
    })
  },

  deletePerson: function(id){
    AppDispatcher.handleViewAction({
      actionType:AppConstants.DELETE_PERSON,
      id: id
    })
  }
}

module.exports = AppActions
