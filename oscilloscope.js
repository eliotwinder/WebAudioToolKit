//canvas property variables
var canvasWidth = 700;
var canvasHeight = 150;

//create analyser
var analyser = context.createAnalyser();
analyser.connect(gain);

//create variable for the info coming from the analyser, and put it into a UInt8Array so that it can hold the data 
analyser.fftSize = 2048;
var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);

function draw() {

		//clear canvas and  draw a bg
		canvasCtx.clearRect(0, 0, canvasWidth, canvasHeight);
		canvasCtx.fillStyle = 'rgb(100, 200, 200)';
		canvasCtx.fillRect(0, 0, canvasWidth, canvasHeight);
	}

$( document ).ready(function() {
	//set up canvas
	var canvas = document.getElementById("scope");
	window.canvasCtx = canvas.getContext("2d");



	//create analyser
	var analyser = context.createAnalyser();

	//connect gain to analyser
	// analyser.connect(gain);

	//create variable for the info coming from the analyser, and put it into a UInt8Array so that it can hold the data 
	analyser.fftSize = 2048;
	var bufferLength = analyser.frequencyBinCount;
	var dataArray = new Uint8Array(bufferLength);

	//set a variable to the array the data is coming from
	audioData = analyser.getByteTimeDomainData(dataArray);

	//clear canvas and  draw a bg
	canvasCtx.clearRect(0, 0, canvasWidth, canvasHeight);
	canvasCtx.fillStyle = 'rgb(0, 0, 0)';
	canvasCtx.fillRect(0, 0, canvasWidth, canvasHeight);

	//draw the oscilloscope function
	

});