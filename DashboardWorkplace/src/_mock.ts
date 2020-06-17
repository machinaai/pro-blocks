import moment from 'moment';
import { VisitDataType } from './data.d';
// mock data
const visitData: VisitDataType[] = [];
const beginDay = new Date().getTime();

const fakeY = [7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5];
for (let i = 0; i < fakeY.length; i += 1) {
  visitData.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: fakeY[i],
  });
}

const visitData2 = [];
const fakeY2 = [1, 6, 4, 8, 3, 7, 2];
for (let i = 0; i < fakeY2.length; i += 1) {
  visitData2.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: fakeY2[i],
  });
}

const salesData = [];
for (let i = 0; i < 12; i += 1) {
  salesData.push({
    x: `Mes ${i + 1}`,
    y: Math.floor(Math.random() * 1000) + 200,
  });
}
const searchData = [];
for (let i = 0; i < 50; i += 1) {
  searchData.push({
    index: i + 1,
    keyword: `search keyword-${i}`,
    count: Math.floor(Math.random() * 1000),
    range: Math.floor(Math.random() * 100),
    status: Math.floor((Math.random() * 10) % 2),
  });
}
const salesTypeData = [
  {
    x: 'Electrodomésticos',
    y: 4544,
  },
  {
    x: 'Licores',
    y: 3321,
  },
  {
    x: 'Salud',
    y: 3113,
  },
  {
    x: 'Vestido',
    y: 2341,
  },
  {
    x: 'Blancos',
    y: 1231,
  },
  {
    x: 'otros',
    y: 1231,
  },
];

const salesTypeDataOnline = [
  {
    x: 'Electrodomésticos',
    y: 244,
  },
  {
    x: 'Licores',
    y: 321,
  },
  {
    x: 'Salud',
    y: 311,
  },
  {
    x: 'Vestido',
    y: 41,
  },
  {
    x: 'Blancos',
    y: 121,
  },
  {
    x: 'otros',
    y: 111,
  },
];

const salesTypeDataOffline = [
  {
    x: 'Electrodomésticos',
    y: 99,
  },
  {
    x: 'Licores',
    y: 188,
  },
  {
    x: 'Salud',
    y: 344,
  },
  {
    x: 'Vestido',
    y: 255,
  },
  {
    x: 'otros',
    y: 65,
  },
];

const offlineData = [];
for (let i = 0; i < 10; i += 1) {
  offlineData.push({
    name: `Stores ${i}`,
    cvr: Math.ceil(Math.random() * 9) / 10,
  });
}
const offlineChartData = [];
for (let i = 0; i < 20; i += 1) {
  offlineChartData.push({
    x: new Date().getTime() + 1000 * 60 * 30 * i,
    y1: Math.floor(Math.random() * 100) + 10,
    y2: Math.floor(Math.random() * 100) + 10,
  });
}

const titles = [
  'Alipay',
  'Angular',
  'Ant Design',
  'Ant Design Pro',
  'Bootstrap',
  'React',
  'Vue',
  'Webpack',
];
const avatars = [
  'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png', // Alipay
  'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png', // Angular
  'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png', // Ant Design
  'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png', // Ant Design Pro
  'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png', // Bootstrap
  'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png', // React
  'https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png', // Vue
  'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png', // Webpack
];

const avatars2 = [
  'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
  'https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png',
  'https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png',
  'https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png',
  'https://gw.alipayobjects.com/zos/rmsportal/WhxKECPNujWoWEFNdnJE.png',
  'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
  'https://gw.alipayobjects.com/zos/rmsportal/psOgztMplJMGpVEqfcgF.png',
  'https://gw.alipayobjects.com/zos/rmsportal/ZpBqSxLxVEXfcUNoPKrz.png',
  'https://gw.alipayobjects.com/zos/rmsportal/laiEnJdGHVOhJrUShBaJ.png',
  'https://gw.alipayobjects.com/zos/rmsportal/UrQsqscbKEpNuJcvBZBu.png',
];

const getNotice = [
  {
    id: 'xxx1',
    title: titles[0],
    logo: avatars[0],
    description: 'Es algo interno, no pueden alcanzarlo, no pueden tocarlo.',
    updatedAt: new Date(),
    member: 'Grupo científico de ladrillos en movimiento',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx2',
    title: titles[1],
    logo: avatars[1],
    description: 'La esperanza es algo bueno, quizás lo mejor, las cosas buenas no morirán',
    updatedAt: new Date('2017-07-24'),
    member: 'Todo el Grupo es un solo Grupo',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx3',
    title: titles[2],
    logo: avatars[2],
    description: 'Hay tantas tabernas en la ciudad, pero ella acaba de entrar a mi taberna.',
    updatedAt: new Date(),
    member: 'S2 Girls Group',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx4',
    title: titles[3],
    logo: avatars[3],
    description: 'En ese momento, solo quería pensar en lo que quería y nunca quise tener',
    updatedAt: new Date('2017-07-23'),
    member: 'Programador diario',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx5',
    title: titles[4],
    logo: avatars[4],
    description: 'Winter is comming',
    updatedAt: new Date('2017-07-23'),
    member: 'High Sky Design Sky Mission',
    href: '',
    memberLink: '',
  },
  {
    id: 'xxx6',
    title: titles[5],
    logo: avatars[5],
    description: 'La vida es como una caja de bombones, los resultados son a menudo inesperados.',
    updatedAt: new Date('2017-07-23'),
    member: 'Engañarte para aprender computación',
    href: '',
    memberLink: '',
  },
];

const getActivities = [
  {
    id: 'trend-1',
    updatedAt: new Date(),
    user: {
      name: 'Catherine',
      avatar: avatars2[0],
    },
    group: {
      name: 'High Sky Design Sky Mission',
      link: 'http://github.com/',
    },
    project: {
      name: 'Iteración de junio',
      link: 'http://github.com/',
    },
    template: 'creó un nuevo proyecto @{group} en @{project}',
  },
  {
    id: 'trend-2',
    updatedAt: new Date(),
    user: {
      name: 'Alejandro',
      avatar: avatars2[1],
    },
    group: {
      name: 'High Sky Design Sky Mission',
      link: 'http://github.com/',
    },
    project: {
      name: 'Iteración de junio',
      link: 'http://github.com/',
    },
    template: 'en @{group} Nuevo proyecto @{project}',
  },
  {
    id: 'trend-3',
    updatedAt: new Date(),
    user: {
      name: 'Catherine',
      avatar: avatars2[2],
    },
    group: {
      name: 'S2 Girls Group',
      link: 'http://github.com/',
    },
    project: {
      name: 'Iteración de junio',
      link: 'http://github.com/',
    },
    template: 'en @{group} Nuevo proyecto @{project}',
  },
  {
    id: 'trend-4',
    updatedAt: new Date(),
    user: {
      name: 'Daniel',
      avatar: avatars2[4],
    },
    project: {
      name: '5a iteración diaria mensual',
      link: 'http://github.com/',
    },
    template: 'será @{project} actualizado al estado: publicado',
  },
  {
    id: 'trend-5',
    updatedAt: new Date(),
    user: {
      name: 'Arturo',
      avatar: avatars2[3],
    },
    project: {
      name: 'Eficiencia de ingeniería',
      link: 'http://github.com/',
    },
    comment: {
      name: 'deja un mensaje',
      link: 'http://github.com/',
    },
    template: 'en @{project} se ha anunciado @{comment}',
  },
  {
    id: 'trend-6',
    updatedAt: new Date(),
    user: {
      name: 'El hermano',
      avatar: avatars2[5],
    },
    group: {
      name: 'Programador diario',
      link: 'http://github.com/',
    },
    project: {
      name: 'Iteración de marca',
      link: 'http://github.com/',
    },
    template: 'en @{group} de ha creado nuevo proyecto @{project}',
  },
];

const radarOriginData = [
  {
    name: 'personal',
    ref: 10,
    koubei: 8,
    output: 4,
    contribute: 5,
    hot: 7,
  },
  {
    name: 'equipo',
    ref: 3,
    koubei: 9,
    output: 6,
    contribute: 3,
    hot: 1,
  },
  {
    name: 'Departamento',
    ref: 4,
    koubei: 1,
    output: 6,
    contribute: 5,
    hot: 7,
  },
];

const radarData: any[] = [];
const radarTitleMap = {
  ref: 'Citar',
  koubei: 'compartir',
  output: 'rendimiento',
  contribute: 'contribuir',
  hot: 'caliente',
};
radarOriginData.forEach((item) => {
  Object.keys(item).forEach((key) => {
    if (key !== 'name') {
      radarData.push({
        name: item.name,
        label: radarTitleMap[key],
        value: item[key],
      });
    }
  });
});

export default {
  'GET  /api/project/notice': getNotice,
  'GET  /api/activities': getActivities,
  'GET  /api/fake_chart_data': {
    visitData,
    visitData2,
    salesData,
    searchData,
    offlineData,
    offlineChartData,
    salesTypeData,
    salesTypeDataOnline,
    salesTypeDataOffline,
    radarData,
  },

  'GET /api/currentUser': {
    name: 'Rodolfo',
    avatar: 'https://raw.githubusercontent.com/machinaai/logos/master/architect.png',
    userid: '00000001',
    email: 'rsanvicente@machina.ai',
    signature: 'The Architect',
    title: 'Developer',
    group: 'machina.ai',
    tags: [
      {
        key: '0',
        label: 'Arquitecto',
      },
      {
        key: '1',
        label: 'UI Expert',
      },
      {
        key: '2',
        label: 'Java Script Architect',
      },
      {
        key: '3',
        label: 'Necesita aprender React',
      },
      {
        key: '4',
        label: 'y buena codificacion',
      },
      {
        key: '5',
        label: 'tiene buenos sentimientos',
      },
    ],
    notifyCount: 12,
    unreadCount: 11,
    country: 'Mexico',
    geographic: {
      province: {
        label: 'CDMX',
        key: '330000',
      },
      city: {
        label: 'Liverpol',
        key: '330100',
      },
    },
    address: 'Liverpool',
    phone: '5556581111',
  },
};
