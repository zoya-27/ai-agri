import { useState, useEffect } from 'react';

export default function CropYieldPredictor() {
  const [selectedCrop, setSelectedCrop] = useState('Wheat');
  const [selectedSoil, setSelectedSoil] = useState('Loamy');
  const [rainfall, setRainfall] = useState(500);
  const [temperature, setTemperature] = useState(22);
  const [fertilizer, setFertilizer] = useState(120);
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const crops = ['Wheat', 'Rice'];
  const soilTypes = ['Loamy', 'Clay', 'Sandy'];
  
  const predictYield = () => {
    setIsLoading(true);
    
    // Simulate model prediction delay
    setTimeout(() => {
      // Simple mock implementation of the random forest model
      // This is a simplified prediction logic based on the sample data
      let baseYield;
      
      if (selectedCrop === 'Wheat') {
        baseYield = 2.7;
        // Adjustments based on soil type
        if (selectedSoil === 'Loamy') baseYield += 0.2;
        if (selectedSoil === 'Sandy') baseYield -= 0.2;
        
        // Adjust for rainfall (Wheat prefers moderate rainfall)
        const optimalRain = 500;
        baseYield += (1 - Math.abs(rainfall - optimalRain) / 200) * 0.3;
        
        // Adjust for temperature (Wheat grows best at moderate temps)
        const optimalTemp = 22;
        baseYield += (1 - Math.abs(temperature - optimalTemp) / 5) * 0.3;
        
        // Adjust for fertilizer
        baseYield += (fertilizer - 100) / 100;
      } else { // Rice
        baseYield = 4.3;
        // Adjustments based on soil type
        if (selectedSoil === 'Clay') baseYield += 0.3;
        if (selectedSoil === 'Sandy') baseYield -= 0.5;
        
        // Adjust for rainfall (Rice prefers high rainfall)
        const optimalRain = 800;
        baseYield += (1 - Math.abs(rainfall - optimalRain) / 200) * 0.4;
        
        // Adjust for temperature (Rice prefers warmer temps)
        const optimalTemp = 26;
        baseYield += (1 - Math.abs(temperature - optimalTemp) / 5) * 0.3;
        
        // Adjust for fertilizer
        baseYield += (fertilizer - 140) / 100;
      }
      
      // Ensure prediction is within reasonable bounds
      baseYield = Math.max(1.5, Math.min(5.5, baseYield));
      
      // Round to 1 decimal place
      setPrediction(Math.round(baseYield * 10) / 10);
      setIsLoading(false);
    }, 800);
  };
  
  useEffect(() => {
    // Reset prediction when inputs change
    setPrediction(null);
  }, [selectedCrop, selectedSoil, rainfall, temperature, fertilizer]);

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6 text-green-700">Crop Yield Predictor</h1>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Crop Type</label>
          <select 
            className="w-full p-2 border border-gray-300 rounded-md"
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
          >
            {crops.map(crop => (
              <option key={crop} value={crop}>{crop}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Soil Type</label>
          <select 
            className="w-full p-2 border border-gray-300 rounded-md"
            value={selectedSoil}
            onChange={(e) => setSelectedSoil(e.target.value)}
          >
            {soilTypes.map(soil => (
              <option key={soil} value={soil}>{soil}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rainfall (mm/year): {rainfall}
          </label>
          <input 
            type="range" 
            min="300" 
            max="1000" 
            step="10" 
            value={rainfall}
            onChange={(e) => setRainfall(Number(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Temperature (°C): {temperature}
          </label>
          <input 
            type="range" 
            min="15" 
            max="35" 
            step="0.5" 
            value={temperature}
            onChange={(e) => setTemperature(Number(e.target.value))}
            className="w-full"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fertilizer (kg/ha): {fertilizer}
          </label>
          <input 
            type="range" 
            min="50" 
            max="200" 
            step="5" 
            value={fertilizer}
            onChange={(e) => setFertilizer(Number(e.target.value))}
            className="w-full"
          />
        </div>
        
        <button 
          onClick={predictYield}
          className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition"
        >
          Predict Yield
        </button>
        
        {isLoading && (
          <div className="text-center text-gray-500">
            Calculating prediction...
          </div>
        )}
        
        {prediction !== null && !isLoading && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
            <h2 className="text-lg font-semibold text-green-800 mb-2">Prediction Results</h2>
            <p className="text-xl font-bold text-green-700">
              Expected Yield: {prediction} tonnes/hectare
            </p>
            <p className="text-sm text-gray-600 mt-2">
              This prediction is based on the crop type, growing conditions, and fertilizer application rate you specified.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}