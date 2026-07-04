export function getTheme() {
  const hour = new Date().getHours();
  
  // Morning: 6 AM to 11 AM
  if (hour >= 6 && hour < 12) {
    return {
      period: 'morning',
      skyColor: '#aee4ff',
      fogColor: '#aee4ff',
      oceanColor: '#0077b6',
      sunPosition: [100, 20, 100],
      ambientIntensity: 0.6,
      directionalIntensity: 1.2,
      rayleigh: 0.8,
      mieCoefficient: 0.005,
    };
  }
  
  // Afternoon: 12 PM to 5 PM
  if (hour >= 12 && hour < 18) {
    return {
      period: 'afternoon',
      skyColor: '#87CEEB',
      fogColor: '#87CEEB',
      oceanColor: '#006994',
      sunPosition: [0, 100, 0],
      ambientIntensity: 0.8,
      directionalIntensity: 1.5,
      rayleigh: 0.5,
      mieCoefficient: 0.005,
    };
  }
  
  // Evening: 6 PM to 8 PM
  if (hour >= 18 && hour < 21) {
    return {
      period: 'evening',
      skyColor: '#ff9e7a',
      fogColor: '#ff9e7a',
      oceanColor: '#5c4d7d',
      sunPosition: [-100, 5, -100],
      ambientIntensity: 0.5,
      directionalIntensity: 1.5,
      rayleigh: 3,
      mieCoefficient: 0.05,
    };
  }
  
  // Night: 9 PM to 5 AM
  return {
    period: 'night',
    skyColor: '#020617',
    fogColor: '#020617',
    oceanColor: '#0f172a',
    sunPosition: [0, 100, 0], // Moon position
    ambientIntensity: 0.2,
    directionalIntensity: 0.4,
    rayleigh: 0.1,
    mieCoefficient: 0.001,
  };
}
