{
  description = "Personal Website - Development Environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            # Hugo
            hugo

            # Development tools
            just
            nodejs
            pnpm
            prettierd
            html-proofer
            prettier-plugin-go-template

            # Optional utilities
            rsync
            git
          ];
        };
      }
    );
}
