#!/bin/bash
set -x #echo on

echo "Building package"
node_modules/@angular/cli/bin/ng build --prod --aot 
echo "Clearing previous builds"
rm -f /var/www/bgeo/*
echo "Syncing package"
rsync -a ./dist/ /var/www/bgeo/
