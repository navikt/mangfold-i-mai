function main() {
	var radios = document.forms['program-filter-form'].elements['filter'];
	for(var i = 0; i < radios.length; i++) {
	    radios[i].onclick = function() {
	        filterEvents(this.value);
	    }
	}

}

function filterEvents(value) {
	var eventList = document.getElementById('event-series')
	var events = eventList.getElementsByTagName('li');

	for(var i = 0; i < events.length; i++) {

		if (value === 'all') {

			events[i].style.display = 'block';

		} else {

			var badges = events[i].getElementsByClassName('badge');
	    	var match = false;

	    	for (var j = 0; j < badges.length; j++) {
	    		if (badges[j].className.indexOf(value) !== -1) match = true;
	    	}

	    	if (match) events[i].style.display = 'block';
	    	if (!match) events[i].style.display = 'none';

		}
	}
}

main();