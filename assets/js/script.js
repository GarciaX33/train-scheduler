$(document).ready(function () {

    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyCCWBAidFGQirLG7PiAAX-zdCpLW53nWaM",
        authDomain: "local-train-schedule.firebaseapp.com",
        databaseURL: "https://local-train-schedule.firebaseio.com",
        projectId: "local-train-schedule",
        storageBucket: "",
        messagingSenderId: "100022150122",
        appId: "1:100022150122:web:b489bdd4b8ebcf66"
    };
    // Will Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    var database = firebase.database();

    // Will register and submit on click, then run the function
    $("#submit").on("click", function (event) {
        event.preventDefault();
        // WIll collect user input and remove empty spaces
        var trainName = $("#train-name-input").val().trim();
        var destination = $("#destination-input").val().trim();
        var frequency = $("#frequency-input").val().trim();
        var firstTrain = $('#first-train-input').val().trim();
        var newTrain = {
            trainName: trainName,
            destination: destination,
            frequency: frequency,
            firstTrain: firstTrain
        }
        // Will get db reference and push the new information added
        database.ref().push(newTrain);
        $("#train-name-input").val("");
        $("#destination-input").val("");
        $("#frequency-input").val("");
        $("#first-train-input").val("");
    });
    // WIll reference the child location in the databse
    database.ref().on('child_added', function (response) {
        var destinationT = (response.val().destination)
        var trainNameT = (response.val().trainName)
        var tFrequency = (response.val().frequency)
        var firstTrain = (response.val().firstTrain)

   
        // will use moment js to keep calc. the times for the train
        var firstTrainA = moment(firstTrain, "HH:mm").subtract(1, "days");
        var diffTime = moment().diff(moment(firstTrainA), "minutes");
        var tRemainder = diffTime % tFrequency;
        var tMinutesTillTrain = tFrequency - tRemainder;
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        var nextArrival = moment(nextTrain).format('HH:mm');
        
        
        // Will create tr variables to append inside the info
        var tr = 
            `<tr>
            <td>${trainNameT}</td>
            <td>${destinationT}</td>
            <td>${tFrequency}</td>
            <td>${nextArrival}</td>
            <td>${tMinutesTillTrain}</td>
            </tr>`
        // Will append all train info into the info id
        $("#info-input").append(tr)
    });
});