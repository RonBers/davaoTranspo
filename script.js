// Initiliaze OpenStreetMap at AdDU Jacinto Campus
var map = L.map("map").setView([7.07191, 125.61337], 18)

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map)

// Declare pane objects to create different layers when displaying
// elements on the map such as routes, markers, popups
const pane1 = map.createPane("pane1") // Jeepney route layer
const pane2 = map.createPane("pane2") // User-chosen route layer
const pane3 = map.createPane("pane3") // Waypoints and markers layer
const pane4 = map.createPane("pane4") // Popups

pane1.style.zIndex = 2000
pane2.style.zIndex = 3000
pane3.style.zIndex = 4000
pane4.style.zIndex = 5000

// Instantiate routing control for route found based on start and end points
var trueDistance
var roundedDistance
var routeFound = false

var control = L.Routing.control({
  routeWhileDragging: false,
  collapsible: true,
  addWaypoints: false,
  lineOptions: {
    styles: [{ pane: "pane2", color: "red", opacity: 1, weight: 2 }],
  },
}).on("routesfound", function (e) {
  // Display approximate total distance between chosen points and output fare calculation
  routeFound = true
  control.hide()
  trueDistance = e.routes[0].summary.totalDistance
  roundedDistance = Math.round(trueDistance / 1000)

  calculateFare(trueDistance, roundedDistance)
})

// Computation of Fares (Add-on Method) based on official LTFRB PUJ Fare Matric as of October 3, 2022
// REGULAR
// First Four (4) kilometers = Php 12.00
// Succeeding kilometers = Additional Php 1.80 per kilometer
// STUDENT/ELDERLY/DISABLED (20% Discount)
// First Four (4) kilometers = Php 9.60
// Succeeding kilometers = Additional Php 1.44 per kilometer

function calculateFare(trueDistance, roundedDistance) {
  // Change fare rate in calculation based on selected customer type
  var discountType = document.querySelector(
    'input[name="discountType"]:checked'
  ).value

  var baseFare
  var succeedingFare

  if (discountType == 1) {
    // Standard rate
    baseFare = 12
    succeedingFare = 1.8
  } else if (discountType == 2) {
    // Student/Elderly/Disabled Discounted rate
    baseFare = 9.6
    succeedingFare = 1.44
  }

  // Fare calculation and distance output
  if (trueDistance <= 4000) {
    // First four kilometers
    if (trueDistance > 1000) {
      // Output rounded distance when over 1 km
      document.getElementById("distanceOutput").value = roundedDistance + " km"
    } else {
      // Output full distance in meters when under 1 km
      document.getElementById("distanceOutput").value = trueDistance + " m"
    }
    document.getElementById("fareOutput").value = "Php " + displayFare(baseFare) // Fare output
  } else {
    // Succeeding kilometers
    document.getElementById("distanceOutput").value = roundedDistance + " km" // Output rounded distance in km
    document.getElementById("fareOutput").value =
      "Php " + displayFare(baseFare + (roundedDistance - 4) * succeedingFare) // Calculate and output fare
  }
}

// Helper function to output calculated fare with two decimal points
function displayFare(fare) {
  return (Math.round(fare * 100) / 100).toFixed(2)
}

// Event listener for passenger type radio input to update calculation after being outputted
if (document.querySelector('input[name="discountType"')) {
  document.querySelectorAll('input[name="discountType"').forEach((elem) => {
    elem.addEventListener("input", function () {
      if (routeFound) {
        calculateFare(trueDistance, roundedDistance)
      }
    })
  })
}

// Jeepney routes and their corresponding array of latitude and longitiude values
// used to instantiate the Leaflet Routing Machine routing control class
const emilyHomesPoints = [
  // Emily Homes
  [7.12991, 125.61707],
  [7.12521, 125.62248],
  [7.10867, 125.61333],
  [7.07407, 125.61259],
  [7.07324, 125.61087],
  [7.06646, 125.60901],
  [7.06591, 125.6102],
  [7.07373, 125.61256],
  [7.07863, 125.6131],
  [7.0912, 125.61007],
  [7.10867, 125.61333],
  [7.12855, 125.61918],
]

const calinanPoints = [
  // Calinan
  [7.18653, 125.456605],
  [7.181298, 125.463911],
  [7.174229, 125.470439],
  [7.163748, 125.473936],
  [7.15588, 125.475882],
  [7.14556, 125.478442],
  [7.131711, 125.480776],
  [7.1222, 125.480017],
  [7.118167, 125.47967],
  [7.105043, 125.488933],
  [7.093181, 125.499992],
  [7.088477, 125.505881],
  [7.080111, 125.513265],
  [7.074083, 125.518753],
  [7.058994, 125.538541],
  [7.061049, 125.56338],
  [7.058684, 125.568821],
  [7.055572, 125.576431],
  [7.050884, 125.588031],
  [7.057123, 125.600871],
  [7.061989, 125.610295],
  [7.071042, 125.613146],
  [7.071039, 125.613136],
  [7.068869, 125.603392],
  [7.060708, 125.588006],
  [7.05867, 125.580629],
  [7.058994, 125.538541],
]

const routeFourPoints = [
  // Route 4
  [7.06299, 125.61109],
  [7.06411, 125.60986],
  [7.07668, 125.61339],
  [7.09215, 125.61064],
  [7.09713, 125.62039],
  [7.0848, 125.62429],
  [7.06299, 125.61109],
]

const routeElevenPoints = [
  // Route 11
  [7.06299, 125.6112],
  [7.07237, 125.60065],
  [7.07631, 125.59803],
  [7.07562, 125.60338],
  [7.08295, 125.61427],
  [7.07826, 125.6184],
  [7.08067, 125.62243],
  [7.08215, 125.62448],
  [7.06299, 125.6112],
]

const elRioPoints = [
  // El Rio
  [7.104744114878336, 125.60165178633629],
  [7.090705453702492, 125.60610594733096],
  [7.084123037406412, 125.60570364446355],
  [7.087045608919852, 125.61041635634511],
  [7.073872610697005, 125.61258618254125],
  [7.073098043767731, 125.61083008193943],
  [7.066563242856612, 125.60902952325416],
  [7.066999791931268, 125.60761605949118],
  [7.067146181330044, 125.60577637857969],
  [7.069690881486749, 125.60246116595847],
  [7.068328049291318, 125.60269677193969],
  [7.063129466944814, 125.60948268326861],
  [7.067494888703077, 125.61078633825589],
  [7.067907456388375, 125.61251091091917],
  [7.068639471730258, 125.61217323401357],
  [7.075775751200952, 125.61318946992114],
  [7.07885, 125.61304],
]

const routesArray = [
  emilyHomesPoints,
  calinanPoints,
  routeFourPoints,
  routeElevenPoints,
  elRioPoints,
]
var selectedRoute = ""

function buildRoute(routeIndex, routeName) {
  // Instantiate Leaflet Routing Machine routing control class with selected route options

  var routeWaypoints = routesArray[routeIndex - 1]

  selectedRoute = L.Routing.control({
    name: routeName,
    addWaypoints: false,
    waypoints: routeWaypoints,
    plan: new L.Routing.Plan(routeWaypoints, {
      createMarker: function () {
        return null
      },
    }),
    lineOptions: {
      styles: [{ pane: "pane1", color: "blue", opacity: 1, weight: 2 }],
    },
    collapsible: true,
    serviceUrl: "http://router.project-osrm.org/route/v1",
  }).addTo(map)
}

// Helper function for creating buttons on marker click
function createButton(label, container) {
  var btn = L.DomUtil.create("button", "", container)
  btn.setAttribute("type", "button")
  btn.innerHTML = label
  return btn
}

// Helper function for creating header with landmark name on marker click
function displayMarkerName(markerName, container) {
  var title = L.DomUtil.create("h3", "", container)
  title.innerHTML = markerName
  return title
}

// Landmarks/Waypoints for Emily Homes Route
const emilyHomesMk = L.marker([7.12991, 125.61707], {
  pane: "pane3",
  title: "Emily Homes Subdivision",
})
const watsuiStMk = L.marker([7.10189, 125.6145], {
  pane: "pane3",
  title: "Watsui Street",
})
const redemChurchMk = L.marker([7.09194, 125.61042], {
  pane: "pane3",
  title: "Redemptorist Church",
})
const palmaGilStMk = L.marker([7.08154, 125.61265], {
  pane: "pane3",
  title: "Cor. Palma Gil Street (Obrero)",
})
const cBangoyMk = L.marker([7.07297, 125.61081], {
  pane: "pane3",
  title: "C. Bangoy Street (Ponciano)",
})
const bonifacioStMk = L.marker([7.06756, 125.61078], {
  pane: "pane3",
  title: "Bonifacio Street",
})
const bajadaFlyover = L.marker([7.09194, 125.61042], {
  panse: "pane3",
  interactive: false,
})
const milanMk = L.marker([7.10928, 125.61318], {
  pane: "pane3",
  title: "Milan Store",
})
const villaParkMk = L.marker([7.11773, 125.61791], {
  pane: "pane3",
  title: "Villa Park Subdivision",
})
const countryvilleMk = L.marker([7.12254, 125.62377], {
  pane: "pane3",
  title: "Countryville Executive Homes",
})

// Landmarks/Waypoints for Calinan Route
// const markerName = L.marker([], { pane: 'pane3', title: ''});

const magsaysayMk = L.marker([7.18653, 125.456605], {
  pane: "pane3",
  title: "Magsaysay Villafuerte",
})
const angelFuneralMk = L.marker([7.181298, 125.463911], {
  pane: "pane3",
  title: "Angel Funeral Parlor",
})
const sanRoqueChapMk = L.marker([7.174229, 125.470439], {
  pane: "pane3",
  title: "San Roque Chapel",
})
const riversideMk = L.marker([7.163748, 125.473936], {
  pane: "pane3",
  title: "Riverside",
})
const putingBatoMk = L.marker([7.15588, 125.475882], {
  pane: "pane3",
  title: "Puting Bato",
})
const crossingLAMk = L.marker([7.14556, 125.478442], {
  pane: "pane3",
  title: "Crossing Los Amigos",
})
const talomoBridgeMk = L.marker([7.131711, 125.480776], {
  pane: "pane3",
  title: "Talomo River Bridge",
})
const quarryBridgeMk = L.marker([7.1222, 125.480017], {
  pane: "pane3",
  title: "Quarry Bridge",
})
const oldTagakpanMk = L.marker([7.118167, 125.47967], {
  pane: "pane3",
  title: "Old Tagakpan Road",
})
const umTugbokMk = L.marker([7.105043, 125.488933], {
  pane: "pane3",
  title: "UM Tugbok",
})
const mintalElemMk = L.marker([7.093181, 125.499992], {
  pane: "pane3",
  title: "Mintal Elementary School",
})
const mintalChurchMk = L.marker([7.088477, 125.505881], {
  pane: "pane3",
  title: "Mintal Catholic Church",
})
const tresePequenohMk = L.marker([7.080111, 125.513265], {
  pane: "pane3",
  title: "Trese Catalunan Pequeno",
})
const crossingCatMk = L.marker([7.074083, 125.518753], {
  pane: "pane3",
  title: "Crossing Catalunan Pequeno",
})
const ulasMk = L.marker([7.058994, 125.538541], {
  pane: "pane3",
  title: "Ulas",
})
const tahimikAveMk = L.marker([7.061049, 125.56338], {
  pane: "pane3",
  title: "Tahimik Avenue",
})
const matinaCrossingMk = L.marker([7.058684, 125.568821], {
  pane: "pane3",
  title: "Matina Crossing",
})
const abscbnJunctionMk = L.marker([7.055572, 125.576431], {
  pane: "pane3",
  title: "ABS-CBN Junction",
})
const smCityMk = L.marker([7.050884, 125.588031], {
  pane: "pane3",
  title: "SM City Davao",
})
const ecolandTerminalMk = L.marker([7.057123, 125.600871], {
  pane: "pane3",
  title: "Ecoland Terminal Crossing",
})
const almendrasGymMk = L.marker([7.061989, 125.610295], {
  pane: "pane3",
  title: "Almendras Gym",
})
const roxasAveMk2 = L.marker([7.071042, 125.613146], {
  pane: "pane3",
  title: "Roxas Avenue",
})
const bankerohanMk = L.marker([7.068869, 125.603392], {
  pane: "pane3",
  title: "Bankerohan",
})
const maaCrossingMk = L.marker([7.061861, 125.593002], {
  pane: "pane3",
  title: "Ma-a Crossing",
})
const tulipDriveMk = L.marker([7.060708, 125.588006], {
  pane: "pane3",
  title: "Tulip Drive",
})
const laSuerteGalleraMk = L.marker([7.05867, 125.580629], {
  pane: "pane3",
  title: "La Suerte Gallera",
})

// Landmarks/Waypoints for Route 4
const sanPedroCathMk = L.marker([7.06453, 125.60998], {
  pane: "pane3",
  title: "San Pedro Cathedral (C.M. Recto Avenue)",
})
const adduMk = L.marker([7.07276, 125.61227], {
  pane: "pane3",
  title: "Ateneo de Davao University (Roxas Avenue)",
})
const nissanMk = L.marker([7.08217, 125.61258], {
  pane: "pane3",
  title: "Nissan Cars Davao (J.P. Laurel Avenue)",
})
const abreezaMk = L.marker([7.09041, 125.60995], {
  pane: "pane3",
  title: "Abreeza Ayala Mall",
})
const cybergateDeltaMk = L.marker([7.09642, 125.61729], {
  pane: "pane3",
  title: "Robinsons Cybergate Delta",
})
const pcsoMk = L.marker([7.093, 125.62184], {
  pane: "pane3",
  title: "Philippine Charity Sweepstakes Office (Cabaguio Avenue)",
})
const agdaoFlyoverMk = L.marker([7.08347, 125.62442], {
  pane: "pane3",
  title: "Agdao Flyover",
})
const magsaysayParkMk = L.marker([7.07467, 125.62503], {
  pane: "pane3",
  title: "Magsaysay Park",
})
const roseBakeshopMk = L.marker([7.06855, 125.61889], {
  pane: "pane3",
  title: "Rose Bakeshop (M.L. Quezon Boulevard",
})

// Landmarks/Waypoints for Route 11
const brokenshireMk = L.marker([7.07645, 125.59806], {
  pane: "pane3",
  title: "Brokenshire College (Madapo Hills)",
})
const dxowMk = L.marker([7.07699, 125.60503], {
  pane: "pane3",
  title: "DXOW Radio Station (F. Torres Street)",
})
const shellMk = L.marker([7.08277, 125.61224], {
  pane: "pane3",
  title: "Shell Gasoline Station (F. Torrest Street)",
})
const iqorMk = L.marker([7.07831, 125.61846], {
  pane: "pane3",
  title: "iQor (Lapu-Lapu Street)",
})
const wAquinoMk = L.marker([7.08217, 125.62442], {
  pane: "pane3",
  title: "W. Aquino Street",
})
const sevenElevenMk = L.marker([7.0676, 125.6178], {
  pane: "pane3",
  title: "7-Eleven (M.L. Quezon Street",
})
const sanPedroStMk = L.marker([7.06301, 125.61109], {
  pane: "pane3",
  title: "San Pedro Street",
})
const pnbMk = L.marker([7.06835, 125.60424], {
  pane: "pane3",
  title: "Philippine National Bank (San Pedro Street)",
})

// Landmarks/Waypoints for El Rio Route
const roxasAveMk = L.marker([7.07173, 125.61198], {
  pane: "pane3",
  title: "Roxas Avenue",
})
const davaoTimes = L.marker([7.06884, 125.61161], {
  pane: "pane3",
  title: "Davao City Times",
})
const mercuryDrug = L.marker([7.06759, 125.61081], {
  pane: "pane3",
  title: "Mercury Drug (C.M. Recto Avenue)",
})
const bonifacioRotunda = L.marker([7.06318, 125.60946], {
  pane: "pane3",
  title: "Bonifacio Rotunda",
})
const pichonStMk = L.marker([7.06616, 125.60506], {
  pane: "pane3",
  title: "Pichon Street",
})
const marforiRd = L.marker([7.06952, 125.60216], {
  pane: "pane3",
  title: "Marfori Road",
})
const sanPedroSt2Mk = L.marker([7.06737, 125.60546], {
  pane: "pane3",
  title: "San Pedro Street",
})
const cardBankInc = L.marker([7.067, 125.60761], {
  pane: "pane3",
  title: "Card Bank Inc.",
})
const umMain = L.marker([7.06711, 125.6092], {
  pane: "pane3",
  title: "University of Mindanao - Main",
})
const poncianoMk = L.marker([7.07062, 125.61015], {
  pane: "pane3",
  title: "Ponciano Street",
})
const gaisanoMallMk = L.marker([7.07884, 125.61303], {
  pane: "pane3",
  title: "Gaisano Mall (J.P. Laurel Avenue)",
})
const equitablePciMk = L.marker([7.08604, 125.61104], {
  pane: "pane3",
  title: "Equitable PCI",
})
const phColTechMk = L.marker([7.08595, 125.60867], {
  pane: "pane3",
  title: "Philippine College of Technology",
})
const chineseCemeteryMk = L.marker([7.08674, 125.60591], {
  pane: "pane3",
  title: "Chinese Cemetery",
})
const mineralVilMk = L.marker([7.08893, 125.60532], {
  pane: "pane3",
  title: "Mineral Village (Bacaca)",
})
const dizonResidenceMk = L.marker([7.09565, 125.60296], {
  pane: "pane3",
  title: "Dizon Residence",
})
const elRioMk = L.marker([7.10474, 125.60165], {
  pane: "pane3",
  title: "El Rio Vista Terminal",
})

// Route Waypoint Arrays
const routeWaypoints = [
  [
    bajadaFlyover,
    cBangoyMk,
    bonifacioStMk,
    palmaGilStMk,
    redemChurchMk,
    watsuiStMk,
    milanMk,
    villaParkMk,
    countryvilleMk,
    emilyHomesMk,
  ], // Emily Homes
  [
    magsaysayMk,
    angelFuneralMk,
    sanRoqueChapMk,
    riversideMk,
    putingBatoMk,
    crossingLAMk,
    talomoBridgeMk,
    quarryBridgeMk,
    oldTagakpanMk,
    umTugbokMk,
    mintalElemMk,
    mintalChurchMk,
    tresePequenohMk,
    crossingCatMk,
    ulasMk,
    tahimikAveMk,
    matinaCrossingMk,
    abscbnJunctionMk,
    smCityMk,
    ecolandTerminalMk,
    almendrasGymMk,
    roxasAveMk2,
    bankerohanMk,
    maaCrossingMk,
    tulipDriveMk,
    laSuerteGalleraMk,
  ], // Calinan
  [
    sanPedroCathMk,
    adduMk,
    nissanMk,
    abreezaMk,
    cybergateDeltaMk,
    pcsoMk,
    agdaoFlyoverMk,
    magsaysayParkMk,
    roseBakeshopMk,
  ], // Route 4
  [
    brokenshireMk,
    dxowMk,
    shellMk,
    iqorMk,
    wAquinoMk,
    sevenElevenMk,
    sanPedroStMk,
    pnbMk,
  ], // Route 11
  [
    roxasAveMk,
    davaoTimes,
    mercuryDrug,
    bonifacioRotunda,
    pichonStMk,
    marforiRd,
    sanPedroSt2Mk,
    cardBankInc,
    umMain,
    poncianoMk,
    gaisanoMallMk,
    equitablePciMk,
    phColTechMk,
    chineseCemeteryMk,
    mineralVilMk,
    dizonResidenceMk,
    elRioMk,
  ], // El Rio
]

var routeSelector = document.getElementById("jeep-route")
var routeIndex = 0
var previousRoute = 0
const startingPoints = [
  [emilyHomesMk, bonifacioStMk], // Starting points for Emily Homes Route - Emily Homes & Bonifacio St.
  [magsaysayMk, bankerohanMk], // Staring points for Calinan Route -
  [],
  [],
  [elRioMk, roxasAveMk], // Starting points for El Rio - El Rio Vista Terminal & Roxas Avenue
]
// Display jeepney routes and corresponding waypoints/landmarks
routeSelector.addEventListener("change", function () {
  previousRoute = routeIndex
  var routeName = routeSelector.value
  routeIndex = routeSelector.selectedIndex
  var startSelect = document.getElementById("start-select")

  control.setWaypoints([]) // Clear previously displayed found routes if any
  if (previousRoute != 0) {
    for (var i = 0; i < routeWaypoints[previousRoute - 1].length; ++i) {
      let currentWaypoint = routeWaypoints[previousRoute - 1][i]
      currentWaypoint.removeFrom(map) // Remove previously selected route from view
    }
  }

  if (routeIndex == 0) {
    // Display no routes on option "None"
    selectedRoute.remove(map)
    startSelect.disabled = true
  } else {
    // Display corresponding route and waypoints otherwise
    if (!(selectedRoute === "")) {
      selectedRoute.remove(map)
    }
    buildRoute(routeIndex, routeName)
    selectedRoute.addTo(map)
    for (var j = 0; j < routeWaypoints[routeIndex - 1].length; ++j) {
      let currentWaypoint = routeWaypoints[routeIndex - 1][j]
      currentWaypoint.on("click", destBtnPopup).addTo(map) // Add on-click functionality to each created waypoint on the map
    }
    selectedRoute.hide()

    // Display points of origin for selected route
    if (routeIndex == 1 || routeIndex == 2 || routeIndex == 5) {
      // Only applies to Emily Homes, Calinan, and El Rio routes
      startSelect.disabled = false
      for (var i = 0; i < 2; ++i) {
        startSelect.options[i + 1].text =
          startingPoints[routeIndex - 1][i].options.title
      }
      startSelect.addEventListener("change", function () {
        control.setWaypoints([])
        if (startSelect.selectedIndex == 1) {
          selectedOrigin = 1
        } else if (startSelect.selectedIndex == 2) {
          selectedOrigin = 2
        }
      })
    } else {
      // Disable drop down for Route 4 and Route 11
      startSelect.disabled = true
    }
  }
})

var selectedOrigin
var indexOfStart
var startLatLng
var indexOfEnd
function destBtnPopup(e) {
  // Display waypoint/landmark name and option to set start and end locations on marker click
  this.unbindPopup()
  var popup = L.popup({ content: "", pane: "pane4" })

  // Creating popup that is displayed when clicking on markers
  var container = L.DomUtil.create("div")
  displayMarkerName(e.sourceTarget.options.title, container) // Name of landmark
  var startBtn = createButton("Start from this location", container) // Set starting point button
  var destBtn = createButton("Go to this location", container) // Set end destination button

  var currentLatLng = e.latlng

  L.DomEvent.on(startBtn, "click", function () {
    control.setWaypoints([]) // Clear routing control waypoints array when new starting point is set
    for (var i = 0; i < routeWaypoints[routeIndex - 1].length; ++i) {
      if (currentLatLng === routeWaypoints[routeIndex - 1][i]._latlng) {
        // Retrieve starting point index in route waypoints array
        indexOfStart = i
        startLatLng = currentLatLng // Store starting point latitude and longitude for reversed array computation
      }
    }
    control.spliceWaypoints(0, 1, currentLatLng) // Add starting point to beginning of routing control waypoints array
    popup.remove()
    control.addTo(map)
    control.hide()
  })

  L.DomEvent.on(destBtn, "click", function () {
    // Clear waypoints except start when setting new end destination
    control.spliceWaypoints(
      -1 * (control.getWaypoints().length - 1),
      control.getWaypoints().length - 1
    )

    for (var j = 0; j < routeWaypoints[routeIndex - 1].length; ++j) {
      if (currentLatLng === routeWaypoints[routeIndex - 1][j]._latlng) {
        // Retrieve end point index in route waypoints array
        indexOfEnd = j
      }
    }

    if (selectedOrigin == 1) {
      // Origin from Emily Homes Cabantian or El Rio Vista Terminal
      if (indexOfStart - indexOfEnd == 1) {
        // Waypoints are next to each other
        control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng)
      } else {
        // Waypoints have n number of waypoints between them
        var tempRoute = [...routeWaypoints[routeIndex - 1]].reverse() // Reverse order of waypoint array to easily loop through values
        for (var i = 0; i < tempRoute.length; ++i) {
          if (startLatLng === tempRoute[i]._latlng) {
            // Retrieve starting point index in reversed array
            indexOfStart = i
          }
        }
        for (var j = 0; j < tempRoute.length; ++j) {
          if (currentLatLng === tempRoute[j]._latlng) {
            // Retrieve end point index in reversed array
            indexOfEnd = j
          }
        }
        for (var k = 1; k < indexOfEnd; ++k) {
          // Make sure to go through each waypoint in between start and end destination
          control.spliceWaypoints(k, 1, tempRoute[indexOfStart + k]._latlng)
        }
        control.spliceWaypoints(control.getWaypoints().length, 1, currentLatLng) // Add end destination to routing waypoints array
      }
    } else if (selectedOrigin == 2 || routeIndex == 3 || routeIndex == 4) {
      // Origin from Bonifacio Street or Roxas Avenue or Route 4/11
      if (
        indexOfEnd - indexOfStart == 1 ||
        indexOfEnd - indexOfStart ==
          -1 * (routeWaypoints[routeIndex - 1].length - 1)
      ) {
        // Waypoints are next to each other
        control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng)
      } else if (indexOfEnd < indexOfStart) {
        // Roundtrip / Reverse route order
        control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng)

        var currentIndex = indexOfStart
        var tempIndex = indexOfStart
        for (var k = 0; currentIndex != indexOfEnd; ++k) {
          if (currentIndex == routeWaypoints[routeIndex - 1].length - 1) {
            currentIndex = -1
            tempIndex = k * -1 - 1
          }
          control.spliceWaypoints(
            0 + (k + 1),
            1,
            routeWaypoints[routeIndex - 1][tempIndex + (k + 1)]._latlng
          )
          ++currentIndex
        }
        control.spliceWaypoints(
          control.getWaypoints().length + 1,
          0,
          currentLatLng
        )
      } else {
        // Waypoints have n number of waypoints in between them
        for (var k = 0; k < indexOfEnd - indexOfStart - 1; ++k) {
          control.spliceWaypoints(
            0 + (k + 1),
            1,
            routeWaypoints[routeIndex - 1][indexOfStart + (k + 1)]._latlng
          )
        }
        control.spliceWaypoints(
          control.getWaypoints().length + 1,
          0,
          currentLatLng
        )
      }
    } else {
      // Attempting to set end destination without selecting a point of origin for Emily Homes or El Rio routes
      alert("Please select a point of origin.")
    }

    console.log(control.getWaypoints())
    popup.remove()
    control.addTo(map)
    control.hide()
  })

  popup.setContent(container)
  this.bindPopup(popup)
  popup.setLatLng(currentLatLng).addTo(map)
}

//Changing Views

const matrixViewer = `<div class="text-center"><label class="text-start mt-2 pr-4" for= "matrixSelect"><h6>Choose Matrix to view:</h6></label><br><select class="" name="matrixSelect" id="matrix">
<option value ="0">Acacia-Indangan-Mahayag</option><option value ="1">Bago Aplaya</option><option value ="2">Bangkal</option><option value ="3">Bangkas Heights</option><option value ="4">Baracatan/Toril/Darong</option>
<option value ="5">Buhangin via Dacudao</option><option value ="6">Bunawan via Buhangin</option><option value ="7">Bunawan via Sasa</option><option value ="8">Cabantian-Emily-Suraya Homes</option><option value ="9">Calinan-Bankerohan(PUJ Aircon)</option>
<option value ="10">Catigan</option><option value ="11">Catitipan via Dacudao Ave.</option><option value ="12">Catitipan via JP Laurel Ave.</option><option value ="13">Communal/Country Homes</option><option value ="14">Buhangin via JP Laurel Ave.</option>
<option value ="15">Dacoville</option><option value ="16">Daliaon Route</option><option value ="17">Darong</option><option value ="18">Dona Pilar Subd. via JP Laurel Ave.</option><option value ="19">Ecoland Subd.</option>
<option value ="20">Elenita Heights via Mintal</option><option value ="21">El Rio Vista</option><option value ="22">Inawayan-Sirawan-Binugao</option><option value ="23">Jade Valley</option><option value ="24">Juliville Subd.</option>
<option value ="25">Landmark III</option><option value ="26">Lasang via Buhangin/Malabog</option><option value ="27">Lasang via Sasa</option><option value ="28">Ma-a - Agdao</option><option value ="29">Ma-a - Bankerohan</option>
<option value ="30">Mandug Callawa</option><option value ="31">Manuel Guianga/Tagakpan</option><option value ="32">Marahan/Marilog/Tamugan/Baguio Dist.</option><option value ="33">Matina Aplaya</option><option value ="34">Matina Crossing</option>
<option value ="35">Matina Pangi</option><option value ="36">Mintal</option><option value ="37">Mulig</option><option value ="38">Panabo City - Davao City</option><option value ="39">Panabo City via Buhangin</option>
<option value ="40">Panacan - SM City</option><option value ="41">Panacan via Buhangin</option><option value ="42">Panacan via Cabaguio Ave.</option><option value ="43">Panacan via JP Laurel Ave.</option><option value ="44">Rosalina I</option>
<option value ="45">Rosalina III</option><option value ="46">Circulation Route 10</option><option value ="47">Sasa via JP Laurel</option><option value ="48">Sasa via Cabaguio Ave.</option><option value ="49">Sasa via R.Castillo St.</option>
<option value ="50">Skyline/Catalunan Grande</option><option value ="51">Deca Tacunan (PUJ Aircon)</option><option value ="52">Tagurano</option><option value ="53">Talomo</option><option value ="54">Tibuloy(Toril)/Darong</option>
<option value ="55">Tibungco via Buhangin</option><option value ="56">Tibungco via Cabaguio Ave.</option><option value ="57">Tibungco via R.Castillo St.</option><option value ="58">Tigatto</option><option value ="59">Toril (PUJ Aircon)</option>
<option value ="60">Toril</option><option value ="61">Tugbok-Calinan-Lamanan</option><option value ="62">Ulas</option>
</select> <a><i class="bi bi-question-circle"></i></a></div>
<div class="flex justify-center">
<div class="container w-auto border border-gray-200 mt-2">
    <img class="w-screen" src="src/fare-matrices/0.jpg" alt="" id="matrixPic">
</div>
</div>`

const homeViewer = ``

let matrixWindow = false
const buttonView = document.getElementById("matrixView")
const content = document.getElementById("content")
buttonView.addEventListener("click", isMatrix)
function isMatrix() {
  if (!matrixWindow) {
    if (confirm("Your input will be lost! Proceed?")) {
      buttonView.innerHTML = "Back"
      content.innerHTML = matrixViewer
      const matrixButton = document.getElementById("matrix")
      const matrixPic = document.getElementById("matrixPic")
      if (matrixButton) {
        matrixButton.addEventListener("input", displayMatrix, false)
      }
      sortSelect()
      matrixWindow = true
    }
  } else {
    location.reload()
  }
}

function displayMatrix() {
  let num = document.getElementById("matrix").value
  matrixPic.src = "src/fare-matrices/" + num + ".jpg"
}

function sortSelect() {
  const matrixButton = document.getElementById("matrix")
  var tmpAry = new Array()
  for (var i = 0; i < matrixButton.options.length; i++) {
    tmpAry[i] = new Array()
    tmpAry[i][0] = matrixButton.options[i].text
    tmpAry[i][1] = matrixButton.options[i].value
  }
  tmpAry.sort()
  while (matrixButton.options.length > 0) {
    matrixButton.options[0] = null
  }
  for (var i = 0; i < tmpAry.length; i++) {
    var op = new Option(tmpAry[i][0], tmpAry[i][1])
    matrixButton.options[i] = op
  }
  return
}
