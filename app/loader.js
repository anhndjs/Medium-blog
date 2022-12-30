const DataLoader = require('dataloader');
const { batchPosts } = require('./datasources/loaders');

function createLoader() {
  return {
    postLoader: new DataLoader(batchPosts),
  };
}

module.exports = { createLoader };
