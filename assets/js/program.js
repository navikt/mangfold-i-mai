function main() {
	var radios = document.forms['program-filter-form'].elements['filter'];
	for(var i = 0; i < radios.length; i++) {
	    radios[i].onclick = function() {
	        filterEvents(this.value);
	    }
	}

}

function filterEvents(value) {
	var eventList = document.getElementById('event-list');
	var events = eventList.getElementsByTagName('li');

	for(var i = 0; i < events.length; i++) {

		if (value === 'all') {

			events[i].style.display = 'flex';

		} else {

			var badges = events[i].getElementsByClassName('badge');
	    	var match = false;

	    	for (var j = 0; j < badges.length; j++) {
	    		if (badges[j].className.indexOf(value) !== -1) match = true;
	    	}

	    	if (match) events[i].style.display = 'flex';
	    	if (!match) events[i].style.display = 'none';

		}
	}
}

main();