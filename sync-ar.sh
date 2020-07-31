#!/bin/bash

PARAMS=""
FOLDER="AR-server"
RFOLDER="public_html/mcm_ar/"
while (( "$#" )); do
  # echo "Checking argument $1" >&2
  case "$1" in
    -F|--folder)
      if [ -n "$2" ] && [ ${2:0:1} != "-" ]; then
        FOLDER=$2
        shift 2
      else
        echo "Error: Argument for $1 is missing" >&2
        exit 1
      fi
      ;;
    -a|--my-boolean-flag)
      MY_FLAG=0
      shift
      ;;
    -b|--my-flag-with-argument)
      if [ -n "$2" ] && [ ${2:0:1} != "-" ]; then
        MY_FLAG_ARG=$2
        shift 2
      else
        echo "Error: Argument for $1 is missing" >&2
        exit 1
      fi
      ;;
    -*|--*=) # unsupported flags
      echo "Error: Unsupported flag $1" >&2
      exit 1
      ;;
    *) # preserve positional arguments
      PARAMS="$PARAMS $1"
      shift
      ;;
  esac
done
# set positional arguments in their proper place
eval set -- "$PARAMS"

if [ ${FOLDER: -1} != '/' ]
  then
    FOLDER="${FOLDER}/"
fi

echo "Syncing: [${FOLDER}] => [${RFOLDER}]"
rsync -arvz -e 'ssh -p 222' --progress --delete "${FOLDER}" autentz@dedi4452.your-server.de:"${RFOLDER}"

# rsync -arvz -e 'ssh -p 222' --progress --delete AR-server/ autentz@dedi4452.your-server.de:public_html/mcm_ar/
