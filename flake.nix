{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    utils.url = "github:numtide/flake-utils";
  };

  outputs =
    {
      nixpkgs,
      utils,
      ...
    }:
    utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import nixpkgs { inherit system; };
        scripts = {
          build-resume = pkgs.writeShellApplication {
            name = "build-resume";
            runtimeInputs = with pkgs; [
              nodePackages.prettier
            ];
            text = builtins.readFile ./build-resume.sh;
          };
        };
      in
      {
        devShell = pkgs.mkShell {
          buildInputs =
            with pkgs;
            [
              yarn
              pandoc
            ]
            ++ builtins.map (x: x.value) (lib.attrsToList scripts);
        };
        packages = scripts;
      }
    );
}
