 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyDzuPT3g9quIGpd3Xu-XyWgIczlldTi1IY",
    authDomain: "train-firebase-dd3f5.firebaseapp.com",
    databaseURL: "https://train-firebase-dd3f5.firebaseio.com",
    projectId: "train-firebase-dd3f5",
    storageBucket: "train-firebase-dd3f5.appspot.com",
    messagingSenderId: "273265755739"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#userClear").on("click", function () {
    $("#tableBody").empty();
  })

  $("#userConfirm").on("click", function (){

    var userTrainName = $("#userTrainName").val().trim();
    var userDestination = $("#userDestination").val().trim();
    var userTime = moment($("#userTime").val().trim(), "HH:mm").format ("HH:mm");
    var userFrequency = $("#userFrequency").val().trim();

    var userTrain = {
        name: userTrainName,
        destination: userDestination,
        inputTime: userTime,
        frequency: userFrequency,
    }
    database.ref().push(userTrain);
    console.log(userTrain);

    $("userTrainName").empty();
    $("userDestination").empty();
    $("userTime").empty();
    $("userFrequency").empty();

    return false;

  });

  database.ref().on("child_added", function(childSnapshot){
      console.log(childSnapshot.val());

      var trainName = childSnapshot.val().name;
      var destination = childSnapshot.val().destination;
      var time = childSnapshot.val().inputTime;
      var frequency = childSnapshot.val().frequency;

      var timeConvert = moment(time, "HH:mm");
      var currentTime = moment().format("HH:mm");
      console.log (currentTime);

      var mathTime = moment().diff(moment(timeConvert), "minutes");
      console.log(mathTime);
    
      var timeDivide = mathTime % frequency;
      console.log (timeDivide)

      var nextTrainTime = frequency - timeDivide;
      console.log(nextTrainTime)

      var nextTrain = moment().add(nextTrainTime, "minutes").format("HH:mm");
      console.log(nextTrain)

      $("#tableBody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextTrain+ "</td><td>" + nextTrainTime + "</td></tr>");

      
  })