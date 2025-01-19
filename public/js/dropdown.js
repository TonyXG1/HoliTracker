function selectCountry(element){
    const selectedValue = element.value;
    const selectedCountryInput = document.getElementById("selectedCountry");
    selectedCountryInput.value = selectedValue;

    const dropdownButton = document.getElementById("dropdownMenuButton");
    dropdownButton.innerHTML = `<i class="fa-solid fa-earth-europe"></i> ${element.textContent}`;

    const dropDownItems = document.querySelectorAll(".dropdown-item");
    dropDownItems.forEach(item => item.classList.remove("active"));

    element.classList.add('active')
}