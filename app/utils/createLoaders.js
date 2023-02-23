const DataLoader = require('dataloader');
const loaders = require('../datasources/loaders');

function createLoaders() {
  return {
    // user
    // followerCountOfUser: new DataLoader(loaders.batchFollowerCountOfUser),
    // // comment
    // userOfComment: new DataLoader(loaders.batchUserOfComment),
    // postOfComment: new DataLoader(loaders.batchPostOfComment),

    // post
    clapCountOfPost: new DataLoader(loaders.batchClapCountOfPost),
    ownerOfPost: new DataLoader(loaders.batchOwnerOfPost),
  };
}

module.exports = createLoaders;
