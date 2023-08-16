const cityTableBody = document.querySelector('#cityTable tbody');
const apiUrl = 'https://countriesnow.space/api/v0.1/countries/population/cities';

// may first test of API

// fetch(apiUrl)
//     .then(response => response.json())
//     .then(data => {
//         const cities = data.data;

//         cities.forEach(city => {
//             const cityElement = document.createElement('p');
//             cityElement.textContent = `City: ${city.city}, Population: ${city.populationCounts[0].value} , year: ${city.populationCounts[0].year} , sex:${city.populationCounts[0].sex}`;
//             cityDataDiv.appendChild(cityElement);
//         });
//     })
//     .catch(error => {
//         console.error('Error fetching data:', error);
//     });



// Function to fetch all the citieis
function fetchData() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const cities = data.data;

            cities.forEach(city => {
                const row = document.createElement('tr');
                const cityCell = document.createElement('td');
                cityCell.textContent = city.city;

                const populationCell = document.createElement('td');
                populationCell.textContent = city.populationCounts[0].value;

                const sexCeell = document.createElement('td');
                sexCeell.textContent = city.populationCounts[0].sex;

                row.appendChild(cityCell);
                row.appendChild(populationCell);
                row.appendChild(sexCeell);

                // Check if population is higher than the selected filter
                const populationFilter = parseInt(document.getElementById('populationFilter').value);
                if (!isNaN(populationFilter) && city.populationCounts[0].value < populationFilter) {
                    row.classList.add('high-population');
                }

                cityTableBody.appendChild(row);
            });
        })
        // if the error comes consolee this
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

//  data fetch
fetchData();

// Apply filters button click event to what i need
function applyFilters() {
    cityTableBody.innerHTML = ''; // Clear existing data
    fetchData(); // Fetch and display data based on filters input
}

// City search input event , regardless if data is capital or not
document.getElementById('citySearch').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const rows = cityTableBody.querySelectorAll('tr');

    rows.forEach(row => {
        const cityCell = row.querySelector('td:nth-child(1)');
        if (cityCell) {
            const cityName = cityCell.textContent.toLowerCase();
            if (cityName.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        }
    });
});