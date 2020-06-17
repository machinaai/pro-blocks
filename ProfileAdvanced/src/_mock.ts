const advancedOperation1 = [
  {
    key: 'op1',
    type: 'Relación de pedido efectiva',
    name: 'Catherine',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-',
  },
  {
    key: 'op2',
    type: 'Revisión financiera',
    name: 'Arturo',
    status: 'reject',
    updatedAt: '2017-10-03  19:23:12',
    memo: 'Motivo del fracaso',
  },
  {
    key: 'op3',
    type: 'Examen preliminar departamental',
    name: 'Alejandro',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-',
  },
  {
    key: 'op4',
    type: 'Orden de envio',
    name: 'Pedro',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: 'Excelente',
  },
  {
    key: 'op5',
    type: 'Crear orden',
    name: 'Susana',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-',
  },
];

const advancedOperation2 = [
  {
    key: 'op1',
    type: 'Relación de pedido efectiva',
    name: 'Alejandro',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-',
  },
];

const advancedOperation3 = [
  {
    key: 'op1',
    type: 'Crear orden',
    name: 'Susana',
    status: 'agree',
    updatedAt: '2017-10-03  19:23:12',
    memo: '-',
  },
];

const getProfileAdvancedData = {
  advancedOperation1,
  advancedOperation2,
  advancedOperation3,
};

export default {
  'GET  /api/profile/advanced': getProfileAdvancedData,
};
