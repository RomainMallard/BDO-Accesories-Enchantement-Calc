document.addEventListener("DOMContentLoaded", function()      
{
    const fsInputs = document.querySelectorAll('.fs-input'); // take Base FS number
    fsInputs.forEach(input => 
    {
        input.addEventListener('input', fetchDataAndCalculate);// Call API for prices and calculate cafted prices + display
    });

    const dropdown = document.getElementById('dropdown');
    dropdown.addEventListener('change', fetchDataAndCalculate);
    

    createItemsSelectionDropdown();
    calculateChances();
   


}); // End of event listening call

//    vvvvv Creating an array of the item Id + Name,  (id to use in the API, reused for image ID later)
const ItemArray = ["11630-Laytenn's Necklace","11834-Narc earring", "12031-Crescent Ring", "11828-Tungrad Earring", "12237-Tungrad Belt" ,"11629-Tungrad Necklace", "12061-Tungrad Ring", "12042-Ronaros Ring", "12060-Ruins Ring", "11607-Ogre Necklace", "11853-Black Distortion", "12230-Basilik Belt", "12236-Valtara Eclipsed Belt"]

ItemArray.sort((a, b) => { //sort by alphabetical order
    const textA = a.split('-')[1];
    const textB = b.split('-')[1];
    return textA.localeCompare(textB);
});

 // Function to create and populate the dropdown from the ItemArray
function createItemsSelectionDropdown() 
{

  const dropdown = document.getElementById("dropdown"); // Select already created dropdown
    
  ItemArray.forEach(ItemArray => 
  {
      const [value, textContent] = ItemArray.split('-'); // Processing the Item Array
      const ItemOption = document.createElement("option");
      ItemOption.value = value;
      ItemOption.textContent = textContent;
      dropdown.appendChild(ItemOption);                     // add item to dropdown
  });
 
  dropdown.addEventListener("change", function() {   //debug Dropdown ID value
        selectedValue = parseInt(this.value); // "this" allow targetting of the valure of the DD through the event listener
        console.log( "int ID" + selectedValue);
  }); 
}


let PRIupgradePersent;
let DUOupgradePersent;
let TRIupgradePersent;
let TETupgradePersent;
let PENupgradePersent;


function calculateChances() {//Global Chance claculation function
  PRIupgradeChance();
  DUOupgradeChance();
  TRIupgradeChance();
  TETupgradeChance();
  PENupgradeChance();
}
//  |||||||
//  vvvvvvv ALL LEVEL UPGRADE CHANCES

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


async function fetchDataAndCalculate() { // Fun to Fetch from the markeplaace API and calculate crafted price
    
  

    try {
      const averagePrices = [];   // init prices off the 6 level of enchantment
      // Get the selected value from the dropdown menu
      const dropdown = document.getElementById('dropdown');
      const DropdownValue = dropdown.value;
  
      // Get the tableElement
      const table = document.getElementById('EhanceTableId');
  
      // Initialize an array to store promises for each row
      const fetchPromises = [];
  
      // Loop through each row in the table
      for (let i = 1; i < table.rows.length; i++) {
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

  

// calculate chances and prices , on window load
window.onload = function()
{
    calculateChances();  
    fetchDataAndCalculate()   
};
    

 

