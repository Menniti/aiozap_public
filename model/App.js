function App() {
	this.checkSetup();
	this.body = $('#body_template');
	this.msgDeleteDefault = "Deseja realmente apagar?";
	this.msgErrorDefault = "Ocorreu um erro";
	this.msgSuccessDefault = "Registro atualizado com sucesso";
	this.msgDefaultTitle = "Aviso";
	this.msgSuccessForm = "Formulário enviado com sucesso";
	this.initFirebase();
}

App.prototype.initFirebase = function() {
	this.auth = firebase.auth();
	this.database = firebase.database();
	this.storage = firebase.storage();
	this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
};

App.prototype.onAuthStateChanged = function(user) {
	if(user){
		this.HomeScreen();
	}else{
		this.HomeScreen();
	}
};

App.prototype.checkLogin = function() {
	if(this.auth.currentUser){
		return true;
	}else{
		return false;
	}
};

App.prototype.checkSetup = function() {
	if (!window.firebase || !(firebase.app instanceof Function) || !window.config) {
		show_error(this.msgErrorDefault);
	} else if (config.storageBucket === '') {
		show_error(this.msgErrorDefault);
	}
};
