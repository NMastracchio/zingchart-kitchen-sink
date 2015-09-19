var _hsl2rgb_ = function(iH, iS, iL) {
    var iR, iG, iB;
    if (iS == 0) {
        iR = iG = iB = iL;
  } else {
    function hue2rgb(p, q, t) {
      if (t<0) t += 1;
      if (t>1) t -= 1;
      if (t<1/6) return p+(q-p)*6*t;
      if (t<1/2) return q;
      if (t<2/3) return p+(q-p)*(2/3-t)*6;
      return p;
    }
    var q = iL<0.5?iL*(1+iS):iL+iS-iL*iS;
    var p = 2*iL-q;
    iR = hue2rgb(p, q, iH+1/3);
    iG = hue2rgb(p, q, iH);
    iB = hue2rgb(p, q, iH-1/3);
  }
  return [ZC._i_(iR*255), ZC._i_(iG*255), ZC._i_(iB*255)];
};

var componentToHex = function(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

var rgbToHex = function(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

var _luminance_ = function(sHexColor, sLight, sDark){
    var r = parseInt(sHexColor.substr(1,2),16);
    var g = parseInt(sHexColor.substr(3,2),16);
    var b = parseInt(sHexColor.substr(5,2),16);
    var yiq = ((r*299)+(g*587)+(b*114))/1000;
    return (yiq >= 128) ? sDark : sLight;
};

window.myfunc = function(p) {
    var h = (p.value-100)/200, s = 0.75, l = 0.5;
    if (h > 0.5) {
        l = 1-h;    
    }
    var rgb = _hsl2rgb_(h, s, l);
    var rgbh = _hsl2rgb_(h/2, s, l);
        return {
            backgroundColor : 'rgb('+rgb[0]+','+rgb[1]+','+rgb[2]+')',
            fontColor : _luminance_(rgbToHex(rgb[0], rgb[1], rgb[2]),"#fff", "#000"),
            //lineWidth : 1+Math.pow(2, p.value/50),
            hoverState : {
                backgroundColor : 'rgb('+rgbh[0]+','+rgbh[1]+','+rgbh[2]+')',
                fontColor : _luminance_(rgbToHex(rgb[0], rgb[1], rgb[2]),"#fff", "#000"),
                //lineWidth : 1+Math.pow(2, p.value/50)
            }
        };
}