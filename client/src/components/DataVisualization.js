import React, { useState, useEffect } from 'react';
import { fetchData } from '../services/dataService';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';
import './DataVisualization.css'; 

const DataVisualization = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({
    end_year: '',
    topic: '',
    sector: '',
    region: '',
    pestle: '',
    source: '',
    country: ''
  });

  const getData = async (filters = {}) => {
    try {
      const data = await fetchData(filters);
      setData(data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  useEffect(() => {
    getData(filters);
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="data-visualization-container">
      <h1>Data Visualization Dashboard</h1>

      <div className="filters-container">
        <label>End Year:</label>
        <input type="text" name="end_year" value={filters.end_year} onChange={handleFilterChange} />
        
        <label>Topic:</label>
        <input type="text" name="topic" value={filters.topic} onChange={handleFilterChange} />
        
        <label>Sector:</label>
        <input type="text" name="sector" value={filters.sector} onChange={handleFilterChange} />
        
        <label>Region:</label>
        <input type="text" name="region" value={filters.region} onChange={handleFilterChange} />
        
        <label>PEST:</label>
        <input type="text" name="pestle" value={filters.pestle} onChange={handleFilterChange} />
        
        <label>Source:</label>
        <input type="text" name="source" value={filters.source} onChange={handleFilterChange} />
        
        <label>Country:</label>
        <input type="text" name="country" value={filters.country} onChange={handleFilterChange} />
        
        <button onClick={() => getData(filters)}>Apply Filters</button>
      </div>

      <div className="chart-container">
        <div className="chart">
          <h2 className="chart-title">Line Chart</h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="published" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="intensity" stroke="#8884d8" />
              <Line type="monotone" dataKey="likelihood" stroke="#82ca9d" />
              <Line type="monotone" dataKey="relevance" stroke="#ffc658" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart">
          <h2 className="chart-title">Bar Chart</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="country" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="intensity" fill="#8884d8" />
              <Bar dataKey="likelihood" fill="#82ca9d" />
              <Bar dataKey="relevance" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart">
          <h2 className="chart-title">Pie Chart</h2>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie data={data} dataKey="relevance" nameKey="topic" cx="50%" cy="50%" outerRadius={100} fill="#8884d8">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DataVisualization;
