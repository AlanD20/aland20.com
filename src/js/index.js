const pageNumber = ['p1', 'p2', 'p3', 'p4'];
const url = ['who','about','projects','contact'];
const pageOffSets = [0, 754.18, 1430, 2280];
const Sections = document.querySelectorAll('section'); 
const cardList = document.querySelectorAll('.card-list > *');
const nav = document.querySelectorAll('nav > ul.list > *');
const DesktopMediaQuery = matchMedia("(min-width: 800px)");
const myLogo = document.querySelector('.svg_logo');
const frm = document.querySelector('.contactForm');
const title = ['AlanD20', 'ALAND AL-JAF']
gsap.registerPlugin(ScrollTrigger, Draggable, TextPlugin);



const tMain = gsap.timeline({defaults: {ease: "power3.inOut"}});
const stMain = gsap.timeline({defaults: {duration: 1, ease: "power3.inOut"}});
title.forEach((word, i)=>{
    let t1 = gsap.timeline({repeat: 1, yoyo: true, repeatDelay: 1});
    t1.to('.title', {duration: 1, text: word, onComplete: _=>{if(i=== 1) return tMain.kill()}});
    tMain.add(t1);
});

stMain.to('.ff', {duration: 1, text: 'PROGRAMMER'})
.to('.prtaqaly', {text: ' & '}, "-=.2")
.to('.ss', {text: 'WEB DEVELOPER'}, "<");

const cur = location.origin;
/*frm.addEventListener('submit', a=>{
    a.preventDefault();
    const frmName =frm.clientName.value;
    const frmMsg =frm.clientMsg.value;
    window.open(`mailto:alandsp20@pm.me?subject=Portfolio Feedback from ${frmName}&body=${frmMsg}`,"_blank"),frm.action=cur;
    frm.reset();
});*/

Draggable.create(document.querySelector('.title'),{bounds: {minY: -150, maxY: 0,minX: -115, maxX: 150} });



const logoHoverAnimation = gsap.from('.svg_logo', {transformOrigin: ".4rem",y: '-5px', rotation: 720, ease: 'power3.inout', opacity: 1, paused: true});
var introAnimation;
var leftNavAnimation;

function websiteIntro(){

     introAnimation = gsap.timeline({smoothChildTiming: true, defaults:{duration: .6}});
     leftNavAnimation = gsap.timeline({smoothChildTiming: true});
    introAnimation
    .from('header', {y: '-250%', ease: 'bounce'})
    .from('.svg_logo',{opacity: .2, onStart: _=> logoHoverAnimation.restart()}, "+=.2")
    .from('.items', {opacity: .5, stagger: .4}, "-=.7");
}



window.addEventListener('load', e =>{
    
    if(localStorage.getItem('clr') !== null) clrChanger(localStorage.getItem('clr'));
    if(DesktopMediaQuery.matches){
        websiteIntro();
        if(location.hash !== ''){
            e.preventDefault();
            loadedPage();
            const hash = location.hash.replace('#','');
            autoWebTitle(hash);
            
        }
        addEvents();
        
           ///DISABLE ZOOM 
        window.onresize = function() {
            ScrollTrigger.refresh();
        // var zoom = window.devicePixelRatio;
        // document.body.style.zoom = (125 / zoom) + "%";
        }
        
    }
}, {once: true});
    
  

function addAni(){

    if(logoHoverAnimation.isActive() || leftNavAnimation.isActive())
        return false;
    return logoHoverAnimation.restart();
}


DesktopMediaQuery.addListener(resizeScript);

function resizeScript(){   
    if(DesktopMediaQuery.matches) addEvents()
    else removeEvents();         
}

function addEvents(){
        cardList.forEach(item=>{   
            item.addEventListener('mouseenter', cardHover);
            item.addEventListener('mouseleave', cardLeave);
        });
        nav.forEach(linkItem=>linkItem.addEventListener('click', navHoverLinks));   
        myLogo.addEventListener('mouseenter', addAni);
}
function removeEvents(){
    cardList.forEach(item=>{   
        item.removeEventListener('mouseenter', cardHover);
        item.removeEventListener('mouseleave', cardLeave);
    });
    nav.forEach(linkItem=>linkItem.removeEventListener('click', navHoverLinks));
    myLogo.removeEventListener('mouseenter', addAni);
}

 function cardHover(){
    cardList[0].parentElement.previousElementSibling.classList.remove('howToHide');
    cardList[0].parentElement.style.overflowX = "scroll";
 }
 function cardLeave(){
    cardList[0].parentElement.previousElementSibling.classList.add('howToHide');
    cardList[0].parentElement.style.overflowX = "hidden";
 }
 function navHoverLinks(e){
    if(e.target.getAttribute('href').includes('#'))
    {
    e.preventDefault();
    changePage(e.target, false);
    } 
}


function changePage(tag, leftNav){
 
     let loc;
     let whereToGo;
     if(leftNav)
     {
         loc = tag.classList[0];
         if(pageNumber.includes(tag.parentElement.classList[0]))
         {
         loc = tag.parentElement.classList[0];
         }
         whereToGo = pageNumber.indexOf(loc);
     }else{
         loc = tag.getAttribute('href');
         loc = loc.replace('#', '');
         whereToGo = url.indexOf(loc);
     }
     window.location.hash = '#' + url[whereToGo];
     window.scrollTo({top: pageOffSets[whereToGo]});
     autoWebTitle(url[whereToGo]);
}
function loadedPage(){
 
     let myHash = location.hash;
     myHash = myHash.replace('#', '');
     let whereToGo = url.indexOf(myHash);
     window.scrollTo(0, pageOffSets[whereToGo]);
}
function autoWebTitle(tag){
     const webTitle = document.querySelector('.webTitle');
     if(typeof tag === 'string') 
        webTitle.innerText = `AlanD20 - ${tag.toUpperCase()}`;
     else
     webTitle.innerText = `AlanD20 - ${tag.getAttribute('id').toUpperCase()}`;
}

const clrs = document.querySelectorAll('.svg_colorCircle');

clrs.forEach(cir=>{
    cir.addEventListener('click', _=>{
        if(cir.classList.contains('custom')){
            const f = document.querySelector('.cstmClrForm');
            const pt = /^#[a-fA-F0-9]{6,6}$/;
            f.classList.toggle('d-hidden');
            f.addEventListener('input', _=> {if(pt.test(f.ccf.value)) gsap.set(cir,{fill: f.ccf.value})});
            f.addEventListener('submit', e => {
                e.preventDefault();
                clrChanger(f.ccf.value);
                return f.classList.toggle('d-hidden');
            });
        }
        else{
            clrChanger(cir.dataset.clr);
        }
    })
});

function clrChanger(color){
    gsap.to(':root', {duration: 1, "--clr-primary": color});
    gsap.fromTo('body > *', {opacity: .5},{duration: .5, opacity: 1});
    localStorage.setItem('clr', color);
}