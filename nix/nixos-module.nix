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

    openFirewall = lib.mkOption {
      type = lib.types.bool;
      default = false;
      description = "Whether to open the firewall port.";
    };
  };

  config = lib.mkIf cfg.enable {
    nixpkgs.overlays = [
      (final: prev: {
        PDFTara = final.callPackage ./package.nix { };
      })
    ];

    systemd.services.PDFTara = {
      description = "PDFTara PDF Tools";
      after = [ "network.target" ];
      wantedBy = [ "multi-user.target" ];

      environment = {
        PDFTara_PORT = toString cfg.port;
      };

      serviceConfig = {
        ExecStart = "${cfg.package}/bin/PDFTara";
        Restart = "on-failure";
        DynamicUser = true;
        RuntimeDirectory = "PDFTara";
        StateDirectory = "PDFTara";

        # Hardening
        NoNewPrivileges = true;
        ProtectSystem = "strict";
        ProtectHome = true;
        PrivateTmp = true;
        PrivateDevices = true;
        ProtectKernelTunables = true;
        ProtectKernelModules = true;
        ProtectControlGroups = true;
        RestrictSUIDSGID = true;
        MemoryDenyWriteExecute = false;
      };
    };

    networking.firewall.allowedTCPPorts = lib.mkIf cfg.openFirewall [ cfg.port ];
  };
}
