class AudioPlayer{
    constructor(){
        this.playPausBtn = document.getElementById("play_pause_btn");
        this.playPauseImg = document.getElementById("play_pause_img")
        this.prevBtn = document.getElementById("prev_btn");
        this.nextBtn = document.getElementById("next_btn");
        this.range = document.getElementById("range");
        this.volumeSlider = document.getElementById("volume");
        this.volumeBtn = document.getElementById("volume_btn");
        this.volumeBtnImg = document.getElementById("volume_btn_img");
        this.volume = 1;
        this.muted = false;
        this.isPlaying = false;
        this.repeatBtn = document.getElementById("repeat_btn");
        this.repeating = false;
        this.duration = 0;
        this.currentTime = 0;
        this.trackCounter = 0;
        this.background = document.getElementById("background");
        this.track = new Audio();
    }

    playPause(){
        this.track.src = tracklist[this.trackCounter];
        
        this.track.addEventListener('loadedmetadata', () =>{
            this.duration = this.track.duration;
            this.range.max = this.duration;
        })

        this.playPausBtn.addEventListener('click', () =>{
            if(this.isPlaying === false){
                this.track.play();
                this.isPlaying = true;
                this.playPauseImg.src = "icons/pause.svg";
            }
            else{
                this.track.pause();
                this.isPlaying = false;
                this.playPauseImg.src = "icons/play.svg";
            } 
        })

        this.range.addEventListener('change', () =>{
            this.track.currentTime = this.range.value;
        })

        this.track.addEventListener('timeupdate', () =>{
            this.range.value = this.track.currentTime;
        })

        this.track.addEventListener('ended', () =>{
            if (this.repeating === false){
                this.trackCounter++;

                if (this.trackCounter > tracklist.length - 1){
                    this.trackCounter = 0;
                }

                this.updateTrack();                
                this.track.play();
            }
            else{
                this.updateTrack();
                this.track.play();
            }
        }) 

        this.prevBtn.addEventListener('click', () =>{
            if (this.trackCounter === 0){
                this.trackCounter = tracklist.length - 1;
            }
            else{
                this.trackCounter--;
            }
            
            this.updateTrack();

            if (this.isPlaying === true){
                this.track.play();
            }
            else{
                this.track.pause();
            }
        })

        this.nextBtn.addEventListener('click', () =>{
            if (this.trackCounter === tracklist.length - 1){
                this.trackCounter = 0;
            }
            else{
                this.trackCounter++;
            }

            this.updateTrack();

            if (this.isPlaying === true){
                this.track.play();
            }
            else{
                this.track.pause();
            }
        })

        this.volumeSlider.addEventListener('change', () =>{
            this.muted = false;
            this.volume = this.volumeSlider.value;
            this.track.volume = this.volume;
            if (this.volume < 0.01){
                this.volumeBtnImg.src = "icons/vol_mute.svg";
            }
            else if (this.volume > 0 && this.volume <= 0.25){
                this.volumeBtnImg.src = "icons/vol_low.svg";
            }
            else if (this.volume > 0.25 && this.volume <= 0.75){
                this.volumeBtnImg.src = "icons/vol_med.svg";
            }
            else if (this.volume > 0.75){
                this.volumeBtnImg.src = "icons/vol_high.svg";
            }
        })

        this.volumeBtn.addEventListener('click', () =>{
            if (this.muted === false){
                this.muted = true;
                this.track.volume = 0;
                this.volumeBtnImg.src = "icons/vol_mute.svg";
            }
            else{
                this.muted = false;
                this.track.volume = this.volume;
                if (this.volume < 0.01){
                    this.volumeBtnImg.src = "icons/vol_mute.svg";
                }
                else if (this.volume > 0 && this.volume <= 0.25){
                    this.volumeBtnImg.src = "icons/vol_low.svg";
                }
                else if (this.volume > 0.25 && this.volume <= 0.75){
                    this.volumeBtnImg.src = "icons/vol_med.svg";
                }
                else if (this.volume > 0.75){
                    this.volumeBtnImg.src = "icons/vol_high.svg";
                }
            }
        })

        this.repeatBtn.addEventListener('click', () =>{
            if (this.repeating === false){
                this.repeating = true;
                document.getElementById("repeat_btn_img").src = "icons/repeat_active.svg"
            }
            else{
                this.repeating = false;
                document.getElementById("repeat_btn_img").src = "icons/repeat.svg"
            }
        })
    }

    updateTrack(){    
        this.track.src = tracklist[this.trackCounter];    
        this.background.style = "background-image: url(" + themeGif[this.trackCounter] + ")";
        this.duration = this.track.duration;
        this.range.max = this.duration;
    }
}
let tracklist = [   
    "audio/les_maitres_du_temps_1982.mp3",    
    "audio/arrow_emblem_grand_prix_no_taka.mp3"
]

let themeGif = [
    "background/time_masters.gif",
    "background/arrow_emblem.gif"
]