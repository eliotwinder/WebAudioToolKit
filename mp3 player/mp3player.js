$(function(){
	window.AudioContext = window.AudioContext || window.webkitAudioContext;
	var context = new window.AudioContext();

	var audio = document.getElementById('player');
	var source = context.createMediaElementSource(audio);
	var filter = context.createBiquadFilter();
	filter.type = 'lowpass';
	filter.frequency.value = 220;

	source.connect(filter);
	filter.connect(context.destination);

	//slider formatting
	$( ".slider" ).slider({
		orientation: 'vertical'
	});

	$('#filtertype').change(function() {
		filter.type = $('#filtertype').val();
	})

	//connect sliders to values
	$('#filterfreq').slider({
		min: 1,
		max: 4.3,
		step: 0.01,
		slide: function( event, ui ) {
			filter.frequency.value = Math.pow(10, ui.value);
			$( "#filterfreqlabel" ).val( Math.pow(10, $( "#filterfreq" ).slider( "value" ) ));
		},
	});
	//set the slider on page load
	$( "#filterfreqlabel" ).val( Math.pow(10, $( "#filterfreq" ).slider( "value" ) ));

	$('#filterq').slider({
		min: 0.2,
		max: 20,
		step: 0.01,
		slide: function( event, ui ) {
			filter.Q.value = ui.value;
			$( "#filterqlabel" ).val( $( "#filterq" ).slider( "value" ) );
		}
	});

	$( "#filterqlabel" ).val( $( "#filterq" ).slider( "value" ) );
	
	$('#filtergain').slider({
		min: 0,
		max: 1,
		step: 0.01,
		slide: function( event, ui ) {
			filter.gain.value = ui.value;
			$( "#filtergainlabel" ).val( $( "#filtergain" ).slider( "value" ) );
		}
	});

	$( "#filtergainlabel" ).val( $( "#filtergain" ).slider( "value" ) );

	///////EQ
	function createEq() {
		//find our template eq
		var eqTemplate = $('#eqtemplate');

		//the place we want to put the eq sliders
		var eqHolder = $('#eqholder');

		//a holder for all the filters will make in teh for loop below
		var eqFilters = [];

		//make a list of the peaking filters we want
		var bands = [60,170,310,600,1000,3000,6000,12000,14000,16000];

		for (var i = 0; i < bands.length; i ++) {
			//set up the filter
			var filter = context.createBiquadFilter();
			filter.type = 'peaking';
			filter.frequency.value = bands[i];


			//set up the slider
			var el = eqTemplate.clone();
			var slider = el.find('.slider');
			var newClass = 'filter' + i;
			slider.addClass(newClass);
			el.find('label').text(bands[i] + ' hz');
			console.log('.filter'+i);
			console.log(slider)
			console.log($('.filter'+i));
			slider.data('frequency', bands[i]);
			slider.slider( {
				orientation: 'vertical',
				min: 0,
				max: 1.2,
				step: .01,
				
				slide: function( event, ui ) {
					
					// $( "#filtergainlabel" ).val( $( "#filtergain" ).slider( "value" ) );
				}
			});

			
			el.css('display', 'inline-block');
			eqHolder.append(el);
			
			eqFilters.push(filter);
		}
		eqTemplate.remove();
		return eqFilters;
	}

	var eqFilters = createEq();

	

});