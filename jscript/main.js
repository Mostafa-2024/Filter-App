let imgBox = document.querySelector(".img-box");
let img = document.querySelector("img");
let upload = document.getElementById("upload");
let saturate = document.getElementById("saturate");
let contrast = document.getElementById("contrast");
let brightness = document.getElementById("brightness");
let sepia = document.getElementById("sepia");
let grayscale = document.getElementById("grayscale");
let blur = document.getElementById("blur");
let hueRotate = document.getElementById("hue-rotate");
let download = document.getElementById("download");
let reset = document.getElementById("reset");
let filters = document.querySelectorAll("ul li input");
let canvas = document.getElementById("canvas");
let ctxt = canvas.getContext("2d");
upload.onchange = () => {
  filters.forEach((filter) => {
    filter.value = filter.dataset.value;
  });
  img.style.filter = "none";
  download.style.display ="block";
  reset.style.display ="block";
  img.style.display = "block";
  let file = new FileReader();
  file.readAsDataURL(upload.files[0]);
  file.onload = () => {
    img.src = file.result
  }
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctxt.drawImage(img,0,0,canvas.width, canvas.height);
    img.style.display = "none";
  }
}
filters.forEach(filter => {
  filter.addEventListener("input", () => {
    ctxt.filter = `
    saturate(${saturate.value}%)
    contrast(${contrast.value}%)
    brightness(${brightness.value}%)
    sepia(${sepia.value}%)
    grayscale(${grayscale.value})
    blur(${blur.value}px)
    hue-rotate(${hueRotate.value}deg)
    `
    ctxt.drawImage(img,0,0,canvas.width, canvas.height );
  })
})
function allReset() {
  filters.forEach((filter) => {
    ctxt.filter = "none";
    filter.value = filter.dataset.value;
    ctxt.drawImage(img,0,0,canvas.width, canvas.height );
  })
}

download.onclick = () => {
  download.href = canvas.toDataURL("image/jpg");
}