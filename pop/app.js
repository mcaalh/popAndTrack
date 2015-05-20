//wait for the DOM
window.onload = function() {
	// popcorn sur youtube
	var pop = Popcorn.youtube(".video", "http//www.youtube.com/watch?v=x88Z5txBc7w");

	// h2 pays
	var setCountry = function(country){
		document.querySelector(".country-name").innerHTML = country;

		//pays en geocode
		geocoder.geocode({address : country}, function(result, status){
			if (status == google.maps.GeocoderStatus.OK){
				//localisation du pays
				marker.setPosition(result[0].geometry.location);
			}
		});
	};

	var countries = [
		{ start: 20.2, end: 20.7, country_name: "United States" },
		{ start: 20.7, end: 21.2, country_name: "Canada" },
		{ start: 21.2, end: 21.7, country_name: "Mexico" },
		{ start: 21.7, end: 22.2, country_name: "Panama" },
		{ start: 22.2, end: 22.7, country_name: "Haiti" },
		{ start: 22.7, end: 23.2, country_name: "Jamaica" },
		{ start: 23.2, end: 23.7, country_name: "Peru" }
	];

	
	countries.forEach(function(country){
		
		pop.code({
			start : country.start,
			end : country.end,
			onStart : function(){ setCountry(country.country_name);}
		});

		//pop sur flickr
		pop.flickr({
		    start: country.start,
    		end: country.end,
    		tags: country.country_name + " Flag",
    		numberofimages: 5,
    		height: "100px",
    		width: "100px",
    		target: "photos"
		});
	});

	// la partie geo ne marche pas encore
	// centrer la map sur paris  
	var center = new google.maps.LatLng(48.852696, 2.348811);

	var map = new google.maps.Map(document.getElementById("map"), {
			zoom: 1,
			center: center,
			mapTypeId: google.maps.mapTypeId.ROADMAP
			});
	//localisation paris
	var marker = new google.maps.Marker({
		map: map,
		position: center,
		visible: true
	});
	
	var geocoder = new google.maps.Geocoder();

	
	// pop.code({
	// 	start: 20.2,
	// 	end: 20.7,
	// 	onStart: function() {
	// 		document.querySelector(".country-name").innerHTML = "United states";
	// 	}
	// });

	pop.play();
	//et pop play a revoir aussi
};