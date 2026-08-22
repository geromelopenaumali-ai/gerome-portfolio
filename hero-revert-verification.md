# Hero Revert Verification

The latest spacious-hero and slower-animation changes were reverted. Earlier rendering, SSR critical CSS, bundle, gallery, and diagram alignment optimizations remain intact.

At a 1280×1100 live viewport, the restored hero measured 1137×484, with a 500.203px copy column, 560px animation column, and 76.8px gap. The automation room measured 560×480 with a 480px minimum height. The spacious override marker was absent from the loaded styles.

The original motion values were restored: SVG particle duration 2.8 seconds for the first path, core breathing 5.6 seconds, core ring rotation 13 seconds, and status pulse 2.6 seconds.

`pnpm run build` passed successfully after the revert, and the rebuilt preview loaded without errors.
