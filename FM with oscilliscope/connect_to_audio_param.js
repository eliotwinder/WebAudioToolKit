$( document ).ready(function() {
	//create audio context
	window.AudioContext = window.AudioContext || window.webkitAudioContext;
	var context = new window.AudioContext();

	//module decleration
	var source =context.createOscillator();
	var gain = context.createGain();
	var mod = context.createOscillator();
	var modAmp = context.createGain();
	// var dryAnalyser = oscilloscope('dryscope', context);
	var wetAnalyser = oscilloscope('wetscope', context);
	var masterGain = context.createGain();
	var filter = context.createBiquadFilter();

	//routing
	source.connect(gain);

	gain.connect(filter);
		mod.connect(modAmp);
		modAmp.connect(source.frequency);

	filter.connect(wetAnalyser);
	wetAnalyser.connect(masterGain);
	
	masterGain.connect(context.destination);


	//source default values
	source.frequency.value = 220;
	source.type = 'sine';
	gain.gain.value = 1;

	//mod values
	mod.frequency.value = 3;
	modAmp.gain.value = 0.2;

	// filter values
	filter.type = "lowpass";
	filter.frequency.value =150;


	// buttons and input sliders
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

	$('#sourcefreq').on('input', function() {
	    source.frequency.value = $(this).val();
	});

	$('#sourcegain').on('input', function() {
	    gain.gain.value = $(this).val();
	});

	$('#modfreq').on('input', function() {
	    mod.frequency.value = $(this).val();
	});

	$('#modgain').on('input', function() {
	    modAmp.gain.value = $(this).val();
	});
});