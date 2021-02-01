#!/usr/bin/env bash

function runLinters {
  echo "==> Checking source code against linters..."
  golangci-lint run ./azurerm/internal/services/$(ResourceProvider)/...
}

function main {
  runLinters
}

main