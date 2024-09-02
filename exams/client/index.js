document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:5000/getAll')
        .then(response => response.json())
        .then(data => loadDetails(data['data']));
});

const predefinedSearchValues = {
    '#exam-btn': {
        searchTerm: 'CAT',
        column: 'Exam_name' // Ensure the column name matches the database column name
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
            Exam_name,
            Exam_Logo,
            Description,
            Description_img,
            Eligibility,
            Eligibility_img,
            Registration,
            Registration_img,
            Syllabus,
            Syllabus_img,

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
                        <div class="bg-primary w-16 h-16 rounded-full mr-2 bg-white"><img src="${Exam_Logo}" alt=""></div>
                        <h3 class="text-xl font-bold">${Exam_name}: Info, Admission 2024, Cutoff, Courses & Fees</h3>
                    </div>
                    <div class="tab-titles">
                        <p class="tab-links" onclick="openTab(event, 'Description')">Info</p>
                        <p class="tab-links" onclick="openTab(event, 'Course')">Eligibility Criteria</p>
                        <p class="tab-links" onclick="openTab(event, 'Cutoff')">Registration</p>
                        <p class="tab-links" onclick="openTab(event, 'Admission')">Syllabus</p>
                    </div>
                    <div style="display:flex;">
                        <div class="tab-contents active-tab" id="Description">
                            <h2 class="text-xl font-bold mb-4">About ${Exam_name}</h2>
                            <p class="mb-4">${Description}</p>
                            <img aria-hidden="true" alt="institution-logo" src="${Description_img}" class="rounded" style="margin-left:100px;" />
                        </div>
                        <div class="tab-contents" id="Course">
                            <h2 class="text-xl font-bold mb-4">${Exam_name} Eligibility Criteria</h2>
                            <p class="mb-4">${Eligibility}</p>
                            <img aria-hidden="true" alt="institution-logo" src="${Eligibility_img}" class="rounded" style="margin-left:40px;" />
                        </div>
                        <div class="tab-contents" id="Cutoff">
                            <h2 class="text-xl font-bold mb-4">${Exam_name} Registration</h2>
                            <p class="mb-4">${Registration}</p>
                            <img aria-hidden="true" alt="institution-logo" src="${Registration_img}" class="rounded" />
                        </div>
                        <div class="tab-contents" id="Admission">
                            <h2 class="text-xl font-bold mb-4">${Exam_name} Syllabus</h2>
                            <p class="mb-4">${Syllabus}</p>
                            <img aria-hidden="true" alt="institution-logo" src="${Syllabus_img}" class="rounded" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="md:w-1/4 bg-popover text-popover-foreground rounded-lg mt-4 md:mt-0 ml-6 flex-grow">
                <div class="bg-white p-4 rounded-lg border-2 border-gray-400">
                    <h4 class="text-xl font-bold mb-4">Upcoming Exams</h4>
                    <hr class="border-t-4 mt-2 mb-4">
                    <ul class="list-disc pl-5 mb-4">
                        <li><span class="font-bold">KMAT</span></li>
                        <hr class="border-t-4 mt-2 mb-2">
                        <li><span class="font-bold">NMAT</span></li>
                        <hr class="border-t-4 mt-2 mb-2">
                        <li><span class="font-bold">TANCET</span></li>
                        <hr class="border-t-4 mt-2 mb-2">
                        <li><span class="font-bold">MAHCET</span></li>
                        <hr class="border-t-4 mt-2 mb-2">
                        <li><span class="font-bold">CUET PG</span></li>
                    </ul>
                    <hr class="border-t-4 mt-2 mb-6">
                    <button class="bg-primary text-primary-foreground hover:bg-primary/80 p-2 rounded-lg mb-2 block w-full">View More</button>
                </div><br>
                <div class="bg-white p-4 rounded-lg border-2 border-gray-400">
                    <h4 class="text-xl font-bold mb-4">Top Courses</h4>
                    <hr class="border-t-4 mt-2 mb-4">
                    <ul class="list-disc pl-5 mb-4">
                        <li><span class="font-bold">Executive MBA</span></li>
                        <hr class="border-t-4 mt-2 mb-2">
                        <li><span class="font-bold">MBA/PGDM</span></li>
                        <hr class="border-t-4 mt-2 mb-2">
                        <li><span class="font-bold">BE/B.TECH</span></li>
                        <hr class="border-t-4 mt-2 mb-2">
                        <li><span class="font-bold">MBBS</span></li>
                        <hr class="border-t-4 mt-2 mb-2">
                        <li><span class="font-bold">B.SC</span></li>
                    </ul>
                    <hr class="border-t-4 mt-2 mb-6">
                    <button class="bg-primary text-primary-foreground hover:bg-primary/80 p-2 rounded-lg mb-2 block w-full">View More</button>
                </div>
            </div>
        `;

        container.appendChild(collegeCard);
    });
}
