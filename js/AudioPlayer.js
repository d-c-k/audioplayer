class AudioPlayer{
    constructor(){
        this.playPausBtn = document.getElementById("play_pause_btn");
        this.playPauseImg = document.getElementById("play_pause_img")
        this.prevBtn = document.getElementById("prev_btn");
        this.nextBtn = document.getElementById("next_btn");
        this.range = document.getElementById("range");
        this.isPlaying = false;
        this.duration = 0;
        this.currentTime = 0;
        this.trackCounter = 0;
        this.track = new Audio();
    }

    playPause(){
        this.track.src = tracklist[this.trackCounter];

        this.playPausBtn.addEventListener('click', () =>{
            if(this.isPlaying === false){
                this.track.play();
                this.isPlaying = true;
                this.duration = this.track.duration;
                this.range.max = this.duration;
                this.playPauseImg.src = "../icons/pause.svg"
            }
            else{
                this.track.pause();
                this.isPlaying = false;
                this.playPauseImg.src = "../icons/play.svg"
            }

            this.range.addEventListener('change', () =>{
                this.track.currentTime = this.range.value;
            })

            this.track.addEventListener('timeupdate', () =>{
                this.range.value = this.track.currentTime;
            })
        })
    }
}
let tracklist = [
    "../audio/Pandemix.mp3"
]