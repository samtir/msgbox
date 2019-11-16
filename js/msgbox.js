class msgbox{
	constructor(){

	}
	loader(){
		return `<div class="loader"></div>`;
	}
	linePreloader(){
		return `<div class="line-preload"></div>`;
	}
	toastBody(data){
		const bodyToast = document.createElement("div");
		bodyToast.classList.add("msg-toast","msg-toast-"+data.type);
		bodyToast.innerHTML = `			
				<div class="msg-toast-icon"><i class="${data.icon} fa-2x text-${data.type}"></i></div>
				<div class="msg-toast-content">
					<p class="msg-toast-title">${data.title}</p>
					<p class="msg-toast-message">${data.message}</p>
				</div>
				<div class="msg-toast-close">
					<i class="fas fa-times" id="btnCloseToast"></i>
				</div>`;
		return bodyToast;
	}
	removeToast(elem,delay){
		setTimeout(()=>{
			elem.classList.add("slideRight");
			elem.addEventListener("animationend", ()=>{
				elem.remove();
			},false);
			// setTimeout(()=>{
			// 	elem.remove();
			// },300)
		},(delay) ? delay : 5000)
	}	
	toast(data){
		let toast = undefined,
		contToast = document.createElement("div");

		contToast.classList.add("msg-toast-container");
		contToast.id = "msgToastContainer";
		contToast.innerHTML = `<div class="msg-toast-cell" id="msgToastCell"></div>`;
	
		if (data.type == "success") {
			data.icon = (data.icon) ? data.icon : "fas fa-check-circle";
			data.title = (data.title) ? data.title : "Success" ;
			data.message = (data.message) ? data.message : "Texto de relleno";
			toast = this.toastBody(data);
		}else if (data.type == "info") {
			data.icon = (data.icon) ? data.icon : "fas fa-info-circle";
			data.title = (data.title) ? data.title : "Info" ;
			data.message = (data.message) ? data.message : "Texto de relleno";
			toast = this.toastBody(data);
		}else if (data.type == "error") {
			data.type = "danger";
			data.icon = (data.icon) ? data.icon : "fas fa-times-circle";
			data.title = (data.title) ? data.title : "danger" ;
			data.message = (data.message) ? data.message : "Texto de relleno";
			toast = this.toastBody(data);
		}else if (data.type == "warning") {
			data.icon = (data.icon) ? data.icon : "fas fa-exclamation-circle";
			data.title = (data.title) ? data.title : "warning" ;
			data.message = (data.message) ? data.message : "Texto de relleno";
			toast = this.toastBody(data);
		}
		
		const callToast = this.toastBody(data);
		
		if (document.getElementById("msgToastCell")) {
			document.getElementById("msgToastCell").appendChild(callToast);
			this.removeToast(callToast,data.delay);
		}else{			
			document.body.appendChild(contToast);
			document.getElementById("msgToastCell").appendChild(callToast);
			this.removeToast(callToast,data.delay);
		}
	}
	msgboxbody(data){
		let contElemt = document.createElement("div");
		let container = "";
		contElemt.classList.add("msgbox");
		contElemt.id= "msgbox";

		if (data.type == "loading") {
			container = `			
			<div class="msgbox-container" id="msgboxContainer">				
				<div class="msgbox-body">				
					${(data.typeloading && data.typeloading == "line") ? this.linePreloader() : this.loader() }
					<span>${(data.message == false ) ? "" : (data.message) ? data.message : "Procesando ..."  }</span>
				</div>				
			</div>`;
		}else{
			container = `			
			<div class="msgbox-container" id="msgboxContainer">
				<div class="msgbox-header">		
					${(data.icon == false) ? "" : `<i class="${data.typeicon} fa-6x text-${data.type}"></i>` }
				</div>
				<div class="msgbox-body">				
					<h4 class="title">${(data.title) ? data.title : "" }</h4>
					<p class="message">${(data.message) ? data.message : "" }</p>
				</div>
				<div class="msgbox-footer">
					${(data.button == false) ? "" : `<button id="btnCloseMgsbox" class="btn btn-${data.type}">OK</button>`}
				</div>
			</div>`;
		}		
		contElemt.innerHTML = container;
		return contElemt;
	}
	display(data){
		let msg;
		if (data.type == "success") {			
			data.type = "success";
			data.typeicon = "far fa-check-circle";						
			msg = this.msgboxbody(data);
		}else if(data.type == "warning"){
			data.type = "warning";
			data.typeicon = "fas fa-exclamation-triangle";
			msg = this.msgboxbody(data);
		}else if(data.type == "info"){
			data.type = "info";
			data.typeicon = "fas fa-info-circle";
			msg = this.msgboxbody(data);
		}else if (data.type == "error") {
			data.type = "danger";
			data.typeicon = "far fa-times-circle";
			msg = this.msgboxbody(data);
		}else if(data.type == "loading"){
			msg = this.msgboxbody(data);
		}
		document.body.style.overflow = 'hidden'; 
		document.body.appendChild(msg)
		// return msg;
	}
}
document.body.addEventListener("click",e=>{
	if (e.target.id === "btnCloseMgsbox") {
		document.body.style.overflow = 'initial';
		let elem = document.getElementById("msgboxContainer");
		elem.classList.add("zoomOut");
		elem.addEventListener("animationend", ()=>{
			document.getElementById("msgbox").remove();
		},false)		
	}
})
document.body.addEventListener("click", e=>{
	let element = e.target.parentElement.parentElement;
	if (e.target.id === "btnCloseToast") {
		element.classList.add("slideRight");
		element.addEventListener("animationend", ()=>{
			element.remove();
		},true);
	}
})
msgbox = new msgbox();

btnShowmodal.addEventListener("click", evnt=>{
	msgbox.display({
		type:"success"		
	});
})
btnShowloading.addEventListener("click", evnt=>{
	msgbox.display({
		type:"loading"		
	});
})
let i = 1;
btnshowToast.addEventListener("click", evnt=>{
	let rand = Math.floor(Math.random()*4);
	if (rand == 0) {
		msgbox.toast({type:"success",message:"Click nuero "+i});
	}else if(rand == 1){
		msgbox.toast({type:"error",message:"Click nuero "+i});
	}else if(rand == 2){
		msgbox.toast({type:"info",message:"Click nuero "+i});
	}else if(rand == 3){
		msgbox.toast({type:"warning",message:"Click nuero "+i});
	}	
	i++;
})