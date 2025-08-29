import React from 'react';
import './ZoneInput.css'

const ZoneInput = ({ journey, zones, onJourneyChange, onRemoveJourney, isRemoveDisabled }) => {
    
    return (
        <div className='inputRow'>
            <span className='zoneInput'>
                <label htmlFor={`from-zone-${journey.id}`} className='zoneLabel'>From</label>
                <select 
                    className='dropdown'
                    id={`from-zone-${journey.id}`}
                    name="fromZone" 
                    value={journey.fromZone?.id || ''}
                    onChange={(e) => onJourneyChange(journey.id, e)}                    
                    required
                >
                    <option value="" disabled>Select a zone</option>
                    {zones.map(zone => (
                    <option key={zone.id} value={zone.id}>
                        {zone.name}
                    </option>
                    ))}
                </select>
            </span>

            <span className='zoneInput'>
                <label htmlFor={`to-zone-${journey.id}`} className='zoneLabel'>To</label>
                <select 
                    className='dropdown'
                    id={`to-zone-${journey.id}`}
                    name="toZone"
                    value={journey.toZone?.id || ''}
                    onChange={(e) => onJourneyChange(journey.id, e)}                    
                    required
                >
                    <option value="" disabled>Select a zone</option>
                    {zones.map(zone => (
                    <option key={zone.id} value={zone.id}>
                        {zone.name}
                    </option>
                    ))}
                </select>
            </span>

            <span>
                <button
                    type="button"
                    className="remove-button"
                    onClick={() => onRemoveJourney(journey.id)}
                    disabled={isRemoveDisabled}
                >
                    -
                </button>
            </span>

        </div>
    )
}

export default ZoneInput;