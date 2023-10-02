function select_terrain_type(numCols, numRows){

    var m_geo_stock = {
        'goop': [0]
    };
    var number_of_geomorphs = 0; 
    var cols_in_geomorph = 0; 
    var first_col_name = 0;
    var number_rows_in_geomorph = 0;

    // Call the read_json function and update m_geo_stock when the promise resolves
    read_json('./data/geomorphs/mountain.json')
        .then(content => {
        // Assign the content to your object
        m_geo_stock = content;
        // How many JSON dictionaries are in our m_geo_stock?
        list_of_geomorphs = Object.keys(m_geo_stock);       // ie. 2 types of mountains
        number_of_geomorphs = list_of_geomorphs.length;     // returns '2'

        // Set limits //
        proportion_mountains = 0.1638; // This could be a user input later on.
        num_hexes_of_this_morph = 0;
        total_num_hexes = document.getElementsByClassName('hex-center').length; // not an array, can be turned into one.
        prop_hexes_of_this_morph = 0;                                           // each hex has class name 'hex-center' (for now)

        for(let i = 0; prop_hexes_of_this_morph <= proportion_mountains; i++) {     // while proportion <= desired proportion,

            for (let morph = 0; morph < number_of_geomorphs; morph++) {             // this is intended to choose randomly between different morph options
            // replace: morph = randint up to number of choices for geomorph
            
            first_col_name = Object.keys(m_geo_stock[list_of_geomorphs[morph]])[0];
            number_rows_in_geomorph = m_geo_stock[list_of_geomorphs[morph]][first_col_name].length;
            number_cols_in_geomorph = Object.keys(m_geo_stock[list_of_geomorphs[morph]]).length;

            morph_name = list_of_geomorphs[morph];
            console.log(morph_name);
            morph_name_no_suffix = morph_name.replace(/_[0-9]+$/, '');  // returns terrain type (e.g. mountain_2) as "mountain" for the png

            //for(let i = 0; prop_hexes_of_this_morph <= proportion_mountains; i++) {

                number_mountains = document.getElementsByClassName(morph_name_no_suffix).length;    // current count of mountain hexes
                prop_hexes_of_this_morph = number_mountains / total_num_hexes;                      // current proportion

                if(prop_hexes_of_this_morph <= proportion_mountains) {                              // redundant?

                r_col_to_start = Math.floor(Math.random() * (numCols - number_cols_in_geomorph)) + 1;

                // takes # columns in map and subtracts number in the geomorph to avoid having things go off the edge.  Will change(?)
                // once we figure out saving files.

                r_row_to_start = Math.floor(Math.random() * (numRows - number_rows_in_geomorph)) + 1;

                // We subtract the number of rows + cols from our geomorph so that the placement
                // always lands inside our hex map.

                // These inform the top left corner of our geomorph's placement.

                directions = ['horizontal','vertical'];     // to add: diagonal
                let direction = 'unknown';
                direction = directions[Math.floor(Math.random() * directions.length)];  // use choose function
                console.log("direction is " + direction);
                // Calculate hex ID for this iteration of the loop.
                // These loops' start and end integers are relative to the dimensions of the geomorph file.
                for (let col_number = 1; col_number <= number_cols_in_geomorph; col_number++) {
                    for (let row_number = 1; row_number < number_rows_in_geomorph; row_number++) {

                        // Increase col and row number in each loop by the random start determined above.
                        col_num_hex = col_number + r_col_to_start;
                        row_num_hex = row_number + r_row_to_start;          // 

                        if(direction == 'vertical'){
                        uniqueID = (numRows) * (col_num_hex - 1) + row_num_hex; // identical to how hexmap was generated.
                        }                                                       // although variable names are differentiated.
                        // numRows == user input for the hexmap (ie. map total)     eg. column 2.  numRows is let's say 30.
                        // col / row_num_hex == a relative position for the current hex, ie. col and rows from top left.
                        // eg. we're in 2nd column, row 3, and hexmap is a 30 x 30: 
                        // 30 * (2-1) + 3 == unique id of 33. 
                        // This is all giving us an 'anchor' - 
                        // either to start applying the geomorph, or it's re-applying this method to each cell of the geomorph.
                        
                        if(direction == 'horizontal'){
                            uniqueID = (numRows) * (row_num_hex - 1) + col_num_hex; // opposite, seems to work
                        // each 2nd column is staggered lower. 
                        }
                        if(direction == 'diagonal'){
                            // Haven't figured this one out yet...
                        }

                        // Pull out this hexagon.
                        hex_to_mod = document.getElementById('hex_' + uniqueID);    // pulling out the div, ie. actual hex

                        if(m_geo_stock[morph_name]['col_' + col_number][row_number] === 1){     // if within geomorph array position is 1
                            // Assign this type of geometry
                            hex_to_mod.classList.add(morph_name_no_suffix) 
                            // can we either remove the old terrain type classes
                            // pseudocode: if hex_to_mod has (swamp, woods, open...) remove them
                            // or can we just have the hex object carry a variable that can be overwritten 

                            console.log('Hex ' + hex_to_mod.id + ' is a ' + morph_name_no_suffix);
                        }
                    }
                }
            }
        number_mountains = document.getElementsByClassName(morph_name_no_suffix).length;
        prop_hexes_of_this_morph = number_mountains / total_num_hexes;          // top of loop looks to these to see if its continuing to add
        console.log(number_mountains);
        console.log(total_num_hexes);
        console.log(prop_hexes_of_this_morph);
    }
        }
    });
}