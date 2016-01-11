let AppDispatcher = require('../dispatcher/AppDispatcher');
let EventEmitter = require('events').EventEmitter;
let assign = require('object-assign');
let AppAPI = require('../API/AppAPI');
let AppConstants = require('../constants/AppConstants');


const SAVE = 'save';
const CHANGE_EVENT = 'change';
const DELETE = 'delete';

// Internal object of shoes
let _person = [];

// Method to load shoes from action data
``
// Merge our store with Node's Event Emitter
let AppStore = assign({},EventEmitter.prototype, {

  // Returns all shoes
  getPerson: function() {
    return _person;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  emitSave: function() {
    this.emit(SAVE);
  },
  emitDelete: function() {
    this.emit(DELETE);
  },
  onSaveComplete: function(callback) {
    this.on(SAVE,callback);
  },
  onDeleteComplete: function(callback) {
    this.on(DELETE,callback);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  getAllPersons: function() {
     AppAPI.getAllPerson().then(function(data){
       _person = data;
        AppStore.emitChange();
     }).catch(function(error){
       console.log("error in store");
     })

  }

});

function addPerson(data) {
  console.log("in addPerson",data);
  AppAPI.addPerson(data).then(function(val){
    console.log("promise then");
     AppStore.emitSave();
     console.log("after emitting change");
  }).catch(function(error){
    console.log("error in store");
  })
}

function deletePerson(pesrsonID) {
  AppAPI.deletePerson(pesrsonID).then(function(data){
     AppStore.getAllPersons();
     AppStore.emitDelete();
  }).catch(function(error){
    console.log("error in store");
  })
}

// Register dispatcher callback
AppDispatcher.register(function(payload) {
  let action = payload.action;

  // Define what to do for certain actions
  switch(action.actionType) {
    case AppConstants.ADD_PERSON:
      console.log("inDispatcher",action.entity);
      // Call internal method based upon dispatched action
      addPerson(action.entity);
      break;
    case AppConstants.DELETE_PERSON:
      // Call internal method based upon dispatched action
      deletePerson(action.id);
      break;

    default:
      return true;
  }

  // If action was acted upon, emit change event
  AppStore.emitChange();

  return true;

});



module.exports = AppStore;
