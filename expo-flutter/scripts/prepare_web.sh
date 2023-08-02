#!/bin/bash

# addresses https://github.com/expo/expo/issues/20562

SEDOPTION="-i"
if [[ "$OSTYPE" == "darwin"* ]]; then
  SEDOPTION="-i ''"
fi

rm -rf ../build/expo
rm -rf ../build/assets
mkdir -p ../build/expo
cp -R dist/. ../build/expo/
cp -R dist${PUBLIC_URL}/assets/. ../build/expo/assets/
rm -rf ../build/expo${PUBLIC_URL}
root_url=$(echo ${PUBLIC_URL} | sed -e 's/[]\/$*.^[]/\\&/g')
sed $SEDOPTION "s/\/bundles/$root_url\/bundles/g" ../build/expo/index.html
sed $SEDOPTION "s/\/flutter\//$root_url\/flutter\//g" ../build/expo/index.html
sed $SEDOPTION "s/\/favicon/$root_url\/favicon/g" ../build/expo/index.html
