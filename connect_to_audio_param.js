//create audio context
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new window.AudioContext();

//module decleration
var source =context.createOscillator();
var gain = context.createGain();
var mod = context.createOscillator();
var modAmp = context.createGain();
var analyser =context.createAnalyser();

//routing
source.connect(gain);

gain.connect(analyser);
	mod.connect(modAmp);
	modAmp.connect(source.frequency);
// analyser.connect(context.destination);


//source default values
source.frequency.value = 220;
gain.gain.value = 1;

//mod values
mod.frequency.value = 3;
modAmp.gain.value = .2;

//analyser values
analyser.maxDecibels = -50;

//for jquery document.ready
function modulatorReady(){
$('#startsource').click(function(){
   		source.start(0);
	});

	$('#startmod').click(function(){
	    mod.start(0);
	});

	$('#startboth').click(function(){
	  	source.start(0);
	   	mod.start(0);
	});

	$('#stopsource').click(function(){
	    source.stop(0);
	});

	$('#stopmod').click(function(){
	    mod.stop(0);
	});

	$('#stopboth').click(function(){
	    source.stop(0);
	    mod.stop(0);
	});
}