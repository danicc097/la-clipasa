#!/bin/bash
# shellcheck disable=SC1091,SC2155,SC2086

set -Eeo pipefail

export DUMPS_FOLDER="db-dumps"

if [ -t 1 ]; then
  RED="$(tput setaf 1)"
  GREEN="$(tput setaf 2)"
  YELLOW="$(tput setaf 3)"
  BLUE="$(tput setaf 4)"
  MAGENTA="$(tput setaf 5)"
  CYAN="$(tput setaf 6)"
  WHITE="$(tput setaf 7)"
  BOLD="$(tput bold)"
  UNDERSCORE="$(tput smul)"
  OFF="$(tput sgr0)"
else
  RED=""
  GREEN=""
  YELLOW=""
  BLUE=""
  MAGENTA=""
  CYAN=""
  WHITE=""
  BOLD=""
  UNDERSCORE=""
  OFF=""
fi

err() {
  echo "[$(date +'%Y-%m-%dT%H:%M:%S%z')]: $*" >&2
  sleep 0.1 # while processing xerr in background
  # kill -s SIGUSR1 $PROC
  # FIXME parallel (sub-)subshell management instead of force killing
  kill 0
  exit 1 # if not using trap
}

confirm() {
  test -n "$NO_CONFIRMATION" && return

  local prompt="$1"
  local response

  [[ -z $prompt ]] && prompt="Are you sure?"

  prompt+=" [y/n]"

  while true; do
    read -r -p "$prompt " response
    case "${response,,}" in
    [y][e][s] | [y])
      return 0
      ;;
    [n][o] | [n])
      return 1
      ;;
    *) ;;
    esac
  done
}
