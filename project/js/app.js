let from = document.getElementById("from");
let to = document.getElementById("to");
let input = document.getElementById("input");
let result = document.getElementById("result");
let calc = document.getElementById("calc");
let tbody = document.getElementById("tbody");

function createOption(x,y,z){
    let o = document.createElement("option");
    let t = document.createTextNode(y);
    o.setAttribute("value",toNum(z))
    o.appendChild(t);
    x.appendChild(o);
}
for(x in data.rates){
    createOption(from,x,data.rates[x]);
    createOption(to,x,data.rates[x]);
};

function toNum(x){
    return Number(x.replace(",",""));
};

function createTr(x){
    let tr = document.createElement("tr");
    tr.classList = "animate__animated animate__backInUp";
    x.map(function(el,index){
        let td = document.createElement("td");
        let content = document.createTextNode(el);
        td.appendChild(content);
        tr.appendChild(td);
    })
    tbody.appendChild(tr);
    
};

function save(){
    localStorage.setItem("record",tbody.innerHTML);
};



(function (){
    if(localStorage.getItem("record")){
        tbody.innerHTML = localStorage.getItem("record");
    }else{
        tbody.innerHTML = `<tr id="spacer"><td colspan="4">There is no Record!</td></tr>`
    }
        
})();

calc.addEventListener("submit",function(e){
    e.preventDefault();
    let x = input.value;
    let y = from.value;
    let z = to.value;
    
    let spacer = document.getElementById("spacer");
    if(spacer){
        spacer.remove();
    }
    let firstText =x+" "+from.options[from.selectedIndex].innerText;
    let secondText = to.options[to.selectedIndex].innerText;
    let first = x*y;
    let second = first/z;
    result = second.toFixed(2);
    let date = new Date().toDateString();

    let arr = [date,firstText,secondText,result];
    createTr(arr);
    save(arr);
    input.value = "";
    input.focus();
    from.value = "";
    to.value = "1";
});




