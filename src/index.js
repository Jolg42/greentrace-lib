import util from "util"
import fs from "fs"
import axios from "axios"
import traceroute from "traceroute"
import geoip from "geoip-lite"

import debugLib from "debug"
const debug = debugLib("tgwf:greenTrace")

const GreenTrace = {
  async trace(domain) {
    // return an array of objects containing IP address, and
    // info about each hop, like geo coords, and green status
    debug(`Starting call to traceroute for ${domain}`)
    const promiseTrace = util.promisify(traceroute.trace)
    const hops = await promiseTrace(domain)
    debug(`done with traceRoute for ${domain}`)
    debug(hops)
    return this.convertTraceHops(hops)
  },

  convertTraceHops(hops) {
    const hopIpv4s = hops
      .map(v => {
        debug("v", v, Object.keys(v)[0])
        return Object.keys(v)[0]
      })
      .filter(hop => {
        if (hop) {
          return hop
        }
      })

    const hopsWithGeo = hopIpv4s.map(hopIpV4 => {
      const ipwithGeo = this.lookupUpIp(hopIpV4)
      if (ipwithGeo) {
        {
          return ipwithGeo
        }
      }
    })
    return hopsWithGeo
  },

  lookupUpIp(ip) {
    // accepts an IP, and returns an object with coordinates,
    // and other info
    debug("ip", ip)
    let ipObj = {}
    ipObj[ip] = geoip.lookup(ip)
    return ipObj
  },
  toGeoJSON(tracedIps) {
    // convert a list of IP like objects, with coordinates to geoJSON
    const ipArray = Object.keys(tracedIps)

    return {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: ipArray.map(ip => {
          return ip.ll
        })
      },
      properties: tracedIps
    }
  }
}

export default GreenTrace
