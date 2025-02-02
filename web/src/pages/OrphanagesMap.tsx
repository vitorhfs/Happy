import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import mapMarkerImg from '../images/map-marker.svg';
import '../styles/pages/orphanages-map.css';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import mapIcon from '../utils/mapIcon';
import api from '../services/api';

interface Orphanage {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

function OrphanagesMap(){
    const [ orphanages, setOrphanages ] = useState<Orphanage[]>([]);

    useEffect(() => {
        api.get('orphanages')
            .then(response => {
                setOrphanages(response.data);
            });
    }, []);

    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy"/>

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <strong>Rio do Sul</strong>
                    <span>Santa Catarina</span>
                </footer>
            </aside>
            <Map 
                center={[-25.4360474,-49.2608146]}
                zoom={12}
                style={{
                    width: '100%', 
                    height: '100%'
                }}
            >
                {
                    orphanages.map(orphanage => {
                        return (
                            <Marker 
                                position={[orphanage.latitude, orphanage.longitude]}
                                icon={mapIcon}
                                key={orphanage.id}
                            >
                                <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                                    {orphanage.name}
                                    <Link to={`orphanages/${orphanage.id}`}>
                                        <FiArrowRight size={20} color="#FFF" />
                                    </Link>
                                </Popup>
                            </Marker>
                        )
                    })
                }
                

                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {/* <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}/> */}
            </Map> 

            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#ffffff"/>
            </Link>
        </div>
    );
}

export default OrphanagesMap;