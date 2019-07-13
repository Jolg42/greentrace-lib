import GreenTrace from "./index"
import debugLib from "debug"
const debug = debugLib("tgwf:greenTrace:cli")

// sample usage.
const main = async () => {
  const hops = await GreenTrace.trace("google.com")
  const hopsAsGeoJSON = GreenTrace.toGeoJSON(hops)
  debug(hops)
  console.log(JSON.stringify(hopsAsGeoJSON))
}

main()