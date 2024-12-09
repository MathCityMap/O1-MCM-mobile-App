#!/bin/bash
[ -z "$1" ] && echo "Usage: $0 <downloaded zip file>" && exit 1
command -v xq >/dev/null 2>&1 || { echo >&2 "You need to install xq (https://kislyuk.github.io/yq/)"; exit 1; }
basedir=$(pwd)
file=$(basename $1)
tmpdir=/tmp/$file
mkdir $tmpdir
cp $1 $tmpdir
pushd $tmpdir
unzip $file
for n in $(find . -name *.xml)
  do
  lang=$(echo $n | sed -e "s/.*\(..\)\/strings.xml/\1/")
  echo $n
    xq '.resources.string | map({"key": .["@name"] | tostring, "value": .["#text"]}) | from_entries' $n \
     | sed -e "s/\\\\\\\\n/\\\\n/g" | sed -e "s/\\\\\\\\'/'/g" \
     | sed -e "s/###\([^#]*\)###/{{\1}}/g" > $basedir/src/assets/localization/$lang.json
done
# add missing english keys from german file
xq -s '.[0] * .[1]' $basedir/src/assets/localization/de.json $basedir/src/assets/localization/en.json > $basedir/src/assets/localization/en.tmp.json
mv $basedir/src/assets/localization/en.tmp.json $basedir/src/assets/localization/en.json
popd $tmpdir
rm -rf $tmpdir
