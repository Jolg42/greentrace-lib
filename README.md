# Greentrace lib

The standalone library used by the [GreenTrace App] to show

- where packets are hoping through the world when you make a request from your machine, based on the Geolite IP Database

- which hops pass through infrastructure running on green energy, as listed by the Green Web Foundation

[greentrace app]: http://thegreenwebfoundation.org/greenwebfeed

## Usage

### As a command line tool

This will run a traceroute, then print to STDOUT a GeoJSON file with coordinates for every IP address, as looked up in the GeoIP database.


```
npx greentrace --domain=yourdomain.com
```

Note: it's not fast. I'd welcome pointers on making this run faster, without losing too much info.

### As a library

You can also run this as a library in a larger application. You can see this in use in the greentrace electron app, designed plot these hops on a map.


```js
import GreenTrace from "@tgwf/greentrace-lib"

// return a Promise, that resolves to an array
const hops = await GreenTrace.trace(domainName)

// make this into something we can put on a map
const hopsAsgeoJSON = hops.toGeoJSON()
```

# Licenses

There are two licenses, for the code and data. See the [LICENSE](https://github.com/thegreenwebfoundation/greentrace-lib/blob/master/LICENSE) file for details.
