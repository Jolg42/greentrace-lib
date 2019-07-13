import GreenTrace from "./index"
import debugLib from "debug"
const debug = debugLib("tgwf:greenTrace:cli")

// sample usage.
const main = async () => {
  const hops = await GreenTrace.trace("google.com")
  debug(hops)
  const hopsAsGeoJSON = GreenTrace.toGeoJSON(hops)
  debug())
  console.log(JSON.stringify(hopsAsGeoJSON)
}

main()