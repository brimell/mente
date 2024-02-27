import { useEffect } from 'react';

const clientId = "_Ul6bqdGp1B1_EhEem50Kxzdq245HLKKn5k04CflpY0"
const redirectUri = process.env.NODE_ENV === 'production' ? 'https://mente.web.app/' : 'https://localhost:3030';
const scope = 'time_data category_data productivity_data';

export const RescueTimeAuth = () => {
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    if (code) {
      fetch('/api/exchange-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })
      .then(response => response.json())
      .then(data => {
        console.log(data); // Process your data here
      })
      .catch(error => console.error('Error:', error));
    }
  }, []);

  const handleAuth = () => {
    window.location.href = `https://www.rescuetime.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
  };

  return <button onClick={handleAuth}>Authorize RescueTime</button>;
};
