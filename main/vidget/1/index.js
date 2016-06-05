importScripts("main/vidget/1/binary-parser.js","main/vidget/1/gzip.js","main/vidget/1/bignumber.js","main/vidget/1/NBT.js");
importScripts("three.min.js","wcsg.js");
//https://github.com/TheFrozenFire/Javascript-NBT-Decoder;
var newWindow=window.open(null,{framerAsync:false});
var document=newWindow.document;
var progressBar=document.createElement("progress");
progressBar.value=1;
var progressBarInner=document.createElement("progress");
progressBarInner.setAttribute("style","width:20%;margin-left:5px;opacity:0.8;");
progressBar.value=1;
document.body.appendChild(progressBar);
document.body.appendChild(progressBarInner);
var totalWorkerLoaded=1;
var workerID=1;
newWindow.addEventListener("message",function(s){
	if(!s[0])return;
	switch(s[0]){
		case "loadSchFile":
			progressBar.value=0;
		 var reader = new FileReaderSync(); 
		 var dataBinrary=reader.readAsBinaryString(s[1]);
		 progressBar.value=0.2;
		 var nbt = new NBT(dataBinrary);
			progressBar.value=0.5;
			//console.log(nbt.root[0].toSource());
			if(nbt.root[0].name=="Schematic"){
				var va=nbt.root[0].value;
				var data={}
				va.forEach(function(d){
					data[d.name]=d.value;
				});
				if(data.Height && data.Length && data.Width && data.Blocks && data.Data){
					delete nbt.root[0];
					delete nbt;
					newWindow.postMessage([1084,"newWorld("+data.Width+","+data.Length+");"]);
					return newWindow.postMessage([10252,data]);
				}
				progressBar.value=1;
				return console.log("corrupted schematic?");
			}else{
				progressBar.value=1;
				return console.log("not valid schematic?");
			}
			progressBar.value=1;
			console.log("failed to process, not a valid schematic?");
			
		break;
		case "nBC": 
			nBc(s[1][0],s[1][1],s[1][2]);
			
		break;
		case "newMeshSystem": 
			newMeshSystemTest(s[1][0],s[1][1]);
			
		break;
		case "uS":
			uS(s[1][0]);
		break;
		case "sH":
			sH(s[1][0]);
		break;
		case "pLC4B":
			//pLC4B(s[1][0],s[1][1]);
		break;
		case "totalBlockInfo":
			
			index=totalBlock=(s[1][0]);			
		break;
		case "mapSize":
			mapSize=(s[1]);		
		break;
		case "initializework":
			totalWorkerLoaded=s[1];//console.log("test"+s[1]);	
			workerID=s[2];
		break;
		case "loadSchema":
			loadSchema(s[1]);
		break;
	}
});
var blockMeshSystem=[];
var cube_geometryMesh = new THREE.BoxGeometry( 0.1, 0.1, 2 );
var geom = new THREE.BoxGeometry( 1, 1, 1 );
var meshTest= new THREE.Mesh(geom);
var currentHeight=0;
var colorArray=[];
var totalBlock=1;
var mapSize=[];

function pLC4B(i,colorHex){
				newMeshSystemTest(i,colorHex);
				colorArray[i]=new THREE.Color(colorHex);
			}
function sH(h){//set default height, 0 is default
	currentHeight=h;
}
function newMeshSystemTest(i,color){
				
				var material = new THREE.MeshBasicMaterial({color:"#"+color});
				var cube_mesh = new THREE.Mesh( cube_geometryMesh,material );
				blockMeshSystem[i] = [new ThreeBSP( cube_mesh )];
				var secondaryMesh=new THREE.Mesh( new THREE.BoxGeometry( 255,255,2),material ) ;
				var cubeThreeBspSecond = new ThreeBSP( secondaryMesh );
				blockMeshSystem[i][0] = blockMeshSystem[i][0].subtract( cubeThreeBspSecond );
				
				var resultMesY = blockMeshSystem[i][0].toMesh( new THREE.MeshLambertMaterial());
				
				resultMesY.geometry.computeVertexNormals();
				//scene.add( resultMesY );
				blockMeshSystem[i][1]=resultMesY;
				return blockMeshSystem[i];
}
var index=1;
var innerProgressBar=1;
setInterval(function(){
	if(Math.min(1,index/totalBlock))
		if(progressBar.value!=Math.min(1,index/totalBlock))		
			progressBar.value=Math.min(1,index/totalBlock);
	if(innerProgressBar){
		if(progressBarInner.value!=innerProgressBar ){
			progressBarInner.value=innerProgressBar;
		}
	}else{
		innerProgressBar=1;
	}
	
},500);
function nBc(x,y,i){
				//index=x+(y*mapSize[0])+(mapSize[0]*currentHeight*mapSize[1]);
				meshTest.position.set(x,y,currentHeight);	
				blockMeshSystem[i][0] = blockMeshSystem[i][0].union(new ThreeBSP(meshTest));//starting here
				innerProgressBar=(x*y)/(x+(y*mapSize[0]));
				return;
}
function uS(i){

				//scene.remove( blockMeshSystem[i][1] );
				//blockMeshSystem[i][1] = blockMeshSystem[i][0].toMesh( new THREE.MeshLambertMaterial({wireframe:true,shading: THREE.FlatShading,color:colorArray[i]}));
				//blockMeshSystem[i][1].geometry.computeVertexNormals();
				/*
				for(prop in blockMeshSystem[i][0]){
					console.log("prop "+prop+" = "+blockMeshSystem[i][0][prop]);
				}
				*/
				index=totalBlock;
				progressBar.value=1
				innerProgressBar=1;
				//newWindow.postMessage([1084,"progressBar3.value=1;"]);

				newWindow.postMessage([10152,[i+workerID,blockMeshSystem[i][0],workerID,blockMeshSystem[i][1].material.color]]);
				//scene.add(blockMeshSystem[i][1]);	
}




var globalHeight4Flouder=0;
var counterBlocks=[];
var loadSchema=function(data){
	progressBar.value=0;
	mapSize[0]=data.Width;
	mapSize[1]=data.Length;
	var xS=mapSize[0];
	var yS=mapSize[1];
	var mapAreaSize=(mapSize[0]*mapSize[1]);
	var zLayer=0;
	var loadedBlock={};
	//load balance using the totalWorkerLoaded with	workerID
	for(var i=workerID;i<data.Blocks.length;i+=totalWorkerLoaded){
		var x=((i )%mapSize[0]);
		var z=(i/(mapAreaSize))>>0;
		var y=((i-x)/mapSize[0])%mapSize[1];
		
		if(data.Blocks[i]==0)continue;
		if(loadedBlock[data.Blocks[i]]!=1){
			loadedBlock[data.Blocks[i]]=1;
			newMeshSystemTest(data.Blocks[i]);
		}
		
		if(z!=currentHeight){progressBar.value=z/data.Height;sH(z);	}
		
		nBc(x,y,data.Blocks[i]);
	}
	for(blockId in loadedBlock){
		uS(blockId);
	}
}