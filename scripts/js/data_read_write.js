function read_json(fileName) {
    return fetch(fileName) // Fetch the file using a relative path
    .then(response => response.json()) // Parse the JSON response
    .catch(error => {
        console.error('Error reading the JSON file:', error);
    });
}

function enable_downloads(save_button_id) {
    // Function to trigger the download
    function downloadData(filename, content) {
        var blob = new Blob([JSON.stringify(content)], { type: "application/json" });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    }
    
    // Function to display a modal dialog and prompt for a filename
    function promptForFilenameAndSave(dataToSave) {
        var filename = prompt("Enter a filename (or leave empty for 'data.json'):", "data.json");
        filename = filename.trim() || "data.json"; // Default filename if empty
        downloadData(filename, dataToSave);
    }
    
        // Attach click event to the "Save" button
    document.getElementById(save_button_id).addEventListener("click", function () {
    
        number_hexes = document.getElementsByClassName('hex-center').length;
   
        hexes_mountain = Array.from(document.getElementsByClassName('hex-center mountain')).map(element => element.id);
    
        var dataToSave = {
        number_of_hexes: number_hexes,
        numRows: number_hex_v.value,
        numCols: number_hex_h.value,
        mountain_hexes: hexes_mountain
        };
        promptForFilenameAndSave(dataToSave);
    });
}

function enable_data_reads(load_button_id, callback) {
    // Function to handle file selection and data loading
    function handleFileSelect(event) {
        const fileInput = event.target;
        const file = fileInput.files[0]; // Get the selected file

        if (file) {
            const reader = new FileReader();

            reader.onload = function (e) {
                // Parse the JSON data from the file and pass it to the callback function
                const loadedData = JSON.parse(e.target.result);
                callback(loadedData);
            };

            // Read the file as text
            reader.readAsText(file);
        }
    }

    // Add a click event listener to the "Load Data" button
    const loadDataButton = document.getElementById(load_button_id);
    loadDataButton.addEventListener('click', function () {
        // Trigger the file input dialog
        const fileInput = document.getElementById('fileInput');
        fileInput.click();
    });

    // Add an event listener to the file input element
    const fileInput = document.getElementById('fileInput');
    fileInput.addEventListener('change', handleFileSelect);
}
