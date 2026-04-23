import React, { useState, useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell,
  LineChart, Line
} from 'recharts';
import { dummyEvents } from '../data/events';
import './AnalyticsDashboard.css';

// Power BI standard categorical colors
const COLORS = ['#118DFF', '#12239E', '#E66C37', '#6B007B', '#E044A7', '#744EA6'];

const AnalyticsDashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Extract unique categories for Slicer
  const categories = ['All', ...new Set(dummyEvents.map(e => e.category))];

  // Filter events based on slicer
  const filteredEvents = useMemo(() => {
    if (selectedCategory === 'All') return dummyEvents;
    return dummyEvents.filter(e => e.category === selectedCategory);
  }, [selectedCategory]);

  // KPIs
  const totalEvents = filteredEvents.length;
  // Mock total registrations (randomized but deterministic based on ID for demo)
  const totalRegistrations = filteredEvents.reduce((acc, event) => acc + (event.id * 45 + 20), 0);
  const avgAttendance = totalEvents > 0 ? Math.round(totalRegistrations / totalEvents) : 0;

  // Data for Bar Chart: Registrations per event
  const barChartData = filteredEvents.map(event => ({
    name: event.title.length > 15 ? event.title.substring(0, 15) + '...' : event.title,
    fullTitle: event.title,
    registrations: event.id * 45 + 20
  }));

  // Data for Pie Chart: Events by Category
  const pieChartData = useMemo(() => {
    const counts = {};
    filteredEvents.forEach(e => {
      counts[e.category] = (counts[e.category] || 0) + 1;
    });
    return Object.keys(counts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      value: counts[key]
    }));
  }, [filteredEvents]);

  // Data for Line Chart: Mock monthly trend
  const lineChartData = [
    { month: 'Jan', registrations: 120 },
    { month: 'Feb', registrations: 150 },
    { month: 'Mar', registrations: 180 },
    { month: 'Apr', registrations: Math.round(totalRegistrations * 0.4) },
    { month: 'May', registrations: Math.round(totalRegistrations * 0.6) },
    { month: 'Jun', registrations: Math.round(totalRegistrations * 0.9) },
    { month: 'Jul', registrations: totalRegistrations }
  ];

  return (
    <div className="analytics-page">
      <div className="analytics-header">
        <h1>Event Analytics Report</h1>
        <div className="slicer-container">
          <span className="slicer-label">Filter by Category:</span>
          <select 
            className="slicer-select" 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'All' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">Total Events</div>
          <div className="kpi-value">{totalEvents}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Total Registrations</div>
          <div className="kpi-value">{totalRegistrations}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Avg Registrations / Event</div>
          <div className="kpi-value">{avgAttendance}</div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-header">Registrations by Event</div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} tick={{fontSize: 12, fill: '#605e5c'}} />
                <YAxis tick={{fontSize: 12, fill: '#605e5c'}} axisLine={false} tickLine={false} />
                <RechartsTooltip cursor={{fill: '#f3f2f1'}} contentStyle={{borderRadius: '4px', border: '1px solid #ccc', boxShadow: '0 2px 5px rgba(0,0,0,0.1)'}}/>
                <Bar dataKey="registrations" fill="#118DFF" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">Events by Category</div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value"
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip contentStyle={{borderRadius: '4px', border: '1px solid #ccc'}}/>
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{fontSize: '12px', color: '#605e5c'}}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card full-width">
          <div className="chart-header">Cumulative Registrations Trend (YTD)</div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineChartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                <XAxis dataKey="month" tick={{fontSize: 12, fill: '#605e5c'}} axisLine={false} tickLine={false}/>
                <YAxis tick={{fontSize: 12, fill: '#605e5c'}} axisLine={false} tickLine={false} />
                <RechartsTooltip contentStyle={{borderRadius: '4px', border: '1px solid #ccc', boxShadow: '0 2px 5px rgba(0,0,0,0.1)'}}/>
                <Line type="monotone" dataKey="registrations" stroke="#12239E" strokeWidth={3} dot={{r: 4, fill: '#12239E', strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
