import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ZoneForm from './ZoneForm';
import { getZones, calculateFares } from '../services/FareService';

vi.mock('../services/FareService');

const mockZones = [
  { id: 1, name: 'Zone 1' },
  { id: 2, name: 'Zone 2' },
  { id: 3, name: 'Zone 3' },
];

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

describe('ZoneForm Component', () => {
  
    beforeEach(() => {
        getZones.mockResolvedValue(mockZones);
        calculateFares.mockResolvedValue(mockFares);
    });

    test('fetches zones and renders the initial form on mount', async () => {
        render(<ZoneForm />);

        expect(getZones).toHaveBeenCalledTimes(1);

        expect(await screen.findByText('Enter Your Trips')).toBeInTheDocument();
        
        expect(screen.getByRole('button', { name: '+ Add Trip' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Calculate All Fares' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Restart' })).toBeInTheDocument();

    })
});