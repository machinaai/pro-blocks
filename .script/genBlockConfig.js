const fs = require('fs');
const { join } = require('path');
const gitUrl = 'https://github.com/machinaai/pro-blocks';

const menuData = {
  home: 'principal',
  Empty: 'vacío',
  login: 'Inicio de Sesión',
  register: 'registrar',
  'register/result': 'Resultados de registro',
  dashboard: 'Dashboard',
  'dashboard/analysis': 'Página de análisis',
  'dashboard/monitor': 'Página de monitoreo',
  'dashboard/workplace': 'Página de trabajo',
  'exception/403': '403',
  'exception/404': '404',
  'exception/500': '500',
  form: 'Página de formulario',
  'user/login': 'Página de inicio de sesión',
  'user/register': 'Página de registro',
  'user/register/result': 'Página de resultados de registro',
  'form/basic/form': 'Forma básica',
  'form/step/form': 'Formulario paso a paso',
  'form/advanced/form': 'Formularios avanzados',
  list: 'Lista',
  'list/table/list': 'Formulario de consulta',
  'list/basic/list': 'Lista estándar',
  'list/card/list': 'Lista de tarjetas',
  'list/search': 'Lista de búsqueda',
  'list/search/articles': 'Lista de búsqueda (artículo)',
  'list/search/projects': 'Lista de búsqueda (proyecto)',
  'list/search/applications': 'Lista de búsqueda (aplicación)',
  profile: 'Página de detalles',
  'profile/basic': 'Página de detalles básicos',
  'profile/advanced': 'Página de detalles avanzados',
  result: 'Página de resultados',
  'result/success': 'Página de éxito',
  'result/fail': 'Página de falla',
  exception: 'Página de excepción',
  'exception/not-permission': '403',
  'exception/not-find': '404',
  'exception/server-error': '500',
  'exception/trigger': 'Error de activación',
  account: 'Página personal',
  'account/center': 'Centro personal',
  'account/settings': 'Configuraciones personales',
  'account/trigger': 'Notificaciones',
  'account/logout': 'Cerrar sesión',
  editor: 'Editor gráfico',
  'editor/flow': 'Editor de procesos',
  'editor/mind': 'Editor de mapas mentales',
  'editor/koni': 'Editor de topología',
};

const tagsKey = {
  list: 'Lista',
  search: 'Buscar',
  articles: 'remove',
  table: 'Tabla',
  form: 'Forma',
  step: 'remove',
  basic: 'Básico',
  card: 'remove',
  applications: 'remove',
  projects: 'remove',
  404: 'remove',
  403: 'remove',
  500: 'remove',
  profile: 'Detalles',
  advanced: 'Avanzado',
  result: 'Resultado',
  fail: 'remove',
  success: 'remove',
  user: 'Usuario',
  login: 'Iniciar sesión',
  register: 'Registrar',
  account: 'remove',
  center: 'Centro personal',
  settings: 'Configuraciones personales',
  dashboard: 'dashboard',
  analysis: 'remove',
  monitor: 'remove',
  workplace: 'remove',
  editor: 'Editor gráfico',
  flow: 'remove',
  koni: 'remove',
  mind: 'remove',
  exception: 'Excepciones',
};
/**
 * Ruta de la matriz de archivos a pro
 * @param {*} name
 */
const genBlockName = (name) =>
  name
    .match(/[A-Z]?[a-z]+|[0-9]+/g)
    .map((p) => p.toLowerCase())
    .join('/');

/**
 * Mapa de la matriz de archivos a la lista de etiquetas
 * @param {*} name
 */
const genBlockTags = (name) =>
  Array.from(new Set(name.match(/[A-Z]?[a-z]+|[0-9]+/g).map((p) => p.toLowerCase())))
    .map((key) => tagsKey[key] || key)
    .filter((key) => key !== 'remove');

const getFeature = (filePath) => {
  const feature = ['antd'];
  const srcPath = join(filePath, 'src');

  const localesPath = join(srcPath, 'locales');
  if (fs.existsSync(localesPath)) {
    feature.push('i18n');
  }

  const modalTsxPath = join(srcPath, 'model.tsx');
  const modalTsPath = join(srcPath, 'model.ts');
  const modalJsPath = join(srcPath, 'model.js');
  const modalJsxPath = join(srcPath, 'model.jsx');
  if (
    fs.existsSync(modalTsxPath) ||
    fs.existsSync(modalTsPath) ||
    fs.existsSync(modalJsPath) ||
    fs.existsSync(modalJsxPath)
  ) {
    feature.push('dva');
  }
  return feature;
};

/**
 * Recorrer la dirección del archivo
 * @param path
 */
const getFolderTreeData = (filePath) => {
  const files = fs.readdirSync(filePath);
  const blockList = files
    .map((fileName) => {
      const status = fs.statSync(join(filePath, fileName));
      if (status.isDirectory() && fileName.indexOf('.') !== 0 && fileName !== 'EmptyPage') {
        const absPkgPath = join(filePath, fileName, 'package.json');
        if (fs.existsSync(absPkgPath)) {
          const pkg = require(absPkgPath);

          return {
            name: menuData[genBlockName(fileName)],
            key: fileName,
            description: pkg.description,
            url: `${gitUrl}/tree/master/${fileName}`,
            path: fileName,
            features: getFeature(join(filePath, fileName)),
            img: `https://raw.githubusercontent.com/machinaai/pro-blocks/master/${fileName}/snapshot.png?raw=true`,
            tags: genBlockTags(fileName),
            previewUrl: `https://preview.pro.ant.design/${genBlockName(fileName)}`,
          };
        }
      }
      return undefined;
    })
    .filter((obj) => obj);

  blockList.unshift({
    key: 'EmptyPage',
    name: 'Página en blanco',
    description: 'Una página en blanco, ¡todo comienza aquí!',
    url: 'https://github.com/machinaai/pro-blocks/tree/master/EmptyPage',
    path: 'NewPage',
    features: ['antd'],
    img:
      'https://raw.githubusercontent.com/machinaai/pro-blocks/master/EmptyPage/snapshot.png?raw=true',
    tags: ['página en blanco'],
    previewUrl: 'https://preview.pro.ant.design',
  });

  return blockList;
};

fs.writeFileSync(
  join(__dirname, '..', 'umi-block.json'),
  JSON.stringify({ list: getFolderTreeData(join(__dirname, '../')) }, null, 2),
);
