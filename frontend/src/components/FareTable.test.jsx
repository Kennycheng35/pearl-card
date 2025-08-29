import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FareTable from './FareTable';

const mockFares = {
    "processed_journeys": [
        {
            "fare": 55,
            "from_zone": 1,
            "id": 1,
            "to_zone": 2
        },
        {
            "fare": 65,
            "from_zone": 1,
            "id": 2,
            "to_zone": 3
        },
        {
            "fare": 30,
            "from_zone": 3,
            "id": 3,
            "to_zone": 3
        }
    ],
    "total_daily_fare": 150
}

describe('FareTable Component', () => {

    test('renders the table with fare data', () => {

        render(<FareTable fares={mockFares} />);


        expect(screen.getByText('Fare Summary')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Filter')).toBeInTheDocument();
        expect(screen.getByText('From Zone ↕')).toBeInTheDocument();
        
        const rows = screen.getAllByRole('row');
        expect(rows).toHaveLength(4); 

        expect(screen.getByText('Total Trip Fare: 150')).toBeInTheDocument();
    });

});
