gsap.from("h1", {
    color: "red",
    duration: 2,
    delay: 1,
    opacity: 0,
    y: 10,
    stagger: 0.3,
})
gsap.from("#box", {
    x: 1000,
    duration: 2,
    delay: 1,
    rotate: 360,
    backgroundColor: "#fff",
    borderRadius: "46%",
    scale: 0.5,
    repeat: -1,
    yoyo: true
})

gsap.to("#box2", {
    x: 500,
    // y:500,
    duration: 1,
    delay: 1,
    rotate: 360,
    backgroundColor: "#fff",
    borderRadius: "50%",
    repeat: -1,
    yoyo: true
})
var tl = gsap.timeline()
tl.to("#man1", {
    x: 500,
    rotate: 360,
    duration: 2,
    delay: 1,
    repeat: -1,
    yoyo: true
})

tl.to("#man2", {
    x: 500,
    duration: 2.1,
    repeat: -1,
    yoyo: true
})

tl.to("#man3", {
    x: 500,
    duration: 2.2,
    repeat: -1,
    yoyo: true
})
var pl=gsap.timeline()
pl.from("h4",{
    y:-20,
    opacity:0,
    duration:1,
    delay:0.4
})
pl.from("li",{
     y:-20,
    opacity:0,
    duration:1,
    stagger:0.3
})
pl.from("h3",{
    y:-20,
    opacity:0,
    duration:0.5,
    scale:0.2
})








