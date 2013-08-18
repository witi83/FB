FRITZ!Box JS-Controller
==

The FRITZ!Box JS-Controller is a JavaScript bookmarklet that (currently) supports the recreation of an external IP address using an AVM FRITZ!Box router.

The following devices are known to be supported:
* AVM FRITZ!Box Fon WLAN 7050
* AVM FRITZ!Box Fon WLAN 7270
* AVM FRITZ!Box Fon WLAN 7360
* AVM FRITZ!Box Fon WLAN 7390

This script uses the uPNP interface of the router (a kind of a SOAP webservice). Since that interface provides more functionality than the recreation of an external IP address, the FRITZ!Box JS-Controller might be updated in the near future.

##Browser support
All modern browsers are supported, except for the Internet Explorer. Unfortunately, he doesn't like my script...

##Installation and usage
1. Drag and drop this script onto the bookmark bar of your browser.
2. Click on the new bookmark. If you're not already on the correct website, you will be redirected to http://fritz.box:49000/ Yes, you will see something like "404 Not Found", but that's expected.
3. If you've been redirected, start the script again.

Now you see your current external IP address and the button "New IP address". After clicking on that button, you will get a new external IP address.

##Resources
* http://fritz.box:49000/igddesc.xml
* http://fritz.box:49000/any.xml
* http://fritz.box:49000/igdicfgSCPD.xml
* http://fritz.box:49000/igddslSCPD.xml
* http://fritz.box:49000/igdconnSCPD.xml