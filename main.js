		var myLat = 49.00557017966703;
		var myLong = 8.419677776336584;

		var heading = 0;

		var alpha = 0;

		var otherLat = 0;
		var otherLong = 0;

		function getLocation() {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(showPosition);
			}
		}
		function showPosition(position) {
			myLat = position.coords.latitude;
			myLong = position.coords.longitude; 
		}

		window.addEventListener('deviceorientation', function(event) {
			
			$("#noacc").css("display","none");
			$("#destination").css("display","block");
			$("#locationdropdown").css("display","block");

			if (otherLat == 0 && otherLong == 0) {

				var result = alpha;

			} else {
				getLocation();
				alpha = event.alpha;
				var result = parseInt(alpha + heading)
			}
			

			var img = new Image();
			img.src = "arrow.png";
			half_width = img.naturalWidth / 2;
			half_height = img.naturalHeight / 2;

			var canvas = document.getElementById("mycanvas");
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			canvas.style.width = "100%";
			canvas.style.height = canvas.style.width;
			var ctx = canvas.getContext("2d");
			ctx.save();
			var canvasWidth = canvas.width;
			var canvasHeight = canvas.height;

			ctx.clearRect(0, 0, canvasWidth, canvasHeight);
			ctx.translate(canvasWidth/2, canvasWidth/2);
			ctx.rotate((result + 180) * Math.PI / 180);
			ctx.translate(-canvasWidth/2, -canvasWidth/2);
			ctx.drawImage(img, 0, 0, img.width,    img.height,     // source rectangle
                   0, 0,canvas.width, canvas.width); // destination rectangle
			//ctx.drawImage(img, canvasWidth/2 - half_width, canvasHeight/2 - half_height);
			ctx.restore();
		}, false);

		window.setInterval(function(){

			if(!(otherLat == 0 && otherLong == 0)) {
				var myLatLng = new google.maps.LatLng(myLat, myLong); 

				var otherLatLng = new google.maps.LatLng(otherLat, otherLong);

				heading = google.maps.geometry.spherical.computeHeading(otherLatLng, myLatLng);
			}

			

		}, 2000);


		function setLatLong(lat, long, dest) {
			otherLat = lat;
			otherLong = long;

			$('#dest').text(dest);
		}