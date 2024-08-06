import React, { useState, useEffect } from "react";
import Header from "../components/layout/Header";
import axios from "axios";

const ELECTRONIC_CHOICES = [
  "Kompyuter",
  "Noutbuk",
  "Planshet",
  "Smartfon",
  "Televizor",
  "Radioni Kotaruvchi",
  "Fotoapparat",
  "Videokamera",
  "Printer",
  "Skaner",
  "Kseroks",
  "Router",
  "Modem",
  "Monitor",
  "Klaviatura",
  "Sichqoncha",
  "USB Fleshka",
  "Qattiq Disk",
  "SSD Disk",
  "Quvvatlantirgich",
  "Quvvat Banki",
  "Elektr Choynak",
  "Mikrotolqinli Pech",
  "Elektr Pech",
  "Konditsioner",
  "Muzlatgich",
  "Kir Yuvish Mashinasi",
  "Idish Yuvish Mashinasi",
  "Chang Yutgich",
  "Fen",
  "Elektr Chotkasi",
  "Quloqchin",
  "Mikrofon",
  "Kichik Audio Tizim",
  "Speaker",
  "Uy Teatri Tizimi",
  "Oyin Konsoli",
  "Dj Oyin Paneli",
  "Proektor",
  "Elektr Gitara",
  "Elektr Pianino",
  "Sintezator",
  "Elektr Baraban",
  "Elektr Simsiz Qolqop",
  "Elektr Burg'ulash",
  "Lazer Nuri",
  "Elektr Payvandlash Uskunasi",
  "Elektr Korikchi",
  "Elektr Suv Qizdirgich",
  "Elektr Panjara",
  "Elektr Pechka",
  "Elektr Gilam",
  "Elektr Ochoq",
  "Elektr Termometr",
  "Elektr Dazmol",
  "Elektr Tartibga Soluvchi",
  "Elektr Otiradigan Joy",
  "Elektr Mexanizm",
  "Elektr Aspirator",
  "Elektr Kichkina Ventilyator",
  "Elektr Kir Yuvish Mashinasi",
  "Elektr Choyan",
  "Elektr Qog'oz Kesish Mashinasi",
  "Elektr Gosht Maydalash Mashinasi",
  "Elektr Soch Oluvchi Mashina",
  "Elektr Yuz Massaji",
  "Elektr Bolg'a",
  "Elektr Sirenasi",
  "Elektr Eshik Qong'irog'i",
  "Elektr Soat",
  "Elektr Budilnik",
  "Elektr Zarb Beruvchi Mashina",
  "Elektr Matkap",
  "Elektr Mori",
  "Elektr Sim Qotiruvchi",
  "Elektr Ip Orgich",
  "Elektr Tikuv Mashinasi",
  "Elektr Olchagich",
  "Elektr Avtomatika",
  "Elektr Ish Stoli",
  "Elektr Oroq",
  "Elektr Tolov Moslamasi",
];

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState("");
  const [devices, setDevices] = useState([]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectChange = (e) => {
    setSelectedDevice(e.target.value);
  };

  const fetchDevices = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const related_home = user ? user.id : null;

    if (related_home) {
      try {
        const response = await axios.get(
          `https://api.mars-hackathon.uz/electronic/get/${related_home}/`
        );
        setDevices(response.data);
      } catch (error) {
        console.error(
          "Error fetching devices:",
          error.response ? error.response.data : error.message
        );
      }
    } else {
      console.error("User not logged in.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    const related_home = user ? user.id : null;

    if (selectedDevice && related_home) {
      try {
        const response = await axios.post(
          "https://api.mars-hackathon.uz/electronic/add/",
          {
            item: selectedDevice,
            related_home,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Device added:", response.data);
        setSelectedDevice("");
        closeModal();
        fetchDevices(); // Update the devices list after adding a new device
      } catch (error) {
        console.error(
          "Error adding device:",
          error.response ? error.response.data : error.message
        );
      }
    } else {
      console.error("User not logged in or device not selected.");
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  return (
    <div className="text-white min-h-screen p-4 mt-10">
      <Header />
      <div className="text-center my-8">
        <h2 className="text-3xl font-semibold">My Devices</h2>
      </div>
      <div className="container3 flex justify-center items-center w-full">
        <div className="flex flex-wrap gap-5 items-center">
          {devices.map((device, index) => (
            <div
              key={index}
              className="bg-gray-800 p-4 w-[250px] h-[300px] rounded-md text-center flex flex-col items-center justify-center cursor-pointer"
            >
              <span className="text-xl text-white">{device.item}</span>
            </div>
          ))}
          <div
            onClick={openModal}
            className="bg-gray-800 p-4 w-[250px] h-[300px] rounded-md text-center flex flex-col items-center justify-center cursor-pointer"
          >
            <span className="text-4xl text-white">+</span>
            <p className="text-lg font-semibold text-white mt-2">Add another</p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
          <div className="bg-white p-6 rounded-md max-w-lg w-full mx-4 sm:mx-auto sm:max-w-md md:max-w-lg lg:max-w-xl relative">
            <button
              onClick={closeModal}
              className="bg-gray-700 text-white px-4 py-2 rounded-md absolute top-2 right-2"
            >
              Close
            </button>
            <h2 className="text-2xl mb-4 text-center">Add New Device</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Select Device
                </label>
                <select
                  name="device"
                  value={selectedDevice}
                  onChange={handleSelectChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Select a device</option>
                  {ELECTRONIC_CHOICES.map((device, index) => (
                    <option key={index} value={device}>
                      {device}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Add Device
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
