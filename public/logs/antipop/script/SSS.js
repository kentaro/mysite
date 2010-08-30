/***************************************************************
SSS �i Style Sheets Selector �F�����ăX���[�G�X�j Ver.3.61
	Piro / outsider reflex (http://www.cc-net.or.jp/~piro/)

	�g�����͂���Ȋ����B

	<html>
		<head>
			...
			<script type="text/javascript" src="SSS.js"></script>
			...
		</head>
		<body>
			...
			<!-- �؂�ւ��t�H�[����\���������ʒu�ɑ}�� -->
			<script type="text/javascript"><!--
				SSS.writeForm();
			--></script>
			...
		</body>
	</html>

	�EMicrosoft(R) InternetExplorer 4.0 �ȍ~
	�ENetscape(R) Navigator 4.0 �ȍ~
	�ENetscape 6.2
	�EMozilla 0.9.5
	�ȏ�̃u���E�U�ł̓�����m�F�B
	����̃u���E�U�V�F�A���������͂܂����Ȃ����ƁB

	���z�̊�{�� Dicros! �̐؂�ւ��X�N���v�g�A
	Cookie �͂Ƃقق� WWW ����ƌ����Ō������T���v���i URI ���O�j��
	�Q�l�ɂ��܂����B
	�O���V��{�{�̕����̏������Ȃ�Q�l�ɂ��Ă܂��B
	�ł����� Ver.3.x �ȍ~�́A�D�T���ɂ���ď��������ꂽ���̂�
	JavaScript �f�l�̖l������ɏ��������i���Ă����������������H�j�Ƃ���
	�܂����������Ė�̕�����񂱂ƂɂȂ��Ă���܂��B
	HTML4�ȍ~�̃o�[�W�����Ŏg���Ă��������B

	Ver.3.61����A�X�^�C���V�[�g�ւ̃����N��XML�̏������߂Ƃ��Ă��o�͂���
	�悤�ɂȂ�܂����B

	�E�I�I�O�}�� / Dicros! ( http://coolo.junbi.net/dicros/ )
	�E�m��X�� / �Ƃقق� WWW ���� ( http://tohoho.wakusei.ne.jp/ )
	�EKan �� / �O���V��{�{�̕��� ( http://east.portland.ne.jp/~sigekazu/ )
	�E�D�T�� / Virgo ( http://www.skipup.com/~peace/ )
	�ȏ�̏����Ɍ����ӁI
***************************************************************/

var _SSSname = 'SSS';

function SSSFunc() { this.init(); }

SSSFunc.prototype = {
    // ---------------------------------------------------------------------
    // �ݒ蕔
    // ---------------------------------------------------------------------

    // �e�V�[�g�̃t�@�C���p�X�̋K���f�B���N�g��
    rootPath : 'http://www.kentarok.org/logs/antipop/css/',

    // �V�[�g�̐ݒ�
    initSheets : function() {
	this.setSheet('ayaya', './ayaya.css');
	this.setSheet('ayaya2', './ayaya2.css');
	this.setSheet('erotic', './erotic.css');
	this.setSheet('erotic2', './erotic2.css'); 
    },

    // NN4.x ��p�̃V�[�g�̃p�X�i�����w��j
    NN4Sheets   : './ayaya2.css',

    // �I������Ȃ������V�[�g���փV�[�g�Ƃ��ďo�͂���ꍇ�́u true �v
    modeAlt     : 'true',
    // �I���V�[�g���̃N�b�L�[�̕ێ������i���j
    cookieLimit : 30,
    // �V�[�g�̑I�����X�g���ŁA�f�t�H���g�̃V�[�g���̌�ɕ\�����镶����
    defaultStr  : '(Default)',
    // Cookie �̕ۑ��p�X�i���w�肾�Ɓu/�v�j
    cookiePath  : '/',

    // �I���t�H�[���̃��x��
    formLabel     : 'StyleSelect',
    // �I���t�H�[���̃A�N�Z�X�L�[
    formAccesskey : 'S',
    // �u�X�^�C���Ȃ��v�̖��O
    name_nostyle  : 'No-Style',
    // �u�X�^�C���L��v�̖��O�iNN4.x�Ŏg�p�j
    name_wtstyle  : 'With-Style',



    // ---------------------------------------------------------------------
    // ���s���F����ȍ~�݂͂���ɕύX���Ȃ����ƁI
    // ---------------------------------------------------------------------

    init : function() {
	this.C  = new CookieFunc();
	this.UA = new UAFunc();

	this.sheets = [];

	this.counter       = 0;
	this.defaultIndex  = 1;
	this.forceIndex  = -1;
	this.formContainer = (document.layers) ? 'form|name|StyleSelForm|action|' : '' ;
	this.param         = unescape(location.search).match(/[^?]*$/).toString().replace(/-FORCE.*/, '');
    },

    // �X�^�C���̔��ʋy�� link �v�f�̏o��
    writeHeader : function() {

	this.setSheet(this.name_nostyle);
	this.initSheets();
	this.NN4Num = this.setSheet(this.name_wtstyle, this.NN4Sheets);

	// �I���X�^�C���̏����擾�i with Cookie �j
	this.selectedId = (this.C.getValue('Selected')) ? this.C.getValue('Selected') : this.sheets[this.defaultIndex].id ;
	if (this.sheets[this.param] > -1) {
	    this.selectedId = this.param;
	    if (/.*-FORCE#?.*/.test(location.search)) this.putCookie(this.param);
	}

	// �X�^�C�����ʂ� link �v�f�̏o��
	if (this.UA.NN4) {
	    if (this.NN4Sheets != 'none' &&
		this.selectedId == this.sheets[this.NN4Num].id) {
		this.sheets[this.NN4Num].selected = true;
		this.makeLink(true, this.sheets[this.NN4Num].id, this.NN4Sheets);
	    } else this.sheets[0].selected = true;
	} else {
	    var i = (this.forceIndex > -1) ? this.forceIndex :
		(this.sheets[this.selectedId] >= 0) ? this.sheets[this.selectedId] :
		this.defaultIndex ;
	    this.sheets[i].selected = true;
	    for (i = 1; i != this.NN4Num; i++)
		this.makeLink(this.sheets[i].selected, this.sheets[i].id, this.sheets[i].path, this.sheets[i].media);
	}
    },

    // linking stylesheet
    makeLink : function(selected, title, paths, media) {
	if (!paths) return;

	var altStr = (selected) ? '' : 'alternate ' ,
	attsStr = (title) ? '|title|'+title : '' ,
	splitedPaths = paths.split(','),
	path;
	attsStr += (media) ? '|media|'+media : '' ;

	var PI,
	PIvalue = ' type="text/css"'+
	    (media ? ' media="'+media+'"' : '')+
	    (selected ? ' alternate="yes"' : '')+
	    (title ? ' title="'+title+'"' : '');

	for (var i in splitedPaths) {
	    path = (splitedPaths[i].match(/^[^\/]+:\/\//)) ? splitedPaths[i] : this.rootPath+splitedPaths[i] ;
	    if (this.modeAlt || selected) {
		document.write(
		    makeNode('link|type|text/css|rel|'+altStr+'stylesheet|href|'+path+attsStr)
		);

		if (document.createProcessingInstruction &&
		    !((this.UA.NS6 || this.UA.NS60) && this.UA.geckoVer < 20020514)) {
		    try {
			PI = document.createProcessingInstruction('xml-stylesheet', 'href="'+path+'"'+PIvalue);
			document.insertBefore(PI, document.documentElement);
		    } catch(e) {
		    }
		}
	    }
	}
    },


    // �I���t�H�[���̏o��
    writeForm : function() {
	var label_content   = '',
	key_label       = '';

	if (this.formLabel) label_content = this.formLabel+':';
	if (this.formAccesskey)
	    key_label = '|accesskey|'+this.formAccesskey;

	this.styleForm = (this.forceIndex > -1 || (this.UA.NN4 && this.NN4Sheets == 'none')) ? '' :
	    makeNode('div|id|StyleSel',
		     makeNode('label'+key_label,
			      label_content+
			      makeNode('select|id|Styles|name|Styles|onchange|'+_SSSname+'.formApply(this);', this.makeOptions())
			     )
		    );

	document.write(makeNode(this.formContainer, this.styleForm));
    },

    // ���M
    formApply : function(obj) {
	this.putCookie(this.sheets[obj.options[obj.selectedIndex].value].id);
	location.href = location.href.match(/^[^#?]*/);
    },

    putCookie : function(value) {
	this.C.setValue('Selected', value, this.cookieLimit, this.cookiePath);
    },


    makeOptions : function() {
	var options = '',
	selectContent = '';

	if (this.UA.NN4) selectContent = this.makeOption(this.NN4Num);
	else {
	    for (var n = 1; n != this.NN4Num; n++) {
		options += this.makeOption(n);
		if (this.sheets[n].group != this.sheets[n+1].group ||
		    n == this.NN4Num-1) {
		    selectContent += (options && this.sheets[n].group && !this.UA.NS6) ? makeNode('optgroup|label|'+this.sheets[n].group, options) : options ;
		    options = '';
		}
	    }
	}

	return(selectContent+this.makeOption(0));
    },

    makeOption : function(num) {
	if (this.sheets[num].hidden) return '';
	var selAtt = (this.sheets[num].selected) ? '|selected|selected' : '' ;
	var defStr = (num == this.defaultIndex) ? this.defaultStr : '' ;
	return(makeNode('option|value|'+num+'|label|'+this.sheets[num].label+selAtt, this.sheets[num].id+defStr));
    },

    // �V�[�g��`
    setSheet : function(label, path, media, flags) {
	var n = this.counter;
	if (flags && flags.match(/\bdefault\b/i)) this.defaultIndex = n;
	if (flags && flags.match(/\bforce\b/i)) this.forceIndex = n;

	this.sheets[n] = new Array();

	this.sheets[label]      = n;
	this.sheets[n].id       = this.sheets[n].label = label;
	this.sheets[n].path     = path;
	this.sheets[n].group    = '';
	this.sheets[n].media    = (media) ? media : false ;
	this.sheets[n].selected = false;
	if (/.*@.*/.test(label)) {
	    this.sheets[n].label = label.match(/^[^@]*/);
	    this.sheets[n].group = label.replace(/^[^@]*@/, '');
	}
	this.sheets[n].hidden   = (flags && flags.match(/\bhidden\b/i));

	return this.counter++;
    }
}


// UA ���ʁi�ėp�j
function UAFunc() {
    var uaStr = navigator.userAgent;

    this.IE6  = (uaStr.match(/ MSIE 6/));
    this.IE55 = (uaStr.match(/ MSIE 5.5/));
    this.IE5  = (uaStr.match(/ MSIE 5/) && !this.IE55);
    this.NS60 = (uaStr.match(/Netscape6\/6\.0/));
    this.NS6  = (uaStr.match(/Netscape6\/6\./));
    this.Moz  = (uaStr.match(/Gecko/));
    this.NN4  = (document.layers);

    this.geckoVer = (this.Moz || this.NS6 || this.NS60) ? parseFloat(uaStr.match(/Gecko\/\d{8}/).toString().substring(6, 14)) : -1 ;

    this.MacIE5  = (uaStr.match(/ Mac/) && this.IE5);
    this.overIE5 = (this.IE6 || this.IE55 || this.IE5);
    this.IE4     = (!this.overIE5 && document.all);

}


// �N�b�L�[�֌W�̏����i�ėp�j
function CookieFunc() {
    this.cookieStr = (document.cookie) ? document.cookie.split(';') : [] ;

    this.getValue = function(name) {
	var cookie = this.cookieStr;
	for (var i = 0; i < cookie.length; i++) {
	    if (cookie[i].split('=')[0].replace(/^\s+|\s+$/g, '') == name)
		return unescape(cookie[i].split('=')[1].replace(/^\s+|\s+$/g, ''));
	}
	return '';
    };

    this.setValue = function(name, data, limit, path) {
	if (!path) path = '/';

	if (!limit) limit = 0;
	var today = new Date();
	today.setTime(today.getTime()+1000*60*60*24*limit);
	var date = ';expires='+today.toGMTString();

	document.cookie = name+'='+escape(data)+';path='+path+date;
    };
}


// �v�f�𐶐��i�ėp�j
function makeNode(param, content) {
    if (!param) return content;
    var element = param,
    attsStr = '';
    if (param.match(/\|/)) {
	var atts = param.split('|');
	element = atts[0];
	for (var i = 1; i < atts.length; i += 2)
	    attsStr += ' '+atts[i]+'="'+atts[i+1]+'"';
    }
    return (!content) ?
	'<'+element+attsStr+' />\n' :
	'<'+element+attsStr+'>'+content+'<\/'+element+'>\n' ;
}


eval('var '+_SSSname+' = new SSSFunc();'+_SSSname+'.writeHeader();');
