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

	// first, get the keywords
	var keywords = [];
	component.fields.primary_keywords.forEach(function(d){
		keywords.push(d);
	})
	component.fields.secondary_keywords.forEach(function(d){
		keywords.push(d);
	})



	var e01 = document.createElement('div');
	var className = 'card';
	keywords.forEach(function(d){
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

	var e09 = document.createElement('nav');
	e09.className = 'navbar navbar-light justify-content-start';
	e06.appendChild(e09);

	keywords.forEach(function(d){
		var e10 = document.createElement('a');
		e10.className = 'nav-link justify-content-start';
		e10.href = '#';
		e10.setAttribute('onclick', "toggler('" + d + "')");
		e10.textContent += d;
		e09.append(e10);
	});

	e06.appendChild(document.createElement('br'));

	var e11 = document.createElement('b');
	e11.textContent += 'Available Versions:';
	e06.appendChild(e11);

	component.fields.versions.forEach(function(d){
		var e17 = document.createElement('pre');
		e17.className = 'code';
		e17.textContent += d;
		e06.appendChild(e17);
	});

	e06.appendChild(document.createElement('br'));

	var e12 = document.createElement('b');
	e12.textContent += 'Preferred Version:';
	e06.appendChild(e12);

	var e13 = document.createElement('pre');
	e13.className = 'code';
	e13.textContent += component.fields.preferred;
	e06.appendChild(e13);

	e06.appendChild(document.createElement('br'));

	var e14 = document.createElement('b');
	e14.textContent += 'About:';
	e06.appendChild(e14);

	var e15 = document.createElement('p');
	e15.textContent += component.fields.whatis;
	e06.appendChild(e15);

	e06.appendChild(document.createElement('br'));

	var e16 = document.createElement('b');
	e16.textContent += 'Help:';
	e06.appendChild(e16);

	var e17 = document.createElement('p');
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
	e03.innerHTML = 'This list is subject to change, and additional software not listed here may be available. For the complete list, run the command, <span class="command">module available</span>. Except where noted, Modules Software Environment Manager must be used to set up your environment to use the Quest software.'
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

	var e03 = document.createElement('div');
	e03.className = 'col-sm-4';
	e03.id = 'filtersContainer';
	e03.style = 'height: 500px; overflow-y: auto';
	e02.appendChild(e03);

	var e04 = document.createElement('strong');
	e04.textContent += 'Filters';
	e03.appendChild(e04);

	e03.appendChild(document.createElement('br'));
	e03.appendChild(document.createElement('br'));

	var e05 = document.createElement('div');
	e05.className = 'col-sm-8';
	e05.style.height = '30px';
	e02.appendChild(e05);

	var e06 = document.createElement('strong');
	e06.textContent += 'Quest Software and Applications';
	e05.appendChild(e06);

	e05.appendChild(document.createElement('br'));
	e05.appendChild(document.createElement('br'));

	var e07 = document.createElement('div');
	e07.className = 'accordion';
	e07.id = 'dropdownContainer';
	e07.style = 'height: 500px; overflow-y: auto; scroll-behavior: smooth';

	e05.appendChild(e07);


	return {'filters':e03, 'dropdowns':e07};

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
		generateDropdown(d, containers.dropdowns);	
	})

	resize()
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