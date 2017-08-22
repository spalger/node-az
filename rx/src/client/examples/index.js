/* eslint-disable import/no-unresolved */
export const examples = [
  {
    name: 'Map',
    code: require('!!raw-loader!./map.js'),
    makeStream: require('./map').makeMapStream,
  },
  {
    name: 'Merge',
    code: require('!!raw-loader!./merge.js'),
    makeStream: require('./merge').makeMergeStream,
  },
  {
    name: 'Take Until',
    code: require('!!raw-loader!./take_until.js'),
    makeStream: require('./take_until').makeTakeUntilStream,
  },
  {
    name: 'Concat',
    code: require('!!raw-loader!./concat.js'),
    makeStream: require('./concat').makeConcatStream,
  },
]
