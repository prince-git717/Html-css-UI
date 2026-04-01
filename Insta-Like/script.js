var con = document.querySelector(".con")
var i = document.querySelector("#icon")
var heartBtn = document.querySelector("#heart-btn")
var likeNum = document.querySelector("#like-num")

var liked = false
var count = 2847

con.addEventListener("dblclick", () => {
    i.style.opacity = "1"
    i.style.transform = "translate(-50%, -50%) scale(1.5)"

    if (!liked) {
        liked = true
        count++
        likeNum.textContent = count.toLocaleString()
        heartBtn.classList.add("liked")
        heartBtn.className = "ri-heart-fill action-icon liked"
    }

    setTimeout(() => {
        i.style.opacity = "0"
        i.style.transform = "translate(-50%, -50%) scale(0)"
    }, 1000)
})

heartBtn.addEventListener("click", () => {
    liked = !liked
    if (liked) {
        count++
        heartBtn.className = "ri-heart-fill action-icon liked"
    } else {
        count--
        heartBtn.className = "ri-heart-line action-icon"
    }
    likeNum.textContent = count.toLocaleString()
})