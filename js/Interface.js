class Interface{
    constructor(){
        this.tracklist = document.getElementById("tracklist_div");
    }

    createTrackList(){
        for (let i = 0; i < tracklistArr.length; i++){
            let trackBtn = document.createElement('button');
            trackBtn.className = "track_btn";
            trackBtn.innerHTML = tracklistArr[i];
            this.tracklist.appendChild(trackBtn);
        }        
    }
}