let currentPage = 1;
const itemsPerPage = 6;
let filteredData = colleges; // default

// Collect unique filter values
function uniqueValues(key) {
  return [...new Set(colleges.map((c) => c[key]))];
}

// Render Filters
function renderFilters() {
  renderCheckboxes("areaFilters", uniqueValues("area"), "area");
  renderCheckboxes("programFilters", uniqueValues("program"), "program");
  renderCheckboxes("feesFilters", uniqueValues("fees"), "fees");
  renderCheckboxes(
    "specializationFilters",
    uniqueValues("specialization"),
    "specialization"
  );
  renderCheckboxes("examFilters", uniqueValues("exam"), "exam");
  renderCheckboxes("ratingFilters", uniqueValues("rating"), "rating");
  renderCheckboxes(
    "collegeTypeFilters",
    uniqueValues("collegeType"),
    "collegeType"
  );
}

function renderCheckboxes(containerId, values, key) {
  const container = document.getElementById(containerId);

  container.innerHTML = values
    .map((val) => {
      const count = colleges.filter((c) => c[key] === val).length;

      return `
      <label class="filter-option">
        <input type="checkbox" value="${val}" data-key="${key}" onchange="applyFilters()">
        <span class="filter-label">${val}</span>
        <span class="filter-count">(${count})</span>  
      </label>
    `;
    })
    .join("");
}

// Render Colleges
function renderColleges(list) {
  filteredData = list;
  const container = document.getElementById("collegeList");
  // If no data found
  if (list.length === 0) {
    container.innerHTML = `
      <div style="
        text-align:center;
        padding:40px;
        font-size:20px;
        color:#6b7280;
      ">
        No College Found
      </div>
    `;
    document.getElementById("pagination").innerHTML = "";
    return;
  }
  // Pagination calculation
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedItems = list.slice(start, end);

  container.innerHTML = paginatedItems
    .map(
      (c) => `
  
  <div class="college-card">

    <!-- LEFT IMAGE -->
    <!-- LEFT IMAGE -->
<div class="college-img">
  <img src="${c.image}" alt="${c.name}" onclick="location.href='./college-description.html'" style="cursor:pointer;">
  <span class="guide-badge">Guide2Me Rating<br>${c.guideRating}</span>
</div>


    <!-- RIGHT CONTENT -->
    <div class="college-content">

      <!-- Top Row -->
      <div class="college-top">
        <h3>${c.name}</h3>
      </div>

      <p class="location">📍 ${c.area}</p>
      <p class="college-rating">
  ⭐ <strong>${c.rating}</strong> / 5
  <span class="review-link">• Read Reviews</span>
</p>

      <!-- Tags -->
      <div class="tags">
        ${c.tags.map((t) => `<span>${t}</span>`).join("")}
      </div>

      <!-- NIRF -->
      <div class="nirf">
        🏆 ${c.nirf}
      </div>

      <!-- Course Box -->
  <div class="course-box">
  <div class="course-item">
    <small>MBA Program</small>
    <strong>${c.program}</strong>
  </div>

  <div class="course-item">
    <small>Course Fees</small>
    <strong>${c.fees}</strong>
  </div>

  <div class="course-item">
    <small>Average Salary</small>
    <strong>${c.avgSalary}</strong>
  </div>
</div>


      <!-- Bottom Links -->
      <div class="college-bottom">
        <div class="links">
          • Admission &nbsp; • Placements &nbsp; • Facilities &nbsp; • Reviews
        </div>
     
      </div>

      <!-- Right Buttons -->
      <div class="action-buttons">

  <button class="apply-btn">Apply now</button>

  

  <button class="brochure-btn">Brochure</button>
</div>


    </div>

  </div>

  `
    )
    .join("");
  renderPagination(list.length);
}

// Apply Filters
function applyFilters() {
  const checked = document.querySelectorAll("input[type=checkbox]:checked");

  let filtered = colleges;

  checked.forEach((cb) => {
    const key = cb.dataset.key;
    const value = cb.value;
    filtered = filtered.filter((c) => c[key] === value);
  });
  filteredData = filtered;
  renderColleges(filtered);
}

function renderPagination(totalItems) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pagination = document.getElementById("pagination");

  let buttons = "";

  if (currentPage > 1) {
    buttons += `<button onclick="changePage(${currentPage - 1})">Prev</button>`;
  }

  for (let i = 1; i <= totalPages; i++) {
    buttons += `<button class="${i === currentPage ? "active" : ""}"
                 onclick="changePage(${i})">${i}</button>`;
  }

  if (currentPage < totalPages) {
    buttons += `<button onclick="changePage(${currentPage + 1})">Next</button>`;
  }

  pagination.innerHTML = buttons;
}
function changePage(page) {
  currentPage = page;
  renderColleges(filteredData);
}

// Search by college name
document.getElementById("searchInput").addEventListener("keyup", function () {
  const query = this.value.toLowerCase().trim();

  let filtered = filteredData.length ? filteredData : colleges;

  if (query !== "") {
    filtered = filtered.filter((c) => c.name.toLowerCase().includes(query));
  }

  currentPage = 1;
  renderColleges(filtered);
});

document.addEventListener("DOMContentLoaded", function () {
  const detailButtons = document.querySelectorAll(".details-btn");

  detailButtons.forEach((button) => {
    button.addEventListener("click", function () {
      window.location.href = "./college-description.html";
    });
  });
});

// Init
renderFilters();
renderColleges(colleges);


// Mega Menu
// Get elements from the DOM

const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu-container');
const dropdowns = document.querySelectorAll('.dropdown > div');
const subDropdowns = document.querySelectorAll('.sub-dropdown > div');

// Toggle variable
let menuOpen = false;

// Set click event to menu button
menuBtn.addEventListener('click', ()=>{
    // Toggle mega menu show class
    menu.classList.toggle('mega-menu-show');
    // If the menu open variable is false
    if(menuOpen===false){
        // Set the close icon to the menu button
        menuBtn.innerHTML=`
        <span class="material-symbols-outlined">
            close
        </span>
        `;
        // Set menu open to true
        menuOpen = true;
    }
    else{
        // Set the menu icon to the menu button
        menuBtn.innerHTML=`
        <span class="material-symbols-outlined">
            menu
        </span>
        `;
        // Set menu open to false
        menuOpen = false;
    }
});

// Select all dropdowns
dropdowns.forEach(dropdown=>{
    // Add click event
    dropdown.addEventListener("click", (e)=>{
        // Toggle dropdown menu show class
        dropdown.nextElementSibling.classList.toggle('menu-show');
        // Toggle icon rotated class
        dropdown.lastElementChild.classList.toggle('icon-rotated');
    });
});

// Select all sub dropdowns
subDropdowns.forEach(subDropdown=>{
    // Add click event
    subDropdown.addEventListener('click', (e)=>{
        // Toggle sub dropdown menu show class
        subDropdown.nextElementSibling.classList.toggle('sub-menu-show');
        // Toggle icon rotated class
        subDropdown.lastElementChild.classList.toggle('icon-rotated');
    });
});


// disabling inspect element
document.addEventListener("contextmenu", function(e){
    e.preventDefault(); //this prevents right click
});
document.onkeydown=function(e){
    if(event.keycode==123){
        return false;
    }
    if(e.ctrlKey && e.shiftKey && e.keyCode=="I".charCodeAt(0)){
        return false;
    }
    if(e.ctrlKey && e.shiftKey && e.keyCode=="C".charCodeAt(0)){
        return false;
    }
    if(e.ctrlKey && e.shiftKey && e.keyCode=="J".charCodeAt(0)){
        return false;
    }
    if(e.ctrlKey && e.keyCode=="U".charCodeAt(0)){
        return false;
    }
    if(e.ctrlKey && e.keyCode=="S".charCodeAt(0)){
        return false;
    }
};