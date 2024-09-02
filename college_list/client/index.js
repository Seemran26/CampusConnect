document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const searchKey = urlParams.get('searchKey');

    if (searchKey) {
        // Perform search using the searchKey from the URL
        performSearch('#' + searchKey);
    }
});

// Predefined search values for specific buttons
const predefinedSearchValues = {
    '#list-btn1': {
        searchTerm: 'management',
        column: 'College_Name' // Use 'column' to be consistent
    },

    '#list-btn2': {
        searchTerm: 'BE',
        column: 'B_Fees' // Use 'column' to be consistent
    },

    '#list-btn3': {
        searchTerm: 'bangalore',
        column: 'College_Address' // Use 'column' to be consistent
    },

    '#list-btn4': {
        searchTerm: 'delhi',
        column: 'College_Address' // Use 'column' to be consistent
    },
};

function performSearch(searchKey, searchType = 'name') {
    const searchDetails = predefinedSearchValues[searchKey];

    if (searchDetails) {
        const { searchTerm, column } = searchDetails;
        const trimmedSearchTerm = searchTerm.trim(); // Trim any extra whitespace

        if (searchType === 'name') {
            const endpoint = `http://localhost:5000/search?name=${encodeURIComponent(trimmedSearchTerm)}&column=${encodeURIComponent(column)}`;

            fetch(endpoint)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => loadDetails(data['data']))
                .catch(error => console.error('Error:', error));
        }
    } else {
        console.error('No search value defined for', searchKey);
    }
}




function loadDetails(data) {
    const container = document.querySelector('#main-container');

    // Clear existing content
    container.innerHTML = "";

    if (data.length === 0) {
        container.innerHTML = "<p class='no-data'>No Data</p>";
        return;
    }

    // Iterate through the data and create a card for each college 
    data.forEach(college => {
        const { College_Name, College_Address, College_Rating, B_Fees, M_Fees, Logo, College_Img  } = college;

        // Create a new div for the college card
        const collegeCard = document.createElement('div');
        collegeCard.classList.add('bg-card', 'p-6', 'rounded-lg', 'border-2', 'border-gray-400', 'flex', 'flex-col', 'md:flex-row', 'items-center');
        collegeCard.style.width = '1700px';
        collegeCard.style.marginTop = '20px';

        // Insert the college data into the card
        collegeCard.innerHTML = `
            <div class="p-0">
                <img aria-hidden="true" alt="institution-logo" src="${College_Img}" class="rounded" />
            </div>
            <div class="md:ml-4 flex-1">
                <div class="flex items-center mb-2">
                    <div class="w-16 h-16 bg-white rounded-full mr-2"> <img src="${Logo}"> </div>
                    <h3 class="text-lg font-semibold">${College_Name}</h3>
                </div>   
                <h3 class="text-lg font-semibold ml-4">${College_Address}</h3>
                <p class="text-muted-foreground ml-4 mt-2">Rating: ${College_Rating}</p>
                <div class="mt-4 mb-2 flex space-x-2 ml-4 ">
                <button class="bg-secondary text-secondary-foreground px-4 py-2 rounded border border-border">Admission 2024</button>
                <button class="bg-secondary text-secondary-foreground px-4 py-2 rounded">Courses & Fees</button>
                <button class="bg-secondary text-secondary-foreground px-4 py-2 rounded">${B_Fees}</button>
                <button class="bg-secondary text-secondary-foreground px-4 py-2 rounded">${M_Fees}</button>
            </div>
            </div>
            <div class="mt-4 md:mt-0 md:ml-4 flex flex-col space-y-2">
                <button class="bg-primary text-primary-foreground px-4 py-2 rounded w-64">Apply Now</button>
                <button class="bg-primary text-primary-foreground px-4 py-2 rounded w-64">Brochure</button>
            </div>
        `;

        // Append the card to the main container
        container.appendChild(collegeCard);
    });
}
