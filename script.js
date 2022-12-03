const ipVal = document.querySelector(".ip")
const btnSave = document.querySelector(".btn")
const selectedP = document.querySelector(".sel")
const listDisp = document.querySelector(".disp")

const hBtn = document.querySelector(".hPBtn")
const mBtn = document.querySelector(".mPBtn")
const lBtn = document.querySelector(".lPBtn")
const pWiseTodoDisp = document.querySelector(".pWiseDisp")

var buttonB = document.querySelector('.button');
var inputName = document.querySelector('.inputName');
var inputCName = document.querySelector('.inputCName');

var temp = document.querySelector('.temp');
var cityName = document.querySelector('.cityName');
var desc = document.querySelector('.desc');

buttonB.addEventListener('click',()=>{
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputName.value+'&appid=170923d2b84739964608df35317d3311')
.then(response=>response.json()).then(data=>{
    const Cnameval= data['name'];
    const tempval= data['main']['temp'];
    const descval= data['weather'][0]['description'];
    
    cityName.textContent= Cnameval;
    temp.textContent=parseFloat(tempval-273).toFixed(1)+' \xB0 C';
    desc.textContent= descval;
})
})


//page render at start
function render(){
    let getFullStorage = localStorage.getItem("full");
    if (getFullStorage == null) return
    else{
            fArr = JSON.parse(getFullStorage);
        }
        listDisp.innerHTML=""
        fArr.forEach((element,index) => {
            let newLi = document.createElement("li")
            newLi.innerHTML =`<li class="${element.priorityVal}">&nbsp; ${element.todoName} <span><button class="del" onclick="delTodo(${index})">del</button></span></li>`
            listDisp.append(newLi)
        });

}

render()



selectedVal1 = "not selected"
//getting the selected priority 
selectedP.addEventListener("change", e=>{
    let selectedVal = selectedP.options[selectedP.selectedIndex].text
    connectingFunc(selectedVal)
    
    
})


function connectingFunc(arg){

selectedVal1 = arg
}

//function to save input data
function storingData() {
    let userVal =ipVal.value
    let selectedPVal = selectedVal1
    ipVal.value = ""
    selectedP.selectedIndex = 0
    if(userVal.trim() == "" || userVal == null) return
    else if(selectedPVal=="not selected") return
    else if (!isNaN(userVal))
    {
       userVal = userVal.toString()
    }

    let fullObj = {
        todoName:userVal,
        priorityVal:selectedPVal
    };


    let getPhighStorage = localStorage.getItem("pHigh");
    let getPmedStorage = localStorage.getItem("pMid");
    let getPlowStorage = localStorage.getItem("pLow");
    let getFullStorage = localStorage.getItem("full");

    if (getFullStorage == null){
        fArr = [];
        }
    else{
            fArr = JSON.parse(getFullStorage);
            let exists = fArr.some(e=>{
                return e.todoName == userVal
            })
            if(exists){
                alert("task already exists")
                return
            }
        }
    fArr.push(fullObj)
    localStorage.setItem("full", JSON.stringify(fArr));

    if(selectedPVal==="highPriority"){
        if (getPhighStorage == null){
        hArr = [];
        }
        else{
            hArr = JSON.parse(getPhighStorage);
        }
        hArr.push(userVal)
        localStorage.setItem("pHigh", JSON.stringify(hArr));
        Display(selectedPVal)
        hBtnAction()
    }
    else if(selectedPVal==="midPriority"){
        if (getPmedStorage == null){
        mArr = [];
        }
        else{
            mArr = JSON.parse(getPmedStorage);
        }
        mArr.push(userVal)
        localStorage.setItem("pMid", JSON.stringify(mArr));
        Display(selectedPVal)
        mBtnAction()
    }
    
    else {
        if (getPlowStorage == null){
        lArr = [];
        }
        else{
            lArr = JSON.parse(getPlowStorage);
        }
        lArr.push(userVal)
        localStorage.setItem("pLow", JSON.stringify(lArr));
        Display(selectedPVal)
        lBtnAction()
        }
    selectedVal1="not selected"
}
//event listener for save button
btnSave.addEventListener( "click" ,storingData)

function btnAnimation(){
    btnSave.classList.add("saved")
    setTimeout(function(){
        btnSave.classList.remove("saved")
    },400)
    }
btnSave.addEventListener( "click" ,btnAnimation)

//displaying all the todo's in order of entry
function Display(arg1){
    let selectedPVal = arg1

    let getPhighStorage = localStorage.getItem("pHigh");
    let getPmedStorage = localStorage.getItem("pMid");
    let getPlowStorage = localStorage.getItem("pLow");

    if(selectedPVal=== "highPriority"){
        if (getPhighStorage == null){
        hArr = [];
        }
        else{
            hArr = JSON.parse(getPhighStorage);
        }
        let newLi = document.createElement("li")
        hArr.forEach((element,index) => {
            newLi.innerHTML =`<li class="highPriority">&nbsp;${element} <span><button class="del" onclick="delTodoH(${index})">del</button></span></li>`
        });
        listDisp.append(newLi)
        
        
    }
    else if(selectedPVal==="midPriority"){
        if (getPmedStorage == null){
        mArr = [];
        }
        else{
            mArr = JSON.parse(getPmedStorage);
        }
        let newLi = document.createElement("li")
        mArr.forEach((element,index) => {
            newLi.innerHTML =`<li class="midPriority">&nbsp;${element} <span><button class="del" onclick="delTodoM(${index})">del</button></span></li>`
        });
        listDisp.append(newLi)
        
    }
    else {
        if (getPlowStorage == null){
        lArr = [];
        }
        else{
            lArr = JSON.parse(getPlowStorage);
        }
        let newLi = document.createElement("li")
        lArr.forEach((element,index) => {
            newLi.innerHTML =`<li class="lowPriority">&nbsp;${element} <span><button class="del" onclick="delTodoL(${index})">del</button></span></li>`
        });
        listDisp.append(newLi)
        
    }
}


//displaying todo's according to the priority selected
function hBtnAction(){
pWiseTodoDisp.innerHTML = " "
let getPhighStorage = localStorage.getItem("pHigh");
if (getPhighStorage == null) return
else{
        hArr = JSON.parse(getPhighStorage);
    }
    let newLi = " "
    hArr.forEach((element,index) => {
        newLi += `<li class="highPriority">&nbsp;${element} <span><button class="del" onclick="delTodoH( ${index} )">del</button></span></li>`
    });
    pWiseTodoDisp.innerHTML = newLi
}

hBtn.addEventListener("click",hBtnAction)

function mBtnAction() {
    pWiseTodoDisp.innerHTML = " "
    let getPmedStorage = localStorage.getItem("pMid");
    if (getPmedStorage == null) return
    else{
            mArr = JSON.parse(getPmedStorage);
        }
        let newLi = " "
        mArr.forEach((element,index) => {
            newLi += `<li class="midPriority">&nbsp;${element} <span><button class="del" onclick="delTodoM(${index})">del</button></span></li>`
        });
        pWiseTodoDisp.innerHTML = newLi
    }

mBtn.addEventListener("click",mBtnAction)

function lBtnAction() {
        pWiseTodoDisp.innerHTML = " "
        let getPlowStorage = localStorage.getItem("pLow");
        if (getPlowStorage == null) return
        else{
                lArr = JSON.parse(getPlowStorage);
            }
            let newLi = " ";
            lArr.forEach((element,index) => {
                newLi += `<li class="lowPriority">&nbsp;${element} <span><button class="del" onclick="delTodoL(${index})">del</button></span></li>`
            });
            pWiseTodoDisp.innerHTML = newLi;
        }

lBtn.addEventListener("click",lBtnAction)

//deleting todo's from priority arrays and consecutively from full array
function delTodoH(indx){
    let getPhighStorage = localStorage.getItem("pHigh");
    hArr = JSON.parse(getPhighStorage);
    let todoLName = hArr[indx]
    hArr.splice(indx,1);
    localStorage.setItem("pHigh", JSON.stringify(hArr));
    hBtnAction()
    
    let getFullStorage = localStorage.getItem("full");
    fArr = JSON.parse(getFullStorage);
    let fArrIndx = fArr.findIndex(e=>{
    if(e.todoName==todoLName && e.priorityVal=="highPriority") 
    return true
    }) 
    if(fArrIndx>-1){
    delTodo(fArrIndx)}
}

function delTodoM(indx){
    let getPmedStorage = localStorage.getItem("pMid");
    mArr = JSON.parse(getPmedStorage);
    let todoLName = mArr[indx]
    mArr.splice(indx,1);
    localStorage.setItem("pMid", JSON.stringify(mArr));
    mBtnAction()

    let getFullStorage = localStorage.getItem("full");
    fArr = JSON.parse(getFullStorage);
    let fArrIndx = fArr.findIndex(e=>{
    if(e.todoName==todoLName && e.priorityVal=="midPriority") 
    return true
    }) 
    if(fArrIndx>-1){
    delTodo(fArrIndx)}
}

function delTodoL(indx){
    let getPlowStorage = localStorage.getItem("pLow");
    lArr = JSON.parse(getPlowStorage);
    let todoLName = lArr[indx]
    lArr.splice(indx,1);
    localStorage.setItem("pLow", JSON.stringify(lArr));
    lBtnAction()

    let getFullStorage = localStorage.getItem("full");
    fArr = JSON.parse(getFullStorage);
    let fArrIndx = fArr.findIndex(e=>{
    if(e.todoName==todoLName && e.priorityVal=="lowPriority") 
    return true
    }) 
    if(fArrIndx>-1){
    delTodo(fArrIndx)}
}

//deleting todo's from full array and consecutively from priority arrays
function delTodo(indx){
    let getFullStorage = localStorage.getItem("full");
    fArr = JSON.parse(getFullStorage);  
    let todoLName = fArr[indx].todoName
    let todoLPr = fArr[indx].priorityVal
    fArr.splice(indx,1);
    localStorage.setItem("full", JSON.stringify(fArr));
    
    if(todoLPr == "highPriority"){
        let getPhighStorage = localStorage.getItem("pHigh");
        hArr = JSON.parse(getPhighStorage);
        let pArrIndex = hArr.indexOf(todoLName)
        if(pArrIndex > -1){
        delTodoH(pArrIndex)
        }
    }
    else if (todoLPr == "midPriority"){
        let getPmedStorage = localStorage.getItem("pMid");
        mArr = JSON.parse(getPmedStorage);
        let pArrIndex = mArr.indexOf(todoLName)
        if(pArrIndex > -1){
        delTodoM(pArrIndex)
        }
    }
    else{
        let getPlowStorage = localStorage.getItem("pLow");
        lArr = JSON.parse(getPlowStorage);
        let pArrIndex = lArr.indexOf(todoLName)
        if(pArrIndex > -1){
        delTodoL(pArrIndex)
        }
    }

    render()
}