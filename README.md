# Greentrace lib

The standalone library used by the [GreenTrace App] to show

- where packets are hoping through the world when you make a request from your machine, based on the Geolite IP Database

- which hops pass through infrastructure running on green energy, as listed by the Green Web Foundation

[greentrace app]: http://thegreenwebfoundation.org/greenwebfeed

## Usage

```js
import GreenTrace from "@tgwf/greentrace-lib"

// return a Promise, that resolves to an array
const hops = await GreenTrace.trace(domainName)

// make this into something we can put on a map
const hopsAsgeoJSON = hops.toGeoJSON()
```
