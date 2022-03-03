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
	var className = 'card';
	tags.forEach(function(d){
		className += ' ' + d;
	})
	e01.className = className;
	container.appendChild(e01);

	var e02 = document.createElement('div');
	e02.className = 'card-header';
	e02.id = 'heading_' + component.fields.name;
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

	var e20 = document.createElement('div');
	e20.onclick = toTop;
	e20.style = 'border:1px solid black; padding:4px; cursor:pointer; width:100px; text-align:center; color:black'
	e20.textContent += 'Back to Top';
	e06.appendChild(e20);
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

	console.log(tags);

	var e01 = document.createElement('div');
	e01.className = 'pos-f-t';
	container.appendChild(e01);

	var e02 = document.createElement('nav');
	e02.className = 'navbar navbar-light bg-light';
	e01.appendChild(e02);

	var e03 = document.createElement('button');
	e03.className = 'navbar-toggler';
	e03.type = 'button';
	e03.setAttribute('data-toggle', 'collapse');
	e03.setAttribute('data-target', '#filterByTags');
	e03.setAttribute('aria-expanded', 'false');
	e03.setAttribute('aria-controls', 'filterByTags');
	e03.innerHTML = '<span class="navbar-toggler-icon"></span> Filter by Tag'
	e02.appendChild(e03);

	var e05 = document.createElement('div');
	e05.className = 'collapse';
	e05.id = 'filterByTags';
	e01.appendChild(e05);

	var e06 = document.createElement('div');
	e06.className = 'bg-light p-4';
	e05.appendChild(e06);	

	var tagContainer = document.createElement('nav');
	tagContainer.className = 'navbar navbar-light bg-light';
	e06.appendChild(tagContainer);

	var div = document.createElement('div');
	div.style = 'margin-bottom: 6px'
	var fill = document.createElement('div');
	fill.id = 'clearAllFilters'
	fill.style = 'border:1px solid black; padding:4px; margin:2px; cursor:pointer; text-align:center; color:black; float:left'
	fill.textContent += 'Check All';
	fill.onclick = function(){
		checkboxes = document.getElementsByClassName('TagCheckbox');
		console.log(checkboxes)
		for(var i = 0, n = checkboxes.length; i<n; i++) {
			checkboxes[i].checked = true;
		}
	}
	div.appendChild(fill);

	var clear = document.createElement('div');
	clear.id = 'clearAllFilters'
	clear.style = 'border:1px solid black; padding:4px; margin:2px; cursor:pointer; text-align:center; color:black; float:left'
	clear.textContent += 'Uncheck All';
	clear.onclick = function(){
		checkboxes = document.getElementsByClassName('TagCheckbox');
		console.log(checkboxes)
		for(var i = 0, n = checkboxes.length; i<n; i++) {
			checkboxes[i].checked = false;
		}
	}
	div.appendChild(clear);

	tagContainer.append(div);

	tags.forEach(function(d){
		var div = document.createElement('div');
		div.style.width = '100%'
		var checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.checked = 'checked';
		checkbox.name = d;
		checkbox.value = d;
		checkbox.id = d.replace(/\s/g, '');
		checkbox.className = 'TagCheckbox'

		var label = document.createElement('label')
		label.style.paddingLeft = '4px';
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
	e03.innerHTML = 'This list is subject to change, and additional software not listed here may be available. For the complete list, run the command, <span class="command">module available</span>. Except where noted, Modules Software Environment Manager must be used to set up your environment to use the Quest software. <br><br> ADD SOME EXPLANATION ABOUT WHAT IS SHOWN BELOW'
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
	e05.id = 'filtersContainer';
	e05.style = 'height: 500px; overflow-y: auto';
	e03.appendChild(e05);


	// modules
	var e06 = document.createElement('div');
	e06.className = 'col-sm-8';
	e02.appendChild(e06);

	var e07 = document.createElement('strong');
	e07.style.height = '30px';
	e07.textContent += 'Quest Software and Applications';
	e06.appendChild(e07);

	e06.appendChild(document.createElement('br'));
	e06.appendChild(document.createElement('br'));

	var e08 = document.createElement('div');
	e08.className = 'accordion';
	e08.id = 'dropdownContainer';
	e08.style = 'height: 500px; overflow-y: auto; scroll-behavior: smooth';

	e06.appendChild(e08);

	return {'filters':e05, 'modules':e08};

}

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

	// create a search bar for names

	// create the filters
	generateTagFilters(data, containers.filters)
	
	resize();
}

function resize(){
	//get the available height and rescale the containers
	var headBbox = document.getElementById('headerInfo').getBoundingClientRect();
	var h = window.innerHeight - headBbox.height - 70;

	var filters = document.getElementById('filtersContainer');
	filters.style.height = h;

	var dropdowns = document.getElementById('dropdownContainer');
	dropdowns.style.height = h;

}

function toTop(){
	//scroll to the top
	var dropdowns = document.getElementById('dropdownContainer');
	dropdowns.scrollTop = 0;

}

// call the function (on page load)		
readJSONFromURL('https://scottcoughlin2014.github.io/quest-software-documentation/module.json', createPage)

window.addEventListener('resize', resize);