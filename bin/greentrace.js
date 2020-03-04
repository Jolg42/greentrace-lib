const argv = require('yargs').argv

const GreenTrace = require("../lib/index")
const debug = require("debug")("tgwf:greenTrace:cli")

const main = async () => {
  const hops = await GreenTrace.trace(argv.domain)
  const hopsAsGeoJSON = GreenTrace.toGeoJSON(hops)
  debug(hops)

  // if (argv.outfile) {
  //   // console.log(`writing file to ${argv.outfile}`)
  // }
  console.log(JSON.stringify(hopsAsGeoJSON))
}

main()