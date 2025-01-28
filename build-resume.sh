#!/usr/bin/env bash

pandoc resume/resume.md -t plain -o public/resume.txt
pandoc resume/resume.md -t html --template resume/template.html | prettier --stdin-filepath foo.html > public/resume.html
pandoc resume/resume.md -t html --template resume/template.html --css public/resume.css -o public/resume.pdf
