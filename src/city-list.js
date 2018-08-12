const TOP_10_CITIES = [
  {city:'Helsinki', coordinates: '60.170833,24.937500'},
  {city:'Espoo', coordinates: '60.205556,24.655556'},
  {city:'Tampere', coordinates: '61.498056,23.760833'},
  {city:'Vantaa', coordinates: '60.294444,25.040278'},
  {city:'Oulu', coordinates: '65.016667,25.466667'},
  {city:'Turku', coordinates: '60.451389,22.266667'},
  {city:'Jyväskylä', coordinates: '62.240278,25.744444'},
  {city:'Lahti', coordinates: '60.983333,25.655556'},
  {city:'Kuopio', coordinates: '62.892500,27.678333'},
  {city:'Pori', coordinates: '61.484722,21.797222'}
];

const CITIES = [
  {city:'Akaa', coordinates: '61.166667,23.868056'},
  {city:'Alajärvi', coordinates: '63.000000,23.816667'},
  {city:'Alavieska', coordinates: '64.165278,24.306944'},
  {city:'Alavus', coordinates: '62.586111,23.619444'},
  {city:'Asikkala', coordinates: '61.172222,25.547222'},
  {city:'Askola', coordinates: '60.527778,25.600000'},
  {city:'Aura', coordinates: '60.647222,22.590278'},
  {city:'Brändö', coordinates: '60.411111,21.045833'},
  {city:'Eckerö', coordinates: '60.223611,19.556944'},
  {city:'Enonkoski', coordinates: '62.088889,28.933333'},
  {city:'Enontekiö', coordinates: '68.384722,23.638889'},
  {city:'Espoo', coordinates: '60.205556,24.655556'},
  {city:'Eura', coordinates: '61.130556,22.140278'},
  {city:'Eurajoki', coordinates: '61.201389,21.730556'},
  {city:'Evijärvi', coordinates: '63.366667,23.475000'},
  {city:'Finström', coordinates: '60.229167,19.988889'},
  {city:'Forssa', coordinates: '60.813889,23.622222'},
  {city:'Föglö', coordinates: '60.030556,20.387500'},
  {city:'Geta', coordinates: '60.375000,19.845833'},
  {city:'Haapajärvi', coordinates: '63.748611,25.318056'},
  {city:'Haapavesi', coordinates: '64.137500,25.366667'},
  {city:'Hailuoto', coordinates: '65.016667,24.716667'},
  {city:'Halsua', coordinates: '63.463889,24.166667'},
  {city:'Hamina', coordinates: '60.569722,27.198056'},
  {city:'Hammarland', coordinates: '60.216667,19.740278'},
  {city:'Hankasalmi', coordinates: '62.388889,26.436111'},
  {city:'Hanko', coordinates: '59.823611,22.968056'},
  {city:'Harjavalta', coordinates: '61.313889,22.141667'},
  {city:'Hartola', coordinates: '61.579167,26.020833'},
  {city:'Hattula', coordinates: '61.055556,24.370833'},
  {city:'Hausjärvi', coordinates: '60.787500,25.027778'},
  {city:'Heinola', coordinates: '61.202778,26.031944'},
  {city:'Heinävesi', coordinates: '62.426389,28.630556'},
  {city:'Helsinki', coordinates: '60.170833,24.937500'},
  {city:'Hirvensalmi', coordinates: '61.638889,26.780556'},
  {city:'Hollola', coordinates: '60.987500,25.516667'},
  {city:'Honkajoki', coordinates: '61.993056,22.263889'},
  {city:'Huittinen', coordinates: '61.176389,22.698611'},
  {city:'Humppila', coordinates: '60.923611,23.368056'},
  {city:'Hyrynsalmi', coordinates: '64.676389,28.494444'},
  {city:'Hyvinkää', coordinates: '60.630556,24.859722'},
  {city:'Hämeenkoski', coordinates: '61.022222,25.154167'},
  {city:'Hämeenkyrö', coordinates: '61.638889,23.197222'},
  {city:'Hämeenlinna', coordinates: '60.995833,24.465278'},
  {city:'Ii', coordinates: '65.316667,25.372222'},
  {city:'Iisalmi', coordinates: '63.561111,27.188889'},
  {city:'Iitti', coordinates: '60.888889,26.338889'},
  {city:'Ikaalinen', coordinates: '61.769444,23.068056'},
  {city:'Ilmajoki', coordinates: '62.731944,22.580556'},
  {city:'Ilomantsi', coordinates: '62.672222,30.930556'},
  {city:'Imatra', coordinates: '61.193056,28.776389'},
  {city:'Inari', coordinates: '68.659722,27.538889'},
  {city:'Inkoo', coordinates: '60.045833,24.005556'},
  {city:'Isojoki', coordinates: '62.113889,21.958333'},
  {city:'Isokyrö', coordinates: '63.000000,22.325000'},
  {city:'Jalasjärvi', coordinates: '62.488889,22.762500'},
  {city:'Janakkala', coordinates: '60.922222,24.647222'},
  {city:'Joensuu', coordinates: '62.600000,29.763889'},
  {city:'Jokioinen', coordinates: '60.804167,23.486111'},
  {city:'Jomala', coordinates: '60.152778,19.948611'},
  {city:'Joroinen', coordinates: '62.179167,27.827778'},
  {city:'Joutsa', coordinates: '61.741667,26.115278'},
  {city:'Juankoski', coordinates: '63.063889,28.327778'},
  {city:'Juuka', coordinates: '63.241667,29.252778'},
  {city:'Juupajoki', coordinates: '61.797222,24.369444'},
  {city:'Juva', coordinates: '61.897222,27.856944'},
  {city:'Jyväskylä', coordinates: '62.240278,25.744444'},
  {city:'Jämijärvi', coordinates: '61.819444,22.691667'},
  {city:'Jämsä', coordinates: '61.863889,25.190278'},
  {city:'Järvenpää', coordinates: '60.472222,25.088889'},
  {city:'Kaarina', coordinates: '60.406944,22.372222'},
  {city:'Kaavi', coordinates: '62.975000,28.481944'},
  {city:'Kajaani', coordinates: '64.225000,27.733333'},
  {city:'Kalajoki', coordinates: '64.259722,23.948611'},
  {city:'Kangasala', coordinates: '61.463889,24.072222'},
  {city:'Kangasniemi', coordinates: '61.990278,26.643056'},
  {city:'Kankaanpää', coordinates: '61.804167,22.394444'},
  {city:'Kannonkoski', coordinates: '62.976389,25.262500'},
  {city:'Kannus', coordinates: '63.900000,23.916667'},
  {city:'Karijoki', coordinates: '62.306944,21.706944'},
  {city:'Karkkila', coordinates: '60.534722,24.209722'},
  {city:'Karstula', coordinates: '62.877778,24.802778'},
  {city:'Karvia', coordinates: '62.137500,22.561111'},
  {city:'Kaskinen', coordinates: '62.384722,21.222222'},
  {city:'Kauhajoki', coordinates: '62.423611,22.176389'},
  {city:'Kauhava', coordinates: '63.101389,23.063889'},
  {city:'Kauniainen', coordinates: '60.209722,24.729167'},
  {city:'Kaustinen', coordinates: '63.548611,23.690278'},
  {city:'Keitele', coordinates: '63.179167,26.350000'},
  {city:'Kemi', coordinates: '65.736111,24.563889'},
  {city:'Kemijärvi', coordinates: '66.713889,27.433333'},
  {city:'Keminmaa', coordinates: '65.801389,24.544444'},
  {city:'Kemiönsaari', coordinates: '60.163889,22.727778'},
  {city:'Kempele', coordinates: '64.912500,25.508333'},
  {city:'Kerava', coordinates: '60.402778,25.100000'},
  {city:'Keuruu', coordinates: '62.259722,24.706944'},
  {city:'Kihniö', coordinates: '62.208333,23.179167'},
  {city:'Kinnula', coordinates: '63.366667,24.966667'},
  {city:'Kirkkonummi', coordinates: '60.123611,24.438889'},
  {city:'Kitee', coordinates: '62.098611,30.137500'},
  {city:'Kittilä', coordinates: '67.656944,24.908333'},
  {city:'Kiuruvesi', coordinates: '63.652778,26.619444'},
  {city:'Kivijärvi', coordinates: '63.119444,25.075000'},
  {city:'Kokemäki', coordinates: '61.255556,22.348611'},
  {city:'Kokkola', coordinates: '63.838889,23.131944'},
  {city:'Kolari', coordinates: '67.330556,23.777778'},
  {city:'Konnevesi', coordinates: '62.627778,26.287500'},
  {city:'Kontiolahti', coordinates: '62.766667,29.850000'},
  {city:'Korsnäs', coordinates: '62.786111,21.184722'},
  {city:'Koski Tl', coordinates: '60.654167,23.140278'},
  {city:'Kotka', coordinates: '60.467306,26.945833'},
  {city:'Kouvola', coordinates: '60.868056,26.704167'},
  {city:'Kristiinankaupunki', coordinates: '62.273611,21.377778'},
  {city:'Kruunupyy', coordinates: '63.727778,23.033333'},
  {city:'Kuhmo', coordinates: '64.127778,29.518056'},
  {city:'Kuhmoinen', coordinates: '61.563889,25.181944'},
  {city:'Kumlinge', coordinates: '60.259722,20.779167'},
  {city:'Kuopio', coordinates: '62.892500,27.678333'},
  {city:'Kuortane', coordinates: '62.805556,23.506944'},
  {city:'Kurikka', coordinates: '62.616667,22.400000'},
  {city:'Kustavi', coordinates: '60.545833,21.358333'},
  {city:'Kuusamo', coordinates: '65.966667,29.183333'},
  {city:'Kyyjärvi', coordinates: '63.043056,24.563889'},
  {city:'Kärkölä', coordinates: '60.868056,25.277778'},
  {city:'Kärsämäki', coordinates: '63.979167,25.758333'},
  {city:'Kökar', coordinates: '59.920833,20.909722'},
  {city:'Köyliö', coordinates: '61.118056,22.308333'},
  {city:'Lahti', coordinates: '60.983333,25.655556'},
  {city:'Laihia', coordinates: '62.976389,22.011111'},
  {city:'Laitila', coordinates: '60.879167,21.693056'},
  {city:'Lapinjärvi', coordinates: '60.623611,26.197222'},
  {city:'Lapinlahti', coordinates: '63.366667,27.391944'},
  {city:'Lappajärvi', coordinates: '63.218056,23.629167'},
  {city:'Lappeenranta', coordinates: '61.066667,28.183333'},
  {city:'Lapua', coordinates: '62.970833,23.006944'},
  {city:'Laukaa', coordinates: '62.413889,25.954167'},
  {city:'Lavia', coordinates: '61.595833,22.586111'},
  {city:'Lemi', coordinates: '61.061111,27.804167'},
  {city:'Lemland', coordinates: '60.069444,20.086111'},
  {city:'Lempäälä', coordinates: '61.313889,23.752778'},
  {city:'Leppävirta', coordinates: '62.491667,27.787500'},
  {city:'Lestijärvi', coordinates: '63.525000,24.666667'},
  {city:'Lieksa', coordinates: '63.318056,30.025000'},
  {city:'Lieto', coordinates: '60.504167,22.458333'},
  {city:'Liminka', coordinates: '64.809722,25.415278'},
  {city:'Liperi', coordinates: '62.531944,29.384722'},
  {city:'Lohja', coordinates: '60.250000,24.066667'},
  {city:'Loimaa', coordinates: '60.851389,23.058333'},
  {city:'Loppi', coordinates: '60.718056,24.441667'},
  {city:'Loviisa', coordinates: '60.456944,26.225000'},
  {city:'Luhanka', coordinates: '61.797222,25.702778'},
  {city:'Lumijoki', coordinates: '64.837500,25.187500'},
  {city:'Lumparland', coordinates: '60.116667,20.258333'},
  {city:'Luoto', coordinates: '63.752778,22.747222'},
  {city:'Luumäki', coordinates: '60.922222,27.562500'},
  {city:'Luvia', coordinates: '61.361111,21.625000'},
  {city:'Maalahti', coordinates: '62.944444,21.547222'},
  {city:'Maaninka', coordinates: '63.155556,27.300000'},
  {city:'Mariehamn', coordinates: '60.098611,19.944444'},
  {city:'Marttila', coordinates: '60.584722,22.900000'},
  {city:'Masku', coordinates: '60.570833,22.100000'},
  {city:'Merijärvi', coordinates: '64.297222,24.447222'},
  {city:'Merikarvia', coordinates: '61.861111,21.508333'},
  {city:'Miehikkälä', coordinates: '60.670833,27.700000'},
  {city:'Mikkeli', coordinates: '61.687500,27.273611'},
  {city:'Muhos', coordinates: '64.806944,25.994444'},
  {city:'Multia', coordinates: '62.408333,24.794444'},
  {city:'Muonio', coordinates: '67.956944,23.679167'},
  {city:'Mustasaari', coordinates: '63.112500,21.677778'},
  {city:'Muurame', coordinates: '62.129167,25.672222'},
  {city:'Mynämäki', coordinates: '60.679167,21.988889'},
  {city:'Myrskylä', coordinates: '60.669444,25.852778'},
  {city:'Mäntsälä', coordinates: '60.636111,25.319444'},
  {city:'Mänttä-Vilppula', coordinates: '62.033333,24.616667'},
  {city:'Mäntyharju', coordinates: '61.418056,26.879167'},
  {city:'Naantali', coordinates: '60.468056,22.026389'},
  {city:'Nakkila', coordinates: '61.365278,22.004167'},
  {city:'Nastola', coordinates: '60.948611,25.930556'},
  {city:'Nivala', coordinates: '63.929167,24.977778'},
  {city:'Nokia', coordinates: '61.477778,23.509722'},
  {city:'Nousiainen', coordinates: '60.598611,22.083333'},
  {city:'Nurmes', coordinates: '63.544444,29.133333'},
  {city:'Nurmijärvi', coordinates: '60.462500,24.806944'},
  {city:'Närpiö', coordinates: '62.473611,21.337500'},
  {city:'Orimattila', coordinates: '60.804167,25.733333'},
  {city:'Oripää', coordinates: '60.855556,22.697222'},
  {city:'Orivesi', coordinates: '61.677778,24.356944'},
  {city:'Oulainen', coordinates: '64.266667,24.816667'},
  {city:'Oulu', coordinates: '65.016667,25.466667'},
  {city:'Outokumpu', coordinates: '62.725000,29.018056'},
  {city:'Padasjoki', coordinates: '61.350000,25.275000'},
  {city:'Paimio', coordinates: '60.456944,22.686111'},
  {city:'Paltamo', coordinates: '64.406944,27.837500'},
  {city:'Parainen', coordinates: '60.300000,22.300000'},
  {city:'Parikkala', coordinates: '61.555556,29.501389'},
  {city:'Parkano', coordinates: '62.009722,23.025000'},
  {city:'Pedersören kunta', coordinates: '63.600000,22.794444'},
  {city:'Pelkosenniemi', coordinates: '67.108333,27.515278'},
  {city:'Pello', coordinates: '66.775000,23.965278'},
  {city:'Perho', coordinates: '63.215278,24.420833'},
  {city:'Pertunmaa', coordinates: '61.502778,26.479167'},
  {city:'Petäjävesi', coordinates: '62.255556,25.183333'},
  {city:'Pieksämäki', coordinates: '62.300000,27.158333'},
  {city:'Pielavesi', coordinates: '63.231944,26.755556'},
  {city:'Pietarsaari', coordinates: '63.675000,22.704167'},
  {city:'Pihtipudas', coordinates: '63.366667,25.575000'},
  {city:'Pirkkala', coordinates: '61.465278,23.643056'},
  {city:'Polvijärvi', coordinates: '62.854167,29.369444'},
  {city:'Pomarkku', coordinates: '61.693056,22.006944'},
  {city:'Pori', coordinates: '61.484722,21.797222'},
  {city:'Pornainen', coordinates: '60.476389,25.375000'},
  {city:'Porvoo', coordinates: '60.393056,25.663889'},
  {city:'Posio', coordinates: '66.111111,28.166667'},
  {city:'Pudasjärvi', coordinates: '65.359722,26.997222'},
  {city:'Pukkila', coordinates: '60.644444,25.581944'},
  {city:'Punkalaidun', coordinates: '61.111111,23.105556'},
  {city:'Puolanka', coordinates: '64.868056,27.670833'},
  {city:'Puumala', coordinates: '61.523611,28.177778'},
  {city:'Pyhtää', coordinates: '60.492139,26.543028'},
  {city:'Pyhäjoki', coordinates: '64.463889,24.258333'},
  {city:'Pyhäjärvi', coordinates: '63.681944,25.977778'},
  {city:'Pyhäntä', coordinates: '64.097222,26.330556'},
  {city:'Pyhäranta', coordinates: '60.950000,21.444444'},
  {city:'Pälkäne', coordinates: '61.338889,24.268056'},
  {city:'Pöytyä', coordinates: '60.718056,22.602778'},
  {city:'Raahe', coordinates: '64.684722,24.479167'},
  {city:'Raasepori', coordinates: '59.975000,23.436111'},
  {city:'Raisio', coordinates: '60.486111,22.169444'},
  {city:'Rantasalmi', coordinates: '62.066667,28.300000'},
  {city:'Ranua', coordinates: '65.929167,26.516667'},
  {city:'Rauma', coordinates: '61.129167,21.505556'},
  {city:'Rautalampi', coordinates: '62.622222,26.833333'},
  {city:'Rautavaara', coordinates: '63.494444,28.298611'},
  {city:'Rautjärvi', coordinates: '61.433333,29.355556'},
  {city:'Reisjärvi', coordinates: '63.605556,24.931944'},
  {city:'Riihimäki', coordinates: '60.738889,24.772222'},
  {city:'Ristijärvi', coordinates: '64.505556,28.213889'},
  {city:'Rovaniemi', coordinates: '66.501389,25.734722'},
  {city:'Ruokolahti', coordinates: '61.291667,28.819444'},
  {city:'Ruovesi', coordinates: '61.986111,24.068056'},
  {city:'Rusko', coordinates: '60.541667,22.222222'},
  {city:'Rääkkylä', coordinates: '62.312500,29.623611'},
  {city:'Saarijärvi', coordinates: '62.705556,25.256944'},
  {city:'Salla', coordinates: '66.833333,28.666667'},
  {city:'Salo', coordinates: '60.386111,23.125000'},
  {city:'Saltvik', coordinates: '60.275000,20.061111'},
  {city:'Sastamala', coordinates: '61.341667,22.908333'},
  {city:'Sauvo', coordinates: '60.343056,22.693056'},
  {city:'Savitaipale', coordinates: '61.197222,27.683333'},
  {city:'Savonlinna', coordinates: '61.868056,28.886111'},
  {city:'Savukoski', coordinates: '67.291667,28.161111'},
  {city:'Seinäjoki', coordinates: '62.790278,22.840278'},
  {city:'Sievi', coordinates: '63.906944,24.516667'},
  {city:'Siikainen', coordinates: '61.876389,21.822222'},
  {city:'Siikajoki', coordinates: '64.813889,24.762500'},
  {city:'Siikalatva', coordinates: '64.266667,25.866667'},
  {city:'Siilinjärvi', coordinates: '63.075000,27.659722'},
  {city:'Simo', coordinates: '65.661111,25.066667'},
  {city:'Sipoo', coordinates: '60.376389,25.272222'},
  {city:'Siuntio', coordinates: '60.137500,24.227778'},
  {city:'Sodankylä', coordinates: '67.416667,26.593056'},
  {city:'Soini', coordinates: '62.873611,24.205556'},
  {city:'Somero', coordinates: '60.629167,23.513889'},
  {city:'Sonkajärvi', coordinates: '63.669444,27.522222'},
  {city:'Sotkamo', coordinates: '64.130556,28.383333'},
  {city:'Sottunga', coordinates: '60.130556,20.666667'},
  {city:'Sulkava', coordinates: '61.787500,28.370833'},
  {city:'Sund', coordinates: '60.223611,20.169444'},
  {city:'Suomussalmi', coordinates: '64.884722,28.912500'},
  {city:'Suonenjoki', coordinates: '62.625000,27.122222'},
  {city:'Sysmä', coordinates: '61.502778,25.684722'},
  {city:'Säkylä', coordinates: '61.045833,22.345833'},
  {city:'Taipalsaari', coordinates: '61.159722,28.059722'},
  {city:'Taivalkoski', coordinates: '65.576389,28.241667'},
  {city:'Taivassalo', coordinates: '60.562500,21.609722'},
  {city:'Tammela', coordinates: '60.808333,23.759722'},
  {city:'Tampere', coordinates: '61.498056,23.760833'},
  {city:'Tarvasjoki', coordinates: '60.583333,22.737500'},
  {city:'Tervo', coordinates: '62.955556,26.755556'},
  {city:'Tervola', coordinates: '66.088889,24.811111'},
  {city:'Teuva', coordinates: '62.486111,21.747222'},
  {city:'Tohmajärvi', coordinates: '62.226389,30.331944'},
  {city:'Toholampi', coordinates: '63.773611,24.250000'},
  {city:'Toivakka', coordinates: '62.097222,26.081944'},
  {city:'Tornio', coordinates: '65.848611,24.147222'},
  {city:'Turku', coordinates: '60.451389,22.266667'},
  {city:'Tuusniemi', coordinates: '62.811111,28.491667'},
  {city:'Tuusula', coordinates: '60.402778,25.029167'},
  {city:'Tyrnävä', coordinates: '64.763889,25.652778'},
  {city:'Ulvila', coordinates: '61.429167,21.875000'},
  {city:'Urjala', coordinates: '61.080556,23.550000'},
  {city:'Utajärvi', coordinates: '64.762500,26.419444'},
  {city:'Utsjoki', coordinates: '69.906944,27.023611'},
  {city:'Uurainen', coordinates: '62.500000,25.437500'},
  {city:'Uusikaarlepyy', coordinates: '63.522222,22.530556'},
  {city:'Uusikaupunki', coordinates: '60.800000,21.409722'},
  {city:'Vaala', coordinates: '64.559722,26.840278'},
  {city:'Vaasa', coordinates: '63.095833,21.615278'},
  {city:'Valkeakoski', coordinates: '61.266667,24.030556'},
  {city:'Valtimo', coordinates: '63.679167,28.813889'},
  {city:'Vantaa', coordinates: '60.294444,25.040278'},
  {city:'Varkaus', coordinates: '62.313889,27.893056'},
  {city:'Vehmaa', coordinates: '60.686111,21.713889'},
  {city:'Vesanto', coordinates: '62.931944,26.415278'},
  {city:'Vesilahti', coordinates: '61.309722,23.616667'},
  {city:'Veteli', coordinates: '63.473611,23.788889'},
  {city:'Vieremä', coordinates: '63.743056,27.001389'},
  {city:'Vihti', coordinates: '60.416667,24.319444'},
  {city:'Viitasaari', coordinates: '63.075000,25.859722'},
  {city:'Vimpeli', coordinates: '63.161111,23.822222'},
  {city:'Virolahti', coordinates: '60.583333,27.706944'},
  {city:'Virrat', coordinates: '62.240278,23.770833'},
  {city:'Vårdö', coordinates: '60.244444,20.375000'},
  {city:'Vöyri', coordinates: '63.131944,22.252778'},
  {city:'Ylitornio', coordinates: '66.319444,23.670833'},
  {city:'Ylivieska', coordinates: '64.072222,24.537500'},
  {city:'Ylöjärvi', coordinates: '61.550000,23.583333'},
  {city:'Ypäjä', coordinates: '60.804167,23.281944'},
  {city:'Ähtäri', coordinates: '62.550000,24.069444'},
  {city:'Äänekoski', coordinates: '62.604167,25.726389'}
]

export { CITIES, TOP_10_CITIES };


