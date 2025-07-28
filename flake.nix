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
        pyEnv = pkgs.python311.withPackages (ps: with ps; [ toml ]);
        pre-commit-check = pre-commit-hooks.lib.${system}.run {
          src = self;
          hooks = {
            # Pre-commit hooks
            compress-images = {
              entry = "python scripts/compress-images.py";
              language = "system";
              pass_filenames = false; # run on entire tree
            };
          };
        };
      in
      {
        devShells.default = pkgs.mkShell {
          inputsFrom = [ pre-commit-check ];

          buildInputs = with pkgs; [
            # --- Site Tooling ---
            hugo
            nodejs
            pnpm
            just
            prettierd
            html-proofer
            prettier-plugin-go-template
            rsync

            # --- Git & Hooks ---
            git
            pre-commit

            # --- Image Compression ---
            pyEnv
            jpegoptim
            oxipng
          ];
        };

        # nix flake check → run all hooks non‑interactively
        checks.pre-commit = pre-commit-check;
      }
    );
}
