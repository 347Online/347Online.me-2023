#!/usr/bin/env bash
(cd resume && ./build.sh)

mv resume/out/* public/
