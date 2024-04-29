#!/bin/sh

cd ./ios
rm -rf ./build && rm -rf ./dist && pod install

#Builds the xcarchive
xcodebuild -workspace ./EC3APP.xcworkspace -scheme EC3APP -sdk iphoneos -configuration Release -quiet -archivePath $PWD/dist/ec3.xcarchive clean archive

# Builds the ipa and uploads it to the appstore
xcodebuild -exportArchive -archivePath $PWD/dist/ec3.xcarchive -exportOptionsPlist exportOptions.plist -exportPath $PWD/dist