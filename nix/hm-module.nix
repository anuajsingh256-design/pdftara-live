{ config, lib, pkgs, ... }:

let
  cfg = config.services.PDFTara;
in
{
  options.services.PDFTara = {
    enable = lib.mkEnableOption "PDFTara - Professional PDF Tools";

    package = lib.mkOption {
      type = lib.types.package;
      default = pkgs.PDFTara;
      defaultText = lib.literalExpression "pkgs.PDFTara";
      description = "The PDFTara package to use.";
    };

    port = lib.mkOption {
      type = lib.types.port;
      default = 3000;
      description = "Port to listen on.";
    };
  };

  config = lib.mkIf cfg.enable {
    nixpkgs.overlays = [
      (final: prev: {
        PDFTara = final.callPackage ./package.nix { };
      })
    ];

    systemd.user.services.PDFTara = {
      Unit = {
        Description = "PDFTara PDF Tools";
        After = [ "network.target" ];
      };

      Service = {
        ExecStart = "${cfg.package}/bin/PDFTara";
        Restart = "on-failure";
        Environment = [
          "PDFTara_PORT=${toString cfg.port}"
        ];
      };

      Install = {
        WantedBy = [ "default.target" ];
      };
    };
  };
}
