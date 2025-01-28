#!/usr/bin/env bash
mkdir out 2>/dev/null

nix run nixpkgs#pandoc -- resume.md -t plain -o out/resume.txt

resume="$(nix run nixpkgs#pandoc -- resume.md -f markdown -t html)"

printf '
<!DOCTYPE html>
<html lang="en-us">
  <head>
    <title>Katie Janzen - Full-Stack Software Engineer</title>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="resume.css">
  </head>
  <body>
'"${resume}"'
  </body>
</html>
' > out/resume.html

cp style.css out/resume.css
