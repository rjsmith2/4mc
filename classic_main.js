var vidgetObjects={};
vidget={};
var socketerCounter=0;
var socketer=function(){};
socketer.consoleSocket=null;
doFunction={};
mainBackgroundCanvasContainer=document.createElement("div");
SecondaryOffThread=[];
mainBackgroundCanvasContainer.className="mainBackgroundCanvas";
socketer.socket=function(){
	return;//not supported in mc4 (no nodejs support!)
	console.log("Socketing...")
    var consoleSocket = new WebSocket("ws://andrei-rocko.rhcloud.com:8000/index.html");
    consoleSocket.socketer=this;
    consoleSocket.onopen=function(){
    }
    consoleSocket.onclose=function(){
	   	setTimeout(function(){
			socket=socketer.socket();
		},500);
    }
    consoleSocket.onmessage=function(eve){
    	var json=JSON.parse(eve.data);
    	if(json.id)this.arrFunct[json.id](json["data"]);
    	else if(doFunction[json.command])doFunction[json.command](json);
     }
    consoleSocket.onerror=function(eve){
    	console.log("socket error main");
    }
    consoleSocket.arrFunct=[];
	consoleSocket.sendListen=function(data,callBack){
		data["idc"]=++socketerCounter;
		this.arrFunct[socketerCounter]=callBack;
		this.send(JSON.stringify(data));
	}
    socketer.consoleSocket=consoleSocket;
    
    return consoleSocket;
}

startup=function(){}
startup.activate=function(){
	document.body.appendChild(mainBackgroundCanvasContainer);
	runVidgetAPIThread();
	vidgetContainer=document.createElement("div");
	var vidgetParent=document.createElement("div");
	var vidgetContainerConfig=document.createElement("div");
	vidgetContainer.setAttribute("style","");
	vidgetContainer.className="vidgetScreen";
	
	var loginError=document.createElement("div");
	loginError.textContent="";
	loginError.className="loginError";
	//vidgetContainer.src="img/icons/whitePack.png";
	login=vidgetContainer.cloneNode();
	
	login.className='loginBox';
	var register=login.cloneNode();
	//register.style.display="none";

	signIn=document.createElement("a");
	signIn.textContent=" Log in";
	signIn.eleTo=login;
	signIn.eleFrom=register;
	register.setAttribute("data-hidden",1);
	signIn.onclick=function(){
		var parentEle=this.eleTo;
		parentEle.style.marginTop="";
		this.eleFrom.style.opacity=0;
		this.eleFrom.setAttribute("data-hidden",1);
	}
	signIn.setAttribute("style","background-color:rgb(10,130,225);padding:15px;border-top-right-radius:15px;border-bottom-right-radius:35px;cursor:pointer;color:lightblue;display:inline-block;margin-bottom:5px");
	register.appendChild(signIn);
	registerButton=document.createElement("button");
	
	
	var newAccName=selfDescriptiveInputText("Minecraft Name");
	newAccName.className="registerInputField";
	register.appendChild(newAccName);
	registerButton.newAccName=newAccName;
	
	var newPassword=selfDescriptiveInputText("Password","password");
	newPassword.className="registerInputField";
	register.appendChild(newPassword);
	registerButton.password=newPassword;

	registerButton.textContent="Register";
	registerButton.className="registerButton";
	
	
	register.appendChild(registerButton);
	
	//document.body.appendChild(vidgetContainer);
	document.body.appendChild(login);
	document.body.appendChild(register);
	
	mineLogo=document.createElement("canvas");
	mineLogo.height="80";
	loadingimgCtx=mineLogo.getContext("2d");
	loadingimgCtx.fillText("MineCanvas 4 mini-console:",11,11);
	mineLogo.ondblclick=function(){localStorage.clear();location.reload();loadingimgCtx.fillText("Cleared LocalStorage!",27,60);}
	mineLogo.style.padding="5px";
	mineLogo.style.border="1px solid black";
	login.appendChild(mineLogo);
	registerLink=document.createElement("a");
	registerLink.textContent=" Register";
	registerLink.eleTo=login;
	registerLink.eleFrom=register;
	registerLink.onclick=function(){
		var parentEle=this.eleTo;
		parentEle.style.marginTop=(parentEle.offsetHeight*-1 -15)+"px";
		this.eleFrom.style.opacity=1;
		this.eleFrom.setAttribute("data-hidden",0);
	}
	registerLink.setAttribute("style","float:right; background-color:rgb(10,130,225);padding:15px;border-top-left-radius:15px;border-bottom-left-radius:35px;cursor:pointer;color:lightblue;");
	login.appendChild(registerLink);
		var usernameLoginContainer=document.createElement("input");
		usernameLoginContainer.className="hiddenInputText";
		usernameLoginContainer.canvasHole=document.createElement("canvas");
		usernameLoginContainer.canvasHole.parentEle=usernameLoginContainer;
		usernameLoginContainer.canvasHole.className='canvasInputText';
		usernameLoginContainer.canvasHole.makeHole=makeHole;
		usernameLoginContainer.isDefaulted=true;
		usernameLoginContainer.revertify=function(){
			this.value="[Username]";
			this.canvasHole.makeHole(this.value);
		}
		usernameLoginContainer.revertify();
		if(localStorage["username"]){
		    usernameLoginContainer.value=localStorage["username"];
		    usernameLoginContainer.isDefaulted=false;
		}
		usernameLoginContainer.normalify=function(){
		}
		usernameLoginContainer.onchange=function(){
				this.normalify();
				this.isDefaulted=false;
		}
		usernameLoginContainer.onfocus=function(){
			if(this.isDefaulted)
				this.value="";
			this.canvasHole.setAttribute("data-focused",1);
		}
		
		usernameLoginContainer.onkeyup=usernameLoginContainer.onkeydown=usernameLoginContainer.onmouseup=usernameLoginContainer.oninput=function(){
			var sel = getInputSelection(usernameLoginContainer);
			usernameLoginContainer.canvasHole.start=sel.start;
			usernameLoginContainer.canvasHole.makeHole(this.value);
			
			
		}
		usernameLoginContainer.onblur=function(){
			
			this.canvasHole.setAttribute("data-focused",null);
			if(this.value===""){
				this.revertify(this.isDefaulted=true);					
			}
			usernameLoginContainer.canvasHole.start=-5;
			usernameLoginContainer.canvasHole.makeHole(this.value);
			
			
		}
		login.appendChild(usernameLoginContainer.canvasHole);
		login.appendChild(usernameLoginContainer);

		var textBox = document.getElementById("textBoxId");
		usernameLoginContainer.onselect=usernameLoginContainer.onselectionchange=function(eve){
			var test = getInputSelection(usernameLoginContainer);
		};

		var usernamePasswordContainer=usernameLoginContainer.cloneNode();
		usernamePasswordContainer.isDefaulted=true;
		usernamePasswordContainer.type="password";
		usernamePasswordContainer.value="[Password]";
		usernamePasswordContainer.canvasHole=usernameLoginContainer.canvasHole.cloneNode();
		usernamePasswordContainer.canvasHole.parentEle=usernamePasswordContainer;
		login.appendChild(usernamePasswordContainer.canvasHole);
		login.appendChild(usernamePasswordContainer);
		usernamePasswordContainer.canvasHole.makeHole=makeHole
		usernamePasswordContainer.onkeyup=usernamePasswordContainer.onkeydown=usernamePasswordContainer.onmouseup=usernamePasswordContainer.oninput=function(e){
		    if (e&&e.keyCode == 13) {return imgLogin.onclick()}
			var sel = getInputSelection(usernamePasswordContainer);
			usernamePasswordContainer.canvasHole.start=sel.start;
			usernamePasswordContainer.canvasHole.makeHole(this.value.replace(/./g,"*"));
			
			
		}
       
		usernamePasswordContainer.onblur=function(){
			usernamePasswordContainer.canvasHole.start=-5;
			usernamePasswordContainer.canvasHole.makeHole(this.value.replace(/./g,"*"));
			if(this.value===""){
				this.revertify(this.isDefaulted=true);					
			}
			this.canvasHole.dataset.focused=null;
			
			
		}
		usernamePasswordContainer.revertify=function(){
			this.value="[Password]";
			this.canvasHole.makeHole(this.value);
		}
		usernamePasswordContainer.revertify();
		
		usernamePasswordContainer.normalify=function(){
		}
		usernamePasswordContainer.onchange=function(){
				this.normalify();
				this.isDefaulted=false;
		}
		usernamePasswordContainer.onfocus=function(){
			if(this.isDefaulted)
				this.value="";
			this.canvasHole.dataset.focused=1;
		}
		imgLogin=document.createElement("img");
		imgLogin.src="img/Xcode.png";
		imgLogin.className='imgLoginButton'
		login.appendChild(imgLogin);
		
		usernameLoginContainer.canvasHole.makeHole(usernameLoginContainer.value);
		
		 if(localStorage["password"]){
		    usernamePasswordContainer.value=localStorage["password"];
		    usernamePasswordContainer.onkeyup();
		    usernamePasswordContainer.isDefaulted=false;
		}
		else 
		    usernamePasswordContainer.canvasHole.makeHole(usernamePasswordContainer.value);

	imgLogin.error=loginError;
	imgLogin.pass=usernamePasswordContainer;
	imgLogin.user=usernameLoginContainer;
	progressBar=document.createElement("progress");
				progressBar.value=1;
				progressBar.className="progressBar";
				document.body.appendChild(progressBar);
				progressBar2=document.createElement("progress");
				progressBar2.style.top="45px";
				progressBar2.value=1;
				progressBar2.className="progressBar";
				document.body.appendChild(progressBar2);
				fieldset=document.createElement("fieldset");
				fieldset.setAttribute("style","position:fixed;top:90px;pointer-events:none;border:0px solid black;height:400px;");
				fieldset.style.top="90px";
				document.body.appendChild(fieldset);
	mainSecondaryThree=vidget.run(0,0,null,null,{type:"notificationBoard"});	
	SecondaryOffThread[0]=vidget.run(1,1,null,null,{type:"fieldset"});
	for(var i=2;i<=13;i++){
		SecondaryOffThread[i-1]=vidget.run(1,i,null,null,{type:"fieldset"});
	}
	imgLogin.onclick=function(){
		register.style.display="none";
		registerLink.onclick();
		//imgLogin.pass.value=JSON.parse(json["message"])["key"];
		setTimeout(function(){
			login.parentNode.removeChild(login);
			register.parentNode.removeChild(register);
			//jsonGetNewNotificationRequest();
			delete login;
			delete register;
			infoPanelThingy.style.display="";
		},200);
				
				
				for(var i=SecondaryOffThread.length;--i>=0;){
					SecondaryOffThread[i].thread.postMessage([1599,SecondaryOffThread[i].pID,0,["initializework",SecondaryOffThread.length-1,i-1]]);
				}
				
		if(usernamePasswordContainer.isDefaulted || usernameLoginContainer.isDefaulted){
			this.error.textContent="Please fill out your username and password";
		}
		else if(!navigator.onLine){
			this.error.textContent="Your browser is in offline mode. Can not connect to server";
		}
		else{
			this.error.textContent="";
			//send the login verification
			/*
			var xhr = new XMLHttpRequest();
			xhr.ele=this;
			xhr.onreadystatechange = function () {
				if (this.readyState == 4) {
				    var json=JSON.parse(this.response);
					(this.ele.error.textContent="");
					if(this.response.toString().indexOf('xdebug-error')!=-1){
						this.ele.error.textContent=("The server has encountered an error logging in. Try again later.");
					}else{
						if(json["success"]){
						        localStorage["username"]=imgLogin.user.value;
						        localStorage["password"]=imgLogin.pass.value;
						    register.style.display="none";
						    registerLink.onclick();
						    imgLogin.pass.value=JSON.parse(json["message"])["key"];
						    setTimeout(function(){
							login.parentNode.removeChild(login);
							register.parentNode.removeChild(register);
							jsonGetNewNotificationRequest();
							delete login;
							delete register;
							document.body.appendChild(vidgetContainer);
						    },500);
						}else{
						    	this.ele.error.textContent=(JSON.parse(json["message"])["error"]);
						}
					}
				}
			};

			xhr.open("POST", "../linker.php", true);
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
			xhr.timeout = 4000;
			xhr.ontimeout = function () { alert("Timed out!!!"); }
			*/
			var inputFields={command:"login",
			   data:JSON.stringify({
    				email:imgLogin.user.value,
			    	password:imgLogin.pass.value
		    	})
			   
			};
			socket.sendListen(inputFields,function(json){
				(this.error.textContent="");
				if(json["success"]){
				        localStorage["username"]=imgLogin.user.value;
				        localStorage["password"]=imgLogin.pass.value;
				    register.style.display="none";
				    registerLink.onclick();
				    setTimeout(function(){
						login.parentNode.removeChild(login);
						register.parentNode.removeChild(register);
						jsonGetNewNotificationRequest();
						delete login;
						delete register;
						document.body.appendChild(vidgetContainer);
						vidget.run(6,null,null,null,{type:"notificationBoard"});
						vidget.run(7);//friend app test
				    },500);
				}else if(json["message"]){
				    	this.error.textContent=(json["message"]);
				}
			
			}.bind(this));
		}
	}
	login.appendChild(loginError);
	
	var registerError=loginError.cloneNode();
	register.appendChild(registerError);
	
	registerButton.error=registerError;
	registerButton.onclick=function(){
		/*
		var xhr = new XMLHttpRequest();
			xhr.error=this.error;
			xhr.onreadystatechange = function () {
				if (this.readyState == 4) {
					var json=JSON.parse(this.response);
					(this.error.innerHTML="");
					if(!json["success"]){
					   	this.error.innerHTML+=JSON.parse(json["message"])["error"];
					}
					if(this.error.innerHTML==""){
						//registered...
						
					    imgLogin.user.value=registerButton.email.value;
			        	imgLogin.pass.value=registerButton.password.value;
			        	usernameLoginContainer.canvasHole.makeHole(registerButton.email.value);
	                	usernamePasswordContainer.canvasHole.makeHole("***************************");
			        	imgLogin.user.isDefaulted=false;
						imgLogin.pass.isDefaulted=false;
			        	signIn.onclick();
			        	imgLogin.onclick();
			        	
			        	
						
					}
					
					if(this.response.toString().indexOf('xdebug-error')!=-1){
						this.error.textContent=("The server has encountered an error logging in. Try again later.");
					}
				}
			};

			xhr.open("POST", "../linker.php", true);
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
			xhr.timeout = 4000;
			xhr.ontimeout = function () { alert("Timed out!!!"); }
			*/
			var inputFields={command:"register",
			   data:JSON.stringify({
    				firstName:this.username.value.split(" ")[0],
    				username:this.newAccName.value,
    				lastName:this.username.value.split(" ")[1],
    				email:this.email.value,
    				password:this.password.isDefaulted?"":this.password.value,
    				gender:"u",
    				birthday:"01/20/1983",//|this.birth.value,
		    	})
			   
			};
			socket.sendListen(inputFields,function(json){
					(this.error.innerHTML="");
					if(json["success"]==false && json["message"]){
					   	this.error.innerHTML+=json["message"]+" ";
					}
					if(this.error.innerHTML==""){
						//registered...
						
					    imgLogin.user.value=registerButton.email.value;
			        	imgLogin.pass.value=registerButton.password.value;
			        	usernameLoginContainer.canvasHole.makeHole(registerButton.email.value);
	                	usernamePasswordContainer.canvasHole.makeHole("***************************");
			        	imgLogin.user.isDefaulted=false;
						imgLogin.pass.isDefaulted=false;
			        	signIn.onclick();
			        	imgLogin.onclick();
					}
				
				
			}.bind(this));
			/*
			 var urlString="reg="+encodeURIComponent(JSON.stringify(inputFields));
			xhr.send(urlString);
			*/
	}
	
	infoPanelThingy=document.createElement("div");
	infoPanelThingy.className="infoPanelThingy"
	var infoPanelInnerBar=document.createElement("div");
	infoPanelInnerBar.className="infoPanelInnerBar";
	infoPanelInnerBar.signOut=document.createElement("span");
	infoPanelThingy.appendChild(infoPanelInnerBar);
	document.body.appendChild(infoPanelThingy);
	infoPanelThingy.style.display="none";
	
}

window.onload=startup.activate;

function generateUserLoginUI(){
	
}

function getInputSelection(el) { // Tim Down solution
    var start = 0, end = 0, normalizedValue, range,
        textInputRange, len, endRange;

    if (typeof el.selectionStart == "number" && typeof el.selectionEnd == "number") {
        start = el.selectionStart;
        end = el.selectionEnd;
    } else {
        range = document.selection.createRange();

        if (range && range.parentElement() == el) {
            len = el.value.length;
            normalizedValue = el.value.replace(/\r\n/g, "\n");

            // Create a working TextRange that lives only in the input
            textInputRange = el.createTextRange();
            textInputRange.moveToBookmark(range.getBookmark());

            // Check if the start and end of the selection are at the very end
            // of the input, since moveStart/moveEnd doesn't return what we want
            // in those cases
            endRange = el.createTextRange();
            endRange.collapse(false);

            if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
                start = end = len;
            } else {
                start = -textInputRange.moveStart("character", -len);
                start += normalizedValue.slice(0, start).split("\n").length - 1;

                if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
                    end = len;
                } else {
                    end = -textInputRange.moveEnd("character", -len);
                    end += normalizedValue.slice(0, end).split("\n").length - 1;
                }
            }
        }
    }

    return {
        start: start,
        end: end
    };
}

makeHole=function(str){
			this.width=this.parentEle.offsetWidth;
			this.height=this.parentEle.offsetHeight;
			var ctx=this.getContext("2d");
			ctx.font=((document.defaultView.getComputedStyle(this.parentEle,null).getPropertyValue('font-size')))+" "+document.defaultView.getComputedStyle(this.parentEle,null).getPropertyValue('font-family')
			ctx.fillStyle=document.defaultView.getComputedStyle(this,null).getPropertyValue('background-color');
			ctx.globalCompositeOperation="source-over";
			ctx.fillRect(0,0,this.width,this.height);
			ctx.globalCompositeOperation="destination-out";
			ctx.fillStyle="white";

			if(str){
				ctx.fillText(str,parseInt(document.defaultView.getComputedStyle(this.parentEle,null).getPropertyValue('padding-left')),this.height/1.4);
				ctx.fillStyle=document.defaultView.getComputedStyle(this,null).getPropertyValue('color');
				
				ctx.globalCompositeOperation="source-over";
				ctx.fillText(str,parseInt(document.defaultView.getComputedStyle(this.parentEle,null).getPropertyValue('padding-left')),this.height/1.4);
				ctx.strokeStyle=document.defaultView.getComputedStyle(this,null).getPropertyValue('outline-color');
				ctx.globalAlpha =1;
				ctx.strokeText(str,parseInt(document.defaultView.getComputedStyle(this.parentEle,null).getPropertyValue('padding-left')),this.height/1.4);
			}
			ctx.globalAlpha = 1;
			
			if(this.start<0)return;
			ctx.strokeStyle=document.defaultView.getComputedStyle(this,null).getPropertyValue('color');
			ctx.beginPath();
			var text=str.substring(0,this.start);
			var caretPos=ctx.measureText(text).width;
			ctx.moveTo(caretPos+3,2);
			ctx.lineTo(caretPos+3,parseInt((document.defaultView.getComputedStyle(this.parentEle,null).getPropertyValue('font-size')))*2);
			ctx.stroke();

		}
		
function makeFriendCard(){

}
 
function selfDescriptiveInputText(defaultText,type){
if(!type)type="text";
var input=document.createElement("input");
input.value=defaultText;
input.isDefaulted=true;
input.setAttribute("type",type);
input.defaultText=defaultText;
input.isPassword=false;
input.revertify=function(){
	this.setAttribute("style","color:gray;font-style: oblique ;");
	if(this.type=="password"){
		this.isPassword=true;
		this.type="text";
	}
	this.value=this.defaultText;
}
input.revertify();
input.normalify=function(){
	this.setAttribute("style","");	
	if(this.isPassword){
		this.isPassword=false;
		this.type="password";
	}
}
input.addEventListener("change",input.onchange=function(eve){
		this.normalify();
		this.isDefaulted=false;
		
}.bind(input), false);

input.addEventListener("blur",function(){
	if(this.value===""){
		this.revertify(this.isDefaulted=true);
	}
}.bind(input),false);
input.addEventListener("focus",function(){
	if(this.isDefaulted)
		this.value="";
}.bind(input),false);
input.onkeydown=input.oninput=input.onkeyup=input.onchange;
return input;
}

var currentVersion=1;
function runVidgetAPIThread(){

newScripter("apiMain.js",true).onload=function(){
		loadingimgCtx.fillText("apiMain.js +",27,40);
};

newScripter("three.min.js",true).onload=function(){
	newScripter("TrackballControls.js",true).onload=function(){
		newScripter("csg.js",true).onload=function(){;
		loadingimgCtx.fillText("csg.js + (threejs addon)",27,52);
			newScripter("threeMC.js").onload=function(){;			
				loadingimgCtx.fillText("threeMC.js + (Three.min.js [r69])",27,28);
			}
		};
	};	
};

}

function newScripter(url,cachable){
	var newScript=document.createElement("script");
	document.head.appendChild(newScript);
	if(localStorage["_URL_"+url+("?v="+currentVersion)] && cachable){
		newScript.text=localStorage["_URL_"+url+("?v="+currentVersion)];
		setTimeout(function(){this.onload?this.onload():false;}.bind(newScript),50);
	}
	else{
		var xhr = new XMLHttpRequest();
		xhr.s=newScript;
		xhr.doCaching=cachable;
		xhr.urlDO=url;
		xhr.onreadystatechange = function () {
			if (this.readyState == 4) {
				this.s.textContent=this.response;			
				this.s.onload?this.s.onload():false;
				if(this.doCaching)
					localStorage["_URL_"+this.urlDO+("?v="+currentVersion)]=this.responseText;
			}
		};

		xhr.open("GET", url, true);
		xhr.send();
	}
	return newScript;
}
function jsonGetNewNotificationRequest(){
	
	var inputFields={command:"addEventListner",
	    data:{
	        eventName:"notification",
    	}
	   
	};
	
	socket.sendListen(inputFields,function(json){
			//alert(json);
			
			});
	
	inputFields={command:"notifgetall",
	    data:{
    	}
	   
	};
	
	socket.sendListen(inputFields,function(json){
			
			});
}

function vidgetifyCSS(vidgetID,cssString){
	//TODO add keyframes support
	cssString=cssString.replace(/^(((\.)*(\w|\s|[\"\[\]\-\:\=\^\,])+|\*|\!|\~)?(\s*>\s*)?(#\w+)?\s*(\.(\w|\:)+)?\s*{)/gm,"."+vidgetID+" $1");
	return cssString;
}