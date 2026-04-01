var main=document.querySelector("#main")
var curs=document.querySelector("#curs")
main.addEventListener("mousemove" ,(dets)=>{
       curs.style.left=dets.x +"px"
       curs.style.top=dets.y +"px"
})