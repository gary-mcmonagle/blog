#!/bin/sh

az login
az group delete --name blog-rg

feAppId=$(az ad app list --query "[?displayName=='blog-fe-appregistration'].appId" --output tsv)
az ad app delete --id $feAppId 