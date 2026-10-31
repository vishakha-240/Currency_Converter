const BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";


const dropdowns=document.querySelectorAll(".dropdown select");// 2 dropdowns that we have from and to 
const btn=document.querySelector("button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");

// for(code in countryList)
// {
//     console.log(code , countryList[code]);
// }



for(let select of dropdowns)// 1.From    2.To
{
     for(currCode in countryList)// in code.js
     {
        let newOption=document.createElement("option");
        newOption.innerText= currCode;
        newOption.value=currCode;
        if(select.name==="from" && currCode==="USD"){
            newOption.selected="selected";
        }

        else if(select.name==="to" && currCode==="INR")
        {
            newOption.selected="selected";
        }
        select.append(newOption);
     }
     // which option is being selected need to maintain the track of it
     // change is an event  for dropdowns(when the value of an element changes )
     // .target means the thing that caused an event 
    // jb bhi humara select change ho uss case me hum update flag ko call lgayenge

     select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
        
     });
}
const updateExchangeRate = async()=>{
    let amount=document.querySelector(".amount input"); // amount class input child
     let amtVal = amount.value;
     if(amtVal==="" || amtVal< 1)
     {
        amtVal=1;
        amount.value="1";
     }
    
//    console.log(fromCurr.value , toCurr.value );
   const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;// toLowerCASE CAUSE apis are usually in lowecase
 
   let response= await fetch(URL); 
   let data=await response.json(); // convert json in object
 
   let from=data[fromCurr.value.toLowerCase()];
   let rate=from[toCurr.value.toLowerCase()];
   

   let finalamt= amtVal * rate;
  

   msg.innerText = `${amtVal} ${fromCurr.value} = ${finalamt} ${toCurr.value}`
};



const updateFlag=(element)=>{
    let currCode=element.value;// TARGET.VALUE (Value of what caused the event to change )
    // console.log(currCode);
    let countryCode=countryList[currCode];// currencyCode=INR && countryCode=IN

    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    

    //In JavaScript, the parentElement property returns the immediate parent element of a specified DOM node.
    let img=element.parentElement.querySelector("img");// element=select parent=select-container select-container=img and change the img src
     img.src=newSrc;
} 




btn.addEventListener("click",(evt)=>{
     evt.preventDefault();
     // whwenever form is submiited it has some default behaviour like refreshing the page and all this prevents from such changes
     updateExchangeRate();
    
});

window.addEventListener("load",()=>{// load krte time bhi msg updated rhe
    updateExchangeRate();
});

     
