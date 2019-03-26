

window.addEventListener('load',(event)=>{
    
    let btns = document.getElementsByTagName("button");

    Array.prototype.forEach.call(btns,(btn)=>{
        btn.addEventListener("click",performActions);
    });

});


const performActions = (event) =>{
    
    state = event.target.getAttribute("data-state");
    textElem = event.target.getElementsByTagName("span")[0];

    if(state == "off"){
        switchOnAction(event.target);
    }
    else if(state == "on"){
        switchOffAction(event.target);
    }

}

let count  = 0;

const switchOnAction = (elem) => {

    if(count<2){
        count++;
        elem.setAttribute("data-state","on");
        elem.getElementsByTagName("span")[0].innerText = "Off";

        classToGet = `switch-${elem.getAttribute("data-switch")}`;

        classesForSetAttr = `transform:translateY(-25%) skewX(0deg);`;

        if(classToGet == "switch-1" || classToGet == "switch-2"){
            classesForSetAttr += "left:0";
        }
        else if(classToGet == "switch-3" || classToGet == "switch-4"){
            classesForSetAttr += "right:0;";
        }

        let switchElem = document.getElementsByClassName(classToGet)[0];

        switchElem.setAttribute("style",classesForSetAttr);

        if(count == 2){
            
            let switches = document.getElementsByClassName("switch");
            let onSwitches = [];

            Array.prototype.forEach.call(switches,(swtch)=>{
                if(swtch.hasAttribute("style")){
                    onSwitches.push(swtch);
                }
            });

            let classesOfSwitch  = `${onSwitches[0].classList[1]} ${onSwitches[1].classList[1]}`;

            let motor = document.getElementsByClassName("motor")[0];

            if(classesOfSwitch == "switch-1 switch-4" || classesOfSwitch == "switch-4 switch-1"){
                motor.setAttribute("style","animation-name:clockWiseRotate");
            }
            else if (classesOfSwitch == "switch-2 switch-3" || classesOfSwitch == "switch-3 switch-2"){
                motor.setAttribute("style","animation-name:antiClockWiseRotate");
            }
            else if(classesOfSwitch == "switch-1 switch-2" || classesOfSwitch == "switch-2 switch-1" || 
            classesOfSwitch == "switch-3 switch-4" || classesOfSwitch == "switch-4 switch-3"){
                alert("Oh Damn! it a short circuit");
            }
            else{
                alert("No Actions will be performed");
            }

        }
        
    }
    else{
        alert("You can turn On Two Switches at a time only");
    }
}


const switchOffAction = (elem) => {

    if(count == 2){
        
        let motorElem = document.getElementsByClassName("motor")[0];

        if(motorElem.hasAttribute("style")){
            motorElem.removeAttribute("style");
        }

    }

    if(count>0){
        
        count--;

        elem.setAttribute("data-state","off");
        elem.getElementsByTagName("span")[0].innerText = "On";

        classToGet = `switch-${elem.getAttribute("data-switch")}`;

        let switchElem = document.getElementsByClassName(classToGet)[0];

        if(switchElem.hasAttribute("style")){
            switchElem.removeAttribute("style");
        }

    }
}
