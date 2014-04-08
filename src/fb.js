/*
http://wiki.ip-phone-forum.de/gateways:avm:howtos:mods:upnp
    
    http://fritz.box:49000/igddesc.xml
    http://fritz.box:49000/any.xml
    http://fritz.box:49000/igdicfgSCPD.xml
    http://fritz.box:49000/igddslSCPD.xml
    http://fritz.box:49000/igdconnSCPD.xml
*/

var FB = function() {
    var hostname = 'fritz.box';
    var port = 49000;
    var url = 'http://'+hostname+':'+port;
    
    if (location.hostname != hostname || location.port != port) {
        alert('Redirecting to ' + url + '. Afterwards start this script again.');
        location = url;
    }
    
    var getIPAction = 'urn:schemas-upnp-org:service:WANIPConnection:1#GetExternalIPAddress';
    var getIPXML = '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope"><s:Body><u:GetExternalIPAdress/></s:Body></s:Envelope>';
    
    var newIPAction = 'urn:schemas-upnp-org:service:WANIPConnection:1#ForceTermination';
    var newIPXML = '<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope"><s:Body><u:ForceTermination/></s:Body></s:Envelope>';
    
    var lastIP = '0.0.0.0';
    
    var con = new XMLHttpRequest();
    
    var body = document.body;

    document.title = 'FRITZ!Box JS-Controller v0.1';

    // clean body
    while (body.hasChildNodes()) body.removeChild(body.lastChild);

    var div = document.createElement('section');
    div.style.border = '1px solid black';
    div.style.width = '200px';
    div.style.padding = '1em';
    div.style.margin = '2em';

    var ipLabel = document.createTextNode('IP address: ');
    div.appendChild(ipLabel);
    body.appendChild(div);

    var ipSpan = document.createElement('span');
    ipSpan.style.marginRight = '5px';
    var ipText = document.createTextNode('0.0.0.0');
    ipSpan.appendChild(ipText);
    div.appendChild(ipSpan);

    var img = document.createElement('img');
    img.src =  "data:image/gif;base64,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";
    img.style.display = 'none';
    div.appendChild(img);

    var btn = document.createElement('button');
    var ipButtonLabel = document.createTextNode('New IP address');
    btn.appendChild(ipButtonLabel);
    div.appendChild(btn);
    
    con.onreadystatechange = function() {
        if (con.readyState != XMLHttpRequest.DONE) return;
        
        var ipXML = con.responseXML.getElementsByTagName('NewExternalIPAddress');
        var terminationTag = con.responseXML.getElementsByTagNameNS('urn:schemas-upnp-org:service:WANIPConnection:1', 'ForceTerminationResponse');
        
        if (terminationTag.length > 0) {
            // wait a second ...
            setTimeout(function() {loadIPAddress()}, 2000);
            return;
        }
        
        var ip = ipXML.item(0).firstChild.nodeValue;
        
        console.log('IP: %s', ip);
        
        // once again if the IP Address is currently not available or not updated yet
        if (ip == '0.0.0.0' || ip == lastIP) setTimeout(function() {loadIPAddress()}, 2000);
        else {
            var newIP = document.createTextNode(ip);
            ipSpan.replaceChild(newIP, ipSpan.lastChild);
            btn.disabled = false;
            img.style.display = 'none';
            lastIP = ip;
        }
    };

    btn.addEventListener('click', function() {
        btn.disabled = true;
        img.style.display = 'block';
        newIPAddress();
    });
    
    var send = function(action, xml) {
        con.open('POST', url+'/upnp/control/WANIPConn1');
        con.setRequestHeader('Content-Type', 'text/xml');
        con.setRequestHeader('SOAPAction', action);
        con.send(xml);
    }
    
    var loadIPAddress = function() { send(getIPAction, getIPXML) };
    var newIPAddress = function() { send(newIPAction, newIPXML) };
    
    return {
        start: loadIPAddress;
    }
}

new FB().start();
