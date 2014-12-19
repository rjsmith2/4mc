importScripts("main/vidget/1/binary-parser.js","main/vidget/1/gzip.js","main/vidget/1/bignumber.js","main/vidget/1/NBT.js");
//https://github.com/TheFrozenFire/Javascript-NBT-Decoder;
var newWindow=window.open(null,{framerAsync:false});
newWindow.addEventListener("message",function(s){
	if(!s[0])return;
	switch(s[0]){
		case "loadSchFile": 
		 var reader = new FileReaderSync(); 
		 var dataBinrary=reader.readAsBinaryString(s[1]);
		 var nbt = new NBT(reader.readAsBinaryString(s[1]));
			//console.log(nbt.root[0].toSource());
			if(nbt.root[0].name=="Schematic"){
			console.log("trying");
				var va=nbt.root[0].value;
				var data={}
				va.forEach(function(d){
					data[d.name]=d.value;
				});
				if(data.Height && data.Length && data.Width && data.Blocks && data.Data){
					delete nbt.root[0];
					delete nbt;
					return newWindow.postMessage([10252,data]);
				}
				return console.log("corrupted schematic?");
			}else{
				return console.log("not valid schematic?");
			}
			console.log("failed to process, not a valid schematic?");
			
		break;
	}
});

