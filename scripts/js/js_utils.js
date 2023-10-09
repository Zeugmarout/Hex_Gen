// Make an array from two numbers (e.g. range(2,5) gives an array 2,3,4,5)
function range(start, end) {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function remove_old_hexes() {
    old_hexes = Array.from(document.getElementsByClassName('hex-center'));
    for (let i = old_hexes.length; i > 0; i--) {
        hex_for_removal = document.getElementById('hex_' + i);
        hex_label_for_removal = document.getElementById('hex_label_' + i);
        hex_for_removal.remove();
        hex_label_for_removal.remove();
    }
}

function choose (myArray) {
    // Generate a random index within the valid range
    const randomIndex = Math.floor(Math.random() * myArray.length);

    // Use the random index to get a random value from the array
    const randomValue = myArray[randomIndex];

    return randomValue;

    //console.log(%c'randomValue'; 'font-weight: bold, font-color: red');

}