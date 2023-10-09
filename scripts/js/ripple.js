function ripple_hexes_in_col_up(numCols,numRows){
    for(let z = 1; z <= numRows; z++) {   //  your code here
        const uniqueID = (numRows * (numCols - 1)) + z;
        hex_for_ripple = document.getElementById('hex_' + uniqueID);
        hex_for_ripple.style.visibility = 'visible';
        hex_for_ripple.style.transform = 'translateY(-15%)';
    }
}

function ripple_hexes_in_col_down(numCols,numRows){
    for(let z = 1; z <= numRows; z++) {   //  your code here
        const uniqueID = (numRows * (numCols - 1)) + z;
        hex_for_ripple = document.getElementById('hex_' + uniqueID);
        hex_for_ripple.style.visibility = 'visible';
        hex_for_ripple.style.transform = 'translateY(+15%)';
    }
}

function ripple(numCols,numRows) {
    
    var i = 1;
    ripple_speed = 500 / numCols; // In milliseconds. More columns, faster.

    function myLoop() { 

        ripple_hexes_in_col_up(i,numRows);
        
        setTimeout(function() {
            ripple_hexes_in_col_down(i,numRows);
            i++;                    //  increment the counter
            if (i <= numCols) {           //  if the counter < 10, call the loop function
            myLoop();             //  ..  again which will trigger another 
            }    
        }, ripple_speed)
    }
    myLoop();
}