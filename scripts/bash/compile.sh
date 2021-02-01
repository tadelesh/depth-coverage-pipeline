
#!/bin/bash
cd ./go/src/github.com/terraform-providers/terraform-provider-azurerm

echo -e "\e[32m[$(date -u)] LOG: [$(ResourceProvider)]: make goimports"
make goimports
if [ "$?" != "0" ]; then
    echo -e "\e[31m[$(date -u)] ERROR: [$(ResourceProvider)]: make goimports failed"
    exit 1
fi

echo -e "\e[32m[$(date -u)] LOG: [$(ResourceProvider)]: make fmt"
make fmt
if [ "$?" != "0" ]; then
    echo -e "\e[31m[$(date -u)] ERROR: [$(ResourceProvider)]: make fmt failed"
    exit 1
fi

echo -e "\e[32m[$(date -u)] LOG: [$(ResourceProvider)]: make build"
make build
if [ "$?" != "0" ]; then
    echo -e "\e[31m[$(date -u)] ERROR: [$(ResourceProvider)]: make build failed"
    exit 1
fi