document.addEventListener('DOMContentLoaded', () =>{
    let interface = new Interface();
    interface.createTrackList();

    let audioPlayer = new AudioPlayer();
    audioPlayer.playPause();


})

let tracklistArr = [   
    "les_maitres_du_temps_1982.mp3",    
    "arrow_emblem_grand_prix_no_taka_1977.mp3",
    "akira_1988.mp3"
]

let themeGif = [
    "background/time_masters.gif",
    "background/arrow_emblem.gif",
    "background/akira.gif"
]