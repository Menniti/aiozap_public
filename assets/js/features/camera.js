//CAMERA ACTION SHEET MOBILE
function action_sheet_camera(id){
	var buttons = [
		{
			text: 'Tirar foto',
			onClick: function () {
				camera(null,id);
			}
		},
		{
			text: 'Álbum de fotos',
			onClick: function () {
				camera("album",id);
			}
		},
		{
			text: 'Cancelar',
			color: 'red'
		},
	];
	myApp.actions(this,buttons);
}

//CAMERA TO LOCALSTORAGE
function camera(type,id){
	console.log(id);
	if(type=="album"){
		navigator.camera.getPicture(success, error,{quality: 75,targetWidth:800,targetHeight:600,destinationType: Camera.DestinationType.FILE_URI,sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM});
	}else{
		navigator.camera.getPicture(success, error,{quality: 75,targetWidth:800,targetHeight:600,destinationType: Camera.DestinationType.FILE_URI,sourceType: Camera.PictureSourceType.CAMERA});
	}
	function success(image) {
		console.log(image);
		alert(id);
		localStorage.setItem("camera",JSON.stringify(image));
		//upload(image,"/osphotos/"+id);
	}
	function error(message) {
		console.log('Failed because: ' + message);
	}
}

