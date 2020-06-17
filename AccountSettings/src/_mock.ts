// eslint-disable-next-line import/no-extraneous-dependencies
import { Request, Response } from 'express';
//import city from './geographic/city.json';
//import province from './geographic/province.json';

function getProvince(_: Request, res: Response) {
  return res.json('{}');
}

function getCity(req: Request, res: Response) {
  return res.json('{}');
}

export default {
  // Supported values are Object and Array
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
  'GET  /api/geographic/province': getProvince,
  'GET  /api/geographic/city/:province': getCity,
};
