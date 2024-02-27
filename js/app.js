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

navigator.saysWho = (() => {
	const { userAgent } = navigator;
	let match = userAgent.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
	
	if (/trident/i.test(match[1])) {
	  return 'IE';
	}
	
	if (match[1] === 'Chrome') {
	  let temp = userAgent.match(/\b(OPR|Edge|Edg)\/(\d+)/);
	
	  if (temp !== null) {
		return temp[0].replace('OPR', 'Opera').replace('Edg', 'Edge');
	  }
	}
	
	return match[1];
  })();
  
  const webmSource = document.getElementById("webmSource");
  const mp4Source = document.getElementById("mp4Source");
  
// checking navigator.saysWho for Safari, webm does not work proper on safari, so change to mp4
  if (navigator.saysWho.includes("Safari")) {
	mp4Source.style.display = "block";
	webmSource.remove()
  } else {
	webmSource.style.display = "block";
	mp4Source.remove()
  }

  const dialog = document.getElementById("dialog");

  function openDialog() {
	// var dialog = document.getElementById("dialog");
	if (dialog.style.display === "block") {
		dialog.style.display = "none";
		document.body.style.overflow = 'auto';
	} else {
		dialog.style.display = "block";
		document.body.style.overflow = 'hidden';
	}
    // document.getElementById("dialog").style.display = "block";
  }

  function enableButton() {
    document.getElementById('submit-button').disabled = false;
  }

  const form = document.getElementById("form");
const result = document.getElementById("result");

form.addEventListener("submit", function (e) {
  const formData = new FormData(form);
  e.preventDefault();
  var object = {};
  formData.forEach((value, key) => {
    object[key] = value;
  });
  var json = JSON.stringify(object);
  result.innerHTML = "Please wait...";

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: json
  })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        result.innerHTML = json.message;
        result.classList.remove("text-gray-500");
        result.classList.add("text-green-500");
      } else {
        console.log(response);
        result.innerHTML = json.message;
        result.classList.remove("text-gray-500");
        result.classList.add("text-red-500");
      }
    })
    .catch((error) => {
      console.log(error);
      result.innerHTML = "Something went wrong!";
    })
    .then(function () {
      form.reset();
      setTimeout(() => {
        result.style.display = "none";
		dialog.style.display = "none";
		document.body.style.overflow = 'auto';
      }, 1000);
    });
});