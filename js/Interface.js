class Interface{
    constructor(){
        this.tracklist = document.getElementById("tracklist_div");
        this.titleMob = document.getElementById("title_mobile_div");
    }

    createTrackList(){
        for (let i = 0; i < tracklistArr.length; i++){
            let trackBtn = document.createElement('button');
            trackBtn.className = "track_btn";
            trackBtn.innerHTML = tracklistArr[i];
            this.tracklist.appendChild(trackBtn);
        }
        
        let marquee = document.createElement('marquee');
        this.setMultipleAttributes(marquee, {'direction': 'left', 'scrollamount': '10'})
        marquee.id = 'mob_marquee';
        this.titleMob.appendChild(marquee);
    }

    setMultipleAttributes(element, attributes){
        for (let key in attributes){
            element.setAttribute(key, attributes[key]);
        }
    }
}