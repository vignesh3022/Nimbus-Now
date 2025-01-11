import React, { useEffect, useState, useCallback } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoIosWater } from "react-icons/io";
import { BsWind, BsThermometerHalf } from "react-icons/bs";
import { FaSun } from "react-icons/fa";
import {toast, ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import Navbar from './Navbar';
import { motion, AnimatePresence } from "framer-motion";
import Tilt from 'react-parallax-tilt';
import Notification from './components/Notification';

const App = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [datas, setDatas] = useState({});
  const [temp, setTemp] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [description, setDescription] = useState(0);
  const [name, setName] = useState(0);
  const [windspeed, setWindspeed] = useState(0);
  const [suggestions, setSuggestions] = useState([]);

  const [mode, setMode] = useState('light'); //Whether darkmode is enabled or not
  const darkTheme = localStorage.getItem("theme");
  const [showNote, setShowNote] = useState(true);

  const toggleMode=()=>{
    if(mode==='light'){
      setMode('dark');
      localStorage.setItem("theme", true);
      document.body.classList.add('dark-mode');
    }
    else if(mode==='dark'){
      setMode('light');
      localStorage.setItem("theme", false);
      document.body.classList.remove('dark-mode');
    }
  }

  const determineweatherurl = useCallback((description) => {
    let imurl = "https://png.pngtree.com/background/20230427/original/pngtree-clouds-above-a-bright-sky-picture-image_2494866.jpg";

    if(description?.includes("clear")) imurl="https://t4.ftcdn.net/jpg/05/79/25/43/360_F_579254301_VQ75mtrG9AP45Txrd76TG2xatiBqqms2.jpg";
    if(description?.includes("thunderstorm")) imurl="https://wallpapers.com/images/featured/thunderstorm-pictures-97rx4g6v02r11rnj.jpg";
    if(description?.includes("smoke")) imurl="https://images.unsplash.com/photo-1499346030926-9a72daac6c63?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NHx8fGVufDB8fHx8fA%3D%3D";
    if(description?.includes("drizzle")) imurl="https://media.istockphoto.com/id/1455038582/photo/rain-drop.jpg?s=1024x1024&w=is&k=20&c=mvnF49jBxzMW0vAhm35lhF2PraoOX6PcemprgF4liwI=";
    if(description?.includes("rain")) imurl="https://images.unsplash.com/photo-1519692933481-e162a57d6721?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmFpbnxlbnwwfHwwfHx8MA%3D%3D";
    if(description?.includes("snow")) imurl="https://c4.wallpaperflare.com/wallpaper/649/546/461/forest-winter-christmas-tree-8k-wallpaper-preview.jpg";
    if(description?.includes("clouds")) imurl="https://t4.ftcdn.net/jpg/05/79/25/43/360_F_579254301_VQ75mtrG9AP45Txrd76TG2xatiBqqms2.jpg";
    if(description?.includes("fog")) imurl="https://images.unsplash.com/photo-1487621167305-5d248087c724?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    if(description?.includes("haze")) imurl="https://images.pexels.com/photos/1367192/pexels-photo-1367192.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500";
    if(description?.includes("mist")) imurl="https://c1.wallpaperflare.com/preview/880/231/618/tree-mist-fog-cloudy.jpg";
    if(description?.includes("dust")) imurl="https://www.aoa.org/AOA/Images/News_2020/dust-cloud900.jpg";
    if(description?.includes("sand")) imurl="https://wallpapercave.com/wp/wp8901198.jpg";
    if(description?.includes("ash")) imurl="http://i.cdn.turner.com/cnn/2011/WORLD/americas/06/19/chile.volcano/t1larg.chile.volanco.ash.afp.gi.jpg";
    if(description?.includes("squalls")) imurl="https://www.weatherzone.com.au/news-thumbnail/2941205";
    if(description?.includes("tornado")) imurl="https://t3.ftcdn.net/jpg/05/52/91/38/360_F_552913869_hg4c56rhJ2ECr5eXQFr3WvGgkhOFjNDR.jpg";

    return imurl;
  }, []);

  const callbyname = async () => {
    if (city.length !== 0 && country.length !== 0) {
      await Axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=a9553eeffc4cfe23a2011d3fb64edc72`
      ).then(({data}) => {
        setDescription(data.weather[0].description || ""); // Ensure description is a string
        toast.success("SUCCESSFULLY Fetched weather", {theme: 'dark'})
        setDatas(data);
          setCity("");
          setCountry("");
      }).catch((err) => {
        toast.error("ERROR, Please check & try again", { theme: "dark" });
      })


        const igurl=determineweatherurl(description);
        document.body.style.background = `#f3f3f3 url('${igurl}') no-repeat`;
        document.body.style.backgroundSize='cover';

    } else{
      return toast.warn("Please Enter Details !!",{theme: "dark"});
    }
  };

  const handleKeyStroke= (e) => {
    if (e.keyCode === 13) {
      callbyname();
    }
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setCity(inputValue);
    if (!inputValue) {
      setSuggestions([]);
      return;
    }
    getSuggestions(inputValue);
    var val = document.getElementById("inp1").value;
    var opts = document.getElementById('suggestions').children;
    const selectedOption = Array.from(opts).find(option => option.value === val);
    if (selectedOption) {
      const [city, country] = selectedOption.value.split("(").map(item => item.trim().toLowerCase().replace(/\)/g, ''));
      setCity(city);
      setCountry(country);
    }
  };
  
  const getSuggestions = async (input) => {
    try {
      const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(input)}`);
      const data = await response.json();
      if (data.results) {
        setSuggestions(data.results);
      } else {
        console.error('Error fetching suggestions: No results found in the response.');
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  useEffect(() => {
    if (description) {
      document.body.style.background = `#f3f3f3 url('${determineweatherurl(description)}') no-repeat`;
      document.body.style.backgroundSize = 'cover';
    }
  }, [description, determineweatherurl]);

  useEffect(() => {
    if (darkTheme === "true") {
      toggleMode();
    }
  }, []);
  
  const location = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  };

  useEffect(() => {
    location();
  }, []);

  useEffect(() => {
    if (Object.keys(datas).length > 0) {
      setTemp(Math.ceil(datas.main?.temp - 273.15));
      setHumidity(datas.main?.humidity);
      setName(datas.name);
      setDescription(datas.weather[0].description);
      setWindspeed(datas.wind?.speed);
    }
  }, [datas]);

  // Hide the note after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNote(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className={`relative min-h-screen transition-all duration-500 ${
        mode === 'dark' 
          ? 'bg-gradient-to-br from-gray-900/90 via-purple-900/90 to-violet-900/90'
          : 'bg-gradient-to-br from-indigo-500/90 via-purple-500/90 to-pink-500/90'
      }`}>
        <Navbar mode={mode} toggleMode={toggleMode} />
        <Notification show={showNote} />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="container mx-auto px-4 py-8"
        >
          <Tilt
            className="max-w-md mx-auto"
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            perspective={1000}
            scale={1.02}
            transitionSpeed={2000}
            gyroscope={true}
          >
            <motion.div 
              className="backdrop-blur-lg bg-white/10 rounded-3xl p-8 shadow-2xl border border-white/20"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.h1 
                className="text-4xl font-bold text-white text-center mb-8"
                animate={{ 
                  textShadow: [
                    "0 0 7px #fff",
                    "0 0 10px #fff",
                    "0 0 21px #fff",
                    "0 0 42px #bc13fe",
                    "0 0 82px #bc13fe",
                    "0 0 92px #bc13fe",
                    "0 0 102px #bc13fe",
                    "0 0 151px #bc13fe"
                  ]
                }}
                transition={{ duration: 2, }}
              >
                Weather Forecast
              </motion.h1>
              
              <div className="space-y-6">
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="Enter City Name"
                    value={city}
                    className="w-full p-4 rounded-xl bg-white/20 border-white/30 text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:bg-white/30 transition-all duration-300"
                    id="inp1"
                    list="suggestions"
                    onKeyDown={handleKeyStroke}
                    onChange={handleInputChange}
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500/30 to-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"/>
                </div>

                <div className="relative group">
                  <input
                    type="text"
                    placeholder="Enter Country Name"
                    value={country}
                    className="w-full p-4 rounded-xl bg-white/20 border-white/30 text-white placeholder-white/70 focus:ring-2 focus:ring-white/50 focus:bg-white/30 transition-all duration-300"
                    id="inp2"
                    onKeyDown={handleKeyStroke}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/30 to-indigo-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"/>
                </div>

                <datalist id="suggestions">
                  {suggestions.map((suggestion, index) => (
                    <option key={index} value={`${suggestion.name} (${suggestion.country})`} />
                  ))}
                </datalist>
                
                <button
                  type="button"
                  className="w-full p-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold uppercase tracking-wider hover:from-pink-600 hover:to-purple-700 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl"
                  onClick={callbyname}
                  id="b1"
                >
                  Get Weather
                </button>
              </div>
            </motion.div>
          </Tilt>

          <AnimatePresence>
            {!!temp && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={cardVariants}
                className="max-w-4xl mx-auto mt-8"
              >
                <Tilt tiltMaxAngleX={3} tiltMaxAngleY={3} scale={1.02}>
                  <div className="backdrop-blur-lg bg-white/10 rounded-3xl p-8 shadow-2xl border border-white/20">
                    <motion.div 
                      className="text-center mb-8 space-y-2"
                      animate={{ 
                        scale: [1, 1.02, 1],
                        transition: { duration: 2, repeat: Infinity }
                      }}
                    >
                      <h2 className="text-5xl font-bold text-white animate-pulse-slow">{name}</h2>
                      <p className="text-xl text-white/80 capitalize">{description}</p>
                    </motion.div>
                    
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                      {[
                        { icon: BsThermometerHalf, value: `${temp}°C`, label: "Temperature", color: "text-red-400" },
                        { icon: IoIosWater, value: `${humidity}%`, label: "Humidity", color: "text-blue-400" },
                        { icon: FaSun, value: description, label: "Condition", color: "text-yellow-400", isDescription: true },
                        { icon: BsWind, value: windspeed, label: "Wind Speed", color: "text-cyan-400" }
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          className="group"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Tilt scale={1.1} tiltMaxAngleX={15} tiltMaxAngleY={15}>
                            <div className="py-8 rounded-2xl bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 h-full">
                              <div className="text-center space-y-4">
                                <motion.div
                                  animate={{ 
                                    y: [0, -10, 0],
                                    rotateZ: [0, 5, -5, 0]
                                  }}
                                  transition={{ duration: 4, repeat: Infinity }}
                                >
                                  <item.icon className={`mx-auto text-4xl ${item.color}`} />
                                </motion.div>
                                <div>
                                  <motion.p 
                                    className={`text-3xl font-bold text-white ${item.isDescription ? 'text-xl' : 'text-3xl'}`}
                                    whileHover={{ scale: 1.1 }}
                                  >
                                    {item.value}
                                  </motion.p>
                                  <p className="text-sm text-white/70">{item.label}</p>
                                </div>
                              </div>
                            </div>
                          </Tilt>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
