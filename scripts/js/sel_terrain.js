function assign_terrain(terrain_type, target_proportion, terrain_replace_list){
    read_json('./data/geomorphs/' + terrain_type + '.json')
        .then(content => {
        // Assign the content to your object
        m_geo_stock = content;
        // How many JSON dictionaries are in our m_geo_stock?
        list_of_geomorphs = Object.keys(m_geo_stock);
        number_of_geomorphs = list_of_geomorphs.length;

        console.log(`Applying ${terrain_type} with assign terrain function.`);

        // Set limits //
        proportion_terrain = target_proportion; // This could be a user input later on.
        num_hexes_of_this_morph = 0;
        total_num_hexes = document.getElementsByClassName('hex-center').length;
        prop_hexes_of_this_morph = 0;
        let viable_hexes_for_terrain = range(1,(numRows*numCols));

        // This loop adds a geomorph to the map at a random anchor hexagon's position;
        // The loop continues until either we've reached the terrain type's ideal proportion,
        // or we've done 3000 loops (to prevent infinite looping...).
        for(let i = 0; prop_hexes_of_this_morph <= proportion_terrain & i < 3000; i++) {

            //for (let morph = 0; morph < number_of_geomorphs; morph++) {
            morph = Math.floor(Math.random() * number_of_geomorphs); //Get random index integer based on # of geo options.

            // Find dimensions of geomorph. We use this # of rows and # of cols in a loop later on
            // to cycle through every 'cell' of the geomorph, comparing it with a hexagon in our map and
            // applying the geomorph terrain type to the hexagon.
            first_col_name = Object.keys(m_geo_stock[list_of_geomorphs[morph]])[0];
            number_rows_in_geomorph = m_geo_stock[list_of_geomorphs[morph]][first_col_name].length;
            number_cols_in_geomorph = Object.keys(m_geo_stock[list_of_geomorphs[morph]]).length;

            // Get the morph name (e.g. 'mountain_1') and also this name without the '_1' suffix.
            // We use the latter to add a class of this terrain type to a given hexagon.
            morph_name = list_of_geomorphs[morph];
            morph_name_no_suffix = morph_name.replace(/_[0-9]+$/, '');

            // Get the number and proportion of hexagons of this terrain type; used to test if the loop
            // should apply this terrain type to any more hexagons, or if it's already reached the ideal proportion for this type.
            number_hexes_of_terrain = document.getElementsByClassName(morph_name_no_suffix).length;
                // == running total of e.g. swamp hexes
            prop_hexes_of_this_morph = number_hexes_of_terrain / total_num_hexes;
                // == running %ile of e.g. swamp hexes

            if(prop_hexes_of_this_morph <= proportion_terrain) {            // redundant? See above for loop ln 23
                // Find our anchor id Hexagon. 
                // Chosen randomly from amongst hexes not already converted into this terrain type.
                // A new anchor is chosen for each application of the geomorph.
                anchor_id = Math.floor(Math.random() * viable_hexes_for_terrain.length);
                //anchor_hex = document.getElementById('hex_' + anchor_id);
                console.log(`${anchor_id} is the anchor id for ${morph_name}`);
                // Solve for the row and column coordinates of the anchor hexagon.
                anchor_hex_row = anchor_id % numRows; 
                console.log(`anchor hex row is ${anchor_hex_row}`);  
                anchor_hex_col = Math.ceil(anchor_id / numRows);
                console.log(`anchor hex column is ${anchor_hex_col}`);    // These are calculating correctly

                        // Functional Alex Addition
                        // "Is Even"
                        // To deal with the even-row sag of the hex-map, we want to apply our geomorphs on odd rows only.
                        // Simply because all the data-entry for geomorphs will be done with that even-row-sag assumption.
                        // All geomorphs will start with a filled hex (1) in their leftmost column rather than a blank (0).
                        // We want a function to check whether r_col_to_start is odd or even.
                        // If it's even, we kick the morph over by one column.
                        // if(anchor_hex_col % 2 === 0) {
                        //     anchor_hex_col ++;
                        // }

                //directions = ['horizontal','vertical'];
                //let direction = 'unknown';
                let direction = 'vertical';
                //direction = directions[Math.floor(Math.random() * directions.length)];
                
                // Calculate hex ID for this iteration of the loop.
                // These loops' start and end integers are relative to the dimensions of the geomorph file.
                for (let geo_col_number = 1; geo_col_number <= number_cols_in_geomorph; geo_col_number++) {
                    for (let geo_row_number = 1; geo_row_number < number_rows_in_geomorph; geo_row_number++) {                        
                        // Use the anchor's coordinates to offset the overlaid geomorph lattice;
                        // The -1 is to account for the col_ and geo_row_numbers starting at 1. 

                        // THIS TRACKS THROUGH THE MORPH'S DIMENSIONS ON THE MAP FROM TOP LEFT, OVER EACH COLUMN,
                        // LEFT TO RIGHT, UNTIL IT REACHES BOTTOM RIGHT.  LINE BY LINE.

                        // THIS IS CURRENTLY CUTTING OFF THE FIRST 'column' OF THE GEOMORPH (TRY SETTING TO 0 ABOVE?)

                        // IT IS ALSO MIRRORING AND FLIPPING THE MORPH 90 DEGREES!!!!

                        map_col = geo_col_number + anchor_hex_col - 1;
                        console.log(`map_col is ${map_col}`);
                        map_row = geo_row_number + anchor_hex_row - 1;
                        console.log(`map_row is ${map_row}`);   // THESE ARE WORKING
                        // rol_ and geo_row_number are the temporary references to morph, ie. the column/row we are transcribing in
                        // map_col and _row are the positions on the hexmap

                        if(direction == 'vertical'){    // currently unused because only applying horizontally...
                            // Solve for the uniqueID of the hexagon we're looking at.
                            uniqueID = (numRows) * (map_col - 1) + map_row;
                            console.log(`uniqueID is ${uniqueID}`);     
                        }
                        //console.log('hex unique ID is ' + uniqueID);
                        if(direction == 'horizontal'){
                            uniqueID = (numRows) * (map_row - 1) + map_col; // Seems to render morphs horizontally (good) but not to edges of map
                            // uniqueID = (numRows) 
                            console.log(`uniqueID is ${uniqueID}`);     
                        }
                        //if(direction == 'diagonal'){
                        //    // Haven't figured this one out yet...
                        //}

                        // Pull out this hexagon ('hex_to_modify').
                        hex_to_mod = document.getElementById('hex_' + uniqueID);

                        // Check that this hexagon exists! If not, do nothing.
                        if(hex_to_mod != null) {
                            // Check the geomorph cell's value; if it's 1 (i.e., TRUE), apply it to the hexagon!
                            if(m_geo_stock[morph_name]['col_' + geo_col_number][geo_row_number] === 1){
                                
                                // Quick check: any other terrain types to replace? If so, remove them here.
                                for (i in terrain_replace_list) {
                                    // Pull out the i'th terrain to replace...
                                    terrain_to_replace = terrain_replace_list[i];
                                    // Tell user in console log that we are scanning for other terrain type to be replaced...
                                    //console.log('Looking to replace ' + terrain_to_replace + ' with ' + morph_name_no_suffix);
                                    // Check the class name list of the hexagon; does it have this old terrain type?
                                    if(hex_to_mod.classList.contains(terrain_to_replace)){
                                        // Remove old terrain type from class list.
                                        hex_to_mod.classList.remove(terrain_to_replace);
                                        // Inform user in console log.
                                        //console.log('Overwrote ' + terrain_to_replace + ' with ' + morph_name_no_suffix + ' for ' + hex_to_mod.id);
                                    }
                                }
                                // After the check of other terrain types above, 
                                // here we just add the terrain type of this function run to the hex in question.
                                hex_to_mod.classList.add(morph_name_no_suffix);
                                // Remove this hexagon from the list of viable choices for a new anchor (for next loop iteration)
                                viable_hexes_for_terrain.filter(k => k !== anchor_id);
                            }
                        }
                    }
                }
            }
        // Recalculate the proportion of hexagons of this type; use to see if we should run loop again.
        number_of_terrain = document.getElementsByClassName(morph_name_no_suffix).length;
        prop_hexes_of_this_morph = number_of_terrain / total_num_hexes;
        }
    });
}


function select_terrain_type(
    terrain_types,
    terrain_proportions,
    terrain_replace_list,
    delay
    ){
    var i = 0;
    
    function terrain_application_loop() { 
        this_terrain = terrain_types[i];
        this_proportion = terrain_proportions[i];
        this_replacement_list = terrain_replace_list[i];

        console.log(`About to apply ${this_terrain} from terrain application loop.`)
        // Apply the loop with a 1-second delay between rounds.
        setTimeout(function() {
            assign_terrain(this_terrain, this_proportion, this_replacement_list); 
            i++;                    //  increment the counter
            if (i <= terrain_types.length) {           //  if the counter is less than the # of terrain types to add,
                terrain_application_loop()            //   do loop again.
            } else {
                // Any hexes that are left over and didn't get any terrain type applied?
                // Make them into 'open' type!
                all_hexes = Array.from(document.getElementsByClassName('hex-center'));
                excluded_terrain_types = ["wooded", "swamp", "desert", "mountain"];
                open_hexes = all_hexes.filter(function (element) {
                    return !excluded_terrain_types.some(function (excluded_terrain_types) {
                    return element.classList.contains(excluded_terrain_types);
                    });
                });
                open_hexes.map(k => k.classList.add('open'));
            }    
        }, delay)
    }
    terrain_application_loop();
}