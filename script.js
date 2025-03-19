$(window).on("load", onWindowLoad);
$(window).on("load", themeOnload);

var mtfuji;
var darkTheme;
var body;
var clouds;

function onWindowLoad(event) {
	body = $("body")[0];
	showWeather();

	if (document.URL.includes("index.html")) {
		mtfuji = $(".mt-fuji-img")[0];
		clouds = $(".clouds");
	}

	$(mtfuji).click(themeOnClick);
	// playMusic();
}

function themeOnload() {
	changeTheme(checkTheme());
}

function themeOnClick(event) {
	if (!checkIfMoonClicked(event)) {
		return;
	}
	changeTheme(checkTheme());
}

function changeTheme(darkTheme) {
	if (darkTheme === "false") {
		if (document.URL.includes("index.html")) {
			mtfuji.src = "Images/FujiSanSun.png";
			for (let i = 0; i < clouds.length; i++) {
				clouds[i].src = "Images/CloudWhite.png";
			}
		}
		$(body).addClass("white-body");
	} else {
		if (document.URL.includes("index.html")) {
			mtfuji.src = "Images/FujiSanMoon.png";
			for (let i = 0; i < clouds.length; i++) {
				clouds[i].src = "Images/CloudBlack.png";
			}
		}
		$(body).removeClass("white-body");
	}
}

function checkIfMoonClicked(event) {
	var widthLeft = mtfuji.width * 0.15;
	var widthRight = mtfuji.width * 0.65;
	var heightTop = mtfuji.height * 0.1;
	var heightBottom = mtfuji.height * 0.65;

	if ((event.offsetY < heightTop) | (event.offsetY > heightBottom)) {
		return false;
	}

	if ((event.offsetX < widthLeft) | (event.offsetX > widthRight)) {
		return false;
	}

	if (localStorage.getItem("whiteTheme") === "true")
		localStorage.setItem("whiteTheme", false);
	else {
		localStorage.setItem("whiteTheme", true);
	}

	return true;
}

function playMusic() {
	var flute = document.getElementsByTagName("audio")[1];
	var wind = document.getElementsByTagName("audio")[0];

	wind.volume = 0.3;
	flute.volume = 0.08;

	wind.play();
	flute.play();

	flute.muted = false;
	wind.muted = false;
}

function checkTheme() {
	if (localStorage.getItem("whiteTheme") === null) {
		localStorage.setItem("whiteTheme", true);
	} else {
		return localStorage.getItem("whiteTheme");
	}
}

function showWeather() {
	var weatherDisplay = $(".weather");
	var area;

	if (document.URL.includes("osaka.html")) {
		area = "Osaka";
	} else if (document.URL.includes("tokyo.html")) {
		area = "Tokyo";
	} else if (document.URL.includes("kyoto.html")) {
		area = "Kyoto";
	}

	var url =
		"https://api.openweathermap.org/data/2.5/weather?q=" +
		area +
		"&appid=8f79396cfae54035b4711465892ab9f6";

	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);

	xhr.onload = function () {
		var data = JSON.parse(xhr.response);
		weatherDisplay[0].innerHTML = "Weather in " + data.name + ":";
		weatherDisplay[1].innerHTML = data.weather[0].main;
		weatherDisplay[2].innerHTML =
			"Tempature: " + convertToCelcius(data.main.temp) + "&#176;";
		weatherDisplay[3].innerHTML = "Humdity: " + data.main.humidity + "%";
	};

	xhr.onerror = function (error) {
		console.log("Error: " + error);
	};

	xhr.send(null);
}

function convertToCelcius(kelvin) {
	return Math.floor(kelvin - 273.15);
}
