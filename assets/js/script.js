function togglePlay() {
	const audio = document.getElementById("audio")
	const playButton = document.querySelector(".play-button")

	if (audio.paused) {
		audio.play()
		playButton.innerHTML =
			'<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M14 19V5h4v14zm-8 0V5h4v14z"/></svg>' // Pause icon
	} else {
		audio.pause()
		playButton.innerHTML =
			'<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M8 5.14v14l11-7z" /></svg>' // Play icon
	}
}

document.getElementById("audio").addEventListener("timeupdate", () => {
	const audio = document.getElementById("audio")
	const progress = document.getElementById("progress")
	const progressPercent = (audio.currentTime / audio.duration) * 100
	progress.style.width = `${progressPercent}%`
})

function setProgress(event) {
	const audio = document.getElementById("audio")
	const progressBar = document.querySelector(".progress-bar")
	const width = progressBar.clientWidth
	const clickX = event.offsetX
	const duration = audio.duration

	audio.currentTime = (clickX / width) * duration
}

function loadSong(src, title, element) {
	const audio = document.getElementById("audio")
	const playButton = document.querySelector(".play-button")
	const playlistItems = document.querySelectorAll(".playlist li")

	audio.src = src
	audio.play()
	playButton.innerHTML =
		'<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M14 19V5h4v14zm-8 0V5h4v14z"/></svg>' // Pause icon
	playlistItems.forEach((item) => item.classList.remove("active"))
	element.classList.add("active")
}

function openModal(src) {
	const modal = document.getElementById("myModal")
	const modalImg = document.getElementById("img01")

	modal.style.display = "flex"
	modalImg.src = src
}

function closeModal() {
	const modal = document.getElementById("myModal")
	modal.style.display = "none"
}

// Carousel functionality
function showIframe(wrapper) {
	const iframe = wrapper.querySelector("iframe")
	const thumbnail = wrapper.querySelector("img")
	const playButton = wrapper.querySelector(".play-button-overlay")
	const videoSrc = iframe.getAttribute("data-src")

	thumbnail.style.display = "none"
	playButton.style.display = "none"
	iframe.style.display = "block"
	iframe.src = videoSrc + "&autoplay=1" // Ensure autoplay is added only on play button click
}

let currentSlide = 0
const slides = document.querySelectorAll(".carousel-item")

function showSlide(index) {
	if (index >= slides.length) {
		currentSlide = 0
	} else if (index < 0) {
		currentSlide = slides.length - 1
	} else {
		currentSlide = index
	}
	slides.forEach((slide, i) => {
		if (i === currentSlide) {
			slide.classList.add("active")
		} else {
			slide.classList.remove("active")
		}
	})
	const carousel = document.getElementById("carousel-inner")

	carousel.style.transform = `translateX(-${currentSlide * 100}%)`
}

function nextSlide() {
	showSlide(currentSlide + 1)
}

function prevSlide() {
	showSlide(currentSlide - 1)
}

document.addEventListener("DOMContentLoaded", () => {
	showSlide(0) // Show the first slide initially
})
