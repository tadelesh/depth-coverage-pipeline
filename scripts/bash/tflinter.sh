#!/bin/bash
cd $GOPATH/src/github.com/terraform-providers/terraform-provider-azurerm

export TEST=`go list ./azurerm/internal/services/$RP/... |grep -v 'vendor'|grep -v 'examples'|grep -v 'validate'`
export PKG_NAME=azurerm
export TESTTIMEOUT=180m
export TF_SCHEMA_PANIC_ON_ERROR=1
export GO111MODULE=on
export GOFLAGS=-mod=vendor

# make lint
echo -e "\e[32m[$(date -u)] LOG: [$RP]: make lint"
bash scripts/run-lint.sh
if [ "$?" != "0" ]; then
    echo -e "\e[31m[$(date -u)] ERROR: [$RP]: make lint failed"
    exit 1
fi

# make tflint
echo -e "\e[32m[$(date -u)] LOG: [$RP]: make tflint"
bash scripts/run-tflint.sh
if [ "$?" != "0" ]; then
    echo -e "\e[31m[$(date -u)] ERROR: [$RP]: make tflint failed"
    exit 1
fi

# make test
echo -e "\e[32m[$(date -u)] LOG: [$RP]: make test"
bash scripts/run-test.sh
if [ "$?" != "0" ]; then
    echo -e "\e[31m[$(date -u)] ERROR: [$RP]: make test failed"
    exit 1
fi

# make website-lint
echo -e "\e[32m[$(date -u)] LOG: [$RP]: make website-lint"
misspell -error -source=text -i hdinsight,exportfs website/
if [ "$?" != "0" ]; then
    echo -e "\e[31m[$(date -u)] ERROR: [$RP]: make website-lint failed"
    exit 1
fi
bash -c "'./scripts/terrafmt-website.sh'"
if [ "$?" != "0" ]; then
    echo -e "\e[31m[$(date -u)] ERROR: [$RP]: make website-lint failed"
    exit 1
fi