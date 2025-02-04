#!/usr/bin/env bash

shopt -s globstar

for x in resume/*.md; do
  fname="$(basename "$x")"
  template_path="resume/${fname%.*}.template.html"
  css_path="resume/${fname%.*}.css"

  # Plaintext
  pandoc "$x" -t plain -o "public/${fname%.*}.txt"

  template () {
    if [[ -f $template_path ]]; then
      echo "--template" "$template_path"
    else
      echo "-s"
    fi
  }

  css () {
    if [[ -f $css_path ]]; then
      echo " --css" "$css_path"
    fi
  }

  # HTML
  eval "pandoc $x -t html $(template)" | prettier --stdin-filepath foo.html > "public/${fname%.*}.html"

  # PDF
  eval "pandoc $x -t html $(template)$(css) -o public/${fname%.*}.pdf"
done
