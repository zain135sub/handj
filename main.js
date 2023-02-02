prediction_1=""
prediction_2=""
Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:100
});
camera=document.getElementById("camera");
Webcam.attach(camera);
function takesnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img src="'+data_uri+'" id="captured_image">'
    });
}
console.log("ml5 version:"+ml5.version)
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/QFTfs08o4/model.json',modelloaded)
function modelloaded(){
    console.log("MODEL LOADED!")
}


function speak(){
    synth=window.speechSynthesis
    speakdata_1="The first prediction is"+prediction_1
    speakdata_2="And the second prediction is"+prediction_2
    var utterThis=new SpeechSynthesisUtterance(speakdata_1+speakdata_2)
    synth.speak(utterThis)
}
function check(){
    img=document.getElementById("captured_image")
    classifier.classify(img,gotResult)
}
function gotResult(error,result){
    if(error){
        console.error(error)
    }else{
        console.log(result)
        document.getElementById("gesture_name").innerHTML=result[0].label;
        document.getElementById("gesture_name1").innerHTML=result[1].label;
        prediction_1=result[0].label
        prediction_2=result[1].label
        speak()
        if(result[0].label=="VICTORY"){
            document.getElementById("update_gesture").innerHTML="&#9996;";
            document.getElementById("result_name").innerHTML="Victory"
        }
        if(result[0].label=="AMAZING"){
            document.getElementById("update_gesture").innerHTML="&#128076;";
            document.getElementById("result_name").innerHTML="Amazing"
        }
        if(result[0].label=="BEST"){
            document.getElementById("update_gesture").innerHTML="&#128077;";
            document.getElementById("result_name").innerHTML="Best"
        }
        if(result[1].label=="VICTORY"){
            document.getElementById("update_gesture1").innerHTML="&#9996;";
            document.getElementById("result_name1").innerHTML="Victory"
        }
        if(result[1].label=="AMAZING"){
            document.getElementById("update_gesture1").innerHTML="&#128076;";
            document.getElementById("result_name1").innerHTML="Amazing"
        }
        if(result[1].label=="BEST"){
            document.getElementById("update_gesture1").innerHTML="&#128077;";
            document.getElementById("result_name1").innerHTML="Best"
        }
    }
}