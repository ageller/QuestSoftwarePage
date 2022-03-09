function readJSONFromURL(url, callback){
	// read in JSON data from some url and send that data to the callback function (which expects args of status and response)
	var xhr = new XMLHttpRequest();
	xhr.open('get', url, true);
	xhr.responseType = 'json';
	xhr.onload = function() {
		if (xhr.status == 200){
			callback(xhr.response)
		} else {
			alert('Received error message: ' + xhr.status)
		}
	};
	xhr.send();	
}

//////////////////////////////////////////////////////
// generating DOM elements
//////////////////////////////////////////////////////
function generateDropdown(component, container){
	// create a dropdown following the format that Scotty used (but generated in javascript)

	// first, get the tags
	var tags = [];
	component.fields.primary_keywords.forEach(function(d){
		tags.push(d);
	})
	component.fields.secondary_keywords.forEach(function(d){
		tags.push(d);
	})

	var e01 = document.createElement('div');
	var className = 'card ' + component.fields.name.replace(/\s/g, '');
	tags.forEach(function(d){
		className += ' ' + d.replace(/\s/g, '');
	})
	e01.className = className;
	e01.id = component.fields.name.replace(/\s/g, '');
	container.appendChild(e01);

	var e02 = document.createElement('div');
	e02.className = 'card-header';
	e02.id = 'heading_' + component.fields.name;
	e02.setAttribute('data-toggle', 'collapse');
	e02.setAttribute('data-target', '#collapse_' + component.fields.name);
	e02.setAttribute('aria-expanded', 'true');
	e02.setAttribute('aria-controls', 'collapse_' + component.fields.name);
	e02.style.cursor = 'pointer';
	e01.appendChild(e02);

	var e03 = document.createElement('h2');
	e03.className = 'mb-0';
	e02.appendChild(e03);

	var e04 = document.createElement('button');
	e04.className = 'btn btn-link collapsed';
	e04.type = 'button';
	e04.setAttribute('data-toggle', 'collapse');
	e04.setAttribute('data-target', '#collapse_' + component.fields.name);
	e04.setAttribute('aria-expanded', 'true');
	e04.setAttribute('aria-controls', 'collapse_' + component.fields.name);
	e04.textContent += component.fields.name;
	e03.appendChild(e04);

	var e05 = document.createElement('div');
	e05.className = 'collapse';
	e05.id = 'collapse_' + component.fields.name;
	e05.setAttribute('aria-labelledby', 'heading_' + component.fields.name);
	e05.setAttribute('data-parent', '#dropdownContainer');
	e01.appendChild(e05);

	var e06 = document.createElement('div');
	e06.className = 'card-body';
	e05.appendChild(e06);

	// var e07 = document.createElement('a');
	// e07.href = '#top';
	// e07.textContent += 'Back to Top';
	// e06.appendChild(e07);
	// e06.appendChild(document.createElement('br'));

	var e08 = document.createElement('b');
	e08.textContent += 'Tags:';
	e06.appendChild(e08);

	var e09 = document.createElement('b');
	e06.appendChild(e09);

	var e10 = document.createElement('p');
	tags.forEach(function(d, i){
		e10.textContent += d;
		e10.className = 'moduleText'
		if (i < tags.length - 1) e10.textContent += ', '
		// var e10 = document.createElement('a');
		// e10.className = 'nav-link justify-content-start';
		// e10.href = '#';
		// e10.setAttribute('onclick', "toggler('" + d + "')");
		// e10.textContent += d;
		// e09.append(e10);

	});
	e06.appendChild(e10);

	e06.appendChild(document.createElement('br'));

	var e11 = document.createElement('b');
	e11.textContent += 'Available Versions:';
	e06.appendChild(e11);

	component.fields.versions.forEach(function(d){
		var e17 = document.createElement('div');
		e17.className = 'code moduleText';
		e17.textContent += d;
		e06.appendChild(e17);
	});

	e06.appendChild(document.createElement('br'));

	var e12 = document.createElement('b');
	e12.textContent += 'Preferred Version:';
	e06.appendChild(e12);

	var e13 = document.createElement('div');
	e13.className = 'code moduleText';
	e13.textContent += component.fields.preferred;
	e06.appendChild(e13);

	e06.appendChild(document.createElement('br'));

	var e14 = document.createElement('b');
	e14.textContent += 'About:';
	e06.appendChild(e14);

	var e15 = document.createElement('div');
	e15.className = 'moduleText'
	e15.textContent += component.fields.whatis;
	e06.appendChild(e15);

	e06.appendChild(document.createElement('br'));

	var e16 = document.createElement('b');
	e16.textContent += 'Help:';
	e06.appendChild(e16);

	var e17 = document.createElement('p');
	e17.className = 'moduleText'
	e17.textContent += component.fields.help_info;
	e06.appendChild(e17);

	e06.appendChild(document.createElement('br'));

	var e18 = document.createElement('b');
	e18.textContent += 'Slurm Example (If available):';
	e06.appendChild(e18);

	e06.appendChild(document.createElement('br'));

	var e19 = document.createElement('pre');
	e19.className = 'code';
	if (component.fields.slurm_submission_example){
		e19.innerHTML = component.fields.slurm_submission_example;
	} else {
		e19.innerHTML = 'None';
	}
	e06.appendChild(e19);

	e06.appendChild(document.createElement('br'));

	var div = document.createElement('div');
	var e20 = document.createElement('div');
	e20.setAttribute('data-toggle', 'collapse');
	e20.setAttribute('data-target', '#collapse_' + component.fields.name);
	e20.setAttribute('aria-expanded', 'true');
	e20.setAttribute('aria-controls', 'collapse_' + component.fields.name);
	e20.style = 'border:1px solid black; padding:4px; cursor:pointer; width:100px; text-align:center; color:black; float:left; margin:4px'
	e20.textContent += 'Close';
	div.appendChild(e20);

	var e21 = document.createElement('div');
	e21.onclick = toTop;
	e21.style = 'border:1px solid black; padding:4px; cursor:pointer; width:100px; text-align:center; color:black; float: left;  margin:4px'
	e21.textContent += 'Back to Top';
	div.appendChild(e21);
	e06.appendChild(div);
}

function generateClearFiltersBar(container){
	var e01 = document.createElement('div');
	e01.className = 'pos-f-t';
	container.appendChild(e01);

	var e02 = document.createElement('nav');
	e02.className = 'navbar navbar-light bg-light';
	e01.appendChild(e02);

	var div = document.createElement('div')
	//div.style = 'border: 1px solid rgba(0,0,0, 0.2); border-radius: 0.25rem; padding: 0.25rem 0.75rem';
	div.className = 'navbar-toggler';
	div.style.width = '100%'
	div.textContent += 'Clear All Filters'
	div.style.color = 'black';
	div.style.borderColor = 'black';
	div.style.borderRadius = 0;
	div.onclick = clearAllFilters;

	e02.appendChild(div);
}

function generateSearchBar(container){
	var e01 = document.createElement('div');
	e01.className = 'pos-f-t';
	container.appendChild(e01);

	var e02 = document.createElement('nav');
	e02.className = 'navbar navbar-light bg-light';
	e01.appendChild(e02);

	var div = document.createElement('div')
	//div.style = 'border: 1px solid rgba(0,0,0, 0.2); border-radius: 0.25rem; padding: 0.25rem 0.75rem';
	div.style = 'cursor:default';
	div.className = 'navbar-toggler';
	div.style.width = '100%';

	var label = document.createElement('label')
	label.style = 'color:rgba(0,0,0, 0.5); font-size:1.25rem; padding-right:4px';
	label.htmlFor = 'searchByName';
	label.appendChild(document.createTextNode('Search software by name :'));

	var input = document.createElement('input');
	input.type = 'text';
	input.placeholder = 'Enter software name';
	input.name = 'searchByName';
	input.id = 'searchByName';
	input.addEventListener('input', applyAllFilters);
	input.addEventListener('propertychange', applyAllFilters);

	div.appendChild(label);
	div.appendChild(input);
	e02.appendChild(div);
}

function generateTagFilters(data, container){
	// first, get all the tags
	var tags = [];
	data.forEach(function(d){
		d.fields.primary_keywords.forEach(function(d){
			if (!tags.includes(d)) tags.push(d);
		})
		d.fields.secondary_keywords.forEach(function(d){
			if (!tags.includes(d)) tags.push(d);
		})
	})
	tags.sort(function (a, b) {
		return a.toLowerCase().localeCompare(b.toLowerCase());
	});

	var e01 = document.createElement('div');
	e01.className = 'pos-f-t';
	container.appendChild(e01);

	var e02 = document.createElement('nav');
	e02.className = 'navbar navbar-light bg-light';
	e01.appendChild(e02);

	// var e03 = document.createElement('button');
	// e03.className = 'navbar-toggler';
	// e03.type = 'button';
	// e03.setAttribute('data-toggle', 'collapse');
	// e03.setAttribute('data-target', '#filterByTags');
	// e03.setAttribute('aria-expanded', 'true');
	// e03.setAttribute('aria-controls', 'filterByTags');
	//e03.innerHTML = '<span class="navbar-toggler-icon"></span> Filter by Tag'
	var e03 = document.createElement('div');
	e03.className = 'navbar-toggler';
	e03.style.width = '100%'
	e03.style.textAlign = 'left'
	e03.style.cursor = 'default';
	e02.appendChild(e03);

	// var e05 = document.createElement('div');
	// e05.className = 'collapse show';
	// e05.id = 'filterByTags';
	// e01.appendChild(e05);

	// var e06 = document.createElement('div');
	// e06.className = 'bg-light p-4';
	// e05.appendChild(e06);	

	// var tagContainer = document.createElement('nav');
	// tagContainer.className = 'navbar navbar-light bg-light';
	// e06.appendChild(tagContainer);

	var tagContainer = document.createElement('div');
	e03.appendChild(tagContainer);
	
	var txt = document.createElement('div');	
	txt.style.marginBottom = '10px'
	txt.textContent += 'Filter by Tag'
	tagContainer.append(txt);

	var div = document.createElement('div');
	div.style.marginBottom = '50px'
	
	// var fill = document.createElement('div');
	// fill.id = 'clearAllFilters'
	// fill.style = 'border:1px solid black; padding:4px; margin:2px; cursor:pointer; text-align:center; color:black; float:left'
	// fill.textContent += 'Check All';
	// fill.onclick = function(){
	// 	checkAllBoxes();
	// 	applyAllFilters();
	// }
	// div.appendChild(fill);

	var clear = document.createElement('div');
	clear.id = 'clearAllFilters'
	clear.style = 'border:1px solid black; padding:4px; margin:2px; cursor:pointer; text-align:center; color:black; float:left'
	clear.textContent += 'Uncheck All';
	clear.onclick = function(){
		uncheckAllBoxes();
		showAllCards();
	}
	div.appendChild(clear);

	tagContainer.append(div);

	tags.forEach(function(d){
		var div = document.createElement('div');
		div.style.width = '100%'
		var checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.checked = false;
		checkbox.name = d.replace(/\s/g, '');
		checkbox.value = d.replace(/\s/g, '');
		checkbox.id = d.replace(/\s/g, '');
		checkbox.className = 'TagCheckbox'
		checkbox.onchange = applyAllFilters;
		
		var label = document.createElement('label')
		label.classList.add('labelFont')
		label.htmlFor = d.replace(/\s/g, '');
		label.appendChild(document.createTextNode(d));

		div.appendChild(checkbox);
		div.appendChild(label);
		tagContainer.appendChild(div)
	})
}

function createHeader(main){

	var header = document.createElement('div');
	header.id = 'headerInfo'
	main.appendChild(header);

	// var e01 = document.createElement('a');
	// e01.id = 'top';
	// header.appendChild(e01);

	var e02 = document.createElement('h1');
	e02.textContent += 'Software on Quest';
	header.appendChild(e02);

	var e03 = document.createElement('p');
	e03.innerHTML = 'Below is a list of current software available on Quest.  On the left are various options filtering the list.  The software and applications shown on the right will be modified based on the selected filters.  Click on any of the items in the software and applications list to expand a dropdown and view more details.  <br><br> Please note that this Quest software and applications list is subject to change, and additional software not listed here may be available. For the complete list, please log into Quest and run the command, <span class="command">module available</span>. Except where noted, the <a href="https://kb.northwestern.edu/70718">Modules Software Environment Manager</a> must be used to set up your environment to use the Quest software. '
	header.appendChild(e03);

	var e04 = document.createElement('a');
	e04.id = 'quest';
	e04.name = 'quest';
	header.appendChild(e04);

	header.appendChild(document.createElement('br'));
	header.appendChild(document.createElement('br'));

}

function createContainers(main){

	var outside = document.createElement('div');
	outside.id = 'outsideContainer'
	main.appendChild(outside);

	var e01 = document.createElement('div');
	e01.className = 'container-fluid';
	outside.appendChild(e01);


	var e02 = document.createElement('div');
	e02.className = 'row';
	e01.appendChild(e02);


	// filters
	var e03 = document.createElement('div');
	e03.className = 'col-sm-4';
	e02.appendChild(e03);

	var e04 = document.createElement('strong');
	e04.textContent += 'Filters';
	e04.style.height = '30px';
	e03.appendChild(e04);

	e03.appendChild(document.createElement('br'));
	e03.appendChild(document.createElement('br'));

	var e05 = document.createElement('div');
	e05.id = 'clearFilterContainer';
	e05.style.marginBottom = '10px';
	e03.appendChild(e05);

	var e06 = document.createElement('div');
	e06.id = 'searchContainer';
	e06.style.marginBottom = '10px';
	e03.appendChild(e06);

	var e07 = document.createElement('div');
	e07.id = 'tagFiltersContainer';
	e07.style = 'height: 500px; overflow-y: auto';
	e03.appendChild(e07);


	// modules
	var e08 = document.createElement('div');
	e08.className = 'col-sm-8';
	e02.appendChild(e08);

	var e09 = document.createElement('strong');
	e09.style.height = '30px';
	e09.textContent += 'Quest Software and Applications';
	e08.appendChild(e09);

	e08.appendChild(document.createElement('br'));
	e08.appendChild(document.createElement('br'));

	var e10 = document.createElement('div');
	e10.className = 'accordion';
	e10.id = 'dropdownContainer';
	e10.style = 'height: 500px; overflow-y: auto; scroll-behavior: smooth';

	e08.appendChild(e10);

	return {'clearFilters':e05, 'search':e06, 'tagFilters':e07, 'modules':e10};

}

//////////////////////////////////////////////////////
// call all the DOM generators
//////////////////////////////////////////////////////
function createPage(data){
	console.log(data);

	// create a "main" element that will hold all the page content
	var main = document.createElement('main');
	document.body.appendChild(main);

	// add the header information (above all the dropdowns)
	createHeader(main);

	// create the container for the dropdowns
	var containers = createContainers(main);

	// create all the dropdowns
	data.forEach(function(d){
		generateDropdown(d, containers.modules);	
	})

	// should I have an extra div that has some notification of the active filter parameters?

	// add a clear filters button
	generateClearFiltersBar(containers.clearFilters);

	// create a search bar for names
	generateSearchBar(containers.search);

	// create the filters
	generateTagFilters(data, containers.tagFilters)
	
	resize();
}


//////////////////////////////////////////////////////
// for filtering
//////////////////////////////////////////////////////
function clearAllFilters(){
	// clear the search box
	document.getElementById('searchByName').value = '';

	// check all the boxes
	uncheckAllBoxes();

	// show all cards
	showAllCards();
}

function checkAllBoxes(){
	var checkboxes = document.getElementsByClassName('TagCheckbox');
	for(var i = 0; i < checkboxes.length; i ++) {
		checkboxes[i].checked = true;
	}
}

function uncheckAllBoxes(){
	var checkboxes = document.getElementsByClassName('TagCheckbox');
	for(var i = 0; i < checkboxes.length; i ++) {
		checkboxes[i].checked = false;
	}
}

function showAllCards(){
	var cards = document.getElementsByClassName('card');
	for(var i = 0; i < cards.length; i ++) {
		cards[i].classList.remove('hidden');
	}

	applyNameSearch();
}

function hideAllCards(){
	var cards = document.getElementsByClassName('card');
	for(var i = 0; i < cards.length; i ++) {
		cards[i].classList.add('hidden');
	}
}

function applyTagFilters(){
	// hide everything first
	hideAllCards()

	// gather all the tags
	var checkboxes = document.getElementsByClassName('TagCheckbox');
	var tags = [];
	for(var i = 0; i < checkboxes.length; i ++) {
		if (checkboxes[i].checked) {
			tags.push(checkboxes[i].name);
		}
	}

	// then show only those that have all the tags the checkbox
	cards = document.getElementsByClassName('card');
	for(var i = 0; i < cards.length; i ++) {
		var show = true;
		for(var j = 0; j < tags.length; j ++) {
			if (!cards[i].classList.contains(tags[j])) show = false;
		}
		if (show) cards[i].classList.remove('hidden');
	}
}

function applyNameSearch(){
	// get the text box entry
	var search = document.getElementById('searchByName');
	var value = search.value.replace(/[^0-9a-z]/gi, '').toLowerCase();
	console.log(value);

	if (value.length > 0){
		// modify the cards
		var cards = document.getElementsByClassName('card');
		for(var i = 0; i < cards.length; i ++) {
			var snip = cards[i].id.replace(/[^0-9a-z]/gi, '').toLowerCase().substring(0,value.length);
			if (snip != value) cards[i].classList.add('hidden')
		}
	}
}

function applyAllFilters(){
	applyTagFilters();
	applyNameSearch();
}

//////////////////////////////////////////////////////
// misc
//////////////////////////////////////////////////////
function resize(){
	//get the available height and rescale the containers

	var filters = document.getElementById('tagFiltersContainer');
	var filtersBbox = filters.getBoundingClientRect();
	filters.style.height = window.innerHeight - filtersBbox.top - 20;

	var dropdowns = document.getElementById('dropdownContainer');
	var dropdownsBbox = dropdowns.getBoundingClientRect();
	dropdowns.style.height = window.innerHeight - dropdownsBbox.top - 20;

}

function toTop(){
	//scroll to the top
	var dropdowns = document.getElementById('dropdownContainer');
	dropdowns.scrollTop = 0;

}

//////////////////////////////////////////////////////
// runs on page load	
//////////////////////////////////////////////////////
readJSONFromURL('https://scottcoughlin2014.github.io/quest-software-documentation/module.json', createPage)

window.addEventListener('resize', resize);