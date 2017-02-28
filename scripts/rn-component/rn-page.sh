#! /bin/sh

is_directory()
{
  DIR_NAME=$1
  if [ ! -d $DIR_NAME ]; then
    return 1
  else
    return 0
  fi
}

SELF_PATH="$(cd -P -- "$(dirname -- "$0")" && pwd -P)/$(basename -- "$0")"
SELF_PATH="$(readlink "$SELF_PATH" || echo $SELF_PATH)"
DIR_PATH="$(dirname "$SELF_PATH")"

_PATH=$DIR_PATH
# echo $PATH
# echo 

if [ -z "$1" ] ;then
    echo "please input component name."
else
    IFS=
    LAST=${1: -4}
    LAST=`echo ${LAST:0:1} | tr [a-z] [A-Z]`"${LAST:1}"

    [ "$LAST" != "Page" ] && NAME="$1""Page" || NAME="${1:0:$[${#1}-4]}""Page"

    NAME=`echo ${NAME:0:1} | tr [a-z] [A-Z]`"${NAME:1}"
    echo $NAME
    exit;
    CONTENT=`cat "$_PATH"/index.js`
    CONTENT=${CONTENT//_Component_/"$NAME"}

    if [ ! -d "$NAME" ];then
        mkdir "$NAME"
        cd "$NAME"
        echo $CONTENT>index.js
        cp "$_PATH"/style.js style.js
        echo $CONTENT
    else
        echo "already exists directory $NAME." >&2
    fi
fi
