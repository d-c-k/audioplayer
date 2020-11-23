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
        this.trackBtns = document.querySelectorAll(".track_btn");
        this.mobMarquee = document.getElementById("mob_marquee");
        this.background = document.getElementById("background");
        this.track = new Audio();
    }

    playPause(){
        this.updateTrack();
        
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

                if (this.trackCounter > tracklistArr.length - 1){
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
                this.trackCounter = tracklistArr.length - 1;
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
            if (this.trackCounter === tracklistArr.length - 1){
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

        for (let i = 0; i < this.trackBtns.length; i++){
            this.trackBtns[i].addEventListener('click', () =>{
                this.trackCounter = i;
                this.updateTrack();
                if (this.isPlaying === true){
                    this.track.play();
                }
            })
        }
    }

    updateTrack(){    
        this.track.src = "audio/" + tracklistArr[this.trackCounter];    
        this.background.style = "background-image: url(" + themeGif[this.trackCounter] + ")";
        this.mobMarquee.innerHTML = tracklistArr[this.trackCounter];
        this.trackNavigation();
    }

    trackNavigation(){
        for (let i = 0;i < this.trackBtns.length; i++){
            this.trackBtns[i].classList.replace("track_btn_active", "track_btn");
            this.trackBtns[i].innerHTML = this.trackBtns[i].innerHTML.replace(/&gt;/g, '');
        }
        this.trackBtns[this.trackCounter].className = "track_btn_active";
        this.trackBtns[this.trackCounter].innerHTML = ">" + this.trackBtns[this.trackCounter].innerHTML;
    }
}
