// Update the submitQuery function to include regex and date range parameters
async function submitQuery() {
  try {
    const searchInput = document.getElementById('searchInput').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    // Add a new input for regex
    const useRegex = document.getElementById('useRegex').checked;

    const response = await fetch(`http://localhost:3000/search?query=${encodeURIComponent(searchInput)}&startDate=${startDate}&endDate=${endDate}&useRegex=${useRegex}`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    // Display each search result
    data.forEach(log => {
      const logDiv = document.createElement('div');
      logDiv.innerHTML = `<strong>${escape(log.level)}:</strong> ${escape(log.message)} (${new Date(log.timestamp).toLocaleString()})`;
      resultsDiv.appendChild(logDiv);
    });

  } catch (error) {
    console.error('Error fetching search results:', error);

    // Update the UI to inform the user about the error
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '<p>Error fetching search results. Please try again later.</p>';
  }
}

// Function to escape HTML entities
function escape(html) {
  const escapeElement = document.createElement('div');
  escapeElement.textContent = html;
  return escapeElement.innerHTML;
}