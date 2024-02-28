import { Integration } from '@types/integrationTypes';

const integrationsConfig: Integration[] = [
  {
    name: 'Oura',
    description: 'Connect your Oura account to see your sleep data in the app.',
    cover: '/assets/images/integrations/oura.png',
    logo: '/assets/images/integrations/ouralogo.png',
    status: 'not connected',
  },
  {
    name: 'RescueTime',
    description: 'Connect your RescueTime account to see your productivity data in the app.',
    cover: '/assets/images/integrations/rescuetimecover3.webp',
    logo: '/assets/images/integrations/rescuetimelogo.png',
    status: 'not connected',
  },
];

export default integrationsConfig;
