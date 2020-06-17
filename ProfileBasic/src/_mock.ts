const basicGoods = [
  {
    id: '1234561',
    name: 'agua mineral 550ml',
    barcode: '12421432143214321',
    price: '2.00',
    num: '1',
    amount: '2.00',
  },
  {
    id: '1234562',
    name: 'Té de hierbas 300ml',
    barcode: '12421432143214322',
    price: '3.00',
    num: '2',
    amount: '6.00',
  },
  {
    id: '1234563',
    name: 'Papas fritas',
    barcode: '12421432143214323',
    price: '7.00',
    num: '4',
    amount: '28.00',
  },
  {
    id: '1234564',
    name: 'Tacos de canasta',
    barcode: '12421432143214324',
    price: '8.50',
    num: '3',
    amount: '25.50',
  },
];

const basicProgress = [
  {
    key: '1',
    time: '2017-10-01 14:10',
    rate: 'contactar clientes',
    status: 'processing',
    operator: 'Operador ID1234',
    cost: '5mins',
  },
  {
    key: '2',
    time: '2017-10-01 14:05',
    rate: 'Salida de recogida',
    status: 'success',
    operator: 'Recogedor ID1234',
    cost: '1h',
  },
  {
    key: '3',
    time: '2017-10-01 13:05',
    rate: 'Recoge el pedido',
    status: 'success',
    operator: 'Recogedor ID1234',
    cost: '5mins',
  },
  {
    key: '4',
    time: '2017-10-01 13:00',
    rate: 'Solicitud aprobada',
    status: 'success',
    operator: 'sistema',
    cost: '1h',
  },
  {
    key: '5',
    time: '2017-10-01 12:00',
    rate: 'Iniciar una solicitud de devolución',
    status: 'success',
    operator: 'usuario',
    cost: '5mins',
  },
];

const getProfileBasicData = {
  basicGoods,
  basicProgress,
};

export default {
  'GET  /api/profile/basic': getProfileBasicData,
};
