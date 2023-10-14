// Apply strongholds and towns, using probabilities from index
async function apply_strongholds (
    on_which_terrain_types, 
    chance_for_SH, 
    delay
    ) {
        return new Promise((resolve) => {
            let counter = 0;

            function stronghold_application_loop() {
                this_terrain = on_which_terrain_types[counter];
                this_proportion = chance_for_SH[counter];

                // Apply the loop with a delay between rounds.
                setTimeout(function() {  
                    delay;
                    delay;
                    delay;
                    if (counter < on_which_terrain_types.length) {            
                        console.log(`Applying strongholds to ${this_terrain}...`)
                        function assign_strongholds(this_SH_terrain, stronghold_chance) {
                            // Find all hexes of our terrain type
                            const target_hexes = Array.from(document.getElementsByClassName(this_SH_terrain));
                            //console.log(`Target SHs to ${this_SH_terrain}, ${target_hexes}`);
                        
                            // Loop through them and roll a chance for having a stronghold
                            target_hexes.forEach(function(hex_to_mod_for_SH) {
                                //console.log(hex_to_mod_for_SH);
                                let roll = Math.random(0, 1);
                                //console.log(`Roll is ${roll}`)
                                if (roll <= stronghold_chance) {
                                    hex_to_mod_for_SH.classList.remove(this_SH_terrain);
                                    hex_to_mod_for_SH.classList.add(`${this_SH_terrain}_stronghold`);
                                    console.log(`Added stronghold to ${hex_to_mod_for_SH.id}`);
                                }
                            }) 
                        }


                        assign_strongholds(this_terrain, this_proportion);
                        delay;
                        counter++;                                    //  increment the counter
                        stronghold_application_loop();             //   do loop again.  
                    }
                }, delay)
            }
            stronghold_application_loop();
            resolve();
        });
}       