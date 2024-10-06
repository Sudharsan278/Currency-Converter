const BASE_URL ="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";



const dropDownSelect = document.querySelectorAll('.dropdown select');
const button = document.querySelector(" form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select")
const msg = document.querySelector(".finalMessage");

window.addEventListener('load',()=>{
    updateExchangeRate();
})


for(let select of dropDownSelect){
    for(currCode in countryList){
        
        let newOption = document.createElement('option');
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name==="from" && currCode==="USD"){
            newOption.selected = "selected";
        }if(select.name==="to" && currCode === "INR"){
            newOption.selected="selected"; 
        }
        select.append(newOption);
    }
    select.addEventListener('change', (event) => {
        updateFlag(event.target);
    })
}


const updateFlag = (element) => {
   let currCode = element.value;
   let countryCode = countryList[currCode];
   let src = `https://flagsapi.com/${countryCode}/flat/64.png`;
   let img = element.parentElement.querySelector("img");
   img.src = src;
}


button.addEventListener('click', (event) => {
    event.preventDefault();
    updateExchangeRate()
})

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
      amtVal = 1;
      amount.value = "1";
    }
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;

    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value} `
}