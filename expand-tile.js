const tiles = document.getElementsByClassName("tile-header");
console.log("It's working")
console.log(tiles);

for (let i = 0; i < tiles.length; i++) {
    tiles[i].addEventListener("click", function() {
        this.classList.toggle("active");
        let content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        } 
        let arrow = this.getElementsByClassName("arrow")[0];
        if (arrow.style.transform) {
            arrow.style.transform = null;
        } else {
            arrow.style.transform = "rotate(0.5turn)";
        }
    });
}