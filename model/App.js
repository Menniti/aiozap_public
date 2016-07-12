function App() {
	this.checkSetup();
	this.body = $('#body_template');
	this.msgDeleteDefault = "Deseja realmente apagar?";
	this.msgErrorDefault = "Ocorreu um erro";
	this.msgSuccessDefault = "Registro atualizado com sucesso";
	this.msgDefaultTitle = "Aviso";
	this.msgSuccessForm = "Formulário enviado com sucesso";
	this.initFirebase();
	this.msgErrors = [];
	this.msgErrors['auth/user-not-found'] = "Nenhum usuário registrado com esse email";
	this.msgErrors['auth/wrong-password'] = "Senha incorreta";
	this.msgErrors['auth/weak-password'] = "A senha deve ter pelo menos 6 caracteres";
	this.msgErrors['auth/email-already-in-use'] = "Esse email já consta como registrado";
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
