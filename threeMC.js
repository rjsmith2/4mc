function applyVertexColors( g, c ){
	var f=g.faces;
	for(var i=f.length;--i>=0;){
		for( var j = 3; --j>=0; ) {
			f[i].vertexColors[ j ] = c;

		}
	}
}

			var container;
			var camera, controls, scene, renderer;
			pickingData = [];
			var	pickingTexture, pickingScene;
			var objects = [];
			var highlightBox;
			drawnObject=null;
			var mouse = new THREE.Vector2();
			var offset = new THREE.Vector3( 0.25, 0.25, 0.25);
			container = mainBackgroundCanvasContainer;
			camera = new THREE.PerspectiveCamera( 10, window.innerWidth / window.innerHeight, 1, 5555 );
			camera.position.z=256;
			camera.position.y= -1256;
			renderer = new THREE.WebGLRenderer( { antialias: true,alpha: true } );
			renderer.setClearColor(0xdddddd,1);
			renderer.setSize( window.innerWidth, window.innerHeight );

			renderer.sortObjects = false;
			
			controls = new THREE.TrackballControls( camera, container);
			controls.rotateSpeed = 1.0;
			controls.zoomSpeed = 5.2;
			controls.panSpeed = 0.8;
			controls.noZoom = false;
			controls.noPan = false;
			controls.staticMoving = true;
			controls.dynamicDampingFactor = 0.3;

			scene = new THREE.Scene();

			pickingScene = new THREE.Scene();
			pickingTexture = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight );
			pickingTexture.generateMipmaps = false;
			

			var light = new THREE.AmbientLight( 0xaaaaaa ); // soft white light scene.add( light );
			//scene.add( light );
			flashlight = new THREE.PointLight(0xaaaaaa,1,0);
			scene.add(flashlight);
			flashlight.position.copy(camera.position);
			flashlight.target = camera;

			geometry = new THREE.Geometry(),
			pickingGeometry = new THREE.Geometry(),
			pickingMaterial = new THREE.MeshBasicMaterial( { vertexColors: THREE.VertexColors } ),
			defaultMaterial = new THREE.MeshLambertMaterial({ color: 0xffee99, shading: THREE.FlatShading, vertexColors: THREE.VertexColors, wireframe:false	} );
			scale = new THREE.Vector3(1,1,1);
			rotation = new THREE.Euler();
			//geometry.dynamic =true;
			

			var geom = new THREE.BoxGeometry( 1, 1, 1 );
			var color = new THREE.Color();
			var matrix = new THREE.Matrix4();
			var quaternion = new THREE.Quaternion();
			quaternion.setFromEuler( rotation, false );
			var scale,rotation;
			mapSize=[4,4];
			highlightBox = new THREE.Mesh(
					new THREE.BoxGeometry( 1, 1, 1 ),
					new THREE.MeshLambertMaterial( { color: 0xffff00 }
				) );
			scene.add( highlightBox );
			container.appendChild( renderer.domElement );

			

				window.addEventListener( 'mousemove', onMouseMove,true);
				renderer.domElement.addEventListener( 'mousedown', function(e){
					mouse.downed=e.button==0;
					mouse.x = e.clientX;
					mouse.y = e.clientY;
					pick(0,e);
				},false);
				renderer.domElement.addEventListener( 'mouseup', onMouseUp,false);
				renderer.domElement.addEventListener( 'DOMMouseScroll',function(){setTimeout(render,50);},false);
				window.addEventListener( 'mouseup', onMouseUp,true );
				window.addEventListener("resize",function(){
					//do me
				},false);
			window.addEventListener("dragover",function(e){
				e.stopPropagation();
				e.preventDefault();
			});
			window.addEventListener("dragleave",function(){});			
			window.addEventListener("drop",function(e){
				e.stopPropagation();
				e.preventDefault();
				var files = e.target.files || e.dataTransfer.files;
				send2SecondaryBasedOnID(0,["loadSchFile",files[0]]);
				//SecondaryOffThread.thread.postMessage([1599,SecondaryOffThread.pID,0,["loadSchFile",files[0]]]);
				//var file=files[0];
				//var reader=new FileReader();
				//reader.onload=function(e){
					
					//var nbt = new NBT();
					//var resultDiv = document.getElementById("result");
					//console.log(nbt.root[0].toSource());
					
				//}
				//var nbtfile=reader.readAsBinaryString(file);
	
			
			});
				
			currentHeight=0;
			var pos = THREE.Vector3;
			renderer.isPreloaded=false;
			var geometryPlane=null;
			function newWorld(x,y){
	
				renderer.isPreloaded=false;
				var childScene=scene.children;
				childBlocks={};
				for (var i = childScene.length ;i > 4; ) {
					scene.remove(childScene[--i]);				
				}
				while(pickingScene.length)
					pickingScene.remove(pickingScene[0]);
				pickingScene=null;
				pickingScene = new THREE.Scene();
				
				//This can be resizable.... but disabled for now
				//pickingTexture = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight );
				//pickingTexture.generateMipmaps = false;
				pickingGeometry = new THREE.Geometry()

				geometry = new THREE.Geometry();
				matrix = new THREE.Matrix4();
				mapSize=[x,y];
				geometryPlane = new THREE.Mesh(new THREE.PlaneBufferGeometry (1*mapSize[0]+1, 1*mapSize[1]+1), new THREE.MeshNormalMaterial());
				geometryPlane.overdraw = false;
				scene.add(geometryPlane);
				
				var size=mapSize[0]*mapSize[1];
				
				var pickingObject=new THREE.Mesh( pickingGeometry, pickingMaterial ) ;
				pickingScene.add( pickingObject);
				//gdsa=pickingData[Math.round(pickingData.length/2)-1];
				//camera.position.set(gdsa["x"]+mapSize[0],gdsa["y"]+mapSize[1],gdsa["z"]+1110); 
				pickingData=[];
				//drawnObject = new THREE.Mesh( geometry, defaultMaterial );
				//scene.add( drawnObject );
				maxX=mapSize[0];
				maxY=mapSize[1];
				//render();
				//nB(0,new THREE.Color(0xFF0000));
				//updateSceneMesh();
				
				
			}
			function sH(h){//set default height, 0 is default
				currentHeight=h;
				return sendToAll(["sH",[h]]);//need to be sent to all!
				
				return SecondaryOffThread.thread.postMessage([1599,SecondaryOffThread.pID,0,["sH",[h]]]);
				
			}
			var colorArray=[];
			function pLC4B(i,colorHex){
				//send2SecondaryBasedOnID(i,["pLC4B",[i,colorHex]]);
				//SecondaryOffThread.thread.postMessage([1599,SecondaryOffThread.pID,0,["pLC4B",[i,colorHex]]]);
				newMeshSystem(i,colorHex);
				colorArray[i]=new THREE.Color(colorHex);
			}
			var maxX=mapSize[0];
			var maxY=mapSize[1];
			var curColor="";
			var meshTest= new THREE.Mesh(geom);
			function nBc(x,y,i){
			
				return send2SecondaryBasedOnID(i%16,["nBC",[x,y,i]]);
				return SecondaryOffThread.thread.postMessage([1599,SecondaryOffThread.pID,0,["nBC",[x,y,i]]]);
				meshTest.position.set(x,y,currentHeight);				
				blockMeshSystem[i][0] = blockMeshSystem[i][0].union(new ThreeBSP(meshTest));//starting here

				return;

			}
			function rBi(index){
				scene.remove(scene.getObjectByName(index));
			}

			function rBidc(x,y,i){
				var mesh= new THREE.Mesh( new THREE.BoxGeometry( 1.1,1.1,1 ) );
				mesh.position.x=x;
				mesh.position.y=y;
				mesh.position.z=currentHeight;
				blockMeshSystem[i][0] = blockMeshSystem[i][0].subtract( new ThreeBSP(mesh) );
				return;
			}
			var phantomBlock=null;
			var phatnomGroup = new THREE.Group();
			scene.add(phatnomGroup);
			var texture = new THREE.ImageUtils.loadTexture('img/raster.png' );  
			texture.WrapS = texture.WrapT = THREE.RepeatWrapping;
            
			var wireframe_material = new THREE.MeshBasicMaterial( { color: 0xffee99,opacity: 1,map: texture } );
			function phantomLineToStart(height){
				texture.repeat.set(1,1);
				phantomBlock=new THREE.Mesh(
					new THREE.BoxGeometry( 1, 1, 1 ),
					wireframe_material

				);
				for(var i=phatnomGroup.children.length;--i>=0;){
					phatnomGroup.remove(phatnomGroup.children[i]);
				}
				if(totalGeom)
					scene.remove(totalGeom);
				totalGeom = new THREE.Geometry();				
			}
			var totalGeom=null;
			function phantomLineTo(x,y){								
				var o=phantomBlock.clone();
				o.position.copy(new THREE.Vector3(x,y,0));	
				//o.updateMatrix();
				//totalGeom.merge( o.geometry, o.matrix );
				phatnomGroup.add(o);
			}
			function removePhantomLineTo(){
				if(totalGeom)
					scene.remove(totalGeom);
				totalGeom=null;
				for(var i=phatnomGroup.children.length;--i>=0;){
					phatnomGroup.remove(phatnomGroup.children[i]);
				}	
			}
			function post_nB(x,y,c){
				//not needed anymore
				var index=x+(y*mapSize[0]);
				
					
				o.name=index;
				scene.add(o);				
				//o.name=index;
			}
			function pBS(is,ie){//this should be the first layer only.
				var x=0;
				var maxX=mapSize[0];
				var maxY=mapSize[1];
				for(var i=ie-is+1;--i>0;){
					var index=ie-i;
					position = new pos(x=((index )%maxX),((index-x)/maxY),0);				
					matrix.compose( position, quaternion, scale );
					applyVertexColors( geom, color.setHex(index) );//limitation possible here?
					pickingGeometry.merge( geom, matrix );
					//applyVertexColors( geom, color.setHex( Math.random()*(0x00eeee)>>0 ) );
					//geometry.merge( geom, matrix );

					
				}
				//updateSceneMesh();
			
			}
			function uSP(i,threebsp,workerID,color){
			workerID++;
				if(!blockMeshSystem[ i +(workerID*i) ])newMeshSystem( i +(workerID*i) );
				threebsp.tree.allPolygons=ThreeBSP.Node.prototype.allPolygons.bind(threebsp.tree);
				threebsp.toGeometry=ThreeBSP.prototype.toGeometry.bind(threebsp);		
				
				//scene.remove( blockMeshSystem[ i +(workerID*i) ][1] );
				blockMeshSystem[ i +(workerID*i) ][0]=threebsp;
				blockMeshSystem[ i +(workerID*i) ][1] =ThreeBSP.prototype.toMesh.apply(threebsp,[new THREE.MeshLambertMaterial({shading: THREE.FlatShading,color:0xff0000})])
				//blockMeshSystem[i][1] = threebsp.toMesh(new THREE.MeshLambertMaterial({wireframe:true,shading: THREE.FlatShading,color:colorArray[i]}) );
				blockMeshSystem[ i +(workerID*i)  ][1].geometry.computeVertexNormals();				
				scene.add(blockMeshSystem[ i +(workerID*i) ][1]);	
				render();
			}
			function uS(i){
				//drawnObject = new THREE.Mesh( geometry, defaultMaterial );
				//scene.add(drawnObject);
				//geometry = new THREE.Geometry();
				return sendToAll( ["uS",[i]] );
				return "";send2SecondaryBasedOnID(i,["uS",[i]]);
				//return SecondaryOffThread.thread.postMessage([1599,SecondaryOffThread.pID,0,["uS",[i]]]);
				scene.remove( blockMeshSystem[i][1] );
				blockMeshSystem[i][1] = blockMeshSystem[i][0].toMesh( new THREE.MeshLambertMaterial({wireframe:true,shading: THREE.FlatShading,color:colorArray[i]}));
				blockMeshSystem[i][1].geometry.computeVertexNormals();				
				scene.add(blockMeshSystem[i][1]);	
			}
			function uSc(i,colorHex){
				console.log("coloring");
				return;
				scene.remove( blockMeshSystem[i][1] );
				blockMeshSystem[ i +(workerID*i) ][1] =ThreeBSP.prototype.toMesh.apply(threebsp,[new THREE.MeshLambertMaterial({shading: THREE.FlatShading})])
				blockMeshSystem[i][1] = blockMeshSystem[i][0].toMesh( new THREE.MeshLambertMaterial({wireframe:true,shading: THREE.FlatShading,color:colorHex}));
				blockMeshSystem[i][1].geometry.computeVertexNormals();				
				scene.add(blockMeshSystem[i][1]);	
				render();
			}
			function updateSceneMesh(){
				renderer.isPreloaded=true;
				//nBc=post_nB;
				drawnObject = new THREE.Mesh( geometry, defaultMaterial );	
				scene.add(drawnObject);
				//geometry.verticesNeedUpdate=true;
				geometryPlane.position.copy(drawnObject.position).sub(new THREE.Vector3(1+~mapSize[0]/2,1+~mapSize[1]/2, 1));
				render();
				geometry = new THREE.Geometry();
				camera.target=geometryPlane;
				
				
			}
			init();
			blockMeshSystem=[];
			
			var cube_geometryMesh = new THREE.BoxGeometry( 0.1, 0.1, 2 );
			function newMeshSystem(i){//for each unique type of block
				//var start_time = (new Date()).getTime();	
				if(blockMeshSystem[i])return;
				var material = new THREE.MeshBasicMaterial();
				var cube_mesh = new THREE.Mesh( cube_geometryMesh,material );
				blockMeshSystem[i] = [new ThreeBSP( cube_mesh )];
				var secondaryMesh=new THREE.Mesh( new THREE.BoxGeometry( mapSize[0],mapSize[0],2),material ) ;
				var cubeThreeBspSecond = new ThreeBSP( secondaryMesh );
				blockMeshSystem[i][0] = blockMeshSystem[i][0].subtract( cubeThreeBspSecond );
				
				var resultMesY = blockMeshSystem[i][0].toMesh( new THREE.MeshLambertMaterial());
				blockMeshSystem[i][1]=resultMesY;
				resultMesY.geometry.computeVertexNormals();
				//resultMesY.position.copy(drawnObject.position).add(new THREE.Vector3(mapSize[0]/2,mapSize[1]/2, 0));
				//position4Mesh=new THREE.Vector3().copy(resultMesY.position);
				scene.add( resultMesY );
				//console.log( 'bench: ' + ((new Date()).getTime() - start_time) + 'ms' );
				//send2SecondaryBasedOnID(i,["newMeshSystem",[i,colorHex]]);
				//SecondaryOffThread.thread.postMessage([1599,SecondaryOffThread.pID,0,["newMeshSystem",[i,colorHex]]]);
				return blockMeshSystem[i];
			}
	
	//var subtract_bsp = cube_bsp.subtract( sphere_bsp );
	//var result = subtract_bsp.toMesh( new THREE.MeshLambertMaterial({ shading: THREE.SmoothShading, map: THREE.ImageUtils.loadTexture('texture.png') }) );
	var cube_geometry,cube_mesh,cube_bsp,cubeThreeBspSecond,subtract_bsp,hiddenCubeStar=null;
			function init() {	
	
		
			}

			//
			function onMouseUp(e){
				if(!mouse.downed)return;
				render();
				pick(2,e);
				mouse.downed=false;	
				
				
			}
			var pickableMoment=true;
			function onMouseMove( e ) {
				
				mouse.x =  e.clientX;
				mouse.y =  e.clientY;				
				
				if(mouse.downed &&pickableMoment){					
					pickableMoment=false;
					
					pick(1,e);
					setTimeout(function(){pickableMoment=true;},100);
				
				}
				render();
				

			}
			extraPickActionVidget=function(){}
			var previousIndex=-1;
			function pick(mid,e) {
				var vector = new THREE.Vector3();
				vector.set(
					( e.clientX / window.innerWidth ) * 2 - 1,
					- ( e.clientY / window.innerHeight ) * 2 + 1,
					0.5 );

				vector.unproject( camera );
				var dir = vector.sub( camera.position ).normalize();
				var distance = - camera.position.z / dir.z;
				var pos = camera.position.clone().add( dir.multiplyScalar( distance ) );
				pos["x"]=Math.ceil(pos["x"]-0.5);
				pos["y"]=Math.ceil(pos["y"]-0.5);
				//var i=pos["x"]+(pos["y"]*1);
				//console.log(pos);
				/*
				if(!renderer.isPreloaded)return;//must be finished first or selection will be mucky.
				//render the picking scene off-screen
				
				renderer.render( pickingScene, camera, pickingTexture );

				gl = self.renderer.getContext();

				//read the pixel under the mouse from the texture

				var pixelBuffer = new Uint8Array( 4 );
				gl.readPixels( mouse.x, pickingTexture.height - mouse.y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixelBuffer );

				//interpret the pixel as an ID
			
				var i = ( pixelBuffer[0] << 16 ) | ( pixelBuffer[1] << 8 ) | ( pixelBuffer[2] );
				*/
				var data = pos;//new THREE.Vector3(x,((i-x)/mapSize[1]),currentHeight);
				highlightBox.position.copy( data );
				//light.position.copy(highlightBox.position);
				var x=Math.ceil(highlightBox.position["x"])
				var y=Math.ceil(highlightBox.position["y"]);
				var z=1;//
				var mapSize=maxX*maxY;
				var i=(x)+(y*maxX);
				
				//console.log("id is "+i);
				if(i==previousIndex && mid!=2)return;
				previousIndex=i;
				//console.log(i);
				//send2VidgetGETTER(["pick",i,mid]);
				
				
				//var x=((i )%mapSize[0]);
				
				
				
					
					
					send2VidgetGETTER(["pick",i,mid]);
					//highlightBox.rotation.copy( rotation );
					//highlightBox.scale.copy( scale ).add( offset );
					//highlightBox.visible = true;

				return true;

			}

			function render() {
				flashlight.rotation.copy( camera.rotation );
				flashlight.position.copy(camera.position);
				flashlight.position.z+=100;
				controls.update();
				renderer.render( scene, camera );

			}

			function send2VidgetGETTER(s,t){
				send2VidgetGETTER=mainSecondaryThree.windows[1].sendBack2Vidget;
				return send2VidgetGETTER(s,t);
			}
			
			function send2SecondaryBasedOnID(i,data){
				//~~(i/16)%16
				SecondaryOffThread[i%16].thread.postMessage([1599,SecondaryOffThread[i%16].pID,0,data]);
			}
			function sendToAll(data){
				for(var si=SecondaryOffThread.length;--si>=0;){
					SecondaryOffThread[si].thread.postMessage([1599,SecondaryOffThread[si].pID,0,data]);
				}
				
			}