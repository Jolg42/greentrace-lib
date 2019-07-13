import GreenTrace from "./index"
import { toUnicode } from "punycode";

// not sure how to mock this, so using an array here as it's the slowest part of the test
const mockTraceRouteHops = [
  { '88.134.237.147': [3780.607] },
  { '72.14.212.140': [25.638] },
  { '108.170.241.204': [22.959] },
  { '216.239.41.49': [24.09] },
  { '209.85.244.159': [31.694] },
  { '209.85.241.230': [32.022] },
  { '108.170.252.65': [30.509] },
  { '72.14.233.47': [29.833] },
  { '216.58.207.46': [30.298] }]

describe("GreenTrace", () => {
  describe("convertTraceHops", () => {
    test("generates Array of objects with IPs and cooordinates", async () => {
      const hops = await GreenTrace.convertTraceHops(mockTraceRouteHops)
      expect(hops.length).toBe(9)

      // do we have the ip addresses as our keys in each object?
      const mockIPs = mockTraceRouteHops.map((obj) => { return Object.keys(obj)[0] })
      const hopIps = hops.map(hop => { return Object.keys(hop)[0] })
      expect(hopIps).toEqual(mockIPs)
    })
  })
  describe("toGeoJSON", () => {
    let hops, hopGeoJSON

    beforeAll(async () => {
      hops = await GreenTrace.convertTraceHops(mockTraceRouteHops)
      hopGeoJSON = GreenTrace.toGeoJSON(hops)
    })

    test("generates GeoJSON object from hops", async () => {

      // is it geoJSON?

      // do we have a type?
      expect(hopGeoJSON.type).toEqual("Feature")
      // do we have geometry?
      // do we have properties?
    })
    test.todo("has usable IP addresses")
    test.todo("has usable coords addresses")
    test.todo("has green / grey classification for each hop")
  })
})


