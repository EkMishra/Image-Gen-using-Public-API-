let dynamicText = document.querySelector("span");
let cursor = document.querySelector("#cursor")

const words=["Random","Search","Have Fun"];

let wordindex=0;
let charindex = 1;
let isDeleting = false;

let type = ()=>{
    let currentword = words[wordindex];
    let currentchar = currentword.substring(0  ,charindex);
    dynamicText.textContent=currentchar;
    dynamicText.classList.add("stop-blinking");
    cursor.classList.add("stop-blinking");
    if(!isDeleting && charindex < currentword.length){
        charindex++;
        console.log(charindex)
        setTimeout(type,200);
    }
    else if (isDeleting && charindex>0){
        charindex -- ;
        setTimeout(type,200);
    }
    else{
        isDeleting = !isDeleting;
        dynamicText.classList.remove("stop-blinking");
        cursor.classList.remove("stop-blinking");
        wordindex = isDeleting ? wordindex : (wordindex+1)%words.length;
        setTimeout(type,1200)
    }
}
type()
