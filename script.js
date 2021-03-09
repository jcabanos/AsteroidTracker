  var asteroidList =[];
  var numAsteroids;
  var degree;
  var searchDate;
  var initialDegree;
  var distance;
  var counter;
  var asteroidId;
  var ratio = 80000;

  const apiKey = "pz23IDVex3GzAsw6wCy38ECElrTAFajz0AgglH4h";

  function searchApi() {
    searchDate = $("#date").val();
    asteroidList =[];

  fetch("https://api.nasa.gov/neo/rest/v1/feed?start_date="+searchDate+"&end_date="+searchDate+"&api_key=" + apiKey) // replace url with your API endpoint
    .then(response => response.json()) // use .json() to parse your JSON data
    .then(data => asteroidList.push(data.near_earth_objects[searchDate])) // do stuff with your parsed data
    .catch(error => console.log(error)) // handle any errors

}
  function start()
  {
    document.getElementById("asteroidDiv").innerHTML="";
    setTimeout(searchArray, 1000);
  }

  function searchArray()
  {
    counter = 0;
    $(".infoBar").css("visibility", "visible" );
    $(".infoBar").css("transition-timing-function", "ease-in" );


    getNumberOfAsteroids();
    degreeOfSeparation();

      for (let i = 0; i < numAsteroids; i++)
      {
        getDistance(i);
        getId(i);
        addElement()
      }
      changeInfo();
  }



  function getDistance(i)
  {
    distance = asteroidList[0][i].close_approach_data[0].miss_distance.miles;
    distance = 300 + distance / ratio;
  }

  function getNumberOfAsteroids()
  {
    numAsteroids = asteroidList[0].length;
  }

  function degreeOfSeparation()
  {
    degree = (310 / (numAsteroids - 1));
    initialDegree = degree;
  }

  function getId(i)
  {
    asteroidId = asteroidList[0][i].id;
  }

  function addElement()
  {
    var div = document.createElement("div");
    div.style.width = distance+"px";  //should equal (pixeldistance+earthradius)*2
    div.style.height = "20px";
    div.style.position = "absolute";
    div.style.margin = "auto";
    div.style.transform = "rotate("+initialDegree+"deg)"; //should equal 45deg(numAsteroids - 1) + (90deg / numAsteroids)
    div.className = "rotate ";
    div.innerHTML = "<img class="+asteroidId+" src='asteroid.png'>";
    document.getElementById("asteroidDiv").appendChild(div);
    initialDegree =  initialDegree + degree;

  }

  function changeInfo ()
  {
    if (counter < asteroidList[0].length && counter > 0)
    { counter--;
      $("."+asteroidList[0][counter].id).css("transition-timing-function", "ease-out");
      $("."+asteroidList[0][counter].id).css("transition", ".3s");
      $("."+asteroidList[0][counter].id).css("transform", "scale(.75)");
      counter++;
    }
    else if (counter == asteroidList[0].length)
    { counter--;
      $("."+asteroidList[0][counter].id).css("transition-timing-function", "ease-out");
      $("."+asteroidList[0][counter].id).css("transition", ".3s");
      $("."+asteroidList[0][counter].id).css("transform", "scale(.75)");
      counter = 0;
    }
    var focus = asteroidList[0][counter];
    let diameter = parseFloat(focus.estimated_diameter.feet.estimated_diameter_max).toFixed(2);
    let missDist = parseFloat(focus.close_approach_data[0].miss_distance.miles).toFixed(2);
    let velocity = parseFloat(focus.close_approach_data[0].relative_velocity.miles_per_hour).toFixed(2);
  $(".asteroidName").html(focus.name);
  $(".idNum").html("ID Number: " +focus.id).show();
  $(".diameter").html("Diameter: "+diameter+"ft").show();
  $(".missDistance").html("Miss Distance: " +missDist+"mi").show();
  $(".velocity").html("Relative Velocity: " +velocity+"mph").show();
  $("."+focus.id).css("transition-timing-function", "ease-in");
  $("."+focus.id).css("transition", ".3s");
  $("."+focus.id).css("transform", "scale(2.5)");
  counter++;
  }



  let earth;
       function initialize() {
         earth = new WE.map('earth_div', {scrollWheelZoom: false, zoom: .01});
         earth.setView([46.8011, 8.2266]);
         WE.tileLayer('https://webglearth.github.io/webglearth2-offline/{z}/{x}/{y}.jpg',{
           tileSize: 256,
           bounds: [[-85, -180], [85, 180]],
           attribution: '© OpenStreetMap contributors',
           tms: true
         }).addTo(earth);

         // Start a simple rotation animation
         let before = null;
         requestAnimationFrame(function animate(now) {
             let c = earth.getPosition();
             let elapsed = before? now - before: 0;
             before = now;
             earth.setCenter([c[0], c[1] + 0.1*(elapsed/30)]);
             requestAnimationFrame(animate);
         });
       }
