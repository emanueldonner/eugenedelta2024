function togglePlay() {
	const audio = document.getElementById("audio")
	const playButton = document.querySelector(".play-button")

	if (audio.paused) {
		stopIframePlayback() // Stop video playback when audio is played
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

function stopIframePlayback() {
	const iframes = document.querySelectorAll(".carousel-item iframe")
	iframes.forEach((iframe) => {
		iframe.src = ""
		iframe.style.display = "none"
		const thumbnail = iframe.previousElementSibling.previousElementSibling
		const playButton = iframe.previousElementSibling
		thumbnail.style.display = "block"
		playButton.style.display = "block"
	})
}

function stopAudioPlayback() {
	const audio = document.getElementById("audio")
	const playButton = document.querySelector(".play-button")

	if (!audio.paused) {
		audio.pause()
		playButton.innerHTML =
			'<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M8 5.14v14l11-7z" /></svg>' // Play icon
	}
}

function loadSong(src, title, element) {
	const audio = document.getElementById("audio")
	const playButton = document.querySelector(".play-button")
	const playlistItems = document.querySelectorAll(".playlist li")

	stopIframePlayback() // Stop video playback when a song starts
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

	stopAudioPlayback() // Stop audio playback when a video starts
	thumbnail.style.display = "none"
	playButton.style.display = "none"
	iframe.style.display = "block"
	iframe.src = videoSrc + "&autoplay=1" // Ensure autoplay is added only on play button click
}

let currentSlide = 0
const slides = document.querySelectorAll(".carousel-item")

function showSlide(index) {
	stopIframePlayback()
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

// Modal carousel functionality
let currentModalSlide = 0
let modalImages = []
document.addEventListener("DOMContentLoaded", () => {
	showSlide(0) // Show the first slide initially

	modalImages = document.querySelectorAll(".thumbnail img")

	// Add touch event listeners for swipe functionality on the image carousel
	const imageCarousel = document.querySelector(".modal-content")
	addSwipeListeners(imageCarousel, prevModalSlide, nextModalSlide)

	// Add touch event listeners for swipe functionality on the video carousel
	const videoCarousel = document.querySelector(".carousel-inner")
	addSwipeListeners(videoCarousel, prevSlide, nextSlide)
})

function openModal(index) {
	currentModalSlide = index
	updateModal()
	const modal = document.getElementById("myModal")
	modal.style.display = "flex"
}

function closeModal() {
	const modal = document.getElementById("myModal")
	modal.style.display = "none"
}

function updateModal() {
	const modalImg = document.getElementById("img01")
	const copyrightLabel = document.getElementById("copyrightLabel")
	const img = modalImages[currentModalSlide]
	modalImg.src = img.src
	copyrightLabel.textContent = img.getAttribute("data-copyright")
}

function nextModalSlide() {
	currentModalSlide = (currentModalSlide + 1) % modalImages.length
	updateModal()
}

function prevModalSlide() {
	currentModalSlide =
		(currentModalSlide - 1 + modalImages.length) % modalImages.length
	updateModal()
}

// Swipe functionality
function addSwipeListeners(element, onSwipeLeft, onSwipeRight) {
	let touchstartX = 0
	let touchendX = 0

	element.addEventListener("touchstart", (event) => {
		touchstartX = event.changedTouches[0].screenX
	})

	element.addEventListener("touchend", (event) => {
		touchendX = event.changedTouches[0].screenX
		handleSwipeGesture()
	})

	function handleSwipeGesture() {
		if (touchendX > touchstartX) {
			onSwipeLeft()
		}
		if (touchendX < touchstartX) {
			onSwipeRight()
		}
	}
}
