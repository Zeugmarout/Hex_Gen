function render_hexagons(numCols, numRows, container_height, container_width) {
    //let max_y = window.innerHeight;
    //let max_x = max_y;

    // The container height and width is currently coming from the div 'hex_gen_iframe'.

    let max_y = container_height;
    let max_x = container_width;

    // Find which of height and width are larger; use that.
    if(max_y < max_x) {
        max_y = max_x;
    } else {
        max_x = max_y;
    }

    // Reverse-buffer the screen dimensions; makes sure no hex is placed right at screen edge.
    max_x = 0.75 * max_x;
    max_y = 0.75 * max_y;

    hexagon_size_x = max_x / numCols; //* hex_proportionality_const;
    hexagon_size_y = max_y / numRows; //* hex_proportionality_const; // to maintain hex proportions

    if(hexagon_size_x > hexagon_size_y){
        hexagon_size_y = hexagon_size_x
    } else {
        hexagon_size_x = hexagon_size_y
    }

    hexagon_size_x = 1.075 * hexagon_size_y;

    // For each row...
    for (let xCoord = 1; xCoord <= numCols; xCoord++) {
    // Fill out column with hexagons
        for (let yCoord = 1; yCoord <= numRows; yCoord++) {
            // Calculate a unique ID
            const uniqueID = (numRows) * (xCoord - 1) + yCoord;
            // Grab corresponding hexagon.
            hex_for_mods = document.getElementById('hex_' + uniqueID);

            hex_for_mods.style.visibility = 'hidden';
            hex_for_mods.style.width = hexagon_size_x + 'px';
            hex_for_mods.style.height = hexagon_size_y + 'px';

            //hex_for_mods.style.zIndex = yCoord * 2;
            // Every odd row.
            if(xCoord % 2 == 1){
                hex_for_mods.style.zIndex = yCoord * 2;
            }
            // Every even row.
            if(xCoord % 2 == 0){
                hex_for_mods.style.zIndex = (yCoord) * 2 + 1;
            }

            hex_for_mods.style.left = xCoord * hexagon_size_x - hexagon_size_x*0.26*xCoord + 'px';
            // If this is an even row (2, 4, 6, etc.),
            // apply a vertical offset of half the hex width.
            if(xCoord % 2 === 0) {
                hex_for_mods.style.top = (yCoord + 0.45) * hexagon_size_y - (yCoord)*hexagon_size_y*0.085 - hexagon_size_y*0.5 + 'px';
            } else {
                hex_for_mods.style.top = (yCoord) * hexagon_size_y - (yCoord)*hexagon_size_y*0.085 - hexagon_size_y*0.5 + 'px';
            }

            hex_label = document.getElementById('hex_label_' + uniqueID);
            hex_label.style.zIndex = hex_for_mods.style.zIndex + 1;
            hex_label.textContent = uniqueID;
            //if(hex_for_mods.offsetWidth <= 30){
            //    hex_label.textContent = ' ';
            //} else {
            //    if(hex_for_mods.offsetWidth > 50){
            //        hex_label.textContent = 'Hex ' + uniqueID;
            //    } else {
            //        hex_label.textContent = uniqueID;
            //    }
            //}
            
        }
    }
}