//javascript tracker//

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBnWwJharX4_Ss9Wan3oUz1ak7Zk3vWhkQ",
    authDomain: "fir-practice-1b721.firebaseapp.com",
    databaseURL: "https://fir-practice-1b721.firebaseio.com",
    projectId: "fir-practice-1b721",
    storageBucket: "fir-practice-1b721.appspot.com",
    messagingSenderId: "355874204281"
  };
  firebase.initializeApp(config);

  //Sets up variable database to connect with firebase//
  var database = firebase.database();

  //Global variable
  var timeRemainder = 0;

  //Real time clock
    function displayTime() {
      var time = moment().format('MMMM Do YYYY:  h:mm:ss A');
      $('#clock').html(time);
      setTimeout(displayTime, 1000);
    }
    $(document).ready(function(){
        displayTime();
    });

  database.ref().orderByChild("inputDest").on("child_added", function (snapshot){
      console.log('here')

      //First train//
      var firstTimeCoverted = moment(snapshot.val().inputFirst, "hh:mm A").subtract(1,"years");

      //Creates a variable for the current time//
      var currentTime = moment();

      console.log("Current Time: " + currentTime);

      //var displayTime = moment().format('D. MMMM YYYY hh:mm:ss A');
      //console.log(displayTime)

      //Creates a variable for the differnece between current and first time//
      var diffTime = currentTime.diff(moment(firstTimeCoverted), "minutes");
      console.log("Difference in Time:" + diffTime);

      timeRemainder = diffTime % snapshot.val().inputFreq;
      console.log("Time Remaining: " + timeRemainder);

      //Variable to capture the value of input frequency//
      var timeFrequency = snapshot.val().inputFreq;
      console.log("Time Frequency: " + timeFrequency);

      //Varialbe that maths the number of mins until next train//
      var minutesAway = timeFrequency - timeRemainder;
      console.log("Minutes away: " + minutesAway);

      //Variable to math the minutes away//
      var nextArrival = moment().add(minutesAway, "minutes");
      console.log("Arrive at: " + moment(nextArrival).format("hh:mm A"));

      //Adds our inputs to the table//
      $('#dostuff').append(
          `<tr class="active>
          <td id="table-name">${snapshot.val().inputName}</td>
          <td id="table-name">${snapshot.val().inputName}</td>
          <td id="table-destination">${snapshot.val().inputDest}</td>
          <td id="table-frequency">${snapshot.val().inputFreq}</td>
          <td id="table-next">${moment(nextArrival).format("hh:mm A")}</td>
          <td id="table-away">${minutesAway}</td>
          </td>`
      )
  });

  //submit form variables and pushing to firebase//
  $("#submit-train").on("click", function(event){
      event.preventDefault();

        var inputName = $("#train-name").val().trim();
        var inputDest = $("#train-dest").val().trim();
        var inputFirst = $("#train-time").val().trim();
        var inputFreq = $("#train-freq").val().trim();

    //console.log to check if inputs are working//
    console.log ({
        inputName: inputName,
        inputDest: inputDest,
        inputFirst: inputFirst,
        inputFreq: inputFreq
    })

    //submits our user inputs to firebase//
    database.ref().push({
        inputName: inputName,
        inputDest: inputDest,
        inputFirst: inputFirst,
        inputFreq: inputFreq
    })
    //Clears inputs
    $('input').val('');


  });