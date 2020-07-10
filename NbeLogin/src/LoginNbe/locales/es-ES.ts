import component from './es-ES/component';
import globalHeader from './es-ES/globalHeader';
import menu from './es-ES/menu';
import pwa from './es-ES/pwa';
import settingDrawer from './es-ES/settingDrawer';
import settings from './es-ES/settings';
import login from './es-ES/login';

export default {
  'navBar.lang': 'Idioma',
  'layout.user.link.help': 'ayuda',
  'layout.user.link.privacy': 'privacidad',
  'layout.user.link.terms': 'condiciones',
  'app.preview.down.block': 'Descargar esta página a un proyecto local',
  'app.welcome.link.fetch-blocks': 'Obtener todos los bloques',
  'app.welcome.link.block-list':
    'Desarrollo basado en bloques, costruye rápidamente páginas estándar',
  ...globalHeader,
  ...menu,
  ...settingDrawer,
  ...settings,
  ...pwa,
  ...component,
  ...login,
};
