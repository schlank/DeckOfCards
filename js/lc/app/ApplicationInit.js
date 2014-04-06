
//Ext.example.shortBogusMarkup = '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sed metus nibh, sodales a, porta at, vulputate eget, dui. Pellentesque ut nisl. Maecenas tortor turpis, interdum non, sodales non, iaculis ac, lacus. Vestibulum auctor, tortor quis iaculis malesuada, libero lectus bibendum purus, sit amet tincidunt quam turpis vel lacus. In pellentesque nisl non sem. Suspendisse nunc sem, pretium eget, cursus a, fringilla vel, urna.';
//Ext.example.bogusMarkup = '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sed metus nibh, sodales a, porta at, vulputate eget, dui. Pellentesque ut nisl. Maecenas tortor turpis, interdum non, sodales non, iaculis ac, lacus. Vestibulum auctor, tortor quis iaculis malesuada, libero lectus bibendum purus, sit amet tincidunt quam turpis vel lacus. In pellentesque nisl non sem. Suspendisse nunc sem, pretium eget, cursus a, fringilla vel, urna.<br/><br/>Aliquam commodo ullamcorper erat. Nullam vel justo in neque porttitor laoreet. Aenean lacus dui, consequat eu, adipiscing eget, nonummy non, nisi. Morbi nunc est, dignissim non, ornare sed, luctus eu, massa. Vivamus eget quam. Vivamus tincidunt diam nec urna. Curabitur velit.</p>';
//
//Ext.onReady(Ext.example.init, Ext.example);


lc.log = function() {
    console.log(arguments);
};
Ext.Loader.setConfig({enabled:true});
// old school cookie functions
var Cookies = {};
Cookies.set = function(name, value){
     var argv = arguments;
     var argc = arguments.length;
     var expires = (argc > 2) ? argv[2] : null;
     var path = (argc > 3) ? argv[3] : '/';
     var domain = (argc > 4) ? argv[4] : null;
     var secure = (argc > 5) ? argv[5] : false;
     document.cookie = name + "=" + escape (value) +
       ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) +
       ((path == null) ? "" : ("; path=" + path)) +
       ((domain == null) ? "" : ("; domain=" + domain)) +
       ((secure == true) ? "; secure" : "");
};

Cookies.get = function(name){
	var arg = name + "=";
	var alen = arg.length;
	var clen = document.cookie.length;
	var i = 0;
	var j = 0;
	while(i < clen){
		j = i + alen;
		if (document.cookie.substring(i, j) == arg)
			return Cookies.getCookieVal(j);
		i = document.cookie.indexOf(" ", i) + 1;
		if(i == 0)
			break;
	}
	return null;
};

Cookies.clear = function(name) {
  if(Cookies.get(name)){
    document.cookie = name + "=" +
    "; expires=Thu, 01-Jan-70 00:00:01 GMT";
  }
};

Cookies.getCookieVal = function(offset){
   var endstr = document.cookie.indexOf(";", offset);
   if(endstr == -1){
       endstr = document.cookie.length;
   }
   return unescape(document.cookie.substring(offset, endstr));
};


Ext.BLANK_IMAGE_URL = '/images/ext/default/s.gif';

var ApplicationContext = new lc.ApplicationContext();



Ext.apply(Ext.form.VTypes, {
  password: function(val, field) {
    if (field.initialPassField) {
      var pwd = Ext.getCmp(field.initialPassField);
      return (val == pwd.getValue());
    }
    return true;
  },
  passwordText: 'What are you doing?<br/>The passwords entered do not match!'
});

Ext.onReady(function(){
    lc.debug = true;
    var config = lc.config.ApplicationConfig;
    //The Start of the LC JS Application
    ApplicationContext.init(config);


 
});