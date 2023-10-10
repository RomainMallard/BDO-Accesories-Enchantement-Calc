document.addEventListener("DOMContentLoaded", function()
{
    const fsInputs = document.querySelectorAll('.fs-input');
    fsInputs.forEach(input => 
    {
        input.addEventListener('input', fetchDataAndCalculate);
    });

    const dropdown = document.getElementById('dropdown');
    dropdown.addEventListener('change', fetchDataAndCalculate);
    //dropdown.addEventListener('change', handleDropdownChange );

    createItemsSelectionDropdown();
    calculateChances();
   
    // ...other event listeners...

     // Call the initial functions

}); // End of event listening call

const optionArray = ["11630-Laytenn's Necklace","11834-Narc earring", "12237-Tungrad Belt", "12031-Crescent Ring", "11828-Tungrad Earring", "12237-Tungrad Belt" ,"11629-Tungrad Necklace", "12061-Tungrad Ring", "12042-Ronaros Ring", "12060-Ruins Ring", "11607-Ogre Necklace", "11853-Black Distortion", "12230-Basilik Belt", "12236-Valtara Eclipsed Belt"]
optionArray.sort((a, b) => {
    const textA = a.split('-')[1];
    const textB = b.split('-')[1];
    return textA.localeCompare(textB);
});

 // Function to create and populate the dropdown from the array
function createItemsSelectionDropdown() {

const dropdown = document.getElementById("dropdown"); // Select already created dropdown
    
    optionArray.forEach(optionString => {
        const [value, textContent] = optionString.split('-');
        const option = document.createElement("option");
        option.value = value;
        option.textContent = textContent;
        
                    // TRYING TO MAKE IMAGE
                    //const paddedValue = value.padStart(8,'0'); // Add leading zeros if necessary
                    //const imgLink = `BDO_ITEMS/${paddedValue}.jpeg`; // Replace 'path_to_your_images' with your actual image folder path
                    //const itemImageElement = document.getElementById("itemImageElem");
                    ////img.alt = textContent; // Add alt text for accessibility
                    //const existingImgContent = itemImageElement.querySelector("img");
                    //existingImgContent.src = imgLink;
        
       // img.alt = textContent; // Add alt text for accessibility

        dropdown.appendChild(option);       
        //console.log("Acces name :" + option.textContent)
        //console.log("Acces ID :" + option.value)
   
    });
 
    dropdown.addEventListener("change", function() {
        selectedValue = parseInt(this.value);
        console.log( "int ID" + selectedValue);
    }); 
}
dropdown.addEventListener("change", function() {
    selectedValue = parseInt(this.value);
console.log( "int ID_outside" + selectedValue)});

let PRIupgradePersent;
let DUOupgradePersent;
let TRIupgradePersent;
let TETupgradePersent;
let PENupgradePersent;


function calculateChances() {
  PRIupgradeChance();
  DUOupgradeChance();
  TRIupgradeChance();
  TETupgradeChance();
  PENupgradeChance();
}

//ALL LEVEL UPGRADE CHANCES

function PRIupgradeChance() {
  let PRIupgradePersent;
  let PRIFS;
  PRIFS = (document.getElementById("UserPRIFS").value)

  if (PRIFS <= 18) {

      PRIupgradePersent = 20 + (PRIFS * 2.5)


  } else {
      PRIupgradePersent = 25 + (18 * 2.5) + ((PRIFS - 18) * 0.5)
  }


  let PRIupgradeChanceElement = document.getElementById("PRIUPchance")
  PRIupgradeChanceElement.textContent = PRIupgradePersent
} 
function DUOupgradeChance() {
  let DUOupgradePersent;
  let DUOFS;
  DUOFS = (document.getElementById("UserDUOFS").value)

  if (DUOFS <= 40) {

      DUOupgradePersent = 10 + (DUOFS * 1)


  } else {
      DUOupgradePersent = 50 + ((DUOFS - 40) * 0.2)
  }


  let DUOupgradeChanceElement = document.getElementById("DUOUPchance")
  DUOupgradeChanceElement.textContent = DUOupgradePersent

} 
function TRIupgradeChance() {
  let TRIupgradePersent;
  let TRIFS;
  TRIFS = (document.getElementById("UserTRIFS").value)

  if (TRIFS <= 44) {

      TRIupgradePersent = 7.5 + (TRIFS * .75)


  } else {
      TRIupgradePersent = 40.5 + ((TRIFS - 40) * .15)
  }


  let TRIupgradeChanceElement = document.getElementById("TRIUPchance")
  TRIupgradeChanceElement.textContent = TRIupgradePersent

}  
function TETupgradeChance() {
  let TETupgradePersent;
  let TETFS;
  TETFS = (document.getElementById("UserTETFS").value)

  if (TETFS <= 44) {

      TETupgradePersent = 2.5 + (TETFS * .25)


  } else {
      TETupgradePersent = 30 + ((TETFS - 110) * .05)
  }


  let TETupgradeChanceElement = document.getElementById("TETUPchance")
  TETupgradeChanceElement.textContent = TETupgradePersent

}    
function PENupgradeChance() {
  let PENupgradePersent;
  let PENFS;
  PENFS = (document.getElementById("UserPENFS").value)



  PENupgradePersent = .5 + (PENFS * .05)






  let PENupgradeChanceElement = document.getElementById("PENUPchance")
  PENupgradeChanceElement.textContent = PENupgradePersent

}


async function fetchDataAndCalculate() {
    
    const averagePrices = [];

    try {
      // Get the selected value from the dropdown menu
      const dropdown = document.getElementById('dropdown');
      const DropdownValue = dropdown.value;
  
      // Get the table
      const table = document.getElementById('yourTableId');
  
      // Initialize an array to store promises for each row
      const fetchPromises = [];
  
      // Loop through each row in the table
      for (let i = 0; i < table.rows.length; i++) {
        const RowNumber = i; // This is the row number
  
        // Create the API URL for this row
        const apiUrl = `https://api.arsha.io/v1/eu/history?id=${DropdownValue}&sid=${RowNumber}`;
  
        // Fetch data from the API
        const response = await fetch(apiUrl);
        const data = await response.json();
  
        // Process the result into AveragePrice
        const resultData = data.resultMsg.split("-");
        const allValues = resultData.map(value => parseFloat(value));
        const sum = allValues.reduce((total, value) => total + value, 0);
        const AveragePrice = parseInt(sum / allValues.length);
        averagePrices.push(AveragePrice);       
  
        // Get the CraftingCoef from the 3rd TD in the current row
        const craftingCoef = parseFloat(table.rows[i].cells[2].textContent);
        const craftingCost = (averagePrices[i-1] + averagePrices[0]) * (1 / (craftingCoef/100));
        // Calculate CraftingCost
       
  
        // Update the 4th and 5th TD in the current row with AveragePrice and CraftingCost
        table.rows[i].cells[3].textContent = parseInt(AveragePrice);
        table.rows[i].cells[4].textContent = parseInt(craftingCost);


        //TRYING TO MAKE IMAGE
        const paddedValue = DropdownValue.padStart(8,'0'); // Add leading zeros if necessary
        const imgLink = `BDO_ITEMS/${paddedValue}.jpeg`; // Replace 'path_to_your_images' wi
        const itemImageElement = document.getElementById("itemImageElem");
        //img.alt = textContent; // Add alt text for accessibility
        const existingImgContent = itemImageElement.querySelector("img");
        existingImgContent.src = imgLink;

      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }
  //Add event listenenet on FS entry
window.onload = function(){

    calculateChances();
    document.getElementById("UserPRIFS").addEventListener("input", calculateChances);
    document.getElementById("UserDUOFS").addEventListener("input", calculateChances);
    document.getElementById("UserTRIFS").addEventListener("input", calculateChances);
    document.getElementById("UserTETFS").addEventListener("input", calculateChances);
    document.getElementById("UserPENFS").addEventListener("input", calculateChances);
    
    fetchDataAndCalculate();
    
    };
    
document.getElementById("dropdown");
  // Call the function when needed, perhaps when a button is clicked
  // Example:
 //const button = document.getElementById('CALCULUS');
 //button.addEventListener('click', fetchDataAndCalculate);

  
 

