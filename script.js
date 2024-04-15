const windowTypes = {
	"notification": "УВЕДОМЛЕНИЕ",
}

const windows = {
	"prolog": {
		title: windowTypes["notification"],
		description: `Вы стали участником секретного квеста <b>Храбрость слабых</b>.`,
		actions: {
			accept: false,
			deny: false
		}
	},
	"start-1": {
		title: windowTypes["notification"],
		description: `Вы приобрели квалификацию <b>Игрока</b>.
					<br><br>Вы принимаете квест?`,
		actions: {
			accept: false,
			deny: false
		}
	},
	"start-2": {
		title: windowTypes["notification"],
		description: `Твое сердце остановится через <b style="color:red;">0.02 секунды</b>,
					<br>
					если ты выберишь <b style="color:red;">НЕТ</b>.
					<br><br>Вы принимаете квест?`,
		actions: {
			accept: true,
			deny: true
		}
	},
	"start-3": {
		title: "Доступ подтвержден",
		description: `Благодарим за содействие!
					<br>
					твои персоnal данные has been приняты. Access to the <b style="color: red;">Internet Protocol</b> is получен.
					<br><br>Вы приadasdнимаете кв?ест^ Выгрузка информации`,
		actions: {
			accept: false,
			deny: false
		}
	}
}
const modal = document.createElement("div");
modal.classList.add("window");
modal.innerHTML  = `<div class="border-top"></div>
					<div class="border-left"></div>
					<div class="border-right"></div>
					<div class="border-bottom"></div>

					<div class="content">
						<div class="bar">
							<div class="badge"><i class="bi bi-exclamation-circle"></i></div>
							<h1 class="title">%window name%</h1>
						</div>
						<div class="description">
							%description%
						</div>
						<div class="actions">
							<button class="accept">Да</button>
							<button class="deny">Нет</button>
						</div>
						<div class="progressBar">
							<span class="progress"></span>
						</div>
					</div>`;
var modwin = {};
function updateWindowModal(){
	modwin = {
		parent: modal,
		content: modal.querySelector(".content"),
		actions: {
			accept: modal.querySelector(".actions .accept"),
			deny: modal.querySelector(".actions .deny")
		},
		title: modal.querySelector(".title"),
		description: modal.querySelector(".description")
	}
}
updateWindowModal();
document.querySelector(".modals").appendChild(modal);

let plot = 101;

/*
101 - сюжет НЕ начат,
200 - сюжет идет,
204 - сюжет НЕ идет, из-за ориентации portrait,
500 - неизвестный еррор.
*/

document.addEventListener("DOMContentLoaded", function(){
	var mql = window. matchMedia("(orientation: portrait)");

	if(mql. matches) {
		plot = 204;
		console.log("Пожалуйста, поверните ориентацию экрана на ландшафтный (landscape).");
		document.querySelector("body").innerHTML = `<h1 style="font-size:30px;color:red;text-align:center;">Пожалуйста, поверните устройство в ландшафтную ориентацию и перезагрузите страницу</h1>`;
		return;
	} else {
		plot = 200;
		console.log("Сюжет начат...)");
	}

	var videoIntro = document.querySelector(".intro");
	var video = document.getElementById("video-1");

	video.play();

	video.onended = function() {
		videoIntro.parentNode.removeChild(videoIntro);
		console.log("Видео завершено.");
		chNotification("prolog", windows["prolog"]);
	};
});

var modals = document.querySelector(".modals");

function chNotification(id, data){
	modals.appendChild(modal);
	modwin.title.innerHTML = data.title;
	modwin.description.innerHTML = data.description;
	modwin.parent.id = id;

	if(data.actions.accept && data.actions.deny) {
		if(!modwin.actions.accept.classList.contains("visible")){
			modwin.actions.accept.classList.toggle("visible");
		}
		if(!modwin.actions.deny.classList.contains("visible")){
			modwin.actions.deny.classList.toggle("visible");
		}
	}else if(!(data.actions.accept && data.actions.deny)) {
		modwin.actions.accept.classList.remove("visible");
		modwin.actions.deny.classList.remove("visible");
	}else if(data.actions.accept) {
		if(!modwin.actions.accept.classList.contains("visible")){
			modwin.actions.accept.classList.toggle("visible");
		}
		modwin.actions.deny.classList.remove("visible");
	}else{
		if(!modwin.actions.deny.classList.contains("visible")){
			modwin.actions.deny.classList.toggle("visible");
		}
		modwin.actions.accept.classList.remove("visible");
	}

	if(!modal.classList.contains("start")){
		modal.classList.toggle("start");
	}
	nextPlot(id, data.actions.accept && data.actions.deny ? true : false);
}

function nextPlot(id, hasChoice = false){
	console.log("has choice: " + hasChoice)
	let delay = 2500;
	switch(id){
		case "prolog":
			delay = 2200;
			return setTimeout(function(){
				modals.innerHTML = "";
				chNotification("start-1", windows["start-1"]);
			}, delay);
		case "start-1":
			delay = 2000;
			return setTimeout(function(){
				modals.innerHTML = "";
				chNotification("start-2", windows["start-2"]);
			}, delay);
		case "start-2":
			if(hasChoice){
				modwin.actions.accept.addEventListener("click", function(e){
					e.preventDefault();
					chNotification("start-3", windows["start-3"]);
				})
				modwin.actions.deny.addEventListener("click", function(e){
					e.preventDefault();
					window.location.href = "https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Ftakeout.google.com%2F%3Fhl%3Dru&followup=https%3A%2F%2Ftakeout.google.com%2F%3Fhl%3Dru&hl=ru&ifkv=ARZ0qKInjuen74k3UNCZHJrRYPKwbdLUN_BY8UG04kc7QLYbEZgIs5Eo-P1aN15M3sDs-11rAEk9cg&osid=1&passive=1209600&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S755098695%3A1713210490600145&theme=mn&ddm=0";
				})
			}
			break;
			case "start-3":
				delay = 31000;
				return setTimeout(function(){
					document.querySelector("body").innerHTML = `<div class="intro">
					<div class="video">
						<video class="vmedia" id="video-1" src="stock.webm" muted autoplay loop></video>
					</div>
				</div>`;
				}, delay);
				
				break;
	}
}