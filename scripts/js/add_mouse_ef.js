function add_mouse_effects(number_of_hexes){

    tile_click_audio = document.getElementById('tile-click-noise');

    for (let i = 1; i <= number_of_hexes; i++) {
        the_hex_label = document.getElementById('hex_label_' + i);
        //the_hex = document.getElementById('hex_' + i);
        all_hexes = document.getElementsByClassName('hex-center');

        // Select hex by clicking
        the_hex_label.addEventListener('click', function() {
            //the_hex.classList.add('highlighted');
            if(document.getElementsByClassName('highlighted').length >= 1){
                hexes_to_unhighlight = document.getElementsByClassName('highlighted');
                h_as_array = Array.from(hexes_to_unhighlight);
                for (let z = 0; z < h_as_array.length; z++) {
                    h_as_array[z].classList.toggle('highlighted');
                }
            }
            //hex_to_remove = document.getElementsByClassName('highlighted')
            
            //console.log(hex_to_remove.id)
            //classList.remove('highlighted');
            all_hexes[i - 1].classList.toggle('highlighted');

            //setTimeout(function() {
            //    the_hex.classList.remove("highlighted");
            //}, 1000);
        })

        the_hex_label.addEventListener('mouseenter', function() {
       //     the_hex.classList.add('highlighted');
                //the_hex.classList.toggle('highlighted');
                tile_click_audio.play();
        })

        //the_hex.addEventListener('mouseleave', function() {
        //    the_hex.classList.remove("highlighted");
        //})
    }
}