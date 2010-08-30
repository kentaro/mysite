	var ImageWidth  =  1;
	var ImageHeight =  1;
	var ScriptUrl   = 'http://antipop.zapto.org/cgi-bin/analysis_ocn/log4.cgi';
	var CounterName = 'antipop_ocn';

	var Tag = '<img' +
				' src="'   + ScriptUrl   + '?' + CounterName + '@' + document.referrer + '"' +
				' width='  + ImageWidth  +
				' height=' + ImageHeight +
	          ' />';

	document.write(Tag);
