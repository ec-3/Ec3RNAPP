#!/bin/sh

cd ./ios

# Builds the ipa and uploads it to the appstore
xcodebuild -exportArchive -archivePath $PWD/dist/ec3.xcarchive -exportOptionsPlist exportOptions.plist -exportPath $PWD/dist