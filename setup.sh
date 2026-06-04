#!/bin/bash
set -e

# ANSI styling escape tokens
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[0;33m'
BOLD='\033[1m'
NC='\033[0m' # No Color

PORT=3000

echo -e "${CYAN}${BOLD}=========================================${NC}"
echo -e "${CYAN}${BOLD}   LITESTYLE SYSTEM INITIALIZER RUNTIME        ${NC}"
echo -e "${CYAN}${BOLD}=========================================${NC}\n"

echo -e "Step 1: Auditing port availability..."

# Failsafe Port Liberation Layer
if command -v fuser >/dev/null 2>&1; then
    if fuser -n tcp $PORT >/dev/null 2>&1; then
        echo -e "${YELLOW}⚠️ Port $PORT is busy. Forcefully terminating zombie threads...${NC}"
        fuser -k -n tcp $PORT
        sleep 0.5
    fi
elif command -v lsof >/dev/null 2>&1; then
    PID=$(lsof -t -i:$PORT)
    if [ ! -z "$PID" ]; then
        echo -e "${YELLOW}⚠️ Port $PORT is busy. Forcefully killing PID $PID...${NC}"
        kill -9 $PID
        sleep 0.5
    fi
fi

# Determine script directory context
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
cd "$SCRIPT_DIR"

echo -e "Step 2: Synchronizing internal structural trees..."
# Check if we are running in the outer directory or the inner directory
if [ -d "litestyle" ]; then
    echo -e "-> Outer root detected. Stepping down into workspace..."
    cd litestyle
fi

# Assert structure exists safely
mkdir -p sandbox-site/src core-engine

echo -e "Step 3: Securing isolated package spaces..."
cd core-engine

if [ -f package-lock.json ]; then
    echo -e "-> Lockfile detected. Performing secure clean installation..."
    npm ci --quiet
else
    echo -e "-> Allocating current modules..."
    npm install --quiet
fi

echo -e "\n${GREEN}${BOLD}✔ System environment verified and locked successfully. All Systems go${NC}"
echo -e "Launching backend framework runtime automation...\n"

node server.js