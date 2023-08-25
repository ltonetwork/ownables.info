document.addEventListener('click', function (event) {

	// Clicking a modal trigger opens that modal
	if (event.target.matches('.click-row__item') || event.target.parentNode.matches('.click-row__item')) {
		event.preventDefault();

		// Select the correct modal
		const itemID = event.target.getAttribute('data-target');
		const modal = document.getElementById(itemID);

		// Make the modal and the wrap visible
		modal.classList.add('visible');
		modal.parentNode.classList.add('visible');

	}

	// Clicking the modal wrap fades out the modal
	if (event.target.matches('.modal-wrap') || event.target.matches('.modal__close')) {
		const modals = document.getElementsByClassName('modal');

		for (let i = 0; i < modals.length; i++) {
			if (modals[i].matches('.visible')) {
				// Make the modal and the wrap visible
				modals[i].classList.remove('visible');
				modals[i].parentNode.classList.remove('visible');
			}
		}
	}

}, false);