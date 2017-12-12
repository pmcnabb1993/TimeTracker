//javascript tracker//

//Initialize firebase//
var config = {
    apiKey: "AIzaSyDLswEA6G8Thai3AC2xBF7QSof-rQx3f6U",
    authDomain: "traintracker-35f50.firebaseapp.com",
    databaseURL: "https://traintracker-35f50.firebaseio.com",
    projectId: "traintracker-35f50",
    storageBucket: "traintracker-35f50.appspot.com",
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
          <td id="table-name">${snapshot.val().inputTrain}</td>
          <td id="table-destination">${snapshot.val().inputDest}</td>
          <td id="table-frequency">${snapshot.val().inputFreq}</td>
          <td id="table-next">${snapshot.val().inputNext}</td>
          <td id="table-away"></td>
          </td>

          `
      )
  })

  //submit form variables and pushing to firebase//
  $("#submit-train").on("click", function(event){
      event.preventDefault();

        var inputTrain = $("#train-name").val().trim();
        var inputDest = $("#train-dest").val().trim();
        var inputNext = $("#train-time").val().trim();
        var inputFreq = $("#train-freq").val().trim();

    //console.log to check if inputs are working//
    console.log ({
        inputTrain: inputTrain,
        inputDest: inputDest,
        inputNext: inputNext,
        inputFreq: inputFreq
    })

    //submits our user inputs to firebase//
    database.ref().push({
        inputTrain: inputTrain,
        inputDest: inputDest,
        inputNext: inputNext,
        inputFreq: inputFreq
    });


  });