document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:5000/getAll')
        .then(response => response.json())
        .then(data => loadDetails(data['data']));
});

const predefinedSearchValues = {
    '#college-btn': {
        searchTerm: 'madras',
        column: 'college_Name' // Ensure the column name matches the database column name
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
                .then(data => loadDetails(data)) // Adjust based on the actual data structure returned by the endpoint
                .catch(error => console.error('Error:', error));
        }
    } else {
        console.error('No search value defined for', searchKey);
    }
}
function loadDetails(data) {
    console.log('Data received:', data); // Add this line for debugging
    const container = document.querySelector('#main-container');
    container.innerHTML = "";

    if (!Array.isArray(data) || data.length === 0) {
        container.innerHTML = "<p class='no-data'>No Data</p>";
        return;
    }

    data.forEach(college => {
        // Destructure college object
        const {
            College_name,
            College_Logo,
            Description,
            Description_img,
            Course_info,
            Course_img,
            Cutoff,
            Cutoff_highlights,
            Admission,
            Admission_Step1,
            Admission_Step2,
            Admission_Step3,
            Admission_Process,
            Cutoff_table,
            Cutoff_table_info,
            courseName1,
            courseName2,
            courseName3,
            courseDuration1,
            courseDuration2,
            courseDuration3,
            courseFees1,
            courseFees2,
            courseFees3
        } = college;

        // Create a new div for the college card
        const collegeCard = document.createElement('div');
        collegeCard.classList.add('flex', 'flex-col', 'md:flex-row');
        collegeCard.style.paddingLeft = '100px';
        collegeCard.style.paddingRight = '100px';

        collegeCard.innerHTML = `
            <div class="md:w-3/4 bg-card text-card-foreground p-6 rounded-lg border-2 border-gray-400 flex-grow">
                <div class="p-4">
                    <div class="flex items-center mb-4">
                        <div class="bg-primary w-16 h-16 rounded-full mr-2 bg-white"><img src="${College_Logo}" alt=""></div>
                        <h3 class="text-xl font-bold">${College_name}: Info, Admission 2024, Cutoff, Courses & Fees</h3>
                    </div>
                    <div class="tab-titles">
                        <p class="tab-links" onclick="openTab(event, 'Description')">Info</p>
                        <p class="tab-links" onclick="openTab(event, 'Course')">Course & Fees</p>
                        <p class="tab-links" onclick="openTab(event, 'Cutoff')">Cutoff</p>
                        <p class="tab-links" onclick="openTab(event, 'Admission')">Admission</p>
                    </div>
                    <div style="display:flex;">
                        <div class="tab-contents active-tab" id="Description">
                            <h2 class="text-xl font-bold mb-4">About ${College_name}</h2>
                            <p class="mb-4">${Description}</p>
                            <img aria-hidden="true" alt="institution-logo" src="${Description_img}" class="rounded" style="margin-left:100px;" />
                        </div>
                        <div class="tab-contents" id="Course">
                            <h2 class="text-xl font-bold mb-4">${College_name} Courses and Fees</h2>
                            <p class="mb-4">${Course_info}</p>
                            <img aria-hidden="true" alt="institution-logo" src="${Course_img}" class="rounded" style="margin-left:40px;" />
                        </div>
                        <div class="tab-contents" id="Cutoff">
                            <p class="mb-4">${Cutoff}</p>
                            <h2 class="text-xl font-bold mb-4">${College_name} Cutoff 2024: Highlights</h2>
                            <p class="mb-4">${Cutoff_highlights}</p>
                            <h2 class="text-xl font-bold mb-4">${College_name} BTech Cutoff: JEE Advanced Result 2024 (Expected)</h2>
                            <p class="mb-4">${Cutoff_table_info}</p>
                            <img aria-hidden="true" alt="institution-logo" src="${Cutoff_table}" class="rounded" />
                        </div>
                        <div class="tab-contents" id="Admission">
                            <h2 class="text-xl font-bold mb-4">${College_name} Admission 2024</h2>
                            <p class="mb-4">${Admission}</p>
                            <h2 class="text-l font-bold mb-2">Step 1:</h2>
                            <p class="mb-4">${Admission_Step1}</p>
                            <h2 class="text-l font-bold mb-2">Step 2:</h2>
                            <p class="mb-4">${Admission_Step2}</p>
                            <h2 class="text-l font-bold mb-2">Step 3:</h2>
                            <p class="mb-4">${Admission_Step3}</p>
                            <h2 class="text-xl font-bold mb-4">${College_name} Application Process</h2>
                            <p class="mb-4">${Admission_Process}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="md:w-1/4 bg-popover text-popover-foreground rounded-lg mt-4 md:mt-0 ml-6 flex-grow">
                <div class="bg-white p-4 rounded-lg mb-4 border-2 border-gray-400">
                    <h3 class="text-lg font-bold mb-4">Are You Interested in this College?</h3>
                    <button class="bg-primary text-primary-foreground hover:bg-primary/80 p-2 rounded-lg mb-2 block w-full">Apply Now</button>
                    <button class="bg-gray-200 hover:bg-primary/20 p-2 rounded-lg block w-full mt-4">Brochure</button>
                </div>
                <div class="bg-white p-4 rounded-lg border-2 border-gray-400">
                    <h4 class="text-xl font-bold mb-4">Top Courses</h4>
                    <hr class="border-t-4 mt-2 mb-4">
                    <ul class="list-disc pl-5 mb-4">
                        <li>
                            <span class="font-bold">${courseName1}</span><br>
                            <span class="font-bold">Course Duration: ${courseDuration1}</span><br> 
                            <span class="text-blue-500">${courseFees1}</span> First Year Fees
                        </li>
                        <hr class="border-t-4 mt-2 mb-2">
                        <li>
                            <span class="font-bold">${courseName2}</span><br>
                            <span class="font-bold">Course Duration: ${courseDuration2}</span><br> 
                            <span class="text-blue-500">${courseFees2}</span> First Year Fees
                        </li>
                        <hr class="border-t-4 mt-2 mb-2">
                        <li>
                            <span class="font-bold">${courseName3}</span><br>
                            <span class="font-bold">Course Duration: ${courseDuration3}</span><br> 
                            <span class="text-blue-500">${courseFees3}</span> First Year Fees
                        </li>
                    </ul>
                    <hr class="border-t-4 mt-2 mb-6">
                    <button class="bg-primary text-primary-foreground hover:bg-primary/80 p-2 rounded-lg mb-2 block w-full">View More</button>
                </div>
            </div>
        `;

        container.appendChild(collegeCard);
    });
}
