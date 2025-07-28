{
  description = "Personal Website – Nix dev env with automatic pre‑commit hooks";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    pre-commit-hooks.url = "github:cachix/pre-commit-hooks.nix";
  };

  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
      pre-commit-hooks,
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        pyEnv = pkgs.python3.withPackages (
          ps: with ps; [
            toml
            rich
            requests
          ]
        );
        pre-commit-check = pre-commit-hooks.lib.${system}.run {
          src = self;
          hooks = {
            preprocess-images = {
              enable = true;
              entry = "${pyEnv}/bin/python scripts/preprocess-images.py";
              language = "system";
              pass_filenames = false;
              files = ".*";
              types = [ "file" ];
              verbose = true;
            };
            generate-langstats = {
              enable = true;
              entry = "${pyEnv}/bin/python scripts/generate-langstats.py";
              language = "system";
              pass_filenames = false;
              files = ".*";
              types = [ "file" ];
              verbose = true;
            };
          };
        };
      in
      {
        devShells.default = pkgs.mkShell {
          inputsFrom = [ pre-commit-check ];
          buildInputs = with pkgs; [
            # Site Tooling
            hugo
            nodejs
            nodePackages.pnpm
            pnpm
            just
            prettierd
            html-proofer
            prettier-plugin-go-template
            rsync

            # Git & Hooks
            git
            pre-commit

            # Image Compression
            pyEnv
            jpegoptim
            oxipng
            libwebp
          ];
        };

        checks.pre-commit = pre-commit-check;
      }
    );
}
