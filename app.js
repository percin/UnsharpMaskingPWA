

//programa özel verilerin saklanması için var nesnesi.



var amount;
var radius;
var threshold;
var orjinalresim=document.getElementById("Resim1");
var canvas = document.getElementById("kanvas");
var canvas2 = document.getElementById("kanvas2");
var bilgi=document.getElementById("temelyapi");
var canvascontent = canvas.getContext('2d');
var canvascontent2 = canvas2.getContext('2d');
var donwloadbutton= document.getElementById("download");
var reader=new FileReader();
var a;
var b;
var input;




//worker ile ilgili kodlar
var worker = new Worker('maske.js');

worker.addEventListener('message', function(e) {
  console.log('Worker said: ', e.data);

  if(e.data.type==1)
  {
    canvascontent2.putImageData(e.data.data, 0, 0);
  }
  else
  {
    canvascontent.putImageData(e.data.data, 0, 0);
  }
  
}, false);



//slider ile ilgili kodlar

var slider = document.getElementById("myRange");
var output = document.getElementById("demo*");
output.innerHTML = slider.value/100; // Display the default slider value
amount =slider.value/100;    
// Slider değiştikce deger güncellenir
slider.onchange = function() 
{
    
    amount=this.value/200;
    worker.postMessage({amount:amount,radius:radius,threshold:threshold,type:2});
    

}

slider.oninput=function()
{
  output.innerHTML = this.value/100;
}

slider = document.getElementById("radiusslider");
var output2 = document.getElementById("demo**");
output2.innerHTML = slider.value; // Display the default slider value
radius =slider.value;    
// Slider değiştikce deger güncellenir
slider.onchange = function() 
{
    
    radius=this.value;
    worker.postMessage({amount:amount,radius:radius,threshold:threshold,type:2});

}

slider.oninput=function()
{
  output2.innerHTML = this.value;
}


slider = document.getElementById("thresholdslider");
var output3 = document.getElementById("demo***");
output3.innerHTML = slider.value/100; // Display the default slider value
threshold =slider.value/100;    
// Slider değiştikce deger güncellenir
slider.onchange = function() 
{
    
    threshold=this.value/100;
    worker.postMessage({amount:amount,radius:radius,threshold:threshold,type:2});

}

slider.oninput=function()
{
  output3.innerHTML = this.value/100;
}

//Geliştirici modu


function onClickHandler(){

  var chk=document.getElementById("box").checked;
  if(chk)
  {
    kanvas2.style.display="block";
  }
  else
  {
    kanvas2.style.display="none";
  }
}

//butonlar için gerekli event listenerlar.

   

document.getElementById('butRefresh').addEventListener('click', function() 
{
  bilgi.style.display='none';

  document.getElementById("a4").style.display='none';
  var anchor = document.getElementById("a6");
  var att = document.createAttribute("hidden");
  att.value = 'none';
  anchor.setAttributeNode(att);
});

document.getElementById('butAdd').addEventListener('click', function() 
{
  toggleAddDialog(true);
});

document.getElementById('butAddResim').addEventListener('click', function() 
{
    bilgi.style.display='inline';
    reader.readAsDataURL(input.files[0]);
    document.getElementById("demo1").innerHTML=input.files[0].name;
    var size=input.files[0].size;

    if(size>1000&&size<1000000) 
    {
      size=size/1024;
      size=size.toFixed(2)+" kb";
    }
    
    if(size >= 1000000)
    {
      size=size/(1024*1024);
      size=size.toFixed(2)+ " mb";
    }
    



    document.getElementById("demo2").innerHTML=size;
    
    var tip=input.files[0].type+"";
    tip=tip.replace("image/","");
    document.getElementById("demo3").innerHTML=tip;
    
    //document.getElementById("demo5").innerHTML=new Date(input.files[0].lastModified);
    document.getElementById("a4").removeAttribute("hidden");
    document.getElementById("a4").style.display="inline";
    document.getElementById("a6").removeAttribute("hidden");
    
    document.getElementById("dizin1").innerHTML="Bir Resim Seçin";
    toggleAddDialog(false);
});

document.getElementById('butAddCancel').addEventListener('click', function() 
{
  document.getElementById("dizin1").innerHTML="Bir Resim Seçin";
  toggleAddDialog(false);
});

  
toggleAddDialog = function(visible) 
{
    if (visible)
    {
        document.querySelector('.dialog-container').classList.add('dialog-container--visible');
    } 
    else 
    {
        document.querySelector('.dialog-container').classList.remove('dialog-container--visible');
    }
};







///resim yükleme ve maske ekleme

document.getElementById("imgInput").addEventListener("change",function (event)
{
  input=event.target;
  reader.onload=function ()
 {
   document.getElementById("Resim1").src =reader.result;
 };
 
   document.getElementById("dizin1").innerHTML=input.files[0].name;

    
});  

//image yükleme change eventi sonu


orjinalresim.onload=function () 
{ 


  


  console.log("onload basladi");

  /*
  a=orjinalresim.width;
  b=orjinalresim.height;
  console.log("a:"+a+"  b:"+b);
  document.getElementById("demo4").innerHTML=a+" X "+b;

  
  var gizlikanvas = document.createElement('canvas');
  gizlikanvas.width = a;
  gizlikanvas.height = b;
  gizlikanvas.getContext('2d').drawImage(orjinalresim, 0, 0);
  var pixelData = gizlikanvas.getContext('2d').getImageData(0, 0, a,b); */

  a=orjinalresim.width;
  b=orjinalresim.height;
  console.log("a:"+a+"  b:"+b);
  document.getElementById("demo4").innerHTML=a+" X "+b;

  
  

  var MAX_WIDTH = 1920;
  var MAX_HEIGHT = 1080;
  

  if (a > b) {
  if (a > MAX_WIDTH) {
    b *= MAX_WIDTH / a;
    a = MAX_WIDTH;
   }
  } else {
   if (b > MAX_HEIGHT) {
    a *= MAX_HEIGHT / b;
    b = MAX_HEIGHT;
   }
  }
  


  var gizlikanvas = document.createElement('canvas');
  gizlikanvas.width = a;
  gizlikanvas.height = b;
  gizlikanvas.getContext('2d').drawImage(orjinalresim, 0, 0,a,b);
  var pixelData = gizlikanvas.getContext('2d').getImageData(0, 0, a,b);


//////////









  worker.postMessage({amount:amount,radius:radius,threshold:threshold,a:a,b:b,data:pixelData,type:1});


 //// if else ile canvas.widthye gereksiz müdahale ve canvas clearlar engelenerek flickeringing önüne gecildi.
  if(canvas2.width==a&&canvas2.height==b)
  {


  }
  else
  {
  canvas2.width=a;
  canvas2.height=b;

  canvas.width=a;
  canvas.height=b;
  }

  
  console.log("onload bitti");
      

 
}


// Değiştirilen resmi kaydetme
function download() {
    var dt = canvas.toDataURL('image/jpeg');
    this.href = dt;
};

donwloadbutton.addEventListener('click', download, false);


//baslangic icin resim yükleme

//orjinalresim.src="images/denizanası.png";


// service worker register
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
           .register('./service-worker.js')
           .then(function() { console.log('Service Worker Registered'); });
}



//homescreen promtu icin kodlar


let deferredPrompt;


window.addEventListener('beforeinstallprompt', (e) => {
  // 
  e.preventDefault();
  // 
  deferredPrompt = e;
  document.getElementById("homescreenbtn").style.display = 'block';
});

document.getElementById("homescreenbtn").addEventListener('click', (e) => {
  // hide our user interface that shows our A2HS button
  document.getElementById("homescreenbtn").style.display = 'none';
  // Show the prompt
  deferredPrompt.prompt();
  // Wait for the user to respond to the prompt
  deferredPrompt.userChoice
    .then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt = null;
    });
});



window.addEventListener('appinstalled', (evt) => {
  app.logEvent('a2hs', 'installed');
});