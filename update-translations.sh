#!/bin/bash
[ -z "$1" ] && echo "Usage: $0 <downloaded zip file>" && exit 1
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
  $basedir/node_modules/.bin/xml2json $n | jq '.resources.string | map({"key": .name | tostring, "value": .["$t"]}) | from_entries' > $basedir/src/assets/localization/$lang.json
done
# add missing english keys from german file
jq -s '.[0] * .[1]' $basedir/src/assets/localization/de.json $basedir/src/assets/localization/en.json > $basedir/src/assets/localization/en.tmp.json
mv $basedir/src/assets/localization/en.tmp.json $basedir/src/assets/localization/en.json
popd $tmpdir
rm -rf $tmpdir