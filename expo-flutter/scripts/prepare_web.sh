#!/bin/bash

# addresses https://github.com/expo/expo/issues/20562

rm -rf ../build/expo
rm -rf ../build/assets
mkdir -p ../build/expo
cp -R dist/. ../build/expo/
cp -R dist/assets ../build/
root_url=$(echo ${PUBLIC_URL} | sed -e 's/[]\/$*.^[]/\\&/g')
sed -i '' "s/\/bundles/$root_url\/bundles/g" ../build/expo/index.html
sed -i '' "s/\/flutter\//$root_url\/flutter\//g" ../build/expo/index.html
sed -i '' "s/\/favicon/$root_url\/favicon/g" ../build/expo/index.html
