/***************************************************************
SSS （ Style Sheets Selector ：略してスリーエス） Ver.3.61
	Piro / outsider reflex (http://www.cc-net.or.jp/~piro/)

	使い方はこんな感じ。

	<html>
		<head>
			...
			<script type="text/javascript" src="SSS.js"></script>
			...
		</head>
		<body>
			...
			<!-- 切り替えフォームを表示したい位置に挿入 -->
			<script type="text/javascript"><!--
				SSS.writeForm();
			--></script>
			...
		</body>
	</html>

	・Microsoft(R) InternetExplorer 4.0 以降
	・Netscape(R) Navigator 4.0 以降
	・Netscape 6.2
	・Mozilla 0.9.5
	以上のブラウザでの動作を確認。
	現状のブラウザシェアを見る限りはまぁ問題ないかと。

	発想の基本は Dicros! の切り替えスクリプト、
	Cookie はとほほの WWW 入門と検索で見つけたサンプル（ URI 失念）を
	参考にしました。
	三日坊主＋＋の部屋の情報もかなり参考にしてます。
	でもって Ver.3.x 以降は、優乃氏によって書き直されたものを
	JavaScript 素人の僕がさらに書き直す（っていうか汚しただけ？）という
	まったくもって訳の分からんことになっております。
	HTML4以降のバージョンで使ってください。

	Ver.3.61から、スタイルシートへのリンクをXMLの処理命令としても出力する
	ようになりました。

	・オオグマ氏 / Dicros! ( http://coolo.junbi.net/dicros/ )
	・杜甫々氏 / とほほの WWW 入門 ( http://tohoho.wakusei.ne.jp/ )
	・Kan 氏 / 三日坊主＋＋の部屋 ( http://east.portland.ne.jp/~sigekazu/ )
	・優乃氏 / Virgo ( http://www.skipup.com/~peace/ )
	以上の諸氏に激感謝！
***************************************************************/

var _SSSname = 'SSS';

function SSSFunc() { this.init(); }

SSSFunc.prototype = {
    // ---------------------------------------------------------------------
    // 設定部
    // ---------------------------------------------------------------------

    // 各シートのファイルパスの規準ディレクトリ
    rootPath : 'http://www.kentarok.org/logs/antipop/css/',

    // シートの設定
    initSheets : function() {
	this.setSheet('ayaya', './ayaya.css');
	this.setSheet('ayaya2', './ayaya2.css');
	this.setSheet('erotic', './erotic.css');
	this.setSheet('erotic2', './erotic2.css'); 
    },

    // NN4.x 専用のシートのパス（複数指定可）
    NN4Sheets   : './ayaya2.css',

    // 選択されなかったシートを代替シートとして出力する場合は「 true 」
    modeAlt     : 'true',
    // 選択シート情報のクッキーの保持期限（日）
    cookieLimit : 30,
    // シートの選択リスト中で、デフォルトのシート名の後に表示する文字列
    defaultStr  : '(Default)',
    // Cookie の保存パス（無指定だと「/」）
    cookiePath  : '/',

    // 選択フォームのラベル
    formLabel     : 'StyleSelect',
    // 選択フォームのアクセスキー
    formAccesskey : 'S',
    // 「スタイルなし」の名前
    name_nostyle  : 'No-Style',
    // 「スタイル有り」の名前（NN4.xで使用）
    name_wtstyle  : 'With-Style',



    // ---------------------------------------------------------------------
    // 実行部：これ以降はみだりに変更しないこと！
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

    // スタイルの判別及び link 要素の出力
    writeHeader : function() {

	this.setSheet(this.name_nostyle);
	this.initSheets();
	this.NN4Num = this.setSheet(this.name_wtstyle, this.NN4Sheets);

	// 選択スタイルの情報を取得（ with Cookie ）
	this.selectedId = (this.C.getValue('Selected')) ? this.C.getValue('Selected') : this.sheets[this.defaultIndex].id ;
	if (this.sheets[this.param] > -1) {
	    this.selectedId = this.param;
	    if (/.*-FORCE#?.*/.test(location.search)) this.putCookie(this.param);
	}

	// スタイル判別と link 要素の出力
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


    // 選択フォームの出力
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

    // 送信
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

    // シート定義
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


// UA 判別（汎用）
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


// クッキー関係の処理（汎用）
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


// 要素を生成（汎用）
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
