const pageNumber = ['p1', 'p2', 'p3', 'p4', 'p5'];
const url = ['who','about','projects','resume','contact'];
const pageOffSets = [0, 754.18, 1430, 2050, 2750];
const Sections = document.querySelectorAll('section'); 
const list = document.querySelectorAll('.leftIndicator > *:not(.img)');
const cardList = document.querySelectorAll('.card-list > *');
const nav = document.querySelectorAll('nav > ul.list > *');
const DesktopMediaQuery = matchMedia("(min-width: 800px)");
const myLogo = document.querySelector('.svg_logo');
const frm = document.querySelector('.contactForm');
const title = ['AlanD20', 'ALAND AL-JAF']
gsap.registerPlugin(ScrollTrigger, Draggable, TextPlugin);
var leftCircleAnimation;
var firstA;
var thirdA;


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
frm.addEventListener('submit', a=>{
    a.preventDefault();
    const frmName =frm.clientName.value;
    const frmMsg =frm.clientMsg.value;
    window.open(`mailto:alandsp20@pm.me?subject=Portfolio Feedback from ${frmName}&body=${frmMsg}`,"_blank"),frm.action=cur;
    frm.reset();
});

Draggable.create(document.querySelector('.title'),{bounds: {minY: -150, maxY: 0,minX: -115, maxX: 150} });

ScrollTrigger.matchMedia({
    "(min-width: 800px)": function(){
        ScrollTrigger.saveStyles(".list > *:not(.activePage)");
        leftNavTrigger("firstPage", 0);
        leftNavTrigger("secondPage", 1);
        leftNavTrigger("thirdPage", 2);
        leftNavTrigger("forthPage", 3);
        leftNavTrigger("fifthPage", 4);
        function leftNavTrigger(secName, n){
            ScrollTrigger.create({
                trigger: `.${secName}`,
                start: "top center",
                end: "bottom center",
                onToggle: e=> pageActive(e, n)
            });
        }

        function pageActive(e, n){
            if(e.isActive){
                list[n].classList.add('activePage');
                list[n].classList.remove('inactivePage');
                firstA = gsap.to(`.p${n+1} > ellipse:first-child`, {duration: .7, fill: "var(--clr-primary)", stroke: "none", strokeWidth: "0", opacity: 1});
                gsap.set(`.p${n+1} > ellipse:nth-child(2)`, {opacity: .5});
                thirdA = gsap.to(`.p${n+1} > path:last-child`, {duration: .7, rotation: 360, transformOrigin: "100% 50%",  overwrite: "all", opacity: 1});
                return thirdA.restart(), firstA.restart();
            }else{
                thirdA.pause().seek(0);
                firstA.pause().seek(0);
                list[n].classList.add('inactivePage');
                list[n].classList.remove('activePage');
                gsap.set(`.p${n+1} > ellipse:first-child`, { fill: "none", stroke: "var(--clr-primary)", strokeWidth: "2px", opacity: .65});
                gsap.set(`.p${n+1} > ellipse:nth-child(2)`, {opacity: 0});
                gsap.set(`.p${n+1} > path:last-child`, {opacity: 0});
                return ;
            }
        }
        
    }
});



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
    leftNavAnimation
    .from('.leftIndicator > svg:first-child', { height: '0'})
    .from('.leftIndicator > svg:nth-child(2)', { opacity: .2, scale: 0, height: '0'}, "-=.2")
    .from('.leftIndicator > svg:nth-child(3)', { opacity: .2, scale: 0, height: '0'}, "<.2")
    .from('.leftIndicator > svg:nth-child(4)', { opacity: .2, scale: 0, height: '0'}, "<.2")
    .from('.leftIndicator > svg:nth-child(5)', { opacity: .2, scale: 0, height: '0'}, "<.2")
    .from('.leftIndicator > svg:nth-child(6)', { opacity: .2, scale: 0, height: '0'}, "<.2")
    .from('.leftIndicator > svg:last-child', { duration: .5, height: '0'}, "<.2");
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
    
  
//
///logo animation
//


function addAni(){

    if(logoHoverAnimation.isActive() || leftNavAnimation.isActive())
        return false;
    return logoHoverAnimation.restart();
}


//
///Media queries
//
DesktopMediaQuery.addListener(resizeScript);

function resizeScript(){   
    if(DesktopMediaQuery.matches){
        addEvents();
    }else{
        removeEvents();       
    } 
}

function addEvents(){
        cardList.forEach(item=>{   
            item.addEventListener('mouseenter', cardHover);
            item.addEventListener('mouseleave', cardLeave);
        });
        nav.forEach(linkItem=>linkItem.addEventListener('click', navHoverLinks));   
        list.forEach(item=>{
            item.addEventListener('click', leftNavClick, {capture: true});
            item.addEventListener('mouseenter', leftNavHover);
            item.addEventListener('mouseleave',leftNavLeave );   
        });
        myLogo.addEventListener('mouseenter', addAni);
}
function removeEvents(){
    cardList.forEach(item=>{   
        item.removeEventListener('mouseenter', cardHover);
        item.removeEventListener('mouseleave', cardLeave);
    });
    nav.forEach(linkItem=>linkItem.removeEventListener('click', navHoverLinks));
    list.forEach(item=>{
        item.removeEventListener('click', leftNavClick);
        item.removeEventListener('mouseenter', leftNavHover);
        item.removeEventListener('mouseleave', leftNavLeave);   
    });
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

 function leftNavClick(e){
    
    e.preventDefault();
    changePage(e.target, true);
 }



 function leftNavLeave(e){
    if(e.target.classList.contains('inactivePage'))
    {    
        CircleAnimationsLeave(e.target);
    }  
 }

 function leftNavHover(e){
    if(e.target.classList.contains('inactivePage'))
     {
        CircleAnimations(e.target);
     }   
}

function CircleAnimations(tag){
    
    if(tag.parentElement.classList.contains('activePage')) return;
    leftCircleAnimation = gsap.to(`.${tag.classList[0]} > ellipse:first-child`, {duration: .2,opacity: 1, fill: "var(--clr-primary)", stroke: 'var(--clr-primary)', strokeWidth: '6px'});
    return leftCircleAnimation.restart();
}
function CircleAnimationsLeave(tag){

    gsap.set(`.${tag.classList[0]} > ellipse:first-child`, {opacity: .65, fill: 'none', stroke: 'var(--clr-primary)', strokeWidth: '2px'});
    return leftCircleAnimation.pause();
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
    list.forEach(i=>
        {
            if(i.classList.contains('inactivePage'))
                i.children[0].setAttribute('style','');
            else
                i.children[0].setAttribute('style', 'fill: var(--clr-primary);');
        });
    localStorage.setItem('clr', color);
}