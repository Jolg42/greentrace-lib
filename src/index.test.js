import GreenTrace from "./index"
import debugLib from "debug"
const debug = debugLib("tgwf:test:greenTrace")


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
      // https://www.wikiwand.com/en/GeoJSON#/Example

      // do we have a type?
      expect(hopGeoJSON.type).toEqual("Feature")
      // do we have geometry?
      expect(hopGeoJSON.geometry.type).toEqual("LineString")
      expect(hopGeoJSON.geometry.coordinates).toHaveLength(hops.length)
      // do we have properties?
      expect(hopGeoJSON.properties).toHaveLength(hops.length)
    })
    test("has usable IP addresses", () => {
      const mockIPs = mockTraceRouteHops.map((obj) => { return Object.keys(obj)[0] })
      const geoJSONIPs = hopGeoJSON.properties.map(obj => { return Object.keys(obj)[0] })

      expect(geoJSONIPs).toEqual(mockIPs)

    })
    test("has usable coords addresses", () => {
      const coords = hopGeoJSON.geometry.coordinates[0]
      // TODO what are the max and min values for coordinates?
      expect(coords).toHaveLength(2)
    })
    test("has coords in the correct latitude / longitude order", () => {
      // the current output mixes the latitude and longitude up

    })
    describe("runGreenChecks", () => {
      test.todo("returns green / grey classification for each hop")
    })
    describe.only("toArcLayer", () => {
      test.only("it creates the initial origin format", () => {
        const res = GreenTrace.toArcLayer(hops)
        // we have one less hop, as the arcs show the connecting lines,
        // not the points
        expect(res.length).toEqual(hops.length - 1)
      })
    })
  })
})