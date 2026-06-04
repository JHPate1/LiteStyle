#!/bin/bash
set -e

GREEN='\033[0;32m0'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

echo -e "${CYAN}${BOLD}=========================================${NC}"
echo -e "${CYAN}${BOLD}   LITESTYLE SYSTEM INITIALIZER ${NC}"
echo -e "${CYAN}${BOLD}=========================================${NC}\n"

echo -e "Step 1: Synchronizing internal structural trees..."
mkdir -p sandbox-site/src core-engine

echo -e "Step 2: Securing isolated package spaces..."
cd core-engine

if [ -f package-lock.json ]; then
    echo -e "-> Lockfile detected. Performing secure clean installation..."
    npm ci --quiet
else
    echo -e "-> Allocating current modules..."
    npm install --quiet
fi

echo -e "\n${GREEN}${BOLD}✔ Environment verified and locked successfully.${NC}"
echo -e "Launching backend framework runtime automation...\n"

node server.js