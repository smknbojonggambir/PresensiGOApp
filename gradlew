#!/usr/bin/env sh
# Gradle wrapper script for Unix & GitHub Actions
exec "${JAVA_HOME:-/usr}/bin/java" -version >/dev/null 2>&1
gradle assembleDebug "$@"
