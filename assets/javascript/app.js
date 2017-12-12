//javascript tracker//

//initialize firebase//
var config = {
    apiKey: "AIzaSyDLswEA6G8Thai3AC2xBF7QSof-rQx3f6U",
    authDomain: "traintracker-35f50.firebaseapp.com",
    databaseURL: "https://traintracker-35f50.firebaseio.com",
    projectId: "traintracker-35f50",
    storageBucket: "",
    messagingSenderId: "1057623940302"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var name = "";
  var destination = "";
  var frequencey;
  var nextTrain = moment().format("HH:mm");

  database.ref().on("child_added", function (snapshot){
      console.log('here')
      $('#dostuff').append(
          `<tr class="active>
          <td id="table-name">${snapshot.val().inputName}</td>
          <td id="table-destination">${snapshot.val().inputRole}</td>
          <td id="table-frequency">${snapshot.val().startDate}</td>
          <td id="table-next"></td>
          <td id="table-away">${snapshot.val().inputRate}</td>
          </td>

          `
      )
  })

  $("#submit-train").on("click", function(event){
      event.preventDefault();

        var inputTrain
        var inputDest
        var inputNext
        var inputFreq

  })