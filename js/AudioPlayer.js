class AudioPlayer{
    constructor(){
        this.playPausBtn = document.getElementById("play_pause_btn");
        this.playPauseImg = document.getElementById("play_pause_img")
        this.prevBtn = document.getElementById("prev_btn");
        this.nextBtn = document.getElementById("next_btn");
        this.range = document.getElementById("range");
        this.volumeSlider = document.getElementById("volume");
        this.volumeBtn = document.getElementById("volume_btn");
        this.volumeBtnImg = document.getElementById("volume_btn_img")
        this.volume = 1;
        this.muted = false;
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

            this.track.addEventListener('ended', () =>{
                this.trackCounter++;
                if (this.trackCounter > tracklist.length - 1){
                    this.trackCounter = 0;
                }
                this.track.src = tracklist[this.trackCounter];
                this.track.play();
            })            
        })

        this.volumeSlider.addEventListener('change', () =>{
            this.muted = false;
            this.volume = this.volumeSlider.value;
            this.track.volume = this.volume;
            if (this.volume < 0.01){
                this.volumeBtnImg.src = "../icons/vol_mute.svg";
            }
            else if (this.volume > 0 && this.volume <= 0.25){
                this.volumeBtnImg.src = "../icons/vol_low.svg";
            }
            else if (this.volume > 0.25 && this.volume <= 0.75){
                this.volumeBtnImg.src = "../icons/vol_med.svg";
            }
            else if (this.volume > 0.75){
                this.volumeBtnImg.src = "../icons/vol_high.svg";
            }
        })

        this.volumeBtn.addEventListener('click', () =>{
            if (this.muted === false){
                this.muted = true;
                this.track.volume = 0;
                this.volumeBtnImg.src = "../icons/vol_mute.svg";
            }
            else{
                this.muted = false;
                this.track.volume = this.volume;
                if (this.volume < 0.01){
                    this.volumeBtnImg.src = "../icons/vol_mute.svg";
                }
                else if (this.volume > 0 && this.volume <= 0.25){
                    this.volumeBtnImg.src = "../icons/vol_low.svg";
                }
                else if (this.volume > 0.25 && this.volume <= 0.75){
                    this.volumeBtnImg.src = "../icons/vol_med.svg";
                }
                else if (this.volume > 0.75){
                    this.volumeBtnImg.src = "../icons/vol_high.svg";
                }
            }
        })
    }
}
let tracklist = [
    "../audio/Pandemix.mp3"
]