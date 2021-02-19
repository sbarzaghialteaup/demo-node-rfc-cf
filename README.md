# EXAMPLE USING NODE-RFC.JS LIBRARY IN SAP BTP CLOUD FOUNDRY

## Important
First of all, connection to backend using cloud connector is not supported by node-rfc library (yet...), only direct connection to backend is possible, so the RFC port must exposed public to internet.

## Prerequisites
The SAP NetWeaver RFC SDK library is not public so you have to download by yourself.  
Download the `LINUX ON X86_64 64BIT` version from:
https://launchpad.support.sap.com/#/softwarecenter/template/products/_APP=00200682500000001943&_EVENT=DISPHIER&HEADER=Y&FUNCTIONBAR=N&EVENT=TREE&NE=NAVIGATE&ENR=01200314690100002214&V=MAINT

## Installation
- Clone this repository locally
- Unzip the downloaded rfc sdk zip file and copy all the files from the folder `nwrfcsdk/lib` of the zip file into the folder `sap/nwrfcsdk/lib` of the cloned repository
- push the repository with `cf push`

## Using
The app expose four http post api, these api internally use the node-rfc library:
- connect
- ping
- call rfc
- disconnect

In the file `test.http` there are examples for using the API

## Where is the magic?
An hack in the standard cf nodejs buildpack, look at the manifest.yaml...

## Troubleshooting
If you get the error `reject connection request` during connect, check the ACL files in backend system:  
- SMGW-->Goto-->Expert Functions-->External security-->Maintenance of ACL files-->switch to tab prxyinfo  
- Add a line to the PRXYINFO tab as follows to allow all traffic regardless of network.  
`P SOURCE=* DEST=*`

More info:
https://answers.sap.com/questions/12362804/eclipse-connection-error--reject-connection-reques.html