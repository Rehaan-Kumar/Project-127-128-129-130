sound_1 = "";
sound_2 = "";

score_leftWrist = 0;
score_rightWrist = 0;
score_rightElbow = 0;
score_leftElbow = 0;

x_leftWrist = 0;
x_rightWrist = 0;
x_rightElbow = 0;
x_leftElbow = 0;

y_leftWrist = 0;
y_rightWrist = 0;
y_rightElbow = 0;
y_leftElbow = 0;


function preload() {
    sound_1 = loadSound("Summer_of_'69.mp3")
    sound_2 = loadSound("Bella-Ciao-Money-Heist.mp3")
}

function setup() {
    canvas = createCanvas(600 , 500)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()

    posenet = ml5.poseNet(video , modelLoaded)
    posenet.on('pose' , gotPoses)
}

function modelLoaded() {
    console.log("Model Loaded !")
}

function gotPoses(results) {
    if(results.length > 0) {
        console.log(results)
        score_leftWrist = results[0].pose.leftWrist.confidence
        score_rightWrist = results[0].pose.rightWrist.confidence
        score_rightElbow = results[0].pose.rightElbow.confidence
        score_leftElbow = results[0].pose.leftElbow.confidence
        //console.log(score_leftWrist , score_rightWrist , score_rightElbow , score_leftElbow)

        x_leftWrist = results[0].pose.leftWrist.x
        x_rightWrist = results[0].pose.rightWrist.x
        x_rightElbow = results[0].pose.rightElbow.x
        x_leftElbow = results[0].pose.leftElbow.x
        //console.log(x_leftWrist , x_rightWrist , x_rightElbow , x_leftElbow)

        y_leftWrist = results[0].pose.leftWrist.y
        y_rightWrist = results[0].pose.rightWrist.y
        y_rightElbow = results[0].pose.rightElbow.y
        y_leftElbow = results[0].pose.leftElbow.y
        //console.log(y_leftWrist , y_rightWrist , y_leftElbow , y_rightElbow)
    }
}

function draw() {
    image(video , 0, 0, 600, 500)
    stroke("red")
    fill("red")

    if(score_leftWrist > 0.2) {
        circle(x_leftWrist , y_leftWrist , 20)
        sound_2.stop()
        sound_1.play()
        sound_1.setVolume(1)
        sound_1.rate(1)    
    }

    if(score_rightWrist > 0.2) {
        circle(x_rightWrist , y_rightWrist , 20)
        sound_1.stop()
        sound_2.play()
        sound_2.setVolume(1)
        sound_2.rate(1)    
    }

    if(score_rightElbow > 0.2) {
        circle(x_rightElbow , y_rightElbow , 20)

        if(y_rightWrist > 0 && y_rightWrist <= 100) {
            document.getElementById("speed").innerHTML =  "Speed = 2.5x"
            sound_1.rate(2.5)
            sound_2.rate(2.5)
        }else if(y_rightWrist > 100 && y_rightWrist <= 200) {
            document.getElementById("speed").innerHTML =  "Speed = 2x"
            sound_1.rate(2)
            sound_2.rate(2)
        }else if(y_rightWrist > 200 && y_rightWrist <= 300) {
            document.getElementById("speed").innerHTML =  "Speed = 1.5x"
            sound_1.rate(1.5)
            sound_2.rate(1.5)
        }else if(y_rightWrist > 300 && y_rightWrist <= 400) {
            document.getElementById("speed").innerHTML =  "Speed = 1x"
            sound_1.rate(1)
            sound_2.rate(1)
        }else if(y_rightWrist > 400) {
            document.getElementById("speed").innerHTML =  "Speed = 0.5x"
            sound_1.rate(0.5)
            sound_2.rate(0.5)
        }
    }


    if(score_leftElbow > 0.2) {
        circle(x_leftElbow , y_leftElbow , 20)

        leftWrist_y = Number(y_leftWrist)
        remove_decimals = Math.floor(leftWrist_y)
        volume = remove_decimals/500
        v = 1-volume
        vol = Number(v.toFixed(2))
        document.getElementById("volume").innerHTML = "Volume = " + vol
        sound_1.setVolume(vol)
        sound_2.setVolume(vol)
    }

}

function play() {
    sound_2.play()
    sound_2.setVolume(1)
    sound_2.rate(1)
}

function stop() {
    sound_1.stop()
    sound_1.setVolume(1)
    sound_1.rate(1)
    sound_2.stop()
    sound_2.setVolume(1)
    sound_2.rate(1)
    document.getElementById("volume").innerHTML = "Volume"
    document.getElementById("speed").innerHTML = "Speed"
}