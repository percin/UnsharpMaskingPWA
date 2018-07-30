console.log("worker thread başladi");


var pixelData;
var amount;
var threshold;
var radius;
var a;
var b;

var data ;
var date1 = new Array();
var statu=false;











self.addEventListener('message', function(e) {
  console.log("worker calismaya basladi");
  if(e.data.type==1)
  {
    pixelData=e.data.data.data;
    amount=e.data.amount;
    threshold=Math.round(e.data.threshold*128)-3;
    radius=e.data.radius;
    a=e.data.a;
    b=e.data.b;
  
    data = pixelData.slice();
    date1 = new Array();
    statu=false;
    
  
    console.log("filtre type 1 olarak basladi");
    
    var toplam=0;
   
    var lowend=a*4+4;
    var highend=(a*b-(a+2))*4;
  
    if(radius==2)
    {
  
       lowend=a*8+8;
       highend=(a*b-(2*a+3))*4;
  
       
      for (var i = 0; i < data.length; i += 4) 
      {
    
        statu=false;
        if(i< lowend || i>highend)  
        {
          data[i]     = 0;     // red
          date1[i]     = 0;
    
          data[i+1]     = 0;     // red
          date1[i+1]     = 0;
    
          data[i+2]     = 0;     // red
          date1[i+2]     = 0;
    
    
          //console.log(i/4 +"pixel");
          continue;
        }  
  
       toplam=0;
    
       toplam=toplam -pixelData[i-a*8-8]-4*pixelData[i-a*8-4]-6*pixelData[i-a*8]-4*pixelData[i-a*8+4]-pixelData[i-a*8+8];
       toplam=toplam -4*pixelData[i-a*4-8]-16*pixelData[i-a*4-4]-24*pixelData[i-a*4]-16*pixelData[i-a*4+4]-4*pixelData[i-a*4+8];
       toplam=toplam -6*pixelData[i-8]-24*pixelData[i-4]+220*pixelData[i]-24*pixelData[i+4]-6*pixelData[i+8];
       toplam=toplam -4*pixelData[i+a*4-8]-16*pixelData[i+a*4-4]-24*pixelData[i+a*4]-16*pixelData[i+a*4+4]-4*pixelData[i+a*4+8];
       toplam=toplam -pixelData[i+a*8-8]-4*pixelData[i+a*8-4]-6*pixelData[i+a*8]-4*pixelData[i+a*8+4]-pixelData[i+a*8+8];
    
    
       if(Math.abs(toplam)/220<threshold)
       {
        data[i]     = 0;     // red
        date1[i]     = 0;
        statu=true; 
       } 
       else
       {
        data[i]     = toplam/16;     // red
        date1[i]     = toplam/16; 
       }
    
        
    
       
    
        toplam=0;
    
        toplam=toplam -pixelData[i-a*8-8+1]-4*pixelData[i-a*8-4+1]-6*pixelData[i-a*8+1]-4*pixelData[i-a*8+4+1]-pixelData[i-a*8+8+1];
        toplam=toplam -4*pixelData[i-a*4-8+1]-16*pixelData[i-a*4-4+1]-24*pixelData[i-a*4+1]-16*pixelData[i-a*4+4+1]-4*pixelData[i-a*4+8+1];
        toplam=toplam -6*pixelData[i-8+1]-24*pixelData[i-4+1]+220*pixelData[i+1]-24*pixelData[i+4+1]-6*pixelData[i+8+1];
        toplam=toplam -4*pixelData[i+a*4-8+1]-16*pixelData[i+a*4-4+1]-24*pixelData[i+a*4+1]-16*pixelData[i+a*4+4+1]-4*pixelData[i+a*4+8+1];
        toplam=toplam -pixelData[i+a*8-8+1]-4*pixelData[i+a*8-4+1]-6*pixelData[i+a*8+1]-4*pixelData[i+a*8+4+1]-pixelData[i+a*8+8+1];
     
    
        
        
    
        if(Math.abs(toplam)/220<threshold || statu)
        {
         data[i+1]     = 0;     // red
         date1[1+i]     = 0; 
         statu=true;
         data[i]     = 0;     // red
         date1[i]     = 0;
        } 
        else
        {
         data[i+1]     = toplam/16;     // red
         date1[i+1]     = toplam/16; 
        }
      
        toplam=0;
    
        toplam=toplam -pixelData[i-a*8-8+2]-4*pixelData[i-a*8-4+2]-6*pixelData[i-a*8+2]-4*pixelData[i-a*8+4+2]-pixelData[i-a*8+8+2];
        toplam=toplam -4*pixelData[i-a*4-8+2]-16*pixelData[i-a*4-4+2]-24*pixelData[i-a*4+2]-16*pixelData[i-a*4+4+2]-4*pixelData[i-a*4+8+2];
        toplam=toplam -6*pixelData[i-8+2]-24*pixelData[i-4+2]+220*pixelData[i+2]-24*pixelData[i+4+2]-6*pixelData[i+8+2];
        toplam=toplam -4*pixelData[i+a*4-8+2]-16*pixelData[i+a*4-4+2]-24*pixelData[i+a*4+2]-16*pixelData[i+a*4+4+2]-4*pixelData[i+a*4+8+2];
        toplam=toplam -pixelData[i+a*8-8+2]-4*pixelData[i+a*8-4+2]-6*pixelData[i+a*8+2]-4*pixelData[i+a*8+4+2]-pixelData[i+a*8+8+2];
     
        if(Math.abs(toplam)/220<threshold || statu)
        {
         data[i+2]     = 0;     // red
         date1[i+2]     = 0; 
  
         data[i]     = 0;     // red
         date1[i]     = 0;
  
         data[i+1]     = 0;     // red
         date1[1+i]     = 0; 
  
        } 
        else
        {
         data[i+2]     = toplam/16;     // red
         date1[i+2]     = toplam/16; 
        }
      
    
        
    
      }
      
       
    }
    else if(radius==1)
    {
      
  
      for (var i = 0; i < data.length; i += 4) 
      {
    
        
        statu=false;      
        if(i< lowend || i>highend)  
        {
          data[i]     = 0;     // red
          date1[i]     = 0;
    
          data[i+1]     = 0;     // gree
          date1[i+1]     = 0;
    
          data[i+2]     = 0;     // blue
          date1[i+2]     = 0;
    
    
          //console.log(i/4 +"pixel");
          continue;
        }  
  
  
       toplam=0;
    
       toplam=toplam -1*pixelData[i-a*4-4]-2*pixelData[i-a*4]-1*pixelData[i-a*4+4];
       toplam=toplam -2*pixelData[i-4]+12*pixelData[i]-2*pixelData[i+4];
       toplam=toplam -1*pixelData[i+a*4-4]-2*pixelData[i+a*4]-1*pixelData[i+a*4+4];
      
    
    
       if(Math.abs(toplam)/12<threshold)
       {
        data[i]     = 0;     // red
        date1[i]     = 0;
        statu=true; 
       } 
       else
       {
        data[i]     = toplam/1;     // red
        date1[i]     = toplam/1; 
       }
  
  
        
    
       
    
        toplam=0;
    
        toplam=toplam -1*pixelData[i-a*4-4+1]-2*pixelData[i-a*4+1]-1*pixelData[i-a*4+4+1];
        toplam=toplam -2*pixelData[i-4+1]+12*pixelData[i+1]-2*pixelData[i+4+1];
        toplam=toplam -1*pixelData[i+a*4-4+1]-2*pixelData[i+a*4+1]-1*pixelData[i+a*4+4+1];
      
    
    
  
        if(Math.abs(toplam)/12<threshold || statu)
        {
         data[i+1]     = 0;     // red
         date1[1+i]     = 0; 
         statu=true;
         data[i]     = 0;     // red
         date1[i]     = 0;
        } 
        else
        {
         data[i+1]     = toplam/1;     // red
         date1[i+1]     = toplam/1; 
        }
        
      
        toplam=0;
    
       
        toplam=toplam -1*pixelData[i-a*4-4+2]-2*pixelData[i-a*4+2]-1*pixelData[i-a*4+4+2];
        toplam=toplam -2*pixelData[i-4+2]+12*pixelData[i+2]-2*pixelData[i+4+2];
        toplam=toplam -1*pixelData[i+a*4-4+2]-2*pixelData[i+a*4+2]-1*pixelData[i+a*4+4+2];
      
        if(Math.abs(toplam)/12<threshold || statu)
        {
         data[i+2]     = 0;     // red
         date1[i+2]     = 0; 
  
         data[i]     = 0;     // red
         date1[i]     = 0;
  
         data[i+1]     = 0;     // red
         date1[1+i]     = 0; 
  
        } 
        else
        {
         data[i+2]     = toplam/1;     // red
         date1[i+2]     = toplam/1; 
        }
    
    
    
      }
  
    }
    else
    {
  
  
      for (var i = 0; i < data.length; i += 4) 
      {
    
       statu=false;
         
  
       toplam=0;
    
       toplam=pixelData[i];
       
       if(Math.abs(toplam)/220<threshold)
       {
        data[i]     = 0;     // red
        date1[i]     = 0;
        statu=true; 
       } 
       else
       {
        data[i]     = toplam/16;     // red
        date1[i]     = toplam/16; 
       }
    
        
    
       
    
        toplam=0;
    
        toplam=pixelData[i+1];
        
        
        
    
        if(Math.abs(toplam)/220<threshold || statu)
        {
         data[i+1]     = 0;     // red
         date1[1+i]     = 0; 
         statu=true;
         data[i]     = 0;     // red
         date1[i]     = 0;
        } 
        else
        {
         data[i+1]     = toplam/16;     // red
         date1[i+1]     = toplam/16; 
        }
      
        toplam=0;
    
        toplam=pixelData[i+2];
        
        if(Math.abs(toplam)/220<threshold || statu)
        {
         data[i+2]     = 0;     // red
         date1[i+2]     = 0; 
  
         data[i]     = 0;     // red
         date1[i]     = 0;
  
         data[i+1]     = 0;     // red
         date1[1+i]     = 0; 
  
        } 
        else
        {
         data[i+2]     = toplam/16;     // red
         date1[i+2]     = toplam/16; 
        }
      
    
    
    
      }
    }
  
  
    console.log("filtre orta");
   
  
    var kimageData = new ImageData(data, a, b);    
    postMessage({type:1,data:kimageData});
    
  
    // kanvas2 kısmı
    console.log("filtre bitti");
    
    
  
    for (var i = 0; i < data.length; i += 4) 
    {
      if(date1[i]<0)
      {
        date1[i]=4*date1[i];
      }
      if(date1[i+1]<0)
      {
        date1[i+1]=4*date1[i+1];
      }
      if(date1[i+2]<0)
      {
        date1[i+2]=4*date1[i+2];
      }
  
  
  
  
          data[i]     = amount*date1[i]+ pixelData[i];     // red
          data[i + 1] = amount*date1[i+1]+ pixelData[i + 1]; // green
          data[i + 2] = amount*date1[i+2]+ pixelData[i + 2]; // blue
  
           //this.console.log("pixel:"+i/4+"    orjinal veri:"+pixelData[i]+"   kenar veri:"+date1[i] +" sonuc veri   "+data[i]);
           // this.console.log("pixel:"+i/4+"    orjinal veri:"+pixelData[i+1]+"   kenar veri:"+date1[i+1] +" sonuc veri   "+data[i+1]);
           //this.console.log("pixel:"+i/4+"    orjinal veri:"+pixelData[i+2]+"   kenar veri:"+date1[i+2] +" sonuc veri   "+data[i+2]);
           
    }
       
  
    var KimageData = new ImageData(data, a, b);  
    postMessage({type:0,data:KimageData});
  
    data = pixelData.slice();
    date1 = new Array();
  
  
  
  }
  else
  {
    
    amount=e.data.amount;
    threshold=Math.round(e.data.threshold*128)-3;
    radius=e.data.radius;
    
  
    
    statu=false;
    
  
    console.log("filtre type 2 olarak basladi");
    
    var toplam=0;
   
    var lowend=a*4+4;
    var highend=(a*b-(a+2))*4;
  
    if(radius==2)
    {
  
       lowend=a*8+8;
       highend=(a*b-(2*a+3))*4;
  
  
      for (var i = 0; i < data.length; i += 4) 
      {
    
        statu=false;
        if(i< lowend || i>highend)  
        {
          data[i]     = 0;     // red
          date1[i]     = 0;
    
          data[i+1]     = 0;     // red
          date1[i+1]     = 0;
    
          data[i+2]     = 0;     // red
          date1[i+2]     = 0;
    
    
          //console.log(i/4 +"pixel");
          continue;
        }  
  
       toplam=0;
    
       toplam=toplam -pixelData[i-a*8-8]-4*pixelData[i-a*8-4]-6*pixelData[i-a*8]-4*pixelData[i-a*8+4]-pixelData[i-a*8+8];
       toplam=toplam -4*pixelData[i-a*4-8]-16*pixelData[i-a*4-4]-24*pixelData[i-a*4]-16*pixelData[i-a*4+4]-4*pixelData[i-a*4+8];
       toplam=toplam -6*pixelData[i-8]-24*pixelData[i-4]+220*pixelData[i]-24*pixelData[i+4]-6*pixelData[i+8];
       toplam=toplam -4*pixelData[i+a*4-8]-16*pixelData[i+a*4-4]-24*pixelData[i+a*4]-16*pixelData[i+a*4+4]-4*pixelData[i+a*4+8];
       toplam=toplam -pixelData[i+a*8-8]-4*pixelData[i+a*8-4]-6*pixelData[i+a*8]-4*pixelData[i+a*8+4]-pixelData[i+a*8+8];
    
    
       if(Math.abs(toplam)/220<threshold)
       {
        data[i]     = 0;     // red
        date1[i]     = 0;
        statu=true; 
       } 
       else
       {
        data[i]     = toplam/16;     // red
        date1[i]     = toplam/16; 
       }
    
        
    
       
    
        toplam=0;
    
        toplam=toplam -pixelData[i-a*8-8+1]-4*pixelData[i-a*8-4+1]-6*pixelData[i-a*8+1]-4*pixelData[i-a*8+4+1]-pixelData[i-a*8+8+1];
        toplam=toplam -4*pixelData[i-a*4-8+1]-16*pixelData[i-a*4-4+1]-24*pixelData[i-a*4+1]-16*pixelData[i-a*4+4+1]-4*pixelData[i-a*4+8+1];
        toplam=toplam -6*pixelData[i-8+1]-24*pixelData[i-4+1]+220*pixelData[i+1]-24*pixelData[i+4+1]-6*pixelData[i+8+1];
        toplam=toplam -4*pixelData[i+a*4-8+1]-16*pixelData[i+a*4-4+1]-24*pixelData[i+a*4+1]-16*pixelData[i+a*4+4+1]-4*pixelData[i+a*4+8+1];
        toplam=toplam -pixelData[i+a*8-8+1]-4*pixelData[i+a*8-4+1]-6*pixelData[i+a*8+1]-4*pixelData[i+a*8+4+1]-pixelData[i+a*8+8+1];
     
    
        
        
    
        if(Math.abs(toplam)/220<threshold || statu)
        {
         data[i+1]     = 0;     // red
         date1[1+i]     = 0; 
         statu=true;
         data[i]     = 0;     // red
         date1[i]     = 0;
        } 
        else
        {
         data[i+1]     = toplam/16;     // red
         date1[i+1]     = toplam/16; 
        }
      
        toplam=0;
    
        toplam=toplam -pixelData[i-a*8-8+2]-4*pixelData[i-a*8-4+2]-6*pixelData[i-a*8+2]-4*pixelData[i-a*8+4+2]-pixelData[i-a*8+8+2];
        toplam=toplam -4*pixelData[i-a*4-8+2]-16*pixelData[i-a*4-4+2]-24*pixelData[i-a*4+2]-16*pixelData[i-a*4+4+2]-4*pixelData[i-a*4+8+2];
        toplam=toplam -6*pixelData[i-8+2]-24*pixelData[i-4+2]+220*pixelData[i+2]-24*pixelData[i+4+2]-6*pixelData[i+8+2];
        toplam=toplam -4*pixelData[i+a*4-8+2]-16*pixelData[i+a*4-4+2]-24*pixelData[i+a*4+2]-16*pixelData[i+a*4+4+2]-4*pixelData[i+a*4+8+2];
        toplam=toplam -pixelData[i+a*8-8+2]-4*pixelData[i+a*8-4+2]-6*pixelData[i+a*8+2]-4*pixelData[i+a*8+4+2]-pixelData[i+a*8+8+2];
     
        if(Math.abs(toplam)/220<threshold || statu)
        {
         data[i+2]     = 0;     // red
         date1[i+2]     = 0; 
  
         data[i]     = 0;     // red
         date1[i]     = 0;
  
         data[i+1]     = 0;     // red
         date1[1+i]     = 0; 
  
        } 
        else
        {
         data[i+2]     = toplam/16;     // red
         date1[i+2]     = toplam/16; 
        }
      
    
    
    
      }
    }
    else if(radius==1)
    {
      
  
      for (var i = 0; i < data.length; i += 4) 
      {
    
        
        statu=false;      
        if(i< lowend || i>highend)  
        {
          data[i]     = 0;     // red
          date1[i]     = 0;
    
          data[i+1]     = 0;     // gree
          date1[i+1]     = 0;
    
          data[i+2]     = 0;     // blue
          date1[i+2]     = 0;
    
    
          //console.log(i/4 +"pixel");
          continue;
        }  
  
  
       toplam=0;
    
       toplam=toplam -1*pixelData[i-a*4-4]-2*pixelData[i-a*4]-1*pixelData[i-a*4+4];
       toplam=toplam -2*pixelData[i-4]+12*pixelData[i]-2*pixelData[i+4];
       toplam=toplam -1*pixelData[i+a*4-4]-2*pixelData[i+a*4]-1*pixelData[i+a*4+4];
      
    
    
       if(Math.abs(toplam)/12<threshold)
       {
        data[i]     = 0;     // red
        date1[i]     = 0;
        statu=true; 
       } 
       else
       {
        data[i]     = toplam/1;     // red
        date1[i]     = toplam/1; 
       }
  
  
        
    
       
    
        toplam=0;
    
        toplam=toplam -1*pixelData[i-a*4-4+1]-2*pixelData[i-a*4+1]-1*pixelData[i-a*4+4+1];
        toplam=toplam -2*pixelData[i-4+1]+12*pixelData[i+1]-2*pixelData[i+4+1];
        toplam=toplam -1*pixelData[i+a*4-4+1]-2*pixelData[i+a*4+1]-1*pixelData[i+a*4+4+1];
      
    
    
  
        if(Math.abs(toplam)/12<threshold || statu)
        {
         data[i+1]     = 0;     // red
         date1[1+i]     = 0; 
         statu=true;
         data[i]     = 0;     // red
         date1[i]     = 0;
        } 
        else
        {
         data[i+1]     = toplam/1;     // red
         date1[i+1]     = toplam/1; 
        }
        
      
        toplam=0;
    
       
        toplam=toplam -1*pixelData[i-a*4-4+2]-2*pixelData[i-a*4+2]-1*pixelData[i-a*4+4+2];
        toplam=toplam -2*pixelData[i-4+2]+12*pixelData[i+2]-2*pixelData[i+4+2];
        toplam=toplam -1*pixelData[i+a*4-4+2]-2*pixelData[i+a*4+2]-1*pixelData[i+a*4+4+2];
      
        if(Math.abs(toplam)/12<threshold || statu)
        {
         data[i+2]     = 0;     // red
         date1[i+2]     = 0; 
  
         data[i]     = 0;     // red
         date1[i]     = 0;
  
         data[i+1]     = 0;     // red
         date1[1+i]     = 0; 
  
        } 
        else
        {
         data[i+2]     = toplam/1;     // red
         date1[i+2]     = toplam/1; 
        }
    
    
    
      }
  
    }
    else 
    {
      for (var i = 0; i < data.length; i += 4) 
      {
    
       statu=false;
         
  
       toplam=0;
    
       toplam=pixelData[i];
       
       if(Math.abs(toplam)/220<threshold)
       {
        data[i]     = 0;     // red
        date1[i]     = 0;
        statu=true; 
       } 
       else
       {
        data[i]     = toplam/16;     // red
        date1[i]     = toplam/16; 
       }
    
        
    
       
    
        toplam=0;
    
        toplam=pixelData[i+1];
        
        
        
    
        if(Math.abs(toplam)/220<threshold || statu)
        {
         data[i+1]     = 0;     // red
         date1[1+i]     = 0; 
         statu=true;
         data[i]     = 0;     // red
         date1[i]     = 0;
        } 
        else
        {
         data[i+1]     = toplam/16;     // red
         date1[i+1]     = toplam/16; 
        }
      
        toplam=0;
    
        toplam=pixelData[i+2];
        
        if(Math.abs(toplam)/220<threshold || statu)
        {
         data[i+2]     = 0;     // red
         date1[i+2]     = 0; 
  
         data[i]     = 0;     // red
         date1[i]     = 0;
  
         data[i+1]     = 0;     // red
         date1[1+i]     = 0; 
  
        } 
        else
        {
         data[i+2]     = toplam/16;     // red
         date1[i+2]     = toplam/16; 
        }
      
    
    
    
      }
    }
  
  
  
   
  
    var kimageData = new ImageData(data, a, b);    
    postMessage({type:1,data:kimageData});
    
  
    // kanvas2 kısmı
    console.log("filtre bitti");
    console.log("threshold:"+threshold);
    
  
    for (var i = 0; i < data.length; i += 4) 
    {
      if(date1[i]<0)
      {
        date1[i]=4*date1[i];
      }
      if(date1[i+1]<0)
      {
        date1[i+1]=4*date1[i+1];
      }
      if(date1[i+2]<0)
      {
        date1[i+2]=4*date1[i+2];
      }
  
  
  
  
          data[i]     = amount*date1[i]+ pixelData[i];     // red
          data[i + 1] = amount*date1[i+1]+ pixelData[i + 1]; // green
          data[i + 2] = amount*date1[i+2]+ pixelData[i + 2]; // blue
  
           //this.console.log("pixel:"+i/4+"    orjinal veri:"+pixelData[i]+"   kenar veri:"+date1[i] +" sonuc veri   "+data[i]);
           // this.console.log("pixel:"+i/4+"    orjinal veri:"+pixelData[i+1]+"   kenar veri:"+date1[i+1] +" sonuc veri   "+data[i+1]);
           //this.console.log("pixel:"+i/4+"    orjinal veri:"+pixelData[i+2]+"   kenar veri:"+date1[i+2] +" sonuc veri   "+data[i+2]);
           
    }
       
  
    var KimageData = new ImageData(data, a, b);  
    postMessage({type:0,data:KimageData});
  
    data = pixelData.slice();
    date1 = new Array();
  
  
  
  }
  
  console.log("worker calismayı bitirdi");
    
    
  }, false);