import React, {useState, useEffect} from 'react';
import ZoneInput from "./ZoneInput"
import { getZones, calculateFares } from '../services/FareService';
import FareTable from './FareTable';
import './ZoneForm.css';


const ZoneForm = () => {

    const [zones, setZones] = useState([])
    const [journeys, setJourneys] = useState([]);
    const [totalFare, setTotalFare] = useState([]);
    const [isForm, setIsForm] = useState(true);


    const handleJourneyChange = (id, event) => {
        const { name, value } = event.target; 

        const newJourneys = journeys.map(journey => {
            if (journey.id === id) {
                
                if (name === 'date') {
                    return { ...journey, date: value };
                } 
                else {
                    const selectedZoneId = parseInt(value);
                    const selectedZoneObject = zones.find(zone => zone.id === selectedZoneId);
                    return { ...journey, [name]: selectedZoneObject };
                }
            }
            return journey;
        });

        console.log(newJourneys);
        setJourneys(newJourneys);
    };


    const handleAddJourney = () => {
        setJourneys([...journeys, { id: Date.now(), fromZone: zones[0], toZone: zones[0], date: new Date().toLocaleDateString() }]);
        console.log(journeys)
    };

    const handleRemoveJourney = (id) => {
        setJourneys(journeys.filter(journey => journey.id !== id));
    };

    const handleSubmit = async () => {
        console.log(journeys);
        const payload = {journeys: journeys.map((journey) => {
            console.log('tozone', journey.toZone)
            return {
                "date": journey.date,
                "from_zone": journey.fromZone.id,
                "to_zone": journey.toZone.id
            }
        })}
        console.log(payload);
        const totalFares = await calculateFares(payload);
        console.log(totalFares);

        setTotalFare(totalFares);
        setIsForm(false);
    }

    const handleRedo = async () => {
        setIsForm(true);
    }

    const handleRestart = async () => {
        setJourneys([{id: Date.now(), fromZone: zones[0], toZone: zones[0], date: new Date().toLocaleDateString() }])
    }

    useEffect(() => {
        const fetchZone = async () => {
            const zoneData = await getZones();
            console.log(zoneData);
            setZones(zoneData);
            setJourneys([...journeys, { id: Date.now(), fromZone: zoneData[0], toZone: zoneData[0], date: new Date().toLocaleDateString() }])
        }

        fetchZone();
    }, [])


    return (
        <>
            {isForm ?
            <div>
                <div>
                    <h2 className='trip-header'>
                        Enter Your Trips
                    </h2>  
                </div>
                <div className='form-container'>
                {journeys.map((journey) => (
                    <ZoneInput 
                        key={journey.id}
                        journey={journey}
                        zones={zones}
                        onJourneyChange={handleJourneyChange}
                        onRemoveJourney={handleRemoveJourney}
                        isRemoveDisabled={journeys.length <= 1}
                    />
                ))}
                </div>
                
                <div className='button-container'>
                    <button 
                        className="form-button" 
                        onClick={handleAddJourney}
                        disabled={journeys.length>=20}
                    >
                        + Add Trip
                    </button>
                    <button 
                        className="form-button"
                        onClick={handleSubmit}
                    >
                        Calculate All Fares
                    </button>
                    <button 
                        className="form-button"
                        onClick={handleRestart}
                    >
                        Restart
                    </button>
                </div>
            </div>
             :
            
            <div>
                <FareTable fares={totalFare} />
                <button
                    className="form-button" 
                    onClick={handleRedo}
                >
                    Redo
                </button>
            </div>
            }
        </>
    )
    
}

export default ZoneForm;