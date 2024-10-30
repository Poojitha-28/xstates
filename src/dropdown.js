import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dropdown() {
    const [countries, setCountries] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [states, setStates] = useState([]);
    const [selectedStateOption, setStateSelectedOption] = useState('');
    const [cities, setCities] = useState([]);
    const [selectedCityOption, setCitySelectedOption] = useState('');
    const [displaymessage, setDisplayMessage] = useState('');


    // Fetch countries on component mount
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('https://crio-location-selector.onrender.com/countries');
                setCountries(response.data);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };
        fetchCountries();
    }, []);

    const countryChange = async (e) => {
        const country = e.target.value;
        setSelectedOption(country); // Set the selected country
        setStateSelectedOption(''); // Reset state selection
        setCities([]); // Clear previous cities
        setDisplayMessage('');
        try {
            const response = await axios.get(`https://crio-location-selector.onrender.com/country=${country}/states`);
            setStates(response.data);
        } catch (error) {
            console.error('Error fetching states:', error);
        }
    };

    const stateChange = async (e) => {
        const state = e.target.value;
        setStateSelectedOption(state); // Set the selected state
        setCitySelectedOption(''); // Reset city selection
        setDisplayMessage('');

        try {
            const response = await axios.get(`https://crio-location-selector.onrender.com/country=${selectedOption}/state=${state}/cities`);
            setCities(response.data);
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    };

    return (
        <div>
            <select id="countries" value={selectedOption} onChange={countryChange}>
                <option value="" disabled>Select Country</option>
                {countries.map((country, index) => (
                    <option key={index} value={country}>
                        {country} {/* Display country name */}
                    </option>
                ))}
            </select>
            <select id="states" value={selectedStateOption} onChange={stateChange} disabled={!selectedOption}>
                <option value="" disabled>Select State</option>
                {states.map((state, index) => (
                    <option key={index} value={state}>
                        {state} {/* Display state name */}
                    </option>
                ))}
            </select>
            <select id="cities" value={selectedCityOption} onChange={(e) =>{ 
                setCitySelectedOption(e.target.value);
                setDisplayMessage('');
                }} disabled={!selectedStateOption}>
                <option value="" disabled>Select City</option>
                {cities.map((city, index) => (
                    <option key={index} value={city}>
                        {city} {/* Display city name */}
                    </option>
                ))}
            </select>
            {selectedOption && selectedStateOption && selectedCityOption && (
    <div>
       <p>You selected {selectedCityOption}, {selectedStateOption}, {selectedOption}</p>
        {/* <p><span style={{ fontWeight: 'bold' }}>You selected</span> <span style={{ fontWeight: 'bold',fontSize:11 }}>{selectedCityOption}</span>, <span style={{textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'}}>{selectedOption}, {selectedCityOption}</span></p> */}
    </div>
)}
        </div>
    );
}
