//Initially play is off i.e '0'....
var play = 0;
var loaded, songs=[];
var volRange = 0; //Curerntly not visible.

//Songs Image and Src....
var imgSrc = "files/photos/";
var songSrc = "files/audios/"; 

var imageMain = [document.getElementById("left1"), document.getElementById("left2"), document.getElementById("centerA"), document.getElementById("right2"), document.getElementById("right1")];
var srcMain = [ document.getElementById("oneL"), document.getElementById("twoL"), document.getElementById("threeC"), document.getElementById("fourR"), document.getElementById("fiveR")];


//Creating variables for current playing music and volume....
var currentSongId = 2, currentSong, songArr = [0, 1, 2, 3, 4];
var currentVolume;
//Initializing player element....
var player = document.getElementById("player");
var playerVolume = document.getElementById("Range");
var songRange = document.getElementById("songRange");
var icon = document.getElementById("bThree");
var currentPlay;

function load(){ 
    // $.get("php/songs.php", function(data){
    //     loaded = data.split(" ");
    //     for(var i = 0; i<loaded.length; i+=3){
    //         songs.push([loaded[i],loaded[i+1],loaded[i+2]]);
    //         alert(songs);
    //     }
    //     });
        //Creating song boxes (id, src, imgSrc)....
        songs = [['files/photos/lalala.jpeg', 'lalala', 'files/audios/lalala.mp3'],
                ['files/photos/bad_guy.png','bad_guy', 'files/audios/bad_guy.mp3'],
                ['files/photos/slow_down.jpg','Slow_Down', 'files/audios/slow_down.mp3'],
                ['files/photos/new.jpg', 'New', 'files/audios/new.mp3'],
                ['files/photos/fractures.jpg', 'fractures', 'files/audios/fractures.mp3']
            ];

            player.src = songs[currentSongId][2];
}

function shuffle(){

}

function back(){
    
    if(currentSongId == 0){
        currentSongId = songs.length-1;
        updateBack();
        redirect();
    }
    else{
    currentSongId--;
    updateBack();
    redirect();
    }
}

//Defining play pause function of a player
function pp(){
    
    if(play == 0)
    {
        icon.src = "svg/021-pause.svg";
        play = 1
        player.play();
    }
    else if(play == 1)
    {
        icon.src = "svg/013-play.svg"
        play = 0
        player.pause();
    }
}

function next(end = 0){

    if(currentSongId == songs.length-1){
        currentSongId = 0;
        updateNxt();
        redirect();
    }
    else{
    currentSongId++;
    updateNxt();
    redirect();
    }
}

function loop(){
   // player.value = player.currentTime;
}

function volume(){
    if(volRange == 0){
        playerVolume.style.visibility = "visible";
        volRange = 1;
    }
    else if(volRange == 1){
        playerVolume.style.visibility = "hidden";
        volRange = 0;
    }
}

//Functioning Volume Slider....
playerVolume.oninput = function(){
    currentVolume = this.value;
    player.volume = currentVolume/10;
}

//Functioning Song slider....
songRange.onchange = function(){
    player.currentTime = this.value;
    console.log(player.currentTime);
}

//slider range changing according to current song....
player.onplaying = function() {
    songRange.max = player.duration;
    var myVar = setInterval(sliderPlay, 1500);
};

function sliderPlay(){
    songRange.value = player.currentTime;
    if(player.ended){
        next(1);
    }
}

function updateNxt(){
    
    if(currentSongId != songArr[2]){
    for(var i = 0; i<5; i++){
        if(songArr[i] < songs.length-1)
        { songArr[i]++; }
        else{
            songArr[i] = 0;
        }
    }

    for(var j = 0; j<5; j++){
        imageMain[j].src = songs[songArr[j]][0];
    }
    }
}

function updateBack(){
    if(currentSongId != songArr[2]){
    for(var i = 0; i<5; i++){
        if(songArr[i] > 0){
            songArr[i]--;
        }
        else{
            songArr[i] = songs.length-1;
        }
    }

    for(var j = 0; j<5; j++){
        imageMain[j].src = songs[songArr[j]][0];
    }
}
}

function redirect(){
    player.src = songs[currentSongId][2];
    play = 0;
    pp();
}
