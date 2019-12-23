const { BigQuery } = require('@google-cloud/bigquery');
const bigQuery = new BigQuery();
const { nomeDataset } = require('../config');

async function verificaDataset() {
  const [ datasets ] = await bigQuery.getDatasets();
  const datasetExiste = datasets
    .filter(dataset => dataset.id === nomeDataset)
    .shift();

  if (datasetExiste) {
    console.log('Dataset já existe!');
    return;
  }

  const config = {
    location: 'US'
  };

  await bigQuery.createDataset(nomeDataset, config);

  console.log('Dataset criado com sucesso!');
}

verificaDataset();
