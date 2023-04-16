import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { useDispatch, useSelector } from 'react-redux';
import L from 'leaflet'; // Импорт библиотеки Leaflet
import Timer from '../components/Timer';
import 'leaflet/dist/leaflet.css'; // Импорт стилей Leaflet
// import { Loader } from '../components/Loader';

// Импорт изображения маркера
import markerIcon from '../assets/google-maps.png';

// Конфигурация маркера
const markerIconConfig = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon,
  iconSize: [30, 30],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export const EventPage = () => {
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleBuyTicket = () => {};
  const handleOpenDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const event = {
    title: 'Премьера "Драйв"',
    memberCount: 15,
    imageUrl:
      'https://i.pinimg.com/550x/e1/a5/ab/e1a5ab6837ae411f48a3c436c771e35f.jpg',
    price: '100$',
    latitude: 47.83393628153078,
    longtitude: 32.82901672846842,
    adress:
      '187, Миру вулиця, Казанка, Казанківська селищна громада, Баштанський район, Миколаївська область, 56000, Україна',
    date: '2023-07-15',
  };
  return (
    <div className='container mx-auto '>
      <div className='flex my-4 justify-between '>
        {/* Render event image */}
        <div className='flex w-3/12'>
          <img src={event.imageUrl} alt={event.title} className='h-auto mr-4' />
        </div>
        {/* Render event title */}
        <div className='flex bg-white w-6/12'>
          {/* Остальной код */}
          <div className='flex flex-col flex-grow p-4 '>
            <h2 className='text-5xl font-bold text-left'>{event.title}</h2>
            <div className='flex w-full h-1/3 items-center'>
              {/* Блок с надписью1 */}
              <div className='flex flex-col items-center justify-center border-r border-gray-300 w-1/2 h-5/6'>
                <h3 className='text-3xl font-bold'>{event.date}</h3>
                <Timer endDate='2023-05-01T00:00:00' />
              </div>
              {/* Блок с надписью2 */}
              <div className='flex flex-grow items-center justify-center h-5/6'>
                <p className='text-center'>Надпись2</p>
              </div>
            </div>
            {/* Компонент с картой */}
            <MapContainer
              center={[event.latitude, event.longtitude]}
              zoom={16}
              style={{ height: '60%', width: '100%' }}>
              <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
              <Marker
                position={[event.latitude, event.longtitude]}
                icon={markerIconConfig}
              />
            </MapContainer>
            <p>{event.adress}</p>
          </div>
        </div>
        {/* Render buy ticket/sign to event button */}
        <div className='border rounded px-4 py-2  flex flex-col items-center self-center w-3/12'>
          <div className='w-full py-5 border-b'>Price: {event.price}</div>
          <div className='w-full border-b py-5'>
            <button
              className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded'
              onClick={handleBuyTicket}>
              Buy Ticket/Sign to Event
            </button>
          </div>
          <div className='flex-grow w-full py-5'>
            {/* Render member count */}
            <div className='flex justify-center'>
              <div className='relative'>
                {/* Render dropdown list with arrow */}
                <button
                  className='bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded'
                  onClick={handleOpenDropdown}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    className='h-5 w-5 inline-block align-middle'>
                    <path
                      fillRule='evenodd'
                      d='M5.293 7.707a1 1 0 0 1 1.414 0L10 10.586l3.293-2.879a1 1 0 1 1 1.414 1.414l-4 3.5a1 1 0 0 1-1.414 0l-4-3.5a1 1 0 0 1 0-1.414z'
                    />
                  </svg>
                </button>
                {isDropdownOpen && (
                  <ul className='absolute left-0 mt-2 bg-gray-200 p-4 rounded max-h-40 overflow-y-auto overflow-x-hidden'>
                    {/* Dropdown list content */}
                    <li className='w-24'>Option 1</li>
                    <li className='w-200'>Option 2</li>
                    <li className='w-200'>Option 3</li>
                    <li className='w-200'>Option 1</li>
                    <li className='w-24'>Option 1</li>
                    <li className='w-200'>Option 2</li>
                    <li className='w-200'>Option 3</li>
                    <li className='w-200'>Option 1</li>
                    <li className='w-24'>Option 1</li>
                    <li className='w-200'>Option 2</li>
                    <li className='w-200'>Option 3</li>
                    <li className='w-200'>Option 1</li>
                    {/* Add more list items as needed */}
                  </ul>
                )}
              </div>
              <div className='flex items-center ml-2'>
                Participants: {event.memberCount}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-10'>
        <h2 className='text-xl font-bold text-center'>Description</h2>
        <p className='text-start'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
          consectetur lorem massa, volutpat ullamcorper dolor accumsan sed.
          Pellentesque felis risus, dapibus vehicula nibh sed, accumsan blandit
          nunc. Vivamus vitae malesuada ex, eu congue augue. Quisque non lectus
          sed nisi iaculis faucibus. Mauris a vehicula dolor, at suscipit justo.
          Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras
          pretium convallis nulla nec sollicitudin. Duis laoreet pellentesque
          dui, vitae sodales justo rhoncus a. Ut nec lacinia augue, feugiat
          dictum purus. Nunc ac erat nisl. Ut et purus fringilla, tristique
          sapien quis, varius justo. Maecenas bibendum tempor scelerisque.
          Mauris at elit id sem commodo elementum eget non ante. Vestibulum
          volutpat vel ipsum sit amet vehicula. Ut suscipit odio diam, sit amet
          efficitur enim iaculis ac. Nulla et aliquet ante. Phasellus pulvinar
          magna eget aliquet convallis. Vivamus eleifend eros ut nunc congue
          tincidunt. Vestibulum imperdiet bibendum accumsan. Curabitur feugiat
          leo maximus euismod accumsan. Nunc dictum dictum eros, ut pharetra
          diam consequat vel. Nulla rutrum ipsum fringilla, imperdiet mauris
          sed, blandit lacus. Vestibulum ante ipsum primis in faucibus orci
          luctus et ultrices posuere cubilia curae; Integer accumsan scelerisque
          semper. Nulla vehicula auctor nisi non laoreet. Fusce iaculis
          scelerisque posuere. Pellentesque a orci sed neque auctor tincidunt.
          Aenean diam justo, condimentum id erat a, condimentum ullamcorper
          nulla. Integer at aliquet arcu, non tristique mi. Maecenas mollis
          hendrerit lacus quis sollicitudin. Aenean sem sapien, congue a est
          dapibus, lobortis vulputate mi. In vitae nulla elementum, condimentum
          lectus pretium, sollicitudin neque. Cras vitae molestie nisl, non
          pulvinar est. Etiam laoreet felis vel tempus elementum. Vestibulum
          ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
          curae; Suspendisse viverra libero in urna sollicitudin ultrices.
          Aliquam cursus tellus elit, nec ultrices neque posuere vel. Curabitur
          vestibulum interdum neque id pharetra. Phasellus gravida, arcu vitae
          faucibus pharetra, ante nunc rhoncus nibh, pellentesque bibendum
          ligula lacus nec sem. Nullam et convallis velit. Curabitur eu nibh
          eget arcu laoreet porta. Mauris viverra id lacus eu aliquet. Morbi a
          lacinia purus. Sed eget lacus sit amet massa pulvinar iaculis ut eget
          leo. Nunc tristique, erat ac maximus facilisis, augue leo lobortis
          felis, in hendrerit orci nibh sit amet dolor. Donec justo dui,
          pellentesque et ullamcorper at, sollicitudin vel quam. Sed euismod
          eget dolor ut hendrerit. Maecenas quis dapibus ante, sit amet
          pellentesque nibh. Duis turpis nisi, interdum a nunc sit amet,
          accumsan cursus tortor. Mauris eu erat quis tellus bibendum auctor. In
          nunc felis, aliquet eget elementum non, suscipit vitae libero. Vivamus
          hendrerit, neque eget cursus vulputate, lectus orci maximus sem, quis
          tempus turpis lorem in nunc. Nulla feugiat faucibus velit, non varius
          ligula dictum eget. Integer dignissim, dolor feugiat sagittis commodo,
          lectus enim accumsan massa, mollis pulvinar orci neque maximus eros.
          Duis ornare imperdiet posuere. Nullam at tincidunt lacus, sit amet
          fermentum mauris. Nunc nec turpis ac dui interdum volutpat eget ac
          nunc. Quisque nisl arcu, vehicula et sollicitudin vitae, tristique sed
          velit. Integer blandit est vel venenatis aliquet. Donec fringilla
          tortor ut nisi fringilla, ut efficitur quam euismod. Proin at rhoncus
          justo. Phasellus eros arcu, auctor et rutrum quis, pulvinar a lacus.
          Etiam libero dolor, eleifend eget faucibus lobortis, malesuada ut
          metus. Quisque fringilla ut justo vitae malesuada.
        </p>
      </div>
    </div>
  );
};
