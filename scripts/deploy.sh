#!/bin/sh

rg=blog-rg
location=westeurope
appServicePlan=blog-appserviceplan
storageAccountName=blogservicesstorag
feAppRegName=blog-fe-appregistration
feWebappName=blog-fe-webapp

#Login
az Login

# Create Resource Group
az group create --name $rg --location $location

# Create app service plan
az appservice plan create --name $appServicePlan \
     --resource-group $rg \
        --sku free

# create fe app
az webapp create --name $feWebappName --resource-group $rg --plan $appServicePlan

# create storage account for function apps
az storage account create -n $storageAccountName --resource-group  $rg --location $location --sku Standard_LRS

# create public access function app
az functionapp create --resource-group $rg --name blogservicespublic-function --storage-account $storageAccountName --functions-version 4 --consumption-plan-location $location --runtime dotnet --runtime-version 6
az functionapp create --resource-group $rg --name blogservicesadmin-function --storage-account $storageAccountName --functions-version 4 --consumption-plan-location $location --runtime dotnet --runtime-version 6

# create app registartions
feAppRegName=blog-fe-appregistration
az ad app create --display-name $feAppRegName --sign-in-audience AzureADMyOrg
clientid=$(az ad app create --display-name $feAppRegName --query appId --output tsv)
objectid=$(az ad app show --id $clientid --query id --output tsv)
redirecttype=spa
redirecturl="https://${feWebappName}.azurewebsites.net"
graphurl=https://graph.microsoft.com/v1.0/applications/$objectid

az rest --method PATCH --uri $graphurl --headers 'Content-Type=application/json' --body '{"'$redirecttype'":{"redirectUris":["'$redirecturl'"]}}'