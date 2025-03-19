import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Heart, 
  Thermometer, 
  Scale, 
  Calendar, 
  Bell, 
  FileText,
  AlertCircle,
  Watch
} from 'lucide-react';
import HealthMetricChart from '../components/HealthMetricChart';
import { useSmartwatch } from '../hooks/useSmartwatch';

const Dashboard = () => {
  const [heartRateData, setHeartRateData] = useState<number[]>([]);
  const [temperatureData, setTemperatureData] = useState<number[]>([]);
  const [timeLabels, setTimeLabels] = useState<Date[]>([]);
  const { isConnected, data, connect, disconnect } = useSmartwatch();

  // Update historical data when new readings arrive
  useEffect(() => {
    if (data.heartRate !== null) {
      const now = new Date();
      setTimeLabels(prev => [...prev, now].slice(-12));
      setHeartRateData(prev => [...prev, data.heartRate!].slice(-12));
    }
  }, [data.heartRate]);

  useEffect(() => {
    if (data.temperature !== null) {
      const now = new Date();
      setTimeLabels(prev => [...prev, now].slice(-12));
      setTemperatureData(prev => [...prev, data.temperature!].slice(-12));
    }
  }, [data.temperature]);

  const healthMetrics = [
    { 
      name: 'Blood Pressure', 
      value: '120/80', 
      icon: Activity, 
      change: 'normal', 
      trend: 'stable' 
    },
    { 
      name: 'Heart Rate', 
      value: `${data.heartRate?.toFixed(0) || '--'} bpm`, 
      icon: Heart, 
      change: 'real-time', 
      trend: 'good',
      chart: {
        data: heartRateData,
        color: '#2563eb'
      }
    },
    { 
      name: 'Temperature', 
      value: `${data.temperature?.toFixed(1) || '--'}°F`, 
      icon: Thermometer, 
      change: 'real-time', 
      trend: 'stable',
      chart: {
        data: temperatureData,
        color: '#dc2626'
      }
    },
    { 
      name: 'Weight', 
      value: '165 lbs', 
      icon: Scale, 
      change: 'increased', 
      trend: 'warning' 
    },
  ];

  const upcomingAppointments = [
    {
      doctor: 'Dr. Sarah Wilson',
      specialty: 'Cardiologist',
      date: '2024-03-25',
      time: '10:00 AM',
      location: 'Heart Care Center'
    },
    {
      doctor: 'Dr. Michael Chen',
      specialty: 'General Physician',
      date: '2024-03-28',
      time: '2:30 PM',
      location: 'City Medical Clinic'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold mb-2">Welcome back, John!</h1>
            <p className="opacity-90">Your health dashboard is looking good today.</p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={isConnected ? disconnect : connect}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors"
            >
              <Watch className={`w-5 h-5 ${isConnected ? 'text-green-400' : 'text-gray-400'}`} />
              <span className="text-sm">
                {isConnected ? 'Disconnect Watch' : 'Connect Watch'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Health Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {healthMetrics.map((metric) => (
          <div
            key={metric.name}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between mb-3">
              <metric.icon className="w-6 h-6 text-blue-600" />
              <span className={`text-sm font-medium ${
                metric.trend === 'good' ? 'text-green-600' :
                metric.trend === 'warning' ? 'text-orange-600' :
                'text-blue-600'
              }`}>
                {metric.change}
              </span>
            </div>
            <h3 className="text-gray-500 text-sm">{metric.name}</h3>
            <p className="text-2xl font-semibold text-gray-900 mt-1">{metric.value}</p>
            
            {/* Real-time chart for heart rate and temperature */}
            {metric.chart && timeLabels.length > 0 && (
              <div className="mt-4 h-24">
                <HealthMetricChart
                  data={metric.chart.data}
                  labels={timeLabels}
                  label={metric.name}
                  color={metric.chart.color}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">Upcoming Appointments</h2>
          <div className="space-y-4">
            {upcomingAppointments.map((appointment, index) => (
              <div key={index} className="flex items-start space-x-3">
                <Calendar className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <p className="font-medium text-gray-900">{appointment.doctor}</p>
                  <p className="text-sm text-gray-500">{appointment.specialty}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">Recent Documents</h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 text-sm">
              <FileText className="w-5 h-5 text-blue-600" />
              <span>Blood Test Results - March 2024</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <FileText className="w-5 h-5 text-blue-600" />
              <span>Vaccination Record</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <FileText className="w-5 h-5 text-blue-600" />
              <span>Annual Physical Report</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4">Allergies & Alerts</h2>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-500 mt-1" />
              <div>
                <p className="font-medium text-gray-900">Penicillin</p>
                <p className="text-sm text-gray-500">Severe allergic reaction</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Bell className="w-5 h-5 text-orange-500 mt-1" />
              <div>
                <p className="font-medium text-gray-900">Medication Reminder</p>
                <p className="text-sm text-gray-500">Take blood pressure medicine</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;