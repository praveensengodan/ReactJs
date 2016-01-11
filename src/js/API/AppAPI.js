let Url ={
  getAll: "http://localhost:3000/people",
  delete: "http://localhost:3000/people/",
  add: "http://localhost:3000/people"
}
let AppAPI = {
    getAllPerson : function() {
      return jQuery.ajax({
        url : Url.getAll,
        method : "GET",
        dataType : "json",
        contentType : "application/json"
      })
    },

    addPerson : function(data) {
      console.log("in api",data);
      return jQuery.ajax({
              url : Url.add,
              method : "post",
              dataType : "json",
              contentType : "application/json",
              data : JSON.stringify(data)
          })
    },
    deletePerson : function() {
      return jQuery.ajax({
        url : Url.delete+arguments[0],
        method : "DELETE",
        dataType : "json",
        contentType : "application/json"
      })
    }
}


module.exports = AppAPI;
