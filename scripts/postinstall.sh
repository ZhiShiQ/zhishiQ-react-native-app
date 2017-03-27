#!/bin/bash

SELF_PATH="$(cd -P -- "$(dirname -- "$0")" && pwd -P)/$(basename -- "$0")"
SELF_PATH="$(readlink "$SELF_PATH" || echo $SELF_PATH)"
DIR_PATH="$(dirname "$SELF_PATH")"

cd "$DIR_PATH"
cp ../app/node_modules/react-native-yunpeng-alipay/ios/AlipayModule/AlipayModule.h ../node_modules/react-native-yunpeng-alipay/ios/AlipayModule/AlipayModule.h
