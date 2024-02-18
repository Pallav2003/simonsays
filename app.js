let gameseq = []; 
let userseq = []; 

let btns = ["yellow", "red", "purple", "Green"];

let started = false;
let level = 0; 
let hs = 0;

let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");
document.addEventListener("keypress", function()
{
    if(started == false)
    {
        console.log("Game started");
        started = true;

        levelUp();
    }
});

function gameFlash(btn)
{
    btn.classList.add("flash");
    setTimeout(function()
    {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn)
{
    btn.classList.add("userflash");
    setTimeout(function()
    {
        btn.classList.remove("userflash");
    }, 250);
}


function levelUp()
{
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIx = Math.floor(Math.random() *3);
    let randColor = btns[randIx];
    let randbtn = document.querySelector(`.${randColor}`);
    // console.log(randIx); 
    // console.log(randColor); 
    gameseq.push(randColor);
    console.log(gameseq);
    gameFlash(randbtn);
}

function checkAns(idx)
{
    if(userseq[idx] === gameseq[idx])
    {
        if(userseq.length == gameseq.length)
        {
            setTimeout(levelUp, 1000);
        }
    }
    else
    {
        if(level>hs)
        {
            hs = level;
            h3.innerText = `Highest Score: ${hs}`;
        }
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function()
        {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function reset()
{
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}

function btnPress()
{
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userseq.push(userColor);

    checkAns(userseq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(let btn of allBtns)
{
    btn.addEventListener("click", btnPress);
}
