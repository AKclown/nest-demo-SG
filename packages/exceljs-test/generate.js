const { Workbook } = require('exceljs');

function main(){
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet('guang111');

  worksheet.columns = [
      { header: 'ID', key: 'id', width: 20 },
      { header: '姓名', key: 'name', width: 30 },
      { header: '出生日期', key: 'birthday', width: 30},
      { header: '手机号', key: 'phone', width: 50 }
  ];

  const data = [
      { id: 1, name: 'akclown', birthday: new Date('1994-07-07'), phone: '13255555555' },
      { id: 2, name: 'akclown1', birthday: new Date('1994-04-14'), phone: '13222222222' },
      { id: 3, name: 'akclown2', birthday: new Date('1995-08-08'), phone: '13211111111' }
  ]
  worksheet.addRows(data);

  workbook.xlsx.writeFile('./AKclown.xlsx');

}

main()
