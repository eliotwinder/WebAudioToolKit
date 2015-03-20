//create audio context
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new window.AudioContext();

var source, mod;
var gain = context.createGain();

function start() {
	//create source and gain, connect them
	source = context.createOscillator();
	
	source.connect(gain);

	//create modulator and gain for it and connect them
	mod1 = context.createOscillator();
	var modAmp1 = context.createGain(); 
	mod1.connect(modAmp1);

	//connect modulator gain node to audio param 
	modAmp1.connect(gain.gain);

	//create modulator and gain for it and connect them
	mod = context.createOscillator();
	var modAmp = context.createGain(); 
	mod.connect(modAmp);

	//connect modulator gain node to audio param 
	modAmp.connect(source.frequency);

	//connect to audio context
	gain.connect(context.destination);

	//connect gain to analyser
	analyser.connect(gain);

	//source values
	source.frequency.value = 220;
	gain.gain.value = 0.2;

	//mod values
	mod.frequency.value = 1;
	modAmp.gain.value = 50;

	//mod1 values
	mod1.frequency.value = 4;
	modAmp1.gain.value = .5;

	source.start(0);
	// mod.start(0);
	mod1.start(0);
}
