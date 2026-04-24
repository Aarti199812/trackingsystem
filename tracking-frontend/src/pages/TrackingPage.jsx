import React,{useEffect,useState} from "react"; 
import { useParams } from "react-router-dom";
import 'leaflet/dist/leaflet.css';
import { MapContainer,TileLayer,Marker,Popup,useMap } from "react-leaflet";
import axios from "axios";
import'../leaflet-config';

const RecenterMap = ({ position }) => {
    const map = useMap();
    useEffect(() => {
        if (position)map.setView(position);
    }, [position, map]);
    return null;
};

const TrackingPage = () => {
    const { parcelId } = useParams();
    const [location, setLocation] = useState([30.1456, 77.3012]); 
    const fetchLiveLocation = async () => {
        if (!parcelId||parcelId==="undefined") 
        return;
        try {
            const response = await axios.get(`http://localhost:9023/api/parcels/${trackingId}`);    
            if (response.data){
                setLocation([response.data.current_Latitude, response.data.current_Longitude]);
            }
        } catch (error) {
            console.error("Error fetching live location:", error);
        }
    };
    useEffect(() => {
        fetchLiveLocation();
        const interval = setInterval(fetchLiveLocation, 10000); 
        return () => clearInterval(interval);   
    }, [parcelId]);

    return (
        <div style={{padding:"20px"}}>
                <h2 style={{textAlign:"center",color:"#1d4ed8"}}>Tracking Parcel ID: {parcelId}</h2>
        <div style={{ height: "500px", width: "100%", border: "1px solid #ccc",borderRadius:"10px",overflow:"hidden" }}>
            <h3>Live Tracking</h3>
            <MapContainer center={location} zoom={13} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={location}>
                    <Popup>
                        Here is the current location of your parcel.        
                    </Popup>
                </Marker>
                <RecenterMap position={location} /> 
            </MapContainer>
        </div>
        </div>
    );  

};

export default TrackingPage;