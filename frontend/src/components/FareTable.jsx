import React, { useState, useMemo, useEffect } from 'react';
import './FareTable.css'

const FareTable = ({fares}) => {

    const [filter, setFilter] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedAndFilteredFares = useMemo(() => {
        if (!fares || !fares.processed_journeys) {
        return [];
        }

        let filtered = fares.processed_journeys;
        if (filter) {
            if (filter[0] === '>') {
                
                filtered = fares.processed_journeys.filter(journey => {
                    return journey.fare > parseInt(filter.slice(1))
                })
            }
            else if (filter[0] === '<') {
                filtered = fares.processed_journeys.filter(journey => {
                    return journey.fare < parseInt(filter.slice(1))
                })
            }
            else {
                filtered = fares.processed_journeys.filter(journey => {
                    const from = String(journey.from_zone);
                    const to = String(journey.to_zone);
                    const fare = String(journey.fare);
                    const filterLower = filter.toLowerCase();

                    return (
                        from.includes(filterLower) ||
                        to.includes(filterLower) ||
                        fare.includes(filterLower)
                    );
                });
            }
        }

        if (sortConfig.key) {
            filtered.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        
        return filtered;

    }, [fares, filter, sortConfig]); 

    if (!fares) {
      return null;
    }

    const table = () => {
        return (
            <div className="results-container">
                <h2 className="results-title">Fare Summary</h2>
                <div className="filter-container">
                    <input
                    type="text"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    placeholder="Filter"
                    className="filter-input"
                    />
                </div>
                <div className='fares-table'>
                    <table className="results-table">
                        <thead>
                        <tr>
                            <th onClick={() => requestSort('from_zone')}>From Zone ↕</th>
                            <th onClick={() => requestSort('to_zone')}>To Zone ↕</th>
                            <th onClick={() => requestSort('date')}>Date ↕</th>
                            <th onClick={() => requestSort('fare')}>Fare ↕</th>
                        </tr>
                        </thead>
                        <tbody>
                        {sortedAndFilteredFares.map(journey => (
                            <tr key={journey.id}>
                            <td>{journey.from_zone}</td>
                            <td>{journey.to_zone}</td>
                            <td>{journey.date}</td>
                            <td>{journey.fare}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>      
                <div className="total-fare">
                    <h3>Total Trip Fare: {fares.total_daily_fare}</h3>
                </div>
            </div>
        )
    }

    return (
        <div>
            {fares?.processed_journeys && fares.processed_journeys.length > 0 ? table() : "" }
        </div>    
    );
}

export default FareTable;