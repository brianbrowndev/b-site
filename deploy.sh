#!/bin/bash
set -x #echo on

echo "Building package"
node_modules/@angular/cli/bin/ng build --prod --aot 
echo "Syncing package"
rsync -a /var/lib/jenkins/workspace/bgeo-site-pipeline/dist/ /var/www/bgeo/
