function assign_terrain(terrain_type, target_proportion, terrain_replace_list) {
    //return new Promise((resolve, reject) => {
        
        read_json('./data/geomorphs/' + terrain_type + '.json')
            .then(content => {
            // Assign the content to your object
            m_geo_stock = content;
            // How many JSON dictionaries are in our m_geo_stock?
            list_of_geomorphs = Object.keys(m_geo_stock);
            number_of_geomorphs = list_of_geomorphs.length;


            console.log(`Applying ${terrain_type}...`);


            // Set limits //
            total_num_hexes = document.getElementsByClassName('hex-center').length;
            proportion_terrain = target_proportion; // This could be a user input later on.
            num_hexes_of_this_morph = 0;
            prop_hexes_of_this_morph = 0;
            let viable_hexes_for_terrain = range(1,(total_num_hexes));


            // This loop adds a geomorph to the map at a random anchor hexagon's position;
            // The loop continues until either we've reached the terrain type's ideal proportion,
            // or we've done 3000 loops (to prevent infinite looping...).
            for(let i = 0; prop_hexes_of_this_morph <= proportion_terrain & i < 3000; i++) {
                //for (let morph = 0; morph < number_of_geomorphs; morph++) {   // %%% cut
                morph = Math.floor(Math.random() * number_of_geomorphs); //Get random index integer based on # of geo options.


                // Find dimensions of geomorph. We use this # of rows and # of cols in a loop later on
                // to cycle through every 'cell' of the geomorph, comparing it with a hexagon in our map and
                // applying the geomorph terrain type to the hexagon.
                first_row_name = Object.keys(m_geo_stock[list_of_geomorphs[morph]])[0];     // **SWAPPED FROM COL
                number_rows_in_geomorph = Object.keys(m_geo_stock[list_of_geomorphs[morph]]).length;    // **SWAPPED THE TWO VARS
                number_cols_in_geomorph = m_geo_stock[list_of_geomorphs[morph]][first_row_name].length;

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


                if(prop_hexes_of_this_morph <= proportion_terrain) {            // %%% redundant? See above for loop ln 23
                    // Find our anchor id Hexagon.
                    // Chosen randomly from amongst hexes not already converted into this terrain type.
                    // A new anchor is chosen for each application of the geomorph.
                    anchor_id = Math.floor(Math.random() * viable_hexes_for_terrain.length);
                    //anchor_hex = document.getElementById('hex_' + anchor_id);
                    console.log(`${anchor_id} is the anchor id for ${morph_name}.`);
                    // Solve for the row and column coordinates of the anchor hexagon.
                    let anchor_hex_row = anchor_id % numRows;
                    //console.log(`anchor hex row is ${anchor_hex_row}`);  
                    let anchor_hex_col = Math.ceil(anchor_id / numRows);
                    //console.log(`anchor hex column is ${anchor_hex_col}`);    // These are calculating correctly

                    // Alex Addition "Is Even": To deal with the even-row sag all geomorphs will start on an odd column.
                    if(anchor_hex_col % 2 === 0) {
                        anchor_hex_col ++;
                    }


                    //directions = ['horizontal','vertical'];
                    //let direction = 'unknown';
                    let direction = 'vertical';
                    //direction = directions[Math.floor(Math.random() * directions.length)];
                
                    // Calculate hex ID for this iteration of the loop.
                    // These loops' start and end integers are relative to the dimensions of the geomorph file.
                    for (let temp_col_number = 0; temp_col_number <= number_cols_in_geomorph; temp_col_number++) {
                        for (let temp_row_number = 0; temp_row_number < number_rows_in_geomorph; temp_row_number++) {                        
                            // Use the anchor's coordinates to offset the overlaid geomorph lattice;
                            // temp_col_number and temp_row_number are the temporary references to morph,
                            // ie. the column/row we are transcribing in.

                            // TRY SWITCHING THE ABOVE INNARDS OF THE FOR LOOPS, IE. 
                    //for (let temp_row_number = 0; temp_row_number < number_rows_in_geomorph; temp_row_number++) {                        
                        //for (let temp_col_number = 1; temp_col_number <= number_cols_in_geomorph; temp_col_number++) {


                            // THIS TRACKS THROUGH THE MORPH'S DIMENSIONS ON THE MAP FROM TOP LEFT, OVER EACH COLUMN,
                            // LEFT TO RIGHT, UNTIL IT REACHES BOTTOM RIGHT.  LINE BY LINE. BUT GOING BY ROW WHERE I
                            // THOUGHT IT WAS COLUMNS, and vice versa.
                            // THUS IT IS ALSO MIRRORING AND ROTATING THE MORPH!!!!


                            map_col = anchor_hex_col + temp_col_number;  // %%% - 1; // - 1 because temp_col_number started at 1, not zero 
                            //console.log(`map_col is ${map_col}`);
                            map_row = anchor_hex_row + temp_row_number;     
                            //console.log(`map_row is ${map_row}`);   // THESE ARE WORKING
                        
                            // map_col and _row are the positions on the hexmap of the particular hex being overwritten


                            if(direction == 'vertical'){    // currently unused because only applying horizontally...
                                // Solve for the uniqueID of the hexagon we're looking at.
                                uniqueID = (numRows) * (map_col - 1) + map_row;
                                //console.log(`uniqueID is ${uniqueID}`);       
                            }
                            //console.log('hex unique ID is ' + uniqueID);
                            if(direction == 'horizontal'){
                                uniqueID = (numRows) * (map_row - 1) + map_col; // Seems to render morphs horizontally (good) but not to edges of map
                                //console.log(`uniqueID is ${uniqueID}`);    
                            }


                            // Pull out this hexagon ('hex_to_modify').
                            hex_to_mod = document.getElementById('hex_' + uniqueID);
                            //geo_col_number = temp_row_number + 1;   // remember that in geomorphs rows are labeled columns for now;
                            geo_row_value = temp_row_number + 1;

                            // Check that this hexagon exists! If not, do nothing.
                            if(hex_to_mod != null) {
                                // Check the geomorph cell's value; if it's 1 (i.e., TRUE), apply it to the hexagon!
                                if(m_geo_stock[morph_name]['row_' + geo_row_value][temp_col_number] === 1) {    
                                    // tried switching around the col and row numbers inside there, try again
                                
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
                                    viable_hexes_for_terrain.filter(k => k !== hex_to_mod);     // hex_to_mod replaces uniqueID
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
    //    resolve();
    //});        
}

function final_count_proportion (type_to_count) {
    let count = document.getElementsByClassName(type_to_count).length;
    let total = document.getElementsByClassName('hex-center').length;
    let final_proportion = count / total;
    return final_proportion;
}

function find_adjacent (hex_id) {                               
    let current_hex_col = Math.ceil(hex_id / numRows);

    // parsed variables 
    hex_id_as_int = parseInt(hex_id);
    num_row_count = parseInt(numRows);
    
    // if the current hex is on an even (sagging) column:
    if(current_hex_col % 2 === 0) {
        let neighbors = [
        document.getElementById(`hex_${hex_id - 1}`),                           // N  
        document.getElementById(`hex_${hex_id_as_int + num_row_count}`),        // NE
        document.getElementById(`hex_${hex_id_as_int + num_row_count + 1}`),    // SE
        document.getElementById(`hex_${hex_id_as_int + 1}`),                    // S
        document.getElementById(`hex_${hex_id - numRows + 1}`),                 // SW
        document.getElementById(`hex_${hex_id - numRows}`)]                     // NW
        return neighbors;
    } else {
        // hex is odd
        let neighbors = [
        document.getElementById(`hex_${hex_id - 1}`),                           // N
        document.getElementById(`hex_${hex_id_as_int + num_row_count - 1}`),    // NE
        document.getElementById(`hex_${hex_id_as_int + num_row_count}`),        // SE
        document.getElementById(`hex_${hex_id_as_int + 1}`),                    // S
        document.getElementById(`hex_${hex_id - numRows}`),                     // SW
        document.getElementById(`hex_${hex_id - numRows - 1}`)]                 // NW
        return neighbors;     
    }

}

function cleanup_adjacent (target__terrain_type, disallowed_neighbors, replacement_type) {
    console.log(`Replacing ${disallowed_neighbors}s near ${target__terrain_type}s with ${replacement_type}.`);
    
    // make list of all hexes with the target terrain type
    let target_list = document.getElementsByClassName(target__terrain_type);
  
    // Iterate through div elements by their IDs
    for (let i = 0; i < target_list.length; i++) {
        const div = target_list[i];     // pull out div
        hex_name = div.id;              // access "hex_xyz"
        id_number = hex_name.slice(4);  // just the ID number

        // for each, check its 6 neighbors... 
        neighboring_hexes = Array.from(find_adjacent(id_number));
        // ... and replace unwanted types with a new type.
        disallowed_neighbors.forEach((disallowed_type) => {
            neighboring_hexes.forEach((hex) => {
                if (hex != null) {
                    if (hex.classList.contains(disallowed_type)) {
                        hex.classList.remove(disallowed_type);
                        hex.classList.add(replacement_type);
                    }
                } 
            })
        });
    }
}

async function select_terrain_type(
    terrain_types,
    terrain_proportions,
    terrain_replace_list,
    //stronghold_chances,
    //town_chances,
    delay
    ){
    return new Promise((resolve) => {
        let i = 0;
   
        function terrain_application_loop() {
            this_terrain = terrain_types[i];
            this_proportion = parseFloat(terrain_proportions[i]);
            this_replacement_list = terrain_replace_list[i];
            //stronghold_probability = stronghold_chances[i];
            //town_probability = town_chances[i]
        

            // Apply the loop with a delay between rounds.
            setTimeout(function() {  
                if (i < terrain_types.length) {            //  if the counter is less than the # of terrain types to add,
                //    console.log(`About to apply ${this_terrain} from terrain application loop.`);
                    assign_terrain(this_terrain, this_proportion, this_replacement_list);
                    delay;
                    i++;                                    //  increment the counter
                    terrain_application_loop();             //   do loop again.
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
                    delay;

                    cleanup_adjacent('swamp', ["desert", "mountain"], 'wooded');    // (type to look at; disallowed neighbors; replacement type)
                    cleanup_adjacent('desert', ["wooded"], 'open'); 
                    delay;
                    // final count data:
                    let terrain_table = []
                    for(k in terrain_types) {
                        terrain_table.push({TerrainType: terrain_types[k], Proportion: final_count_proportion(terrain_types[k])});
                    }
                    console.table(terrain_table);  
                }
            }, delay)
        }
        terrain_application_loop();
        resolve();
    });
}            
  







// ATTEMPT AT MERGING ASYNC AND THE DELAY
/*
function select_terrain_type(
    terrain_types,
    terrain_proportions,
    terrain_replace_list,
    stronghold_chances,
    //town_chances,
    delay
    ){                
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function terrain_application_loop(i, terrain_types) {
        if (i < terrain_types.length) {
            this_terrain = terrain_types[i];
            this_proportion = terrain_proportions[i];
            this_replacement_list = terrain_replace_list[i];
            stronghold_probability = stronghold_chances[i];
            //town_probability = town_chances[i]       
            await assign_terrain(this_terrain, this_proportion, this_replacement_list);
            assign_strongholds(this_terrain, stronghold_probability);      
            await delay(delay); // Ie. duration set by the call from index.html    
            i++;
            terrain_application_loop(i, terrain_types);
        } else {
            all_hexes = Array.from(document.getElementsByClassName('hex-center'));
            excluded_terrain_types = ["wooded", "swamp", "desert", "mountain"];
            open_hexes = all_hexes.filter(function (element) {
                return !excluded_terrain_types.some(function (excluded_terrain_types) {
                return element.classList.contains(excluded_terrain_types);
                });
            });
            open_hexes.map(k => k.classList.add('open'));
            delay;

            cleanup_adjacent('swamp', ["desert", "mountain"], 'wooded');    // (type to look at; disallowed neighbors; replacement type)
            cleanup_adjacent('desert', ["wooded"], 'open'); 
            delay;
            // final count data:
            let terrain_table = []
            for(k in terrain_types) {
                terrain_table.push({TerrainType: terrain_types[k], Proportion: final_count_proportion(terrain_types[k])});
            }
            console.table(terrain_table);  
        }

    }

    terrain_application_loop(0, terrain_types);

}
*/




/*
function assign_strongholds(this_SH_terrain, stronghold_chance) {
    // Find all hexes of our terrain type
    const target_hexes = Array.from(document.getElementsByClassName(this_SH_terrain));
    console.log(`Assigning SHs to ${this_SH_terrain}, ${target_hexes}`);

    // Loop through them and roll a chance for having a stronghold
    target_hexes.forEach(function(hex_to_mod_for_SH) {
        //console.log(hex_to_mod_for_SH);
        let roll = Math.random(0, 1);
        //console.log(`Roll is ${roll}`)
        if (roll <= stronghold_chance) {
            hex_to_mod_for_SH.classList.add('stronghold');
            //console.log(`Added stronghold to ${hex_to_mod_for_SH}`);
        }
    }) 
    /* 
    for (k in target_hexes) {
        hex_to_mod = target_hexes[k];
        console.log(hex_to_mod);
        let roll = Math.random();
        if (roll <= this_proportion) {
            hex_to_mod.classList.add('stronghold');
        }
    }
    
}   */