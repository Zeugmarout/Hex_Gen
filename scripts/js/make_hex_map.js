function make_hex_map(numRows, numCols, container_height, container_width, make_clouds) {
    numRows = number_hex_v.value;
    numCols = number_hex_h.value;
    container_height = document.getElementById('hex_gen_page').offsetHeight;
    container_width = document.getElementById('hex_gen_page').offsetWidth;

    number_of_hexes = numRows * numCols
    const terrain_types = ['open','wooded','mountain','swamp','desert']; // Terrain types!
    
    //remove_old_hexes
    if(document.getElementsByClassName('hex-center').length > 1){
        old_hexes = Array.from(document.getElementsByClassName('hex-center'));
        for (let i = old_hexes.length; i > 0; i--) {
            hex_for_removal = document.getElementById('hex_' + i)
            hex_label_for_removal = document.getElementById('hex_label_' + i)
            hex_for_removal.remove();
            hex_label_for_removal.remove();
        }
    }

    
    // Create hexagons based on number requested.
    initialize_hexagons(number_of_hexes);
    // Adjust hexagon positioning etc. based on initial window size.
    //render_hexagons(numCols, numRows, window.innerWidth);
    render_hexagons(numCols, numRows, container_height, container_width);
    // Add mouseover effects to hexagons
    add_mouse_effects(number_of_hexes);
    // Ripple
    ripple(numCols,numRows);

    if(make_clouds == true){
    create_clouds(container_height);
    }
  }

function make_hex_map_from_loaded_data(loaded_data, container_height, container_width, make_clouds) {
    numRows = loaded_data.numRows;
    numCols = loaded_data.numCols;
    container_height = document.getElementById('hex_gen_page').offsetHeight;
    container_width = document.getElementById('hex_gen_page').offsetWidth;
    number_of_hexes = loaded_data.number_of_hexes;
    mountain_hexes = loaded_data.mountain_hexes;

    // Update the number of cols and rows inputs
    document.getElementById('number_hex_h').value = numCols;
    document.getElementById('number_hex_v').value = numRows;

    const terrain_types = ['open','wooded','mountain','swamp','desert']; // Terrain types!
    
    //remove_old_hexes
    if(document.getElementsByClassName('hex-center').length > 1){
        old_hexes = Array.from(document.getElementsByClassName('hex-center'));
        for (let i = old_hexes.length; i > 0; i--) {
            hex_for_removal = document.getElementById('hex_' + i)
            hex_label_for_removal = document.getElementById('hex_label_' + i)
            hex_for_removal.remove();
            hex_label_for_removal.remove();
        }
    }

    // Create hexagons based on number requested.
    initialize_hexagons(number_of_hexes);
    // Adjust hexagon positioning etc. based on initial window size.
    //render_hexagons(numCols, numRows, window.innerWidth);
    render_hexagons(numCols, numRows, container_height, container_width);
    // Add mouseover effects to hexagons
    add_mouse_effects(number_of_hexes);
    // Ripple
    ripple(numCols,numRows);

    if(make_clouds == true){
    create_clouds(container_height);
    }

    for(let i = 0; i < 100; i++) {
        hex_for_mods = document.getElementById(mountain_hexes[i]);
        hex_for_mods.classList.add('mountain');
    }
  }