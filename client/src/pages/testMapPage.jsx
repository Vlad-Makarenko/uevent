import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Импорт стилей Leaflet
import L from 'leaflet'; // Импорт библиотеки Leaflet

// Импорт изображения маркера
import markerIcon from '../assets/google-maps.png';
import PaymentModal from '../components/PaymentModal';

// Конфигурация маркера
const markerIconConfig = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon,
  iconSize: [30, 30],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export const TestMapPage = () => {
  const eventOne = {
    title: 'Премьера "Драйв"',
    memberCount: 15,
    imageUrl:
      'https://i.pinimg.com/550x/e1/a5/ab/e1a5ab6837ae411f48a3c436c771e35f.jpg',
    price: '100$',
    latitude: 47.83393628153078,
    longtitude: 32.82901672846842,
    address: '',
  };
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [isMarkerVisible, setMarkerVisible] = useState(false); // Состояние для видимости маркера

  // Обработчик клика на карте
  const handleClick = (event) => {
    console.log(event);
    const { lat, lng } = event.latlng;
    setLatitude(lat);
    setLongitude(lng);
    fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
    )
      .then((response) => response.json())
      .then((data) => {
        setAddress(data.display_name);
        const temp = {
          latitude: lat,
          longitude: lng,
          address: data.display_name,
        };
        console.log(JSON.stringify(temp));
        console.log(JSON.parse(JSON.stringify(temp)));
      })
      .catch((error) => console.error(error));
    setMarkerVisible(true); // Показываем маркер при клике на карту
  };

  // Компонент-обработчик событий на карте
  const MapEventsHandler = () => {
    useMapEvents({
      click: handleClick,
    });
    return null;
  };

  return (
    <div className='flex bg-white rounded-lg shadow-lg'>
      <div className='flex flex-col flex-grow p-4 justify-between'>
        <PaymentModal></PaymentModal>
        <h2 className='text-xl font-bold text-left'>{eventOne.title}</h2>
        <MapContainer
          center={[eventOne.latitude, eventOne.longtitude]}
          zoom={16}
          style={{ height: '320px', width: '100%' }}
          // Устанавливаем стиль курсора при наведении на карту
          className='cursor-pointer'
        >
          <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
          {/* Показываем маркер, если isMarkerVisible равен true */}
          {isMarkerVisible && (
            <Marker position={[latitude, longitude]} icon={markerIconConfig} />
          )}
          <MapEventsHandler />
        </MapContainer>
        <p>Адрес: {address}</p>
        <p>Широта: {latitude}</p>
        <p>Долгота: {longitude}</p>
      </div>
    </div>
  );
};
