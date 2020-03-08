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
  getIp(obj) {
    return Object.keys(obj)[0];
  },

  convertTraceHops(hops) {
    const hopIpv4s = hops
      .map(v => {
        debug("convertTraceHops:v", v, this.getIp(v))
        return this.getIp(v)
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
    // and other info. Returns False if no data found
    debug("checking ip:", ip)
    let res = geoip.lookup(ip)
    if (!res) {
      debug("empty result back for:", ip)
      return false
    }
    if (!res.ll) {
      debug("No latlngs in results for:", ip)
      return false
    } else {
      let ipObj = {};
      ipObj[ip] = res;
      debug("ip result found", ipObj);
      return ipObj;
    }

  },
  toGeoJSON(tracedIps) {
    // convert a list of IP like objects, with coordinates to geoJSON
    const ipArray = Object.values(tracedIps)
    debug("toGeoJSON ", ipArray[0])
    return {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: ipArray.map(ip => {
          const ipVal = Object.values(ip)[0]
          return ipVal.ll
        })
      },
      properties: tracedIps
    }
  },
  toArcLayer(traceIps) {
    let arcs = [];
    let index = 0;

    for (const hop of traceIps) {

      if (index > 0) {
        const prevHop = traceIps[index - 1]

        let arc = {

          from: {
            name: this.getIp(prevHop),
            coordinates: prevHop[this.getIp(prevHop)].ll
          },
          to: {
            name: this.getIp(hop),
            coordinates: hop[this.getIp(hop)].ll
          }
        }
        arcs.push(arc)
      }

      index++;
    }
    return arcs
  }
}

module.exports = GreenTrace
