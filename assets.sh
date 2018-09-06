#!/bin/bash
set -x #echo on


echo "Syncing assets"
rsync -a ./src/assets/ jenkins@159.203.127.52:/var/www/bgeo/assets/

