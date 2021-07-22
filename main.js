Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90
});
Webcam.attach("#camera");
function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img src = '"+data_uri+"' id = 'mysnap'>"
    });
}
console.log(ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/qKW5Obh2F/model.json", teachble);
function teachble(){
    console.log("model loaded");
}
function check(){
    img = document.getElementById("mysnap");
    classifier.classify(img, gotResult);
}
function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        speak();
        if(results[0].label == "Happy"){
            document.getElementById("result_emotion_name").innerHTML = results[0].label;
            document.getElementById("update_emoji").innerHTML = "&#128522;";
            console.log("is if running, btw HAPPY");
        }
        if(results[0].label == "Sad"){
            document.getElementById("result_emotion_name").innerHTML = results[0].label;
            document.getElementById("update_emoji").innerHTML = "&#128546;";
        }
        if(results[0].label == "Angry"){
            document.getElementById("result_emotion_name").innerHTML = results[0].label;
            document.getElementById("update_emoji").innerHTML = "&#128545;";
        }
        if(results[1].label == "Happy"){
            document.getElementById("result_emotion_name2").innerHTML = results[1].label;
            document.getElementById("update_emoji2").innerHTML = "&#128522;";
        }
        if(results[1].label == "Sad"){
            document.getElementById("result_emotion_name2").innerHTML = results[1].label;
            document.getElementById("update_emoji2").innerHTML = "&#128546;";
        }
        if(results[1].label == "Angry"){
            document.getElementById("result_emotion_name2").innerHTML = results[1].label;
            document.getElementById("update_emoji2").innerHTML = "&#128545;";
        }
    }
}
function speak(){
    var speachsyn = window.speechSynthesis;
    var speakone = "the first prediction is"+prediction1;
    var speaktwo = "the second prediction is"+prediction2;
    var speakthis = new SpeechSynthesisUtterance(speakone+speaktwo);
    speachsyn.speak(speakthis);
}