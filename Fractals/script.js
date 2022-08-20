window.addEventListener("load",function () {
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


    //canvas settings
    ctx.fillStyle="green";
    ctx.lineCap = "round";
    ctx.shadowColor= "rgba(0,0,0,0.7";
    ctx.shadowOffsetX = 10;
    ctx.shadowOffsetY = 5;
    ctx.shadowBlur =10;



    //effect settings
    let lineWidth = ctx.lineWidth;
    let size=canvas.width < canvas.height ? canvas.width*0.2 : canvas.height*0.2;
    const maxLevel=5;
    const branches =2;
    let isNormalFractal = false;
    let isHookFractal = false;
    let isOctoFractal = false;
    let pointX=0;
    let pointY=size*0.3;

    let sides=5;
    let scale=0.5;
    let spread=0.5;
    let color = "hsl("+ Math.random()*360+",100%,50%)"; //Hue (0,360) , Saturation 0-100%, Light 0-100%


    //controls
    const randomizeHookButton = document.getElementById('randomizeHookButton');
    const randomizeOctoButton = document.getElementById('randomizeOctoButton');
    const resetButton = document.getElementById('resetButton');
    const randomizeButton = document.getElementById("randomizeButton");
    const slider_spread = document.getElementById('spread');
    const label_spread =document.querySelector(' [for="spread"]');
    const slider_sides = document.getElementById('sides');
    const label_sides =document.querySelector(' [for="sides"]');

    slider_spread.addEventListener('change',function(e)
    {
    spread=e.target.value;
    updateSliders();
    if(isNormalFractal)
    drawFractal();
    if(isHookFractal)
        drawHookFractal();
    if(isOctoFractal)
        drawOctoFractal();

    });
    slider_sides.addEventListener('change',function (e) {
        sides=e.target.value;
        updateSliders();
        if(isNormalFractal)
            drawFractal();
        if(isHookFractal)
            drawHookFractal();
        if(isOctoFractal)
            drawOctoFractal();

    })


  //  ctx.fillRect(0,0,canvas.width,canvas.height);

    function updateSliders()
    {
        slider_spread.value  =spread;
        label_spread.innerText = 'Spread: ' + Number(spread).toFixed(2);
        slider_sides.value = sides;
        label_sides.innerText = 'Sides: ' + sides;
    }

    function drawBranch(level)
    {
        if(level>maxLevel) return;
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(size,0);
        ctx.stroke();

        for (let i = 0; i <branches; i++)
        {
            ctx.save();
            ctx.translate(size -(size/branches*i),0);
            ctx.scale(scale,scale);

            ctx.save();
            ctx.rotate(spread);
            drawBranch(level+1)
            ctx.restore();


            ctx.save();
            ctx.rotate(-spread);
            drawBranch(level+1)
            ctx.restore();

            ctx.restore();

        }


    }

    function drawFractal()
    {
        isOctoFractal=false;
        isNormalFractal=true;
        isHookFractal=false;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.save();
        ctx.strokeStyle = color;
        ctx.translate(canvas.width/2,canvas.height/2);
        ctx.scale(1,1);
        ctx.rotate(0);

        for (let i = 0; i <sides ; i++)
        {

            ctx.rotate((Math.PI*2)/sides);
            drawBranch(0);
        }
        ctx.restore();
        randomizeButton.style.backgroundColor=color;
    }

    function drawHookFractal()
    {
        isOctoFractal=false;
        isNormalFractal=false;
        isHookFractal=true;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.save();
        ctx.strokeStyle = color;
        ctx.fillStyle= color;
        ctx.translate(canvas.width/2,canvas.height/2);

        for (let i = 0; i <sides ; i++)
        {

            ctx.rotate((Math.PI*2)/sides);
            drawHookBranch(0);



        }
        ctx.restore();
        randomizeHookButton.style.backgroundColor=color;
    }

    function drawHookBranch(level)
    {
        if(level>maxLevel) return;
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(size,0);
        ctx.stroke();

        for (let i = 0; i <branches; i++)
        {
            ctx.save();
            ctx.translate(size -(size/branches*i),0);
            ctx.scale(scale,scale);

            ctx.save();
            ctx.rotate(spread);
            drawHookBranch(level+1)
            ctx.restore();


            ctx.restore();

        }
        ctx.beginPath();
        ctx.arc(0,size,size*0.1,0,Math.PI*2);
        ctx.fill();
    }


    function drawOctoBranch(level)
    {
        if(level>maxLevel) return;
        ctx.beginPath();
        ctx.moveTo(pointX,pointY);
        ctx.bezierCurveTo(0,size*0.3*-3*spread,size*0.3*5,size*0.3*10*spread,0,0);
        ctx.stroke();

        for (let i = 0; i <branches; i++)
        {
            ctx.save();
            ctx.translate(pointX,pointY);
            ctx.scale(scale,scale);

            ctx.save();
            ctx.rotate(spread);
            drawOctoBranch(level+1)
            ctx.restore();


            ctx.restore();

        }

        ctx.beginPath();
        ctx.fill();

    }

    function drawOctoFractal()
    {
        isOctoFractal=true;
        isNormalFractal=false;
        isHookFractal=false;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.save();
        ctx.strokeStyle = color;
        ctx.translate(canvas.width/2,canvas.height/2);
        ctx.scale(1,1);
        ctx.rotate(0);

        for (let i = 0; i <sides ; i++)
        {
            ctx.scale (0.95,0.95);
            ctx.rotate((Math.PI*6)/sides);
            drawOctoBranch(0);
        }
        ctx.restore();
        randomizeOctoButton.style.backgroundColor=color;
    }







    function resetFractal()
    {
        ctx.lineWidth = 15;
        sides=  5;
        scale=0.5;
        spread=0.7;
        color = 'hsl(290,100%,50%)';
        randomizeButton.style.backgroundColor=color;
    }
resetButton.addEventListener('click',function ()
{
    resetFractal();
    updateSliders();
    drawFractal();
});

    function randomizeFractal()
    {
        ctx.lineWidth = Math.floor(Math.random()*20+10);
        sides=  Math.floor(Math.random()*7+2);
        scale=Math.random()*0.2+0.4;
        spread=Math.random()*2,9+0.1;
        color = "hsl("+ Math.random()*360+",100%,50%)";

    }
    function randomizeOctoFractal()
    {
        ctx.lineWidth = Math.floor(Math.random()*30+20);
        sides=  Math.floor(Math.random()*18+2);
        scale=0.85;
        spread=Math.random()*2,9+0.1;
        color = "hsl("+ Math.random()*360+",100%,50%)";

    }

randomizeButton.addEventListener('click',function(){
    randomizeFractal();
    updateSliders();
    drawFractal();
    });

    randomizeHookButton.addEventListener('click',function ()
    {
        randomizeFractal();
        updateSliders();
        drawHookFractal();
    })
    randomizeOctoButton.addEventListener('click',function ()
    {
        randomizeOctoFractal();
        updateSliders();
        drawOctoFractal();
    })


window.addEventListener('resize',function (){
    canvas.width= window.innerWidth;
    canvas.heigth= window.innerHeight;
    size = canvas.width < canvas.height ? canvas.width*0.2 : canvas.height*0.2;
    ctx.shadowColor= "rgba(0,0,0,0.7";
    ctx.shadowOffsetX = 10;
    ctx.shadowOffsetY = 5;
    ctx.shadowBlur =10;
    if(isNormalFractal)
        drawFractal();
    if(isHookFractal)
        drawHookFractal();
    if(isOctoFractal)
        drawOctoFractal();
})

updateSliders();
})
