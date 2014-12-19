var createInput=function(str){
	var b=document.createElement("input");
	b.placeholder=str;
	b.type="text";
	return b;
return

}

var createButton=function(str){
	var b=document.createElement("input");
	b.value=str;
	b.type="button";
	return b;
return

}

var toolAccept=function(){};

var newWindow=window.open("test: ",{framerAsync:true});
newWindow.resizeTo(445,100);//fixed size
var document=newWindow.document;

var windowSection=document.createElement("div");
windowSection.style.display="none";

var x16World=createButton("16x16 Blocks");
x16World.addEventListener("click",function(){newWorld(16,16);});
windowSection.appendChild(x16World);
var x32World=createButton("32x32 Blocks");
x32World.addEventListener("click",function(){newWorld(32,32);});
windowSection.appendChild(x32World);
var x64World=createButton("64x64 Blocks");
x64World.addEventListener("click",function(){newWorld(64,64);});
windowSection.appendChild(x64World);
var x128World=createButton("256x256 Blocks");
x128World.addEventListener("click",function(){newWorld(256,256);});
windowSection.appendChild(x128World);
var xSize=createInput("xSize VAR");
var ySize=createInput("ySize VAR");
var worldCreate=createButton("Generate");
worldCreate.addEventListener("click",function(){newWorld(xSize.value,ySize.value);});
windowSection.appendChild(xSize);
windowSection.appendChild(ySize);
windowSection.appendChild(worldCreate);

//blockID section
var blockIDSection=document.createElement("div");
blockIDSection.style.display="none";
var newBlockID=createButton("Create New Block ID");
var blocksGroup=document.createElement("div");
blockIDSection.appendChild(newBlockID);
blockIDSection.appendChild(blocksGroup);
blocksGroup.setAttribute("style","height:500px;overflow:auto;");
newBlockID.addEventListener("click",function(){ 
	var div=blockIDElement();
	blocksGroup.appendChild(div);
});


var toolSection=document.createElement("div");
toolSection.style.display="none";
var viewToolButton=createButton("View");
toolSection.appendChild(viewToolButton);
viewToolButton.addEventListener("click",function(){
	restoreViewControl();
	toolClickDown=function(){};
	toolDownMouseMove=function(){};
	toolClickUp=function(){};
	toolAccept=function(){};
});
var lineToToolButton=createButton("Line");
toolSection.appendChild(lineToToolButton);
lineToToolButton.addEventListener("click",function(){
	disableViewControl();
	toolClickDown=lineToTool.down;
	toolDownMouseMove=lineToTool.downMove;
	toolClickUp=lineToTool.up;
	toolAccept=lineToTool.accept

});
var lineToSectionOption=document.createElement("div");
lineToSectionOption.style.display="none";
var heightOptionLine=document.createElement("input");
heightOptionLine.value=1;

var printLine=document.createElement("input");
printLine.type="button";
printLine.value="Accept"
printLine.disabled=true;
printLine.addEventListener("click",function(){toolAccept()});
lineToSectionOption.appendChild(heightOptionLine);
lineToSectionOption.appendChild(printLine);

var penToolButton=createButton("Pen");
toolSection.appendChild(penToolButton);
penToolButton.addEventListener("click",function(){
	disableViewControl();
	toolClickDown=penTool.down;
	toolDownMouseMove=penTool.downMove;
	toolClickUp=penTool.up;
	toolAccept=function(){};
});

var erasePenToolButton=createButton("Erase");
toolSection.appendChild(erasePenToolButton);
erasePenToolButton.addEventListener("click",function(){
	disableViewControl();
	toolClickDown=eraseTool.down;
	toolDownMouseMove=eraseTool.downMove;
	toolClickUp=eraseTool.up;
	toolAccept=function(){};
});


var tabGroup=document.createElement("ul");
tabGroup.className="tabrow";
tabGroup.selectedTab=null;

var viewTab=document.createElement("li");
tabGroup.appendChild(viewTab);
viewTab.textContent="View";
viewTab.section=windowSection;
viewTab.show=function(){this.section.style.display=""};
viewTab.hide=function(){this.section.style.display="none"};
viewTab.addEventListener("click",function(){
	tabGroup.selectedTab.hide();
	tabGroup.selectedTab.className="";
	tabGroup.selectedTab=viewTab;
	tabGroup.selectedTab.className="selected";
	tabGroup.selectedTab.show();
});

var worldTab=document.createElement("li");
tabGroup.appendChild(worldTab);
worldTab.textContent="World";
worldTab.section=windowSection;
worldTab.show=function(){this.section.style.display=""};
worldTab.hide=function(){this.section.style.display="none"};
worldTab.addEventListener("click",function(){
	tabGroup.selectedTab.hide();
	tabGroup.selectedTab.className="";
	tabGroup.selectedTab=worldTab;
	tabGroup.selectedTab.className="selected"
	tabGroup.selectedTab.show();
});

//INITIAL TAB
var toolTab=document.createElement("li");
tabGroup.selectedTab=toolTab;
tabGroup.appendChild(toolTab);
toolTab.textContent="Tools";
toolTab.className="selected";
toolTab.section=toolSection;
toolTab.show=function(){this.section.style.display=""};
toolTab.hide=function(){this.section.style.display="none"};
toolTab.addEventListener("click",function(){
	tabGroup.selectedTab.hide();
	tabGroup.selectedTab.className="";
	tabGroup.selectedTab=toolTab;
	tabGroup.selectedTab.className="selected";
	tabGroup.selectedTab.show();
});
toolTab.show();


var blockTab=document.createElement("li");
tabGroup.appendChild(blockTab);
blockTab.textContent="Block ID";
blockTab.section=blockIDSection;
blockTab.show=function(){this.section.style.display=""};
blockTab.hide=function(){this.section.style.display="none"};
blockTab.addEventListener("click",function(){
	tabGroup.selectedTab.hide();
	tabGroup.selectedTab.className="";
	tabGroup.selectedTab=blockTab;
	tabGroup.selectedTab.className="selected"
	tabGroup.selectedTab.show();
});


var layerTab=document.createElement("li");
tabGroup.appendChild(layerTab);
layerTab.textContent="Layers";
layerTab.section=windowSection;
layerTab.show=function(){this.section.style.display=""};
layerTab.hide=function(){this.section.style.display="none"};
layerTab.addEventListener("click",function(){
	tabGroup.selectedTab.hide();
	tabGroup.selectedTab.className="";
	tabGroup.selectedTab=layerTab;
	tabGroup.selectedTab.className="selected"
	tabGroup.selectedTab.show();
});

var processTab=document.createElement("li");
tabGroup.appendChild(processTab);
processTab.textContent="Processes";
processTab.section=windowSection;
processTab.show=function(){this.section.style.display=""};
processTab.hide=function(){this.section.style.display="none"};
processTab.addEventListener("click",function(){
	tabGroup.selectedTab.hide();
	tabGroup.selectedTab.className="";
	tabGroup.selectedTab=processTab;
	tabGroup.selectedTab.className="selected";
	tabGroup.selectedTab.show();
});
var simTab=document.createElement("li");
tabGroup.appendChild(simTab);
simTab.textContent="Actionssss";
simTab.section=windowSection;
simTab.show=function(){this.section.style.display=""};
simTab.hide=function(){this.section.style.display="none"};
simTab.addEventListener("click",function(){
	tabGroup.selectedTab.hide();
	tabGroup.selectedTab.className="";
	tabGroup.selectedTab=simTab;
	tabGroup.selectedTab.className="selected"
	tabGroup.selectedTab.show();
});
document.body.appendChild(tabGroup);
document.body.appendChild(windowSection);
document.body.appendChild(toolSection);
document.body.appendChild(blockIDSection);
toolSection.appendChild(lineToSectionOption);


executingOrder=[];
var executingStatus=0;//0 empty, 1 tasks included
var newExecuteTask=function(str){
	executingStatus=1;
	executingOrder[executingOrder.length]=str;
	return 1;
}
setInterval(sendExecute,500);//send some while idling (like user switched tabs)
var executeBulkAmount=5;
var sendExecute=function(){
	//newWindow.postMessage([1084,"25423"]);
	
	if(!executingOrder.length)return (executingStatus=0);
	//executingOrder.unshift("document.title="+((1/(executingOrder.length<=executeBulkAmount?1:executingOrder.length))*100)+";");
	newWindow.postMessage([1084,executingOrder.splice(0,executeBulkAmount).join("")]);
}
newWindow.addEventListener("message",function(s){
	if(!s[0])return;
	switch(s[0]){
		case 12: sendExecute();break;
		case "pick": pick(s[1],s[2]);break;
		case "loadSchema": loadSchema(s[1]);break;
	}
});
var loadedBlock=[];
var loadedUniqueBlockCounter=0;
var sentTest=0;
var mapAreaSize=0;

var blockIDElementArrayID={};
var totalnET=0;
var doAscendingLayer=function(data,layerID,mapData){
	sH(layerID);	
	//console.log("doing "+mapData.length);
	
	for(var i=0;i<data.length;i++){	
		if(data[i]==0)continue;
		if(i%(executeBulkAmount*2)==0){
			newExecuteTask("progressBar.value="+(layerID/globalHeight4Flouder)+";progressBar2.value="+(i/data.length)+";");
		}
		if(!loadedBlock[data[i]]){
			var div=blockIDElement(loadedUniqueBlockCounter);
			blocksGroup.appendChild(div);			
			blockIDElementArrayID[data[i]]=div;
			div.itemIDText.value=data[i];
			loadedBlock[data[i]]=loadedUniqueBlockCounter++;
		}
			var x=((i )%mapSizeArr[0]);
			var y=((i-x)/mapSizeArr[0]);
			++counterBlocks[data[i]];
			newExecuteTask("nBc("+x+","+y+","+loadedBlock[data[i]]+");");
			++totalnET;
		
	}
	if(mapData.length)
		setTimeout(function(){doAscendingLayer(mapData.concat().splice(0,mapAreaSize),++layerID,mapData.slice(mapAreaSize,mapData.length));},1);
	else{
		for(div in blockIDElementArrayID){
			if(counterBlocks[div])
				blockIDElementArrayID[div].blockCounter.textContent="Count:"+counterBlocks[div];
		}
		loadedBlock.forEach(function(d){newExecuteTask("uS("+d+");");});
		newExecuteTask("progressBar.value=progressBar2.value="+1+";render();");
		console.log("total task workload:"+totalnET);
		console.log("executingOrder has:"+executingOrder.length);
		return;
	}
};
var globalHeight4Flouder=0;
var counterBlocks=[];
var loadSchema=function(data){
	newWorld(data.Width*1,data.Length*1);
	globalHeight4Flouder=data.Height;
	blockIDElementArrayID={};
	counterBlocks=new Uint16Array(255);
	var xS=mapSizeArr[0];
	var yS=mapSizeArr[1];
	var x=-1;
	var y=-1
	var z=-1;
	var mapData=data.Blocks.concat();
	mapAreaSize=(mapSizeArr[0]*mapSizeArr[1]);
	var zLayer=0;
	loadedBlock=[];
	doAscendingLayer(mapData.splice(0,mapAreaSize),0,data.Blocks)
	console.log("world size is "+[data.Width,data.Length]);
	console.log("total blocks: "+[data.Blocks.length]);
	console.log("total layers: "+[data.Height]);
	
	/*
	for(var i=0;i<=data.Blocks.length;i++){
		/*++x;
		if(!(x%xS)){++y;x=0;};
		if(!(y%(xS*yS))){++z;y=0;};
		
		if(data.Blocks[i]==0)continue;
		
		var x=i%mapSizeArr[0];
		var y=~~((i/x)%mapSizeArr[1]);
		var z=Math.round(i%(zda));
		/*
		var x=i%mapSizeArr[0];
		var y=((i-x)/mapSizeArr[1])%(zda);
		var z=Math.round(i/(zda));
		
		console.log([x,y,z]);
		sH(z);		
		if(!loadedBlock[data.Blocks[i]]){
			var div=blockIDElement(loadedUniqueBlockCounter);
			blocksGroup.appendChild(div);			
			loadedBlock[data.Blocks[i]]=loadedUniqueBlockCounter++
		}
		newExecuteTask("nBc("+x+","+y+","+loadedBlock[data.Blocks[i]]+");");
		sentTest++;
	}
	*/
}
var mapSize=0;
var mapSizeArr=[0,0];

var newWorld=function(x,y){
	if(!selectedBlock){
		var div=blockIDElement(0);
		blocksGroup.appendChild(div);
	}
	if(x*y>1048576)return;//anything greater, not supported in 32 bits. However enable this for 64 bits, and anything greater than this inside 64 will be local enviorment only (no server based saves)
	placementTypes=new Uint32Array(x*y*255);
	//clear pickingData;
	//clear scene
	//generate layerHelper that starts at layer 0;
	newExecuteTask("newWorld("+x+","+y+");");
	
	mapZ=0;
	mapSizeArr=[x,y];
	mapSize=x*y;
	//appendWorld(0,25);
	finishWorld();
	
	//fillRect(4,4,12,12);
	newExecuteTask("uS(0);");
};
var appendWorld=function(i,maxS){
	//may not need this anymore?eh 
	i+maxS<mapSize?
		newExecuteTask("pBS("+i+","+(i+maxS)+");")&&setTimeout( function(){appendWorld(i+maxS,maxS) },3):
			newExecuteTask("pBS("+i+","+(mapSize)+");")&&finishWorld();
	return;
}


var finishWorld=function(){
newExecuteTask("updateSceneMesh();");

//newExecuteTask("pLC4B(0x335599);");
/*
newExecuteTask("pLC4B(0x335529);");
newExecuteTask("nB(0,0);");
newExecuteTask("nB(12,0);");

newExecuteTask("nB(123,1);");
newExecuteTask("uS();");
//fillRectLineTo(8,8,21,1);
*/
}
var colorSelectedID=0;


var fillRectLineTo=function(x,y,x2,y2,func){
	var xLength=x2-x;
	var yLength=y2-y;
	var xR=1;
	var yR=1;
	if(x+y>x2+y2){
		xLength=x-x2;
		yLength=y-y2;
		yR=-1;
		xR=-1;
	}	
	h=1;
	w=1;
	var	iX=0;
	var	iY=0;
	var startingPositionX=Math.round(Math.max(xLength,yLength)/(w));
	var startingPositionY=Math.round(Math.max(xLength,yLength)/(h));
	if(yLength>xLength){	

		for(var i=startingPositionY+1;i-->0;){
			iX=Math.round(xLength*(i/yLength))*xR;
			iY=Math.round(yLength*(i/yLength))*yR;
				func( ((iX*w)+x) , ((iY*h)+y), (((iX*w)+x))+(((iY*h)+y)*mapSizeArr[0]) );
			
		}
	iX=Math.round(xLength*(startingPositionX/yLength))*xR;
	iY=Math.round(yLength*(startingPositionX/yLength))*yR;
	}else{

		for(var i=startingPositionX+1;i-->0;){
			iX=Math.round(xLength*(i/xLength))*xR;
			iY=Math.round(yLength*(i/xLength))*yR;
			func( ((iX*w)+x) , ((iY*h)+y) , (((iX*w)+x))+(((iY*h)+y)*mapSizeArr[0]));
		}
	
		iX=Math.round(xLength*(startingPositionX/xLength))*xR;
		iY=Math.round(yLength*(startingPositionX/xLength))*yR;
	}
	
	return this;
}
//toString(16) for hex value
//<< or >>> for shifting
//save format must be compatible with uint32array
		//for each block, it should have 4 0xfff 
		//first-block id. 0 if blank or null
		//second-extended blockID. if more than 255, then use this as multiplying to get more than 255 limitation
		//third-rotate 0,1,2,3 (default 0)
		//reserved
		//fifth-color id, 0 for none
		//sixth-block mode (redstone repeater, frames, etc), 0 for default
		
//for placement format
	//0xfffff (1048575, or 1024x1024 - 1) as indexing system for Uint32Array;
	//0xff as layer
	//0xf as rotate
	//0xffffff as block color
	//0xf as block states or mode. (redstone repeater, frames, etc)  0x0 for default (15 max states possible)
var placementTypes=new Uint32Array();//max 4,294,967,296 (two the power of 32) per
//var i = ( pixelBuffer[0] << 16 ) | ( pixelBuffer[1] << 8 ) | ( pixelBuffer[2] );
plopBlockDown=function(x,y,tileIndex){
	var index=x+(y*mapSizeArr[0])+(mapSizeArr[0]*currentLayer*mapSizeArr[1]);

	if(placementTypes[index])return;
	placementTypes[index]=1;
	newExecuteTask("nBc("+x+","+y+","+selectedBlock.colorID+");");
}

lineToPhantoum=function(x,y,tileIndex){
	newExecuteTask("phantomLineTo("+x+","+y+","+selectedBlock.colorID+");");
}

removeBlock=function(x,y,tileIndex){
	if(placementTypes[tileIndex]){
		placementTypes[tileIndex]=0;
		//newExecuteTask("rBi("+tileIndex+");"); for scene related blocks
		
	}
	newExecuteTask("rBidc("+x+","+y+","+selectedBlock.colorID+");");
}


var currentLayer=0;
var sH=function(s){if(currentLayer!=s){currentLayer=s;newExecuteTask("sH("+s+");");return true} return false};
var toolClickDown=function(){};
var toolDownMouseMove=function(){};
var toolClickUp=function(){};
var penTool=function(){}
 penTool.pointA=[];
 penTool.pointB=[];
penTool.down=function(i){
	if(mapSize<=i)return;
	if(0>i)return;
	var x=((i )%mapSizeArr[0]);
	var y=((i-x)/mapSizeArr[1]);
	this.pointA=[x,y];
 }
 penTool.downMove=function(i){
	if(mapSize<=i)return;
	if(0>i)return;
	var x=((i )%mapSizeArr[0]);
	var y=((i-x)/mapSizeArr[1]);
	this.pointB=[x,y];
	fillRectLineTo(this.pointA[0],this.pointA[1],this.pointB[0],this.pointB[1],plopBlockDown);
	this.pointA=this.pointB;
	newExecuteTask("uS("+selectedBlock.colorID+");");
 }
 penTool.up=function(){};
 
 var lineToTool=function(){}
 lineToTool.pointA=[];
 lineToTool.pointB=[];
lineToTool.down=function(i){
	printLine.disabled=true;
	heightOptionLine.disabled=true;
	if(mapSize<=i)return;
	if(0>i)return;
	var x=((i )%mapSizeArr[0]);
	var y=((i-x)/mapSizeArr[1]);
	this.pointA=[x,y];
	newExecuteTask("phantomLineToStart(3);");
 }
 lineToTool.downMove=function(i){
	if(mapSize<=i)return;
	if(0>i)return;
	if(this.pointB)newExecuteTask("removePhantomLineTo();");
	var x=((i )%mapSizeArr[0]);
	var y=((i-x)/mapSizeArr[1]);
	this.pointB=[x,y];
	
	fillRectLineTo(this.pointA[0],this.pointA[1],this.pointB[0],this.pointB[1],lineToPhantoum);
	
 }
 lineToTool.up=function(){
	printLine.disabled=false;
	heightOptionLine.disabled=false;
	lineToSectionOption.style.display="";
 };
 lineToTool.accept=function(){
	newExecuteTask("removePhantomLineTo();");
	lineToSectionOption.style.display="none";
	//;
	newExecuteTask("progressBar.value="+0+";");
	for(var i=heightOptionLine.value;--i>=0;){
		setTimeout(function(){
			sH(this[0]);
			fillRectLineTo(this[1][0],this[1][1],this[2][0],this[2][1],plopBlockDown);
			newExecuteTask("uS("+selectedBlock.colorID+");");
			newExecuteTask("progressBar.value="+(layerID/globalHeight4Flouder)+";progressBar2.value="+((this[3]-i/this[3]))+";");
		}.bind([i,this.pointA,this.pointB,heightOptionLine.value]),40*i);
		
	}
	
	newExecuteTask("uS("+selectedBlock.colorID+");");
 }
 var eraseTool=function(){}
 eraseTool.pointA=[];
 eraseTool.pointB=[];
eraseTool.down=function(i){
	if(mapSize<=i)return;
	if(0>i)return;
	var x=((i )%mapSizeArr[0]);
	var y=((i-x)/mapSizeArr[1]);
	this.pointA=[x,y];
 }
 eraseTool.downMove=function(i){
	if(mapSize<=i)return;
	if(0>i)return;
	var x=((i )%mapSizeArr[0]);
	var y=((i-x)/mapSizeArr[1]);
	this.pointB=[x,y];
	fillRectLineTo(this.pointA[0],this.pointA[1],this.pointB[0],this.pointB[1],removeBlock);
	this.pointA=this.pointB;
	newExecuteTask("uS("+selectedBlock.colorID+");");
 }
 eraseTool.up=function(){};
 
var disableViewControl=function(){
	newWindow.postMessage([1084,"controls.rotateSpeed = 0.0;"]);
}
var restoreViewControl=function(){
	newWindow.postMessage([1084,"controls.rotateSpeed = 1.0;"]);
}
var pick=function(index,mid){
	if(mid==0){//mousedown picking
		toolClickDown(index);
	}else if(mid==1){//mousemove picking while downing
		toolDownMouseMove(index);
	}
	else if(mid==2){
		toolClickUp(index);
	}
}

var selectedBlock=null;
var colorIDCounter=-1;
//selectedBlock.childNodes[0]
//blocksGroup.childNodes
var blockIDElement=function(i){
	var div=document.createElement("div");
	div.addEventListener("click",function(){selectBlockID(this);}.bind(div));
	div.setAttribute("style","margin:1px;background-color:rgba(255,255,255,0.2);box-shadow:0px 0px 1px 3px silver;height:65px;margin-top:3px;");
	var blockColor=document.createElement("div");//use css for color
	div.colorChosen=(Math.random()*(0xffffff)>>0).toString(16);
	div.colorID=i||++colorIDCounter;
	blockColor.setAttribute("style","float:left;width:64px;height:64px;background-color:#"+div.colorChosen+";");
	newExecuteTask("pLC4B("+(i||colorIDCounter)+",0x"+div.colorChosen+");");
	var finalBlockIDOutput=document.createElement("input");
	finalBlockIDOutput.list="blockMinecraftID";
	finalBlockIDOutput.placeholder="itemID or minecraft:blockID";
	finalBlockIDOutput.setAttribute("style","margin:20px");
	finalBlockIDOutput.value=Object.keys(minecraftNames)[Math.random()*Math.random()*Math.random()*(Object.keys(minecraftNames).length)>>0]
	div.appendChild(blockColor);
	div.appendChild(finalBlockIDOutput);
	var stats=document.createElement("div");
	stats.setAttribute("style","float:right;");
	var counter=document.createElement("span");
	stats.appendChild(counter);
	counter.textContent="Count:0";
	div.blockCounter=counter;
	div.itemIDText=finalBlockIDOutput;
	div.appendChild(stats);
	if(selectedBlock==null)selectBlockID(div);
	return div;
	
}
function selectBlockID(d){
	if(selectedBlock){
		selectedBlock.style.border="";
		selectedBlock.style.backgroundColor="";
	}
	selectedBlock=d;
	selectedBlock.style.border="1px dashed black";
	selectedBlock.style.backgroundColor="rgba(0,0,0,0.3)";
}

newWindow.postMessage([1084,"progressBar.value=0.0;"]);
function generateDataList(IDName,arrayValues){
	var datalist=document.createElement("datalist");
	newWindow.postMessage([1084,"progressBar.value=0.09;"]);
	var progressInt=0;
	datalist.listValues={};
	 arrayValues.forEach(function(d,index){
	   var option=document.createElement("option");
	   option.value=d;
	   datalist.listValues[d]=option;
	   datalist.appendChild(option);
	   if(progressInt+0.13<index/arrayValues.length)
		newWindow.postMessage([1084,"progressBar.value="+((progressInt=index/arrayValues.length)-0.1)+";"]);
	 });
	 newWindow.postMessage([1084,"progressBar.value=1;"]);
	datalist.id=IDName;

	datalist.newOption=function(msg){
	 if(this.listValues[msg])return;
	 var opt=document.createElement("option");
	 opt.value=msg;
	 this.listValues[msg]=opt;
	 this.appendChild(opt);
	 
	}
	newWindow.postMessage([1084,"progressBar.value=1;"]);
return datalist;

}



minecraftNames={"minecraft:stone":"Stone",
"minecraft:stone 1":"Granite",
"minecraft:stone 2":"Polished Granite",
"minecraft:stone 3":"Diorite",
"minecraft:stone 4":"Polished Diorite",
"minecraft:stone 5":"Andesite",
"minecraft:stone 6":"Polished Andesite",
"minecraft:grass":"Grass",
"minecraft:dirt":"Dirt",
"minecraft:dirt 1":"Dirt (No Grass)",
"minecraft:dirt 2":"Podzol",
"minecraft:cobblestone":"Cobblestone",
"minecraft:planks":"Wooden Plank (Oak)",
"minecraft:planks 1":"Wooden Plank (Spruce)",
"minecraft:planks 2":"Wooden Plank (Birch)",
"minecraft:planks 3":"Wooden Plank (Jungle)",
"minecraft:planks 4":"Wooden Plank (Acacia)",
"minecraft:planks 5":"Wooden Plank (Dark Oak)",
"minecraft:sapling":"Sapling (Oak)",
"minecraft:sapling 1":"Sapling (Spruce)",
"minecraft:sapling 2":"Sapling (Birch)",
"minecraft:sapling 3":"Sapling (Jungle)",
"minecraft:sapling 4":"Sapling (Acacia)",
"minecraft:sapling 5":"Sapling (Dark Oak)",
"minecraft:bedrock":"Bedrock",
"minecraft:flowing_water":"Water",
"minecraft:water":"Water (No Spread)",
"minecraft:flowing_lava":"Lava",
"minecraft:lava":"Lava (No Spread)",
"minecraft:sand":"Sand",
"minecraft:sand 1":"Red Sand",
"minecraft:gravel":"Gravel",
"minecraft:gold_ore":"Gold Ore",
"minecraft:iron_ore":"Iron Ore",
"minecraft:coal_ore":"Coal Ore",
"minecraft:log":"Wood (Oak)",
"minecraft:log 1":"Wood (Spruce)",
"minecraft:log 2":"Wood (Birch)",
"minecraft:log 3":"Wood (Jungle)",
"minecraft:log 4":"Wood (Oak 4)",
"minecraft:log 5":"Wood (Oak 5)",
"minecraft:leaves":"Leaves (Oak)",
"minecraft:leaves 1":"Leaves (Spruce)",
"minecraft:leaves 2":"Leaves (Birch)",
"minecraft:leaves 3":"Leaves (Jungle)",
"minecraft:sponge":"Sponge",
"minecraft:glass":"Glass",
"minecraft:lapis_ore":"Lapis Lazuli Ore",
"minecraft:lapis_block":"Lapis Lazuli Block",
"minecraft:dispenser":"Dispenser",
"minecraft:sandstone":"Sandstone",
"minecraft:sandstone 1":"Sandstone (Chiseled)",
"minecraft:sandstone 2":"Sandstone (Smooth)",
"minecraft:noteblock":"Note Block",
"minecraft:golden_rail":"Rail (Powered)",
"minecraft:detector_rail":"Rail (Detector)",
"minecraft:sticky_piston":"Sticky Piston",
"minecraft:web":"Cobweb",
"minecraft:tallgrass":"Tall Grass (Dead Shrub)",
"minecraft:tallgrass 1":"Tall Grass",
"minecraft:tallgrass 2":"Tall Grass (Fern)",
"minecraft:deadbush":"Dead Shrub",
"minecraft:piston":"Piston",
"minecraft:wool":"Wool",
"minecraft:wool 1":"Orange Wool",
"minecraft:wool 2":"Magenta Wool",
"minecraft:wool 3":"Light Blue Wool",
"minecraft:wool 4":"Yellow Wool",
"minecraft:wool 5":"Lime Wool",
"minecraft:wool 6":"Pink Wool",
"minecraft:wool 7":"Gray Wool",
"minecraft:wool 8":"Light Gray Wool",
"minecraft:wool 9":"Cyan Wool",
"minecraft:wool 10":"Purple Wool",
"minecraft:wool 11":"Blue Wool",
"minecraft:wool 12":"Brown Wool",
"minecraft:wool 13":"Green Wool",
"minecraft:wool 14":"Red Wool",
"minecraft:wool 15":"Black Wool",
"minecraft:yellow_flower":"Dandelion",
"minecraft:red_flower":"Poppy",
"minecraft:red_flower 1":"Blue Orchid",
"minecraft:red_flower 2":"Allium",
"minecraft:red_flower 4":"Red Tulip",
"minecraft:red_flower 5":"Orange Tulip",
"minecraft:red_flower 6":"White Tulip",
"minecraft:red_flower 7":"Pink Tulip",
"minecraft:red_flower 8":"Oxeye Daisy",
"minecraft:brown_mushroom":"Brown Mushroom",
"minecraft:red_mushroom":"Red Mushroom",
"minecraft:gold_block":"Block of Gold",
"minecraft:iron_block":"Block of Iron",
"minecraft:double_stone_slab":"Stone Slab (Double)",
"minecraft:double_stone_slab 1":"Sandstone Slab (Double)",
"minecraft:double_stone_slab 2":"Wooden Slab (Double)",
"minecraft:double_stone_slab 3":"Cobblestone Slab (Double)",
"minecraft:double_stone_slab 4":"Brick Slab (Double)",
"minecraft:double_stone_slab 5":"Stone Brick Slab (Double)",
"minecraft:double_stone_slab 6":"Nether Brick Slab (Double)",
"minecraft:double_stone_slab 7":"Quartz Slab (Double)",
"minecraft:double_stone_slab 8":"Smooth Stone Slab (Double)",
"minecraft:double_stone_slab 9":"Smooth Sandstone Slab (Double)",
"minecraft:stone_slab":"Stone Slab",
"minecraft:stone_slab 1":"Sandstone Slab",
"minecraft:stone_slab 2":"Wooden Slab",
"minecraft:stone_slab 3":"Cobblestone Slab",
"minecraft:stone_slab 4":"Brick Slab",
"minecraft:stone_slab 5":"Stone Brick Slab",
"minecraft:stone_slab 6":"Nether Brick Slab",
"minecraft:stone_slab 7":"Quartz Slab",
"minecraft:brick_block":"Brick",
"minecraft:tnt":"TNT",
"minecraft:bookshelf":"Bookshelf",
"minecraft:mossy_cobblestone":"Moss Stone",
"minecraft:obsidian":"Obsidian",
"minecraft:torch":"Torch",
"minecraft:fire":"Fire",
"minecraft:mob_spawner":"Mob Spawner",
"minecraft:oak_stairs":"Wooden Stairs (Oak)",
"minecraft:chest":"Chest",
"minecraft:diamond_ore":"Diamond Ore",
"minecraft:diamond_block":"Block of Diamond",
"minecraft:crafting_table":"Workbench",
"minecraft:farmland":"Farmland",
"minecraft:furnace":"Furnace",
"minecraft:lit_furnace":"Furnace (Smelting)",
"minecraft:ladder":"Ladder",
"minecraft:rail":"Rail",
"minecraft:stone_stairs":"Cobblestone Stairs",
"minecraft:lever":"Lever",
"minecraft:stone_pressure_plate":"Stone Pressure Plate",
"minecraft:wooden_pressure_plate":"Wooden Pressure Plate",
"minecraft:redstone_ore":"Redstone Ore",
"minecraft:redstone_torch":"Redstone Torch",
"minecraft:stone_button":"Button (Stone)",
"minecraft:snow_layer":"Snow",
"minecraft:ice":"Ice",
"minecraft:snow":"Snow Block",
"minecraft:cactus":"Cactus",
"minecraft:clay":"Clay Block",
"minecraft:jukebox":"Jukebox",
"minecraft:fence":"Fence",
"minecraft:pumpkin":"Pumpkin",
"minecraft:netherrack":"Netherrack",
"minecraft:soul_sand":"Soul Sand",
"minecraft:glowstone":"Glowstone",
"minecraft:portal":"Portal",
"minecraft:lit_pumpkin":"Jack-O-Lantern",
"minecraft:stained_glass":"Stained Glass (White)",
"minecraft:stained_glass 1":"Stained Glass (Orange)",
"minecraft:stained_glass 2":"Stained Glass (Magenta)",
"minecraft:stained_glass 3":"Stained Glass (Light Blue)",
"minecraft:stained_glass 4":"Stained Glass (Yellow)",
"minecraft:stained_glass 5":"Stained Glass (Lime)",
"minecraft:stained_glass 6":"Stained Glass (Pink)",
"minecraft:stained_glass 7":"Stained Glass (Gray)",
"minecraft:stained_glass 8":"Stained Glass (Light Grey)",
"minecraft:stained_glass 9":"Stained Glass (Cyan)",
"minecraft:stained_glass 10":"Stained Glass (Purple)",
"minecraft:stained_glass 11":"Stained Glass (Blue)",
"minecraft:stained_glass 12":"Stained Glass (Brown)",
"minecraft:stained_glass 13":"Stained Glass (Green)",
"minecraft:stained_glass 14":"Stained Glass (Red)",
"minecraft:stained_glass 15":"Stained Glass (Black)",
"minecraft:trapdoor":"Trapdoor",
"minecraft:monster_egg":"Monster Egg (Stone)",
"minecraft:monster_egg 1":"Monster Egg (Cobblestone)",
"minecraft:monster_egg 2":"Monster Egg (Stone Brick)",
"minecraft:monster_egg 3":"Monster Egg (Mossy Stone Brick)",
"minecraft:monster_egg 4":"Monster Egg (Cracked Stone)",
"minecraft:monster_egg 5":"Monster Egg (Chiseled Stone)",
"minecraft:stonebrick":"Stone Bricks",
"minecraft:stonebrick 1":"Mossy Stone Bricks",
"minecraft:stonebrick 2":"Cracked Stone Bricks",
"minecraft:stonebrick 3":"Chiseled Stone Brick",
"minecraft:brown_mushroom_block":"Brown Mushroom (Block)",
"minecraft:red_mushroom_block":"Red Mushroom (Block)",
"minecraft:iron_bars":"Iron Bars",
"minecraft:glass_pane":"Glass Pane",
"minecraft:melon_block":"Melon (Block)",
"minecraft:vine":"Vines",
"minecraft:fence_gate":"Fence Gate",
"minecraft:brick_stairs":"Brick Stairs",
"minecraft:stone_brick_stairs":"Stone Brick Stairs",
"minecraft:mycelium":"Mycelium",
"minecraft:waterlily":"Lily Pad",
"minecraft:nether_brick":"Nether Brick",
"minecraft:nether_brick_fence":"Nether Brick Fence",
"minecraft:nether_brick_stairs":"Nether Brick Stairs",
"minecraft:enchanting_table":"Enchantment Table",
"minecraft:end_portal":"End Portal",
"minecraft:end_portal_frame":"End Portal Frame",
"minecraft:end_stone":"End Stone",
"minecraft:dragon_egg":"Dragon Egg",
"minecraft:redstone_lamp":"Redstone Lamp",
"minecraft:double_wooden_slab":"Oak-Wood Slab (Double)",
"minecraft:double_wooden_slab 1":"Spruce-Wood Slab (Double)",
"minecraft:double_wooden_slab 2":"Birch-Wood Slab (Double)",
"minecraft:double_wooden_slab 3":"Jungle-Wood Slab (Double)",
"minecraft:double_wooden_slab 4":"Acacia Wood Slab (Double)",
"minecraft:double_wooden_slab 5":"Dark Oak Wood Slab (Double)",
"minecraft:wooden_slab":"Oak-Wood Slab",
"minecraft:wooden_slab 1":"Spruce-Wood Slab",
"minecraft:wooden_slab 2":"Birch-Wood Slab",
"minecraft:wooden_slab 3":"Jungle-Wood Slab",
"minecraft:wooden_slab 4":"Acacia Wood Slab",
"minecraft:wooden_slab 5":"Dark Oak Wood Slab",
"minecraft:cocoa":"Cocoa Plant",
"minecraft:sandstone_stairs":"Sandstone Stairs",
"minecraft:emerald_ore":"Emerald Ore",
"minecraft:ender_chest":"Ender Chest",
"minecraft:tripwire_hook":"Tripwire Hook",
"minecraft:emerald_block":"Block of Emerald",
"minecraft:spruce_stairs":"Wooden Stairs (Spruce)",
"minecraft:birch_stairs":"Wooden Stairs (Birch)",
"minecraft:jungle_stairs":"Wooden Stairs (Jungle)",
"minecraft:command_block":"Command Block",
"minecraft:beacon":"Beacon",
"minecraft:cobblestone_wall":"Cobblestone Wall",
"minecraft:cobblestone_wall 1":"Mossy Cobblestone Wall",
"minecraft:wooden_button":"Button (Wood)",
"minecraft:anvil":"Anvil",
"minecraft:anvil 1":"Anvil (Slightly Damaged)",
"minecraft:anvil 2":"Anvil (Very Damaged)",
"minecraft:trapped_chest":"Trapped Chest",
"minecraft:light_weighted_pressure_plate":"Weighted Pressure Plate (Light)",
"minecraft:heavy_weighted_pressure_plate":"Weighted Pressure Plate (Heavy)",
"minecraft:daylight_detector":"Daylight Sensor",
"minecraft:redstone_block":"Block of Redstone",
"minecraft:quartz_ore":"Nether Quartz Ore",
"minecraft:hopper":"Hopper",
"minecraft:quartz_block":"Quartz Block",
"minecraft:quartz_block 1":"Chiseled Quartz Block",
"minecraft:quartz_block 2":"Pillar Quartz Block",
"minecraft:quartz_stairs":"Quartz Stairs",
"minecraft:activator_rail":"Rail (Activator)",
"minecraft:dropper":"Dropper",
"minecraft:stained_hardened_clay":"Stained Clay (White)",
"minecraft:stained_hardened_clay 1":"Stained Clay (Orange)",
"minecraft:stained_hardened_clay 2":"Stained Clay (Magenta)",
"minecraft:stained_hardened_clay 3":"Stained Clay (Light Blue)",
"minecraft:stained_hardened_clay 4":"Stained Clay (Yellow)",
"minecraft:stained_hardened_clay 5":"Stained Clay (Lime)",
"minecraft:stained_hardened_clay 6":"Stained Clay (Pink)",
"minecraft:stained_hardened_clay 7":"Stained Clay (Gray)",
"minecraft:stained_hardened_clay 8":"Stained Clay (Light Gray)",
"minecraft:stained_hardened_clay 9":"Stained Clay (Cyan)",
"minecraft:stained_hardened_clay 10":"Stained Clay (Purple)",
"minecraft:stained_hardened_clay 11":"Stained Clay (Blue)",
"minecraft:stained_hardened_clay 12":"Stained Clay (Brown)",
"minecraft:stained_hardened_clay 13":"Stained Clay (Green)",
"minecraft:stained_hardened_clay 14":"Stained Clay (Red)",
"minecraft:stained_hardened_clay 15":"Stained Clay (Black)",
"minecraft:stained_glass_pane":"Stained Glass Pane (White)",
"minecraft:stained_glass_pane 1":"Stained Glass Pane (Orange)",
"minecraft:stained_glass_pane 2":"Stained Glass Pane (Magenta)",
"minecraft:stained_glass_pane 3":"Stained Glass Pane (Light Blue)",
"minecraft:stained_glass_pane 4":"Stained Glass Pane (Yellow)",
"minecraft:stained_glass_pane 5":"Stained Glass Pane (Lime)",
"minecraft:stained_glass_pane 6":"Stained Glass Pane (Pink)",
"minecraft:stained_glass_pane 7":"Stained Glass Pane (Gray)",
"minecraft:stained_glass_pane 8":"Stained Glass Pane (Light Gray)",
"minecraft:stained_glass_pane 9":"Stained Glass Pane (Cyan)",
"minecraft:stained_glass_pane 10":"Stained Glass Pane (Purple)",
"minecraft:stained_glass_pane 11":"Stained Glass Pane (Blue)",
"minecraft:stained_glass_pane 12":"Stained Glass Pane (Brown)",
"minecraft:stained_glass_pane 13":"Stained Glass Pane (Green)",
"minecraft:stained_glass_pane 14":"Stained Glass Pane (Red)",
"minecraft:stained_glass_pane 15":"Stained Glass Pane (Black)",
"minecraft:log2":"Wood (Acacia Oak)",
"minecraft:log2 1":"Wood (Dark Oak)",
"minecraft:acacia_stairs":"Wooden Stairs (Acacia)",
"minecraft:dark_oak_stairs":"Wooden Stairs (Dark Oak)",
"minecraft:slime":"Slime Block",
"minecraft:hay_block":"Hay Bale",
"minecraft:carpet":"Carpet (White)",
"minecraft:carpet 1":"Carpet (Orange)",
"minecraft:carpet 2":"Carpet (Magenta)",
"minecraft:carpet 3":"Carpet (Light Blue)",
"minecraft:carpet 4":"Carpet (Yellow)",
"minecraft:carpet 5":"Carpet (Lime)",
"minecraft:carpet 6":"Carpet (Pink)",
"minecraft:carpet 7":"Carpet (Grey)",
"minecraft:carpet 8":"Carpet (Light Gray)",
"minecraft:carpet 9":"Carpet (Cyan)",
"minecraft:carpet 10":"Carpet (Purple)",
"minecraft:carpet 11":"Carpet (Blue)",
"minecraft:carpet 12":"Carpet (Brown)",
"minecraft:carpet 13":"Carpet (Green)",
"minecraft:carpet 14":"Carpet (Red)",
"minecraft:carpet 15":"Carpet (Black)",
"minecraft:hardened_clay":"Hardened Clay",
"minecraft:coal_block":"Block of Coal",
"minecraft:packed_ice":"Packed Ice",
}

document.body.appendChild(generateDataList("blockMinecraftID",Object.keys(minecraftNames)));