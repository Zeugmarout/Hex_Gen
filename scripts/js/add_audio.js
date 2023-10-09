function add_audio(){
    audio_track = 1;

    document.getElementById('start_music').addEventListener('click', function() {
      if(document.getElementById('bg_music_' + audio_track).paused){
        document.getElementById('bg_music_' + audio_track).play();
      } else {
        document.getElementById('bg_music_' + audio_track).pause();
      }
    })

    document.getElementById('skip_next_audio').addEventListener('click', function() {
      document.getElementById('bg_music_' + audio_track).pause();
      document.getElementById('bg_music_' + audio_track).currentTime = 0;
      
      audio_track = audio_track + 1;
      
      if(audio_track == 6){
        audio_track = 1;
      }
      document.getElementById('bg_music_' + audio_track).play();
    })

    document.getElementById('skip_last_audio').addEventListener('click', function() {
      document.getElementById('bg_music_' + audio_track).pause();
      document.getElementById('bg_music_' + audio_track).currentTime = 0;
      audio_track = audio_track - 1;
      
      if(audio_track == 0){
        audio_track = 5;
      }
      document.getElementById('bg_music_' + audio_track).play();
    })
}