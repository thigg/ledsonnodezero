var randomcolors = function () {
  function randHex(length, current) {
    current = current ? current : '';
    return length ? randHex(--length, "0123456789ABCDEF".charAt(Math.floor(Math.random() * 16)) + current) : current;
  }
  const data = randHex(64*6,'');
  sendData(data)
}
var sendData = data =>{
    var xhr = new XMLHttpRequest();
  xhr.open("POST", "/api/show", true);
  // text plain, because we're not passing an array
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send("colors="+data);
}
var wipe = function () {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/api/wipe", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
  xhr.send("");
}
var convertByteToHex = byte =>{
  return "0123456789ABCDEF".charAt(byte/16) + "0123456789ABCDEF".charAt(byte%16)
}
var convertToHex = (r,g,b) => {
  return convertByteToHex(r)+convertByteToHex(g)+convertByteToHex(b)
}
var handleFiles = files => {
  //files.forEach(console.log);
  const imgfile = files[0];
  const reader = new FileReader();
  reader.onload = function(event){
       const img = new Image();
       img.onload = function(){
           const canvas = document.createElement('canvas');
           canvas.width = img.width;
           canvas.height = img.height;
           canvas.getContext('2d').drawImage(img,0,0);
           const allpixels = canvas.getContext('2d').getImageData(0,0,8,8).data;
           console.log(allpixels);
           let hexstring = "";
           for(let i = 0; i <64;i++){
             // 4 values per pixel
             const singlepixel = allpixels.slice(i*4,i*4+4);
             const [r,g,b,alpha] = singlepixel
             hexstring += convertToHex(r,g,b);
           }
         console.log(hexstring)
         sendData(hexstring);
       }
       img.src = event.target.result;
   }
   reader.readAsDataURL(imgfile);
}
