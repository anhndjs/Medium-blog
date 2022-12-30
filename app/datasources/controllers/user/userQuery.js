const grapqlFields = require('graphql-fields');
const { User } = require('../../models');

async function user(args, context, info) {
  const { input } = args;
  const selected = Object.keys(grapqlFields(info));
  console.log(selected);
}

module.exports = {
  user,
};
